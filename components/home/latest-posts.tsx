import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { createClient } from "@/lib/supabase/server"
import { formatDate } from "@/lib/utils"
import { ArrowRight, Clock, User } from "lucide-react"

export async function LatestPosts() {
    const supabase = createClient()

    // Get latest 3 published posts with author and categories
    const { data: posts } = await supabase
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

    if (!posts || posts.length === 0) {
        return (
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl font-bold text-brand mb-4">
                            Latest Blog Posts
                        </h2>
                        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                            Stay informed with our latest legal insights and commentary
                        </p>
                    </div>

                    <div className="text-center">
                        <p className="text-slate-600 mb-6">
                            No blog posts available yet. Check back soon for legal insights and commentary.
                        </p>
                        <Link href="/blog">
                            <Button variant="outline">
                                View All Posts
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>
        )
    }

    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl sm:text-4xl font-bold text-brand mb-4">
                        Latest Blog Posts
                    </h2>
                    <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                        Stay informed with our latest legal insights and commentary
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
                                <div className="flex items-center justify-between mb-2">
                                    {post.post_categories?.[0]?.category && (
                                        <Badge variant="secondary" className="text-xs">
                                            {post.post_categories[0].category.name}
                                        </Badge>
                                    )}
                                    <div className="flex items-center text-xs text-slate-500">
                                        <Clock className="h-3 w-3 mr-1" />
                                        {post.reading_time || 5} min read
                                    </div>
                                </div>

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
                                    <time className="text-sm text-slate-500">
                                        {formatDate(post.published_at || post.created_at)}
                                    </time>
                                </div>

                                <Link href={`/blog/${post.slug}`} className="block mt-4">
                                    <Button variant="ghost" size="sm" className="w-full group/button">
                                        Read More
                                        <ArrowRight className="ml-2 h-4 w-4 group-hover/button:translate-x-1 transition-transform" />
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="text-center">
                    <Link href="/blog">
                        <Button size="lg">
                            View All Posts
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    )
}
