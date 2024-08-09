import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faClock } from '@fortawesome/free-solid-svg-icons';
import { faGoogle, faApple, faMicrosoft } from '@fortawesome/free-brands-svg-icons';

const ModalContent = ({ setShowModal }) => {
  const [selectedOption, setSelectedOption] = useState('daily');
  const [selectedDay, setSelectedDay] = useState('');
  const [showAdditionalContent, setShowAdditionalContent] = useState(false);

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

            {selectedOption === 'daily' && (
              <div className='text-[#8F8F8E]'>
                <p className="mb-2 text-black">Time</p>
                <div className="flex items-center mb-4">
                  <input type="time" className="border border-gray-300 rounded px-2 py-1 w-full mr-2" />
                  
                </div>
              </div>
            )}

            {selectedOption === 'weekly' && (
              <div className='text-[#8F8F8E]'>
                <p className="mb-2 text-black">Time</p>
                <div className="flex items-center mb-4">
                  <input type="time" className="border border-gray-300 rounded px-2 py-1 w-full mr-2" />
                  
                </div>
                <p className="mb-2 text-black">Date</p>
                <div className="grid grid-cols-2 gap-2">
                  {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((day) => (
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
              </div>
            )}

            {selectedOption === 'once' && (
              <div className="flex flex-col space-y-4 text-[#8F8F8E]">
                <div className="flex items-center ">
                  <p className="mr-2 text-black">Time</p>
                  <div className="flex items-center w-full">
                  <input 
                    type="time" 
                    className="border border-gray-300 rounded-lg px-4 py-2 w-full mr-2 text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>

                </div>
                <div className="flex items-center">
                  <p className="mr-2 text-black">Date</p>
                  <div className="flex items-center w-full">
                    <input type="date" className="border border-gray-300 rounded px-2 py-1 w-full mr-2" />
                    
                  </div>
                </div>
              </div>
            )}
            <button onClick={handleNextClick} className="bg-[#CC1747] text-white py-2 px-4 rounded mt-4 float-right">Next</button>
          </>
        ) : (
          <>
            <div className="flex items-center space-x-4 mb-4">
               <button className="flex items-center space-x-2 py-2 px-4 bg-blue-500 text-white rounded">
                <FontAwesomeIcon icon={faGoogle} />
                <span className="hidden md:inline">Sign in with Google</span>
                <span className="md:hidden">Google</span>
              </button>
              <button className="flex items-center space-x-2 py-2 px-4 bg-black text-white rounded">
                <FontAwesomeIcon icon={faApple} />
                <span> Apple</span>
              </button>
              <button className="flex items-center space-x-2 py-2 px-4 bg-blue-700 text-white rounded">
                <FontAwesomeIcon icon={faMicrosoft} />
                <span> Outlook</span>
              </button>
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
