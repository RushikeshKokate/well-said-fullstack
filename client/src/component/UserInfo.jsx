import {
  Popover,
  PopoverButton,
  PopoverPanel,
  Transition,
} from "@headlessui/react";
import React from "react";
import { getInitials } from "../utils";

const UserInfo = ({ user }) => {
  return (
    <div className="px-4">
      <Popover>
        {({ open }) => (
          <>
            <PopoverButton>
              <span className="group inline-flex items-center outline-none">
                {getInitials(user?.name)}
              </span>
            </PopoverButton>

            <PopoverPanel
              anchor="bottom"
              transition
              className="absolute left-1/2 z-10 mt-3 w-90 max-w-sm -translate-x-1/2 transform px-4 sm:px-0"
            >
              <div className="flex items-center gap-4 rounded-lg shadow-lg bg-white p-4">
                <div className="w-16 h-16 bg-blue-600 rounded-full text-white flex justify-center items-center text-2xl">
                  <span>{getInitials(user?.name)}</span>
                </div>
                <div className="flex flex-col gap-y-1">
                  <p className="text-black text-xl font-bold">{user.name}</p>
                  <span className="text-base text-gray-500">{user.title}</span>
                  <span className="text-base text-blue-500">{user.email}</span>
                </div>
              </div>
            </PopoverPanel>
          </>
        )}
      </Popover>
    </div>
  );
};

export default UserInfo;
