import { useState } from "react";
import { DashboardHeader } from "@/components/DashboardHeader";
import { Sidebar } from "@/components/Sidebar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Search, Phone, MapPin, User, Users, PhoneCall } from "lucide-react";

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
            {/* Header */}
            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-gray-900">Resident Directory</h1>
              <p className="text-gray-600">Search for residents by name or flat number.</p>
            </div>

            {/* Search */}
            <div className="sticky top-0 z-10 bg-gray-50/80 backdrop-blur-sm pt-4 pb-2 -mx-4 px-4 lg:-mx-6 lg:px-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search residents by name or flat number..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-gray-300 bg-white"
                />
              </div>
            </div>

            {/* Residents List */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {filteredResidents.map((resident) => (
                <Card key={resident.id} className="shadow-sm hover:shadow-md transition-all bg-white border-gray-200">
                  <CardContent className="p-4 space-y-4">
                    <div className="flex items-start gap-4">
                      <Avatar className="h-12 w-12 border-2 border-white shadow-sm">
                        <AvatarFallback className="bg-purple-100 text-purple-700 font-semibold">
                          {resident.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="font-semibold text-lg text-gray-800 truncate">{resident.name}</h3>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3 text-sm text-gray-600 border-t border-gray-100 pt-4">
                      <div className="flex items-center gap-3">
                        <MapPin className="h-4 w-4 text-gray-400" />
                        <span>Flat {resident.flatNumber}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Phone className="h-4 w-4 text-gray-400" />
                        <span>{resident.phoneNumber}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <PhoneCall className="h-4 w-4 text-gray-400" />
                        <span>NOK: {resident.nokPhone}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Users className="h-4 w-4 text-gray-400" />
                        <span>{resident.emergencyContacts} Emergency Contacts</span>
                      </div>
                    </div>
                    
                    <div className="border-t border-gray-100 pt-4">
                      <Button 
                        size="sm" 
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                      >
                        <Phone className="h-4 w-4 mr-2" />
                        Call Resident
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredResidents.length === 0 && (
              <Card className="bg-white border-gray-200">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-700 mb-2">No residents found</h3>
                  <p className="text-gray-500">Try adjusting your search criteria</p>
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
