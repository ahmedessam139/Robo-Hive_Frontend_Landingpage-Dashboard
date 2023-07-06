import React, { useState } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { GoSidebarExpand } from 'react-icons/go';
import { Avatar, Menu, MenuItem } from '@mui/material';
import { RiArrowDropDownLine } from 'react-icons/ri';
import { useRouter } from "next/router";
import { signOut } from 'next-auth/react';
import { useSession } from 'next-auth/react';

export default function Header({ title, sideToggle, setSideToggle }) {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState(null);
  const {data: session} = useSession();

  console.log(session);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogOut = () => {
    // Add logout logic here (e.g., clearing auth token, user data, etc.)
    // For example, you can redirect to the login page after logging out:
    // history.push('/login');
    signOut({callbackUrl: "/"});
    router.push('/');
  };

  return (
    <header className="top-0 z-999 flex w-full bg-white drop-shadow-1 flex justify-between items-center">
      <div className="flex items-center justify-between shadow-2">
        <div className="flex items-center justify-between py-4 px-4 shadow-2 md:px-6 2xl:px-11">
          {sideToggle ? (
            <AiOutlineMenu className="text-2xl cursor-pointer" size={30} onClick={() => setSideToggle(!sideToggle)} />
          ) : (
            <GoSidebarExpand className="text-2xl cursor-pointer" size={30} onClick={() => setSideToggle(!sideToggle)} />
          )}
        </div>

        <h2 className="text-2xl font-semibold text-gray-800 md:text-3xl 2xl:text-4xl flex items-center justify-center hidden md:block">
          Dashboard - {title}
        </h2>
      </div>
      <div
        onClick={() => router.push("/")}
        className={`flex items-center gap-x-3 cursor-pointer md:ml-5 ${sideToggle ? 'block' : 'hidden'}`}
      >
        <img src="/logos/main_logo.svg" width={160} alt="Logo" />
      </div>
      <div className="mx-5 flex flex-row gap-2">
        <div className="text-gray-400 text-sm font-semibold my-auto hidden md:block ">
          <>{session?.user?.name}</>  
        </div>
        <div className="flex flex-row gap-0 items-center cursor-pointer" onClick={handleMenuOpen}>
          <Avatar alt="*User" src="" />
          <RiArrowDropDownLine size={25} />
        </div>
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
          <MenuItem onClick={() => console.log('Profile clicked')}> {session?.user?.email} </MenuItem>
          <MenuItem onClick={() => console.log('Setting clicked')}>Setting</MenuItem>
          <MenuItem onClick={handleLogOut}>Log out</MenuItem>
        </Menu>
      </div>
    </header>
  );
}
