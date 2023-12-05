import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';




const CategoryContext = createContext();
const CategoryNewsContext = createContext();
const NewsContext = createContext();
const NewsViewContext = createContext();

export const CategoryProvider = ({ children }) => {
  const [categoryData, setCategoryData] = useState([]);
  const [loadingCategory, setLoadingCategory] = useState(true);

  useEffect(() => {
    const aixosData = async () => {
      try {
        // 전체기간 키워드 요청 url
        // const response = await axios.get('/api/keyword/list');
        // 오늘의 키워드 요청 url
        const response = await axios.get('/api/keyword/today');
        setCategoryData(response.data);
        console.log('키워드 데이터가 성공적으로 로드되었습니다:', response.data);
      } catch (error) {
        console.error('키워드 데이터 로드 중 오류 발생:', error);
      } finally {
        setLoadingCategory(false);
      }
    };

    aixosData();
  }, []);

  return (
    <CategoryContext.Provider value={{ categoryData, loadingCategory }}>
      {children}
    </CategoryContext.Provider>
  );
};

export const CategoryNewsProvider = ({ children }) => {
  const [categoryNewsData, setCategoryNewsData] = useState([]);
  const [loadingCategoryNews, setLoadingCategoryNews] = useState(true);

  useEffect(() => {
    const aixosData = async () => {
      try {
        // 키워드뉴스 요청 url
        const response = await axios.get('/api/news/keyword');
        setCategoryNewsData(response.data);
        console.log('키워드 뉴스 데이터가 성공적으로 로드되었습니다:', response.data);
      } catch (error) {
        console.error('키워드 뉴스 데이터 로드 중 오류 발생:', error);
      } finally {
        setLoadingCategoryNews(false);
      }
    };

    aixosData();
  }, []);

  return (
    <CategoryNewsContext.Provider value={{ categoryNewsData, loadingCategoryNews }}>
      {children}
    </CategoryNewsContext.Provider>
  );
};

export const NewsProvider = ({ children }) => {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const aixosData = async () => {
      try {
        const response = await axios.get('/api/news/list');
        setNewsData(response.data);
        const filteredData = response.data.filter(item => 
          item.picture !== null && item.picture !== "" && 
          item.articleContent !== null && item.articleContent !== ""
        );
        console.log('데이터가 성공적으로 로드되었습니다:', filteredData);
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

export const useCategoryContext = () => {
  return useContext(CategoryContext);
};

export const useCategoryNewsContext = () => {
  return useContext(CategoryNewsContext);
};

export const useNewsContext = () => {
  return useContext(NewsContext);
};

export const useNewsViewContext = () => {
  return useContext(NewsViewContext);
};
