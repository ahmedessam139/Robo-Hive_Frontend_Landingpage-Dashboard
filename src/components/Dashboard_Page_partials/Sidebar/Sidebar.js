import { useState } from 'react';
import { useRouter } from 'next/router';
import styles from './Sidebar.module.css';
import { RiHome2Line, RiRobotLine, RiEyeLine, RiListSettingsLine, RiProcessesLine, RiFileListLine, RiFilePaper2Line, RiFileChart2Line, RiPackageLine, RiFileList2Line, RiFileTextLine, RiServerLine, RiArrowDropDownLine, RiArrowDropUpLine } from 'react-icons/ri';
import { FaClock, FaBriefcase, FaBell, FaBox, FaFileAlt, FaChartBar, FaCogs, FaTasks, FaPeopleGroup } from 'react-icons/fa';
import { BsPeopleFill } from 'react-icons/bs';


const Sidebar = ({ setTitle, setSideToggle }) => {
    const [isAutomationsOpened, setisAutomationsOpened] = useState(false); // State to track dropdown visibility
    const [isMonitoringOpened, setIsMonitoringOpened] = useState(false);
    const router = useRouter();
    const handleClick = (route, title) => {
        setTitle(title);
        router.push(`${route}`, undefined, { shallow: true });
    };

    const toggleAutomationsDropdown = () => {
        setisAutomationsOpened(!isAutomationsOpened);
    };

    const toggleMonitoringDropdown = () => {
        setIsMonitoringOpened(!isMonitoringOpened);
    };

    return (
        <div>
            <div className={styles.sideBrand} onClick={() => router.push("/")} >
                <img src="/logos/main_logo.svg" width={200} alt="Logo" />
            </div>
            <nav id={styles.sideNavbar}>
                <ul className='overflow-y-auto '>
                    <li className={`flex gap-3 my-1 hover:bg-slate-800 p-2 rounded-md cursor-pointer `} onClick={() => handleClick('/dashboard/home', 'Dashboard')}>
                        <RiHome2Line className='mt-1' />
                        <span>Home</span>
                    </li>
                    <li className={`flex flex-col`} >
                        <div className="flex flex-row gap-3 hover:bg-slate-800 my-1 p-2 rounded-md cursor-pointer " onClick={toggleAutomationsDropdown}>
                            <RiRobotLine className='mt-1' />
                            <p>Automations</p>
                            <div className="ml-auto" >
                                {isAutomationsOpened ? (
                                    <RiArrowDropUpLine size={25} />
                                ) : (
                                    <RiArrowDropDownLine size={25} />
                                )}
                            </div>
                        </div>
                        {isAutomationsOpened && (
                            <ul className="flex flex-col">
                                <li className="flex flex-row my-1 hover:bg-slate-800 p-2 rounded-md cursor-pointer" onClick={() => handleClick('/dashboard/jobs', 'Jobs')}>
                                    <FaBriefcase className="mr-2 mt-0.5" />
                                    <span>Jobs</span>
                                </li>

                                <li className="flex flex-row my-1 hover:bg-slate-800 p-2 rounded-md cursor-pointer" onClick={() => handleClick('/dashboard/packages', 'My Packages')}>
                                    <FaBox className="mr-2 mt-0.5" />
                                    <span>My Packages</span>
                                </li>
                                <li className="flex flex-row my-1 hover:bg-slate-800 p-2 rounded-md cursor-pointer" onClick={() => handleClick('/dashboard/logs', 'logs')}>
                                    <FaFileAlt className="mr-2 mt-0.5" />
                                    <span>Logs</span>
                                </li>
                            </ul>
                        )}
                    </li>
                    <li className={`flex flex-col`} >
                        <div className="flex flex-row gap-3 hover:bg-slate-800 my-1 p-2 rounded-md cursor-pointer " onClick={toggleMonitoringDropdown}>
                            <RiEyeLine className='mt-1' />
                            <span>Monitoring</span>
                            <div className="ml-auto">
                                {isMonitoringOpened ? (
                                    <RiArrowDropUpLine size={25} />
                                ) : (
                                    <RiArrowDropDownLine size={25} />
                                )}
                            </div>
                        </div>
                        {isMonitoringOpened && (
                            <ul className="flex flex-col">
                                <li className="flex flex-row my-1 hover:bg-slate-800 p-2 rounded-md cursor-pointer" onClick={() => handleClick('/dashboard/overview', 'Overview')}>
                                    <FaChartBar className="mr-2 mt-0.5" />
                                    <span>Overview</span>
                                </li>
                                <li className="flex flex-row my-1 hover:bg-slate-800 p-2 rounded-md cursor-pointer" onClick={() => handleClick('/dashboard/robots', 'Robots')}>
                                    <FaCogs className="mr-2 mt-0.5" />
                                    <span>Machines</span>
                                </li>

                            </ul>
                        )}
                    </li>

                    <li className='flex gap-3 my-1 hover:bg-slate-800 p-2 rounded-md cursor-pointer' onClick={() => handleClick('/dashboard/tenants', 'Tenants')}>
                        <BsPeopleFill className='mt-1' />
                        <span>Tenants Mangment</span>
                    </li>


                </ul>
            </nav>
           
        </div>
    );
};

export default Sidebar;
