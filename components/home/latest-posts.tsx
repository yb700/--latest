import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { createClient } from "@/lib/supabase/server"
import { ArrowRight, User } from "lucide-react"

export async function LatestPosts() {
    // Published posts only. A draft can take the lead spot here after it is published.
    let posts: Array<{
        id: string
        title: string
        slug: string
        excerpt: string | null
        hero_image_url: string | null
        author: { full_name: string | null } | null
        post_categories: Array<{ category: { name: string; slug: string } | null }> | null
    }> | null = null

    try {
        const supabase = createClient()
        const { data } = await supabase
            .from('posts')
            .select(`
      *,
      author:profiles(full_name),
      post_categories(
        category:categories(name, slug)
      )
    `)
            .eq('status', 'published')
            .order('published_at', { ascending: false })
            .limit(3)

        posts = data
    } catch (error) {
        console.error('Error fetching latest posts:', error)
    }

    if (!posts || posts.length === 0) {
        return (
            <section className="bg-white py-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-10 max-w-2xl">
                        <h2 className="mb-3 text-3xl font-bold text-brand sm:text-4xl">
                            Latest blog posts
                        </h2>
                        <p className="text-lg text-slate-600">
                            Recent commentary on deals, finance, competition and sport.
                        </p>
                    </div>

                    <div>
                        <p className="mb-6 text-slate-600">
                            No posts are published yet.
                        </p>
                        <Link href="/blog">
                            <Button variant="outline">
                                See the blog
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>
        )
    }

    return (
        <section className="bg-white py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-10 max-w-2xl">
                    <h2 className="mb-3 text-3xl font-bold text-brand sm:text-4xl">
                        Latest blog posts
                    </h2>
                    <p className="text-lg text-slate-600">
                        Recent commentary on deals, finance, competition and sport.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    {posts.map((post) => (
                        <Card key={post.id} className="group hover:shadow-lg transition-all duration-200 hover:-translate-y-1 overflow-hidden">
                            {post.hero_image_url && (
                                <div className="relative h-48 overflow-hidden">
                                    <Image
                                        src={post.hero_image_url}
                                        alt={post.title}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-200"
                                    />
                                </div>
                            )}

                            <CardHeader className="pb-3">
                                {post.post_categories?.[0]?.category && (
                                    <div className="mb-2">
                                        <Badge variant="secondary" className="text-xs">
                                            {post.post_categories[0].category.name}
                                        </Badge>
                                    </div>
                                )}

                                <CardTitle className="text-xl line-clamp-2 group-hover:text-brand transition-colors">
                                    <Link href={`/blog/${post.slug}`}>
                                        {post.title}
                                    </Link>
                                </CardTitle>
                            </CardHeader>

                            <CardContent>
                                {post.excerpt && (
                                    <CardDescription className="text-slate-600 mb-4 line-clamp-3 leading-relaxed">
                                        {post.excerpt}
                                    </CardDescription>
                                )}

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center text-sm text-slate-500">
                                        <User className="h-4 w-4 mr-1" />
                                        {post.author?.full_name || 'Younas Ficel'}
                                    </div>
                                </div>

                                <Link href={`/blog/${post.slug}`} className="block mt-4">
                                    <Button variant="ghost" size="sm" className="w-full group/button">
                                        Read the full story
                                        <ArrowRight className="ml-2 h-4 w-4 group-hover/button:translate-x-1 transition-transform" />
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div>
                    <Link href="/blog">
                        <Button size="lg">
                            See all blog posts
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    )
}
