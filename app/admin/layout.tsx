import { redirect } from 'next/navigation'
import { getUser, getProfile, isStaff } from '@/lib/auth-server'
import { AdminShell } from '@/components/admin/admin-shell'

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const user = await getUser()

    if (!user) {
        redirect('/auth/login')
    }

    const profile = await getProfile()

    if (!profile || !isStaff(profile.role)) {
        redirect('/')
    }

    return <AdminShell>{children}</AdminShell>
}
