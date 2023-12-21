import { useContext, useState } from "react";
import { Menu, MenuItem, Sidebar } from "react-pro-sidebar";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";


export default function SideBar() {

  const navigate = useNavigate()
  const [isCollapsed , setIsCollapsed] = useState(false);
  let {userRole} : any = useContext(AuthContext)

  const handelToggle = ()=>{
    setIsCollapsed(!isCollapsed);
  }

  // ******************* to log out ********************
  const logout = ()=>{
    localStorage.removeItem("userToken");
    navigate("/login")
  }

  return (
    
    <>
      <div className="sideBar-container overflow-visible ">

        <Sidebar collapsed={isCollapsed}>

          <Menu >
            <MenuItem  
              className="togel"
              onClick={handelToggle} 
              icon={ isCollapsed ? <i className="fa-solid icon-tolgle-right fa-chevron-right"></i> 
              : <i className="fa-solid icon-tolgle-left fa-chevron-left"></i> }> 
            </MenuItem>

            <MenuItem  
              className="icons iconHover" 
              icon={<i className="fa fa-home"></i>} 
              component={<Link to="/dashboard" />}> 
              Home
            </MenuItem> 

            {userRole == "Manager" ? 
            <MenuItem 
              className="iconHover"
              icon={<i className="fa-solid fa-users"></i>} 
              component={<Link to="/dashboard/users" />}> 
              Users
            </MenuItem>: "" } 

            <MenuItem 
              className="iconHover"
              icon={ <i className="fa-solid fa-diagram-project"></i> } 
              component={<Link to="/dashboard/projects" />}> 
              Projects
            </MenuItem>

            <MenuItem 
              className="iconHover"
              icon={<i className="fa-solid fa-tasks"></i>} 
              component={<Link to="/dashboard/tasks" />}> 
              Tasks
            </MenuItem>

            <MenuItem 
              className="iconHover"
              icon={<i className="fa-solid fa-unlock"></i>} 
              component={<Link to="/changePassword" />}> 
              Change Password
            </MenuItem>

            <MenuItem 
              className="iconHover"
              onClick={logout} 
              icon={<i className="fa-solid fa-right-from-bracket"></i>}> 
              Logout
            </MenuItem>

          </Menu> 


        </Sidebar>


      </div>
    </>
  )
}
