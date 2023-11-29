import { Link, useLocation } from "react-router-dom";
import styled, { css } from "styled-components";
import '../components/font.css';
import { useEffect, useState } from "react";

const Wrapper = styled.div`
    width: 100%;
    height: 120px;
    background-color: rgba(255,255,255,0.5);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    white-space: nowrap;
    position: fixed;
    top: 0;
    backdrop-filter: blur(10px);
    box-shadow: 5px 5px 50px 5px #99999944;
    z-index: 99;
`;

const WrapperTop = styled.div`
    width: 100%;
    height: 80px;
    max-width: 1400px;
    padding: 0 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const WrapperBottom = styled.div`
    width: 100%;
    height: 40px;
    max-width: 1400px;
    padding: 0 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const Title = styled.div`
    width: 300px;
    height: 80px;
    display: flex;
    align-items: center;
    font-size: 32px;
    font-weight: 600;
    cursor: pointer;
    font-family: 'Oswald', sans-serif;
`;

const LoginBox = styled.div`
    width: 300px;
    height: 80px;
    padding-right: 50px;
    display: flex;
    justify-content: right;
    align-items: center;
`;

const UserButton = styled.div`
    width: 100px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    &:hover {
    background: #F0BE4D;
    color: white;
    transition: 0.5s;
  }
`;

const MenuBox = styled.div`
    width: 100%;
    max-width: 1100px;
    height: 40px;
    padding-right: 50px;
    display: flex;
    align-items: center;
    justify-content: left;
`;

const MenuItem = styled.div`
    width: 100%;
    max-width: 300px;
    min-width: 100px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: ${(props) => props.color || "#000000"};
    background-color: ${(props) => props.background || "#ffffff00"};
    &:hover {
    background: #F0BE4D;
    color: white;
    transition: 0.5s;
    }
    ${(props) =>
        props.onPage &&
        css`
            background: #264653 !important;
            color: white;
        `
    }
`;



export default function Header({ ...props }) {
    const location = useLocation();

    useEffect(() => {
        console.log(location.pathname);
    }, [location])
    const curruntURL = location.pathname;

    return (
        <Wrapper>
            <WrapperTop>
                <Link to="/" style={{ textDecoration: "none", color: "black" }}>
                    <Title>News Summary</Title>
                </Link>
                <LoginBox>
                    <Link to="/login" style={{ textDecoration: "none", color: "black" }}>
                        <UserButton>로그인</UserButton>
                    </Link>
                    {/* <a href="https://kauth.kakao.com/oauth/logout?client_id=a5336752ae75dfa19b52019c374a13c6&logout_redirect_uri=http://localhost:8081/member/do">
                        <UserButton>카카오로그아웃</UserButton>
                    </a> */}
                </LoginBox>
            </WrapperTop>
            <WrapperBottom>
                <MenuBox>
                    <Link to="/" style={{ textDecoration: "none", color: "black", width: "20%" }}>
                        {curruntURL == "/" ? <MenuItem {...props} onPage>메인페이지</MenuItem> : <MenuItem>메인페이지</MenuItem>}
                    </Link>
                    <Link to="/category-news" style={{ textDecoration: "none", color: "black", width: "20%" }}>
                        {curruntURL == "/category-news" ? <MenuItem {...props} onPage>뉴스 모아보기</MenuItem> : <MenuItem>뉴스 모아보기</MenuItem>}
                    </Link>
                    <Link to="/search" style={{ textDecoration: "none", color: "black", width: "20%" }}>
                        {curruntURL == "/search" ? <MenuItem {...props} onPage>뉴스 찾아보기</MenuItem> : <MenuItem>뉴스 찾아보기</MenuItem>}
                    </Link>
                    <Link to="/board" style={{ textDecoration: "none", color: "black", width: "20%" }}>
                        {curruntURL == "/board" ? <MenuItem {...props} onPage>커뮤니티</MenuItem> : <MenuItem>커뮤니티</MenuItem>}
                    </Link>
                    <Link to="/profile" style={{ textDecoration: "none", color: "black", width: "20%" }}>
                        {curruntURL == "/profile" ? <MenuItem {...props} onPage>마이페이지</MenuItem> : <MenuItem>마이페이지</MenuItem>}
                    </Link>
                </MenuBox>
            </WrapperBottom>
        </Wrapper>
    )
}