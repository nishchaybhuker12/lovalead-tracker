import { Link, useLocation } from "react-router-dom";
import { BarChart3, GitCompare, Users } from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Dashboard", href: "/", icon: BarChart3 },
  { name: "Compare", href: "/compare", icon: GitCompare },
  { name: "Adoption", href: "/adoption", icon: Users },
];

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b border-border bg-card shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-8">
              <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                DataSync Pro
              </h1>
              <div className="flex gap-1">
                {navigation.map((item) => {
                  const isActive = location.pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={cn(
                        "flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all",
                        isActive
                          ? "bg-primary text-primary-foreground shadow-sm"
                          : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                      )}
                    >
                      <item.icon className="h-4 w-4" />
                      {item.name}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </nav>
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
};
