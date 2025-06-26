
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { OnboardingForm } from '@/components/OnboardingForm';

const Onboarding = () => {
  const navigate = useNavigate();

 useEffect(() => {
     const token = localStorage.getItem("access_token");
 
     // Prevent back button navigation
     window.history.pushState(null, "", window.location.href);
     window.onpopstate = function () {
       window.history.pushState(null, "", window.location.href);
     };
   
     return () => {
       window.onpopstate = null; // Cleanup when component unmounts
     };
   }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
            <img
                src="/lovable-uploads/ce42e031-be3b-4c21-8b06-f0ea6e60fe7e.png"
                alt="CareStanctum"
                className="h-10 sm:h-12 w-auto transition-all duration-300 rounded-xl"
              />
          <Button 
            variant="outline" 
            onClick={() => navigate("/profile")}
          >
            Back
          </Button>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-center">Complete Your Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <OnboardingForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Onboarding;
