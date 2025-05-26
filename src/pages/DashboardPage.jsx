import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  ArcElement,
  Title, 
  Tooltip, 
  Filler, 
  Legend 
} from 'chart.js';
import { Line, Pie } from 'react-chartjs-2';


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

export default function Dashboard() {
  const [currentMonth, setCurrentMonth] = useState("March 2025");
  
  
  const performanceData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Class A",
        data: [25, 50, 85, 60, 15, 35, 70, 45, 20, 75, 55, 40],
        borderColor: "#FF8A65",
        backgroundColor: "rgba(255, 138, 101, 0.2)",
        fill: true,
        tension: 0.4,
      },
      {
        label: "Class B",
        data: [10, 40, 90, 70, 30, 10, 60, 35, 15, 90, 75, 65],
        borderColor: "#FFD54F",
        backgroundColor: "rgba(255, 213, 79, 0.2)",
        fill: true,
        tension: 0.4,
      },
      {
        label: "July Highlight",
        data: [null, null, null, null, null, null, 70, null, null, null, null, null],
        borderColor: "transparent",
        backgroundColor: "#FF7043",
        pointBackgroundColor: "#FF7043",
        pointBorderColor: "#fff",
        pointRadius: 6,
        pointHoverRadius: 8,
        fill: false,
      },
    ]
    ,
  };

 
  const attendanceData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Dec"],
    datasets: [
      {
        label: "Attendance",
        data: [40, 65, 80, 60, 75, 85, 90, 85],
        borderColor: "#FFB74D",
        backgroundColor: "rgba(255, 183, 77, 0.2)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  
  const absenceTypeData = {
    labels: ["Unexcused", "Excused", "Sick Leave"],
    datasets: [
      {
        data: [50, 20, 30],
        backgroundColor: ["#5C6BC0", "#FFB74D", "#81C784"],
      },
    ],
  };

  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false, 
    plugins: {
      legend: { display: false },
      tooltip: {
        mode: "index",
        intersect: false,
        backgroundColor: "#fff",
        titleColor: "#000",
        bodyColor: "#000",
        borderColor: "#ddd",
        borderWidth: 1,
      },
    },
    elements: {
      point: {
        radius: 4,
        backgroundColor: "#FF8A65",
        borderWidth: 2,
        borderColor: "#fff",
        hoverRadius: 6,
      },
      line: {
        tension: 0.4,
        borderWidth: 5,
      },
    },
    scales: {
      y: {
        display: false,
        beginAtZero: true,
        max: 100,
        grid: {
          display: false,
        },
      },
      x: {
        grid: {
          color: "rgba(0, 0, 0, 0.05)",
          drawBorder: false,
        },
        ticks: {
          color: "#999",
          font: {
            weight: "bold",
          },
        },
      },
    },
  };
  
  

  const attendanceChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          callback: function(value) {
            return value + '%';
          }
        },
        grid: {
          color: "rgba(0, 0, 0, 0.05)",
        },
      },
      x: {
        grid: {
          color: "rgba(0, 0, 0, 0.05)",
        },
      },
    },
  };

  const pieChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `${context.label}: ${context.raw}%`;
          }
        }
      }
    },
  };

  
  const calendarDays = [
    { day: 31, month: "prev" },
    { day: 1 }, { day: 2, current: true }, { day: 3 }, { day: 4 }, { day: 5 }, { day: 6 },
    { day: 7 }, { day: 8 }, { day: 9 }, { day: 10 }, { day: 11, active: true }, { day: 12 }, { day: 13 },
    { day: 14, highlight: true }, { day: 15 }, { day: 16 }, { day: 17 }, { day: 18 }, { day: 19 }, { day: 20, current: true },
    { day: 21, highlight: true }, { day: 22 }, { day: 23, active: true }, { day: 24 }, { day: 25 }, { day: 26 }, { day: 27 },
    { day: 28 }, { day: 29 }, { day: 30 }, { day: 31 }, { day: 1, month: "next" }, { day: 2, month: "next" }, { day: 3, month: "next" },
  ];

  
  const recentAbsences = [
    { name: "Bengherabi amine", status: "Justified", time: "2th mid" },
    { name: "khouloud guessi", status: "unJustified", time: "2th mid" },
    { name: "Mohammed assil", status: "Unjustified", time: "3th pr" },
    { name: "aimer rihem", status: "Justified", time: "2th mid" },
  ];

  
  const recentStudents = [
    { name: "Benghrabi amine", time: "2th mid" },
    { name: "aimer rihem", time: "2th mid" },
    { name: " Mohammed assil", time: "2th mid" },
    { name: "khouloud guessi", time: "2th mid" },
  ];

 
  const messages = [
    { name: "anes mellal", message: "message...", time: "12:45 PM" },
    { name: "mansouri fatima", message: "message...", time: "12:45 PM" },
    { name: "Benghrabi amine", message: "message...", time: "12:45 PM" },
  ];

  return (
    <div className="min-h-screen bg-[#e8f5f0]">
            <div className="w-[250px] h-screen fixed left-0 top-0 bg-white shadow-md">
        <Sidebar />
      </div>

     
      <div className="flex-1 ml-[250px] p-6">
    
      <header className="p-6 left-4 flex relative  items-center">
        <h1 className="text-3xl font-bold text-[#4CAF93]">Dashboard</h1>
        
        <div className="flex pl-[480px] items-center gap-36">
          <div className="relative">
            <svg 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input 
              type="text" 
              placeholder="Search here..." 
              className="pl-10 pr-4 py-2 rounded-full w-80 focus:outline-none"
            />
          </div>
          
          <div className="bg-white absolute p-10 left-[1018px]  justify-end w-[350px] h-[150px] rounded-xl shadow-sm flex items-center gap-4">
  <button className="relative">
    <svg 
      className="h-6 w-6 text-gray-600" 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
      <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
    </svg>
    <span className="absolute -top-1 -right-1 h-2 w-2 bg-[#4CAF93] rounded-full"></span>
  </button>

  <svg 
    className="h-6 w-6 text-gray-600" 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="3"></circle>
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
  </svg>

  <div className="flex items-center gap-2">
    <div className="text-right">
      <p className="text-sm font-medium">Administration</p>
      <p className="text-xs text-gray-500">Admin</p>
    </div>
    <div className="h-10 w-10 bg-[#4CAF93] rounded-full"></div>
  </div>
</div>

        </div>
      </header>

      <div className="pl-6 pr-0 md:pl-10 flex gap-6">
      
        <div className="flex-1 mr-5 w-[950px] ">
          
          <div className="bg-white rounded-2xl p-6 mb-6 shadow-sm">
            <div className="grid grid-cols-4 gap-4">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 bg-[#4CAF93] rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Students</p>
                  <p className="text-2xl font-bold text-[#4CAF93]">125</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 bg-[#FFB74D] rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Teachers</p>
                  <p className="text-2xl font-bold text-[#FFB74D]">23</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 bg-[#3F51B5] rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Events</p>
                  <p className="text-2xl font-bold text-[#3F51B5]">6</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 bg-[#90CAF9] rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Absences Today</p>
                  <p className="text-2xl font-bold text-[#90CAF9]">12</p>
                </div>
              </div>
            </div>
          </div>

         
          <div className="bg-white rounded-2xl p-6 mb-6 shadow-sm">
            <h2 className="text-xl font-bold mb-6">School Performance</h2>
            <div className="h-64 w-full ">
              <Line data={performanceData} options={lineChartOptions} />
            </div>
          </div>

          
          <div className="grid grid-cols-2 gap-6 mb-6">
           
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">School Calendar</h2>
                <button className="flex items-center text-gray-600 gap-1">
                  {currentMonth} 
                  <svg 
                    className="h-4 w-4" 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </button>
              </div>
              
              <div className="grid grid-cols-7 gap-2 text-center">
                <div className="text-gray-500 font-medium">Sun</div>
                <div className="text-gray-500 font-medium">Mon</div>
                <div className="text-gray-500 font-medium">Tue</div>
                <div className="text-gray-500 font-medium">Wed</div>
                <div className="text-gray-500 font-medium">Thu</div>
                <div className="text-gray-500 font-medium">Fri</div>
                <div className="text-gray-500 font-medium">Sat</div>
                
                {calendarDays.map((day, index) => (
                  <div key={index} className={`h-9 w-9 flex items-center justify-center rounded-full mx-auto
                    ${day.month === "prev" || day.month === "next" ? "text-gray-300" : ""}
                    ${day.highlight ? "text-[#FF8A65]" : ""}
                    ${day.active && day.active === true ? "bg-[#3F51B5] text-white" : ""}
                    ${day.current && day.current === true ? "bg-[#4CAF93] text-white" : ""}
                  `}>
                    {day.day}
                  </div>
                ))}
              </div>
            </div>
            
         
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl font-bold mb-6">Recent Absences</h2>
              
              <div className="space-y-4">
                {recentAbsences.map((absence, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 bg-[#E0F2F1] rounded-full"></div>
                      <span className="font-medium">{absence.name}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">{absence.status}</span>
                      <span className="text-xs text-gray-500">{absence.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

         
          <div className="grid grid-cols-2 gap-6 mb-6">
           
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl font-bold mb-6">Attendance Trends</h2>
              <div className="h-48">
                <Line data={attendanceData} options={attendanceChartOptions} />
              </div>
            </div>
            
            
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl font-bold mb-6">Absences by Type</h2>
              <div className="h-48 flex justify-center">
                <div className="w-48">
                  <Pie data={absenceTypeData} options={pieChartOptions} />
                </div>
              </div>
              <div className="flex justify-center mt-4 gap-6">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-[#5C6BC0]"></div>
                  <span className="text-xs">Unexcused</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-[#FFB74D]"></div>
                  <span className="text-xs">Excused</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-[#81C784]"></div>
                  <span className="text-xs">Sick Leave</span>
                </div>
              </div>
              <div className="flex justify-center mt-2 gap-6">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold">50%</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold">20%</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold">30%</span>
                </div>
              </div>
            </div>
          </div>

          
          <div className="flex justify-center h-10 gap-2 mb-6">
           
          </div>
        </div>

        {/* Sidebar */}
       {/* Sidebar */}
<aside
  className="
    w-[350px]     
    bg-white
    rounded-2xl
    shadow-sm
    h-screen       
    sticky top-0  
    flex flex-col  
   
    p-6          
  "
>
  
  <div className="space-y-2">
    <div className="flex justify-between items-center">
      <h2 className="text-xl font-bold">Recent Students</h2>
      <button className="h-8 w-8 bg-[#4CAF93] rounded-full text-white flex items-center justify-center">
        +
      </button>
    </div>
    <ul className="space-y-4">
      {recentStudents.map((s,i) => (
        <li key={i} className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 bg-[#E0F2F1] rounded-full" />
            <div>
              <p className="font-medium">{s.name}</p>
              <p className="text-xs text-gray-500">{s.time}</p>
            </div>
          </div>
          <button className="h-8 w-8 bg-gray-100 rounded-full flex items-center justify-center">
            
          </button>
        </li>
      ))}
    </ul>
    <button className="w-full py-3 bg-[#E0F2F1] text-[#4CAF93] rounded-lg font-medium">
      View More
    </button>
  </div>

 
  <div className="space-y-3 mt-10 ">
    <h2 className="text-xl font-bold">Messages</h2>
    <ul className="space-y-4">
      {messages.map((m,i) => (
        <li key={i}>
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 bg-[#E0F2F1] rounded-full" />
              <p className="font-medium">{m.name}</p>
            </div>
            <p className="text-xs text-gray-500">{m.time}</p>
          </div>
          <p className="text-xs text-gray-500 pl-11">{m.message}</p>
          {i < messages.length - 1 && <div className="border-t pt-4 mt-4" />}
        </li>
      ))}
    </ul>
  </div>

  
</aside>

      </div>
    </div>
    </div>
  );
}