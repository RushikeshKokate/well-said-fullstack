import React from "react";
import moment from "moment";
import { summary, user } from "../assets/data";
import {
  MdAdminPanelSettings,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdKeyboardDoubleArrowUp,
} from "react-icons/md";

import { FaEdit, FaNewspaper, FaUsers } from "react-icons/fa";
import { FaArrowsToDot } from "react-icons/fa6";
import clsx from "clsx";
import Chart from "../component/Chart";
import { PRIOTITYSTYELS, TASK_TYPE, BGS, getInitials } from "../utils";
import UserInfo from "../component/UserInfo";

const Dashboard = () => {
  const totals = summary?.tasks || {};
  const stats = [
    {
      _id: "1",
      label: "TOTAL TASK",
      total: summary?.totalTasks || 0,
      icon: <FaNewspaper />,
      bg: "bg-[#1d4ed8]",
    },
    {
      _id: "2",
      label: "COMPLTED TASK",
      total: totals["completed"] || 0,
      icon: <MdAdminPanelSettings />,
      bg: "bg-[#0f766e]",
    },
    {
      _id: "3",
      label: "TASK IN PROGRESS ",
      total: totals["in progress"] || 0,
      icon: <FaEdit />,
      bg: "bg-[#f59e0b]",
    },
    {
      _id: "4",
      label: "TODOS",
      total: totals["todo"],
      icon: <FaArrowsToDot />,
      bg: "bg-[#be185d]" || 0,
    },
  ];

  const TaskTable = ({ tasks }) => {
    const TableHeader = () => {
      return (
        <thead className="border-b border-gray-300">
          <tr className="text-black text-left">
            <th className="py-2">Task Title</th>
            <th className="py-2">Priority</th>
            <th className="py-2">Team</th>
            <th className="py-2 md:block">Created At</th>
          </tr>
        </thead>
      );
    };

    return (
      <div className="w-full md:w-2/3 bg-white px-2 md:px-4 pt-4 pb-4 shandow-md rounded">
        <table className="w-full mb-5">
          <TableHeader />
          <tbody>
            {tasks?.map((task, id) => (
              <TableRow key={id} task={task} />
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const UserTable = ({ users }) => {
    const TableHeader = () => {
      return (
        <thead className="border-b border-gray-300">
          <tr className="text-black text-left">
            <th className="py-2">Full Name</th>
            <th className="py-2">Status</th>
            <th className="py-2 md:block">Created At</th>
          </tr>
        </thead>
      );
    };

    const TableRow = ({ user }) => (
      <tr className="border-b border-gray-200 text-gray-600   hover:bg-gray-400/10">
        <td className="py-2 ">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full text-white flex items-center justify-center text-sm bg-violet-700">
                <span className="text-center">{getInitials(user?.name)}</span>
              </div>
            </div>

            <div>
              <p>{user?.name}</p>
              <span className="text-xs text-black">{user?.role}</span>
            </div>
          </div>
        </td>

        <td>
          <p
            className={clsx(
              "w-fit px-3 py-1 rounded-full text-sm",
              user?.isActive ? "bg-green-200" : "bg-yellow-100"
            )}
          >
            {user?.isActive ? "Active" : "Disabled"}
          </p>
        </td>

        <td>{moment(user?.createdAt).fromNow()}</td>
      </tr>
    );
    return (
      <div className="w-full md:w-1/3 bg-white px-2 md:px-4 pt-4 pb-4 shandow-md rounded">
        <table className="w-full mb-5">
          <TableHeader />
          <tbody>
            {users?.map((user, id) => (
              <TableRow key={id} user={user} />
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const TableRow = ({ task }) => {
    const ICONS = {
      high: <MdKeyboardDoubleArrowUp />,
      medium: <MdKeyboardArrowUp />,
      low: <MdKeyboardArrowDown />,
    };
    return (
      <tr className="border-b border-gray-300 text-gray-600 hover:bg-gray-300/10">
        <td className="py-2">
          <div className="flex items-center gap-2 ">
            <div
              className={clsx("w-4 h-4 rounded-full", TASK_TYPE[task.stage])}
            />
            <p className="text-base text-black">{task.title}</p>
          </div>
        </td>
        <td className="py-2">
          <div className="flex gap-1 itcems-center">
            <span className={clsx("text-lg", PRIOTITYSTYELS[task.priority])}>
              {ICONS[task.priority]}
            </span>
            <span className="Capitalize">{task.priority}</span>
          </div>
        </td>

        <td className="py-2">
          <div className="flex">
            {task.team.map((m, index) => (
              <div
                key={index}
                className={clsx(
                  "w-7 h-7 rounded-full text-white flex items-center justify-center text-sm -mr-1",
                  BGS[index % BGS.length]
                )}
              >
                <UserInfo user={m} />
              </div>
            ))}
          </div>
        </td>

        <td className="py-2 hidden md:block">
          <span className="text-base text-gray-600">
            {moment(task?.date).fromNow()}
          </span>
        </td>

        <td></td>
      </tr>
    );
  };

  const Card = ({ label, bg, Count, icon }) => {
    return (
      <div className="w-full h-32 bg-white p-5 shadow-md rounded-md flex item-center justify-between">
        <div className="h-full flex flex-1 flex-col justify-between">
          <p className="text-base text-gray-600">{label}</p>
          <span className="text-2xl font-semibold">{Count}</span>
          <span className="text-sm text-gray-400">{"110 last month"}</span>
        </div>

        <div
          className={clsx(
            "w-10 h-10 rounded-full items-center flex text-white justify-center text-hwite",
            bg
          )}
        >
          {icon}
        </div>
      </div>
    );
  };

  return (
    <div className="h-full py-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        {stats.map(({ bg, icon, label, total }, index) => (
          <Card key={index} bg={bg} icon={icon} label={label} Count={total} />
        ))}
      </div>

      <div className="w-full bg-white my-16 p-4 rounded shadow-sm">
        <h4 className="text-xl text-gray-600 font-semibold">
          Chart By Priority
        </h4>
        <Chart />
      </div>

      <div className="w-full flex flex-col md:flex-row gap-4 2xl:gap-10 py-8">
        <TaskTable tasks={summary?.last10Task} />

        <UserTable users={summary?.users} />
      </div>
    </div>
  );
};

export default Dashboard;
