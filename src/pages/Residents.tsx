
import { useState } from "react";
import { DashboardHeader } from "@/components/DashboardHeader";
import { Sidebar } from "@/components/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Search, Phone, MapPin, User, Users } from "lucide-react";

// Mock resident data
const mockResidents = [
  {
    id: "1",
    name: "Mrs. Priya Sharma",
    flatNumber: "A-101",
    phoneNumber: "+91 *****210",
    nokPhone: "+91 *****211",
    emergencyContacts: 2,
    status: "active"
  },
  {
    id: "2",
    name: "Mr. Rajesh Kumar",
    flatNumber: "B-205",
    phoneNumber: "+91 *****212",
    nokPhone: "+91 *****213",
    emergencyContacts: 1,
    status: "active"
  },
  {
    id: "3",
    name: "Mrs. Sunita Gupta",
    flatNumber: "C-302",
    phoneNumber: "+91 *****214",
    nokPhone: "+91 *****215",
    emergencyContacts: 3,
    status: "inactive"
  }
];

const Residents = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [residents] = useState(mockResidents);

  const filteredResidents = residents.filter(resident =>
    resident.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    resident.flatNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = {
    total: residents.length,
    active: residents.filter(r => r.status === "active").length,
    inactive: residents.filter(r => r.status === "inactive").length,
  };

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
              <h1 className="text-2xl font-bold text-slate-800 mb-2">Resident Directory</h1>
              <p className="text-slate-600">Manage and view resident information</p>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold text-blue-700">{stats.total}</div>
                      <p className="text-sm text-blue-600">Total Residents</p>
                    </div>
                    <Users className="h-8 w-8 text-blue-500 opacity-70" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold text-green-700">{stats.active}</div>
                      <p className="text-sm text-green-600">Active</p>
                    </div>
                    <User className="h-8 w-8 text-green-500 opacity-70" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold text-gray-700">{stats.inactive}</div>
                      <p className="text-sm text-gray-600">Inactive</p>
                    </div>
                    <User className="h-8 w-8 text-gray-500 opacity-70" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Search */}
            <Card className="mb-6 bg-white/70 backdrop-blur-sm">
              <CardContent className="p-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                  <Input
                    placeholder="Search residents by name or flat number..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 border-slate-300"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Residents List */}
            <div className="space-y-4">
              {filteredResidents.map((resident) => (
                <Card key={resident.id} className="shadow-sm hover:shadow-md transition-all bg-white/70 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4 flex-1">
                        <Avatar className="h-12 w-12">
                          <AvatarFallback className="bg-purple-100 text-purple-700 font-semibold">
                            {resident.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-semibold text-lg text-slate-800">{resident.name}</h3>
                            <Badge variant={resident.status === 'active' ? 'default' : 'secondary'}>
                              {resident.status}
                            </Badge>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-slate-600">
                            <div className="flex items-center gap-2">
                              <MapPin className="h-4 w-4 text-slate-400" />
                              <span>Flat {resident.flatNumber}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Phone className="h-4 w-4 text-slate-400" />
                              <span>{resident.phoneNumber}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Users className="h-4 w-4 text-slate-400" />
                              <span>{resident.emergencyContacts} Emergency Contacts</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Phone className="h-4 w-4 text-slate-400" />
                              <span>NOK: {resident.nokPhone}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          style={{ backgroundColor: 'hsl(var(--caresanctum-purple))' }}
                          className="text-white hover:opacity-90"
                        >
                          <Phone className="h-4 w-4 mr-1" />
                          Call
                        </Button>
                        <Button size="sm" variant="outline">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredResidents.length === 0 && (
              <Card className="bg-white/70 backdrop-blur-sm">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8 text-slate-400" />
                  </div>
                  <h3 className="text-lg font-medium text-slate-700 mb-2">No residents found</h3>
                  <p className="text-slate-500">Try adjusting your search criteria</p>
                </CardContent>
              </Card>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Residents;
