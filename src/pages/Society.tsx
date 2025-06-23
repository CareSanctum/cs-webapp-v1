
import { useState } from "react";
import { DashboardHeader } from "@/components/DashboardHeader";
import { Sidebar } from "@/components/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Building, Users, Shield, Phone, MapPin, Mail, Clock, CheckCircle } from "lucide-react";

const Society = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const societyInfo = {
    name: "Green Valley Apartments",
    address: "123 Main Street, Sector 45, Gurgaon, Haryana 122001",
    totalFlats: 240,
    totalResidents: 672,
    emergencyContactsSetup: 180,
    securityGuards: 8,
    adminContact: "+91 98765 43210",
    emergencyContact: "100",
    email: "admin@greenvalley.com"
  };

  const facilities = [
    { name: "Swimming Pool", status: "operational" },
    { name: "Gymnasium", status: "operational" },
    { name: "Children's Play Area", status: "maintenance" },
    { name: "Community Hall", status: "operational" },
    { name: "Parking", status: "operational" },
    { name: "Security Office", status: "operational" }
  ];

  const securityFeatures = [
    { name: "CCTV Surveillance", status: "active", coverage: "100%" },
    { name: "Emergency Alarms", status: "active", coverage: "95%" },
    { name: "Fire Detection", status: "active", coverage: "100%" },
    { name: "Gas Leak Detection", status: "active", coverage: "85%" },
    { name: "Fall Detection", status: "active", coverage: "70%" },
    { name: "SOS Buttons", status: "active", coverage: "90%" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <DashboardHeader onMobileMenuToggle={() => setIsSidebarOpen(true)} />
      
      <div className="flex h-[calc(100vh-73px)] relative">
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
          <div className="p-4 lg:p-8">
            {/* Header */}
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-slate-800 mb-2">Society Information</h1>
              <p className="text-slate-600">Overview of society details and security systems</p>
            </div>

            {/* Society Overview */}
            <Card className="mb-6 bg-white/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="h-5 w-5 text-purple-600" />
                  {societyInfo.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-slate-400 mt-0.5" />
                      <div>
                        <p className="font-medium text-slate-700">Address</p>
                        <p className="text-slate-600 text-sm">{societyInfo.address}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="h-5 w-5 text-slate-400" />
                      <div>
                        <p className="font-medium text-slate-700">Admin Contact</p>
                        <p className="text-slate-600 text-sm">{societyInfo.adminContact}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-slate-400" />
                      <div>
                        <p className="font-medium text-slate-700">Email</p>
                        <p className="text-slate-600 text-sm">{societyInfo.email}</p>
                      </div>
                    </div>
                  </div>

                </div>
              </CardContent>
            </Card>

            {/* Security Systems */}
            {/* <Card className="mb-6 bg-white/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-green-600" />
                  Security Systems
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {securityFeatures.map((feature, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-white rounded-lg border">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <div>
                          <p className="font-medium text-slate-700">{feature.name}</p>
                          <p className="text-sm text-slate-500">Coverage: {feature.coverage}</p>
                        </div>
                      </div>
                      <Badge variant="default" style={{ backgroundColor: 'hsl(var(--caresanctum-purple))' }}>
                        {feature.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card> */}

            {/* Facilities */}
            {/* <Card className="bg-white/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="h-5 w-5 text-blue-600" />
                  Facilities
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {facilities.map((facility, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-white rounded-lg border">
                      <p className="font-medium text-slate-700">{facility.name}</p>
                      <Badge variant={facility.status === 'operational' ? 'default' : 'secondary'}>
                        {facility.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card> */}

            {/* Emergency Contact */}
            {/* <div className="fixed bottom-4 right-4">
              <Button 
                size="lg" 
                className="rounded-full shadow-lg"
                style={{ backgroundColor: 'hsl(var(--caresanctum-purple))' }}
              >
                <Phone className="h-5 w-5 mr-2" />
                Emergency: {societyInfo.emergencyContact}
              </Button>
            </div> */}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Society;
