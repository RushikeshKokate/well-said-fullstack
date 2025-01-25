import React from "react";
import { MdMenu, MdOutlineSearch } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import UserAvatar from "./UserAvatar";
import { setOpenSidebar } from "../redux/slices/authSlice";
import NotifiactionPanel from "./NotifiactionPanel";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  return (
    <div className="flex justify-between items-center px-4 py-3 2xl:py-4 sticky top-0 z-10">
      <div className="flex gap-4 md:hidden">
        <button
          onClick={() => dispatch(setOpenSidebar(true))}
          className="text-2xl text-gray-500 block md:hidden"
        >
          <MdMenu />
        </button>
      </div>
      <div className="w-64 2xl:w-[400px] flex items-center py-2 px-3 gap-2 rounded-full bg-[#f3f4f6]">
          <MdOutlineSearch className="text-gray-500 text-xl"/>
          <input type="text" placeholder="Search..." className="flex-1 outline-none bg-transparent placeholder:text-gray-500 text-gray-800"/>
      </div>
      <div className="flex gap-2 items-center">
         <NotifiactionPanel/>
         <UserAvatar/>
      </div>
    </div>
  );
};

export default Navbar;
