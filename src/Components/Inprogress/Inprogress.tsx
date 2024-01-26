import React, { useContext, useEffect, useState } from 'react'
import  { useDrag, useDrop } from "react-dnd";
import { AuthContext } from '../../Context/AuthContext';
import { toast } from 'react-toastify';
import axios from 'axios';
import TaskCard from '../TaskCard/TaskCard';


export default function Inprogress({allTasks}) {

    const { baseUrl, requstHeaders, userRole }: any = useContext(AuthContext);
    const[task,setTask]=useState(null)

    
 

  const [{ isOver,canDrop }, dropRef] = useDrop(()=>({
    accept: 'TASK',
    drop: ({id,status}:any) => {
    dropTask(id,status);
      
      },
   
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  }))
  const dropTask=(id:number,status:string)=>{
    if (status==="InProgress") {
  return null

  }
    else{
         

  axios.put(`${baseUrl}/Task/${id}/change-status`,{
  status: "InProgress"
  },
  {
        headers: requstHeaders,
        
  })
  .then((res)=>{
  console.log(res);
        
  toast.success("status changed")
  })
  .catch((err)=>{
  console.log(err);
  toast.error("error in changing status")
    
  })
  }}

    return (
        <>
         <div
                  className="tasksContainer p-2 " ref={dropRef}
                  
                >
                  <ul className="list-unstyled">
                  {allTasks?.map((task) => (
                     <TaskCard task={task}/>
                      // <li ref={dragRef} className="taskLi p-2 m-2 rounded-2" >
                      //   {title}
                      // </li>
                    ))}
                  </ul>
                </div>
            
        </>
    )
}
