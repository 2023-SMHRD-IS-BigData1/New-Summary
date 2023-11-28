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
import AutoPlayCarousel from './components/carousel';

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
        element: <Profile />,
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
        element: <Board />,
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
  width: 60px;
  height: 60px;
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


function App() {
  const [isLoading, setLoading] = useState(true);
  const init = () => {
    setLoading(false);
  }
  useEffect(() => {
    init();
  }, []);
  return (
    <>
    <Wrapper>
      <GlobalStyles />
      {isLoading ? <LoadingScreen /> : <RouterProvider router={router} />}
      <TopButton href="javascript:window.scrollTo(0,0);">&uarr;</TopButton>
    </Wrapper>
    </>
  )
}

export default App
