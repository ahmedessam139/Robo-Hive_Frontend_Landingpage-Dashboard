import React from 'react';

const Counters = ({ counters }) => {
  return (
    <div className="bg-white p-4 mt-4 md:m-4 rounded-lg shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="col-span-1 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-lg shadow-lg">
      <div className="p-4">
            <h4 className="text-lg font-medium mb-2">
              Robots<i className="mdi mdi-robot mdi-24px float-right"></i>
            </h4>
            <h2 className="text-4xl font-bold">{counters.robots}</h2>
            <h6 className="text-xs font-medium">Total Robots</h6>
          </div>
        </div>
        <div className="col-span-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg shadow-lg">
        <div className="p-4">
            <h4 className="text-lg font-medium mb-2">
              Connected Robots<i className="mdi mdi-wifi mdi-24px float-right"></i>
            </h4>
            <h2 className="text-4xl font-bold">{counters.connected}</h2>
            <h6 className="text-xs font-medium">Connected Robots</h6>
          </div>
        </div>
        <div className="col-span-1 bg-gradient-to-r from-gray-500 to-gray-700 text-white rounded-lg shadow-lg">
        <div className="p-4">
            <h4 className="text-lg font-medium mb-2">
              Disconnected Robots<i className="mdi mdi-close-circle mdi-24px float-right"></i>
            </h4>
            <h2 className="text-4xl font-bold">{counters.disconnectedRobots}</h2>
            <h6 className="text-xs font-medium">Disconnected Robots</h6>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Counters;
