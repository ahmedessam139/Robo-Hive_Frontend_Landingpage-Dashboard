const Counters = ({ counters }) => {
    return (    
        <div className="bg-white p-4 mt-4 md:m-4 rounded-lg shadow-md">
            <div className="grid grid-cols-1 md:grid-cols-4 ">
                <div className="text-gray-800 flex flex-col gap-7 col-span-4 md:col-span-3">
                    <h4 className="text-3xl font-medium">Robots Logs</h4>
                    <h6 className=" font-medium mt-5">
                        Search, inspect, and share the runtime logs from your Machines
                    </h6>
                </div>
                <div className="col-span-1  bg-gradient-to-r from-green-500 to-green-700 text-white rounded-lg shadow-lg mt-4 md:mt-0">
                    <div className="p-4">
                        <h4 className="text-lg font-medium mb-2">
                            ٌRobots<i className="mdi mdi-chart-line mdi-24px float-right"></i>
                        </h4>
                        <h2 className="text-4xl font-bold">{counters.robots}</h2>
                        <h6 className="text-xs font-medium">Total Number of Robots</h6>
                    </div>
                </div>

            </div>

        </div>
    );
};

export default Counters;