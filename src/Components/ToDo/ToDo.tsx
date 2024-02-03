import axios from 'axios';
import { useContext } from 'react'
import  {useDrop } from "react-dnd";
import { AuthContext } from '../../Context/AuthContext';
import TaskCard from '../TaskCard/TaskCard';


export default function ToDo({allTasks}) {
    const { baseUrl, requstHeaders }: any = useContext(AuthContext);
 

   //***********drop task********* */

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
  


  const dropTask =(id:number,status:string)=>{
    if (status==="ToDo") {
        return null
        
    }
    return axios.put(`${baseUrl}/Task/${id}/change-status`,{
       status: "ToDo"
    },
     {
        headers: requstHeaders,
        
      })
   
  }
  
  
    return (
        <>
         <div
                  className="tasksContainer p-2 " ref={dropRef}>
                  <ul className="list-unstyled">
                  {allTasks?.map((task) => (
             <TaskCard task={task}/>
          ))}
                  </ul>
                </div>
            
        </>
    )
}
