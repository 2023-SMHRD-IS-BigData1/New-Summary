import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { useUserViewNewsContext } from '../data/news-data.context';
import axios from 'axios'; // axios import 추가
import LoadingScreen from './loading-screen';

ChartJS.register(ArcElement, Tooltip, Legend);

const options = {
  maintainAspectRatio: false,
  width: 1000,
  height: 600,
  plugins: {
    legend: {
      position: 'bottom', // 라벨 위치 설정
    },
  },
};

const DoughnutComponent = () => {
  const { userViewNewskData, loading } = useUserViewNewsContext();
  const [viewNewsData, setViewNewsData] = useState([]);
  const [loadingView, setLoadingView] = useState(true);
  const [data, setData] = useState(null); // 데이터 상태 추가

  let userData;
  let userEmailData;
  const userDataString = sessionStorage.getItem('userData');

  if (userDataString) {
    userData = JSON.parse(userDataString);
    userEmailData = userData.userEmail;
  } else {
    console.error('세션스토리지에 userData가 존재하지 않습니다.');
  }
  console.log(userEmailData);

  useEffect(() => {
    const fetchViewNewsData = async () => {
      try {
        const getResponse = await axios.get(`/api/log/list?userEmail=${userEmailData}`);
        const newsData = getResponse.data;

        const categoryCount = {};
        newsData.forEach(category => {
          if (categoryCount[category]) {
            categoryCount[category]++;
          } else {
            categoryCount[category] = 1;
          }
        });

        const labels = Object.keys(categoryCount);
        const dataValues = Object.values(categoryCount);

        setViewNewsData(newsData);
        setData({
          labels: labels,
          datasets: [
            {
              label: 'Views',
              data: dataValues,
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
        });

        console.log('시청뉴스 조회 완료:', newsData);
      } catch (error) {
        console.error('시청뉴스 조회 중 오류 발생:', error);
      } finally {
        setLoadingView(false);
      }
    };
    fetchViewNewsData();
  }, [userEmailData]);

  if (loadingView) {
    return <LoadingScreen />;
  }

  return <Doughnut data={data} options={options} />;
};

export default DoughnutComponent;
