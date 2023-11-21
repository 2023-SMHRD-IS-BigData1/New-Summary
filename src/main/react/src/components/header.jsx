import { Link } from "react-router-dom";
import styled, { css } from "styled-components";
import '../components/font.css';

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
    display: flex;
    justify-content: center;
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
    max-width: 200px;
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
            background: #F0BE4D;
            color: white;
        `
    }
`;

const InputBox = styled.form`
    width: 100%;
    max-width: 300px;
    height: 30px;
    padding-bottom: 5px;
    display: flex;
    align-items: center;
    justify-content: right;
`;

const InputItem = styled.input`
    width: 100%;
    height: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #999999;
    &:focus{
        border: 1px solid #F0BE4D;
    }
`;


export default function Header({ ...props }) {

    return (
        <Wrapper>
            <WrapperTop>
                <Link to="/" style={{ textDecoration: "none", color: "black" }}>
                    <Title>News Summary</Title>
                </Link>
                <LoginBox>
                    <Link to="/profile" style={{ textDecoration: "none", color: "black" }}>
                        <UserButton>마이페이지</UserButton>
                    </Link>
                    <Link to="/login" style={{ textDecoration: "none", color: "black" }}>
                        <UserButton>로그인</UserButton>
                    </Link>
                </LoginBox>
            </WrapperTop>
            <WrapperBottom>
                <MenuBox>
                    <Link to="/" style={{ textDecoration: "none", color: "black" , width: "20%" }}>
                        <MenuItem {...props} onPage>메인화면</MenuItem>
                    </Link>
                    <Link to="/daily-news" style={{ textDecoration: "none", color: "black" , width: "20%" }}>
                        <MenuItem>일간뉴스</MenuItem>
                    </Link>
                    <Link to="/category-news" style={{ textDecoration: "none", color: "black" , width: "20%" }}>
                        <MenuItem>카테고리</MenuItem>
                    </Link>
                    <Link to="/board" style={{ textDecoration: "none", color: "black" , width: "20%" }}>
                        <MenuItem>커뮤니티</MenuItem>
                    </Link>
                </MenuBox>
                <InputBox>
                    <InputItem />
                </InputBox>
            </WrapperBottom>
        </Wrapper>
    )
}