import React, { useState } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { FaSearchengin, FaCircle, FaCheckCircle, FaFileExcel, FaBan, FaTrashAlt, FaPlus, FaPlay, FaSignal, FaBroadcastTower, FaStop } from 'react-icons/fa';
import { CSVLink } from 'react-csv';
import axios from "../../../../utils/axios";

const Jobs_Table = ({ jobs, robots, packages ,getJops }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [showError, setShowError] = useState(false);
  const [selectedRobot, setSelectedRobot] = useState(null);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);

  const handleCreateJob = () => {
    // Perform job creation with the selected values here
    console.log('Robot:', selectedRobot);
    console.log('Package:', selectedPackage);
    console.log('Time:', selectedTime);
    console.log('Date:', selectedDate);
    
    if (!selectedRobot || !selectedPackage || !selectedDate || !selectedTime) {
      setShowError(true);
      return;
    }

    setShowError(false);

    console.log(packages.find((p) => p.id == selectedPackage))
    console.log(selectedPackage)

    const payload = {
      "Package": {
        "package_name": packages.find((p) => p.id === selectedPackage).name,
        "path": packages.find((p) => p.id === selectedPackage).packageUrl
      },
      "Robot": {
        "robot_name": "selectedRobot",
        "robot_address": robots.find((r) => r.id === selectedRobot).robotAddress
      },
      "Schedule": {
        "date": selectedDate,
        "time": selectedTime+":00"
      }
    };

    

    (async () => {
      try {
        let res = await axios.post('/api/robots/package', payload);
        getJops();
      } catch (err) {
        console.log(err)
      }
    })();


    // Close the popup after job creation
    setShowPopup(false);
  };

  const handleOpenPopup = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setSelectedRobot('');
    setSelectedPackage('');
    setSelectedTime('');
    setSelectedDate('');
    setShowPopup(false);
  };

  const headers = [
    { label: 'ID', key: 'id' },
    { label: 'Robot Name', key: 'robotName' },
    { label: 'Package Name', key: 'name' },
    { label: 'Status', key: 'status' },
    { label: 'Action', key: 'action' },
  ];

  const csvData = jobs.map(({ id, robotName, name, status }) => ({
    id,
    robotName,
    name,
    status,
    action: '',
  }));

  const filterJobs = jobs.filter((job) => {
    return (
      job.robot.robotName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleDelete = (jobId) => {
    confirmAlert({
      title: 'Confirm Delete',
      message: `Sure you want to delete this job with ID (${jobId})?`,
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            console.log('Delete job with ID:', jobId);
            const payload = {
              id: jobId,
              status: 'Deleted',
            };

            // Perform delete action here
            (async () => {
              try {
                let res = await axios.delete(`/api/jobs/delete/${jobId}`, payload);
                getJops();
              } catch (err) {
                console.log(err)
              }
            })();
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

  const handleStop = (jobId) => {
    confirmAlert({
      title: 'Confirm Stop',
      message: `Sure you want to stop this job with ID (${jobId})?`,
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            console.log('Stop job with ID:', jobId);
            const payload = {
              id: jobId,
              status: 'Stopped',
            };
            // Perform stop action here
            (async () => {
              try {
                let res = await axios.get(`/api/jobs/cancel/${jobId}`, payload);
                getJops();
              } catch (err) {
                console.log(err)
              }
            })();
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

  const handleForce = (jobId) => {
    confirmAlert({
      title: 'Confirm Force',
      message: `Sure you want to force this job with ID (${jobId})?`,
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            console.log('Force job with ID:', jobId);
            // Perform stop action here
            (async () => {
              try {
                let res = await axios.get(`/api/jobs/force/${jobId}`);
                getJops();
              } catch (err) {
                console.log(err)
              }
            })();
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
      <div className="bg-white p-4 m-4 rounded-lg " style={{ minHeight: '80vh' }}>
        <div className="flex flex-col md:flex-row md:justify-between mb-2 items-center ">
          <p className="mb-2 text-3xl text-gray-500">Jobs</p>
          <div className="flex  justify-end p-2">
            <button
              className="bg-red-400 hover:bg-red-600 mr-3 text-white font-bold py-2 px-4 rounded-full"
              onClick={handleOpenPopup}
            >
              Create Job <FaPlus className="inline-block " />
            </button>
            <TextField
              label="Search Jobs"
              sx={TextFieldStyle}
              variant="outlined"
              type="text"
              value={searchTerm}
              onChange={handleSearchTermChange}
              placeholder="Search by Robot Name or Package Name"
              InputProps={{
                endAdornment: <FaSearchengin size={24} />,
              }}
            />

            <CSVLink data={csvData} headers={headers} filename={'jobs.csv'} className="ml-2" target="_blank">
              <FaFileExcel size={53} className="text-green-800" />
            </CSVLink>
          </div>
        </div>

        <div className="bg-white shadow-md rounded my-6 overflow-x-auto">
          <table className="min-w-max w-full table-auto">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-center">ID</th>
                <th className="py-3 px-6 text-center">Robot Name</th>
                <th className="py-3 px-6 text-center">Package Name</th>
                <th className="py-3 px-6 text-center">Scheduled Date</th>
                <th className="py-3 px-6 text-center">Scheduled Time</th>
                <th className="py-3 px-6 text-center">Status</th>
                <th className="py-3 px-6 text-center">Action</th>
              </tr>
            </thead>

            <tbody className="text-gray-600 text-sm font-light">
              {filterJobs.map((job) => (
                <tr key={job.id} className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-3 px-6 text-center">{job.id}</td>
                  <td className="py-3 px-6 text-center">{job.robot.robotName}</td>
                  <td className="py-3 px-6 text-center">{job.package.name}</td>
                  <td className="py-3 px-6 text-center">{job.date}</td>
                  <td className="py-3 px-6 text-center">{job.time}</td>
                  <td className="py-3 px-6 text-center">
                    {job.status.toLowerCase() === 'pending' && (
                      <div className="flex items-center justify-center">
                        <FaCircle size={16} className="text-yellow-500 mr-2" />
                        <span className="text-yellow-500 font-bold text-center">Pending</span>
                      </div>
                    )}
                    {job.status.toLowerCase() === 'executed' && (
                      <div className="flex items-center justify-center">
                        <FaCheckCircle size={16} className="text-green-500 mr-2" />
                        <span className="text-green-500 font-bold text-center">Executed</span>
                      </div>
                    )}
                    {job.status.toLowerCase() === 'cancelled' && (
                      <div className="flex items-center justify-center">
                        <FaBan size={16} className="text-orange-500 mr-1" />
                        <span className="text-orange-500 font-semibold text-center">Cancelled</span>
                      </div>
                    )}
                    {job.status.toLowerCase() === 'failed' && (
                      <div className="flex items-center justify-center">
                        <FaBroadcastTower size={20} className="text-red-500 mr-3" />
                        <span className="text-red-500 font-semibold text-center">Failed</span>
                      </div>
                    )}
                  </td>
                  <td className="py-3 px-6 flex justify-center items-center gap-3">
                    {job.status.toLowerCase() === 'pending' && (
                      <FaPlay
                      size={16}
                      className="text-green-700 mr-2 cursor-pointer"
                      onClick={() => handleForce(job.id)}
                    />
                    )}
                    {job.status.toLowerCase() === 'pending' && (<FaStop
                      size={16}
                      className="text-yellow-500 mr-2 cursor-pointer"
                      onClick={() => handleStop(job.id)}
                    />)}
                    <FaTrashAlt
                      size={16}
                      className="text-red-500 cursor-pointer"
                      onClick={() => handleDelete(job.id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Dialog open={showPopup} onClose={handleClosePopup} maxWidth="sm" fullWidth pading="2rem">
        <DialogTitle>Create Job</DialogTitle>
        <DialogContent>
          <FormControl required fullWidth sx={{ mb: 2 }}>
            <InputLabel>Robot</InputLabel>
            <Select required value={selectedRobot} onChange={(e) => setSelectedRobot(e.target.value)} margin='dense'>
              {robots.map((robot) => (
                <MenuItem key={robot.id} value={robot.id}>
                  {robot.robotAddress}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl required fullWidth sx={{ mb: 2 }}>
            <InputLabel>Package</InputLabel>
            <Select required value={selectedPackage} onChange={(e) => setSelectedPackage(e.target.value)} margin='dense'>
              {packages.map((package_) => (
                <MenuItem key={package_.id} value={package_.id}>
                  {package_.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="Time"
            type="time"
            margin='dense'
            value={selectedTime}
            onChange={(e) => setSelectedTime(e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="Date"
            type="date"
            margin='dense'
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
          />
          {showError && <p className='text-red-600'>* All fields must be filled out.</p>}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePopup}>Cancel</Button>
          <button type="button" className="flex items-center gap-x-2 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 font-medium transition-all duration-700" onClick={handleCreateJob}>
                <span className="font-2xl">Create</span>
              </button>
        </DialogActions>
      </Dialog>
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

export default Jobs_Table;
