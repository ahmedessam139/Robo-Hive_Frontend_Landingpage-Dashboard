import React from 'react';
import 'chart.js/auto';

import { Doughnut } from 'react-chartjs-2';

const Machines_Donut = ({ machines }) => {

    const data = {
        labels: ['Connected', 'Disconnected'],
        datasets: [
            {
                data: [machines.connected, machines.connected == 0 && machines.disconnectedRobots == 0 ? 1 : machines.disconnectedRobots],
                backgroundColor: ['#4CAF50', '#FF5722'],
            },
        ],
    };


    return (
        <div className="bg-white p-4 m-2 md:m-4 rounded-lg shadow-md ">
            <div class="border-b border-gray-200 ">
                <div class="sm:flex sm:justify-between">
                    <div class="flex-1 min-w-0">

                    </div>
                </div>
            </div>

            <div className="min-w-64">
                <h2 style={{ padding: "8px", color: "#4B5563", fontWeight: "bold", textTransform: "uppercase", }} >
                    Machines
                </h2>
                

                <Doughnut data={data} width={400} height={400} />
            </div>
        </div>
    );

}

export default Machines_Donut;