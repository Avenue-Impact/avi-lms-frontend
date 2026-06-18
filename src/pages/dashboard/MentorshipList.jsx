import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchMentors, getMentorshipBookings } from "@/services/api";
import { Skeleton } from "@/Components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";
import BookMentorshipModal from "@/Components/dashboard/BookMentorshipModal";

const MentorshipList = () => {
  const [activeTab, setActiveTab] = useState("mentors");
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="border-white-300 my-6 rounded-lg border-2 bg-white p-6 lg:p-10">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800 md:text-3xl">Mentorship</h1>
        <p className="mt-2 text-gray-600">
          Book a 1-on-1 session with our industry experts to guide your learning journey.
        </p>
      </div>

      <div className="mb-8 flex gap-6 border-b border-gray-200">
        <button
          onClick={() => setActiveTab("mentors")}
          className={`border-b-2 px-2 pb-4 text-sm font-medium transition-colors ${
            activeTab === "mentors"
              ? "border-[#E11D48] text-[#E11D48]"
              : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
          }`}
        >
          Find a Mentor
        </button>
        <button
          onClick={() => setActiveTab("bookings")}
          className={`border-b-2 px-2 pb-4 text-sm font-medium transition-colors ${
            activeTab === "bookings"
              ? "border-[#E11D48] text-[#E11D48]"
              : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
          }`}
        >
          My Bookings
        </button>
      </div>

      {activeTab === "mentors" ? (
        <MentorsTab 
          setSelectedMentor={setSelectedMentor} 
          setIsModalOpen={setIsModalOpen} 
        />
      ) : (
        <BookingsTab />
      )}

      {selectedMentor && (
        <BookMentorshipModal
          mentor={selectedMentor}
          open={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedMentor(null);
          }}
        />
      )}
    </div>
  );
};

const MentorsTab = ({ setSelectedMentor, setIsModalOpen }) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["mentors"],
    queryFn: async () => {
      const res = await fetchMentors();
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-[300px] w-full rounded-xl" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg bg-red-50 p-4 text-red-600">
        Failed to load mentors. Please try again later.
      </div>
    );
  }

  const mentors = data?.mentors || [];

  if (mentors.length === 0) {
    return (
      <div className="rounded-xl border border-gray-200 bg-gray-50 p-12 text-center">
        <h3 className="text-lg font-medium text-gray-900">No mentors available</h3>
        <p className="mt-2 text-gray-500">Check back later for new mentors.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {mentors.map((mentor) => (
        <div
          key={mentor.id}
          className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col border border-gray-100 transition-all hover:shadow-lg"
        >
          <div className="flex flex-col items-center p-6 border-b border-gray-50">
            <Avatar className="h-24 w-24 border-4 border-white shadow-md">
              <AvatarImage src={mentor.profile_photo_url || mentor.avatar} />
              <AvatarFallback className="bg-rose-100 text-2xl font-bold text-rose-700">
                {(mentor.first_name || mentor.name)?.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <h3 className="mt-4 font-semibold text-lg text-gray-800 text-center">
              {mentor.first_name} {mentor.last_name}
            </h3>
            {mentor.services?.[0] && (
              <p className="text-sm font-medium text-[#E11D48] mt-1 text-center">
                {mentor.services[0].name}
              </p>
            )}
          </div>
          
          <div className="flex flex-1 flex-col p-6 bg-gray-50/30">
            <p className="line-clamp-3 flex-1 text-sm text-gray-600 text-center">{mentor.bio}</p>
            
            <div className="mt-5 flex flex-wrap gap-2 justify-center">
              {mentor.specialties?.map((specialty) => (
                <span key={specialty.id} className="rounded-md bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600 border border-gray-200">
                  {specialty.name}
                </span>
              ))}
            </div>
            
            <div className="mt-6 pt-2">
              <button 
                className="w-full bg-[#E11D48] text-white py-2.5 rounded-md font-medium text-sm hover:bg-rose-700 transition-colors shadow-sm"
                onClick={() => {
                  setSelectedMentor(mentor);
                  setIsModalOpen(true);
                }}
              >
                View Availability
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const BookingsTab = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["mentorship-bookings"],
    queryFn: async () => {
      const res = await getMentorshipBookings();
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2].map((i) => (
          <Skeleton key={i} className="h-28 w-full rounded-xl" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg bg-red-50 p-4 text-red-600">
        Failed to load your bookings. Please try again later.
      </div>
    );
  }

  const bookings = data?.bookings || [];

  if (bookings.length === 0) {
    return (
      <div className="rounded-xl border border-gray-200 bg-gray-50 p-12 text-center">
        <h3 className="text-lg font-medium text-gray-900">No upcoming sessions</h3>
        <p className="mt-2 text-gray-500">You haven't booked any mentorship sessions yet.</p>
      </div>
    );
  }

  const formatSlotTime = (start) => {
    if (start === undefined || start === null) return "";
    const hr = Math.floor(start);
    const min = (start % 1) * 60;
    const period = hr >= 12 ? "PM" : "AM";
    const displayHr = hr % 12 || 12;
    const displayMin = min === 0 ? "00" : min;
    return `${displayHr}:${displayMin.toString().padStart(2, '0')} ${period}`;
  };

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {bookings.map((booking) => (
        <div key={booking.id} className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-100 flex flex-col transition-all hover:shadow-lg">
          <div className="border-b border-gray-50 p-5 pb-4 flex justify-between items-start">
            <div>
              <h4 className="font-semibold text-lg text-gray-800">
                {booking.service_name || booking.mentorName || "Mentorship Session"}
              </h4>
              <p className="text-sm font-medium text-[#E11D48] mt-1">
                {booking.specialty_name || "Mentorship"}
              </p>
            </div>
            <span className="rounded-md bg-green-50 px-2.5 py-1 text-xs font-semibold text-green-700 border border-green-200 uppercase tracking-wider">
              {booking.status?.toUpperCase() || "CONFIRMED"}
            </span>
          </div>
          
          <div className="p-5 flex-1 bg-gray-50/30 flex flex-col justify-between">
            <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
              <div className="flex flex-col">
                <span className="text-gray-400 text-xs font-medium uppercase tracking-wider mb-1">Date</span>
                <span className="font-medium text-gray-800">{booking.booking_date || booking.date}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-gray-400 text-xs font-medium uppercase tracking-wider mb-1">Time</span>
                <span className="font-medium text-gray-800">{booking.slots?.[0] ? formatSlotTime(booking.slots[0].start) : booking.time}</span>
              </div>
            </div>
            
            {booking.meeting_links?.length > 0 ? (
              <div className="mt-6 pt-4 border-t border-gray-100">
                <a 
                  href={booking.meeting_links[0].url} 
                  target="_blank" 
                  rel="noreferrer"
                  className="w-full flex items-center justify-center bg-[#E11D48] text-white py-2 rounded-md font-medium text-sm hover:bg-rose-700 transition-colors shadow-sm"
                >
                  Join Meeting ({booking.meeting_links[0].provider})
                </a>
              </div>
            ) : (
              <div className="mt-6 pt-4 border-t border-gray-100">
                <button 
                  disabled
                  className="w-full bg-gray-100 text-gray-400 py-2 rounded-md font-medium text-sm cursor-not-allowed"
                >
                  Meeting Link Pending...
                </button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MentorshipList;
