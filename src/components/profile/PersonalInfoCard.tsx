import React, { useState, useEffect } from 'react';
import { User, Camera } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback, AvatarWithCamera } from "@/components/ui/avatar";
import { sendfileRequest } from '@/sendfileRequest';
import { viewRequest } from '@/viewRequest';
import { useAuthStore } from '@/store/AuthStore';
interface PersonalInfoProps {
  personalInfo: {
    fullName: string;
    dob: string;
    gender: string;
    bloodGroup: string;
    height: string;
    weight: string;
    wakeUpTime?: string;
    image_url: string;
    currentLocation: {
      status: "home" | "travelling";
      expectedReturn?: string;
    };
    consent_agreement: boolean;
  };
}
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ConsentDialogContent } from '@/ConsentDialogContent';
import { Button } from '@/components/ui/button';

export const PersonalInfoCard = ({ personalInfo }: PersonalInfoProps) => {
  const username = useAuthStore(state => state.username);
  const [profile_url, setprofile_url] = useState("");
  const [consentOpen, setConsentOpen] = useState(false);
  const fetchprofilePicture = async () => {
    try {
      const data = await viewRequest(username);  // Call the function
      setprofile_url(data?.patient?.profile_picture_url || personalInfo.image_url);
    } catch (error: any) {
      console.log(error);
    }
  };

  const handleFileUpload = async (file: File) =>{
    const sanitizedFileName = file.name.replace(/\s+/g, "_"); 
    const formData = new FormData();
    formData.append("file", new File([file], sanitizedFileName, { type: file.type })); // Append the file with a field name "file"
    formData.append("name", "profile_picture");
    formData.append("user_name", username);
    try {
      // ✅ Show a loading state (optional)
      setprofile_url("");  
  
      // ✅ Upload file to the backend first
      await sendfileRequest(formData);
  
      // ✅ Only update profile_url after getting a successful response
      fetchprofilePicture();
    } catch (error) {
      console.error("Upload failed:", error);
      // ❌ Show an error message (optional)
      alert("Failed to upload profile picture. Please try again.");
    }
  }
  useEffect(() => {
    fetchprofilePicture();  // Run the function on mount
  }, [username]);
  return (
    <Card>
      <CardHeader className="text-center">
        <div className="mx-auto mb-4">
          <AvatarWithCamera className="h-32 w-32" handleFileUpload={handleFileUpload}>
            <AvatarImage src={profile_url} alt={personalInfo.fullName} />
            <AvatarFallback>
              <User className="h-16 w-16" />
            </AvatarFallback>
          </AvatarWithCamera>
        </div>
        <CardTitle className="text-2xl">{personalInfo.fullName}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <p className="text-sm text-gray-500">Date of Birth</p>
            <p className="font-medium">{personalInfo.dob ? new Date(personalInfo.dob).toLocaleDateString() : ''}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Gender</p>
            <p className="font-medium">{personalInfo.gender}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Blood Group</p>
            <p className="font-medium">{personalInfo.bloodGroup}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Height(cm)</p>
            <p className="font-medium">{personalInfo.height}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Weight(kg)</p>
            <p className="font-medium">{personalInfo.weight}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Wake Up Time</p>
            <p className="font-medium">{personalInfo.wakeUpTime || ""}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Consent Agreement</p>
            <div className="flex items-center gap-4">
              <p className="font-medium whitespace-nowrap">
                {personalInfo.consent_agreement ? "Agreed" : "Not Agreed"}
              </p>

              <Dialog open={consentOpen} onOpenChange={setConsentOpen}>
                <DialogTrigger asChild>
                  <Button
                    type="button"
                    variant="outline"
                    className="inline-block w-48 self-center text-center px-4 py-2"
                  >
                    Consent Agreement
                  </Button>
                </DialogTrigger>
                <DialogContent
                  className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-w-2xl w-full max-h-screen flex flex-col bg-white rounded-lg p-3"
                  style={{ maxWidth: "600px", maxHeight: "600px" }}
                >
                  <div className="flex-1 overflow-y-auto p-6">
                    <ConsentDialogContent />
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
        {/* <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-500">Current Status</p>
          <p className="font-medium">
            {personalInfo.currentLocation.status === "home" 
              ? "At Home" 
              : `Travelling (Expected Return: ${personalInfo.currentLocation.expectedReturn})`}
          </p>
        </div> */}
      </CardContent>
    </Card>
  );
};