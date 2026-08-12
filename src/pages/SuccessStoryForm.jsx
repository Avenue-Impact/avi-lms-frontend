import React, { useState, useRef } from 'react';
import { Camera, Mic, Square, UploadCloud, CheckCircle2, Briefcase, GraduationCap, Building2, User, Play, Pause, Trash2, Loader2 } from 'lucide-react';
import { useCreateSuccessStory } from '@/hooks/success-stories/use-success-stories';
import { useNavigate } from 'react-router-dom';

const SuccessStoryForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    course: '',
    jobTitle: '',
    industry: '',
    story: '',
  });

  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  
  // Real MediaRecorder state
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [recordingTime, setRecordingTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const timerRef = useRef(null);
  const audioPlayerRef = useRef(null);

  const { mutateAsync: createStory, isPending } = useCreateSuccessStory();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        setAudioBlob(blob);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
      setAudioBlob(null);
      setRecordingTime(0);
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } catch (err) {
      console.error("Error accessing microphone:", err);
      alert("Microphone access is required to record audio stories.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      clearInterval(timerRef.current);
    }
  };

  const toggleRecording = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const deleteRecording = () => {
    if (isPlaying && audioPlayerRef.current) {
      audioPlayerRef.current.pause();
      setIsPlaying(false);
    }
    setAudioBlob(null);
    setRecordingTime(0);
  };

  const toggleAudioPlay = () => {
    if (!audioBlob) return;
    if (!audioPlayerRef.current) {
      const audioUrl = URL.createObjectURL(audioBlob);
      audioPlayerRef.current = new Audio(audioUrl);
      audioPlayerRef.current.onended = () => setIsPlaying(false);
    }

    if (isPlaying) {
      audioPlayerRef.current.pause();
      setIsPlaying(false);
    } else {
      audioPlayerRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('name', formData.name);
    if (formData.course) data.append('course', formData.course);
    data.append('jobTitle', formData.jobTitle);
    if (formData.industry) data.append('industry', formData.industry);
    data.append('story', formData.story);

    if (avatarFile) {
      data.append('avatar', avatarFile);
    }

    if (audioBlob) {
      data.append('audio', audioBlob, 'recording.webm');
    }

    try {
      await createStory(data);
      navigate('/success-stories');
    } catch (err) {
      console.error("Failed to submit story:", err);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFBFC] font-poppins pt-14 pb-16">
      
      {/* HEADER SECTION */}
      <div className="bg-[#0B1930] w-full py-16 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[40%] h-full bg-[#CC1747] opacity-10 skew-x-[-15deg] transform translate-x-10" />
        <div className="absolute bottom-[-20%] left-[-5%] w-[30%] h-[150%] bg-[#CC1747] opacity-5 rounded-full blur-3xl" />
        
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <span className="text-[#CC1747] font-semibold tracking-widest text-xs uppercase mb-3 block">
            Inspire Others
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
            Share Your <span className="text-[#CC1747]">Success Story</span>
          </h1>
          <p className="text-[#98A2B3] text-sm md:text-base max-w-2xl mx-auto font-light">
            Congratulations on securing your new role! Your journey is an inspiration to our community. 
            Fill out the form below to share how Avenue Impact helped you transform your career.
          </p>
        </div>
      </div>

      {/* FORM SECTION */}
      <div className="max-w-5xl mx-auto px-6 -mt-8 relative z-20">
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
          
          <div className="flex flex-col md:flex-row">
            
            {/* Left Sidebar / Progress */}
            <div className="hidden md:block w-1/3 bg-gray-50 border-r border-gray-100 p-10">
              <h3 className="text-lg font-bold text-[#23314A] mb-6">What to expect</h3>
              
              <div className="space-y-8 relative before:absolute before:inset-0 before:ml-[15px] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-200 before:to-transparent">
                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full border-2 border-[#CC1747] bg-white text-[#CC1747] shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                    <CheckCircle2 size={16} />
                  </div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-gray-200 bg-white shadow-sm">
                    <h4 className="text-sm font-semibold text-[#23314A]">Basic Info</h4>
                    <p className="text-xs text-gray-500 mt-1">Tell us who you are</p>
                  </div>
                </div>

                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full border-2 border-gray-200 bg-white text-gray-400 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                    <div className="w-2.5 h-2.5 bg-gray-300 rounded-full" />
                  </div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-gray-100 bg-gray-50">
                    <h4 className="text-sm font-semibold text-gray-400">Career Update</h4>
                    <p className="text-xs text-gray-400 mt-1">Where are you now?</p>
                  </div>
                </div>

                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full border-2 border-gray-200 bg-white text-gray-400 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                    <div className="w-2.5 h-2.5 bg-gray-300 rounded-full" />
                  </div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-gray-100 bg-gray-50">
                    <h4 className="text-sm font-semibold text-gray-400">Your Story</h4>
                    <p className="text-xs text-gray-400 mt-1">Share the details</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Form Area */}
            <div className="w-full md:w-2/3 p-8 md:p-12">
              <form onSubmit={handleSubmit} className="space-y-8">
                
                {/* 1. Profile Image Upload */}
                <div>
                  <label className="block text-sm font-semibold text-[#23314A] mb-4">
                    Profile Photo <span className="text-gray-400 font-normal">(Optional)</span>
                  </label>
                  <div className="flex items-center gap-6">
                    <div className="relative group">
                      <div className="w-24 h-24 rounded-full border-2 border-dashed border-gray-300 bg-gray-50 flex items-center justify-center overflow-hidden transition-all group-hover:border-[#CC1747] group-hover:bg-[#CC1747]/5">
                        {avatarPreview ? (
                          <img src={avatarPreview} alt="Preview" className="w-full h-full object-cover" />
                        ) : (
                          <User size={32} className="text-gray-400 group-hover:text-[#CC1747]" />
                        )}
                      </div>
                      <label htmlFor="avatar-upload" className="absolute bottom-0 right-0 w-8 h-8 bg-[#CC1747] rounded-full flex items-center justify-center text-white cursor-pointer shadow-lg hover:bg-[#a10f36] transition-colors">
                        <Camera size={14} />
                      </label>
                      <input 
                        id="avatar-upload" 
                        type="file" 
                        accept="image/*" 
                        className="hidden" 
                        onChange={handleImageChange}
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-[#23314A]">Upload an avatar</p>
                      <p className="text-xs text-gray-500 mt-1">Recommended size: 400x400px. Max size: 5MB.</p>
                      <label htmlFor="avatar-upload" className="inline-block mt-3 px-4 py-2 bg-white border border-gray-200 text-[#23314A] text-xs font-semibold rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                        Choose Image
                      </label>
                    </div>
                  </div>
                </div>

                <hr className="border-gray-100" />

                {/* 2. Personal & Course Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-[#23314A]">
                      Full Name <span className="text-[#CC1747]">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                        <User size={16} />
                      </div>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="John Doe"
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-[#CC1747] focus:ring-2 focus:ring-[#CC1747]/20 outline-none transition-all text-sm"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-[#23314A]">
                      Course Studied <span className="text-gray-400 font-normal">(Optional)</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                        <GraduationCap size={16} />
                      </div>
                      <select
                        name="course"
                        value={formData.course}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-[#CC1747] focus:ring-2 focus:ring-[#CC1747]/20 outline-none transition-all text-sm appearance-none"
                      >
                        <option value="">Select your course (optional)</option>
                        <option value="Business Analysis">Business Analysis</option>
                        <option value="Data Analytics">Data Analytics</option>
                        <option value="Cloud Computing">Cloud Computing</option>
                        <option value="Project Management">Project Management</option>
                        <option value="General / Career Switcher">General / Career Switcher</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* 3. Job Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-[#23314A]">
                      Job Title <span className="text-[#CC1747]">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                        <Briefcase size={16} />
                      </div>
                      <input
                        type="text"
                        name="jobTitle"
                        value={formData.jobTitle}
                        onChange={handleInputChange}
                        placeholder="e.g. Senior Data Analyst"
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-[#CC1747] focus:ring-2 focus:ring-[#CC1747]/20 outline-none transition-all text-sm"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-[#23314A]">
                      Industry <span className="text-gray-400 font-normal">(Optional)</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                        <Building2 size={16} />
                      </div>
                      <input
                        type="text"
                        name="industry"
                        value={formData.industry}
                        onChange={handleInputChange}
                        placeholder="e.g. Finance, Healthcare"
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-[#CC1747] focus:ring-2 focus:ring-[#CC1747]/20 outline-none transition-all text-sm"
                      />
                    </div>
                  </div>
                </div>

                <hr className="border-gray-100" />

                {/* 4. The Story */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-[#23314A]">
                    Your Success Story <span className="text-[#CC1747]">*</span>
                  </label>
                  <p className="text-xs text-gray-500 mb-2">Tell us about your background, your experience with Avenue Impact, and how it helped you land your role.</p>
                  <textarea
                    name="story"
                    value={formData.story}
                    onChange={handleInputChange}
                    placeholder="I started my journey when..."
                    rows="5"
                    className="w-full p-4 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-[#CC1747] focus:ring-2 focus:ring-[#CC1747]/20 outline-none transition-all text-sm resize-none"
                    required
                  ></textarea>
                </div>

                {/* 5. Audio Recording */}
                <div className="bg-[#FAFBFC] border border-gray-100 rounded-2xl p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="text-sm font-semibold text-[#23314A] flex items-center gap-2">
                        <Mic size={16} className="text-[#CC1747]" />
                        Record Audio Story <span className="text-xs font-normal text-gray-400 px-2 py-0.5 bg-gray-100 rounded-md">Optional</span>
                      </h4>
                      <p className="text-xs text-gray-500 mt-1">Want to share your story in your own words? Record a short audio clip.</p>
                    </div>
                  </div>

                  {!audioBlob ? (
                    <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-gray-200 rounded-xl bg-white">
                      <button 
                        type="button"
                        onClick={toggleRecording}
                        className={`w-16 h-16 rounded-full flex items-center justify-center transition-all shadow-lg ${
                          isRecording 
                            ? "bg-red-50 text-red-500 animate-pulse border border-red-200" 
                            : "bg-[#CC1747] text-white hover:bg-[#a10f36] hover:scale-105 active:scale-95"
                        }`}
                      >
                        {isRecording ? <Square size={24} fill="currentColor" /> : <Mic size={24} />}
                      </button>
                      
                      {isRecording && (
                        <div className="mt-4 flex flex-col items-center">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                            <span className="text-sm font-bold text-red-500 tracking-widest">{formatTime(recordingTime)}</span>
                          </div>
                          <p className="text-xs text-gray-400 mt-2">Tap square to stop</p>
                        </div>
                      )}
                      
                      {!isRecording && (
                        <p className="text-sm font-medium text-[#23314A] mt-4">Tap to start recording</p>
                      )}
                    </div>
                  ) : (
                    <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-xl shadow-sm">
                      <div className="flex items-center gap-4 flex-1">
                        <button 
                          type="button"
                          onClick={toggleAudioPlay}
                          className="w-10 h-10 rounded-full bg-[#FFEBF0] text-[#CC1747] flex items-center justify-center hover:bg-[#CC1747] hover:text-white transition-colors"
                        >
                          {isPlaying ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" className="ml-1" />}
                        </button>
                        <div className="flex-1">
                          <p className="text-xs font-semibold text-[#23314A]">Voice Note Recorded</p>
                          <span className="text-[10px] text-gray-400 font-medium">{formatTime(recordingTime)}</span>
                        </div>
                      </div>
                      <button 
                        type="button"
                        onClick={deleteRecording}
                        className="ml-6 p-2 text-gray-400 hover:text-red-500 transition-colors"
                        title="Delete recording"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  )}
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <button 
                    type="submit"
                    disabled={isPending}
                    className="w-full py-4 rounded-xl bg-[#0B1930] hover:bg-[#1E2E4A] text-white font-semibold text-lg flex items-center justify-center gap-2 transition-all transform hover:-translate-y-1 shadow-[0_10px_20px_rgba(11,25,48,0.15)] disabled:opacity-50 disabled:cursor-not-allowed group"
                  >
                    {isPending ? (
                      <>
                        <Loader2 size={20} className="animate-spin" />
                        <span>Submitting Story...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Story</span>
                        <UploadCloud size={18} className="group-hover:animate-bounce" />
                      </>
                    )}
                  </button>
                  <p className="text-center text-xs text-gray-400 mt-4">
                    By submitting, you agree to allow Avenue Impact to feature your story on our platform.
                  </p>
                </div>

              </form>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessStoryForm;
