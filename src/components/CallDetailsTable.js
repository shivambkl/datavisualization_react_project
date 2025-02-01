import React, { useState } from 'react';

const CallDetailsTable = ({ callDetails }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 10;

    // Calculate the index of the first and last rows to display on the current page
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = callDetails.slice(indexOfFirstRow, indexOfLastRow);

    // Change page
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
// shivam S
    // Calculate total pages
    const totalPages = Math.ceil(callDetails.length / rowsPerPage);

    return (
        <div style={{  width:'100%   ',backgroundColor: 'white' }}>
            <table className="table-auto border-collapse border border-gray-400 w-full text-left" style={{height:'150px'}}>
                <thead style={{ backgroundColor: '#2cade6', width:'800px   ' }}>
                    <tr>
                        <th className="border border-gray-400 p-2" style={{  width:'150px   ' }}>Call ID</th>
                        <th className="border border-gray-400 p-2"style={{  width:'350px   ' }}>Account Name</th>
                        <th className="border border-gray-400 p-2" style={{  width:'350px   ' }}>Call Date</th>
                        <th className="border border-gray-400 p-2" style={{  width:'350px   ' }}>Call Status</th>
                    </tr>
                </thead>
                <tbody>
                    {currentRows.map((call, index) => (
                        <tr key={index}>
                            <td className="border border-gray-400 p-2" style={{  textAlign:'center' }}>{call.callId}</td>
                            <td className="border border-gray-400 p-2" style={{  textAlign:'center' }}>{call.accountName}</td>
                            <td className="border border-gray-400 p-2" style={{  textAlign:'center' }}>{call.callDate}</td>
                            <td className="border border-gray-400 p-2" style={{  textAlign:'center' }}>{call.callStatus}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {/* Pagination Controls */}
           {/* Pagination Controls */}
           <div className="" style={{  textAlign:'center',backgroundColor: '#bbc1c4' }}>
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        style={{ backgroundColor: '#8acfed',float:'left' }}
                    >
                        Prev
                    </button>
                    Page {currentPage} of {totalPages}
                    {/* Page Label */}
                    {/* <div className="text-center flex-1">
                        Page {currentPage} of {totalPages}
                    </div> */}

                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        style={{ backgroundColor: '#8acfed', float:'right' }}
                    >
                        Next
                    </button>
            </div>


        </div>
    );
};

export default CallDetailsTable;
