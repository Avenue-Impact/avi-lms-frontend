import React, { useState, useEffect } from 'react';
import { faCalendar, faCheckCircle, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const InstallmentModal = ({ isOpen, onClose, onProceed, currencySymbol, price, maxInstallments = 5, isWeekly = false }) => {
    const [duration, setDuration] = useState(maxInstallments);
    const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
    const [autoDeduct, setAutoDeduct] = useState(true);

    useEffect(() => {
        setDuration(maxInstallments);
    }, [maxInstallments]);

    if (!isOpen) return null;

    const monthlyAmount = Math.round(price / duration);
    
    const schedule = Array.from({ length: duration }).map((_, i) => {
        const d = new Date(startDate);
        if (isWeekly) {
            d.setDate(d.getDate() + 7 * i);
        } else {
            d.setMonth(d.getMonth() + i);
        }
        
        return {
            date: d.toLocaleDateString(),
            amount: monthlyAmount,
            status: i === 0 ? "current" : "upcoming",
            label: i === 0 ? "First Payment" : `Due in ${i} ${isWeekly ? 'week' : 'month'}${i > 1 ? 's' : ''}`
        };
    });

    // Generate options dynamically up to maxInstallments
    const options = Array.from({ length: maxInstallments - 1 }, (_, i) => i + 2);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 font-sans">
            <div className="relative w-full max-w-md rounded-xl bg-white p-6 shadow-2xl">
                <button 
                    onClick={onClose} 
                    className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 focus:outline-none"
                >
                    <FontAwesomeIcon icon={faTimes} className="text-xl" />
                </button>
                <h2 className="mb-6 text-xl font-semibold text-gray-800">Installment Plan Breakdown</h2>
                
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Number of Installments</label>
                    <select 
                        value={duration} 
                        onChange={e => setDuration(Number(e.target.value))} 
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-[#CC1747] focus:outline-none focus:ring-[#CC1747]"
                    >
                        {options.map(m => <option key={m} value={m}>{m} Installments ({isWeekly ? 'Weekly' : 'Monthly'})</option>)}
                    </select>
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">First Payment Date</label>
                    <input 
                        type="date" 
                        value={startDate} 
                        onChange={e => setStartDate(e.target.value)} 
                        min={new Date().toISOString().split('T')[0]} 
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-[#CC1747] focus:outline-none focus:ring-[#CC1747]" 
                    />
                </div>
                
                <div className="max-h-48 overflow-y-auto mb-4 border rounded p-2 border-gray-200">
                    {schedule.map((item, idx) => (
                        <div key={idx} className="flex justify-between items-center py-3 border-b border-gray-100 last:border-0 text-sm px-2">
                            <div className="flex items-center gap-3">
                                <FontAwesomeIcon 
                                    icon={item.status === 'current' ? faCheckCircle : faCalendar} 
                                    className={`text-lg ${item.status === 'current' ? 'text-green-500' : 'text-gray-400'}`} 
                                />
                                <div>
                                    <p className="font-medium text-gray-800">{item.date}</p>
                                    <p className="text-xs text-gray-500">{item.label}</p>
                                </div>
                            </div>
                            <div className="font-semibold text-[#CC1747]">
                                {currencySymbol}{item.amount.toLocaleString()}
                            </div>
                        </div>
                    ))}
                    <div className="flex justify-between items-center py-2 px-2 mt-2 font-bold text-gray-800 border-t border-gray-300">
                        <span>Total:</span>
                        <span>{currencySymbol}{price.toLocaleString()}</span>
                    </div>
                </div>

                <div className="mb-6 flex items-start">
                    <div className="flex items-center h-5">
                        <input 
                            type="checkbox" 
                            id="autoDeduct" 
                            checked={autoDeduct} 
                            onChange={e => setAutoDeduct(e.target.checked)} 
                            className="h-4 w-4 text-[#CC1747] focus:ring-[#CC1747] border-gray-300 rounded cursor-pointer" 
                        />
                    </div>
                    <div className="ml-3 text-sm">
                        <label htmlFor="autoDeduct" className="font-medium text-gray-700 cursor-pointer">
                            Enable automatic {isWeekly ? 'weekly' : 'monthly'} deductions
                        </label>
                        <p className="text-gray-500 text-xs mt-1">
                            If unchecked, you will need to manually pay each installment from your dashboard.
                        </p>
                    </div>
                </div>

                <button 
                    onClick={() => onProceed({ duration, startDate, autoDeduct })} 
                    className="w-full rounded bg-[#CC1747] py-3 text-sm font-semibold text-white transition hover:bg-[#B3123F]"
                >
                    Choose Payment Method
                </button>
            </div>
        </div>
    );
};

export default InstallmentModal;
