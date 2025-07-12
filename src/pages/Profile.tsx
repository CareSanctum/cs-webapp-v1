import React from 'react';
import { useNavigate } from 'react-router';
import { LogOut, ArrowLeft, Loader2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { PersonalInfoCard } from '@/components/profile/PersonalInfoCard';
import { ContactCard } from '@/components/profile/ContactCard';
import { EmergencyContactCard } from '@/components/profile/EmergencyContactCard';
import { MedicalInfoCard } from '@/components/profile/MedicalInforCard';
import { LifestyleCard } from '@/components/profile/LifestyleCard';
import { useEffect } from 'react';
import { viewRequest } from '@/viewRequest';
import { useState } from 'react';
import { useAuthStore } from '@/store/AuthStore';

const Profile = () => {
  const navigate = useNavigate();
  
  const [userDetails, setUserDetails] = useState<any>(null);
  const username = useAuthStore(state => state.username);
  const [dataloading, setdataloading] = useState(false);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        setdataloading(true);
        const data = await viewRequest(username);  // Call the function
        setUserDetails(data);
        console.log(userDetails) // Store response in the stat
        setdataloading(false);
      } catch (error: any) {
        console.log(error);
        setdataloading(false);
      }
    };

    fetchUserDetails();  // Run the function on mount
  }, []);

  const profileData = {
    personalInfo: {
      fullName: userDetails?.patient?.full_name || "",
      dob:  userDetails?.patient?.dob || "",
      gender: userDetails?.patient?. gender || "",
      bloodGroup: userDetails?.patient?.blood_group || "",
      height: userDetails?.patient?.height || "",
      weight: userDetails?.patient?.weight || "",
      wakeUpTime: userDetails?.patient?.usual_wake_up_time || "",
      image_url: userDetails?.patient?.profile_picture_url || "",
      currentLocation: {
        status: userDetails?.patient?.current_location_status || "",
        expectedReturn: undefined
      },
      consent_agreement: userDetails?.patient?.type_specific_metadata?.consent || "",
    },
    contact: {
      phone: userDetails?.patient?.phone || "",
      altPhone: userDetails?.patient?.alternate_phone || "",
      email: userDetails?.patient?.email || "",
      address: userDetails?.patient?.address || "",
      pincode: userDetails?.patient?.pin_code || "",
      idProofUrl: userDetails?.patient?.id_proof_url || "",
    },
    emergencyContact: {
      name: userDetails?.emergency_contacts?.next_of_kin_name || "",
      phone: userDetails?.emergency_contacts?.next_of_kin_contact_number || "",
      relationship: userDetails?.emergency_contacts?.relationship_with_senior || "",
      neighborName: userDetails?.emergency_contacts?.neighbor_name || "",
      neighborPhone: userDetails?.emergency_contacts?.neighbor_contact_number || "",
    },
    medicalInfo: {
      healthConditions: userDetails?.medical_history?.existing_health_conditions || "",
      allergies: userDetails?.medical_history?.known_allergies || "",
      surgeries: userDetails?.medical_history?.past_surgeries || "",
      doctorName: userDetails?.preferred_medical_services?.preferred_doctor_name || "",
      doctorContact: userDetails?.preferred_medical_services?.doctor_contact_number|| "",
      preferredHospital: userDetails?.preferred_medical_services?.preferred_hospital_or_clinic || "",
      PrescsUrl: userDetails?.medical_history?.current_prescriptions_url ||"",
    },
    lifestyle: {
      activityLevel:  userDetails?.lifestyle_details?.activity_level || "",
      dietPreference: userDetails?.lifestyle_details?.diet_preferences || "",
      specialNeeds: {
        mobilityAssistance: userDetails?.lifestyle_details?.requires_mobility_assistance || "",
        visionImpairment: userDetails?.lifestyle_details?.has_vision_impairment || "",
        hearingImpairment: userDetails?.lifestyle_details?.has_hearing_impairment || "",
      }
    }
  };
  console.log(profileData);


  return (
    <>
    {dataloading ? <div className="flex justify-center items-center min-h-screen"><Loader2 className="w-8 h-8 animate-spin" /></div> : (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/')}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            <h1 className="text-xl font-bold">Profile</h1>
          </div>
          <Button 
            onClick={() => navigate('/onboarding')} 
            variant="outline"
            className="flex items-center gap-2"
          >
            Edit Profile
          </Button>
        </div>
      </header>
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <PersonalInfoCard personalInfo={profileData.personalInfo} />
        <ContactCard contact={profileData.contact} />
        <EmergencyContactCard emergencyContact={profileData.emergencyContact} />
        <MedicalInfoCard medicalInfo={profileData.medicalInfo} />
        <LifestyleCard lifestyle={profileData.lifestyle} />


      </main>
    </div>
    )}
    </>
  );
};

export default Profile;