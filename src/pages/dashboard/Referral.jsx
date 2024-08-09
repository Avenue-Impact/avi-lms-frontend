import React, { useState } from 'react';
import DashButton from '../auth/ButtonDash';
import ReferralImg from '../../assets/images/image_111.png'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import Modal from '../auth/components/Modal';
import BorderCard from '@/Components/BorderCard';
import ReferralModalForm from '../lms-pages/ReferralFormModal';
import DashSelect from '../auth/components/DashSelect';




const Referral = () => {
  const [selectedOption, setSelectedOption] = useState('referral');

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert('Referral link copied to clipboard');
  };

  const [modal, setShowModal] = useState(false);

  const [reason, setReason] = useState('');
  const [goal, setGoal] = useState('');
  const [accurateInfo, setAccurateInfo] = useState(false);
  const [commitment, setCommitment] = useState(false);

  
  return (
    <div>

    {/* Dashboard Balance */}
      <div className="flex flex-col justify-center">
        <div className="flex space-x-4 ">
          <button
            className={`py-2 text-[14px] font-[500] lg:text-[16px] px-4  ${selectedOption === 'referral' ? 'border-b-2 border-[#CC1747]' : 'text-gray-500'}`}
            onClick={() => setSelectedOption('referral')}
          >
            Referral
          </button>
          <button
            className={`py-2 text-[14px] font-[500] lg:text-[16px] px-4  ${selectedOption === 'financialAid' ? 'border-b-2 border-[#CC1747]' : 'text-gray-500'}`}
            onClick={() => setSelectedOption('financialAid')}
          >
            Financial Aid
          </button>
        </div>

        <div className="py-6 rounded w-full">
            {selectedOption === 'referral' && (
              <div>
                  <div className="flex flex-wrap md:flex-nowrap text-sm justify-around">

                    <div className="w-full lg:mx-2 md:flex-1 lg:border shadow-sm border-gray-300 p-4 rounded-lg mb-4 md:mb-0 bg-[#CC1747] md:bg-transparent text-white md:text-black">
                      <p>Available balance</p>
                      <h1 className="lg:text-4xl text-3xl pt-4">£100k</h1>
                    </div>

                    <div className="flex-1 border shadow-sm border-gray-300 p-4 rounded-lg mb-4 md:mb-0">
                      <p className="text-gray-600 lg:text-sm ">Total number of referrals</p>
                      <h1 className="lg:text-4xl text-3xl pt-4">09</h1>
                    </div>

                    <div className="flex-1 border shadow-sm border-gray-300 p-4 rounded-lg mb-4 md:mb-0 mx-2">
                      <p className="text-gray-600">Total amount</p>
                      <h1 className="lg:text-4xl text-3xl pt-4">£129k</h1>
                    </div>

                    <div className="flex-1 border shadow-sm border-gray-300 p-4 rounded-lg mb-4 md:mb-0 mx-2">
                      <p className="text-gray-600">Total amount withdrawn</p>
                      <h1 className="lg:text-4xl text-3xl pt-4">£129k</h1>
                    </div>

                    <div className="md:flex-1 w-full md:w-auto">
                        <DashButton onClick={()=>setShowModal(prev=>!prev)}  className="bg-[#CC1747] text-white py-2 px-4 rounded shadow-md w-full md:w-auto">Request to withdraw</DashButton>
                    </div>
                  </div>

                  {/*  */}
                <div className='lg:border-2 lg:border-white-300 text-center my-6 lg:bg-white lg:p-6 rounded-lg'>
                      <div className="flex flex-col items-center justify-center lg:p-6 rounded-lg ">
                          <img src={ReferralImg} alt="No Courses" className="w-80 h-70 mb-4 rounded-full" />
                          <h3 className="text-2xl font-semibold text-gray-800 mb-2">Refer a Friend and Earn Promo Code!</h3>
                          <p className="text-center text-sm text-gray-600 mb-4">
                              Invite friends to join Avenue Impact and get amazing rewards for every successful referral.
                          </p>

                          <div className="flex items-center lg:my-0 my-6 p-4 pr-10 rounded-lg mt-4 bg-gray-100">
                              <div className="flex flex-col mr-2">
                                <p className="text-gray-600 text-sm">Your referral link</p>
                                <p className="text-lg font-semibold">AVIWOCXZ11</p>
                              </div>
                              <button
                                className="text-[#40B869] hover:text-[#48c674] ml-2"
                                onClick={() => copyToClipboard('AVIWOCXZ11')}
                              >
                                <FontAwesomeIcon icon={faCopy} />
                              </button>
                        </div>

                          <DashButton className="mt-2 w-full lg:w-2/5 bg-[#CC1747] text-white px-32 hover:bg-[#b30e3b]">Share link</DashButton>
                    </div>
                  </div>
              </div>
            )}

            {selectedOption === 'financialAid' && (
              
              <div >
                  <div className='lg:border-2 lg:px-24 border-white-300 my-6 lg:bg-white lg:p-6 rounded-lg'>
                        <div className="lg:flex lg:flex-col  justify-center lg:p-6 rounded-lg ">
                              <h3 className="text-xl font-semibold text-gray-800 mb-2">Make sure the information you provide is correct.</h3>

                            <div>
                                <p className=" py-1 lg:text-[16px] text-[14px] font-medium">Select Course</p>
                                <DashSelect/>
                            </div>


                          <div className="space-y-4 pt-4 text-[14px]">
                            <div>
                              <p className="text-gray-700 lg:font-medium">Reason you applied for aid</p>
                              <textarea
                                value={reason}
                                onChange={(e) => setReason(e.target.value)}
                                className="w-full border border-gray-300 rounded p-2"
                                rows="10"
                              ></textarea>
                            </div>

                            <div>
                                <p className="text-gray-700 font-medium">How will your selected course help with your goals?</p>
                                <textarea
                                  value={goal}
                                  onChange={(e) => setGoal(e.target.value)}
                                  className="w-full border border-gray-300 rounded p-2"
                                  rows="10"
                                ></textarea>
                            </div>

                            <div className="space-y-2">
                                <h2 className="text-xl font-medium">Terms and conditions</h2>
                                <div className="flex items-center">
                                  <input
                                    type="checkbox"
                                    checked={accurateInfo}
                                    onChange={(e) => setAccurateInfo(e.target.checked)}
                                    className="mr-2"
                                  />
                                  <label className="text-gray-600 ">I'm sharing accurate information on my application</label>
                              </div>

                              <div className="flex items-center">
                                  <input
                                    type="checkbox"
                                    checked={commitment}
                                    onChange={(e) => setCommitment(e.target.checked)}
                                    className="mr-2"
                                  />
                                  <label className="text-gray-600 " >I commit to finishing my Avenue course</label>
                              </div>
                              
                            </div>
                            <DashButton className="mt-2 px-32 lg:w-2/4 w-full  bg-[#CC1747] text-white hover:bg-[#b30e3b]">Submit</DashButton>
                        </div>

                      </div>
                  </div>
              </div>

            )}
          </div>


        { modal && 

            <Modal >
                <BorderCard className="bg-white">
                    <ReferralModalForm/>
                </BorderCard>  
            </Modal>

        }
          
      </div>
      


    </div>
  );
};


export default Referral;
