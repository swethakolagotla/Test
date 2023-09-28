/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import "./cusBtn.css";

const CusBtn = ({ ...rest }) => {
  return <button {...rest}>Log in</button>;
};

export default CusBtn;
