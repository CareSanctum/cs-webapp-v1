import { useState } from "react";
import { DashboardHeader } from "@/components/DashboardHeader";
import { Sidebar } from "@/components/Sidebar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Search, Phone, Mail, Briefcase, Building, Users, Loader2 } from "lucide-react";
import { useStaffList } from "@/hooks/staffList.hook";

const departmentColors: { [key: string]: string } = {
  Security: "bg-red-100 text-red-700",
  Administration: "bg-blue-100 text-blue-700",
  Maintenance: "bg-green-100 text-green-700",
  Housekeeping: "bg-purple-100 text-purple-700",
};

const Staff = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  
  const { data: staffData, isLoading, error } = useStaffList();
  const staff = staffData?.staffs || [];
  if (staffData){
    console.log(staffData);
  }

  const filteredStaff = staff.filter(member =>
    (member.full_name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
    member.phone_number.includes(searchTerm)
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
            </div>

            {!isLoading && !error && (
              <div className="sticky top-0 z-10 bg-gray-50/80 backdrop-blur-sm pt-4 pb-2 -mx-4 px-4 lg:-mx-6 lg:px-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search staff by name or phone"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 border-gray-300 bg-white"
                  />
                </div>
              </div>
            )}

            {isLoading && (
              <Card className="bg-white border-gray-200">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Loader2 className="h-8 w-8 text-gray-400 animate-spin" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-700 mb-2">Loading staff directory</h3>
                  <p className="text-gray-500">Please wait while we fetch the latest information</p>
                </CardContent>
              </Card>
            )}

            {error && (
              <Card className="bg-white border-gray-200">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8 text-red-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-700 mb-2">Failed to load staff directory</h3>
                  <p className="text-gray-500">Please try refreshing the page or contact support if the problem persists</p>
                </CardContent>
              </Card>
            )}

            {!isLoading && !error && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {filteredStaff.map((member) => (
                    <Card key={member.id} className="shadow-sm hover:shadow-md transition-all bg-white border-gray-200">
                      <CardContent className="p-4 space-y-4">
                        <div className="flex items-start gap-4">
                          <Avatar className="h-12 w-12 border-2 border-white shadow-sm">
                            <AvatarFallback className="bg-gradient-to-br from-[#9030A1] to-[#A53CAA] text-white font-semibold">
                              {member.full_name?.split(' ').map(n => n[0]).join('') || member.email[0].toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          
                          <div className="flex-1 min-w-0">
                              <h3 className="font-semibold text-lg text-gray-800 truncate">{member.full_name || 'Name not provided'}</h3>
                              <p className="text-sm text-gray-500">{member.metadata?.position || 'Position not specified'}</p>
                          </div>
                        </div>

                        <div className="space-y-3 text-sm text-gray-600 border-t border-gray-100 pt-4">
                          <div className="flex items-center gap-3">
                            <Building className="h-4 w-4 text-gray-400" />
                            <Badge className={`${departmentColors[member.metadata?.department || ''] || 'bg-gradient-to-r from-[#A53CAA] to-[#BA48B3] text-white'} font-medium`}>
                                {member.metadata?.department || 'Department not specified'}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-3">
                            <Phone className="h-4 w-4 text-gray-400" />
                            <span>{member.phone_number}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <Mail className="h-4 w-4 text-gray-400" />
                            <span>{member.email}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {filteredStaff.length === 0 && (
                  <Card className="bg-white border-gray-200">
                    <CardContent className="p-8 text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-[#A53CAA] to-[#BA48B3] rounded-full flex items-center justify-center mx-auto mb-4">
                        <Users className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="text-lg font-medium text-gray-700 mb-2">No staff members found</h3>
                      <p className="text-gray-500">Try adjusting your search criteria</p>
                    </CardContent>
                  </Card>
                )}
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Staff; 