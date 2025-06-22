import { useState } from "react";
import { DashboardHeader } from "@/components/DashboardHeader";
import { Sidebar } from "@/components/Sidebar";
import { EmergencyAlertItem } from "@/components/EmergencyAlertItem";
import { StatsCards } from "@/components/StatsCards";
import { FilterControls } from "@/components/FilterControls";
import { EmergencyIncident, IncidentStatus, IncidentType } from "@/types/emergency";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import { format } from "date-fns";

// Mock data for demonstration - using today's date
const mockIncidents: EmergencyIncident[] = [{
  id: "1",
  residentName: "Mrs. Priya Sharma",
  phoneNumber: "+91 *****210",
  flatNumber: "A-101",
  incidentType: "sos",
  nokPhone: "+91 *****211",
  timestamp: new Date("2025-06-14T10:20:00"),
  status: "yet_to_attend",
  description: "Emergency SOS button pressed"
}, {
  id: "2",
  residentName: "Mr. Rajesh Kumar",
  phoneNumber: "+91 *****212",
  flatNumber: "B-205",
  incidentType: "fire_alarm",
  nokPhone: "+91 *****213",
  timestamp: new Date("2025-06-14T09:50:00"),
  status: "attending",
  description: "Fire alarm triggered in kitchen"
}, {
  id: "3",
  residentName: "Mrs. Sunita Gupta",
  phoneNumber: "+91 *****214",
  flatNumber: "C-302",
  incidentType: "fall_detection",
  nokPhone: "+91 *****215",
  timestamp: new Date("2025-06-14T09:20:00"),
  status: "attended",
  description: "Fall detected in bedroom"
}, {
  id: "4",
  residentName: "Mr. Amit Patel",
  phoneNumber: "+91 *****216",
  flatNumber: "D-401",
  incidentType: "gas_leak",
  nokPhone: "+91 *****217",
  timestamp: new Date("2025-06-14T11:15:00"),
  status: "yet_to_attend",
  description: "Gas leak detected in kitchen area"
}, {
  id: "5",
  residentName: "Mrs. Kavita Singh",
  phoneNumber: "+91 *****218",
  flatNumber: "E-103",
  incidentType: "smoke_detector",
  nokPhone: "+91 *****219",
  timestamp: new Date("2025-06-14T08:30:00"),
  status: "attended",
  description: "Smoke detected in living room"
}, {
  id: "6",
  residentName: "Mr. Deepak Joshi",
  phoneNumber: "+91 *****220",
  flatNumber: "F-506",
  incidentType: "sos",
  nokPhone: "+91 *****221",
  timestamp: new Date("2025-06-14T12:45:00"),
  status: "attending",
  description: "Medical emergency - SOS activated"
}, {
  id: "7",
  residentName: "Mrs. Rekha Mehta",
  phoneNumber: "+91 *****222",
  flatNumber: "G-208",
  incidentType: "fall_detection",
  nokPhone: "+91 *****223",
  timestamp: new Date("2025-06-14T07:10:00"),
  status: "attended",
  description: "Fall detected in bathroom"
}, {
  id: "8",
  residentName: "Mr. Suresh Agarwal",
  phoneNumber: "+91 *****224",
  flatNumber: "H-304",
  incidentType: "fire_alarm",
  nokPhone: "+91 *****225",
  timestamp: new Date("2025-06-14T13:20:00"),
  status: "yet_to_attend",
  description: "Fire alarm activated in bedroom"
}];

const Index = () => {
  const [incidents] = useState<EmergencyIncident[]>(mockIncidents);
  const [statusFilter, setStatusFilter] = useState<IncidentStatus | "all">("all");
  const [typeFilter, setTypeFilter] = useState<IncidentType | "all">("all");
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  
  const filteredIncidents = incidents.filter(incident => {
    const matchesStatus = statusFilter === "all" || incident.status === statusFilter;
    const matchesType = typeFilter === "all" || incident.incidentType === typeFilter;
    const matchesDate = incident.timestamp.toDateString() === selectedDate.toDateString();
    return matchesStatus && matchesType && matchesDate;
  });
  
  const todayIncidents = incidents.filter(incident => incident.timestamp.toDateString() === new Date().toDateString());
  
  const stats = {
    yetToAttend: todayIncidents.filter(i => i.status === "yet_to_attend").length,
    attending: todayIncidents.filter(i => i.status === "attending").length,
    attended: todayIncidents.filter(i => i.status === "attended").length,
    total: todayIncidents.length
  };

  const handleStatusFilterChange = (value: string) => {
    setStatusFilter(value as IncidentStatus | "all");
  };

  const handleTypeFilterChange = (value: string) => {
    setTypeFilter(value as IncidentType | "all");
  };

  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(date);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader onMobileMenuToggle={() => setIsSidebarOpen(true)} />
      
      <div className="flex h-[calc(100vh-64px)] relative">
        {/* Mobile sidebar overlay */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" 
            onClick={() => setIsSidebarOpen(false)} 
          />
        )}
        
        {/* Sidebar */}
        <div className={`
          fixed lg:relative z-50 lg:z-auto
          ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}
          lg:translate-x-0
          transition-transform duration-300 ease-in-out
          h-full
          right-0 lg:right-auto lg:left-0
          top-0 lg:top-auto
        `}>
          <Sidebar onClose={() => setIsSidebarOpen(false)} />
        </div>
        
        <main className="flex-1 overflow-auto">
          <div className="p-4 lg:p-6 space-y-6">
            {/* Header Section */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-gray-600 mt-1">
                  Emergency response overview for {format(new Date(), "MMMM dd, yyyy")}
                </p>
              </div>
            </div>

            {/* Stats Cards */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Today's Overview</h2>
              <StatsCards stats={stats} />
            </div>

            {/* Filters and Alerts Section */}
            <div className="space-y-4">
              <FilterControls
                statusFilter={statusFilter}
                typeFilter={typeFilter}
                selectedDate={selectedDate}
                onStatusChange={handleStatusFilterChange}
                onTypeChange={handleTypeFilterChange}
                onDateChange={handleDateChange}
                showFilters={showFilters}
                onToggleFilters={() => setShowFilters(!showFilters)}
              />
              
              {/* Desktop Section Title */}
              <div className="hidden lg:block">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Emergency Alerts</h3>
              </div>
            </div>
            
            {/* Emergency Alerts List */}
            {filteredIncidents.length === 0 ? (
              <Card className="border-0 shadow-sm bg-white">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="h-8 w-8 text-green-500" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">All Clear!</h3>
                  <p className="text-gray-500">
                    {selectedDate.toDateString() === new Date().toDateString() 
                      ? "No emergency incidents to report today." 
                      : "No incidents recorded for the selected date."}
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-3">
                {filteredIncidents.map(incident => (
                  <EmergencyAlertItem key={incident.id} incident={incident} />
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
