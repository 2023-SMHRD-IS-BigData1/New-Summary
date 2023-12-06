import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
  labels: ['사회', '정치', '경제', '국제', '문화', '연예', '스포츠', 'IT'],
  datasets: [
    {
      label: 'Views',
      data: [12, 2, 3, 5, 2, 19, 2, 8],
      backgroundColor: [
        '#f04d4d',
        '#F0BE4D',
        '#f0e54d',
        '#4df076',
        '#4d94f0',
        '#8b4df0',
        '#f04dcd',
        '#240b18',
      ],

      borderWidth: 1,
    },
  ],
};

const options = {
  maintainAspectRatio: false,
  width: 1000, 
  height: 500, 
  plugins: {
    legend: {
      position: 'bottom', // 라벨 위치 설정
    },
  },
};

const DoughnutComponent = () => {
  return <Doughnut data={data}  options={options} />;
};

export default DoughnutComponent;
