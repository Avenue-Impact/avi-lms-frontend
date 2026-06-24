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
  const { data: bookingsData, isLoading: isLoadingBookings, error } = useQuery({
    queryKey: ["mentorship-bookings"],
    queryFn: async () => {
      const res = await getMentorshipBookings();
      return res.data;
    },
  });

  const { data: mentorsData } = useQuery({
    queryKey: ["mentors"],
    queryFn: async () => {
      const res = await fetchMentors();
      return res.data;
    },
  });

  if (isLoadingBookings) {
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

  const rawBookings = bookingsData?.bookings || [];
  const mentors = mentorsData?.mentors || [];
  
  // Enrich bookings with mentor data from the mentors query
  const bookings = rawBookings.map(b => {
    const mentorMatch = mentors.find(m => m.id === b.mentor_id) || b.mentor;
    return { ...b, mentor: mentorMatch };
  });

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
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {bookings.map((booking) => (
        <div key={booking.id} className="bg-white shadow-md rounded-xl overflow-hidden border border-gray-200 flex flex-col transition-all hover:shadow-lg">
          <div className="border-b border-gray-100 p-5 flex justify-between items-start gap-4">
            <div className="flex gap-4 items-center">
              <Avatar className="h-14 w-14 border-2 border-rose-100 shadow-sm shrink-0">
                <AvatarImage src={booking.mentor?.profile_photo_url || booking.mentor?.avatar || booking.mentor_avatar} />
                <AvatarFallback className="bg-rose-100 text-xl font-bold text-rose-700">
                  {(booking.mentor?.first_name || booking.mentor_name || booking.mentorName || "M").charAt(0)}
                </AvatarFallback>
              </Avatar>
              
              <div className="min-w-0">
                <h4 className="font-bold text-lg text-gray-900 truncate">
                  {booking.mentor?.first_name ? `${booking.mentor.first_name} ${booking.mentor.last_name || ""}` : (booking.mentor?.name || booking.mentor_name || booking.mentorName || "Mentor")}
                </h4>
                <p className="text-sm font-medium text-[#E11D48] mt-0.5 truncate">
                  {booking.service_name || booking.service?.name || "Mentorship Session"}
                </p>
                <p className="text-xs text-gray-500 mt-1 truncate">
                  Specialty: {booking.specialty_name || booking.specialty?.name || "None specified"}
                </p>
              </div>
            </div>
            
            <span className={`shrink-0 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider ${
              booking.status === 'CONFIRMED' || booking.status === 'paid for' ? 'bg-green-100 text-green-700 border border-green-200' :
              booking.status === 'PENDING' ? 'bg-yellow-100 text-yellow-700 border border-yellow-200' :
              booking.status === 'CANCELLED' ? 'bg-red-100 text-red-700 border border-red-200' :
              'bg-gray-100 text-gray-700 border border-gray-200'
            }`}>
              {booking.status}
            </span>
          </div>
          
          <div className="p-6 flex-1 bg-gray-50/50 flex flex-col justify-between">
            <div className="grid grid-cols-2 gap-y-5 gap-x-4 text-sm text-gray-700">
              <div className="flex flex-col">
                <span className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">Date</span>
                <span className="font-semibold text-gray-900">{booking.booking_date || booking.date}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">Time</span>
                <span className="font-semibold text-gray-900">{booking.slots?.[0] ? formatSlotTime(booking.slots[0].start) : booking.time}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">Duration</span>
                <span className="font-semibold text-gray-900">{booking.duration_minutes || booking.duration || "60"} mins</span>
              </div>
              <div className="flex flex-col">
                <span className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">Cohort Name</span>
                <span className="font-semibold text-gray-900 truncate" title={booking.metadata?.cohort_name || booking.cohort_name || "N/A"}>
                  {booking.metadata?.cohort_name || booking.cohort_name || "N/A"}
                </span>
              </div>
            </div>
            
            {booking.notes && (
              <div className="mt-5 pt-5 border-t border-gray-200">
                <span className="text-gray-400 text-xs font-bold uppercase tracking-wider block mb-2">Notes</span>
                <p className="text-sm text-gray-600 bg-white p-3 rounded-md border border-gray-100 italic">"{booking.notes}"</p>
              </div>
            )}
            
            <div className="mt-6 pt-5 border-t border-gray-200">
              {(booking.meeting_links?.length > 0 || booking.join_url) ? (
                booking.can_join !== false ? (
                  <a 
                    href={booking.meeting_links?.[0]?.url || booking.join_url} 
                    target="_blank" 
                    rel="noreferrer"
                    className="w-full flex items-center justify-center bg-[#E11D48] text-white py-2.5 rounded-lg font-semibold text-sm hover:bg-rose-700 transition-colors shadow-sm"
                  >
                    Join Meeting {booking.meeting_links?.[0]?.provider ? `(${booking.meeting_links[0].provider})` : ''}
                  </a>
                ) : (
                  <button 
                    disabled
                    className="w-full bg-gray-100 text-gray-400 py-2.5 rounded-lg font-semibold text-sm cursor-not-allowed border border-gray-200"
                  >
                    Meeting opens 20 mins before start
                  </button>
                )
              ) : (
                <button 
                  disabled
                  className="w-full bg-gray-100 text-gray-400 py-2.5 rounded-lg font-semibold text-sm cursor-not-allowed border border-gray-200"
                >
                  Meeting Link Pending
                </button>
              )}
            </div>
          </div>
          
        </div>
      ))}
    </div>
  );
};

export default MentorshipList;
