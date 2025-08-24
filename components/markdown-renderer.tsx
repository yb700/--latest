"use client"

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeHighlight from 'rehype-highlight'
import { cn } from '@/lib/utils'

interface MarkdownRendererProps {
    content: string
    className?: string
}

export function MarkdownRenderer({ content, className }: MarkdownRendererProps) {
    return (
        <div className={cn("prose prose-slate max-w-none", className)}>
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[
                    rehypeSlug,
                    [rehypeAutolinkHeadings, { behavior: 'wrap' }],
                    rehypeHighlight,
                ]}
                components={{
                    h1: ({ children, ...props }) => (
                        <h1 className="text-3xl font-bold text-brand mb-6" {...props}>
                            {children}
                        </h1>
                    ),
                    h2: ({ children, ...props }) => (
                        <h2 className="text-2xl font-semibold text-brand mt-8 mb-4" {...props}>
                            {children}
                        </h2>
                    ),
                    h3: ({ children, ...props }) => (
                        <h3 className="text-xl font-semibold text-brand mt-6 mb-3" {...props}>
                            {children}
                        </h3>
                    ),
                    p: ({ children, ...props }) => (
                        <p className="text-slate-700 leading-relaxed mb-4" {...props}>
                            {children}
                        </p>
                    ),
                    a: ({ children, href, ...props }) => (
                        <a
                            href={href}
                            className="text-brand-600 hover:text-brand-700 underline underline-offset-4"
                            {...props}
                        >
                            {children}
                        </a>
                    ),
                    ul: ({ children, ...props }) => (
                        <ul className="list-disc list-inside space-y-2 mb-4 text-slate-700" {...props}>
                            {children}
                        </ul>
                    ),
                    ol: ({ children, ...props }) => (
                        <ol className="list-decimal list-inside space-y-2 mb-4 text-slate-700" {...props}>
                            {children}
                        </ol>
                    ),
                    blockquote: ({ children, ...props }) => (
                        <blockquote className="border-l-4 border-brand-200 pl-4 py-2 italic text-slate-600 bg-slate-50 rounded-r-lg mb-4" {...props}>
                            {children}
                        </blockquote>
                    ),
                    code: ({ children, className, ...props }) => {
                        const isInline = !className
                        if (isInline) {
                            return (
                                <code className="bg-slate-100 text-slate-800 px-1 py-0.5 rounded text-sm font-mono" {...props}>
                                    {children}
                                </code>
                            )
                        }
                        return (
                            <code className={className} {...props}>
                                {children}
                            </code>
                        )
                    },
                    pre: ({ children, ...props }) => (
                        <pre className="bg-slate-900 text-slate-100 p-4 rounded-xl overflow-x-auto mb-4" {...props}>
                            {children}
                        </pre>
                    ),
                }}
            >
                {content}
            </ReactMarkdown>
        </div>
    )
}


