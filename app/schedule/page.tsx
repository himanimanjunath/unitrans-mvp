import { Calendar, Plus, ChevronDown, Clock, Check, X } from 'lucide-react';
import { useState } from 'react';

// AddRouteModal Component
function AddRouteModal({ onClose }: { onClose: () => void }) {
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [showStopsPicker, setShowStopsPicker] = useState(false);
  const [selectedTime, setSelectedTime] = useState({ hour: 12, minute: 0, period: 'PM' });
  const [selectedStops, setSelectedStops] = useState('2 stops before');
  const [selectedBusLine, setSelectedBusLine] = useState('');
  
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const hours = Array.from({ length: 12 }, (_, i) => i + 1);
  const minutes = Array.from({ length: 60 }, (_, i) => i);
  const periods = ['AM', 'PM'];
  const stopsOptions = ['1 stop before', '2 stops before', '3 stops before', '4 stops before', '5 stops before'];
  
  const toggleDay = (day: string) => {
    setSelectedDays(prev => 
      prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
    );
  };

  const formatTime = () => {
    return `${selectedTime.hour}:${selectedTime.minute.toString().padStart(2, '0')} ${selectedTime.period}`;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-5 h-5" />
        </button>
        
        {/* Modal Header */}
        <h2 className="text-2xl font-semibold text-black mb-2">
          Add Scheduled Route
        </h2>
        <p className="text-gray-600 text-base mb-6">
          Set up a regular bus route for automatic notifications on specific days
        </p>

        {/* Bus Line */}
        <label className="block text-sm text-black font-semibold mb-2">Bus Line</label>
        <div className="relative mb-6">
          <select 
            value={selectedBusLine}
            onChange={(e) => setSelectedBusLine(e.target.value)}
            className="w-full border-2 border-gray-300 rounded-md px-4 py-2 pr-10 text-gray-600 text-sm appearance-none bg-white"
          >
            <option value="">Select a line</option>
            <option value="Line 1">Line 1</option>
            <option value="Line 2">Line 2</option>
            <option value="Line 3">Line 3</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600 pointer-events-none" />
        </div>

        {/* Your Stop - only shows when bus line is selected */}
        {selectedBusLine && (
          <>
            <label className="block text-sm text-black font-semibold mb-2">Your Stop</label>
            <div className="relative mb-6">
              <select className="w-full border-2 border-gray-300 rounded-md px-4 py-2 pr-10 text-gray-600 text-sm appearance-none bg-white">
                <option>Select a stop</option>
                <option>Main Street</option>
                <option>City Center</option>
                <option>University Ave</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600 pointer-events-none" />
            </div>
          </>
        )}

        {/* Days of the Week */}
        <label className="block text-sm text-black font-semibold mb-2">Days of the Week</label>
        <div className="flex gap-2 mb-6">
          {days.map(day => (
            <button
              key={day}
              onClick={() => toggleDay(day)}
              className={`flex-1 border-2 rounded-md py-2 text-sm font-semibold transition-colors ${
                selectedDays.includes(day)
                  ? 'border-blue-500 bg-blue-50 text-blue-600'
                  : 'border-gray-300 text-black'
              }`}
            >
              {day}
            </button>
          ))}
        </div>

        {/* Usual Time */}
        <label className="block text-sm text-black font-semibold mb-2">Usual Time</label>
        <div className="relative mb-6">
          <button
            onClick={() => setShowTimePicker(!showTimePicker)}
            className="w-full border-2 border-gray-300 rounded-md px-4 py-2 pr-10 text-gray-600 text-sm text-left bg-white"
          >
            {formatTime()}
          </button>
          <Clock className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600 pointer-events-none" />
          
          {showTimePicker && (
            <div className="absolute z-10 bottom-full mb-2 w-full bg-white border-2 border-gray-300 rounded-lg shadow-lg p-4">
              <div className="flex gap-2 justify-center">
                {/* Hour Picker */}
                <div className="flex-1 h-40 overflow-y-scroll border border-gray-200 rounded">
                  {hours.map(hour => (
                    <div
                      key={hour}
                      onClick={() => setSelectedTime(prev => ({ ...prev, hour }))}
                      className={`text-center py-2 cursor-pointer ${
                        selectedTime.hour === hour ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'
                      }`}
                    >
                      {hour}
                    </div>
                  ))}
                </div>
                
                {/* Minute Picker */}
                <div className="flex-1 h-40 overflow-y-scroll border border-gray-200 rounded">
                  {minutes.map(minute => (
                    <div
                      key={minute}
                      onClick={() => setSelectedTime(prev => ({ ...prev, minute }))}
                      className={`text-center py-2 cursor-pointer ${
                        selectedTime.minute === minute ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'
                      }`}
                    >
                      {minute.toString().padStart(2, '0')}
                    </div>
                  ))}
                </div>
                
                {/* Period Picker */}
                <div className="flex-1 h-40 overflow-y-scroll border border-gray-200 rounded">
                  {periods.map(period => (
                    <div
                      key={period}
                      onClick={() => setSelectedTime(prev => ({ ...prev, period }))}
                      className={`text-center py-2 cursor-pointer ${
                        selectedTime.period === period ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'
                      }`}
                    >
                      {period}
                    </div>
                  ))}
                </div>
              </div>
              <button
                onClick={() => setShowTimePicker(false)}
                className="w-full mt-3 bg-blue-500 text-white py-2 rounded-md text-sm"
              >
                Done
              </button>
            </div>
          )}
        </div>

        {/* Notify Stops Before */}
        <label className="block text-sm text-black font-semibold mb-2">Notify me this many stops before:</label>
        <div className="relative mb-6">
          <button
            onClick={() => setShowStopsPicker(!showStopsPicker)}
            className="w-full border-2 border-gray-300 rounded-md px-4 py-2 pr-10 text-gray-600 text-sm text-left bg-white"
          >
            {selectedStops}
          </button>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600 pointer-events-none" />
          
          {showStopsPicker && (
            <div className="absolute z-10 bottom-full mb-2 w-full bg-white border-2 border-gray-300 rounded-lg shadow-lg overflow-hidden">
              {stopsOptions.map(option => (
                <div
                  key={option}
                  onClick={() => {
                    setSelectedStops(option);
                    setShowStopsPicker(false);
                  }}
                  className="px-4 py-3 hover:bg-gray-100 cursor-pointer flex items-center justify-between text-sm text-gray-600"
                >
                  <span>{option}</span>
                  {selectedStops === option && <Check className="w-4 h-4 text-blue-500" />}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Add Schedule Button */}
        <button className="w-full bg-black text-white py-3 rounded-md text-sm font-medium hover:bg-gray-800 transition-colors">
          Add Schedule
        </button>
      </div>
    </div>
  );
}

// Main SchedulePage Component
export default function SchedulePage() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header Box */}
      <div className="border-2 border-gray-300 rounded-lg p-6 mb-6">
        <h1 className="text-xl font-semibold text-black mb-2">
          Your Weekly Bus Schedule
        </h1>
        <p className="text-gray-600 text-base">
          Set up your regular bus routes and get automatic notifications. Perfect for maintaining routines.
        </p>
      </div>

      {/* Weekly Schedule Box */}
      <div className="border-2 border-gray-300 rounded-lg p-6">
        {/* Top Bar */}
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-2">
            <Calendar className="w-6 h-6 text-blue-500" strokeWidth={2} />
            <h2 className="text-base text-black">Weekly Schedule</h2>
          </div>
          <button 
            onClick={() => setShowModal(true)}
            className="bg-black text-white px-3 py-2 rounded-md text-sm font-medium flex items-center gap-2 hover:bg-gray-800 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Route
          </button>
        </div>

        {/* Empty State */}
        <div className="flex flex-col items-center justify-center py-12">
          <Calendar className="w-14 h-14 text-gray-400 mb-4" />
          <p className="text-gray-500 text-base mb-1">
            No scheduled routes yet
          </p>
          <p className="text-gray-500 text-sm">
            Add your regular bus routes for automatic notifications
          </p>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <AddRouteModal onClose={() => setShowModal(false)} />
      )}
    </div>
  );
}
  );
}

