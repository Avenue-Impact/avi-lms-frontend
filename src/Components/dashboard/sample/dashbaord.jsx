import { useEffect, useState } from 'react';
import { Users, BookOpen, Star, MapPin, Phone, Mail } from 'lucide-react';

// Dummy data for testing
const dummyCourse = {
  id: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
  title: 'Become a Business Analyst Oct 25 Cohort',
  slug: 'business-analyst-oct-25',
  description: 'Master the skills needed to become a successful Business Analyst. Learn data analytics, business intelligence, and strategic decision-making through hands-on projects and real-world case studies. This comprehensive course covers everything from data collection and analysis to presenting insights to stakeholders, preparing you for a rewarding career in business analysis.',
  image_url: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1200',
  price: 2200,
  status: 'live',
  total_lectures: 29,
  enrolled_count: 12,
  created_at: '2024-12-19T00:00:00Z',
  updated_at: '2024-12-19T00:00:00Z',
};

const dummySchedules = [
  { id: 1, day_of_week: 'Monday', start_time: '09:00', end_time: '17:00', is_closed: false },
  { id: 2, day_of_week: 'Tuesday', start_time: '09:00', end_time: '17:00', is_closed: false },
  { id: 3, day_of_week: 'Wednesday', start_time: '09:00', end_time: '17:00', is_closed: false },
  { id: 4, day_of_week: 'Thursday', start_time: '09:00', end_time: '17:00', is_closed: false },
  { id: 5, day_of_week: 'Friday', start_time: '09:00', end_time: '17:00', is_closed: false },
  { id: 6, day_of_week: 'Saturday', start_time: '10:00', end_time: '14:00', is_closed: false },
  { id: 7, day_of_week: 'Sunday', start_time: null, end_time: null, is_closed: true }
];

const dummyModules = [
  {
    id: '1',
    course_id: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    title: 'Business Analyst Bundle',
    description: 'Complete introduction to business analysis fundamentals',
    image_url: '',
    badge: 'BONUS',
    order_index: 1,
  },
  {
    id: '2',
    course_id: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    title: 'Data Analytics and Data Management',
    description: 'Master data analysis tools and techniques',
    image_url: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=400',
    badge: '',
    order_index: 2,
  },
  {
    id: '3',
    course_id: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    title: 'Free Data Analytics Training',
    description: 'Additional practice exercises',
    image_url: '',
    badge: 'FREE',
    order_index: 3,
  },
];

const dummyRelatedCourses = [
  {
    id: 'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a22',
    title: 'Cloud Computing AWS, Azure, GCP (Bundle)',
    slug: 'cloud-computing-bundle',
    description: '',
    image_url: 'https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=800',
    price: 2000,
    status: 'live',
    total_lectures: 12,
    enrolled_count: 8,
    created_at: '2024-12-19T00:00:00Z',
    updated_at: '2024-12-19T00:00:00Z',
  },
  {
    id: 'c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a33',
    title: 'Data Analytics and Data Management Live Bootcamp Sept 2025',
    slug: 'data-analytics-sept-2025',
    description: '',
    image_url: 'https://images.pexels.com/photos/590020/pexels-photo-590020.jpeg?auto=compress&cs=tinysrgb&w=800',
    price: 2200,
    status: 'live',
    total_lectures: 45,
    enrolled_count: 15,
    created_at: '2024-12-19T00:00:00Z',
    updated_at: '2024-12-19T00:00:00Z',
  },
  {
    id: 'd0eebc99-9c0b-4ef8-bb6d-6bb9bd380a44',
    title: 'Become a Business Analyst July 25 Cohort',
    slug: 'business-analyst-july-25',
    description: '',
    image_url: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800',
    price: 2200,
    status: 'live',
    total_lectures: 24,
    enrolled_count: 20,
    created_at: '2024-12-19T00:00:00Z',
    updated_at: '2024-12-19T00:00:00Z',
  },
];

export default function SampleCourseDetailDashboard() {
  const [course, setCourse] = useState(null);
  const [schedules, setSchedules] = useState([]);
  const [modules, setModules] = useState([]);
  const [relatedCourses, setRelatedCourses] = useState([]);
  const [activeTab, setActiveTab] = useState('description');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourseData();
  }, []);

  function fetchCourseData() {
    try {
      // Simulate API call with setTimeout
      setTimeout(() => {
        setCourse(dummyCourse);
        setSchedules(dummySchedules);
        setModules(dummyModules);
        setRelatedCourses(dummyRelatedCourses);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error fetching course data:', error);
      setLoading(false);
    }
  }

  const dayOrder = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-slate-600">Course not found</p>
      </div>
    );
  }

  const sortedSchedules = [...schedules].sort((a, b) =>
    dayOrder.indexOf(a.day_of_week) - dayOrder.indexOf(b.day_of_week)
  );

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 flex items-center gap-2 text-sm text-slate-600">
          <BookOpen className="w-4 h-4 text-blue-600" />
          <span className="font-medium">Live Course</span>
          <span className="mx-2">•</span>
          <span>Admin</span>
          <button className="ml-auto flex items-center gap-2 text-blue-600 hover:text-blue-700 transition">
            <Star className="w-4 h-4" />
            <span className="font-medium">Add to Favourites</span>
          </button>
        </div>

        <h1 className="text-4xl font-bold text-slate-900 mb-8 leading-tight">{course.title}</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
              <div className="grid sm:grid-cols-2 gap-4 mb-6">
                <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
                  <Users className="w-8 h-8 text-blue-600" />
                  <div>
                    <div className="text-sm text-slate-600">Enrolled</div>
                    <div className="text-xl font-bold text-slate-900">{course.enrolled_count} students</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg">
                  <BookOpen className="w-8 h-8 text-green-600" />
                  <div>
                    <div className="text-sm text-slate-600">Lectures</div>
                    <div className="text-xl font-bold text-slate-900">{course.total_lectures}</div>
                  </div>
                </div>
              </div>

              <div className="relative aspect-video rounded-lg overflow-hidden mb-6">
                <img
                  src={course.image_url}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/90 to-pink-600/90 flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="w-32 h-32 border-8 border-white rounded-full flex items-center justify-center mb-4 mx-auto">
                      <div className="text-3xl font-black">BUSINESS<br/>ANALYSIS<br/>CLASS</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <a
                  href="https://zoom.us/join"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 p-1 transition-all duration-300 hover:from-blue-700 hover:to-blue-800 hover:shadow-lg hover:shadow-blue-500/25"
                >
                  <div className="flex h-full items-center justify-center rounded-lg bg-white/10 backdrop-blur-sm px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20">
                        <svg className="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M15.5 9.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0ZM8.5 9.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0ZM12 16a4 4 0 0 0 4-4h-1a3 3 0 0 1-3 3 3 3 0 0 1-3-3H8a4 4 0 0 0 4 4Z"/>
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2Zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8Z"/>
                        </svg>
                      </div>
                      <div className="text-left">
                        <h3 className="text-lg font-semibold text-white">Join Live Class</h3>
                        <p className="text-sm text-blue-100">Enter Zoom meeting room</p>
                      </div>
                    </div>
                  </div>
                </a>

                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-red-600 to-red-700 p-1 transition-all duration-300 hover:from-red-700 hover:to-red-800 hover:shadow-lg hover:shadow-red-500/25"
                >
                  <div className="flex h-full items-center justify-center rounded-lg bg-white/10 backdrop-blur-sm px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20">
                        <svg className="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                        </svg>
                      </div>
                      <div className="text-left">
                        <h3 className="text-lg font-semibold text-white">Watch Recorded Videos</h3>
                        <p className="text-sm text-red-100">Access course recordings</p>
                      </div>
                    </div>
                  </div>
                </a>
              </div>

              <div className="border-b border-slate-200 mb-6">
                <div className="flex gap-8">
                  <button
                    onClick={() => setActiveTab('description')}
                    className={`pb-3 font-medium transition relative ${
                      activeTab === 'description'
                        ? 'text-blue-600 border-b-2 border-blue-600'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Description
                  </button>
                  <button
                    onClick={() => setActiveTab('reviews')}
                    className={`pb-3 font-medium transition relative ${
                      activeTab === 'reviews'
                        ? 'text-blue-600 border-b-2 border-blue-600'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Reviews
                  </button>
                </div>
              </div>

              {activeTab === 'description' ? (
                <div className="prose max-w-none">
                  <p className="text-slate-700 leading-relaxed">{course.description}</p>
                </div>
              ) : (
                <div className="py-8 text-center">
                  <p className="text-slate-500 mb-4">Be the first to add a review.</p>
                  <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition font-medium">
                    ADD REVIEW
                  </button>
                </div>
              )}
            </div>

            {relatedCourses.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Related Courses</h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {relatedCourses.map((relatedCourse) => (
                    <div key={relatedCourse.id} className="border border-slate-200 rounded-lg overflow-hidden hover:shadow-lg transition group cursor-pointer">
                      <div className="aspect-video bg-gradient-to-br from-slate-800 to-blue-900 overflow-hidden">
                        <img
                          src={relatedCourse.image_url}
                          alt={relatedCourse.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-slate-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition">
                          {relatedCourse.title}
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-slate-600 mb-3">
                          <BookOpen className="w-4 h-4" />
                          <span>{relatedCourse.total_lectures} Lectures</span>
                        </div>
                        <div className="text-2xl font-bold text-blue-600">
                          £{relatedCourse.price.toLocaleString()}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 sticky top-4">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Working Hours</h3>
              <div className="space-y-2">
                {sortedSchedules.map((schedule) => (
                  <div key={schedule.id} className="flex justify-between items-center py-2 border-b border-slate-100 last:border-0">
                    <span className="text-slate-700 font-medium">{schedule.day_of_week}</span>
                    {schedule.is_closed ? (
                      <span className="bg-red-100 text-red-700 px-3 py-1 rounded text-sm font-medium">CLOSED</span>
                    ) : (
                      <span className="text-slate-600 text-sm">{schedule.start_time} - {schedule.end_time}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {modules.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-4">Course Modules</h3>
                <div className="space-y-3">
                  {modules.map((module) => (
                    <div key={module.id} className="flex items-start gap-3 p-3 border border-slate-200 rounded-lg hover:border-blue-300 transition cursor-pointer">
                      {module.image_url && (
                        <img
                          src={module.image_url}
                          alt={module.title}
                          className="w-16 h-16 rounded object-cover"
                        />
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <h4 className="font-semibold text-slate-900 text-sm line-clamp-2">{module.title}</h4>
                          {module.badge && (
                            <span className={`px-2 py-1 rounded text-xs font-bold whitespace-nowrap ${
                              module.badge === 'BONUS' ? 'bg-blue-100 text-blue-700' :
                              module.badge === 'FREE' ? 'bg-green-100 text-green-700' :
                              'bg-slate-100 text-slate-700'
                            }`}>
                              {module.badge}
                            </span>
                          )}
                        </div>
                        {module.description && (
                          <p className="text-xs text-slate-600 line-clamp-2">{module.description}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Contact</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3 text-slate-700">
                  <MapPin className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">London</span>
                </div>
                <div className="flex items-start gap-3 text-slate-700">
                  <Phone className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <a href="tel:+448000564072" className="text-sm hover:text-blue-600 transition">Tel: +448000564072</a>
                </div>
                <div className="flex items-start gap-3 text-slate-700">
                  <Mail className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Fax: +448000564072</span>
                </div>
                <div className="flex items-start gap-3 text-slate-700">
                  <Mail className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <a href="mailto:info@avenueimpact.co.uk" className="text-sm hover:text-blue-600 transition break-all">
                    info@avenueimpact.co.uk
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
