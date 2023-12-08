import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';




const CategoryContext = createContext();
const CategoryNewsContext = createContext();
const NewsContext = createContext();
const NewsViewContext = createContext();
const BookMarkContext = createContext();

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
  const [bookMarkData, setBookMarkData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isBookmarked, setIsBookmarked] = useState(false);
  
  useEffect(() => {
    const fetchBookMarkData = async () => {
      try {
        // GET 요청으로 북마크 데이터 조회
        const getResponse = await axios.get(`/api/news/bookmark/${userEmail}`);
        setBookMarkData(getResponse.data);

        // 북마크 데이터가 있으면 즉, 길이가 1 이상이면 북마크가 되어 있다고 판단
        setIsBookmarked(getResponse.data.length > 0);

        console.log('북마크 조회 완료:', getResponse.data);
      } catch (error) {
        console.error('북마크 조회 중 오류 발생:', error);
      } finally {
        setLoading(false);
      }
    };

    const createBookMark = async () => {
      try {
        // POST 요청으로 북마크 생성
        const createResponse = await axios.post(`/api/news/bookmark/create`);
        setBookMarkData(createResponse.data);
        setIsBookmarked(true); // 북마크가 생성되었으므로 true로 설정
        console.log('북마크 등록 완료:', createResponse.data);
      } catch (error) {
        console.error('북마크 등록 중 오류 발생:', error);
      } finally {
        setLoading(false);
      }
    };

    const deleteBookMark = async (bookmarkIdx) => {
      try {
        // DELETE 요청으로 북마크 삭제
        const deleteResponse = await axios.delete(`/api/news/bookmark/delete/${bookmarkIdx}/${userEmail}`);
        setBookMarkData(deleteResponse.data);
        setIsBookmarked(false); // 북마크가 삭제되었으므로 false로 설정
        console.log('북마크 삭제 완료:', deleteResponse.data);
      } catch (error) {
        console.error('북마크 삭제 중 오류 발생:', error);
      } finally {
        setLoading(false);
      }
    };

    // 북마크 데이터 조회
    fetchBookMarkData();

    // 북마크 생성 (POST 요청)
    createBookMark();

    // 북마크 삭제 (DELETE 요청) - 예시로 첫 번째 북마크를 삭제하도록 설정
    const firstBookmarkIdx = bookMarkData.length > 0 ? bookMarkData[0].idx : null;
    if (firstBookmarkIdx) {
      deleteBookMark(firstBookmarkIdx);
    }
  }, []); // 주의: eslint-disable-line react-hooks/exhaustive-deps // 의존성 배열이 완전하지 않아도 됩니다. (모든 의존성을 나열하지 않음)

  return (
    <BookMarkContext.Provider value={{ bookMarkData, loading, isBookmarked }}>
      {children}
    </BookMarkContext.Provider>
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
