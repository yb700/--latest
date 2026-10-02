# Legal News items

The migration `supabase/migrations/20261001154533_create_news_items.sql` **has not been run**.

Do not run it on the live Supabase project until Younas says so. It only creates `public.news_items`. It does not change the blog tables and it does not drop the old guidance tables.

There is no admin form yet. After the migration has been applied, add an item by inserting a row. Set `is_published` to `true` for it to appear on the site. Any database write still needs Younas's permission first.

Category values:

- `mergers-acquisitions` — Mergers and Acquisitions
- `banking-finance` — Banking and Finance
- `sports-deals-regulation` — Sports Deals and Regulation
- `competition-regulation` — Competition and Regulation

Store the headline in normal case. The site shows it in capitals.

```sql
insert into public.news_items (
    headline,
    summary,
    why_it_matters,
    source_name,
    source_url,
    category,
    image_url,
    related_post_slug,
    is_published
) values (
    'CMA clears the Example Group merger',
    'The Competition and Markets Authority has cleared the deal after a phase 1 review.',
    'Phase 1 clearance means the parties can complete without offering remedies.',
    'GOV.UK',
    'https://www.gov.uk/government/organisations/competition-and-markets-authority',
    'competition-regulation',
    null,
    null,
    true
);
```

Leave `why_it_matters`, `image_url`, and `related_post_slug` as `null` when they do not apply. The feed does not show `why_it_matters` or images.

`related_post_slug` is not shown on the card. Clicking a card expands the summary in place, and clicking it again collapses it. The card does not open the source website or a blog post. The source line is plain text.

Cards use short category labels: M&A, Finance, Sport, Competition. The filter links stay `/news?category=` plus the stored slug.
