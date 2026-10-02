-- Blog listing: optional one-sentence card preview, and the daily featured rotation.
-- short_preview is left null on existing posts. Cards then use the excerpt, limited to two lines.
-- blog_rotation_post_id walks published posts newest first, one step per UK day, and wraps.
-- A pinned post is stored separately in site_settings.pinned_featured_post_id.

alter table public.posts
    add column if not exists short_preview text;

comment on column public.posts.short_preview is
    'Optional one-sentence blog card preview, about 80 characters. Null uses the excerpt.';

create or replace function public.blog_rotation_post_id()
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
    ids uuid[];
    n integer;
    today date;
    stored_date date;
    stored_id uuid;
    date_raw text;
    stored_raw text;
    pos integer;
    elapsed integer;
    chosen_index integer;
    chosen uuid;
    uk_day integer;
begin
    today := (timezone('Europe/London', now()))::date;

    select value into date_raw
    from site_settings
    where key = 'featured_rotation_uk_date';

    select value into stored_raw
    from site_settings
    where key = 'featured_rotation_post_id';

    begin
        stored_date := nullif(btrim(date_raw), '')::date;
    exception when others then
        stored_date := null;
    end;

    begin
        stored_id := nullif(btrim(stored_raw), '')::uuid;
    exception when others then
        stored_id := null;
    end;

    if stored_date = today
        and stored_id is not null
        and exists (
            select 1
            from posts
            where id = stored_id
              and status = 'published'
        )
    then
        return stored_id;
    end if;

    perform pg_advisory_xact_lock(872341::bigint);

    select value into date_raw
    from site_settings
    where key = 'featured_rotation_uk_date';

    select value into stored_raw
    from site_settings
    where key = 'featured_rotation_post_id';

    begin
        stored_date := nullif(btrim(date_raw), '')::date;
    exception when others then
        stored_date := null;
    end;

    begin
        stored_id := nullif(btrim(stored_raw), '')::uuid;
    exception when others then
        stored_id := null;
    end;

    select coalesce(
        array_agg(
            p.id
            order by coalesce(p.published_at, p.created_at) desc, p.created_at desc, p.id desc
        ),
        '{}'::uuid[]
    )
    into ids
    from posts p
    where p.status = 'published';

    n := coalesce(array_length(ids, 1), 0);
    if n = 0 then
        return null;
    end if;

    if stored_date = today and stored_id is not null and stored_id = any(ids) then
        return stored_id;
    end if;

    uk_day := today - date '1970-01-01';
    pos := array_position(ids, stored_id);

    if stored_date is null or stored_id is null or pos is null then
        chosen_index := uk_day % n;
    else
        elapsed := today - stored_date;
        if elapsed < 1 then
            elapsed := 1;
        end if;
        chosen_index := ((pos - 1) + elapsed) % n;
        if n > 1 and ids[chosen_index + 1] = stored_id then
            chosen_index := (chosen_index + 1) % n;
        end if;
    end if;

    chosen := ids[chosen_index + 1];

    insert into site_settings (key, value, description)
    values
        ('featured_rotation_uk_date', today::text, 'UK calendar date of the current blog rotation.'),
        ('featured_rotation_post_id', chosen::text, 'Published post selected by the daily blog rotation.')
    on conflict (key) do update
        set value = excluded.value,
            updated_at = now();

    return chosen;
end;
$$;

revoke all on function public.blog_rotation_post_id() from public;
grant execute on function public.blog_rotation_post_id() to anon, authenticated, service_role;

comment on function public.blog_rotation_post_id() is
    'Featured blog post for the current UK day. Walks published posts newest first and wraps.';
