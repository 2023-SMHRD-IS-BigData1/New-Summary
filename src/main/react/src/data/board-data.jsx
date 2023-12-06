import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const BoardContext = createContext();
const BoardViewContext = createContext();

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
  }, []);

  return (
    <BoardContext.Provider value={{ boardData, loading }}>
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
  }, []);

  return (
    <BoardViewContext.Provider value={{ boardViewData, loadingViews }}>
      {children}
    </BoardViewContext.Provider>
  );
};


export const useBoardContext = () => {
  return useContext(BoardContext);
};

export const useBoardViewContext = () => {
  return useContext(BoardViewContext);
};
