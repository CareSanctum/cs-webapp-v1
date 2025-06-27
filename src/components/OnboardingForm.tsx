import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router';
import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { PersonalInfoSection } from './onboarding/PersonalInfoSection';
import { ContactSection } from './onboarding/ContactSection';
import { EmergencyContactSection } from './onboarding/EmergencyContactSection';
import { MedicalSection } from './onboarding/MedicalSection';
import { PreferredMedicalSection } from './onboarding/PreferredMedicalSection';
import { LifestyleSection } from './onboarding/LifeStyleSection';
import { SpecialNeedsSection } from './onboarding/SpecialNeedsSection';
import { addReqeuest } from '@/addRequest';
import { useAuthStore } from '@/store/AuthStore';
import { viewRequest } from '@/viewRequest';
import { Loader2 } from 'lucide-react';
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ConsentDialogContent } from '@/ConsentDialogContent';

type FormData = {
  fullName: string;
  dob: string;
  gender:string;
  blood_group: string;
  height: string;
  weight: string;
  wakeUpTime: string;
  email: string;
  phone: string;
  altPhone: string;
  address: string;
  pincode: string;
  emergencyName: string;
  emergencyPhone: string;
  relationship: string;
  neighborName: string;
  neighborPhone: string;
  healthConditions: string;
  allergies: string;
  surgeries: string;
  doctorName: string;
  doctorContact: string;
  preferredHospital: string;
  Activity_level: string;
  Dietary_prefernces: string;
  mobilityAssistance: string;
  visionImpairment: string;
  hearingImpairment: string;
  consent_agreement: boolean;
}
export const OnboardingForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { register, handleSubmit, watch, control, getValues, reset, setValue} = useForm();
  const [userDetails, setUserDetails] = useState<FormData | null>(null);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [dataloading, setdataloading] = useState(false);
  const [consentOpen, setConsentOpen] = useState(false);
  const [consent, setConsent] = useState<"agree" | "disagree" | null>(null);
  const [disagreeDialogOpen, setDisagreeDialogOpen] = useState(false);
  const [disagreeConfirmation, setDisagreeConfirmation] = useState<"confirm" | "cancel" | null>(null);
  
  const username = useAuthStore(state => state.username);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        setdataloading(true);
        const data = await viewRequest(username);  // Call the function
        if (data){
          const onboardingData: FormData = {
            fullName: data?.patient?.full_name || "",
            dob: data?.patient?.dob || "",
            gender: data?.patient?.gender || "",
            blood_group: data?.patient?.blood_group || "",
            height: data?.patient?.height || "",
            weight: data?.patient?.weight || "",
            wakeUpTime: data?.patient?.usual_wake_up_time || "",
            email: data?.patient?.email || "",
            phone: data?.patient?.phone || "",
            altPhone: data?.patient?.alternate_phone|| "",
            address: data?.patient?.address || "",
            pincode: data?.patient?.pin_code || "",
            emergencyName: data?.emergency_contacts?.next_of_kin_name || "",
            emergencyPhone: data?.emergency_contacts?.next_of_kin_contact_number || "",
            relationship: data?.emergency_contacts?.relationship_with_senior || "",
            neighborName: data?.emergency_contacts?.neighbor_name || "",
            neighborPhone: data?.emergency_contacts?.neighbor_contact_number || "",
            healthConditions: data?.medical_history?.existing_health_conditions || "",
            allergies: data?.medical_history?.known_allergies || "",
            surgeries: data?.medical_history?.past_surgeries || "",
            doctorName: data?.preferred_medical_services?.preferred_doctor_name || "",
            doctorContact: data?.preferred_medical_services?.doctor_contact_number|| "",
            preferredHospital: data?.preferred_medical_services?.preferred_hospital_or_clinic || "",
            Activity_level: data?.lifestyle_details?.activity_level || "",
            Dietary_prefernces: data?.lifestyle_details?.diet_preferences || "",
            mobilityAssistance: data?.lifestyle_details?.requires_mobility_assistance || "",
            visionImpairment: data?.lifestyle_details?.has_vision_impairment || "",
            hearingImpairment: data?.lifestyle_details?.has_hearing_impairment || "",
            consent_agreement: data?.patient?.consent_agreement || false,
          }
          reset(onboardingData);
          setdataloading(false);
        }
      } catch (error: any) {
        setdataloading(false);
        console.log(error);
      }
    };

    fetchUserDetails();  // Run the function on mount
  }, [username]);
  const onSubmit = async (data: any) => {
    const values = getValues();
    console.log(values);
    values['disagree_breakin'] = disagreeConfirmation === "confirm" ? true : false;
    try{
      setSubmitLoading(true);
      const response = await addReqeuest(values, username);
      if (response.status == 201) {
        setSubmitLoading(false);
        // console.log(fullName);
        toast({
          title: "Profile Updated",
          description: "Your profile has been successfully updated!",
        });
        navigate('/profile');
      } else if (response.status == 400) {
        setSubmitLoading(false);
        toast({
          title: "Error",
          description: response.data.non_field_error,
        });
      }
    }
    catch (error: any) {
      console.log("Error in handleSave:", error.message);  // ✅ Log error message
      console.log("Error details:", JSON.stringify(error, null, 2)); // ✅ Full error
    }
  };

  const handleConsentChange = (value: boolean) => {
    if (value === true) {
      // User agrees - proceed normally
      setConsent("agree");
      setValue("consent_agreement", true);
      setDisagreeDialogOpen(false);
      setDisagreeConfirmation(null);
    } else {
      // User disagrees - show confirmation dialog
      setConsent("disagree");
      setValue("consent_agreement", false);
      setDisagreeDialogOpen(true);
    }
  };

  const handleDisagreeConfirmation = (action: "confirm" | "cancel") => {
    if (action === "cancel") {
      // User cancels - change back to agree
      setConsent("agree");
      setValue("consent_agreement", true);
      setDisagreeDialogOpen(false);
      setDisagreeConfirmation(null);
    } else {
      // User confirms - store the disagree value
      setDisagreeConfirmation("confirm");
      setDisagreeDialogOpen(false);
    }
  };

  return (
    <>
      {/* Consent Form Modal */}
      <Dialog open={consentOpen} onOpenChange={setConsentOpen}>
        <DialogTrigger asChild>
          <Button type="button" variant="outline" className="mb-4 w-64 mx-auto block text-center">
            View Consent Form
          </Button>
        </DialogTrigger>
        <DialogContent
          className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-w-2xl w-full max-h-screen flex flex-col bg-white rounded-lg p-0"
          style={{ maxWidth: "600px", maxHeight: "600px" }}
        >
          <div className="flex-1 overflow-y-auto p-6">
          
            <ConsentDialogContent />
          </div>
        </DialogContent>
      </Dialog>

      {/* Disagree Confirmation Dialog */}
      <Dialog open={disagreeDialogOpen} onOpenChange={setDisagreeDialogOpen}>
        <DialogContent className="max-w-md">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Confirm Decision</h3>
            <p className="text-sm text-gray-600">
              By declining consent, you acknowledge that neither Care Sanctum nor your society is authorized to take emergency rescue action in the absence of your NOK. In such cases, the SOS alert will only be escalated to the police. Are you sure you want to proceed without giving consent?
            </p>
            <div className="flex gap-3 pt-4">
              <Button 
                variant="outline" 
                onClick={() => handleDisagreeConfirmation("cancel")}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button 
                onClick={() => handleDisagreeConfirmation("confirm")}
                className="flex-1"
              >
                Yes, proceed
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Consent Checkboxes */}
      <div className="flex flex-col items-center gap-4 mb-6">
        <Controller
          name="consent_agreement"
          control={control}
          rules={{ validate: v => v === true || v === false }}
          render={({ field }) => (
            <div className="flex items-center gap-8">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  checked={field.value === true}
                  onChange={() => handleConsentChange(true)}
                />
                Give Consent
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  checked={field.value === false}
                  onChange={() => handleConsentChange(false)}
                />
                Give Consent except for Breakin
              </label>
            </div>
          )}
        />
      </div>

      {/* Disable form if not agreed */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <PersonalInfoSection register={register} watch={watch} control={control}/>
        <ContactSection register={register} />
        <EmergencyContactSection register={register} />
        <MedicalSection register={register} />
        <PreferredMedicalSection register={register} />
        <LifestyleSection register={register} control={control} />
        <SpecialNeedsSection control={control} />

        <div className="flex justify-between pt-6">
          <Button type="button" variant="outline" onClick={() => navigate("/profile")}>
            Back
          </Button>
          <Button type="submit" disabled={submitLoading}>
            {submitLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save Profile"}
          </Button>
        </div>
      </form>
    </>
  );
};
