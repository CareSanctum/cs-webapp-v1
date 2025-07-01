import { useParams, Link } from "react-router";
import { ArrowLeft, Phone, MapPin, Clock, User, AlertTriangle, CheckCircle, XCircle } from "lucide-react";
import { DashboardHeader } from "@/components/DashboardHeader";
import { Sidebar } from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { useTicketDetail } from "@/hooks/ticketDetail.hook";
import { useTicketHistory } from "@/hooks/ticketHistory.hook";
import axios from "axios";

const getStatusColor = (status: string) => {
  switch (status) {
    case "OPEN": return "bg-red-100 text-red-700 border-red-200";
    case "ATTENDING":
    case "VALIDATED":
    case "INVALID":
    case "CORDINATION_REQUIRED":
    case "NO_CORDINATION_REQUIRED":
      return "bg-yellow-100 text-yellow-700 border-yellow-200";
    case "CLOSED": return "bg-green-100 text-green-700 border-green-200";
    default: return "bg-gray-100 text-gray-700 border-gray-200";
  }
};

const getIncidentTypeLabel = (type: string) => {
  switch (type) {
    case "PHYSICAL_SOS": return "Physical SOS Alert";
    case "WATCH_SOS": return "Watch SOS Alert";
    case "SMOKE_DETECTED": return "Smoke Detected Alert";
    case "GAS_LEAKAGE": return "Gas Leakage Alert";
    case "FALL_DETECTED": return "Fall Detected";
    default: return type;
  }
};
const getIncidentTypedescription = (type: string) => {
  switch (type) {
    case "PHYSICAL_SOS": return "Emergency SOS button pressed";
    case "WATCH_SOS": return "Watch SOS button pressed";
    case "SMOKE_DETECTED": return "Smoke detected by the device";
    case "GAS_LEAKAGE": return "Gas Leak detected by the device";
    case "FALL_DETECTED": return "Fall detected by the device";
    default: return `${type} Alert Occured`;
  }
}

const EmergencyDetail = () => {
  const { id } = useParams();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const ticketId = id ? parseInt(id, 10) : undefined;
  const { data: incident, isLoading, error } = useTicketDetail(ticketId!);
  const { data: history, status: historyStatus, error: historyError } = useTicketHistory(ticketId!);
  const historyData = history?.history || [];
  console.log(historyData);

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
              <Badge className={`px-3 py-1 text-sm font-medium border ${getStatusColor(incident?.status || "")}`}>
                {(incident?.status || "").replace('_', ' ').toUpperCase()}
              </Badge>
            </div>

            {/* Emergency Info Card & Action History - Loading/Error/Data */}
            {isLoading ? (
              <Card className="mb-6 shadow-sm border-0 bg-white/70 backdrop-blur-sm">
                <CardContent className="flex justify-center items-center min-h-[200px]">
                  <span className="text-lg font-medium">Loading...</span>
                </CardContent>
              </Card>
            ) : error ? (
              <Card className="mb-6 shadow-sm border-0 bg-white/70 backdrop-blur-sm">
                <CardContent className="flex flex-col justify-center items-center min-h-[200px] text-red-600">
                  <span className="text-lg font-medium">Failed to load incident details.</span>
                </CardContent>
              </Card>
            ) : incident ? (
              <>
                {/* Emergency Info Card */}
                <Card className="mb-6 shadow-sm border-0 bg-white/70 backdrop-blur-sm">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-xl text-slate-800 mb-2">{getIncidentTypeLabel(incident.type)}</CardTitle>
                        <p className="text-slate-600 text-sm">{getIncidentTypedescription(incident.type)}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center gap-3">
                        <User className="h-5 w-5 text-slate-500" />
                        <div>
                          <p className="font-medium text-slate-800">{incident.user_initiated?.full_name}</p>
                          <p className="text-sm text-slate-600">Resident</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <MapPin className="h-5 w-5 text-slate-500" />
                        <div>
                          <p className="font-medium text-slate-800">{incident.user_address}</p>
                          {/* <p className="text-sm text-slate-600">{incident.address}</p> */}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <Phone className="h-5 w-5 text-slate-500" />
                        <div>
                          <p className="font-medium text-slate-800">{incident.user_initiated?.phone_number}</p>
                          <p className="text-sm text-slate-600">Primary Contact</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <Clock className="h-5 w-5 text-slate-500" />
                        <div>
                          <p className="font-medium text-slate-800">{new Date(incident.created_at).toLocaleTimeString()}</p>
                          <p className="text-sm text-slate-600">{new Date(incident.created_at).toLocaleDateString()}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t border-slate-200">
                      <p className="text-sm text-slate-600 mb-2">Emergency Contact:</p>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-slate-500" />
                        <span className="font-medium text-slate-800">{incident.nok_contact}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Action History */}
                {(() => {
                  // Check for 403 error using AxiosError
                  let is403 = false;
                  if (historyStatus === "error" && axios.isAxiosError(historyError) && historyError.response?.status === 403) {
                    is403 = true;
                  }
                  if (is403) return null;
                  return (
                    <Card className="shadow-sm border-0 bg-white/70 backdrop-blur-sm">
                      <CardHeader>
                        <CardTitle className="text-lg text-slate-800">Action History</CardTitle>
                      </CardHeader>
                      <CardContent>
                        {historyStatus === "pending" ? (
                          <div className="flex justify-center items-center min-h-[100px]">
                            <span className="text-lg font-medium">Loading...</span>
                          </div>
                        ) : historyStatus === "error" ? (
                          <div className="flex flex-col justify-center items-center min-h-[100px] text-red-600">
                            <span className="text-lg font-medium">Failed to load ticket history.</span>
                          </div>
                        ) : (
                          <div className="space-y-3">
                            {historyData.map((entry, index) => (
                              <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-slate-50/50">
                                <div className="h-2 w-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                                <div className="flex-1">
                                  <div className="flex items-center justify-between mb-1">
                                    <p className="font-medium text-slate-800 text-sm">{entry.description}</p>
                                    <span className="text-xs text-slate-500">{new Date(entry.created_at).toLocaleTimeString()}</span>
                                  </div>
                                  <p className="text-xs text-slate-600">by System</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  );
                })()}
              </>
            ) : null}

            {/* Action Buttons */}
            {/* <div className="flex gap-3 mt-6">
              <Button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">
                Mark as Attending
              </Button>
              <Button variant="outline" className="flex-1 border-green-600 text-green-600 hover:bg-green-50">
                Mark as Resolved
              </Button>
            </div> */}
          </div>
        </main>
      </div>
    </div>
  );
};

export default EmergencyDetail;
