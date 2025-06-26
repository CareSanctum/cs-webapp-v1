import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export const PreferredMedicalSection = ({ register }: { register: any }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-primary">Preferred Medical Services (Optional)</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="doctorName">Preferred Doctor's Name</Label>
          <Input id="doctorName" {...register("doctorName")} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="doctorContact">Doctor's Contact Number</Label>
          <Input id="doctorContact" type="tel" {...register("doctorContact")} />
        </div>
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="preferredHospital">Preferred Hospital/Clinic</Label>
          <Input id="preferredHospital" {...register("preferredHospital")} />
        </div>
      </div>
    </div>
  );
};