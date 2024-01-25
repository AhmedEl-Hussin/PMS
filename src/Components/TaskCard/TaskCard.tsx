import React from 'react'
import { useDrag } from 'react-dnd';

export default function TaskCard({task}) {
   
    
    const [{ isDragging }, dragRef] = useDrag({
        type: "TASK",
        item: { id: task?.id, status: task?.status },
        collect: (monitor) => ({
          isDragging: !!monitor.isDragging(),
        }),
        
      });
      console.log(task?.id);

    return (
        <>
       
        <li ref={dragRef} className="taskLi p-2 m-2 rounded-2">
             {task?.title}
       </li>
            
        </>
    )
}
