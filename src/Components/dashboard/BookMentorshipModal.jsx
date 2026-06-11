import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/Components/ui/dialog";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getMentorAvailability, bookMentorshipSession } from "@/services/api";
import { Skeleton } from "@/Components/ui/skeleton";
import CommonButton from "@/Components/ui/button";
import toast from "react-hot-toast";

const BookMentorshipModal = ({ mentor, open, onClose }) => {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  const { data: availabilityData, isLoading } = useQuery({
    queryKey: ["mentor-availability", mentor?.id],
    queryFn: async () => {
      const res = await getMentorAvailability(mentor.id);
      return res.data?.availability || [];
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
    if (!selectedDate || !selectedTime) {
      toast.error("Please select both a date and a time slot");
      return;
    }
    bookSession({
      mentorId: mentor.id,
      date: selectedDate,
      time: selectedTime,
    });
  };

  // Extract unique dates
  const availableDates = availabilityData ? [...new Set(availabilityData.map(slot => slot.date))] : [];
  
  // Filter times based on selected date
  const availableTimes = availabilityData
    ?.filter(slot => slot.date === selectedDate)
    .map(slot => slot.time) || [];

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Book Session with {mentor?.name}</DialogTitle>
          <DialogDescription>
            Select an available date and time for your mentorship session.
          </DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <div className="space-y-4 py-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        ) : (
          <div className="space-y-6 py-4">
            {availabilityData?.length === 0 ? (
              <div className="rounded-md bg-yellow-50 p-4 text-sm text-yellow-700">
                This mentor currently has no available time slots. Please check back later.
              </div>
            ) : (
              <>
                <div className="space-y-3">
                  <label className="text-sm font-medium text-gray-700">Select Date</label>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                    {availableDates.map(date => (
                      <button
                        key={date}
                        onClick={() => {
                          setSelectedDate(date);
                          setSelectedTime(""); // Reset time when date changes
                        }}
                        className={`rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
                          selectedDate === date
                            ? "border-primary-color-600 bg-primary-color-50 text-primary-color-700"
                            : "border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50"
                        }`}
                      >
                        {date}
                      </button>
                    ))}
                  </div>
                </div>

                {selectedDate && (
                  <div className="space-y-3 animate-in fade-in">
                    <label className="text-sm font-medium text-gray-700">Select Time</label>
                    <div className="grid grid-cols-3 gap-2">
                      {availableTimes.map(time => (
                        <button
                          key={time}
                          onClick={() => setSelectedTime(time)}
                          className={`rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
                            selectedTime === time
                              ? "border-primary-color-600 bg-primary-color-50 text-primary-color-700"
                              : "border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50"
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </>
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
                disabled={!selectedDate || !selectedTime || isBooking}
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
