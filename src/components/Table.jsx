import React from "react";

const Table = ({ columns, data }) => {
  return (
    <div className="flex-1 flex items-center justify-center py-6 mt-[-15px] ">
      <div className="bg-white rounded-[10px] shadow-lg p-6 overflow-y-auto w-full max-w-[1500px] min-h-[500px] h-auto">
        
        <table className="w-full text-left border-collapse ">
          <thead className=" top-0 bg-white">
            <tr className="border-b border-gray-300 text-center h-[60px]">
              {columns.map((col, index) => (
                <th
                  key={index}
                  className="p-4 font-poppins font-semibold text-[16px] text-[#52BD94]"
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className="text-center h-[80px] border-b border-gray-300"
              >
                {columns.map((col, colIndex) => (
                  <td key={colIndex} className="p-3 text-[14px]">
                    {col.render ? col.render(row) : row[col.field]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
