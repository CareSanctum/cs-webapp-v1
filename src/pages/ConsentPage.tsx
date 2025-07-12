import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogOverlay, DialogTrigger } from "@/components/ui/dialog";
import { ConsentDialogContent } from "@/ConsentDialogContent";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useConsentUpdate } from "@/hooks/consent.hook";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router";
import { Loader2 } from "lucide-react";
import { ConsentBody } from "@/components/ConsentBody";
import { useQueryClient } from "@tanstack/react-query";

const ConsentPage = () => {
  const [consentType, setConsentType] = useState<string>("");
  const [hasScrolledToBottom, setHasScrolledToBottom] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false);
  const {mutate: updateConsent, status: updateConsentStatus} = useConsentUpdate();
  const {toast} = useToast();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleConfirm = async () => {
      updateConsent({consent: consentType, updated_at: new Date().toISOString()}, {
          onSuccess: () => {
            // Invalidate consent status query to trigger refetch
            queryClient.invalidateQueries({ queryKey: ['consent-status'] });
            
            toast({
              title: "Consent Updated",
              description: "Your consent has been updated successfully",
              variant: "success",
            });
            
            // Navigate after a short delay to allow query refetch
            setTimeout(() => {
              navigate('/');
            }, 100);
          },
          onError: () => {
            toast({
              title: "Error",
              description: "Failed to update consent, please try again",
              variant: "destructive",
            });
          }
        });
  }
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop
      const scrollHeight = document.documentElement.scrollHeight
      const clientHeight = document.documentElement.clientHeight

      // Check if user has scrolled to within 50px of the bottom
      if (scrollTop + clientHeight >= scrollHeight - 50) {
        setHasScrolledToBottom(true)
      }
    }

    window.addEventListener("scroll", handleScroll)

    // Check initial scroll position
    handleScroll()

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

    return (
      <div className="min-h-screen bg-background pb-16">
        <ConsentBody />
              {/* Fixed Bottom Bar */}
        <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border p-4 shadow-lg">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
              <div className="space-y-3 sm:space-y-2"> 
                <div className="flex items-center space-x-2"> 
                  <input type="radio" name="consentType" id="complete" value="COMPLETE" checked={consentType === "COMPLETE"} onChange={() => setConsentType("COMPLETE")} />
                  <label className="text-lg font-medium tracking-tight" htmlFor="complete">Give Complete Consent</label>
                </div>
                  <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                      <DialogTrigger asChild>
                      <div className="flex items-center space-x-2">
                        <input type="radio" name="consentType" value="PARTIAL" checked={consentType === "PARTIAL"} onChange={() => {setDialogOpen(true)}} />
                        <label className="text-lg font-medium tracking-tight ">
                          Give Consent except for break-in
                        </label>
                      </div>
                      </DialogTrigger>
                      <DialogContent className="max-w-md" onInteractOutside={(e) => e.preventDefault()} onEscapeKeyDown={(e) => e.preventDefault()}>
                        <div className="space-y-4">
                          <h3 className="text-lg font-semibold">Confirm Decision</h3>
                          <p className="text-sm text-gray-600">
                            By declining consent, you acknowledge that neither Care Sanctum nor your society is authorized to take emergency rescue action in the absence of your NOK. In such cases, the SOS alert will only be escalated to the police. Are you sure you want to proceed without giving consent?
                          </p>
                          <div className="flex gap-3 pt-4">
                            <Button variant="outline" className="flex-1" 
                              onClick={() => {setConsentType("COMPLETE"),setDialogOpen(false)}}
                            >
                              Give Full Consent
                            </Button>
                            <Button className="flex-1"
                              onClick={() => {setConsentType("PARTIAL"),setDialogOpen(false)}}
                            >
                              Yes, proceed
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                  </Dialog>
              </div>
              <Button onClick={handleConfirm} disabled={!consentType || updateConsentStatus === "pending"}>
                {updateConsentStatus === "pending" ? 
                  <Loader2 className="w-4 h-4 animate-spin" /> : 
                  "Confirm Consent"
                  }
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
}

export default ConsentPage;