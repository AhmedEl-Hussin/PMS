import React, { useContext, useEffect, useState} from "react";
import { ResponsiveBar } from '@nivo/bar'
import axios from "axios";



import { PieChart, Pie, Cell } from "recharts";
import { AuthContext } from "../../../Context/AuthContext";

export default function Pie1() {

  const { baseUrl, requstHeaders }: any = useContext(AuthContext);
  const [tasksCount, setTasksCount] = useState({});
 
  
  const getTasksCount = () => {
    axios
      .get(`${baseUrl}/Task/count`, {
        headers: requstHeaders,
      })
      .then((response) => {
     
        setTasksCount(response?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };


 
  useEffect(() => {
    getTasksCount();
    
  }, []);
//   const {toDo,inprogress,done} = 
//     tasksCount
//   ;

const data = [
    { name: "ToDo", value: tasksCount.toDo },
    { name: "inProgress", value: tasksCount.inProgress},
    { name: "Done", value: tasksCount.done},
   
  ];

 
   
  
  const COLORS = ["#0088FE", "#b72e89", "#956c14", ];
  return (
    <>
      <div className="chart">

      <PieChart width={250} height={200}>
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
        {data.map((data, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
   
    </PieChart>
   
    <div className="row">
    <div className="col-md-4">
        <span><i className="fa-solid fa-circle bgicons1 pe-2 "></i></span><span>ToDo</span>
    </div>
    <div className="col-md-4">
        <span><i className="fa-solid fa-circle bgicons2  pe-2 "></i></span><span>InProgress</span>
    </div>
    <div className="col-md-4">
        <span><i className="fa-solid fa-circle bgicons3 pe-2  "></i></span><span>Done</span>
    </div>
</div>


      {/* <ResponsiveBar
        data={data}
        keys={[
            'toDo',
            'inProgress',
            'done',
           
        ]}
        
        indexBy="status"
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        colors={{ scheme: 'dark2'}}
        defs={[
            {
                id: 'dots',
                type: 'patternDots',
                background: 'inherit',
                color: '#38bcb2',
                size: 4,
                padding: 1,
                stagger: true
            },
            {
                id: 'lines',
                type: 'patternLines',
                background: 'inherit',
                color: '#EF9B28',
                rotation: -45,
                lineWidth: 6,
                spacing: 10
            }
        ]}
        fill={[
            {
                match: {
                    id: 'fries'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'sandwich'
                },
                id: 'lines'
            }
        ]}
        borderColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    1.6
                ]
            ]
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Status',
            legendPosition: 'middle',
            legendOffset: 32,
            truncateTickAt: 0
        }}
        axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Tasks',
            legendPosition: 'middle',
            legendOffset: -50,
            truncateTickAt: 0
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    1.6
                ]
            ]
        }}
        legends={[
            {
                dataFrom: 'keys',
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 120,
                translateY: 0,
                itemsSpacing: 2,
                itemWidth: 100,
                itemHeight: 20,
                itemDirection: 'left-to-right',
                itemOpacity: 0.85,
                symbolSize: 20,
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemOpacity: 1
                        }
                    }
                ]
            }
        ]}
        role="application"
        ariaLabel="Nivo bar chart demo"
        barAriaLabel={e=>e.id+": "+e.formattedValue+" in country: "+e.indexValue}

        theme={{
          "background": "#ffffff",
          "text": {
              "fontSize": 12,
              "fill": "#333333",
              "outlineWidth": 0,
              "outlineColor": "transparent"
          },
          "axis": {
              "domain": {
                  "line": {
                      "stroke": "#777777",
                      "strokeWidth": 1
                  }
              },
              "legend": {
                  "text": {
                      "fontSize": 12,
                      "fill": "red",
                      "outlineWidth": 0,
                      "outlineColor": "transparent"
                  }
              },
              "ticks": {
                  "line": {
                      "stroke": "#777777",
                      "strokeWidth": 1
                  },
                  "text": {
                      "fontSize": 11,
                      "fill": "#EF9B28",
                      "outlineWidth": 0,
                      "outlineColor": "transparent"
                  }
              }
          },
          "grid": {
              "line": {
                  "stroke": "#dddddd",
                  "strokeWidth": 1
              }
          },
          "legends": {
              "title": {
                  "text": {
                      "fontSize": 11,
                      "fill": "#333333",
                      "outlineWidth": 0,
                      "outlineColor": "transparent"
                  }
              },
              "text": {
                  "fontSize": 11,
                  "fill": "red",
                  "outlineWidth": 0,
                  "outlineColor": "transparent"
              },
              "ticks": {
                  "line": {},
                  "text": {
                      "fontSize": 10,
                      "fill": "#333333",
                      "outlineWidth": 0,
                      "outlineColor": "transparent"
                  }
              }
          },
          "annotations": {
              "text": {
                  "fontSize": 13,
                  "fill": "",
                  "outlineWidth": 2,
                  "outlineColor": "#ffffff",
                  "outlineOpacity": 1
              },
              "link": {
                  "stroke": "#000000",
                  "strokeWidth": 1,
                  "outlineWidth": 2,
                  "outlineColor": "#ffffff",
                  "outlineOpacity": 1
              },
              "outline": {
                  "stroke": "#000000",
                  "strokeWidth": 2,
                  "outlineWidth": 2,
                  "outlineColor": "#ffffff",
                  "outlineOpacity": 1
              },
              "symbol": {
                  "fill": "#000000",
                  "outlineWidth": 2,
                  "outlineColor": "#ffffff",
                  "outlineOpacity": 1
              }
          },
          "tooltip": {
              "container": {
                  "background": "#ffffff",
                  "fontSize": 12
              },
              "basic": {},
              "chip": {},
              "table": {},
              "tableCell": {},
              "tableCellValue": {}
          }
      }}
    /> */}
      </div>
    
    </>
  );
}
