import { useState } from "react";
import { DashboardHeader } from "@/components/DashboardHeader";
import { Sidebar } from "@/components/Sidebar";
import { Card } from "@/components/ui/card";
import { Building, Users, Shield, Phone, Loader2 } from "lucide-react";
import { useSocietyDetails } from "@/hooks/societyDetails.hook";

const Society = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { data: societyDetails, status } = useSocietyDetails();

  return (
    <div className="min-h-screen bg-[#FFFFFF]">
      <DashboardHeader onMobileMenuToggle={() => setIsSidebarOpen(true)} />
      <div className="flex h-[calc(100vh-73px)] relative">
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
          <div className="p-4 lg:p-8 max-w-2xl mx-auto">
            <Card className="bg-[#F9FAFB] border border-[#D1D5DB] rounded-lg shadow-sm p-6">
              {status === 'pending' && (
                <div className="flex flex-col items-center justify-center py-8 text-gray-500">
                  <Loader2 className="h-6 w-6 animate-spin mb-2" />
                  Loading society details...
                </div>
              )}
              {status === 'error' && (
                <div className="text-center py-8 text-red-500">Error loading society details.</div>
              )}
              {status === 'success' && societyDetails && (
                <>
                  <h1 className="text-2xl font-bold text-[#111827] mb-1">{societyDetails.name}</h1>
                  <p className="text-[#6B7280] mb-6">Complete contact information and emergency services</p>

                  {/* Management Team */}
                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="h-5 w-5 text-[#111827]" />
                      <span className="font-semibold text-base text-[#111827]">Management Team</span>
                    </div>
                    <div className="space-y-3">
                      {societyDetails.sections.management_section.map((member, idx) => (
                        <div key={idx} className="flex items-center justify-between bg-white rounded-md px-4 py-3 border border-[#E5E7EB]">
                          <div>
                            <div className="font-semibold text-[#111827]">{member.role}</div>
                            <div className="text-sm text-[#6B7280]">{member.name}</div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4 text-[#6B7280]" />
                            <span className="text-sm text-[#111827]">{member.phone}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="h-px bg-[#E5E7EB] my-6" />

                  {/* Emergency Services */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Shield className="h-5 w-5 text-[#111827]" />
                      <span className="font-semibold text-base text-[#111827]">Emergency Services</span>
                    </div>
                    <div className="space-y-3">
                      {societyDetails.sections.emergency_section.map((service, idx) => (
                        <div key={idx} className="flex items-center justify-between bg-white rounded-md px-4 py-3 border border-[#E5E7EB]">
                          <div>
                            <div className="font-semibold text-[#111827]">{service.name}</div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4 text-[#6B7280]" />
                            <span className="text-sm text-[#111827]">{service.phone}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Society;
