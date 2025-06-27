export type IncidentType = 
  | "PHSYICAL_SOS" 
  | "WATCH_SOS" 
  | "SMOKE_DETECTED" 
  | "GAS_LEAKAGE" 
  | "FALL_DETECTED";

export type IncidentStatus = 
  | "OPEN" 
  | "IN_PROGRESS" 
  | "CLOSED";

export interface EmergencyIncident {
  id: string;
  residentName: string;
  phoneNumber: string;
  flatNumber: string;
  incidentType: IncidentType;
  nokPhone: string;
  created_at: Date;
  closed_at: Date;
  status: IncidentStatus;
}

export interface Society {
  id: string;
  name: string;
  logoUrl?: string;
}

export interface DashboardStats {
  yetToAttend: number;
  attending: number;
  attended: number;
  total: number;
}

export interface EmergencyContact {
  name:string;
  relation: string;
  phone: string;
}

export type SafetyDevice = "sos_button" | "fall_detector" | "smoke_detector" | "gas_leak_detector";

export interface Resident {
  id: string;
  name: string;
  age: number;
  flatNumber: string;
  phone: string;
  email: string;
  emergencyContacts: EmergencyContact[];
  safetyDevices: SafetyDevice[];
  avatarInitials: string;
  medicalInfo: string;
  recentAlerts: EmergencyIncident[];
}
