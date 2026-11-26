import AuthGuard from '../auth-guard';
import DashboardShell from '../dashboard-shell';
export default function ProtectedLayout({children}:{children:React.ReactNode}){return <AuthGuard><DashboardShell>{children}</DashboardShell></AuthGuard>}
