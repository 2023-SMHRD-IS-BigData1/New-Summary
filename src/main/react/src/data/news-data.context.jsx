import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';




const NewsContext = createContext();
const NewsViewContext = createContext();

export const NewsProvider = ({ children }) => {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const aixosData = async () => {
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

    aixosData();
  }, []);

  return (
    <NewsContext.Provider value={{ newsData, loading }}>
      {children}
    </NewsContext.Provider>
  );
};

export const NewsViewProvider = ({ children }) => {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const aixosData = async () => {
      try {
        const response = await axios.get(`/api/news/detail/{id}`);
        setNewsData(response.data);
        console.log('데이터가 성공적으로 로드되었습니다:', response.data);
      } catch (error) {
        console.error('데이터 로드 중 오류 발생:', error);
      } finally {
        setLoading(false);
      }
    };

    aixosData();
  }, []);

  return (
    <NewsViewContext.Provider value={{ newsData, loading }}>
      {children}
    </NewsViewContext.Provider>
  );
};

export const useNewsContext = () => {
  return useContext(NewsContext);
};

export const useNewsViewContext = () => {
  return useContext(NewsContext);
};
