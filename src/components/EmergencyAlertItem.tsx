import { Link } from "react-router";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EmergencyIncident } from "@/types/emergency";
import { AlertTriangle, Clock, MapPin, User, Phone, ChevronRight, PhoneCall, Flame, Zap, Droplets, Activity } from "lucide-react";

interface EmergencyAlertItemProps {
  incident: EmergencyIncident;
}

export const EmergencyAlertItem = ({ incident }: EmergencyAlertItemProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "yet_to_attend":
        return "bg-red-100 text-red-700 border-red-200";
      case "attending":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "attended":
        return "bg-green-100 text-green-700 border-green-200";
      default:
        return "bg-gray-100 text-gray-600 border-gray-200";
    }
  };

  const getStatusBackground = (status: string) => {
    switch (status) {
      case "yet_to_attend":
        return "from-red-50 to-red-100 border-red-200";
      case "attending":
        return "from-yellow-50 to-yellow-100 border-yellow-200";
      case "attended":
        return "from-green-50 to-green-100 border-green-200";
      default:
        return "from-gray-50 to-gray-100 border-gray-200";
    }
  };

  const getIncidentIcon = (type: string) => {
    switch (type) {
      case "sos":
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case "fire_alarm":
        return <Flame className="h-5 w-5 text-orange-500" />;
      case "smoke_detector":
        return <Zap className="h-5 w-5 text-gray-500" />;
      case "gas_leak":
        return <Droplets className="h-5 w-5 text-yellow-500" />;
      case "fall_detection":
        return <Activity className="h-5 w-5 text-blue-500" />;
      default:
        return <AlertTriangle className="h-5 w-5 text-gray-500" />;
    }
  };

  const getIncidentTypeLabel = (type: string) => {
    switch (type) {
      case "sos":
        return "SOS Emergency";
      case "fire_alarm":
        return "Fire Alarm";
      case "smoke_detector":
        return "Smoke Detected";
      case "gas_leak":
        return "Gas Leak";
      case "fall_detection":
        return "Fall Detected";
      default:
        return type;
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const handleCallResident = (e: React.MouseEvent, phoneNumber: string) => {
    e.preventDefault();
    e.stopPropagation();
    window.open(`tel:${phoneNumber}`, '_self');
  };

  const handleCallNOK = (e: React.MouseEvent, phoneNumber: string) => {
    e.preventDefault();
    e.stopPropagation();
    window.open(`tel:${phoneNumber}`, '_self');
  };

  return (
    <Card className={`shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer bg-gradient-to-r ${getStatusBackground(incident.status)} border-l-4 ${incident.status === 'yet_to_attend' ? 'border-l-red-500' : incident.status === 'attending' ? 'border-l-yellow-500' : 'border-l-green-500'}`}>
      <CardContent className="p-0">
        <Link to={`/emergency/${incident.id}`} className="block">
          <div className="p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3 flex-1 min-w-0">
                <div className="flex-shrink-0 p-2 bg-white rounded-lg shadow-sm">
                  {getIncidentIcon(incident.incidentType)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-base text-gray-900 truncate">
                        {getIncidentTypeLabel(incident.incidentType)}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge className={`px-2 py-0.5 text-xs font-medium border ${getStatusColor(incident.status)} flex-shrink-0`}>
                          {incident.status === "yet_to_attend" ? "URGENT" : 
                           incident.status === "attending" ? "IN PROGRESS" : "RESOLVED"}
                        </Badge>
                        <div className="flex items-center gap-1 text-xs text-gray-600">
                          <Clock className="h-3 w-3" />
                          <span>{formatTime(incident.timestamp)}</span>
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400 flex-shrink-0 mt-1" />
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <User className="h-4 w-4 text-gray-500 flex-shrink-0" />
                      <span className="font-medium truncate">{incident.residentName}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <MapPin className="h-4 w-4 text-gray-500 flex-shrink-0" />
                      <span className="font-medium">{incident.flatNumber}</span>
                    </div>
                  </div>
                  
                  {incident.description && (
                    <p className="text-sm text-gray-600 mb-3 bg-white/50 p-2 rounded-md">
                      {incident.description}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Link>
        
        {/* Action Buttons */}
        <div className="px-4 pb-4 flex gap-2 border-t border-white/50 pt-3">
          <Button
            size="sm"
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-xs"
            onClick={(e) => handleCallResident(e, incident.phoneNumber)}
          >
            <Phone className="h-3 w-3 mr-1" />
            Call Resident
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50 text-xs"
            onClick={(e) => handleCallNOK(e, incident.nokPhone)}
          >
            <PhoneCall className="h-3 w-3 mr-1" />
            Call NOK
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
