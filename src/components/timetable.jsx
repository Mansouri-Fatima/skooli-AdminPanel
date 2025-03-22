import React from "react";

export default function TimeTableGrid({ times, selectedDay, selectedSubjects, handleSubjectSelect, selectedCategory, subjects, groups }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
      {times[selectedDay]?.map((time) => (
        <div key={time} className="border border-[#52BD94] p-4 rounded-xl bg-white text-black space-y-1">
          <h2 className="font-medium text-[16px]">{time}</h2>
          {(selectedCategory === "Students" ? subjects : groups).map((item) => (
            <div key={item} className="flex items-center gap-2">
              <input
                type="radio"
                name={time}
                checked={selectedSubjects[time] === item}
                onChange={() => handleSubjectSelect(time, item)}
                className="w-4 h-4 border-2 border-[#52BD94] appearance-none rounded-none checked:bg-[#52BD94]"
              />
              <label>{item}</label>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
