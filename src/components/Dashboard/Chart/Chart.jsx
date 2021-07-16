import React from 'react';
import { Bar, Polar } from "react-chartjs-2";

const Chart = ({ chartType, users, orders, pendingOrders, completeOrders, products, Deal, Active, NotActive }) => {
    const date = new Date();

    const data = {
        labels: ["WebSite Statistics"],
        datasets: [
            {
                label: "Customers",
                data: [users?.length],
                backgroundColor: ['rgba(0, 0, 255, 0.7)']
            },
            {
                label: "Orders",
                data: [orders?.length],
                backgroundColor: ['rgb(54, 162, 235)']
            },
            {
                label: "Pending",
                data: [pendingOrders?.length],
                backgroundColor: ['rgba(0, 255, 0, 0.7)']
            },
            {
                label: "Complete",
                data: [completeOrders?.length],
                backgroundColor: ['rgba(255, 0, 0, 0.7)']
            },
        ]
    }

    const options = {
        title: {
            display: true,
            text: "Statiscical of Customers & Orders"
        },
        scales: {
            yAxes: [
                {
                    ticks: {
                        min: 0,
                        max: 100,
                        stepSize: 10
                    }
                }
            ]
        }
    }

    // polar
    const dataPolar = {
        labels: [
            'Products',
            'Active',
            'Non-Active',
            'In Deal',
        ],
        datasets: [{
            data: [products?.length, Active?.length, NotActive?.length, Deal?.length],
            backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(75, 192, 192)',
                'rgb(255, 205, 86)',
                'rgb(201, 203, 207)',
            ]
        }]
    };

    const optionsPolar = {
        title: {
            display: true,
            text: `Statiscical Data Graph of ${date.getFullYear()}`
        },
    }


    return <React.Fragment>
        <div>
            {
                chartType === 'Bar' ?
                    <Bar data={data} options={options} />
                    :
                    <Polar data={dataPolar} options={optionsPolar} />
            }
        </div>
    </React.Fragment>
}

export default Chart;
