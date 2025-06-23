import { X, Users, Archive, LogOut, Home, Shield, Building2, Loader2, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";
import { useLogout } from "@/hooks/logout.hook";
interface SidebarProps {
  onClose?: () => void;
}

export const Sidebar = ({ onClose }: SidebarProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  const { mutate: handleLogout, status: logoutStatus} = useLogout();
  // Reset collapsed state on mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsCollapsed(false); // Always expand on mobile
      }
    };

    handleResize(); // Check initial size
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navigationItems = [
    {
      icon: Home,
      label: "Dashboard",
      href: "/",
      description: "Emergency overview"
    },
    {
      icon: Briefcase,
      label: "Staff",
      href: "/staff",
      description: "Directory"
    },
    {
      icon: Users,
      label: "Residents",
      href: "/residents",
      description: "Directory"
    },
    {
      icon: Building2,
      label: "Society",
      href: "/society",
      description: "Information"
    },
    // {
    //   icon: Archive,
    //   label: "Reports",
    //   href: "/reports",
    //   description: "Analytics"
    // }
  ];

  const isMobile = window.innerWidth < 1024;
  const sidebarWidth = isMobile ? 280 : (isCollapsed ? 64 : 280);

  return (
    <div
      className={`transition-all duration-300 h-full flex flex-col bg-white border-r border-gray-200 shadow-sm`}
      style={{ width: sidebarWidth }}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[#591089] to-[#84299C] flex items-center justify-center">
            <span className="text-sm font-medium text-white">GS</span>
          </div>
          {(!isCollapsed || isMobile) && (
            <div>
              <p className="text-sm font-medium text-gray-900">Guard Singh</p>
              <p className="text-xs text-gray-500">Security Officer</p>
            </div>
          )}
        </div>
        
        {/* Mobile close button only */}
        {onClose && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onClose} 
            className="lg:hidden h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Navigation Items */}
      <div className="flex-1 p-4">
        <nav className="space-y-2">
          {navigationItems.map((item, index) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={index}
                to={item.href}
                className={`group flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
                  isActive 
                    ? 'bg-purple-50 text-[#591089] border border-purple-200' 
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <div className={`flex-shrink-0 p-1.5 rounded-md ${
                  isActive 
                    ? 'bg-gradient-to-br from-[#591089] to-[#84299C] text-white' 
                    : 'text-gray-500 group-hover:text-gray-700'
                }`}>
                  <item.icon className="h-5 w-5" />
                </div>
                {(!isCollapsed || isMobile) && (
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm">{item.label}</div>
                    <div className="text-xs text-gray-500 truncate">{item.description}</div>
                  </div>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        <Button
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-600 hover:bg-red-50 hover:text-red-700 transition-all duration-200"
          onClick={() => handleLogout()}
          disabled={logoutStatus === 'pending'}
          variant="ghost"
        >
          {logoutStatus === 'pending' ? (
            <div className="flex items-center gap-2">
              <Loader2 className="animate-spin" />
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <div className="flex-shrink-0 p-1.5 rounded-md text-red-500">
                <LogOut className="h-5 w-5" />
              </div>
              {(!isCollapsed || isMobile) && (
                  <span className="font-medium text-sm">Sign Out</span>
              )}
            </div>
          )}
        </Button>
      </div>
    </div>
  );
};
