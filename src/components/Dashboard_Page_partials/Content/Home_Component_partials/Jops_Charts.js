import React from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';


const Jobs_Charts = ({ jobs }) => {
    const { total, pending, executed, cancelled } = jobs;
    const pendingPercentage = Math.round(total == 0 ? 0 : (pending / total) * 100);
    const executedPercentage = Math.round(total == 0 ? 0 : (executed / total) * 100);
    const cancelledPercentage = Math.round(total == 0 ? 0 : (cancelled / total) * 100);

    return (
        <div className="bg-white p-4 m-2 md:m-4 rounded-lg shadow-md ">
            <div class="border-b border-gray-200">
                <div class="sm:flex sm:justify-between">
                </div>
               
            </div>
            <h2 style={{ padding: "8px", color: "#4B5563", fontWeight: "bold", textTransform: "uppercase", }} >
            Jobs
        </h2>
            <div className='md:flex md:flex-row md:justify-center gap-5 flex flex-col'>
                <div style={{ width: 300, height: 300 }} className='flex flex-col items-center justify-center gap-5'>
                    <CircularProgressbar
                        value={pendingPercentage}
                        text={`${pendingPercentage}%`}
                        strokeWidth={10}
                        styles={{
                            path: {
                                stroke: '#007bff',
                            },
                            text: {
                                fill: '#007bff',
                            },
                            trail: {
                                stroke: '#e0e0e0',
                            },
                        }}
                    />
                    <h2 style={{ padding: "8px", color: "#4B5563", fontWeight: "bold", textTransform: "uppercase", }} >
                        Pending
                    </h2>
                </div>
                <div style={{ width: 300, height: 300 }} className='flex flex-col items-center justify-center gap-5'>
                    <CircularProgressbar
                        value={executedPercentage}
                        text={`${executedPercentage}%`}
                        strokeWidth={10}
                        styles={{
                            path: {
                                stroke: '#28a745',
                            },
                            text: {
                                fill: '#28a745',
                            },
                            trail: {
                                stroke: '#e0e0e0',
                            },
                        }}
                    />
                    <h2 style={{ padding: "8px", color: "#4B5563", fontWeight: "bold", textTransform: "uppercase", }} >
                        Executed
                    </h2>
                </div>
                <div style={{ width: 300, height: 300 }} className='flex flex-col items-center justify-center gap-5'>
                    <CircularProgressbar
                        value={cancelledPercentage}
                        text={`${cancelledPercentage}%`}
                        strokeWidth={10}
                        styles={{
                            path: {
                                stroke: '#dc3545',
                            },
                            text: {
                                fill: '#dc3545',
                            },
                            trail: {
                                stroke: '#e0e0e0',
                            },
                        }}
                    />
                    <h2 style={{ padding: "8px", color: "#4B5563", fontWeight: "bold", textTransform: "uppercase", }} >
                        Cancelled
                    </h2>
                </div>
            </div>
        </div>


    );
};

export default Jobs_Charts;