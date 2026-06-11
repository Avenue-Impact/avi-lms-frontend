import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchMentors, getMentorshipBookings } from "@/services/api";
import { Skeleton } from "@/Components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";
import CommonButton from "@/Components/ui/button";
import BookMentorshipModal from "@/Components/dashboard/BookMentorshipModal";

const MentorshipList = () => {
  const [activeTab, setActiveTab] = useState("mentors");
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="p-6 lg:p-10">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">Mentorship</h1>
        <p className="mt-2 text-gray-600">
          Book a 1-on-1 session with our industry experts to guide your learning journey.
        </p>
      </div>

      <div className="mb-6 flex gap-4 border-b border-gray-200">
        <button
          onClick={() => setActiveTab("mentors")}
          className={`border-b-2 px-1 pb-4 text-sm font-medium ${
            activeTab === "mentors"
              ? "border-primary-color-600 text-primary-color-600"
              : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
          }`}
        >
          Find a Mentor
        </button>
        <button
          onClick={() => setActiveTab("bookings")}
          className={`border-b-2 px-1 pb-4 text-sm font-medium ${
            activeTab === "bookings"
              ? "border-primary-color-600 text-primary-color-600"
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
          <Skeleton key={i} className="h-48 w-full rounded-xl" />
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
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {mentors.map((mentor) => (
        <div
          key={mentor.id}
          className="flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md"
        >
          <div className="flex items-center gap-4 border-b border-gray-100 bg-gray-50/50 p-5">
            <Avatar className="h-14 w-14 border-2 border-white shadow-sm">
              <AvatarImage src={mentor.avatar} />
              <AvatarFallback className="bg-primary-color-100 text-lg font-semibold text-primary-color-700">
                {mentor.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-gray-900">{mentor.name}</h3>
              <p className="text-sm font-medium text-primary-color-600">{mentor.role}</p>
            </div>
          </div>
          <div className="flex flex-1 flex-col p-5">
            <p className="line-clamp-3 flex-1 text-sm text-gray-600">{mentor.bio}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {mentor.expertise?.map((skill, idx) => (
                <span key={idx} className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700">
                  {skill}
                </span>
              ))}
            </div>
            <div className="mt-6 border-t border-gray-100 pt-4">
              <CommonButton 
                className="w-full justify-center"
                onClick={() => {
                  setSelectedMentor(mentor);
                  setIsModalOpen(true);
                }}
              >
                View Availability
              </CommonButton>
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
          <Skeleton key={i} className="h-24 w-full rounded-xl" />
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

  return (
    <div className="space-y-4">
      {bookings.map((booking) => (
        <div key={booking.id} className="flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-5 sm:flex-row sm:items-center sm:justify-between shadow-sm">
          <div>
            <h4 className="font-semibold text-gray-900">Session with {booking.mentorName}</h4>
            <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <span className="font-medium">Date:</span> {booking.date}
              </div>
              <div className="flex items-center gap-1">
                <span className="font-medium">Time:</span> {booking.time}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700 border border-green-200">
              Confirmed
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MentorshipList;
