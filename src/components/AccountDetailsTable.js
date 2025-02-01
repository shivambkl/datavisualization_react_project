import React, { useState } from 'react';

const AccountDetailsTable = ({ tableData }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 10;

    // Calculate the index of the first and last rows to display on the current page
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = tableData.slice(indexOfFirstRow, indexOfLastRow);

    // Change page
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Calculate total pages
    const totalPages = Math.ceil(tableData.length / rowsPerPage);

    return (
        <div style={{  width:'1520px   ',backgroundColor: 'white' }}>
            <table style={{  width:'100%   ',height:'400px'   }} className="table-auto border-collapse border border-gray-400 w-full text-left" >
                <thead style={{ backgroundColor: '#2cade6'}}>
                    <tr>
                        <th className="border border-gray-400 p-2" >Account Name</th>
                        <th className="border border-gray-400 p-2" >Total Calls</th>
                        <th className="border border-gray-400 p-2" >Total Emails</th>
                        <th className="border border-gray-400 p-2">Latest Call Date</th>
                        <th className="border border-gray-400 p-2" >Latest Email Date</th>
                    </tr>
                </thead>
                <tbody>
                    {currentRows.map((row, index) => (
                        <tr key={index}>
                            <td className="border border-gray-400 p-2" style={{  textAlign:'center' }}>{row.accountName}</td>
                            <td className="border border-gray-400 p-2" style={{  textAlign:'center' }}>{row.totalCalls}</td>
                            <td className="border border-gray-400 p-2" style={{  textAlign:'center' }}>{row.totalEmails}</td>
                            <td className="border border-gray-400 p-2" style={{  textAlign:'center' }}>{row.latestCallDate}</td>
                            <td className="border border-gray-400 p-2" style={{  textAlign:'center' }}>{row.latestEmailDate}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

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

export default AccountDetailsTable; 