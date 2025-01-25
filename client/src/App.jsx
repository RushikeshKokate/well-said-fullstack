import React, { Fragment } from "react";
import { useLayoutEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

import Login from "./pages/Login";
import { Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Task from "./pages/Task";
import User from "./pages/User";
import Trash from "./pages/Trash";
import TaskDetails from "./pages/TaskDetails";
import { Toaster } from "sonner";
import { useSelector, useDispatch } from "react-redux";
import Sidebar from "./component/Sidebar";
import Navbar from "./component/Navbar";
import { Transition } from "@headlessui/react";
import clsx from "clsx";
import { IoClose } from "react-icons/io5";
import { setOpenSidebar } from "./redux/slices/authSlice";

function App() {
  function Layout() {
    const location = useLocation();
    const { user } = useSelector((state) => state.auth);

    const MobileSidebar = () => {
      const { isSidebarOpen } = useSelector((state) => state.auth);
      const mobileMenuRef = React.useRef(null);
      const dispatch = useDispatch();

      const closeSidebar = () => {
        dispatch(setOpenSidebar(false));
      };

      return (
        <Transition
          show={isSidebarOpen}
          as={Fragment}
          enter="transition-opacity duration-700"
          enterFrom="opacity-x-0"
          enterTo="opacity-x-100"
          leave="transition-opacity duration-700  "
          leaveFrom="opacity-x-100"
          leaveTo="opacity-x-0"
        >
          {(ref) => (
            <div
              ref={(node) => (mobileMenuRef.current = node)}
              className={clsx(
                "md:hidden w-full h-full bg-black/40 transition-all duration-700 transform",
                isSidebarOpen ? "translate-x-0" : "translate-x-full"
              )}
              onClick={closeSidebar}
            >
              <div className="bg-white w-3/4 h-full">
                <div className="w-full flex justify-end px-5">
                  <button
                    onClick={() => closeSidebar()}
                    className="flex justify-end items-end "
                  >
                    <IoClose size={25} />
                  </button>
                </div>
                <div className="">
                  <Sidebar />
                </div>
              </div>
            </div>
          )}
        </Transition>
      );
    };

    return user ? (
      <div className="w-full h-screen flex flex-col md:flex-row">
        <div className="w-1/5 h-screen bg-white sticky top-0 hidden md:block">
          <Sidebar />
        </div>
        <MobileSidebar />
        <div className="flex-1 overflow-y-auto">
          <Navbar />
          <div className="bg-[#f3f4f6] p-4 2xl:px-10">
            <Outlet />
          </div>
        </div>
      </div>
    ) : (
      <Navigate to="/log-in" state={{ from: location }} replace />
    );
  }

  return (
    <main>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/tasks" element={<Task />} />
          <Route path="/completed/:status" element={<Task />} />
          <Route path="/in-progress/:status" element={<Task />} />
          <Route path="/todo/:status" element={<Task />} />
          <Route path="/team" element={<User/>} />
          <Route path="/trash" element={<Trash />} />
          <Route path="/task/:id" element={<TaskDetails />} />
        </Route>

        <Route path="/log-in" element={<Login />} />
      </Routes>
      <Toaster />
    </main>
  );
}

export default App;
