import React, { useState } from "react";
import {
  MdAttachFile,
  MdFormatListBulleted,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdKeyboardDoubleArrowDown,
  MdKeyboardDoubleArrowUp,
  MdMessage,
  MdOutlineKeyboardArrowUp,
  MdOutlineKeyboardDoubleArrowUp,
} from "react-icons/md";
import clsx from "clsx";
import { BGS, formatDate, PRIOTITYSTYELS, TASK_TYPE } from "../../utils";
import UserInfo from "../UserInfo";
import Button from "../Button";

const ICONS = {
  high: <MdKeyboardDoubleArrowUp />,
  medium: <MdKeyboardArrowUp />,
  low: <MdKeyboardArrowDown />,
};
const Table = ({ tasks }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [selected, setSelected] = useState(null);

  const TableHeader = () => {
    return (
      <thead className="w-full border-b border-gray-300 ">
        <tr className="w-full text-black text-left">
          <th className="py-2">Task Title</th>
          <th className="py-2">Priority</th>
          <th className="py-2 line-clamp-1    ">Created At</th>
          <th className="py-2">Assets</th>
          <th className="py-2">Team</th>
        </tr>
      </thead>
    );
  };

  const TableRow = ({ task, index }) => {
    const ICONS = {
      high: <MdOutlineKeyboardDoubleArrowUp />,
      medium: <MdOutlineKeyboardArrowUp />,
      low: <MdKeyboardDoubleArrowDown />,
    };
    return (
      <tr className="border-b border-gray-200 text-gray-600 hover:bg-gray-300/10">
        <td className="py-2">
          <div className="flex itcems-center gap-2">
            <div
              className={clsx("w-4 h-4 rounded-full", TASK_TYPE[task.stage])}
            />
            <p className="w-full line-clamp-1 text-base text-black">
              {task?.title}
            </p>
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
          <span className="text-sm text-gray-600">
            {formatDate(new Date(task?.date))}
          </span>
        </td>

        <td className="py-2">
          <div className="flex items-center gap-3">
            <div className="flex gap-1 items-center text-sm text-gray-600">
              <MdMessage />
              <span>{task?.activities?.length}</span>
            </div>
            <div className="flex gap-1 items-center text-sm text-gray-600">
              <MdAttachFile />
              <span>{task?.assets?.length}</span>
            </div>
            <div className="flex gap-1 items-center text-sm text-gray-600">
              <MdFormatListBulleted />
              <span>0/{task?.subTasks?.length}</span>
            </div>
          </div>
        </td>

        <td className="py-2">
          <div className="flex flex-row-reverse">
            {task?.team?.map((m, index) => (
              <div
                key={index}
                className={clsx(
                  "w-7 h-7 rounded-full text-white flex items-center justify-center  -mr-1",
                  BGS[index % BGS?.length]
                )}
              >
                <UserInfo user={m} />
              </div>
            ))}
          </div>
        </td>

        <td className="py-2 flex gap-2 md:gap-4 justify-end">
          <Button
            className="text-blue-600 hover:text-blue-500 sm:px-0 text-sm md:text-base"
            label="Edit"
            type="button"
          ></Button>
          <Button
            className="text-red-700 hover:text-red-500 sm:px-0 text-sm md:text-base"
            label="Delete"
            type="button"
            onClick={()=> deleteClicks(task._id)}
          ></Button>
        </td>
      </tr>
    );
  };

  return (
    <div className="bg-white px-2 md:px-4 pt-4 pb-9 shadow-md rounded">
      <div className="overflow-x-auto">
        <table className="w-full">
          <TableHeader />
          <tbody>
            {tasks.map((task, index) => {
              return <TableRow key={index} task={task} />;
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
