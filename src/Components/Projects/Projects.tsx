
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import axios from "axios";
import NoData from "../../Shared/NoData/NoData";


export default function Projects() {


  const navigate = useNavigate();
  const {baseUrl , requstHeaders} : any = useContext(AuthContext);
  const [projectList , setProjectList] = useState([]);
  const [isLoding , setIsLoding] =useState(false);


    // *************** to get all projects *****************
    const getCategoryList = ()=>{

      setIsLoding(true)
      axios.get(`${baseUrl}/Project/manager` , 
      {
        headers: requstHeaders ,
      })
      .then((response)=>{
        // console.log(response.data.data);
        setProjectList(response?.data?.data)
      
      }).catch((error)=>{
        console.log(error?.response?.data?.message);
      })
      .finally(()=> {
        setIsLoding(false)
      })
    }

    //**************** for navigate to add new project ****************** 
    const addNewProject = ()=> {
      navigate("/dashboard/addProject")
    }

  
    useEffect( ()=> {
      getCategoryList()
    } , [])



  return (
    <>
      
      {/* **************** to content above table ****************** */}
      <div className='bg-white header d-flex justify-content-between px-4 py-3 '>
          <h3> Projects </h3>
          <button onClick={addNewProject} className="shredBtn" > <i className="fa fa-plus"></i> Add New Project </button>
      </div>

      {/* **************** to display table ****************** */}
      {!isLoding ? <div className='table-responsive px-4'>

        {projectList.length > 0 ? <table className="table table-striped mt-4">
        
        <thead className=''>
          <tr className="">
            <th className="theadTable" scope="col">#</th>
            <th className="theadTable">Title</th>
            <th className="theadTable" scope="col">Statues</th>
            <th className="theadTable" scope="col">Num Users</th>
            <th className="theadTable" scope="col">Num Tasks</th>
            <th className="theadTable" scope="col">Date Created</th>
            <th className='theadTable text-center ' scope="col text-end">Actions</th>
          </tr>
        </thead>
      
      <tbody>
          {projectList.map((project , index) => (
            <>
              <tr key={project?.id}>
                <td scope="row"> {index + 1} </td>
                <td> {project?.title} </td>
                <td className=""> <div className="status w-50 text-center rounded-5"> <span>Public</span> </div></td>
                <td> 10 </td>
                <td> 10 </td>
                <td> 20/12/2023 </td>            
                <td className='text-center'>
                  <i className='fa fs-6 text-success fa-edit'></i>
                  <i className='fa ms-3 fs-6 text-danger fa-trash'></i>
                </td>
              </tr>
            </>
          ))}
        </tbody> 
      </table>  : <NoData/>}

      </div> : <div className='text-center loading mb-5 mt-4 '> <i className="fa-solid text-success fa-spin fa-spinner"></i> </div>}
      

    </>
  )
}
