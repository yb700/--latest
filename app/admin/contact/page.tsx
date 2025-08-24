import { Metadata } from 'next'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowLeft, Mail, User, Calendar } from 'lucide-react'

export const metadata: Metadata = {
    title: 'Contact Messages | Admin | ClearLegal',
    description: 'View and manage contact form submissions.',
}

export default function ContactMessagesPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center space-x-4">
                <Link href="/admin">
                    <Button variant="ghost" size="sm">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to Dashboard
                    </Button>
                </Link>
                <div>
                    <h1 className="text-3xl font-bold text-brand">Contact Messages</h1>
                    <p className="text-gray-600">View and manage contact form submissions.</p>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Recent Messages</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-center py-8">
                        <Mail className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No messages yet</h3>
                        <p className="text-gray-500">
                            When users submit contact forms, their messages will appear here.
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
