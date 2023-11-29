import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import AutoPlayCarousel from '../components/carousel';
import ViewsCarousel from '../components/views-carousel';
import { SearchNewsComponent } from '../components/news';



const NewsContext = createContext();

export const NewsProvider = ({ children }) => {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/news/list');
        setNewsData(response.data);
        console.log('데이터가 성공적으로 로드되었습니다:', response.data);
      } catch (error) {
        console.error('데이터 로드 중 오류 발생:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <NewsContext.Provider value={{ newsData, loading }}>
      {children}
    </NewsContext.Provider>
  );
};

export const useNewsContext = () => {
  return useContext(NewsContext);
};
