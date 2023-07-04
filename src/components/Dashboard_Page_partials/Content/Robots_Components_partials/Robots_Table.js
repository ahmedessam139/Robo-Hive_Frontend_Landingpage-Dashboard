import React, { useState } from 'react';
import { TextField } from '@mui/material';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { FaSearchengin, FaCircle, FaCheckCircle, FaBan, FaTrashAlt, FaFileExcel  } from 'react-icons/fa';
import { CSVLink } from 'react-csv';

const Robots_Table = ({ robots }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const headers = [
    { label: 'Robot ID', key: 'robotId' },
    { label: 'Robot Address', key: 'robotAddress' },
    { label: 'Joined At', key: 'joinedAt' },
    { label: 'Status', key: 'status' },
  ];

  const csvData = robots.map(({ robotId, robotAddress, joinedAt, status }) => ({
    robotId,
    robotAddress,
    joinedAt,
    status,
  }));

  

  const handleSearchTermChange = event => {
    setSearchTerm(event.target.value);
  };

  const handleDelete = robotId => {
    confirmAlert({
      title: 'Confirm Delete',
      message: `Are you sure you want to delete this robot with ID (${robotId})?`,
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            console.log('Delete robot with ID:', robotId);
            const payload = {
              robotId: robotId,
              status: 'Deleted',
            };
            
            // Perform delete action here
          },
        },
        {
          label: 'No',
          onClick: () => {
            // Do nothing or handle cancel action
          },
        },
      ],
    });
  };

  return (
    <div>
      <div className="bg-white p-4 m-4 rounded-lg ">
        <div className="flex justify-between mb-2">
          <p className="mb-2 text-3xl text-gray-500">Robots</p>
          <div className="flex justify-end p-2">
            <TextField
              label="Search Robots"
              sx={TextFieldStyle}
              variant="outlined"
              type="text"
              value={searchTerm}
              onChange={handleSearchTermChange}
              placeholder="Search by Robot ID or Robot Address"
              InputProps={{
                endAdornment: <FaSearchengin size={24} />,
              }}
            />

            <CSVLink
              data={csvData}
              headers={headers}
              filename={'robots.csv'}
              className="ml-2"
              target="_blank"
            >
              <FaFileExcel size={53} className="text-green-800" />
            </CSVLink>
          </div>
        </div>

        <div className="bg-white shadow-md rounded my-6 overflow-x-auto">
          <table className="min-w-max w-full table-auto">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-center">Robot ID</th>
                <th className="py-3 px-6 text-center">Robot Address</th>
                <th className="py-3 px-6 text-center">Joined At</th>
                <th className="py-3 px-6 text-center">Status</th>
                <th className="py-3 px-6 text-center">Action</th>
              </tr>
            </thead>

            <tbody className="text-gray-600 text-sm font-light">
              {robots.map(robot => (
                <tr key={robot.robotId} className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-3 px-6 text-center">{robot.robotId}</td>
                  <td className="py-3 px-6 text-center">{robot.robotAddress}</td>
                  <td className="py-3 px-6 text-center">{robot.joinedAt}</td>
                  <td className="py-3 px-6 text-center">
                    {robot.status === 'connected' && (
                      <div className="flex items-center justify-center">
                        <FaCircle size={16} className="text-green-500 mr-2" />
                        <span className="text-green-500 font-bold text-center">Connected</span>
                      </div>
                    )}
                    {robot.status === 'disconnected' && (
                      <div className="flex items-center justify-center">
                        <FaBan size={16} className="text-red-500 mr-1" />
                        <span className="text-red-500 font-semibold text-center">Disconnected</span>
                      </div>
                    )}
                  </td>
                  <td className="py-3 px-6 flex justify-center items-center gap-3">
                    <FaTrashAlt
                      size={16}
                      className="text-red-500 mr-2 cursor-pointer"
                      onClick={() => handleDelete(robot.robotId)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const TextFieldStyle = {
  '& .MuiOutlinedInput-root': {
    '&.Mui-focused fieldset': { borderColor: '#85AEFF' },
  },
  '& .MuiInputLabel-outlined.Mui-focused': {
    color: '#85AEFF',
  },
};

export default Robots_Table;
