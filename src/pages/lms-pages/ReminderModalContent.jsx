import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faClock } from '@fortawesome/free-solid-svg-icons';
import { faGoogle, faApple, faMicrosoft } from '@fortawesome/free-brands-svg-icons';

function getTodayISO() {
  const today = new Date();
  return today.toISOString().split('T')[0];
}

function getFutureTimeISO() {
  const now = new Date();
  now.setMinutes(now.getMinutes() + 30);
  return now.toTimeString().slice(0, 5);
}

function buildICS({ title, description, date, time }) {
  // date: YYYY-MM-DD, time: HH:MM
  const dt = new Date(`${date}T${time}`);
  const dtStart = dt.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  const dtEnd = new Date(dt.getTime() + 60 * 60 * 1000).toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  return `BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\nSUMMARY:${title}\nDESCRIPTION:${description}\nDTSTART:${dtStart}\nDTEND:${dtEnd}\nEND:VEVENT\nEND:VCALENDAR`;
}

const ModalContent = ({ setShowModal }) => {
  const [selectedOption, setSelectedOption] = useState('daily');
  const [selectedDay, setSelectedDay] = useState('');
  const [showAdditionalContent, setShowAdditionalContent] = useState(false);
  const [date, setDate] = useState(getTodayISO());
  const [time, setTime] = useState(getFutureTimeISO());

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  const handleDayChange = (day) => {
    setSelectedDay((prevSelectedDay) => (prevSelectedDay === day ? '' : day));
  };

  const handleNextClick = () => {
    setShowAdditionalContent(true);
  };

  const handleBackClick = () => {
    setShowAdditionalContent(false);
  };

  // Calendar event details
  const eventTitle = 'Learning Reminder';
  const eventDescription = 'Your scheduled learning reminder from Avenue Impact.';
  const eventDate = date;
  const eventTime = time;
  const icsContent = buildICS({ title: eventTitle, description: eventDescription, date: eventDate, time: eventTime });
  const icsBlob = new Blob([icsContent.replace(/\\n/g, '\r\n')], { type: 'text/calendar' });
  const icsUrl = URL.createObjectURL(icsBlob);
  const googleCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventTitle)}&details=${encodeURIComponent(eventDescription)}&dates=${eventDate.replace(/-/g, '')}T${eventTime.replace(':', '')}00Z/${eventDate.replace(/-/g, '')}T${(parseInt(eventTime.split(':')[0])+1).toString().padStart(2,'0')}${eventTime.split(':')[1]}00Z`;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg lg:p-10 p-6 relative lg:max-w-[840px] max-w-xl w-full">
        <button
          onClick={() => setShowModal(false)}
          className="absolute top-2 right-2 text-gray-600 hover:text-red-600"
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>
        <h1 className="lg:text-[28.8px] text-[20px] font-[500] mb-2">Learning reminders</h1>
        <p className="text-md font-medium mb-2">Add to calendar (Optional)</p>

        {!showAdditionalContent ? (
          <>
            <div className="flex space-x-2 mb-4">
              <button
                className={`py-2 px-4 rounded ${
                  selectedOption === 'daily' ? 'bg-[#CC1747] text-white' : 'bg-white text-[#8F8F8E] border border-[#8F8F8E]'
                }`}
                onClick={() => handleOptionChange('daily')}
              >
                Daily
              </button>
              <button
                className={`py-2 px-4 rounded ${
                  selectedOption === 'weekly' ? 'bg-[#CC1747] text-white' : 'bg-white text-[#8F8F8E] border border-[#8F8F8E]'
                }`}
                onClick={() => handleOptionChange('weekly')}
              >
                Weekly
              </button>
              <button
                className={`py-2 px-4 rounded ${
                  selectedOption === 'once' ? 'bg-[#CC1747] text-white' : 'bg-white text-[#8F8F8E] border border-[#8F8F8E]'
                }`}
                onClick={() => handleOptionChange('once')}
              >
                Once
              </button>
            </div>

            {/* Time and Date Inputs */}
            {(selectedOption === 'daily' || selectedOption === 'weekly' || selectedOption === 'once') && (
              <div className='text-[#8F8F8E]'>
                <p className="mb-2 text-black">Time</p>
                <div className="flex items-center mb-4">
                  <input
                    type="time"
                    className="border border-gray-300 rounded px-2 py-1 w-full mr-2"
                    value={time}
                    min={getFutureTimeISO()}
                    onChange={e => setTime(e.target.value)}
                  />
                </div>
                {selectedOption !== 'daily' && (
                  <>
                    <p className="mb-2 text-black">Date</p>
                    <div className="flex items-center w-full mb-4">
                      <input
                        type="date"
                        className="border border-gray-300 rounded px-2 py-1 w-full mr-2"
                        value={date}
                        min={getTodayISO()}
                        onChange={e => setDate(e.target.value)}
                      />
                    </div>
                  </>
                )}
                {selectedOption === 'weekly' && (
                  <div className="grid grid-cols-2 gap-2">
                    {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map((day) => (
                      <div
                        key={day}
                        className={`flex items-center border rounded p-2 ${
                          selectedDay === day ? 'bg-[#FFEBF0] border-red-300' : 'border-gray-300'
                        }`}
                      >
                        <input
                          type="checkbox"
                          id={day}
                          name={day}
                          className="mr-2"
                          checked={selectedDay === day}
                          onChange={() => handleDayChange(day)}
                        />
                        <label htmlFor={day}>{day}</label>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
            <button onClick={handleNextClick} className="bg-[#CC1747] text-white py-2 px-10 rounded mt-4 float-right">Next</button>
          </>
        ) : (
          <>
            <div className="flex items-center space-x-4 font-[400] mb-4">
              {/* Google Calendar */}
              <a
                href={googleCalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 py-2 px-4 bg-transparent border border-[#0078D4] text-red-400 rounded"
              >
                <span className="google-icon">
                  <FontAwesomeIcon icon={faGoogle} />
                </span>
                <span className="hidden md:inline  text-[#667185]">Add to Google Calendar</span>
                <span className="md:hidden text-black">Google</span>
              </a>
              {/* Apple Calendar (ICS) */}
              <a
                href={icsUrl}
                download="learning-reminder.ics"
                className="flex items-center space-x-2 py-2 px-4 bg-transparent text-black border border-[#0078D4] rounded"
              >
                <FontAwesomeIcon icon={faApple} />
                <span> Apple (ICS)</span>
              </a>
              {/* Outlook Calendar (ICS) */}
              <a
                href={icsUrl}
                download="learning-reminder.ics"
                className="flex items-center space-x-2 py-2 px-4 bg-transparent text-[#0078D4] border border-[#0078D4] rounded"
              >
                <FontAwesomeIcon icon={faMicrosoft} />
                <span> Outlook (ICS)</span>
              </a>
            </div>

            <p className="mb-4 text-sm text-[#667185]">
              Please follow all calendar prompts and save your progress before proceeding. 
              <span className='lg:block'> Apple and Outlook will download an ICS file; open this file to add the event to </span> your calendar.
            </p>
            <div className="flex justify-end space-x-2">
              <button onClick={handleBackClick} className="border border-gray-500 text-gray-800 py-2 px-4 rounded">Back</button>
              <button className="bg-[#CC1747] text-white py-2 px-4 rounded">Done</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ModalContent;
