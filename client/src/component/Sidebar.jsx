import React from "react";
import { MdDashboard, MdOutlineAddTask, MdSettings } from "react-icons/md";
import { FaTasks } from "react-icons/fa";
import {
  AiOutlineCheckCircle,
  AiOutlineClockCircle,
  AiOutlineFileText,
  AiOutlineDelete,
} from "react-icons/ai";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setOpenSidebar } from "../redux/slices/authSlice";
import clsx from "clsx";

const Sidebar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const location = useLocation();
  const path = location.pathname.split("/")[1];

  const closeSidebar = () => {
    dispatch(setOpenSidebar(false));
  };

  const linkData = [
    {
      label: "Dashboard",
      link: "dashboard",
      icon: <MdDashboard />,
    },
    {
      label: "Tasks",
      link: "tasks",
      icon: <FaTasks />,
    },
    {
      label: "Completed",
      link: "completed/completed",
      icon: <AiOutlineCheckCircle />,
    },
    {
      label: "In Progress",
      link: "in-progress/in progress",
      icon: <AiOutlineClockCircle />,
    },
    {
      label: "To Do",
      link: "todo/todo",
      icon: <AiOutlineFileText />,
    },
    {
      label: "Team",
      link: "team",
      icon: <AiOutlineDelete />,
    },
    {
      label: "Trash",
      link: "trash",
      icon: <AiOutlineDelete />,
    },
  ];

  const sidebarLinks = user?.isAdmin ? linkData : linkData.slice(0, 5);

  const NavLink = ({ el }) => {
    return (
      <Link
        to={el.link}
        onClick={closeSidebar}
        className={clsx(
          "w-full lg:w-3/4 flex gap-2 px-2 py-2 rounded-full items-center text-gray-800 text-base hover:bg-[#2564ed2d]",
          path === el.link.split("/")[0] ? "bg-blue-700 shadow-md text-neutral-100" : ""
        )}
      >
        {el.icon}
        <span className="hover:text-[#2564ed]">{el.label}</span>
      </Link>
    );
  };

  return (
    <div className="w-full h-full flex flex-col gap-6 p-5">
      <h1 className="flex gap-1 items-center">
        <p className="bg-blue-600 p-2 rounded-full">
          <MdOutlineAddTask />
        </p>
        <span className="text-2xl font-bold text-black">TaskMe</span>
      </h1>

      <div className="flex-1 flex flex-col gap-y-5 py-8">
        {sidebarLinks.map((link) => (
          <NavLink el={link} key={link.label} />
        ))}
      </div>

      <div className="">
        <button className="w-full flex gap-2 p-2 items-center text-lg text-gray-800  ">
            <MdSettings/>
            <span>Settings</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
