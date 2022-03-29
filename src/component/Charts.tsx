import React, { useState } from 'react';
import { IData, months } from '../data';
import moment from 'moment';
import { Bar, Line, Pie} from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';
import './Charts.css';
ChartJS.register(...registerables);

interface BarChartProps {
    tableData: IData[],
    bar: boolean,
    line: boolean,
    pie: boolean,
    toggle: () => void,
    
}

const Charts = ({ tableData, toggle, bar, line, pie }: BarChartProps) => {
    
    const chart_data = new Map<number, number>();
    let backgroundColor :  any ;

    tableData.forEach((value, key) => {
        if (value?.Date) {
            const month = value.Date.split('/')[1];
            chart_data.set(+month, ((chart_data.get(+month) || 0) + (+value.Amount)));
        }
    })
   
    if (line) {
        backgroundColor = 'rgba(75,192,192,01)'
    }
    else {
        backgroundColor = ['rgba(75,192,192,01)', 'rgb(54, 162, 235)',
        'rgb(255, 205, 86)', 'rgb(195, 125, 46)', 'rgb(145, 105, 146)']  
    }

    const [barData] = useState({
        labels: [...chart_data.keys()].map((a) => months[a-1]),
        datasets: [{
            label: 'Monthly Amount Spent',
            data: [...chart_data.values()].map(String),
            backgroundColor,
            borderColor: "black",
            borderWidth: 2,
            hoverBackgroundColor: "rgba(255,99,132,0.4)",
            hoverBorderColor: "rgba(255,99,132,1)",
        },
        ]
    }
    )

    const options={
        responsive: true,
        legend: {
            display: true, position:"right"
        },
        type:'bar',
        scales: {
            x: {
              stacked: true,
            },
            y: {
              stacked: true,
            },
          },
    }
    return (
        <div className='modal'>
           
            <button className="close" onClick={toggle} > &times;</button>
            <div className='modal-pop' role='dialog' aria-modal='true'>
                <div className='bar-data'>
                    { bar && <Bar data={barData} options={options} />}
                    {line && <Line data={barData} />}
                    {pie &&  <Pie data={barData} />}
                </div>
            </div>
            <div className='modal-overlay'></div>

        </div>
    )
}

export default Charts;