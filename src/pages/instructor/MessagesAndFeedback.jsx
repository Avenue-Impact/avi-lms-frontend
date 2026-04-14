import React, { useState } from "react";
import { Search, Send, MessageSquare } from "lucide-react";

// Mock data shape – wire real API data when available
const MOCK_CONVERSATIONS = [
  {
    id: "1",
    studentName: "Olajoke Funso Fakson",
    initials: "OF",
    lastMessage: "I'd definitely shoot any opportuni...",
    time: "12.30",
    unreadCount: 10,
    messageStatus: "unread",
    lastOnline: "4 weeks ago",
    messages: [
      { id: "m1", text: "Hello James, I have a question about module 2.", sender: "student", time: "4:55 PM", date: "19 May 2024" },
      { id: "m2", text: "Of course! What's the question?", sender: "instructor", time: "4:59 PM", date: "19 May 2024" },
      { id: "m3", text: "I'd definitely shoot any opportunity for revision, thank you!", sender: "student", time: "5:02 PM", date: "19 May 2024" },
    ],
  },
];

const MessagesPage = () => {
  const [activeConvoId, setActiveConvoId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [draft, setDraft] = useState("");

  // --- Toggle below to simulate empty vs active state ---
  const conversations = MOCK_CONVERSATIONS;

  const activeConvo = conversations.find((c) => c.id === activeConvoId);

  const filtered = conversations.filter((c) =>
    c.studentName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (conversations.length === 0) {
    return (
      <EmptyPage
        title="Messages"
        subtitle="Communicate with students in your cohorts and respond to their questions."
        illustration={<ChatIllustration />}
        emptyTitle="No conversations yet"
        emptyDesc="Student messages will appear here once they start a conversation."
      />
    );
  }

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-[32px] font-bold text-[#1A1A2E] mb-1">Messages</h1>
        <p className="text-[15px] text-[#888]">Communicate with students in your cohorts and respond to their questions.</p>
      </div>

      {/* Two-panel layout */}
      <div className="flex overflow-hidden rounded-[16px] border border-[#E5E5E5] bg-white" style={{ minHeight: "580px" }}>
        {/* Left Panel */}
        <div className="flex w-[40%] flex-col border-r border-[#E5E5E5]">
          {/* Search */}
          <div className="p-4 border-b border-[#F5F5F5]">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search students"
                className="w-full rounded-lg border border-[#E5E5E5] bg-[#F5F5F5] py-2.5 pl-9 pr-4 text-sm focus:outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Conversation List */}
          <div className="flex-1 overflow-y-auto">
            {filtered.map((convo) => (
              <button
                key={convo.id}
                onClick={() => setActiveConvoId(convo.id)}
                className={`flex w-full items-start gap-3 p-4 text-left border-b border-[#F5F5F5] transition-colors ${activeConvoId === convo.id ? "bg-[#FFF0F0]" : "hover:bg-[#F9F9F9]"}`}
              >
                <Avatar initials={convo.initials} />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-bold text-[#1A1A2E]">{convo.studentName}</p>
                  <p className="truncate text-xs text-[#888]">{convo.lastMessage}</p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="text-[10px] text-[#888]">{convo.time}</span>
                  {convo.unreadCount ? (
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#C8102E] text-[9px] font-bold text-white">
                      {convo.unreadCount}
                    </span>
                  ) : null}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Right Panel */}
        {activeConvo ? (
          <div className="flex w-[60%] flex-col">
            {/* Chat Header */}
            <div className="flex items-center justify-between border-b border-[#F5F5F5] px-6 py-4">
              <div className="flex items-center gap-3">
                <Avatar initials={activeConvo.initials} size="lg" />
                <div>
                  <p className="font-bold text-[#1A1A2E]">{activeConvo.studentName}</p>
                  <p className="text-xs text-[#888]">Last online {activeConvo.lastOnline}</p>
                </div>
              </div>
              <button className="text-sm font-bold text-[#C8102E] hover:underline">
                View Student Profile ›
              </button>
            </div>

            {/* Message Thread */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              {Object.entries(
                activeConvo.messages.reduce((acc, m) => {
                  (acc[m.date] = acc[m.date] || []).push(m);
                  return acc;
                }, {})
              ).map(([date, msgs]) => (
                <div key={date}>
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex-1 h-px bg-[#F5F5F5]" />
                    <span className="text-[11px] text-[#888]">{date}</span>
                    <div className="flex-1 h-px bg-[#F5F5F5]" />
                  </div>
                  {msgs.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex mb-4 ${msg.sender === "student" ? "justify-start" : "justify-end"}`}
                    >
                      <div className={`max-w-[70%] rounded-xl px-4 py-3 text-sm ${msg.sender === "student" ? "bg-[#F5F5F5] text-[#1A1A2E]" : "bg-[#FFF0F0] text-[#1A1A2E]"}`}>
                        <p>{msg.text}</p>
                        <p className="mt-1 text-[10px] text-[#888]">
                          {msg.sender === "instructor" ? "You" : activeConvo.studentName.split(" ")[0]} • {msg.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="flex items-center gap-3 border-t border-[#F5F5F5] px-6 py-4">
              <input
                type="text"
                placeholder="Write a message..."
                className="flex-1 rounded-lg border border-[#E5E5E5] bg-white px-4 py-2.5 text-sm focus:border-primary-color-600 focus:outline-none"
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && setDraft("")}
              />
              <button
                onClick={() => setDraft("")}
                className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#C8102E] text-white hover:bg-red-700 transition-colors"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        ) : (
          <div className="flex w-[60%] flex-col items-center justify-center text-center text-[#888] p-10">
            <MessageSquare size={40} className="mb-4 text-gray-300" />
            <p className="font-bold text-[#1A1A2E]">Select a conversation</p>
            <p className="text-sm">Choose a student from the left to view messages.</p>
          </div>
        )}
      </div>
    </div>
  );
};

// --- PAGE: FEEDBACK & Q&A ---
export const FeedbackPage = () => {
  const [activeQuestionId, setActiveQuestionId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [response, setResponse] = useState("");
  const [markAnswered, setMarkAnswered] = useState(false);
  const [questions, setQuestions] = useState([
    {
      id: "1",
      studentName: "Fakson Joke Funso",
      initials: "FJ",
      subject: "Issue with Business Analysis",
      cohortLabel: "Business Analysis Cohort 2",
      date: "19 May 2024",
      questionText: "I'm struggling with Business analytics in lesson 3. the elements are overlapping. How can i fix the spacing issues?",
      status: "Pending",
    },
    {
      id: "2",
      studentName: "Lanre Koleola",
      initials: "LK",
      subject: "Module 2 Assessment",
      cohortLabel: "Business Analysis Cohort 3",
      date: "20 May 2024",
      questionText: "I'm not sure if my module 2 assessment was graded. Could you confirm?",
      status: "Answered",
    },
  ]);

  const activeQuestion = questions.find((q) => q.id === activeQuestionId);
  const filtered = questions.filter((q) =>
    q.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    q.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendResponse = () => {
    if (!response.trim()) return;
    if (markAnswered) {
      setQuestions((prev) =>
        prev.map((q) => (q.id === activeQuestionId ? { ...q, status: "Answered" } : q))
      );
    }
    setResponse("");
    setMarkAnswered(false);
  };

  if (questions.length === 0) {
    return (
      <EmptyPage
        title="Feedback & Q&A"
        subtitle="Respond to student questions and provide guidance on lessons and assignments."
        illustration={<StarIllustration />}
        emptyTitle="No questions yet"
        emptyDesc="Student questions will appear here when they need help."
      />
    );
  }

  return (
    <div className="w-full">
      <div className="mb-6">
        <h1 className="text-[32px] font-bold text-[#1A1A2E] mb-1">Feedback & Q&A</h1>
        <p className="text-[15px] text-[#888]">Respond to student questions and provide guidance on lessons and assignments.</p>
      </div>

      <div className="flex overflow-hidden rounded-[16px] border border-[#E5E5E5] bg-white" style={{ minHeight: "580px" }}>
        {/* Left Panel */}
        <div className="flex w-[40%] flex-col border-r border-[#E5E5E5]">
          <div className="p-4 border-b border-[#F5F5F5]">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search students"
                className="w-full rounded-lg border border-[#E5E5E5] bg-[#F5F5F5] py-2.5 pl-9 pr-4 text-sm focus:outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {filtered.map((q) => (
              <button
                key={q.id}
                onClick={() => { setActiveQuestionId(q.id); setResponse(""); }}
                className={`flex w-full items-start gap-3 p-4 text-left border-b border-[#F5F5F5] transition-colors ${activeQuestionId === q.id ? "bg-[#FFF0F0]" : "hover:bg-[#F9F9F9]"}`}
              >
                <Avatar initials={q.initials} />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-bold text-[#1A1A2E]">{q.studentName}</p>
                  <p className="truncate text-xs font-medium text-[#C8102E]">{q.subject}</p>
                  <p className="truncate text-[10px] text-[#888]">{q.cohortLabel}</p>
                </div>
                <div className="flex flex-col items-end gap-2 flex-shrink-0">
                  <StatusPill status={q.status} />
                  <span className="text-[#888]">›</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Right Panel */}
        {activeQuestion ? (
          <div className="flex w-[60%] flex-col">
            {/* Question Header */}
            <div className="flex items-center gap-3 border-b border-[#F5F5F5] px-6 py-4">
              <Avatar initials={activeQuestion.initials} size="lg" />
              <div>
                <p className="font-bold text-[#1A1A2E]">{activeQuestion.studentName}</p>
                <p className="text-xs text-[#888]">Regarding: {activeQuestion.cohortLabel}</p>
              </div>
            </div>

            {/* Question Body */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              <div className="mb-4 text-center text-[11px] text-[#888]">{activeQuestion.date}</div>
              <p className="mb-6 text-[15px] leading-relaxed text-[#1A1A2E]">{activeQuestion.questionText}</p>
              <textarea
                rows={6}
                className="w-full rounded-lg border border-[#E5E5E5] p-4 text-sm focus:border-primary-color-600 focus:outline-none resize-none"
                placeholder="Write your response..."
                value={response}
                onChange={(e) => setResponse(e.target.value)}
              />
            </div>

            {/* Action Row */}
            <div className="flex items-center justify-between border-t border-[#F5F5F5] px-6 py-4">
              <label className="flex items-center gap-2 cursor-pointer text-sm text-[#1A1A2E]">
                <input
                  type="checkbox"
                  className="accent-[#C8102E] h-4 w-4"
                  checked={markAnswered}
                  onChange={(e) => setMarkAnswered(e.target.checked)}
                />
                Mark as Answered
              </label>
              <button
                onClick={handleSendResponse}
                className="rounded-full bg-[#C8102E] px-6 py-2.5 text-sm font-bold text-white hover:bg-red-700 transition-colors"
              >
                Send Response
              </button>
            </div>
          </div>
        ) : (
          <div className="flex w-[60%] flex-col items-center justify-center p-10 text-center">
            <StarIllustration />
            <p className="mt-4 font-bold text-[#1A1A2E]">Select a question</p>
            <p className="text-sm text-[#888]">Choose a question from the list to respond.</p>
          </div>
        )}
      </div>
    </div>
  );
};

// --- SHARED COMPONENTS ---
const Avatar = ({ initials, size = "sm" }) => (
  <div
    className={`flex flex-shrink-0 items-center justify-center rounded-full bg-[#FFF0F0] font-bold text-[#C8102E] ${
      size === "lg" ? "h-11 w-11 text-base" : "h-10 w-10 text-xs"
    }`}
  >
    {initials}
  </div>
);

const StatusPill = ({ status }) => {
  const map = {
    Pending: "bg-amber-100 text-amber-700",
    Answered: "bg-green-100 text-green-700",
  };
  return (
    <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${map[status] || "bg-gray-100 text-gray-500"}`}>
      {status}
    </span>
  );
};

const EmptyPage = ({ title, subtitle, illustration, emptyTitle, emptyDesc }) => (
  <div className="w-full">
    <div className="mb-6">
      <h1 className="text-[32px] font-bold text-[#1A1A2E] mb-1">{title}</h1>
      <p className="text-[15px] text-[#888]">{subtitle}</p>
    </div>
    <div className="flex flex-col items-center justify-center rounded-[16px] border border-[#E5E5E5] bg-white py-24 text-center">
      {illustration}
      <p className="mt-6 text-lg font-bold text-[#1A1A2E]">{emptyTitle}</p>
      <p className="mt-2 max-w-xs text-sm text-[#888]">{emptyDesc}</p>
    </div>
  </div>
);

const ChatIllustration = () => (
  <div className="flex h-28 w-28 items-center justify-center rounded-full bg-gray-100">
    <svg viewBox="0 0 64 64" width="64" height="64" fill="none" stroke="#1A1A2E" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="6" y="10" width="40" height="32" rx="6" />
      <line x1="16" y1="22" x2="36" y2="22" />
      <line x1="16" y1="30" x2="30" y2="30" />
      <path d="M12 42 L6 56 L26 44" />
    </svg>
  </div>
);

const StarIllustration = () => (
  <div className="flex h-28 w-28 items-center justify-center rounded-full bg-gray-100">
    <svg viewBox="0 0 64 64" width="64" height="64" fill="none" stroke="#1A1A2E" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="6" y="14" width="52" height="36" rx="8" />
      {[14, 21, 28, 35, 42].map((x, i) => (
        <polygon key={i} points={`${x},26 ${x+3},33 ${x+6},26 ${x+1.5},30 ${x+4.5},30`} />
      ))}
    </svg>
  </div>
);

export default MessagesPage;
