import React, {useState, useEffect, useRef,  useContext} from 'react';
import Chart from 'chart.js'
import {SocketContext} from "../context/SocketContext";
export const BandChart = () =>{
    const referencia = useRef();
    const {socket} = useContext(SocketContext)
    useEffect(() => {
        socket.on('current-bands', (bands) => {
            createGraphy(bands)
        })
    }, [socket])

    const createGraphy = (bands) => {
        const ctx = referencia.current.id;
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: bands.map(band=>band.name),
                datasets: [{
                    label: '# of Votes',
                    data: bands.map(band=>band.votes),
                    backgroundColor: [
                        'rgba(199,71,66,0.39)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(215,190,61,0.27)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                animation: false,
                scales: {
                    yAxes: [{
                        stacked: true
                    }]
                }
            }
        })
    }

    return(
        <>
            <canvas id="myChart" ref={referencia}></canvas>
            </>
    )
}
