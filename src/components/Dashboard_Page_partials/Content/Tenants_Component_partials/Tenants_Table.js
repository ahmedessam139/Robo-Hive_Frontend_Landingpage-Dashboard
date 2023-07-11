import axios from "../../../../utils/axios";
import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { FaPlus, FaSearchengin, FaFileExcel, FaTrashAlt, FaEdit } from 'react-icons/fa';
import { CSVLink } from 'react-csv';


const Tenants_Table = ({ tenants , getData}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [tenantIdToUpdate, setTenantIdToUpdate] = useState(null);
  const [updatedData, setUpdatedData] = useState({
    username: '',
    email: '',
    password: '',
    role: '',
    creationTime: '',
    updateTime: '',
  });

  const headers = [
    { label: 'Username', key: 'username' },
    { label: 'Email', key: 'email' },
    { label: 'Role', key: 'role' },
    { label: 'Creation Time', key: 'creationTime' },
    { label: 'Update Time', key: 'updateTime' },
    { label: 'Actions', key: 'actions' },
  ];

  const csvData = tenants.map(({ tenantId, username, email, role, creationTime, updateTime }) => ({
    tenantId,
    username,
    email,
    role,
    creationTime,
    updateTime,
    actions: '',
  }));

  const filterTenants = tenants.filter((tenant) => {
    return (
      tenant.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tenant.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleDelete = (tenantId) => {
    confirmAlert({
      title: 'Confirm Delete',
      message: `Are you sure you want to delete this tenant with username: ${tenants.find((tenant) => tenant.tenantId === tenantId).username}?`,
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            console.log('Delete tenant with ID:', tenantId);
            // Perform delete action here
            const payload = {
              uuid: tenantId
            }
            console.log(payload);
            (async () => {
              try {
                let res = await axios.delete('/api/authenticate/tenant', { data: payload });
                console.log(res);
                getData();
              } catch (error) {
                console.log(error);
              }
            })()
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

  const handleUpdate = (tenantId) => {
    console.log('Update tenant with ID:', tenantId);
    setShowPopup(true);
    setTenantIdToUpdate(tenantId);
    // You can also pre-fill the form fields with the existing data of the tenant
    const tenantToUpdate = tenants.find((tenant) => tenant.tenantId === tenantId);
    if (tenantToUpdate) {
      setUpdatedData({
        username: tenantToUpdate.username,
        email: tenantToUpdate.email,
        password: tenantToUpdate.password,
        role: tenantToUpdate.role,
        creationTime: tenantToUpdate.creationTime,
        updateTime: tenantToUpdate.updateTime,
      });
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setTenantIdToUpdate(null);
    setUpdatedData({
      username: '',
      email: '',
      role: '',
      creationTime: '',
      updateTime: '',
    });
  };

  const handleFormSubmit = () => {
    // Perform update action using the updatedData state and tenantIdToUpdate
    console.log('Updated data:', updatedData);
    console.log('Tenant ID to update:', tenantIdToUpdate);
    const payload = {
      "tenantId": 345,
      "username": "updatedData.username",
      "email": "updatedData.email",
      "password": "updatedData.password",
      "role": "updatedData.role",
      "creationTime": "updatedData.creationTime",
      "updateTime": "updatedData.updateTime",
    }

    // Close the popup form
    handleClosePopup();
  };

  const handleAddOne = async () => {
    console.log('Add one tenant');
    let username = 'testUser';
    let password = 'testPassword';

    try {
      let res = await axios.post('/api/authenticate/tenant');
      console.log(res)
      username = res.data.profile.username;
      password = res.data.profile.password;
      getData();
      //Put the username and password in confirm alert
      confirmAlert({
        title: 'Confirm Add',
        message: `Tenant Added Successfully.-------------- Username: ${username} ----------------------- Password:${password}------------------`,
        buttons: [
          {
            label: 'Ok',
            onClick: () => {
              console.log('Add tenant with username:', username);
              console.log(tenants);
            },
          },

        ],
      });

    } catch (err) {
      console.log(err)

      //Put the username and password in confirm alert
      confirmAlert({
        title: 'An error occurred',
        message: err.response.data.message,
        buttons: [
          {
            label: 'Ok',
          },
        ],
      });
    }



  };

  return (
    <div>
      <div className="bg-white p-4 m-4 rounded-lg " style={{ minHeight: '80vh' }}>
        <div className="flex justify-between mb-2">
          <p className="mb-2 text-3xl text-gray-500">Tenants</p>
          <div className="flex justify-end p-2">
            <button className="bg-red-400 hover:bg-red-600 mr-3 text-white font-bold py-2 px-4 rounded-full" onClick={handleAddOne}>
              Add One <FaPlus className="inline-block " />
            </button>

            <TextField
              label="Search Tenants"
              sx={TextFieldStyle}
              variant="outlined"
              type="text"
              value={searchTerm}
              onChange={handleSearchTermChange}
              placeholder="Search by Username or Email"
              InputProps={{
                endAdornment: <FaSearchengin size={24} />,
              }}
            />

            <CSVLink
              data={csvData}
              headers={headers}
              filename={'tenants.csv'}
              className="ml-2"
              target="_blank"
            >
              <FaFileExcel size={53} className="text-green-800" />
            </CSVLink>
          </div>
        </div>

        <div className="bg-white shadow-md rounded my-6 overflow-x-auto">
          <table className=" w-full table-auto">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-center">Username</th>
                <th className="py-3 px-6 text-center">Role</th>
                <th className="py-3 px-6 text-center">Creation Time</th>
                <th className="py-3 px-6 text-center">Update Time</th>
                <th className="py-3 px-6 text-center">Actions</th>
              </tr>
            </thead>

            <tbody className="text-gray-600 text-sm font-light">
              {filterTenants.map((tenant) => (
                <tr key={tenant.tenantId} className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-3 px-6 text-center">{tenant.username}</td>
                  <td className="py-3 px-6 text-center">{tenant.role}</td>
                  <td className="py-3 px-6 text-center">{tenant.creationTime}</td>
                  <td className="py-3 px-6 text-center">{tenant.updateTime}</td>
                  <td className="py-3 px-6 flex justify-center items-center gap-3">
                    <FaEdit
                      size={16}
                      className="text-blue-500 cursor-pointer"
                      onClick={() => handleUpdate(tenant.tenantId)}
                    />
                    <FaTrashAlt
                      size={16}
                      className="text-red-500 cursor-pointer"
                      onClick={() => handleDelete(tenant.tenantId)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Dialog open={showPopup} onClose={handleClosePopup} maxWidth="sm" fullWidth>
        <DialogTitle>Update Tenant</DialogTitle>
        <DialogContent className="flex flex-col gap-4">
          <TextField
            label="Username"
            fullWidth
            value={updatedData.username}
            onChange={(e) => setUpdatedData({ ...updatedData, username: e.target.value })}
            margin="dense"
          />
          <TextField
            label="Email"
            fullWidth
            value={updatedData.email}
            onChange={(e) => setUpdatedData({ ...updatedData, email: e.target.value })}
          />
          <TextField
            label="Role"
            fullWidth
            value={updatedData.role}
            onChange={(e) => setUpdatedData({ ...updatedData, role: e.target.value })}
          />
          <TextField
            label="Password"
            fullWidth
            value={updatedData.password}
            onChange={(e) => setUpdatedData({ ...updatedData, password: e.target.value })}
          />
          <TextField
            label="Creation Time"
            fullWidth
            disabled
            value={updatedData.creationTime}
            onChange={(e) => setUpdatedData({ ...updatedData, creationTime: e.target.value })}
          />
          <TextField
            label="Update Time"
            fullWidth
            disabled
            value={updatedData.updateTime}
            onChange={(e) => setUpdatedData({ ...updatedData, updateTime: e.target.value })}
          />
          <TextField label="Tenant ID" fullWidth value={tenantIdToUpdate} disabled />
        </DialogContent>
        <DialogActions margin="dense">
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

export default Tenants_Table;
