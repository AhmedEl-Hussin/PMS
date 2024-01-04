import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../../Context/AuthContext";
import { DndProvider} from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import ToDo from "../ToDo/ToDo";
import Inprogress from "../Inprogress/Inprogress";
import Done from "../Done/Done";
interface Task {
  id: string;
  title: string;
  status: string;
}
export default function EmployeeTasks(task:Task) {
  const { baseUrl, requstHeaders, userRole }: any = useContext(AuthContext);
  const [isLoding, setIsLoding] = useState(false);
  const [allTasks, setAllTasks] = useState({
    todo:[],
    inprogress:[],
    done:[]
  });
  
  
 
 //***********get all employee tasks********* */
  const getAllTasks = () => {
    setIsLoding(true);
    if (userRole!=="Manager") {
      
      axios
      .get(`${baseUrl}/Task`, {
        headers: requstHeaders,
        params: {
          pageSize: 100,
          pageNumber: 1,
        },
      })
      .then((response) => {
      
        setAllTasks({
          todo:response?.data?.data.filter((task) => task?.status === "ToDo"),
          inprogress:response?.data?.data.filter((task) => task?.status === "InProgress"),
          done:response?.data?.data.filter((task) => task?.status === "Done"),

        });
      })

      .catch((error) => {
        toast.error(error?.response?.data?.message || "Something went Wrong");
      })
      .finally(() => {
        setIsLoding(false);
      });
    }
   
  };
  useEffect(() => {
    getAllTasks();
  }, []);

  return (
    <>
     
        {isLoding ? (
          <div className="text-center loading mb-5 mt-4 ">
            <i className="fa-solid text-success fa-spin fa-spinner"></i>{" "}
          </div>
        ) : (
          <div className=" employeeTasksContainer overflow-hidden px-2">
            <h4 className="text-muted bg-white m-0 p-3">Task Board</h4>
            <div className=" row px-2">
              <div className="col-md-4 px-1">
                <h5 className="p-4 text-muted">To Do</h5>
                <ToDo allTasks={allTasks?.todo} getAllTasks={getAllTasks}/>
              </div>

              <div className="col-md-4 px-1">
                <h5 className="p-4 text-muted">In progress</h5>
                <Inprogress allTasks={allTasks?.inprogress} getAllTasks={getAllTasks}/>
              </div>

              <div className="col-md-4 px-1">
                <h5 className="p-4 text-muted">Done</h5>
                <Done allTasks={allTasks?.done} getAllTasks={getAllTasks}/>
              </div>
            </div>
          </div>
        )}
     
    </>
  );
}
