
import { useParams, Link } from "react-router";
import { ArrowLeft, Phone, MapPin, Clock, User, AlertTriangle, CheckCircle, XCircle } from "lucide-react";
import { DashboardHeader } from "@/components/DashboardHeader";
import { Sidebar } from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

// Mock data - in real app this would come from API
const mockIncidentDetail = {
  id: "1",
  residentName: "Mrs. Priya Sharma",
  phoneNumber: "+91 9876543210",
  flatNumber: "A-101",
  incidentType: "sos",
  nokPhone: "+91 9876543211",
  timestamp: new Date("2025-06-21T10:20:00"),
  status: "yet_to_attend",
  description: "Emergency SOS button pressed in bedroom area",
  address: "A-101, Golden Heights Residency, Sector 12, Gurgaon",
  history: [
    { time: "10:20 AM", action: "Emergency alert triggered", user: "System" },
    { time: "10:21 AM", action: "Alert sent to security team", user: "System" },
    { time: "10:22 AM", action: "Security guard notified", user: "System" }
  ]
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "yet_to_attend": return "bg-red-100 text-red-700 border-red-200";
    case "attending": return "bg-yellow-100 text-yellow-700 border-yellow-200";
    case "attended": return "bg-green-100 text-green-700 border-green-200";
    default: return "bg-gray-100 text-gray-700 border-gray-200";
  }
};

const getIncidentTypeLabel = (type: string) => {
  switch (type) {
    case "sos": return "SOS Emergency";
    case "fire_alarm": return "Fire Alarm";
    case "smoke_detector": return "Smoke Detected";
    case "gas_leak": return "Gas Leak";
    case "fall_detection": return "Fall Detected";
    default: return type;
  }
};

const EmergencyDetail = () => {
  const { id } = useParams();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const incident = mockIncidentDetail; // In real app, fetch by id

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <DashboardHeader onMobileMenuToggle={() => setIsSidebarOpen(true)} />
      
      <div className="flex h-[calc(100vh-73px)] relative">
        {/* Mobile sidebar overlay */}
        {isSidebarOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={() => setIsSidebarOpen(false)} />
        )}
        
        {/* Sidebar */}
        <div className={`
          fixed lg:relative z-50 lg:z-auto
          ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}
          lg:translate-x-0
          transition-transform duration-300 ease-in-out
          h-full
          right-0 lg:right-auto lg:left-0
        `}>
          <Sidebar onClose={() => setIsSidebarOpen(false)} />
        </div>
        
        <main className="flex-1 overflow-auto">
          <div className="p-4 lg:p-8 max-w-4xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <Button variant="ghost" asChild className="flex items-center gap-2 text-slate-600 hover:text-slate-900">
                <Link to="/">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Dashboard
                </Link>
              </Button>
              <Badge className={`px-3 py-1 text-sm font-medium border ${getStatusColor(incident.status)}`}>
                {incident.status.replace('_', ' ').toUpperCase()}
              </Badge>
            </div>

            {/* Emergency Info Card */}
            <Card className="mb-6 shadow-sm border-0 bg-white/70 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl text-slate-800 mb-2">{getIncidentTypeLabel(incident.incidentType)}</CardTitle>
                    <p className="text-slate-600 text-sm">{incident.description}</p>
                  </div>
                  <AlertTriangle className="h-8 w-8 text-red-500" />
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <User className="h-5 w-5 text-slate-500" />
                    <div>
                      <p className="font-medium text-slate-800">{incident.residentName}</p>
                      <p className="text-sm text-slate-600">Resident</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-slate-500" />
                    <div>
                      <p className="font-medium text-slate-800">{incident.flatNumber}</p>
                      <p className="text-sm text-slate-600">{incident.address}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-slate-500" />
                    <div>
                      <p className="font-medium text-slate-800">{incident.phoneNumber}</p>
                      <p className="text-sm text-slate-600">Primary Contact</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-slate-500" />
                    <div>
                      <p className="font-medium text-slate-800">{incident.timestamp.toLocaleTimeString()}</p>
                      <p className="text-sm text-slate-600">{incident.timestamp.toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-slate-200">
                  <p className="text-sm text-slate-600 mb-2">Emergency Contact:</p>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-slate-500" />
                    <span className="font-medium text-slate-800">{incident.nokPhone}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action History */}
            <Card className="shadow-sm border-0 bg-white/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg text-slate-800">Action History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {incident.history.map((entry, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-slate-50/50">
                      <div className="h-2 w-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <p className="font-medium text-slate-800 text-sm">{entry.action}</p>
                          <span className="text-xs text-slate-500">{entry.time}</span>
                        </div>
                        <p className="text-xs text-slate-600">by {entry.user}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex gap-3 mt-6">
              <Button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">
                Mark as Attending
              </Button>
              <Button variant="outline" className="flex-1 border-green-600 text-green-600 hover:bg-green-50">
                Mark as Resolved
              </Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default EmergencyDetail;
