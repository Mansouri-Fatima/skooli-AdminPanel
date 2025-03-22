import React from "react";

export default function DaySelector({ days, selectedDay, setSelectedDay }) {
  return (
    <div className="flex gap-4 mt-4 border-b pb-2 space-x-6">
      {days.map((day) => (
        <button
          key={day}
          className={`pb-2 ${selectedDay === day ? "border-b-2 border-[#52BD94] text-[23px] font-medium" : "text-gray-500"}`}
          onClick={() => setSelectedDay(day)}
        >
          {day}
        </button>
      ))}
    </div>
  );
}
