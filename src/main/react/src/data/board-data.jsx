import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const BoardContext = createContext();
const BoardViewContext = createContext();
const BoardWriteContext = createContext();

export const BoardProvider = ({ children }) => {
  const [boardData, setBoardData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const aixosData = async () => {
      try {
        const response = await axios.get('/api/board/list');
        setBoardData(response.data);
        console.log('게시판 데이터가 성공적으로 로드되었습니다:', response.data);
      } catch (error) {
        console.error('게시판 데이터 로드 중 오류 발생:', error);
      } finally {
        setLoading(false);
      }
    };

    aixosData();
  }, [setBoardData]);

  return (
    <BoardContext.Provider value={{ boardData, setBoardData, loading }}>
      {children}
    </BoardContext.Provider>
  );
};

export const BoardViewProvider = ({ children }) => {
  const [boardViewData, setBoardViewData] = useState([]);
  const [loadingViews, setLoadingViews] = useState(true);

  useEffect(() => {
    const aixosData = async () => {
      try {
        const response = await axios.get('/api/board/list');
        setBoardViewData(response.data);
        console.log('데이터가 성공적으로 로드되었습니다:', response.data);
      } catch (error) {
        console.error('데이터 로드 중 오류 발생:', error);
      }
    };

    aixosData();
  }, [setBoardViewData]);

  return (
    <BoardViewContext.Provider value={{ boardViewData, loadingViews }}>
      {children}
    </BoardViewContext.Provider>
  );
};

export const BoardWriteProvider = ({ children }) => {
  const [boardWriteData, setBoardWriteData] = useState([]);
  const [loadingWrite, setLoadingWrite] = useState(true);

  useEffect(() => {
    const aixosData = async () => {
      try {
        const response = await axios.post('/api/board/create');
        setBoardWriteData(response.data);
        console.log('데이터가 성공적으로 로드되었습니다:', response.data);
      } catch (error) {
        console.error('데이터 로드 중 오류 발생:', error);
      }
    };

    aixosData();
  }, [setBoardWriteData]);

  return (
    <BoardWriteContext.Provider value={{ boardWriteData, setBoardWriteData, loadingWrite }}>
      {children}
    </BoardWriteContext.Provider>
  );
};


export const useBoardContext = () => {
  return useContext(BoardContext);
};

export const useBoardViewContext = () => {
  return useContext(BoardViewContext);
};

export const useBoardWriteContext = () => {
  return useContext(BoardWriteContext);
};
