import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PostList } from "@/components/blog/post-list"
import { createClient } from "@/lib/supabase/server"
import { toBlogListPost, type BlogListPost, type BlogPostSource } from "@/lib/blog-listing"

export async function LatestPosts() {
    // Published posts only. A draft can take the lead spot here after it is published.
    let posts: BlogListPost[] = []

    try {
        const supabase = createClient()
        const { data } = await supabase
            .from('posts')
            .select('*, post_categories(categories(slug))')
            .eq('status', 'published')
            .order('published_at', { ascending: false })
            .limit(3)

        posts = ((data ?? []) as BlogPostSource[]).map(toBlogListPost)
    } catch (error) {
        console.error('Error fetching latest posts:', error)
    }

    return (
        <section className="bg-[#FAF9F7] py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8 max-w-[720px]">
                    <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8A8780]">
                        The blog
                    </p>
                    <h2 className="text-3xl font-semibold tracking-[-0.5px] text-[#151515] sm:text-4xl">
                        Latest blog posts
                    </h2>
                    <p className="mt-3 text-lg text-[#5E5E5E]">
                        Recent commentary on deals, finance, competition and sport.
                    </p>
                </div>

                {posts.length === 0 ? (
                    <p className="mb-8 text-[#5E5E5E]">
                        No posts are published yet.
                    </p>
                ) : (
                    <div className="mb-8 max-w-[720px]">
                        <PostList posts={posts} />
                    </div>
                )}

                <Link href="/blog" className="block max-w-[720px]">
                    <Button size="lg" className="w-full justify-between">
                        See all posts
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Button>
                </Link>
            </div>
        </section>
    )
}
