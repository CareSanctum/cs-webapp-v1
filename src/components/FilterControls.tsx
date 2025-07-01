import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Filter, X, ChevronDown } from "lucide-react";
import { format } from "date-fns";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { IncidentStatus, IncidentType } from "@/types/emergency";

interface FilterControlsProps {
  statusFilter: IncidentStatus | "all";
  typeFilter: IncidentType | "all";
  selectedDate: Date;
  onStatusChange: (value: string) => void;
  onTypeChange: (value: string) => void;
  onDateChange: (date: Date | undefined) => void;
  showFilters: boolean;
  onToggleFilters: () => void;
}

export const FilterControls = ({
  statusFilter,
  typeFilter,
  selectedDate,
  onStatusChange,
  onTypeChange,
  onDateChange,
  showFilters,
  onToggleFilters
}: FilterControlsProps) => {
  const [isDesktopDatePickerOpen, setIsDesktopDatePickerOpen] = useState(false);
  const [isMobileDatePickerOpen, setIsMobileDatePickerOpen] = useState(false);

  const handleDesktopDateSelect = (date: Date | undefined) => {
    if (date) {
      onDateChange(date);
      setIsDesktopDatePickerOpen(false);
    }
  };

  const handleMobileDateSelect = (date: Date | undefined) => {
    if (date) {
      onDateChange(date);
      setIsMobileDatePickerOpen(false);
    }
  };

  const activeFiltersCount = [
    statusFilter !== "all",
    typeFilter !== "all",
    selectedDate.toDateString() !== new Date().toDateString()
  ].filter(Boolean).length;

  return (
    <div className="space-y-4">
      {/* Filter Toggle Button (Mobile) */}
      <div className="flex items-center justify-between lg:hidden">
        <h3 className="text-base font-medium text-gray-900">Emergency Alerts</h3>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onToggleFilters}
          className="flex items-center gap-2"
        >
          <Filter className="h-4 w-4" />
          Filters
          {activeFiltersCount > 0 && (
            <span className="h-5 w-5 rounded-full bg-blue-100 text-blue-600 text-xs font-medium flex items-center justify-center">
              {activeFiltersCount}
            </span>
          )}
          {showFilters && <X className="h-4 w-4" />}
        </Button>
      </div>

      {/* Desktop Filters - Always Visible */}
      <div className="hidden lg:block">
        <Card className="bg-white/80 backdrop-blur-sm border-gray-200 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <Select value={statusFilter} onValueChange={onStatusChange}>
                  <SelectTrigger className="h-10 border-gray-300 bg-white">
                    <SelectValue placeholder="Filter by Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="OPEN">Open</SelectItem>
                    <SelectItem value="ATTENDING">Attending</SelectItem>
                    <SelectItem value="VALIDATED">Validated</SelectItem>
                    <SelectItem value="INVALID">Invalid</SelectItem>
                    <SelectItem value="CORDINATION_REQUIRED">Coordination Required</SelectItem>
                    <SelectItem value="NO_CORDINATION_REQUIRED">No Coordination Required</SelectItem>
                    <SelectItem value="CLOSED">Closed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex-1">
                <Select value={typeFilter} onValueChange={onTypeChange}>
                  <SelectTrigger className="h-10 border-gray-300 bg-white">
                    <SelectValue placeholder="Filter by Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="PHYSICAL_SOS">Phsyical SOS Button</SelectItem>
                    <SelectItem value="SMOKE_DETECTED">Smoke Detected</SelectItem>
                    <SelectItem value="GAS_LEAKAGE">Gas Leak</SelectItem>
                    <SelectItem value="FALL_DETECTED">Fall Detected</SelectItem>
                    <SelectItem value="WATCH_SOS">Watch SOS</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex-1">
                <Popover open={isDesktopDatePickerOpen} onOpenChange={setIsDesktopDatePickerOpen}>
                  <PopoverTrigger asChild>
                    <Button 
                      variant="outline" 
                      className="h-10 w-full justify-start border-gray-300 bg-white"
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      {format(selectedDate, "MMM dd, yyyy")}
                      <ChevronDown className="ml-auto h-4 w-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <CalendarComponent
                      mode="single"
                      selected={selectedDate}
                      onSelect={handleDesktopDateSelect}
                      initialFocus
                      className="p-3"
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Mobile Filters - Collapsible */}
      {showFilters && (
        <Card className="lg:hidden bg-white/80 backdrop-blur-sm border-gray-200 shadow-sm">
          <CardContent className="p-4">
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Status</label>
                <Select value={statusFilter} onValueChange={onStatusChange}>
                  <SelectTrigger className="h-10 border-gray-300 bg-white">
                    <SelectValue placeholder="Filter by Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="OPEN">Open</SelectItem>
                    <SelectItem value="ATTENDING">Attending</SelectItem>
                    <SelectItem value="VALIDATED">Validated</SelectItem>
                    <SelectItem value="INVALID">Invalid</SelectItem>
                    <SelectItem value="CORDINATION_REQUIRED">Coordination Required</SelectItem>
                    <SelectItem value="NO_CORDINATION_REQUIRED">No Coordination Required</SelectItem>
                    <SelectItem value="CLOSED">Closed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Type</label>
                <Select value={typeFilter} onValueChange={onTypeChange}>
                  <SelectTrigger className="h-10 border-gray-300 bg-white">
                    <SelectValue placeholder="Filter by Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="PHYSICAL_SOS">Phsyical SOS Button</SelectItem>
                    <SelectItem value="SMOKE_DETECTED">Smoke Detected</SelectItem>
                    <SelectItem value="GAS_LEAKAGE">Gas Leak</SelectItem>
                    <SelectItem value="FALL_DETECTED">Fall Detected</SelectItem>
                    <SelectItem value="WATCH_SOS">Watch SOS</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Date</label>
                <Popover open={isMobileDatePickerOpen} onOpenChange={setIsMobileDatePickerOpen}>
                  <PopoverTrigger asChild>
                    <Button 
                      variant="outline" 
                      className="h-10 w-full justify-start border-gray-300 bg-white"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setIsMobileDatePickerOpen(!isMobileDatePickerOpen);
                      }}
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      {format(selectedDate, "MMM dd, yyyy")}
                      <ChevronDown className="ml-auto h-4 w-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start" side="bottom" sideOffset={4}>
                    <CalendarComponent
                      mode="single"
                      selected={selectedDate}
                      onSelect={handleMobileDateSelect}
                      initialFocus={false}
                      className="p-3"
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
