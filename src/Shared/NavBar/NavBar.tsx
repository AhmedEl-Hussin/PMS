
import navImg from "../../assets/images/navbarImg.png"
import navLogo from "../../assets/images/navLogo.png"
import React, {useState} from "react";
import DarkModeToggle from "react-dark-mode-toggle";



export default function NavBar({adminData}) {
  const [isDarkMode, setIsDarkMode] = useState(() => false);
  // console.log(adminData);

  return (
    <>
    <div className=" px-3 py-1 navbarCaption d-flex justify-content-between ">

      <div className="">
        <img className='navlogo' src={navLogo} alt="" />
      </div>

<div>
<DarkModeToggle
      onChange={setIsDarkMode}
      checked={isDarkMode}
      size={80}
    />
</div>
      <div className=" w-25 d-flex ">
        <div className='navbarImg '>
          <img className='navbarImg' src={navImg} alt="" />
        </div>

        <div className='navCaption'>
          <span className='ms-2 fw-bold'> {adminData.userName} </span> <br />
          <span className='navEmail ms-2'> {adminData.userEmail} </span>
        </div>

      </div>

    </div>
  </>
  )
}
