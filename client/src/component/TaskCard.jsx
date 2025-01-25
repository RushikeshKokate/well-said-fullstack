import React from "react";
import {
  MdAdd,
  MdAttachFile,
  MdFormatListBulleted,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdKeyboardDoubleArrowUp,
  MdMessage,
} from "react-icons/md";
import { BGS, formatDate, PRIOTITYSTYELS, TASK_TYPE } from "../utils";
import { useSelector } from "react-redux";
import { useState } from "react";
import clsx from "clsx";
import UserInfo from "../component/UserInfo";
// import TaskDialog from "./TaskDialog";

const ICONS = {
  high: <MdKeyboardDoubleArrowUp />,
  medium: <MdKeyboardArrowUp />,
  low: <MdKeyboardArrowDown />,
};
const TaskCard = ({ tasks }) => {
  const { user } = useSelector((state) => state.auth);
  const [open, setOpen] = useState(false);
 
  

  return (
    <>{ tasks.map((tasks) => (
      
   
    <div className="w-full h-fit bg-white shadow-md p-4 rounded">
      <div className="w-full flex justify-between">
        <div
          className={clsx(
            "flex flex-1 gap-1 items-center text-sm font-medium",
            PRIOTITYSTYELS[tasks?.priority]
          )}
        >
          <span className="text-lg">{ICONS[tasks?.priority]}</span>
          <span className="uppercase">{tasks?.priority} Priority</span>
        </div>
        {user?.isAdmin && <h1>TaskDialog</h1>}
      </div>
      <>
        <div className="flex items-center gap-2">
          <div
            className={clsx("w-4 h-4 rounded-full", TASK_TYPE[tasks?.stage])}
          />
          <h4>{tasks?.title}</h4>
        </div>
        <span className="text-sm text-gray-600">
          {formatDate(new Date(tasks?.date))}
        </span>
      </>

      <div className="w-full border-t border-gray-200 my-2">
        <div className="flex items-center justify-between mb-2 mt-2">
          <div className="flex items-center gap-3">
            <div className="flex gap-1 items-center text-sm text-gray-600">
              <MdMessage />
              <span>{tasks?.activities?.length}</span>
            </div>
            <div className="flex gap-1 items-center text-sm text-gray-600">
              <MdAttachFile />
              <span>{tasks?.assets?.length}</span>
            </div>
            <div className="flex gap-1 items-center text-sm text-gray-600">
              <MdFormatListBulleted />
              <span>0/{tasks?.subTasks?.length}</span>
            </div>
          </div>
          <div className="flex flex-row-reverse">
            {tasks?.team?.map((m, index) => (
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
        </div>
      </div>
      {tasks?.subTasks?.length > 0 ? (
        <div className="py-4 border-t broder-gray-200">
          <h5 className="text-base line-clamp-1 text-black">
            {tasks?.subTasks[0].title}
          </h5>

          <div className="p-4 space-x-8">
            <span className="text-sm text-gray-600">
              {formatDate(new Date(tasks?.subTasks[0]?.date))}
            </span>
            <span className="bg-blue-600/10 px-3 py-1 rounded-full text-blue-700 font-medium">
              {tasks?.subTasks[0]?.tag}
            </span>
          </div>
        </div>
      ) : (
        <>
          <div className="py-4 border-t border-gray-200">
            <span className="text-gray-500">No sub Task</span>
          </div>
        </>
      )}
      <div className="w-full pb-2">
        <button
        disabled={user.isAdmin ? false : true}
        className="w-full flex gap-4 items-center text-sm
         text-gray-500 font-semibold
          disabled:cursor-not-allowed disabled::text-gray-300" 
        >
          <MdAdd  className="text-lg "/>
          <span>ADD SUBTASK</span>
        </button>
      </div>
      {/* <AddSubTask open={open} setOpen={setOpen} id={task?._id}/> */}
    </div>
    )) }
    </>
  );
};

export default TaskCard;
