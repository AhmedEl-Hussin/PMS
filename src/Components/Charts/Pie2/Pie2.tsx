import React, { useContext, useEffect, useState} from "react";
import axios from "axios";



import { PieChart, Pie, Cell } from "recharts";
import { AuthContext } from "../../../Context/AuthContext";

export default function Pie2() {

  const { baseUrl, requstHeaders }: any = useContext(AuthContext);
  
  const [usersCount, setUsersCount] = useState([]);
  


  const getUsersCount = () => {
    axios
      .get(`${baseUrl}/Users/count`, {
        headers: requstHeaders,
      })
      .then((response) => {
       
        setUsersCount(response?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
 

//   const {toDo,inprogress,done} = 
//     tasksCount
//   ;
useEffect(() => {
    getUsersCount();
    
  }, []);

const data = [
    { name: "activatedEmployeeCount", value: usersCount.activatedEmployeeCount},
    { name: "deactivatedEmployeeCount", value: usersCount.deactivatedEmployeeCount
},
 
   
  ];
  const COLORS = ["#0088FE", "#b72e89", "#956c14", ];
  return (
    <>
      <div className="chart">

   
      <PieChart width={250} height={400}>
      <Pie
        data={data}
        cx={120}
        cy={100}
        innerRadius={60}
        outerRadius={80}
        fill="#8884d8"
        paddingAngle={5}
        dataKey="value"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
   
    </PieChart>
  


 
      </div>
    
    </>
  );
}
