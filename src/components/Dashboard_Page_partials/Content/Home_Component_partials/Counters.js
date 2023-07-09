const Counters = ({ counters }) => {
    return (
      <div className="bg-white p-4 mt-4 md:m-4 rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="col-span-1 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-lg shadow-lg">
            <div className="p-4">
              <h4 className="text-lg font-medium mb-2">
                Jobs<i className="mdi mdi-chart-line mdi-24px float-right"></i>
              </h4>
              <h2 className="text-4xl font-bold">{counters.jobs}</h2>
              <h6 className="text-xs font-medium">Available jobs</h6>
            </div>
          </div>
          <div className="col-span-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg shadow-lg">
            <div className="p-4">
              <h4 className="text-lg font-medium mb-2">
                Packages<i className="mdi mdi-bookmark-outline mdi-24px float-right"></i>
              </h4>
              <h2 className="text-4xl font-bold">{counters.packages}</h2>
              <h6 className="text-xs font-medium">Total packages</h6>
            </div>
          </div>
          <div className="col-span-1 bg-gradient-to-r from-gray-500 to-gray-700 text-white rounded-lg shadow-lg">
            <div className="p-4">
              <h4 className="text-lg font-medium mb-2">
                Machines<i className="mdi mdi-cogs mdi-24px float-right"></i>
              </h4>
              <h2 className="text-4xl font-bold">{counters.robots}</h2>
              <h6 className="text-xs font-medium">Active machines</h6>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default Counters;
  