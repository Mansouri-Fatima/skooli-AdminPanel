import React, { useState } from "react";
import ArrowIcon from "../assets/icons/arrow.png";

export default function FilterMenu({ selectedCategory, setSelectedCategory, levels, groups, subjects, teachers, handleFilterChange }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      {/* Sélecteur de catégorie */}
      <div className="relative mt-4 inline-block ml-2">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 text-[24px] font-poppins font-medium leading-none"
        >
          {selectedCategory}
          <img src={ArrowIcon} alt="ArrowIcon" className={`w-2 h-2 transition-transform ${isOpen ? "rotate-180" : "rotate-0"}`} />
        </button>
        {isOpen && (
          <div className="absolute mt-2 bg-white shadow-lg rounded-lg w-40">
            {["Students", "Teachers"].map((category) => (
              <button
                key={category}
                onClick={() => {
                  setSelectedCategory(category);
                  setIsOpen(false);
                }}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                {category}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Filtres  */}
      <div className="mt-4 grid grid-cols-3 gap-6">
        
        {/* Filtre commun : Level */}
        <div>
          <label className="block text-[17px] font-bold text-primary mb-2">Level :</label>
          <select className="border-2 border-[#52BD94] p-2 rounded-lg bg-white w-[300px] h-[49px]" onChange={(e) => handleFilterChange("level", e.target.value)}>
            <option value="">Select Level</option>
            {levels.map((level) => (
              <option key={level} value={level}>{level}</option>
            ))}
          </select>
        </div>

        {selectedCategory === "Students" ? (
          <>
            {/* Grade */}
            <div>
              <label className="block text-[17px] font-bold text-primary mb-2">Grade :</label>
              <select className="border-2 border-[#52BD94] p-2 rounded-lg bg-white w-[300px] h-[49px]" onChange={(e) => handleFilterChange("grade", e.target.value)}>
                <option value="">Select Grade</option>
                {[1, 2, 3, 4].map((grade) => (
                  <option key={grade} value={grade}>{grade}</option>
                ))}
              </select>
            </div>

            {/* Group */}
            <div>
              <label className="block text-[17px] font-bold text-primary mb-2">Group :</label>
              <select className="border-2 border-[#52BD94] p-2 rounded-lg bg-white w-[300px] h-[49px]" onChange={(e) => handleFilterChange("group", e.target.value)}>
                <option value="">Select Group</option>
                {groups.map((group) => (
                  <option key={group} value={group}>{group}</option>
                ))}
              </select>
            </div>
          </>
        ) : (
          <>
            {/* Teacher Name */}
            <div>
              <label className="block text-[17px] font-bold text-primary mb-2">Teacher's name :</label>
              <select className="border-2 border-[#52BD94] p-2 rounded-lg bg-white w-[300px] h-[49px]" onChange={(e) => handleFilterChange("teacher", e.target.value)}>
                <option value="">Select Teacher</option>
                {teachers.map((name) => (
                  <option key={name} value={name}>{name}</option>
                ))}
              </select>
            </div>

            {/* Grade*/}
            <div>
            
              <label className="block text-[17px] font-bold text-primary mb-2">Grade :</label>
              <select className="border-2 border-[#52BD94] p-2 rounded-lg bg-white w-[300px] h-[49px]" onChange={(e) => handleFilterChange("grade", e.target.value)}>
                <option value="">Select Grade</option>
                {[1, 2, 3, 4].map((grade) => (
                  <option key={grade} value={grade}>{grade}</option>
                ))}
              </select>
            
            </div>
          </>
        )}
      </div>
    </div>
  );
}
