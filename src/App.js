


import React, { useState, useEffect } from 'react';
import { mergeData } from './utils/dataUtils';
import PieChartComponent from './components/PieChartComponent';
import CallDetailsTable from './components/CallDetailsTable';
import AccountDetailsTable from './components/AccountDetailsTable';

const App = () => {
    const [data, setData] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedCallType, setSelectedCallType] = useState(null);

    useEffect(() => {
        const mergedData = mergeData();
        setData(mergedData);
    }, []);

    const handleUserChange = (event) => {
        const userId = event.target.value;
        const user = data.find(user => user.userId === userId);
        setSelectedUser(user);
        setSelectedCallType(null);
    };

    const calculateCallTypePercentages = () => {
        if (!selectedUser || !selectedUser.accounts) return {};

        const allCalls = selectedUser.accounts.flatMap(account => account.calls);
        const totalCalls = allCalls.length;

        const callTypeCounts = allCalls.reduce((counts, call) => {
            counts[call.callType] = (counts[call.callType] || 0) + 1;
            return counts;
        }, {});

        const callTypePercentages = {};
        Object.keys(callTypeCounts).forEach(type => {
            callTypePercentages[type] = ((callTypeCounts[type] / totalCalls) * 100).toFixed(2);
        });

        return callTypePercentages;
    };

    const getCallDetailsByType = (callType) => {
        if (!selectedUser || !selectedUser.accounts) return [];

        const allCalls = selectedUser.accounts.flatMap(account => account.calls);
        const filteredCalls = allCalls.filter(call => call.callType === callType);

        return filteredCalls.map(call => {
            const account = selectedUser.accounts.find(acc => acc.id === call.accountId);
            return {
                callId: call.id,
                accountName: account ? account.name : "Unknown",
                callDate: new Date(call.callDate).toLocaleDateString(),
                callStatus: call.callStatus,
            };
        });
    };


    const getTableData = () => {
        if (!selectedUser || !selectedUser.accounts) return [];

        return selectedUser.accounts.map(account => {
            const totalCalls = account.calls.length;
            const totalEmails = account.emails.length;

            const latestCallDate = account.calls.reduce((latest, call) => {
                const callDate = new Date(call.callDate);
                return callDate > latest ? callDate : latest;
            }, new Date(0));

            const latestEmailDate = account.emails.reduce((latest, email) => {
                const emailDate = new Date(email.emailDate);
                return emailDate > latest ? emailDate : latest;
            }, new Date(0));

            return {
                accountName: account.name,
                totalCalls,
                totalEmails,
                latestCallDate: latestCallDate.toLocaleDateString() || "N/A",
                latestEmailDate: latestEmailDate.toLocaleDateString() || "N/A",
            };
        });
    };

    const callTypePercentages = calculateCallTypePercentages();
    const tableData = getTableData();
    const callDetails = selectedCallType ? getCallDetailsByType(selectedCallType) : [];
    const chartData = Object.entries(callTypePercentages).map(([type, percentage]) => ({
        name: type,
        value: parseFloat(percentage),
    }));

    const handlePieClick = (data, index) => {
        const selectedType = data.name;
        setSelectedCallType(selectedType);
    };

    return (
      
      <div className="min-h-screen w-full p-4 bg-gray-100"  >
        <div style={{ backgroundColor: '#3b82f6', textAlign: 'center',height:'50px' }}>

        {/* <h1 className="text-xl font-bold mb-4 bg-blue-500"  >User Data Viewer</h1> */}
        <label htmlFor="userDropdown"  className="block mb-2 mt-4" style={{marginTop:'10px'}}>Select a User:</label>
          <select
              id="userDropdown"
              onChange={handleUserChange}
              className="p-2 border rounded"
              defaultValue=""
          >
              <option value="" disabled>Select User</option>
              {data.map(user => (
                  <option key={user.userId} value={user.userId}>
                      {user.userName}
                  </option>
              ))}
          </select>
        </div>

          
        {/* <div style={{ backgroundColor: '#8acfed', textAlign: 'center',height:'50px' }}> */}

        {/* <h1 v-if='selectedUser' className="text-xl font-bold mb-4 bg-blue-500"  >Please Select a user to view analytics</h1> */}

        {!selectedUser && (
    <div style={{ backgroundColor: '#8acfed', textAlign: 'center', height: '50px' }}>
        <h1 className="text-xl font-bold mb-4 bg-blue-500">
            Please Select a user to view analytics
        </h1>
    </div>
)}




{/* </div> */}


{selectedUser && (
  <div >
    {/* Grid Layout for PieChartComponent and CallDetailsTable */}
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        // backgroundColor: '#8acfed',
        gap: '12px', // Adds space between columns
      }}
    >
      {/* Pie Chart Component */}
      <div style={{backgroundColor: '#ade1f7',}}>
       

        {/* <h3 style={{ fontSize: '1rem', fontWeight: '700' }}>Call Type Percentages:</h3> */}
        <p style={{textAlign:'center' }}>Click on Chart to get the call type details</p>
        <PieChartComponent chartData={chartData} onPieClick={handlePieClick} />
      </div>

      {/* Call Details Table */}
      
        {selectedCallType && (
          <>
          <div style={{backgroundColor: '#ade1f7',}}>
            <h3 style={{ fontSize: '1rem', fontWeight: '700', marginTop: '16px', textAlign: 'center' }}>
              Call Type Details: {selectedCallType}
            </h3>
            <CallDetailsTable callDetails={callDetails} />
            </div>
          </>
        )}
      
    </div>

    {/* Account Details Table Below */}
    <div style={{ marginTop: '24px',backgroundColor: '#bee4f7' }}>
      <h3 style={{ fontSize: '1rem', fontWeight: '700', textAlign: 'center' }}>
        {selectedUser.userName}'s Territory Details
      </h3>
      <AccountDetailsTable tableData={tableData} />
    </div>
  </div>
)}

          

          {!selectedUser  }
      </div>
  );
};

export default App;
