import { useState } from "react";
import { DashboardHeader } from "@/components/DashboardHeader";
import { Sidebar } from "@/components/Sidebar";
import { EmergencyAlertItem } from "@/components/EmergencyAlertItem";
import { StatsCards } from "@/components/StatsCards";
import { FilterControls } from "@/components/FilterControls";
import { EmergencyIncident, IncidentStatus, IncidentType } from "@/types/emergency";
import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle, CheckCircle, ChevronDown } from "lucide-react";
import { format } from "date-fns";
import { useTicketList } from "@/hooks/ticketList.hook";
import { getCSRFToken, getUtcDayBounds } from "@/utils";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";



const Index = () => {
  const [statusFilter, setStatusFilter] = useState<IncidentStatus | "all">("all");
  const [typeFilter, setTypeFilter] = useState<IncidentType | "all">("all");
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [isOverviewExpanded, setIsOverviewExpanded] = useState(true);
  const isoString = selectedDate.toISOString()
  // console.log(isoString);

  // Convert filter values to API parameters
  const getApiParams = () => {
    const { startUtcIso, endUtcIso } = getUtcDayBounds(selectedDate);

    const params: any = {
      date_from: startUtcIso,
      date_to: endUtcIso,
    };
    // console.log({startUtcIso, endUtcIso});

    if (statusFilter !== "all") {
      params.status = statusFilter;
    }

    if (typeFilter !== "all") {
      params.type = typeFilter;
    }

    return params;
  };

  // Use the ticket list hook with current filter parameters
  const { data: ticketData, isLoading, error } = useTicketList(getApiParams());

  // Convert API tickets to EmergencyIncident format for compatibility
  const incidents: EmergencyIncident[] = ticketData?.tickets?.map(ticket => ({
    id: ticket.id.toString(),
    residentName: ticket.user_initiated.full_name,
    phoneNumber: ticket.user_initiated.phone_number,
    flatNumber: "N/A", // API doesn't provide this, you might need to add it
    incidentType: ticket.type.code as IncidentType,
    nokPhone: "N/A", // API doesn't provide this, you might need to add it
    timestamp: new Date(ticket.created_at),
    status: ticket.status as IncidentStatus,
    description: `${ticket.type.name} - ${ticket.user_initiated.full_name}`,
  })) || [];

  
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

            {/* Stats Cards - Mobile/Tablet (Collapsible) */}
            <div className="lg:hidden">
              <Collapsible
                open={isOverviewExpanded}
                onOpenChange={setIsOverviewExpanded}
                className="space-y-4"
              >
                <CollapsibleTrigger asChild>
                  <div
                    role="button"
                    className="flex cursor-pointer items-center gap-2"
                  >
                    <h2 className="text-lg font-semibold text-gray-900">
                      Today's Overview
                    </h2>
                    <ChevronDown
                      className={`h-4 w-4 transition-transform duration-200 ${
                        isOverviewExpanded ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <StatsCards stats={stats} />
                </CollapsibleContent>
              </Collapsible>
            </div>

            {/* Stats Cards - Desktop (Always Visible) */}
            <div className="hidden lg:block">
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
            {isLoading ? (
              <Card className="border-0 shadow-sm bg-white/70 backdrop-blur-sm">
                <CardContent className="p-8 text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                  <p className="text-slate-600">Loading incidents...</p>
                </CardContent>
              </Card>
            ) : error ? (
              <Card className="border-red-200 bg-red-50">
                <CardContent className="p-8 text-center">
                  <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-red-700 mb-2">Error Loading Data</h3>
                  <p className="text-red-600">Failed to load incident data. Please try again.</p>
                </CardContent>
              </Card>
            ) : incidents.length === 0 ? (
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
                {incidents.map(incident => (
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
