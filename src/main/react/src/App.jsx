import { useEffect, useState } from 'react';
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from './routes/home';
import LoadingScreen from './components/loading-screen';
import reset from "styled-reset";
import styled, { createGlobalStyle } from 'styled-components';
import Profile from './routes/profile';
import Login from './routes/login';
import Board from './routes/board';
import CategoryNews from './routes/category-news';
import SearchNews from './routes/search';
import { BookMarkProvider, CategoryNewsProvider, CategoryProvider, NewsProvider, NewsViewProvider } from './data/news-data.context';
import { AuthProvider } from './data/user-login';
import { BoardProvider, BoardViewProvider, BoardWriteProvider } from './data/board-data';
import TopButtonLogo from '../src/assets/top-logo.svg'
import ProtectedRoute from './components/protected-route';

// 초기 시작페이지를 잡아주기
const router = createBrowserRouter([
  {
    path: "/",
    element: <Outlet />,
    children: [
      {
        path: "", // 위와 동일한 path 경로를 갖는다
        element: <Home />,
      },
      {
        path: "profile",
        element: <ProtectedRoute><Profile /></ProtectedRoute>,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "search",
        element: <SearchNews />,
      },
      {
        path: "category-news",
        element: <CategoryNews />,
      },
      {
        path: "board",
        element: <ProtectedRoute><Board /></ProtectedRoute>,
      },
    ],
  },
])

// reset css
const GlobalStyles = createGlobalStyle`
  ${reset};
  * {
    box-sizing: border-box;
  }
  body {
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    background-color: #f0e6dd;
  }
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
  border: 1px solid #99999944;
  border-radius: 50%;
  position: fixed;
  bottom: 50px;
  right: 50px;
  font-size: 32px;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
  color: #000000;
  text-decoration: none;
  &:hover {
    background-color: #f0be4d;
    color: #ffffff;
    transition: 0.5s;
  }
`;

const TopButtonImage = styled.img`
  padding: 8px;
`;


function App() {
  const [isLoading, setLoading] = useState(true);
  const init = () => {
    setLoading(false);
  }

  useEffect(() => {
    init();
  }, []);

  const handlePage = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    // 오늘의 키워드
    <CategoryProvider>
      {/* 1분카드뉴스 */}
      <CategoryNewsProvider>
        {/* 전체뉴스 */}
        <NewsProvider>
          {/* 조회수 뉴스 */}
          <NewsViewProvider>
            {/* 유저 로그인 */}
            <AuthProvider>
              {/* 북마크 하기 */}
              <BookMarkProvider>
                {/* 게시판 */}
                <BoardProvider>
                  {/* 게시판 상세글 */}
                  <BoardViewProvider>
                    {/* 게시판 글 작성 */}
                    <BoardWriteProvider>
                      <Wrapper>
                        <GlobalStyles />
                        {isLoading ? <LoadingScreen /> : <RouterProvider router={router} />}
                        <TopButton onClick={handlePage}>
                          <TopButtonImage src={TopButtonLogo} />
                        </TopButton>
                      </Wrapper>
                    </BoardWriteProvider>
                  </BoardViewProvider>
                </BoardProvider>
              </BookMarkProvider>
            </AuthProvider>
          </NewsViewProvider>
        </NewsProvider>
      </CategoryNewsProvider>
    </CategoryProvider>
  )
}

export default App
