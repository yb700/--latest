import { Metadata } from 'next'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import Link from 'next/link'
import { ArrowLeft, Settings, Save } from 'lucide-react'

export const metadata: Metadata = {
    title: 'Site Settings | Admin | ClearCut Law',
    description: 'Manage site configuration and settings.',
}

export default function SiteSettingsPage() {
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
                    <h1 className="text-3xl font-bold text-brand">Site Settings</h1>
                    <p className="text-gray-600">Manage your site configuration and settings.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                            <Settings className="h-5 w-5" />
                            <span>General Settings</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="site-name">Site Name</Label>
                            <Input
                                id="site-name"
                                defaultValue="ClearCut Law"
                                className="w-full"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="site-description">Site Description</Label>
                            <Textarea
                                id="site-description"
                                defaultValue="UK Legal Commentary & Guidance Platform"
                                className="w-full"
                                rows={3}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="contact-email">Contact Email</Label>
                            <Input
                                id="contact-email"
                                type="email"
                                defaultValue="contact@ClearCut Law.com"
                                className="w-full"
                            />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Legal Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="disclaimer">Legal Disclaimer</Label>
                            <Textarea
                                id="disclaimer"
                                defaultValue="This website provides general legal information only and does not constitute legal advice. For specific legal guidance, please consult with a qualified legal professional."
                                className="w-full"
                                rows={4}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="privacy-policy">Privacy Policy</Label>
                            <Textarea
                                id="privacy-policy"
                                placeholder="Enter your privacy policy..."
                                className="w-full"
                                rows={4}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="terms">Terms of Service</Label>
                            <Textarea
                                id="terms"
                                placeholder="Enter your terms of service..."
                                className="w-full"
                                rows={4}
                            />
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="flex justify-end">
                <Button className="flex items-center space-x-2">
                    <Save className="h-4 w-4" />
                    <span>Save Settings</span>
                </Button>
            </div>
        </div>
    )
}
