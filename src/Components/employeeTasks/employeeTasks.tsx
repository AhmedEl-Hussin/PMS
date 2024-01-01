import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../../Context/AuthContext";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
interface Task {
  id: string;
  title: string;
  status: string;
}
export default function EmployeeTasks(task) {
  const { baseUrl, requstHeaders, userRole }: any = useContext(AuthContext);
  const [isLoding, setIsLoding] = useState(false);
  const [tasksList, setTasksList] = useState<Task[]>([]);
  const todoTasks = tasksList.filter((task) => task?.status === "ToDo");
  const inProgressTasks = tasksList.filter(
    (task) => task?.status === "In Progress"
  );
  const doneTasks = tasksList.filter((task) => task?.status === "Done");

  //***********drag task********* */
  const [{ isDragging }, dragRef] = useDrag({
    type: "TASK",
    item: { id: task.id, title: task.title, status: task.status },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  //***********drop task********* */

  const [{ isOver }, dropRef] = useDrop({
    accept: 'TASK',
    drop: (status: any, item: Task) => {
      setTasksList((prevTasks: Task[]) => {
        const index = prevTasks.findIndex((t) => t.id === item.id);
        if (index !== -1) {
          prevTasks[index].status = status; // Update task status
        }
        return prevTasks; // Return the modified array
      });
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

 //***********get employee tasks********* */
  const getAllTasks = () => {
    setIsLoding(true);
    axios
      .get(`${baseUrl}/Task`, {
        headers: requstHeaders,
        params: {
          pageSize: 100,
          pageNumber: 1,
        },
      })
      .then((response) => {
        setTasksList(response?.data?.data);
      })

      .catch((error) => {
        toast.error(error?.response?.data?.message || "Something went Wrong");
      })
      .finally(() => {
        setIsLoding(false);
      });
  };
  useEffect(() => {
    getAllTasks();
  }, []);

  return (
    <>
      <DndProvider backend={HTML5Backend}>
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
                <div
                  className="tasksContainer p-2 ${isOver ? 'drop-target' : ''}"
                  ref={dropRef}
                >
                  <ul className="list-unstyled">
                    {todoTasks.map((task) => (
                      <li className="taskLi p-2 m-2 rounded-2" ref={dragRef}>
                        {task?.title}{" "}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="col-md-4 px-1">
                <h5 className="p-4 text-muted">In progress</h5>
                <div
                  className="tasksContainer p-2 ${isOver ? 'drop-target' : ''}"
                  ref={dropRef}
                >
                  <ul className="list-unstyled">
                    {inProgressTasks.map((task) => (
                      <li className="taskLi p-2 m-2 rounded-2" ref={dragRef}>
                        {task?.title}{" "}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="col-md-4 px-1">
                <h5 className="p-4 text-muted">Done</h5>
                <div
                  className="tasksContainer p-2 ${isOver ? 'drop-target' : ''}"
                  ref={dropRef}
                >
                  <ul className="list-unstyled">
                    {doneTasks.map((task) => (
                      <li className="taskLi p-2 m-2 rounded-2" ref={dragRef}>
                        {task?.title}{" "}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </DndProvider>
    </>
  );
}
