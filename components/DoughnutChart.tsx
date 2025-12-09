"use client";
import React from 'react'
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
Chart.register(ArcElement, Tooltip, Legend);


function DoughnutChart({accounts}: DoughnutChartProps) {
    const accountNames: string[] = accounts.map((account) => account.name);
    const balances: number[] = accounts.map((account) => account.currentBalance);
    const data = {
        datasets: [
            {
                label: 'Bank Accounts',
                data: balances,
                backgroundColor: [
                    "#0747b6","#2265d8","#2f91fa"
                ]
            }
        ],
        labels: accountNames
    }
  return (
    <Doughnut 
        data={data}
        options={
            {
                cutout: '60%',
                plugins:{
                    legend: {
                        display: false
                    }
                }
            }
        }
    >
    </Doughnut>
  )
}

export default DoughnutChart