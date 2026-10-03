import Link from "next/link"
import { Button } from "@/components/ui/button"
import { BlogPostCard } from "@/components/blog/post-card"
import { createClient } from "@/lib/supabase/server"
import { toBlogListPost, type BlogListPost, type BlogPostSource } from "@/lib/blog-listing"
import { ArrowRight } from "lucide-react"

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
        <section className="border-t border-slate-200 bg-white py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-10 max-w-2xl">
                    <h2 className="mb-3 text-3xl font-bold text-brand sm:text-4xl">
                        Latest blog posts
                    </h2>
                    <p className="text-lg text-slate-600">
                        Recent commentary on deals, finance, competition and sport.
                    </p>
                </div>

                {posts.length === 0 ? (
                    <div>
                        <p className="mb-6 text-slate-600">
                            No posts are published yet.
                        </p>
                    </div>
                ) : (
                    <div className="mb-12 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {posts.map((post) => (
                            <BlogPostCard key={post.id} post={post} />
                        ))}
                    </div>
                )}

                <div>
                    <Link href="/blog">
                        <Button size="lg">
                            See all posts
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    )
}
