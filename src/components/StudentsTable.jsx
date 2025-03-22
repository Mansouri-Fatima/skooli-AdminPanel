import Button from "../components/Button";
const StudentsTable = ({students}) => {
    
      
    return (
        <div className="flex-1 bg-white rounded-[10px] shadow-lg p-4 overflow-y-auto">
        <table className="w-full text-left h-full">
          <thead className=" top-0 bg-white">
            <tr className="border-b text-center">
              <th className="p-3 font-poppins font-semibold text-[14px] text-[#52BD94]">Photo</th>
              <th className="p-3 font-poppins font-semibold text-[14px] text-[#52BD94]">First Name</th>
              <th className="p-3 font-poppins font-semibold text-[14px] text-[#52BD94]">Last Name</th>
              <th className="p-3 font-poppins font-semibold text-[14px] text-[#52BD94]">Parent Name</th>
              <th className="p-3 font-poppins font-semibold text-[14px] text-[#52BD94]">Level</th>
              <th className="p-3 font-poppins font-semibold text-[14px] text-[#52BD94]">Email</th>
              <th className="p-3 font-poppins font-semibold text-[14px] text-[#52BD94]">Action</th>
            </tr>
          </thead>
        <tbody className="divide-y divide-gray-300 space-y-4">
          {students.map((student, index) => (
            <tr key={index} className="text-center h-[10vh]">
              <td className="p-3">
                <img 
                  src="/default-user.png"
                  alt="User" 
                  className="w-10 h-10 rounded-full object-cover mx-auto"
                />
              </td>
              <td className="p-3">{student.firstName}</td>
              <td className="p-3">{student.lastName}</td>
              <td className="p-3">{student.parent}</td>
              <td className="p-3">{student.level}</td>
              <td className="p-3">{student.email}</td>
              <td className="p-3 flex gap-2 justify-center my-5">
              <Button primary rounded >Accept</Button>
              {/* <button className="bg-[#52BD94] text-white px-3 py-1 rounded-md">Disable</button> 
                    <button className="text-[#52BD94] px-3 py-1">Refuse</button>*/}
                    <Button secondary rounded>Refuse</Button>
                  </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    );
  };
  
  export default StudentsTable;
  