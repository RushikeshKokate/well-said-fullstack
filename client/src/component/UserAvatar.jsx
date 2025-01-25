import React from "react";
import { Menu } from "@headlessui/react";
import { Fragment, useState } from "react";
import { FaUser, FaUserAlt, FaUserLock } from "react-icons/fa";
import { IoLogOutOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { use } from "react";
import { useNavigate } from "react-router-dom";
import { getInitials } from "../utils";
import { Button, Transition } from "@headlessui/react";
import clsx from "clsx";

const UserAvatar = () => {
  const [open, setOpen] = useState(false);
  const [openPassword, setOpenPassword] = useState(false);
  const { user } = useSelector((state) => state.auth);
  // const [logoutUser] = useLogoutMutation()
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    console.log("logout");
  };

  return (
    <>
      <div>
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button className="w-10 h-10 2xl:h-12 items-center justify-center rounded-full bg-blue-600">
              <span className="text-white font-semibold">
                {getInitials(user?.name)}
              </span>
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="p-4">
                <Menu.Item>
                {({ active }) => (
                  <button className="text-gray-700 group flex w-full items-center rounded-md px-2 py-2 text-base"
                  onClick={()=>setOpen(true)}
                  >
                    <FaUserAlt className="mr-2 text-black" aria-hidden="true" />
                    Profile
                  </button>
                )}

              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button className="text-gray-700 group flex w-full items-center rounded-md px-2 py-2 text-base"
                  onClick={()=>setOpenPassword(true)}
                  >
                    <FaUserLock className="mr-2 text-black" aria-hidden="true" />
                    Change Password
                  </button>
                )}

              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button className="text-red-600 group flex w-full items-center rounded-md px-2 py-2 text-base"
                  onClick={logoutHandler}
                  >
                    <IoLogOutOutline className="mr-2 text-red-600" aria-hidden="true" />
                    Logout
                  </button>
                )}

              </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </>
  );
};

export default UserAvatar;
