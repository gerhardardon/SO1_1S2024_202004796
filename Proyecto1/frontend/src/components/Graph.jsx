import React from 'react';
import {Chart, ArcElement, Tooltip, Legend, Title} from 'chart.js';
import {Doughnut} from 'react-chartjs-2';

Chart.register(ArcElement, Tooltip, Legend, Title);
Chart.defaults.plugins.tooltip.backgroundColor = 'rgb(0, 0, 156)';
Chart.defaults.plugins.legend.position = 'right';
Chart.defaults.plugins.legend.title.display = true;
Chart.defaults.plugins.legend.title.font = "system-ui";

const options = {
  responsive: true, // Hace que el gráfico sea responsive
  maintainAspectRatio: false, // Permite que el gráfico ajuste su tamaño automáticamente
  
  // Otras opciones personalizadas según tus necesidades
};

function CreateDoughnutData(props) {
  const data = {
    labels: ['free','used'],  
    datasets: [{
      data: [props.free,100-props.free],
      backgroundColor: [
        'rgb(116, 226, 192)',
        'rgb(255, 87, 51)'
      ],
  
      borderWidth: 4,
      radius: '80%'  
       
    }]
  };

  return (
    <div style={{ width: '80%', height: '400px', margin: 'auto' }}>
        <Doughnut data={data} options={options}  />
    </div>
  );
}

export default CreateDoughnutData;