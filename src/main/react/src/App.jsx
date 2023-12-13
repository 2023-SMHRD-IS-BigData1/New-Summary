// App.jsx
import React, { useEffect, useState } from 'react';
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './routes/home';
import reset from 'styled-reset';
import styled, { createGlobalStyle } from 'styled-components';
import Profile from './routes/profile';
import Login from './routes/login';
import Board from './routes/board';
import CategoryNews from './routes/category-news';
import SearchNews from './routes/search';
import { BookMarkProvider, CategoryNewsProvider, CategoryProvider, NewsProvider, NewsViewProvider, TodayNewsProvider, TopViewNewsProvider, UserViewNewsProvider } from './data/news-data.context';
import { AuthProvider } from './data/user-login';
import { BoardProvider, BoardViewProvider, BoardWriteProvider, CommentProvider } from './data/board-data';
import TopButtonLogo from '../src/assets/top-logo.svg';
import ProtectedRoute from './components/protected-route';
import 'react-toastify/dist/ReactToastify.css';
import ThemeToggle from './components/darkmode-btn';
import { dark, light } from './components/theme';
import ThemeProvider from './data/themeProvider';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Outlet />,
    children: [
      {
        path: '',
        element: <Home />,
      },
      {
        path: 'profile',
        element: <ProtectedRoute><Profile /></ProtectedRoute>,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'search',
        element: <SearchNews />,
      },
      {
        path: 'category-news',
        element: <CategoryNews />,
      },
      {
        path: 'board',
        element: <ProtectedRoute><Board /></ProtectedRoute>,
      },
    ],
  },
]);

const GlobalStyles = createGlobalStyle`
  ${reset};
  * {
    box-sizing: border-box;
  }
  body {
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    background: ${({ theme }) => theme.background2};
        color: ${({ theme }) => theme.text};
  }
`;

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${({ theme }) => theme.background1};
  color: ${({ theme }) => theme.text};
  transition: background 0.3s ease-in, color 0.3s ease-in;
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  position: relative;
`;

const TopButton = styled.a`
  width: 40px;
  height: 40px;
  padding-bottom: 3px;
  border-radius: 50%;
  position: fixed;
  bottom: 5%;
  right: 3%;
  font-size: 24px;
  font-weight: 600;
  border: 1px solid;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
  cursor: pointer;
  color: ${({ theme }) => theme.text};
  background: ${({ theme }) => theme.button1};
    border-color: ${({ theme }) => theme.boardBorder1};
  text-decoration: none;
  &:hover {
    color: #ffffff;
    background: #264653;
    transition: .5s;
  }
`;

const TopButtonImage = styled.img`
  padding: 8px;
`;


function App() {
  const [isLoading, setLoading] = useState(true);
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const init = () => {
      setLoading(false);
    };

    init();
  }, []);

  const handlePage = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    // 다크모드
    // <Background>
    <ThemeProvider theme={theme === "dark" ? light : dark}>
      {/* 오늘의 키워드 */}
      <CategoryProvider>
        {/* 1분카드뉴스 */}
        <CategoryNewsProvider>
          {/* 오늘의 뉴스 */}
          <TodayNewsProvider>
            {/* 전체뉴스 */}
            <NewsProvider>
              {/* 상위 조회수 뉴스 */}
              <TopViewNewsProvider>
                {/* 뉴스 상세페이지 */}
                <NewsViewProvider>
                  {/* 유저 로그인 */}
                  <AuthProvider>
                    {/* 유저 뉴스시청기록 */}
                    <UserViewNewsProvider>
                      {/* 북마크 하기 */}
                      <BookMarkProvider>
                        {/* 게시판 */}
                        <BoardProvider>
                          {/* 게시판 댓글 */}
                          <CommentProvider>
                            {/* 게시판 상세글 */}
                            <BoardViewProvider>
                              {/* 게시판 글 작성 */}
                              <BoardWriteProvider>
                                <Wrapper>
                                  <GlobalStyles />
                                  <RouterProvider router={router} />
                                  <TopButton onClick={handlePage}>
                                    {/* <TopButtonImage src={TopButtonLogo} /> */}
                                    ↑
                                  </TopButton>
                                  <ThemeToggle></ThemeToggle>
                                </Wrapper>
                              </BoardWriteProvider>
                            </BoardViewProvider>
                          </CommentProvider>
                        </BoardProvider>
                      </BookMarkProvider>
                    </UserViewNewsProvider>
                  </AuthProvider>
                </NewsViewProvider>
              </TopViewNewsProvider>
            </NewsProvider>
          </TodayNewsProvider>
        </CategoryNewsProvider>
      </CategoryProvider>
      <ToastContainer
        position="top-center"
        limit={1}
        closeButton={false}
        autoClose={4000}
        hideProgressBar={true}
        bodyStyle={{
          textAlign: 'center',
          color: '#000000',
        }}
      />
    </ThemeProvider>
    // </Background>
  );
}

export default App;