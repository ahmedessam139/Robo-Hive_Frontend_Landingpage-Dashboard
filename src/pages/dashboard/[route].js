import React, { useState, useEffect, use } from 'react';
import { Suspense } from 'react';
import { GoSidebarExpand } from 'react-icons/go';
import { useRouter } from 'next/router';
import Sidebar from '../../components/Dashboard_Page_partials/Sidebar/Sidebar';
import styles from './Dashboard.module.css';
import Loader from '../../components/Common/Loader';
import Header from '../../components/Dashboard_Page_partials/Header/Header';
import Home from '../../components/Dashboard_Page_partials/Content/Home_Component_partials/Home';
import Jobs from '../../components/Dashboard_Page_partials/Content/Jops_Component_partials/Jobs';
import Package from '../../components/Dashboard_Page_partials/Content/Package_Component_partials/Package';
import Logs from '../../components/Dashboard_Page_partials/Content/Logs_Component_partials/Logs';
import Robots from '../../components/Dashboard_Page_partials/Content/Robots_Components_partials/Robots';
import Tenants from '../../components/Dashboard_Page_partials/Content/Tenants_Component_partials/Tenants';

const Dashboard = () => {
  const router = useRouter();
  const [sideToggle, setSideToggle] = useState(false);
  const [title, setTitle] = useState(router.query.route);

  const route = router.query.route;
  console.log(route);

  function getContent(route) {


    let content;

    switch (route) {
      case 'home':
        content = (<Suspense fallback={<Loader />}><Home /></Suspense>);
        break;

      case 'jobs':
        content = (<Suspense fallback={<Loader />}><Jobs /></Suspense>);
        break;

      case 'packages':
        content = (<Suspense fallback={<Loader />}><Package /></Suspense>);
        break;
      case 'logs':
        content = (<Suspense fallback={<Loader />}><Logs /></Suspense>);
        break;
      case 'overview':
        content = (<Suspense fallback={<Loader />}><Home /></Suspense>);
        break;
      case 'robots':
        content = (<Suspense fallback={<Loader />}><Robots /></Suspense>);
        break;

      case 'tenants':
        content = (<Suspense fallback={<Loader />}><Tenants /></Suspense>);
        break;
      case 'Queues':
        content = (
          <div className={`mt-10 h-96 w-full flex justify-center items-center`}>
            <Loader />
          </div>
        );
        break;
      default:
        content = (
          <div className={`mt-10 h-96 w-full flex justify-center items-center`}>
            <div className="flex flex-col justify-center items-center">
              <Loader />
              <h2 className="text-2xl font-bold mt-5">404-page not found</h2>

            </div>
          </div>
        );
        break;
    }

    return content;
  }
  // Render the correct component based on the route
  let content = getContent(route);
  useEffect(() => {
    content = getContent(route);
  }, [route]);

  useEffect(() => {
    console.log(window.innerWidth);
    function handleResize() {
      if (window.innerWidth < 768) {
        setSideToggle(true); // On small screens, hide the sidebar by default
      } else {
        setSideToggle(false); // On medium and larger screens, show the sidebar by default
      }
    }
    window.addEventListener('resize', handleResize);
    handleResize(); // Call it on mount as well
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (

    <div id={styles.dashboard} className="w-full">

      <div id={styles.sidebar} className={`bg-gray-500 ${sideToggle ? styles.active : ''}`}>
        <div className={`${styles.sidebarContent} bg-slate-900 flex flex-col justify-between`}>
          <Sidebar setTitle={setTitle} setSideToggle={setSideToggle} />
          <div className="w-full bottom-5 right-5 flex justify-center mb-7 sticky">
            <button
              className={`p-2 bg-blue-500 text-white rounded-full shadow-md z-999 sticky`}
              onClick={() => setSideToggle(true)} >
              <GoSidebarExpand size={30} />
            </button>
          </div>
        </div>
      </div>
      <div id={styles.pageContent} className="w-full z-999 h-full">
        <Header title={title} sideToggle={sideToggle} setSideToggle={setSideToggle} />
        {content}
      </div>
    </div>

  );
};

export default Dashboard;
