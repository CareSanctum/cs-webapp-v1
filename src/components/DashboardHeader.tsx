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

// --- DATA MOCKS ---

const mockResidents: Resident[] = [
  {
    id: "res-1",
    name: "Mrs. Priya Sharma",
    age: 72,
    flatNumber: "A-101",
    phone: "+91 9876543210",
    email: "priya.sharma@example.com",
    avatarInitials: "PS",
    emergencyContacts: [
      { name: "Rahul Sharma", relation: "Son", phone: "+91 9876543211" },
      { name: "Neha Sharma", relation: "Daughter", phone: "+91 9876543212" },
    ],
    safetyDevices: ["sos_button", "fall_detector"],
    medicalInfo: "Allergic to penicillin. History of hypertension.",
    recentAlerts: [
        { id: "1", residentName: "Mrs. Priya Sharma", phoneNumber: "+91 *****210", flatNumber: "A-101", incidentType: "sos", nokPhone: "+91 *****211", timestamp: new Date("2025-06-14T10:20:00"), status: "attended", description: "Emergency SOS button pressed" }
    ]
  },
  {
    id: "res-2",
    name: "Mr. Rajesh Kumar",
    age: 68,
    flatNumber: "B-205",
    phone: "+91 9876543213",
    email: "rajesh.kumar@example.com",
    avatarInitials: "RK",
    emergencyContacts: [
      { name: "Anita Kumar", relation: "Wife", phone: "+91 9876543214" },
    ],
    safetyDevices: ["smoke_detector", "gas_leak_detector"],
    medicalInfo: "No known allergies.",
    recentAlerts: [
        { id: "2", residentName: "Mr. Rajesh Kumar", phoneNumber: "+91 *****212", flatNumber: "B-205", incidentType: "fire_alarm", nokPhone: "+91 *****213", timestamp: new Date("2025-06-14T09:50:00"), status: "attended", description: "Fire alarm triggered in kitchen" }
    ]
  },
  {
    id: "res-3",
    name: "Mrs. Sunita Gupta",
    age: 75,
    flatNumber: "C-302",
    phone: "+91 9876543215",
    email: "sunita.gupta@example.com",
    avatarInitials: "SG",
    emergencyContacts: [
      { name: "Sanjay Gupta", relation: "Son", phone: "+91 9876543216" },
    ],
    safetyDevices: ["fall_detector"],
    medicalInfo: "Diabetic, requires insulin twice daily.",
    recentAlerts: []
  },
];

const mockStaff = [
  {
    id: "staff-1",
    name: "Mr. Ramesh Singh",
    role: "Head Security Officer",
    phone: "+91 9876543201",
    email: "ramesh.singh@goldenheights.com",
    photoInitials: "MRS",
    department: "Security",
    tagColor: "red",
    shift: "Day Shift (8 AM - 8 PM)",
    experience: "10 years",
    joined: "Feb 2016",
    certifications: ["Electrical Safety"],
  },
  {
    id: "staff-2",
    name: "Mr. Suresh Kumar",
    role: "Security Guard",
    phone: "+91 9876543202",
    email: "suresh.kumar@goldenheights.com",
    photoInitials: "MSK",
    department: "Security",
    tagColor: "red",
    shift: "Night Shift (8 PM - 8 AM)",
    experience: "5 years",
    joined: "Nov 2018",
    certifications: [],
  },
  {
    id: "staff-3",
    name: "Mrs. Priya Sharma",
    role: "Society Manager",
    phone: "+91 9876543203",
    email: "priya.sharma@goldenheights.com",
    photoInitials: "MPS",
    department: "Administration",
    tagColor: "blue",
    shift: "Day Shift (9 AM - 6 PM)",
    experience: "7 years",
    joined: "Apr 2017",
    certifications: [],
  },
  {
    id: "staff-4",
    name: "Mr. Vikram Patel",
    role: "Maintenance Supervisor",
    phone: "+91 9876543007",
    email: "vikram.patel@goldenheights.com",
    photoInitials: "MVP",
    department: "Maintenance",
    tagColor: "green",
    shift: "Day Shift (8 AM - 5 PM)",
    experience: "10 years",
    joined: "Feb 2018",
    certifications: ["Electrical Safety", "Plumbing Certification", "HVAC Maintenance"],
  },
  {
    id: "staff-5",
    name: "Mr. Anil Gupta",
    role: "Housekeeping Supervisor",
    phone: "+91 9876543008",
    email: "anil.gupta@goldenheights.com",
    photoInitials: "MAG",
    department: "Housekeeping",
    tagColor: "purple",
    shift: "Day Shift (8 AM - 5 PM)",
    experience: "6 years",
    joined: "Mar 2019",
    certifications: [],
  },
];

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
      <div className="flex h-16 items-center justify-between px-4 lg:px-6">
        {/* Left Section - Logo and Brand */}
        <div className="flex items-center gap-3">
          <img 
            src="/logo.png" 
            alt="CareSanctum Logo" 
            className="h-12 w-auto cursor-pointer hover:opacity-80 transition-opacity"
            onClick={handleLogoClick}
          />
          <div className="hidden sm:block">
            <h1 className="text-lg font-semibold text-gray-900">Emergency Dashboard</h1>
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
