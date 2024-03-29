
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './App.css'
import MasterLayout from './Shared/MasterLayout/MasterLayout'
import NotFound from './Shared/NotFound/NotFound'
import Home from './Components/Home/Home'
import Projects from './Components/Projects/Projects'
import Users from './Components/Users/Users'
import Tasks from './Components/Tasks/Tasks'
import AuthLayout from './Shared/AuthLayout/AuthLayout'
import Login from './Components/Login/Login'
import Rigester from './Components/Rigester/Rigester'
import RestPassword from './Components/RestPassword/RestPassword'
import RequsetResetPass from './Components/RequsetResetPass/RequsetResetPass'
import ChangePassword from './Components/ChangePassword/ChangePassword'
import VerfiyUser from './Components/VerfiyUser/VerfiyUser'
import { ToastContainer } from 'react-toastify'
import ProtectedRouter from './Shared/ProtectedRouter/ProtectedRouter'
import { AuthContext } from './Context/AuthContext'
import { useContext } from 'react'
import AddNewProject from './Components/AddNewProject/AddNewProject'
import AddNewTask from './Components/AddNewTask/AddNewTask'
import Bar from './Components/Charts/Bar'
import Pie1 from './Components/Charts/Pie1/Pie1'
import Pie2 from './Components/Charts/Pie2/Pie2'
import EmployeeTasks from './Components/employeeTasks/employeeTasks'
import ToDo from './Components/ToDo/ToDo'
import Inprogress from './Components/Inprogress/Inprogress'
import Done from './Components/Done/Done'

function App() { 

  let {adminData , saveAdminData } = useContext(AuthContext)

  const routes = createBrowserRouter([
    {
      path : "dashboard",
      element : ( <ProtectedRouter adminData = {adminData}>
                    <MasterLayout adminData = {adminData} />
                  </ProtectedRouter>
                ),
      errorElement : <NotFound/>,
      children : [
        { index: true, element: <Home/> },
        { path : "projects", element: <Projects/> },
        { path : "projects/addProject", element: <AddNewProject/> },
        { path : "users", element: <Users/> },
        { path : "tasks", element: <Tasks/> },
        { path : "tasks/addTask", element: <AddNewTask/> },
        { path : "tasks/EmployeeTasks", element: <EmployeeTasks/> },
        { path : "tasks/todo", element: <ToDo/> },
        { path : "tasks/inprogress", element: <Inprogress/> },
        { path : "tasks/done", element: <Done/> },
      ]

    },
    {
      path : "/",
      element : <AuthLayout/>,
      errorElement : <NotFound/>,
      children : [
        { index: true, element: <Login saveAdminData = {saveAdminData}/> },
        { path : "login", element: <Login saveAdminData = {saveAdminData}/> },
        { path : "rigester", element: <Rigester/> },
        { path : "requsetRestPass", element: <RequsetResetPass/> },
        { path : "restPassword", element: <RestPassword/> }, 
        { path : "changePassword", element: <ChangePassword/> },
        { path : "verify", element: <VerfiyUser/> },
      ]
    },
    {
      path : "/notFound", element: <NotFound/> ,
    }
  ])

  return (
    <>

      <ToastContainer
        theme='colored'
        autoClose={1000}
        position='top-left'
        hideProgressBar={false}
        closeOnClick={true}
        pauseOnHover={true}
        draggable={true}
      />
      <RouterProvider router={routes}/>

    </>
  )
}

export default App
