import React from "react";
import clsx from "clsx";

const Button = ({ icon, type, label, className, onClick}) => {
  return (
    <div>
      <button  type={type || "button"} className={clsx("px-3 py-2 outline-none  ", className)} onClick={onClick}>
        <span>{label}</span>
        {icon && icon}
    </button>
    </div>
  );
};

export default Button;
