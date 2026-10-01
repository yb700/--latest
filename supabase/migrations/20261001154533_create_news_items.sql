-- NOT APPLIED.
-- This migration has not been run on the live Supabase project.
-- Do not run it until Younas says so.
-- It creates public.news_items only. It does not change blog tables,
-- blog posts, blog categories, the guidance tables, or sign-in.

create table public.news_items (
    id uuid primary key default gen_random_uuid(),
    headline text not null,
    summary text not null,
    why_it_matters text,
    source_name text not null,
    source_url text not null,
    category text not null,
    image_url text,
    related_post_slug text,
    published_at timestamptz not null default now(),
    is_published boolean not null default false,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),
    constraint news_items_category_check check (
        category in (
            'mergers-acquisitions',
            'banking-finance',
            'sports-deals-regulation',
            'competition-regulation'
        )
    )
);

comment on table public.news_items is
    'Legal News items. Separate from the blog tables.';

-- Public listing is always "published, newest first", sometimes filtered by category.
create index news_items_published_at_idx
    on public.news_items (published_at desc)
    where is_published = true;

create index news_items_category_published_at_idx
    on public.news_items (category, published_at desc)
    where is_published = true;

alter table public.news_items enable row level security;

-- Same staff check the blog tables use: profiles.role is admin or editor.
-- auth.uid() is wrapped in a scalar subquery so Postgres evaluates it once per
-- statement (Supabase RLS guidance), not once per row.

create policy "public can read published news"
    on public.news_items
    for select
    to anon, authenticated
    using (is_published = true);

create policy "Staff can view all news items"
    on public.news_items
    for select
    to authenticated
    using (
        exists (
            select 1
            from public.profiles
            where id = (select auth.uid())
              and role in ('admin', 'editor')
        )
    );

create policy "Staff can insert news items"
    on public.news_items
    for insert
    to authenticated
    with check (
        exists (
            select 1
            from public.profiles
            where id = (select auth.uid())
              and role in ('admin', 'editor')
        )
    );

create policy "Staff can update news items"
    on public.news_items
    for update
    to authenticated
    using (
        exists (
            select 1
            from public.profiles
            where id = (select auth.uid())
              and role in ('admin', 'editor')
        )
    )
    with check (
        exists (
            select 1
            from public.profiles
            where id = (select auth.uid())
              and role in ('admin', 'editor')
        )
    );

create policy "Staff can delete news items"
    on public.news_items
    for delete
    to authenticated
    using (
        exists (
            select 1
            from public.profiles
            where id = (select auth.uid())
              and role in ('admin', 'editor')
        )
    );

grant select on public.news_items to anon, authenticated;
grant insert, update, delete on public.news_items to authenticated;
grant all on public.news_items to service_role;

create trigger news_items_set_updated_at
    before update on public.news_items
    for each row execute function public.update_updated_at_column();
