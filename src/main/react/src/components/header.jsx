import { Link, useLocation } from "react-router-dom";
import styled, { css } from "styled-components";
import '../components/font.css';
import { useEffect, useState } from "react";
import { useAuth } from "../data/user-login";
import UserLogo from "../assets/image/user-avatar.png"

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
    z-index: 199;
    @media screen and (max-width: 412px) {
        max-width: 412px;
        height: 80px;
    }
`;

const WrapperTop = styled.div`
    width: 100%;
    height: 80px;
    max-width: 1400px;
    padding: 0 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    @media screen and (max-width: 412px) {
        max-width: 412px;
    }
`;

const WrapperBottom = styled.div`
    width: 100%;
    height: 40px;
    max-width: 1400px;
    padding: 0 50px;
    display: flex;
    align-items: center;
    @media screen and (max-width: 412px) {
        visibility: hidden;
    }
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
    @media screen and (max-width: 412px) {
        width: 120px;
        font-size: 24px;
    }
`;

const LoginBox = styled.div`
    width: 300px;
    height: 80px;
    padding-right: 50px;
    display: flex;
    justify-content: right;
    align-items: center;
    @media screen and (max-width: 412px) {
        visibility: hidden;
    }
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
    max-width: 1400px;
    height: 40px;
    padding-right: 50px;
    display: flex;
    align-items: center;
    justify-content: left;
    position: relative;
`;

const MenuHambergerBox = styled.div`
    width: 100px;
    height: 40px;
    padding-right: 50px;
    display: none;
    align-items: center;
    justify-content: right;
    position: relative;
    visibility: hidden;
    background-color: aqua;
    @media screen and (max-width: 412px) {
        display: flex;
        visibility: visible;
    }
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

// 유저 로그인시 출력하는 데이터
const UserDataBox = styled.div`
    padding: 10px;
    gap: 10px;
    margin-right: 20px;
    display: flex;
    justify-content: space-around;
    align-items: center;
`;

const UserDataImageBox = styled.div`
    width: 25px;
    height: 25px;
    border-radius: 50%;
    background-color: gray;
    margin-right: 10px;
    position: relative;
    overflow: hidden;
`;

const UserDataImage = styled.img`
    width: 100%;
    position: absolute;
    top: 2px;
`;

const UserDataName = styled.div``;



export default function Header({ ...props }) {
    const { isLoggedIn, setIsLoggedIn } = useAuth();
    const location = useLocation();

    let userData;
    const curruntURL = location.pathname;
    const userDataString = sessionStorage.getItem('userData');

    if (userDataString) {
        userData = JSON.parse(userDataString);
    } else {
        console.error('세션스토리지에 userData가 존재하지 않습니다.');
    }

    // 로그아웃을 처리하는 함수
    const handleLogout = () => {
        sessionStorage.removeItem('userData');
        console.log('로그아웃 성공!');
        navigate('/');
    };

    return (
        <Wrapper>
            <WrapperTop>
                <Link to="/" style={{ textDecoration: "none", color: "black" }}>
                    <Title>News Summary</Title>
                </Link>
                <LoginBox>
                    {isLoggedIn ? (
                        <>
                            <Link to="/profile" style={{ textDecoration: "none", color: "black" }}>
                                <UserDataBox>
                                    <UserDataImageBox>
                                        <UserDataImage src={userData.userProfile || UserLogo} alt="User Profile" />
                                    </UserDataImageBox>
                                    <UserDataName>{userData.userName} 님</UserDataName>
                                </UserDataBox>
                            </Link>
                            <Link to="/" onClick={handleLogout} style={{ textDecoration: "none", color: "black" }}>
                                <UserButton>로그아웃</UserButton>
                            </Link>
                        </>
                    ) : (
                        <Link to="/login" style={{ textDecoration: "none", color: "black" }}>
                            <UserButton>로그인</UserButton>
                        </Link>
                    )}
                    <MenuHambergerBox>
                        {/* <Link to="/" style={{ textDecoration: "none", color: "black", width: "20%" }}>
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
                        </Link> */}
                    </MenuHambergerBox>
                </LoginBox>
            </WrapperTop>
            <WrapperBottom>
                <MenuBox>
                    <Link to="/" style={{ textDecoration: "none", color: "black", width: "25%" }}>
                        {curruntURL == "/" ? <MenuItem {...props} onPage>메인페이지</MenuItem> : <MenuItem>메인페이지</MenuItem>}
                    </Link>
                    <Link to="/category-news" style={{ textDecoration: "none", color: "black", width: "25%" }}>
                        {curruntURL == "/category-news" ? <MenuItem {...props} onPage>뉴스 모아보기</MenuItem> : <MenuItem>뉴스 모아보기</MenuItem>}
                    </Link>
                    <Link to="/search" style={{ textDecoration: "none", color: "black", width: "25%" }}>
                        {curruntURL == "/search" ? <MenuItem {...props} onPage>뉴스 찾아보기</MenuItem> : <MenuItem>뉴스 찾아보기</MenuItem>}
                    </Link>
                    <Link to="/board" style={{ textDecoration: "none", color: "black", width: "25%" }}>
                        {curruntURL == "/board" ? <MenuItem {...props} onPage>커뮤니티</MenuItem> : <MenuItem>커뮤니티</MenuItem>}
                    </Link>
                    <Link to="/profile" style={{ textDecoration: "none", color: "black", width: "25%" }}>
                        {curruntURL == "/profile" ? <MenuItem {...props} onPage>마이페이지</MenuItem> : <MenuItem>마이페이지</MenuItem>}
                    </Link>
                </MenuBox>
            </WrapperBottom>
        </Wrapper>
    )
}