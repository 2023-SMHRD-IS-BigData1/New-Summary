import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AutoPlayCarousel from '../components/carousel';

export function AutoComponent() {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const axiosData = async () => {
      try {
        // const response = await axios.get('../../NewsTestData.json');
        const response = await axios.get('/api/news/list');
        setNewsData(response.data);
        console.log('Data has been successfully loaded:', response.data);
      } catch (error) {
        console.error('JSON 데이터를 불러오는 중 오류 발생:', error);
      } finally {
        setLoading(false);
      }
    };

    axiosData();
  }, []);

  return (
    <>
      <AutoPlayCarousel newsData={newsData} />
    </>
  );
}
