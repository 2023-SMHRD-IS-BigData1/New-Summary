import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';




const CategoryContext = createContext();
const CategoryNewsContext = createContext();
const NewsContext = createContext();
const NewsViewContext = createContext();
const BookMarkContext = createContext();
const UserViewNewsContext = createContext();

export const CategoryProvider = ({ children }) => {
  const [categoryData, setCategoryData] = useState([]);
  const [loadingCategory, setLoadingCategory] = useState(true);

  useEffect(() => {
    const aixosData = async () => {
      try {
        // 전체기간 키워드 요청 url
        const response = await axios.get('/api/keyword/list');
        // 오늘의 키워드 요청 url
        // const response = await axios.get('/api/keyword/today');
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
          item.summary !== null && item.summary !== ""
        );
        console.log('뉴스 데이터가 성공적으로 로드되었습니다:', filteredData);
      } catch (error) {
        console.error('뉴스 데이터 로드 중 오류 발생:', error);
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
  const [ViewsNewsData, setViewsNewsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const aixosData = async () => {
      try {
        const response = await axios.get(`/api/news/detail/{id}`);
        setViewsNewsData(response.data);
        console.log('조회수 뉴스데이터가 성공적으로 로드되었습니다:', response.data);
      } catch (error) {
        console.error('조회수 뉴스데이터 로드 중 오류 발생:', error);
      } finally {
        setLoading(false);
      }
    };

    aixosData();
  }, []);

  return (
    <NewsViewContext.Provider value={{ ViewsNewsData, setViewsNewsData, loading }}>
      {children}
    </NewsViewContext.Provider>
  );
};

export const BookMarkProvider = ({ children }) => {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/news/list');
        setNewsData(response.data);
        const filteredData = response.data.filter(item =>
          item.picture !== null && item.picture !== "" &&
          item.summary !== null && item.summary !== ""
        );
        console.log('뉴스 데이터가 성공적으로 로드되었습니다:', filteredData);
      } catch (error) {
        console.error('뉴스 데이터 로드 중 오류 발생:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getNewsById = (newsId) => {
    // newsId에 해당하는 뉴스를 찾아서 반환
    return newsData.find(news => news.newsObjectId === newsId);
  };

  return (
    <BookMarkContext.Provider value={{ newsData, loading, getNewsById }}>
      {children}
    </BookMarkContext.Provider>
  );
};

export const UserViewNewsProvider = ({ children }) => {
  const [userViewNewskData, setUserViewNewsData] = useState([]);
  const [loading, setLoading] = useState(true);
  let userData;
  let userEmailData;
  const userDataString = sessionStorage.getItem('userData');


  if (userDataString) {
    userData = JSON.parse(userDataString);
    userEmailData = userData.userEmail;
  } else {
    console.error('세션스토리지에 userData가 존재하지 않습니다.');
  }
  
  useEffect(() => {
    const fetchUserViewNewsData = async () => {
      try {
        const getResponse = await axios.get(`/api/log/list`,{
          userEmail: userEmailData,
        });
        setUserViewNewsData(getResponse.data);


        console.log('조회기록 조회 완료:', getResponse.data);
      } catch (error) {
        console.error('조회기록 조회 중 오류 발생:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserViewNewsData();

  }, []);

  return (
    <UserViewNewsContext.Provider value={{ userViewNewskData, loading }}>
      {children}
    </UserViewNewsContext.Provider>
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

export const useBookMarkContext = () => {
  return useContext(BookMarkContext);
};

export const useUserViewNewsContext = () => {
  return useContext(UserViewNewsContext);
};
