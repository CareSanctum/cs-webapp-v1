import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogOverlay, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { DashboardHeader } from "@/components/DashboardHeader";
import { Sidebar } from "@/components/Sidebar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Search, Phone, Mail, Briefcase, Building, Users, Loader2, Calendar, FileText, X } from "lucide-react";
import { formatDate } from "@/utils";
import { ConsentDialogContent } from "@/ConsentDialogContent";
import { useConsentList } from "@/hooks/consent.hook";

const ConsentTypeColors = (key: string) => {
  switch (key) {
    case "COMPLETE":
      return "bg-green-100 text-green-800 hover:bg-green-200";
    case "PARTIAL":
      return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200";
    default:
      return "bg-red-100 text-red-800 hover:bg-red-200";
  }
};

const ConsentTypeText = (key: string) => {
  switch (key) {
    case "COMPLETE":
      return "Complete Consent";
    case "PARTIAL":
      return "Consent except break in";
    default:
      return "Consent not given";
  }
}

const ConsentList = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [dialogOpen, setDialogOpen] = useState(false);
    const {data: consentList, isLoading, error} = useConsentList();
    const consentData = consentList || [];

    const filteredConsents = consentData.filter(consent =>
      (consent.full_name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      consent.phone_number.includes(searchTerm)
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
                  <h1 className="text-2xl font-bold text-gray-900">Consent Details</h1>
                </div>
                {!isLoading && !error && (
                  <div className="sticky top-0 z-10 bg-gray-50/80 backdrop-blur-sm pt-4 pb-2 -mx-4 px-4 lg:-mx-6 lg:px-6">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        placeholder="Search residents by name or phone"
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
                      {filteredConsents.map((consent) => (
                        <Card key={consent.id} className="shadow-sm hover:shadow-md transition-all bg-white border-gray-200">
                          <CardContent className="p-4 space-y-4">
                            <div className="flex items-start gap-4">
                              <Avatar className="h-12 w-12 border-2 border-white shadow-sm">
                                <AvatarFallback className="bg-gradient-to-br from-[#9030A1] to-[#A53CAA] text-white font-semibold">
                                  {consent.full_name?.split(' ').map(n => n[0]).join('') || "NA"}
                                </AvatarFallback>
                              </Avatar>
                              
                              <div className="flex-1 min-w-0">
                                  <h3 className="font-semibold text-lg text-gray-800 truncate">{consent.full_name || 'Name not provided'}</h3>
                                  <Badge className={`${ConsentTypeColors(consent.consentType || '') || 'bg-gradient-to-r from-[#A53CAA] to-[#BA48B3] text-white'} font-medium`}>
                                    {ConsentTypeText(consent.consentType || '')}
                                  </Badge>
                              </div>
                            </div>

                            <div className="space-y-3 text-sm text-gray-600 border-t border-gray-100 pt-4">
                              <div className="flex items-center gap-3">
                              </div>
                              <div className="flex items-center gap-3">
                                <Phone className="h-4 w-4 text-gray-400" />
                                <span>{consent.phone_number}</span>
                              </div>
                              <div className="flex items-center gap-3">
                                <Calendar className="h-4 w-4 text-gray-400" />
                                <span>Updated: {consent.updatedAt ? formatDate(consent.updatedAt) : 'N/A'}</span>
                              </div>
                              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                                <DialogTrigger asChild>
                                  <Button variant="outline" className="w-full">
                                    <FileText className="h-4 w-4 text-black" />
                                    <span className="text-black">View Consent Details</span>
                                  </Button>
                                </DialogTrigger>
                                <DialogContent
                                  className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-w-2xl w-full max-h-screen flex flex-col bg-white rounded-lg p-0"
                                  style={{ maxWidth: "600px", maxHeight: "600px" }}
                                  onInteractOutside={(e) => e.preventDefault()} onEscapeKeyDown={(e) => e.preventDefault()}
                                >
                                  <div className="flex-1 overflow-y-auto p-6">
                                    <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none  focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground" > 
                                      <X className="h-4 w-4" />
                                      <span className="sr-only">Close</span>
                                    </DialogClose>
                                    <ConsentDialogContent />
                                  </div>
                                </DialogContent>
                              </Dialog>

                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                    {filteredConsents.length === 0 && (
                      <Card className="bg-white border-gray-200">
                        <CardContent className="p-8 text-center">
                          <div className="w-16 h-16 bg-gradient-to-br from-[#A53CAA] to-[#BA48B3] rounded-full flex items-center justify-center mx-auto mb-4">
                            <Users className="h-8 w-8 text-white" />
                          </div>
                          <h3 className="text-lg font-medium text-gray-700 mb-2">No Consent Details found</h3>
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
    )
}

export default ConsentList;