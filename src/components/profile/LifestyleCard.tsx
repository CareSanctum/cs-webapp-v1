import React from 'react';
import { Activity } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface LifestyleProps {
  lifestyle: {
    activityLevel: string;
    dietPreference: string;
    specialNeeds: {
      mobilityAssistance: boolean;
      visionImpairment: boolean;
      hearingImpairment: boolean;
    };
  };
}

export const LifestyleCard = ({ lifestyle }: LifestyleProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Activity className="h-5 w-5" />
          Lifestyle & Special Needs
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Activity Level</p>
            <p className="font-medium">{lifestyle.activityLevel}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Diet Preference</p>
            <p className="font-medium">{lifestyle.dietPreference}</p>
          </div>
        </div>
        <div className="mt-4">
          <p className="text-sm text-gray-500 mb-2">Special Needs</p>
          <ul className="space-y-1">
            {lifestyle.specialNeeds.mobilityAssistance && (
              <li className="text-sm">Requires mobility assistance</li>
            )}
            {lifestyle.specialNeeds.visionImpairment && (
              <li className="text-sm">Has vision impairment</li>
            )}
            {lifestyle.specialNeeds.hearingImpairment && (
              <li className="text-sm">Has hearing impairment</li>
            )}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};