const Counters = ({ counters }) => {
    return (
      <div className="bg-white p-4 mt-4 md:m-4 rounded-lg shadow-md">
        <div className="mb-2">
          <div className="col-span-1 bg-gradient-to-r from-gray-500 to-gray-500 text-white rounded-lg shadow-lg">
            <div className="p-4">
              <h4 className="text-lg font-medium mb-2">
                Total<i className="mdi mdi-chart-line mdi-24px float-right"></i>
              </h4>
              <h2 className="text-4xl font-bold">{counters.jobs}</h2>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="col-span-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg shadow-lg">
            <div className="p-4">
              <h4 className="text-lg font-medium mb-2">
                Pending<i className="mdi mdi-bookmark-outline mdi-24px float-right"></i>
              </h4>
              <h2 className="text-4xl font-bold">{counters.pending}</h2>
            </div>
          </div>
          <div className="col-span-1 bg-gradient-to-r from-green-500 to-lime-500 text-white rounded-lg shadow-lg">
            <div className="p-4">
              <h4 className="text-lg font-medium mb-2">
                Executed<i className="mdi mdi-check mdi-24px float-right"></i>
              </h4>
              <h2 className="text-4xl font-bold">{counters.executed}</h2>
            </div>
          </div>
          <div className="col-span-1 bg-gradient-to-r from-yellow-700 to-yellow-500 text-white rounded-lg shadow-lg">
            <div className="p-4">
              <h4 className="text-lg font-medium mb-2">
                Cancelled<i className="mdi mdi-close mdi-24px float-right"></i>
              </h4>
              <h2 className="text-4xl font-bold">{counters.cancelled}</h2>
            </div>
          </div>
          <div className="col-span-1 bg-gradient-to-r from-red-700 to-red-500 text-white rounded-lg shadow-lg">
            <div className="p-4">
              <h4 className="text-lg font-medium mb-2">
                Failed<i className="mdi mdi-close mdi-24px float-right"></i>
              </h4>
              <h2 className="text-4xl font-bold">{counters.failed}</h2>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default Counters;
  