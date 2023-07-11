import axios from "../../../../utils/axios";
import React, { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';
import { confirmAlert } from 'react-confirm-alert';
import { RiDownloadCloudLine } from 'react-icons/ri';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { FaSearchengin, FaCircle, FaCheckCircle, FaFileExcel, FaBan, FaTrashAlt, FaStopCircle, FaEdit, } from 'react-icons/fa';
import { CSVLink } from 'react-csv';
import Loader from "@/components/Common/Loader";

const Package_Table = ({ packages, getData }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const [packageIdToUpdate, setPackageIdToUpdate] = useState(null);
    const [updatedData, setUpdatedData] = useState({
        packageName: '',
        description: '',
        createdDate: '',
        downloadUrl: '',
    });

    const headers = [
        { label: 'Package Name', key: 'packageName' },
        { label: 'Description', key: 'description' },
        { label: 'Created Date', key: 'createdDate' },
        { label: 'Download URL', key: 'downloadUrl' },
        { label: 'Actions', key: 'actions' },
    ];

    const csvData = packages.map(({ packageId, packageName, description, createdDate, downloadUrl }) => ({
        packageId,
        packageName,
        description,
        createdDate,
        downloadUrl,
        actions: '',
    }));

    const filterPackages = packages.filter((pkg) => {
        return (
            pkg.packageName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            pkg.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
    });

    const handleSearchTermChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleDelete = (packageId) => {
        confirmAlert({
            title: 'Confirm Delete',
            message: `Are you sure you want to delete this package with ID (${packageId})?`,
            buttons: [
                {
                    label: 'Yes',
                    onClick: async () => {
                        console.log('Delete package with ID:', packageId);
                        const payload = {
                            packageId: packageId,
                            status: 'Deleted',
                        };
                        try {
                            const oo = await axios.delete(`/api/packages/${packageId}`);
                            getData();
                            
                        } catch (error) {
                            console.log(error);
                        }
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

    const handleUpdate = async (packageId) => {
        console.log('Update package with ID:', packageId);
        setShowPopup(true);
        setPackageIdToUpdate(packageId);
        // You can also pre-fill the form fields with the existing data of the package
        const packageToUpdate = packages.find((pkg) => pkg.packageId === packageId);
        if (packageToUpdate) {
            setUpdatedData({
                packageName: packageToUpdate.packageName,
                description: packageToUpdate.description,
                createdDate: packageToUpdate.createdDate,
                downloadUrl: packageToUpdate.downloadUrl,
            });
        }

        // Perform update action here
        const payload = {
            name: updatedData.packageName,
            description: updatedData.description,
        };

        
    };

    const handleClosePopup = () => {
        setShowPopup(false);
        setPackageIdToUpdate(null);
        setUpdatedData({
            packageName: '',
            description: '',
            createdDate: '',
            url: '',
        });
    };

    const handleFormSubmit =async () => {
        // Perform update action using the updatedData state and packageIdToUpdate
        const payload = {
            name: updatedData.packageName,
            description: updatedData.description,
        };

        try {
            const  response = await axios.put(`/api/packages/${packageIdToUpdate}`, payload);
            getData();
        } catch (error) {
            console.log(error);            
        }
      
        // Close the popup form
        handleClosePopup();
    };

    return (
        <div>
            <div className="bg-white p-4 m-4 rounded-lg min " style={{ minHeight: '80vh' }}>
                <div className="flex justify-between mb-2">
                    <p className="mb-2 text-3xl text-gray-500">Packages</p>
                    <div className="flex justify-end p-2">
                        <TextField
                            label="Search Packages"
                            sx={TextFieldStyle}
                            variant="outlined"
                            type="text"
                            value={searchTerm}
                            onChange={handleSearchTermChange}
                            placeholder="Search by Package Name or Description"
                            InputProps={{
                                endAdornment: <FaSearchengin size={24} />,
                            }}
                        />

                        <CSVLink
                            data={csvData}
                            headers={headers}
                            filename={'packages.csv'}
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
                                <th className="py-3 px-6 text-center">Package Name</th>
                                <th className="py-3 px-6 text-center">Description</th>
                                <th className="py-3 px-6 text-center">Created Date</th>
                                <th className="py-3 px-6 text-center">Download URL</th>
                                <th className="py-3 px-6 text-center">Actions</th>
                            </tr>
                        </thead>

                        <tbody className="text-gray-600 text-sm font-light">
                            {filterPackages.length > 0 ? (
                            filterPackages.map((pkg) => (
                                <tr
                                    key={pkg.packageId}
                                    className="border-b border-gray-200 hover:bg-gray-100"
                                >
                                    <td className="py-3 px-6 text-center">{pkg.packageName}</td>
                                    <td className="py-3 px-6 text-center">{pkg.description}</td>
                                    <td className="py-3 px-6 text-center">{pkg.createdDate}</td>
                                    <td className="py-3 px-6 text-center">
                                    <a href={pkg.downloadUrl} target="_blank" rel="noopener noreferrer" className='flex justify-center items-center gap-2 text-green-500 font-medium'>
                                    <RiDownloadCloudLine size={20} className="text-green-500" />
                                            Download
                                        </a>
                                    </td>
                                    <td className="py-3 px-6 flex justify-center items-center gap-3">
                                        <FaEdit
                                            size={16}
                                            className="text-blue-500 cursor-pointer"
                                            onClick={() => handleUpdate(pkg.packageId)}
                                        />
                                        <FaTrashAlt
                                            size={16}
                                            className="text-red-500 cursor-pointer"
                                            onClick={() => handleDelete(pkg.packageId)}
                                        />
                                    </td>
                                </tr>
                            ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="py-3 px-6 text-center">
                                        <div className="flex flex-col justify-center items-center ">
                                            <Loader />
                                            <h2 className=" font-bold mt-5">No Packages found.</h2>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>


                    </table>
                </div>
            </div>
            <Dialog open={showPopup} onClose={handleClosePopup} maxWidth="sm" fullWidth>
                <DialogTitle>Update Package</DialogTitle>
                <DialogContent className='flex flex-col gap-4'>
                    <TextField
                        label="Package Name"
                        fullWidth
                        value={updatedData.packageName}
                        onChange={(e) => setUpdatedData({ ...updatedData, packageName: e.target.value })}
                        margin='dense'
                    />
                    <TextField
                        label="Description"
                        fullWidth
                        value={updatedData.description}
                        onChange={(e) => setUpdatedData({ ...updatedData, description: e.target.value })}
                    />
                    <TextField
                        label="Created Date"
                        fullWidth
                        disabled
                        value={updatedData.createdDate}
                        onChange={(e) => setUpdatedData({ ...updatedData, createdDate: e.target.value })}
                    />
                    <TextField
                        label="URL"
                        fullWidth
                        disabled
                        value={updatedData.downloadUrl}
                        onChange={(e) => setUpdatedData({ ...updatedData, downloadUrl: e.target.value })}
                    />
                    <TextField
                        label="Package ID"
                        fullWidth
                        value={packageIdToUpdate}
                        disabled
                    />
                </DialogContent>
                <DialogActions margin='dense'>
                <Button onClick={handleClosePopup}>Cancel</Button>
                <button type="button" className="flex items-center gap-x-2 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 font-medium transition-all duration-700" onClick={handleFormSubmit}>
                <span className="font-2xl">Update</span>
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

export default Package_Table;
