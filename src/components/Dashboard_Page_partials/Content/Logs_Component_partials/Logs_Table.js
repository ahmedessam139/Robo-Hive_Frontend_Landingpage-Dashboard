import React, { useState, useEffect } from 'react';
import { TextField, MenuItem } from '@mui/material';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { FaSearchengin, FaCircle, FaCheckCircle, FaFileExcel, FaBan, FaSyncAlt } from 'react-icons/fa';
import { CSVLink } from 'react-csv';
import Loader from '@/components/Common/Loader';

const Logs_Table = ({ logs, setSelectedRobot, robots, selectedRobot }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchOption, setSearchOption] = useState('name');

    useEffect(() => {
        console.log(logs);
    }, [logs]);

    const headers = [
        { label: 'Log Type', key: 'logType' },
        { label: 'Status', key: 'status' },
        { label: 'Timestamp', key: 'timestamp' },
        { label: 'Message', key: 'message' },
    ];

    const csvData = logs.map(({ logType, status, timestamp, message }) => ({
        logType,
        status,
        timestamp,
        message,
    }));

    const handleSearchTermChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearchOptionChange = (event) => {
        setSearchOption(event.target.value);
    };

    const filteredLogs = logs.filter((log) => {
        const searchTermLowerCase = searchTerm.toLowerCase();
        switch (searchOption) {
            case 'logType':
                return log.logType.toLowerCase().includes(searchTermLowerCase);
            case 'status':
                return log.status.toLowerCase().includes(searchTermLowerCase);
            case 'timestamp':
                return log.timestamp.toLowerCase().includes(searchTermLowerCase);
            case 'message':
                return log.message.toLowerCase().includes(searchTermLowerCase);
            default:
                return log.name.toLowerCase().includes(searchTermLowerCase);
        }
    });

    return (
        <div>
            <div className="bg-white p-4 m-4 rounded-lg">
                <div className="flex justify-between mb-2">
                    <p className="mb-2 text-3xl text-gray-500 ">Logs</p>
                    <div className="flex md:justify-end p-2 flex-col md:flex-row gap-3 md:gap-0">
                        <div className=" mr-2">
                            <FaSyncAlt size={35} className="text-gray-500 mt-1.5 mr-2  cursor-pointer hover:text-gray-700" />

                        </div>
                        <div className="flex justify-end mr-2">
                            <TextField
                                select
                                label="Select Robot"
                                variant="outlined"
                                value={selectedRobot}
                                onChange={(event) => setSelectedRobot(event.target.value)}
                                className="w-56"
                            >
                                {robots.map((robot) => (
                                    <MenuItem key={robot.robotId} value={robot.robotId}>
                                        {robot.robotAddress}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </div>
                        <div className="flex justify-end mr-2">

                            <TextField
                                select
                                label="Search Option"
                                variant="outlined"
                                value={searchOption}
                                onChange={handleSearchOptionChange}
                                className="w-56"
                            >
                                <MenuItem value="logType">Log Type</MenuItem>
                                <MenuItem value="name">Name</MenuItem>
                                <MenuItem value="status">Status</MenuItem>
                                <MenuItem value="timestamp">Timestamp</MenuItem>
                                <MenuItem value="message">Message</MenuItem>
                            </TextField>
                        </div>
                        <TextField
                            label="Search Logs"
                            sx={TextFieldStyle}
                            variant="outlined"
                            type="text"
                            value={searchTerm}
                            onChange={handleSearchTermChange}
                            placeholder="Search Logs"
                            InputProps={{
                                endAdornment: <FaSearchengin size={24} />,
                            }}
                        />

                        <CSVLink data={csvData} headers={headers} filename={'logs.csv'} className="ml-2" target="_blank">
                            <FaFileExcel size={53} className="text-green-800" />
                        </CSVLink>
                    </div>
                </div>

                <div className="bg-white shadow-md rounded my-6 overflow-x-auto">
                    <table className="min-w-max w-full table-auto">
                        <thead>
                            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                                <th className="py-3 px-6 text-center">Log Type</th>
                                <th className="py-3 px-6 text-center">Name</th>
                                <th className="py-3 px-6 text-center">Status</th>
                                <th className="py-3 px-6 text-center">Timestamp</th>
                                <th className="py-3 px-6 text-center">Message</th>
                            </tr>
                        </thead>

                        <tbody className="text-gray-600 text-sm font-light">
                            {filteredLogs.length > 0 ? (
                                filteredLogs.map((log) => (
                                    <tr key={log.id} className="border-b border-gray-200 hover:bg-gray-100">
                                        <td className="py-3 px-6 text-center">[{log.logType}]</td>
                                        <td className="py-3 px-6 text-center">{log.name}</td>
                                        <td className="py-3 px-6 text-center">
                                            {log.status === 'Running' && (
                                                <div className="flex items-center justify-center">
                                                    <FaCircle size={16} className="text-yellow-500 mr-2" />
                                                    <span className="text-yellow-500 font-bold text-center">Running</span>
                                                </div>
                                            )}
                                            {log.status === 'Completed' && (
                                                <div className="flex items-center justify-center">
                                                    <FaCheckCircle size={16} className="text-green-500 mr-2" />
                                                    <span className="text-green-500 font-bold text-center">Completed</span>
                                                </div>
                                            )}
                                            {log.status === 'Failed' && (
                                                <div className="flex items-center justify-center">
                                                    <FaBan size={16} className="text-red-500 mr-1" />
                                                    <span className="text-red-500 font-semibold text-center">Failed</span>
                                                </div>
                                            )}
                                        </td>
                                        <td className="py-3 px-6 text-center">{log.timestamp}</td>
                                        <td className="py-3 px-6 text-center">{log.message}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="py-3 px-6 text-center">
                                        <div className="flex flex-col justify-center items-center">
                                            <Loader />
                                            <h2 className=" font-bold mt-5">No matching logs found.</h2>
                                        </div>
                                    </td>
                                </tr>
                            )}
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

export default Logs_Table;