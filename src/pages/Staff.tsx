import { useState } from "react";
import { DashboardHeader } from "@/components/DashboardHeader";
import { Sidebar } from "@/components/Sidebar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Search, Phone, Mail, Briefcase, Building, Users } from "lucide-react";

// Mock staff data
const mockStaff = [
  {
    id: "1",
    name: "Mr. Ramesh Singh",
    role: "Head Security Officer",
    department: "Security",
    phoneNumber: "+91 *****301",
    email: "ramesh.s@example.com",
  },
  {
    id: "2",
    name: "Mrs. Priya Sharma",
    role: "Society Manager",
    department: "Administration",
    phoneNumber: "+91 *****302",
    email: "priya.s@example.com",
  },
  {
    id: "3",
    name: "Mr. Vikram Patel",
    role: "Maintenance Supervisor",
    department: "Maintenance",
    phoneNumber: "+91 *****303",
    email: "vikram.p@example.com",
  }
];

const departmentColors: { [key: string]: string } = {
  Security: "bg-red-100 text-red-700",
  Administration: "bg-blue-100 text-blue-700",
  Maintenance: "bg-green-100 text-green-700",
  Housekeeping: "bg-purple-100 text-purple-700",
};


const Staff = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [staff] = useState(mockStaff);

  const filteredStaff = staff.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader onMobileMenuToggle={() => setIsSidebarOpen(true)} />
      
      <div className="flex h-[calc(100vh-64px)] relative">
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" 
            onClick={() => setIsSidebarOpen(false)} 
          />
        )}
        
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
            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-gray-900">Staff Directory</h1>
              <p className="text-gray-600">Search for staff by name or role.</p>
            </div>

            <div className="sticky top-0 z-10 bg-gray-50/80 backdrop-blur-sm pt-4 pb-2 -mx-4 px-4 lg:-mx-6 lg:px-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search staff by name or role..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-gray-300 bg-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {filteredStaff.map((member) => (
                <Card key={member.id} className="shadow-sm hover:shadow-md transition-all bg-white border-gray-200">
                  <CardContent className="p-4 space-y-4">
                    <div className="flex items-start gap-4">
                      <Avatar className="h-12 w-12 border-2 border-white shadow-sm">
                        <AvatarFallback className="bg-blue-100 text-blue-700 font-semibold">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-lg text-gray-800 truncate">{member.name}</h3>
                          <p className="text-sm text-gray-500">{member.role}</p>
                      </div>
                    </div>

                    <div className="space-y-3 text-sm text-gray-600 border-t border-gray-100 pt-4">
                      <div className="flex items-center gap-3">
                        <Building className="h-4 w-4 text-gray-400" />
                        <Badge className={`${departmentColors[member.department] || 'bg-gray-100 text-gray-600'} font-medium`}>
                            {member.department}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-3">
                        <Phone className="h-4 w-4 text-gray-400" />
                        <span>{member.phoneNumber}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Mail className="h-4 w-4 text-gray-400" />
                        <span>{member.email}</span>
                      </div>
                    </div>
                    
                    <div className="border-t border-gray-100 pt-4">
                      <Button 
                        size="sm" 
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                      >
                        <Phone className="h-4 w-4 mr-2" />
                        Contact Staff
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredStaff.length === 0 && (
              <Card className="bg-white border-gray-200">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-700 mb-2">No staff members found</h3>
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

export default Staff; 