import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Server, Package } from 'lucide-react';

interface LayoutProps {
    children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    const location = useLocation();

    const navItems = [
        { path: '/racks', label: 'Racks', icon: Server },
        { path: '/equipment', label: 'Equipment', icon: Package },
    ];

    return (
        <div className="min-h-screen bg-background">
            <header className="border-b">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Server className="h-6 w-6 text-primary" />
                            <h1 className="text-2xl font-bold">Rack Tracker</h1>
                        </div>
                        <nav className="flex gap-1">
                            {navItems.map((item) => {
                                const Icon = item.icon;
                                const isActive = location.pathname === item.path;
                                return (
                                    <Link
                                        key={item.path}
                                        to={item.path}
                                        className={cn(
                                            'flex items-center gap-2 px-4 py-2 rounded-md transition-colors',
                                            isActive
                                                ? 'bg-primary text-primary-foreground'
                                                : 'hover:bg-muted text-muted-foreground'
                                        )}
                                    >
                                        <Icon className="h-4 w-4" />
                                        {item.label}
                                    </Link>
                                );
                            })}
                        </nav>
                    </div>
                </div>
            </header>
            <main className="container mx-auto px-4 py-8">{children}</main>
        </div>
    );
}