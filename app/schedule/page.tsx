import { Calendar, Plus } from 'lucide-react';

export default function SchedulePage() {
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
          <button className="bg-black text-white px-3 py-2 rounded-md text-sm font-medium flex items-center gap-2 hover:bg-gray-800 transition-colors">
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
    </div>
  );
}
