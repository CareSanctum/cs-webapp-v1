import { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Society, Resident, EmergencyIncident } from "@/types/emergency";
import {
  Users,
  LogOut,
  Edit,
  Search,
  Home,
  Phone,
  Mail,
  ShieldAlert,
  User,
  Badge,
  Building2,
  UserCog2,
  MapPin,
  Menu,
  Bell,
  Settings,
} from "lucide-react";

const departmentColors: { [key: string]: string } = {
  Security: "bg-red-100 text-red-700 border-red-200",
  Administration: "bg-blue-100 text-blue-700 border-blue-200",
  Maintenance: "bg-green-100 text-green-700 border-green-200",
  Housekeeping: "bg-purple-100 text-purple-700 border-purple-200",
};

// --- COMPONENTS ---

const SafetyDeviceBadge = ({ device }: { device: string }) => {
  const formattedDevice = device
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
  return (
    <Button variant="outline" size="sm" className="cursor-default">
      {formattedDevice}
    </Button>
  );
};

// STAFF DEPARTMENT BADGE
const StaffDeptBadge = ({ department }: { department: string }) => (
  <span
    className={`border px-2 py-0.5 rounded-full text-xs font-medium ${departmentColors[department] || "bg-gray-100 text-gray-600 border-gray-300"}`}
  >
    {department}
  </span>
);

interface DashboardHeaderProps {
  onMobileMenuToggle?: () => void;
}

export const DashboardHeader = ({ onMobileMenuToggle }: DashboardHeaderProps) => {
  const navigate = useNavigate();
  const [society, setSociety] = useState<Society>({
    id: "1",
    name: "Golden Heights Residency",
    logoUrl: undefined,
  });

  const handleLogoClick = () => {
    navigate('/');
  };

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSociety(prev => ({
          ...prev,
          logoUrl: e.target?.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="flex h-16 items-center justify-between px-6 lg:px-8">
        {/* Left Section - Logo and Brand */}
        <div className="flex items-center space-x-4 shrink-0">
            <div className="flex items-center space-x-3">
              <img
                src="/lovable-uploads/ce42e031-be3b-4c21-8b06-f0ea6e60fe7e.png"
                alt="CareStanctum"
                className="h-10 sm:h-12 w-auto transition-all duration-300 rounded-xl"
              />
              <div className="hidden md:block bg-gradient-to-r from-[#3d007d] to-[#ba48b3] text-white px-4 py-1.5 rounded-lg text-lg lg:text-xl font-extrabold tracking-tight transition-all duration-300">
                Emergency Response Dashboard
              </div>
            </div>
          </div>
        {/* Right Section - Mobile Menu Button */}
        <div className="flex items-center">
          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={onMobileMenuToggle}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
