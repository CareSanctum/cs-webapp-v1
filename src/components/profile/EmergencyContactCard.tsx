import React from 'react';
import { Phone } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface EmergencyContactProps {
  emergencyContact: {
    name: string;
    phone: string;
    relationship: string;
    neighborName?: string;
    neighborPhone?: string;
  };
}

export const EmergencyContactCard = ({ emergencyContact }: EmergencyContactProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Phone className="h-5 w-5" />
          Emergency Contacts
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Next of Kin</p>
            <p className="font-medium">{emergencyContact.name}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Contact Number</p>
            <p className="font-medium">{emergencyContact.phone}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Relationship</p>
            <p className="font-medium">{emergencyContact.relationship}</p>
          </div>
        </div>
        {(emergencyContact.neighborName || emergencyContact.neighborPhone) && (
          <div className="mt-4 border-t pt-4">
            <h4 className="text-sm font-medium mb-2">Neighbor Contact</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Name</p>
                <p className="font-medium">{emergencyContact.neighborName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Contact Number</p>
                <p className="font-medium">{emergencyContact.neighborPhone}</p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};