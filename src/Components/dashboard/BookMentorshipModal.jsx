import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/Components/ui/dialog";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getMentorAvailability, bookMentorshipSession } from "@/services/api";
import { Skeleton } from "@/Components/ui/skeleton";
import CommonButton from "@/Components/ui/button";
import toast from "react-hot-toast";
import { liveSessionDetailQuery } from "@/loaders/student/home-page-loader";

const getNext14Days = () => {
  const dates = [];
  const today = new Date();
  for (let i = 1; i <= 14; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    dates.push(d);
  }
  return dates;
};

const BookMentorshipModal = ({ mentor, open, onClose }) => {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("");
  const [selectedCohortId, setSelectedCohortId] = useState("");

  const { data: liveData, isLoading: isLoadingCohorts } = useQuery(liveSessionDetailQuery());
  const enrolledCohorts = (liveData?.data?.data?.courses || []).filter(
    (c) => c.cohort_details?.mentorship_enabled === true
  );

  const { data: bookingsData, isLoading: isLoadingBookings } = useQuery({
    queryKey: ["mentorship-bookings"],
    queryFn: async () => {
      const res = await getMentorshipBookings();
      return res.data;
    },
    enabled: open,
  });

  const allBookings = bookingsData?.bookings || [];
  const selectedCohortBookings = allBookings.filter(
    (b) => String(b.metadata?.cohort_id) === String(selectedCohortId)
  );
  const hasReachedLimit = selectedCohortBookings.length >= 5;

  const { data: availabilityData, isLoading } = useQuery({
    queryKey: ["mentor-availability", mentor?.id],
    queryFn: async () => {
      const res = await getMentorAvailability(mentor.id);
      return res.data || { days_of_week: [], time_slots: [] };
    },
    enabled: !!mentor?.id && open,
  });

  const { mutate: bookSession, isLoading: isBooking } = useMutation({
    mutationFn: (data) => bookMentorshipSession(data),
    onSuccess: () => {
      toast.success("Mentorship session booked successfully!");
      onClose();
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to book session");
    },
  });

  const handleBooking = () => {
    if (!selectedCohortId) {
      toast.error("Please select a course/cohort");
      return;
    }
    if (!selectedService) {
      toast.error("Please select a service");
      return;
    }
    if (!selectedSpecialty) {
      toast.error("Please select a specialty");
      return;
    }
    if (!selectedDate || !selectedTime) {
      toast.error("Please select both a date and a time slot");
      return;
    }

    bookSession({
      mentorId: mentor.id,
      date: selectedDate,
      time: selectedTime,
      service_id: selectedService,
      specialty_id: selectedSpecialty,
      cohort_id: selectedCohortId,
    });
  };

  // Compute available dates and times
  const computeAvailableDates = () => {
    if (!availabilityData || !availabilityData.availability.time_slots) return [];

    const todayStr = new Date().toISOString().split("T")[0];
    
    return availabilityData.availability.time_slots
      .filter((day) => day.date >= todayStr)
      .map((day) => {
        // Filter out slots that are not available (status === false)
        const availableSessions = day.slots.filter(
          (slot) => slot.status === true,
        );
        
        if (availableSessions.length === 0) return null;

        const [year, month, date] = day.date.split("-");
        const localDate = new Date(year, month - 1, date);

        return {
          date: day.date,
          display: localDate.toLocaleDateString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
          }),
          sessions: availableSessions,
        };
      })
      .filter(Boolean);
  };

  const availableDates = computeAvailableDates();

  const selectedDateObj = availableDates.find((d) => d.date === selectedDate);
  const availableSessions = selectedDateObj ? selectedDateObj.sessions : [];

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>
            Book Session with {mentor?.first_name || mentor?.name}
          </DialogTitle>
          <DialogDescription>
            Select an available date and time for your mentorship session.
          </DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <div className="space-y-4 py-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        ) : (
          <div className="space-y-6 py-4">
            {availableDates.length === 0 ? (
              <div className="rounded-md bg-yellow-50 p-4 text-sm text-yellow-700">
                This mentor currently has no available time slots in the next 14
                days. Please check back later.
              </div>
            ) : (
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Select Course / Cohort
                  </label>
                  {isLoadingCohorts ? (
                    <Skeleton className="h-10 w-full" />
                  ) : (
                    <select
                      value={selectedCohortId}
                      onChange={(e) => setSelectedCohortId(e.target.value)}
                      className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-[#E11D48] focus:outline-none focus:ring-1 focus:ring-[#E11D48]"
                    >
                      <option value="" disabled>Select your enrolled cohort...</option>
                      {enrolledCohorts.map(c => (
                        <option key={c.id || c.courseId} value={c.cohort_id || c.id || c.courseId}>
                          {c.title}
                        </option>
                      ))}
                    </select>
                  )}
                </div>

                {selectedCohortId && hasReachedLimit && (
                  <div className="rounded-md bg-rose-50 border border-rose-200 p-4 animate-in fade-in">
                    <h4 className="text-sm font-semibold text-rose-800">Booking Limit Reached</h4>
                    <p className="mt-1 text-sm text-rose-700">
                      You have reached the maximum limit of 5 free mentorship sessions for this cohort.
                    </p>
                    <a
                      href="https://mentiiv.com"
                      target="_blank"
                      rel="noreferrer"
                      className="mt-3 inline-flex w-full justify-center items-center rounded-md bg-[#E11D48] px-3 py-2 text-sm font-medium text-white hover:bg-rose-700 transition-colors"
                    >
                      Visit Mentiiv to Book More Sessions
                    </a>
                  </div>
                )}

                <div className={hasReachedLimit ? "opacity-50 pointer-events-none" : ""}>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mb-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Select Service
                    </label>
                    <select
                      value={selectedService}
                      onChange={(e) => setSelectedService(e.target.value)}
                      className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-[#E11D48] focus:outline-none focus:ring-1 focus:ring-[#E11D48]"
                    >
                      <option value="" disabled>Select a service...</option>
                      {mentor.services?.map(s => (
                        <option key={s.id} value={s.id}>{s.name}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Select Specialty
                    </label>
                    <select
                      value={selectedSpecialty}
                      onChange={(e) => setSelectedSpecialty(e.target.value)}
                      className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-[#E11D48] focus:outline-none focus:ring-1 focus:ring-[#E11D48]"
                    >
                      <option value="" disabled>Select a specialty...</option>
                      {mentor.specialties?.map(s => (
                        <option key={s.id} value={s.id}>{s.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-medium text-gray-700">
                    Select Date
                  </label>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                    {availableDates.map((dateObj) => (
                      <button
                        key={dateObj.date}
                        onClick={() => {
                          setSelectedDate(dateObj.date);
                          setSelectedTime(""); // Reset time when date changes
                        }}
                        className={`rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
                          selectedDate === dateObj.date
                            ? "border-[#E11D48] bg-rose-50 text-[#E11D48]"
                            : "border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50"
                        }`}
                      >
                        {dateObj.display}
                      </button>
                    ))}
                  </div>
                </div>

                {selectedDate && (
                  <div className="space-y-3 animate-in fade-in">
                    <label className="text-sm font-medium text-gray-700">
                      Select Time
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {availableSessions.length > 0 ? (
                        availableSessions.map((session) => (
                          <button
                            key={session.start_time}
                            onClick={() => setSelectedTime(session.start_time)}
                            className={`rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
                              selectedTime === session.start_time
                                ? "border-[#E11D48] bg-rose-50 text-[#E11D48]"
                                : "border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50"
                            }`}
                          >
                            {session.time_formatted}
                          </button>
                        ))
                      ) : (
                        <div className="col-span-3 text-sm text-gray-500">
                          No time slots available on this date.
                        </div>
                      )}
                    </div>
                  </div>
                )}
                </div>
              </div>
            )}

            <div className="mt-6 flex justify-end gap-3 border-t pt-4">
              <CommonButton
                variant="outline"
                className="bg-white text-gray-700 hover:bg-gray-50"
                onClick={onClose}
              >
                Cancel
              </CommonButton>
              <CommonButton
                onClick={handleBooking}
                disabled={!selectedCohortId || !selectedService || !selectedSpecialty || !selectedDate || !selectedTime || isBooking || hasReachedLimit}
                className="bg-[#E11D48] text-white hover:bg-rose-700 disabled:opacity-50"
              >
                {isBooking ? "Booking..." : "Confirm Booking"}
              </CommonButton>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default BookMentorshipModal;
