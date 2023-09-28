/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import "./cusInput.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import MailOutlineOutlinedIcon from "@mui/icons-material/MailOutlineOutlined";

const CusInput = ({ fldType, label, value,name, onchange, ...rest }) => {
  const [isPasswordHide, setIsPasswordHide] = useState(true);

  let Icon;
  if (fldType === "email") {
    Icon = MailOutlineOutlinedIcon;
  } else if (fldType === "password") {
    Icon = LockOutlinedIcon;
  }

  return (
    <div className='formInpCon'>
      <label htmlFor={`inpFld__${label}`}>{label}</label>
      <div className='inpFldIWithIconCon'>
        <span>{Icon && <Icon />}</span>
        <input
          {...rest}
          id={`inpFld__${label}`}
          type={
            fldType === "password"
              ? !isPasswordHide
                ? "text"
                : "password"
              : fldType
          }
          placeholder=''
          value={value}
          onChange={onchange}
          name={name}
        />
        {fldType === "password" &&
          (isPasswordHide ? (
            <VisibilityOffIcon onClick={() => setIsPasswordHide(false)} />
          ) : (
            <VisibilityIcon onClick={() => setIsPasswordHide(true)} />
          ))}
        {fldType === "password" && (
          <Link className='forgotPassLink'>Forgot your password?</Link>
        )}
      </div>
    </div>
  );
};

export default CusInput;
