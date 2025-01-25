import React, { useState } from "react";
import { use } from "react";
import Title from "../component/Title";
import { IoMdAdd } from "react-icons/io";
import Button from "../component/Button";
import { summary } from "../assets/data";
import { getInitials } from "../utils";
import clsx from "clsx";

const User = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [open, setOpen] = useState(false);
  const [openAction, setOpenAction] = useState(false);
  const [selected, setSelected] = useState(null);

  const TableHeader = () => {
    return (
      <thead className="w-full border-b border-gray-300 ">
        <tr className="w-full text-black text-left">
          <th className="py-2"> Full Name</th>
          <th className="py-2">Title</th>
          <th className="py-2 line-clamp-1">Email</th>
          <th className="py-2">Role</th>
          <th className="py-2">Active</th>
        </tr>
      </thead>
    );
  };
  const TableRow = ({ user }) => {
    console.log("here is the user", user);

    return (
      <tr className="border-b border-gray-200 text-gray-600 hover:bg-gray-400/10">
        <td className="p-2 flex items-center gap-2">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full text-white flex items-center justify-center text-sm bg-blue-700">
              <span className="text-xs md:text-sm text-center">
                {getInitials(user.name)}
              </span>
            </div>
          </div>
          {user.name}
        </td>
        <td className="p-2">{user.title}</td>
        <td className="p-2">{user.email || "Empty"}</td>
        <td className="p-2">{user.role}</td>
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
            // onClick={()=> deleteClicks(task._id)}
          ></Button>
        </td>
      </tr>
    );
  };

  return (
    <div className="w-full md:px-1 px-0 mb-6">
      <div className="flex items-center justify-between mb-8">
        <Title title="Team Members" />
        <Button
          label="Add New User"
          icon={<IoMdAdd className="text-lg" />}
          className="flex flex-row-reverse gap-1 items-center bg-blue-600 text-white rounded-md py-2 2xl:py-2.5"
          onClick={() => setOpen(true)}
        />
      </div>
      <div className="bg-white px-2 md:px-4 py-4">
        <div className="overflow-x-auto">
          <table className="w-full mb-5">
            <TableHeader />
            <tbody>
              {summary?.users?.map((user, index) => {
                return <TableRow key={index} user={user} />;
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default User;
