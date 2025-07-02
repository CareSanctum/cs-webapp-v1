import { Link } from "react-router";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EmergencyIncident } from "@/types/emergency";
import { AlertTriangle, Clock, MapPin, User, ChevronRight, Flame, Zap, Droplets, Activity } from "lucide-react";

interface EmergencyAlertItemProps {
  incident: EmergencyIncident;
}

export const EmergencyAlertItem = ({ incident }: EmergencyAlertItemProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "OPEN":
        return "bg-gray-100 text-red-700 border-red-500";
      case "ASSIGNED":
      case "VALIDATED":
      case "INVALID":
      case "CORDINATION_REQUIRED":
      case "NO_CORDINATION_REQUIRED":
        return "bg-gray-100 text-yellow-700 border-yellow-500";
      case "CLOSED":
        return "bg-gray-100 text-green-700 border-green-500";
      default:
        return "bg-gray-100 text-gray-600 border-gray-500";
    }
  };
 const getBadgeText = (status: string) => {
  switch (status) {
    case "OPEN":
      return "Open";
    case "ASSIGNED":
      return "Assigned";
    case "VALIDATED":
      return "Validated";
    case "INVALID":
      return "Invalid";
    case "CORDINATION_REQUIRED":
      return "Follow Up";
    case "NO_CORDINATION_REQUIRED":
      return "No Follow Up";
    case "CLOSED":
      return "Closed";
    default:
      return status;
  }
}
  const getStatusBackground = (status: string) => {
    switch (status) {
      case "OPEN":
        return "from-red-50 to-red-100 border-red-200";
      case "ASSIGNED":
      case "VALIDATED":
      case "INVALID":
      case "CORDINATION_REQUIRED":
      case "NO_CORDINATION_REQUIRED":
        return "from-yellow-50 to-yellow-100 border-yellow-200";
      case "CLOSED":
        return "from-green-50 to-green-100 border-green-200";
      default:
        return "from-gray-50 to-gray-100 border-gray-200";
    }
  };
  console.log(getStatusBackground(incident.status));

  const getIncidentIcon = (type: string) => {
    switch (type) {
      case "PHYSICAL_SOS":
        return <AlertTriangle className="h-6 w-6 text-red-500" />;
      case "WATCH_SOS":
        return <Flame className="h-6 w-6 text-orange-500" />;
      case "SMOKE_DETECTED":
        return <Zap className="h-6 w-6 text-gray-500" />;
      case "GAS_LEAKAGE":
        return <Droplets className="h-6 w-6 text-yellow-500" />;
      case "FALL_DETECTED":
        return <Activity className="h-6 w-6 text-blue-500" />;
      default:
        return <AlertTriangle className="h-6 w-6 text-gray-500" />;
    }
  };

  const getIncidentTypeLabel = (type: string) => {
    switch (type) {
      case "PHYSICAL_SOS":
        return "SOS Alert";
      case "WATCH_SOS":
        return "Watch SOS Alert";
      case "SMOKE_DETECTED":
        return "Smoke Detected";
      case "smoke_detector":
        return "Smoke Detected";
      case "GAS_LEAKAGE":
        return "Gas Leakage";
      case "FALL_DETECTED":
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

  // Map alert types to unique icon background colors
  const getTypeBgColor = (type: string) => {
    switch (type) {
      case "PHYSICAL_SOS":
        return "bg-red-300";
      case "WATCH_SOS":
        return "bg-pink-300";
      case "SMOKE_DETECTED":
        return "bg-gray-300";
      case "GAS_LEAKAGE":
        return "bg-yellow-300";
      case "FALL_DETECTED":
        return "bg-blue-300";
      default:
        return "bg-gray-100";
    }
  };

  // Map alert types to border colors for left border
  const getTypeBorderColor = (type: string) => {
    switch (type) {
      case "PHYSICAL_SOS":
        return "border-l-red-300";
      case "WATCH_SOS":
        return "border-l-pink-300";
      case "SMOKE_DETECTED":
        return "border-l-gray-300";
      case "GAS_LEAKAGE":
        return "border-l-yellow-300";
      case "FALL_DETECTED":
        return "border-l-blue-300";
      default:
        return "border-l-gray-200";
    }
  };

  return (
    <Card
      className={`shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer bg-gradient-to-r ${getStatusBackground(
        incident.status
      )} border-l-4 ${getTypeBorderColor(incident.incidentType)}`}
    >
      <CardContent className="p-0">
        <Link to={`/emergency/${incident.id}`} className="block">
          <div className="p-4">
            {/* icon + header */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3 flex-1 min-w-0">
                <div
                  className={`flex-shrink-0 p-2 rounded-lg shadow-sm ${getTypeBgColor(
                    incident.incidentType
                  )}`}
                >
                  {getIncidentIcon(incident.incidentType)}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-base text-gray-900 truncate">
                        {getIncidentTypeLabel(incident.incidentType)}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <Clock className="h-4 w-4" />
                          <span>{formatTime(incident.created_at)}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge
                        className={`px-3 py-1 text-sm font-medium border ${getStatusColor(
                          incident.status
                        )} flex-shrink-0`}
                      >
                        {getBadgeText(incident?.status || "")}
                      </Badge>
                      <ChevronRight className="h-5 w-5 text-gray-400 flex-shrink-0" />
                    </div>
                  </div>

                  {/* Details on desktop */}
                  <div className="hidden md:grid grid-cols-2 gap-x-2 gap-y-1 mb-2">
                    <div className="flex items-center gap-1 text-sm text-gray-700 truncate mb-2">
                      <User className="h-5 w-5 text-gray-500 flex-shrink-0" />
                      <span className="font-medium truncate">
                        {incident.residentName}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-700 truncate mb-2">
                      <MapPin className="h-5 w-5 text-gray-500 flex-shrink-0" />
                      <span className="font-medium truncate">
                        {incident.flatNumber}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-600 truncate">
                      <span className="font-medium">Phone:</span>
                      <span className="truncate">{incident.phoneNumber}</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-600 truncate">
                      <span className="font-medium">Emergency:</span>
                      <span className="truncate">{incident.nokPhone}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Details on mobile (full-width) */}
            <div className="mt-3 block md:hidden">
              <div className="grid grid-cols-2 gap-x-2 gap-y-1">
                <div className="flex items-center gap-1 text-sm text-gray-700 truncate mb-2">
                  <User className="h-5 w-5 text-gray-500 flex-shrink-0" />
                  <span className="font-medium truncate">
                    {incident.residentName}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-sm text-gray-700 truncate mb-2">
                  <MapPin className="h-5 w-5 text-gray-500 flex-shrink-0" />
                  <span className="font-medium truncate">
                    {incident.flatNumber}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-sm text-gray-600 truncate">
                  <span className="font-medium">Phone:</span>
                  <span className="truncate">{incident.phoneNumber}</span>
                </div>
                <div className="flex items-center gap-1 text-sm text-gray-600 truncate">
                  <span className="font-medium">Emergency</span>
                  <span className="truncate">{incident.nokPhone}</span>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </CardContent>
    </Card>
  );
};
