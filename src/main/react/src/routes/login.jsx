import { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import LoginImage from '../assets/image/Login.jpg';
import SignupImage from '../assets/image/Sign-up.jpg';
import backLogo from '../assets/back-logo.svg'
import Kakao from '../assets/kakaotalk-logo.svg'
import Google from '../assets/google-logo.svg'
import Naver from '../assets/naver-logo.png'
import Github from '../assets/github-mark-white.svg'
import { Link } from 'react-router-dom';

const Body = styled.div`
  width: 100%;
  min-height: 100vh;
  display: grid;
  place-content: center;
  background: #7686a055;
  padding: 50px;
  font-family: sans-serif;
`;

const Wrapper = styled.div`
  width: 1200px;
  height: 600px;
  display: flex;
  overflow: hidden;
  border-radius: 10px;
  &.active {
    .left {
      transform: translateY(-600px);
    }
    .right {
      transform: translateY(0);
    }
  }
  @media (max-width: 1220px) {
    width: 600px;
    flex-direction: column;
    &.active {
    .left {
        transform: translateY(0) !important;
      }
    .right {
      transform: translateY(600px) !important;
    }
  }
  }
`;

const LeftBox = styled.div`
  width: 600px;
  height: 1200px;
  background: #fff;
  display: flex;
  flex-direction: column;
  transition: 1s;
  &.inputImage {
    max-width: 100%;
  }
  @media (max-width: 1220px){
    transform: translateY(600px);
  }
`;

const RightBox = styled.div`
  width: 600px;
  height: 1200px;
  background: #fff;
  position: relative;
  display: flex;
  flex-direction: column;
  transition: 1s;
  transform: translateY(-600px);
  &.inputImage {
    max-width: 100%;
  }
  @media (max-width: 1220px){
    transform: translateY(-600px);
}
`;

const ImageBox = styled.img`
 width: 600px;
 height: 600px;
 @media (max-width: 1220px){
  display: none;
 }
`;

const SignupBox = styled.div`
  display: grid;
  place-content: center;
  height: 600px;
`;

const LoginBox = styled.div`
  height: 600px;
  display: grid;
  place-content: center;
`;

const BoxTextHead = styled.div`
  font-size: 30px;
  font-weight: 600;
  margin-bottom: 50px;
  text-align: center;
`;

const FormBox = styled.form`
  display: flex;
  flex-direction: column;
  width: 340px;
  gap: 20px;  
`;

const InputBox = styled.input`
  border: 0;
  outline: 0;
  background: #f5f5f5;
  padding: 10px 5px;
  border-radius: 5px;
  padding-left: 10px;
  &::placeholder {
    color: #333333;
    text-transform: capitalize;
    font-weight: bold;
  }
`;

const SubmitBox = styled.div`
  display: flex;
  margin: 10px 0;
  justify-content: center;
  align-items: center;
`;

const SubmitButton = styled.input`
  border: 0;
  outline: 0;
  display: grid;
  place-content: center;
  max-width: fit-content;
  padding: 0.5em 1em;
  color: #ffffff;
  background: #a6c9dd;
  border-radius: 5px;
  cursor: pointer;
  text-transform: capitalize;
  font-size: 1.2em;
`;

const BottomText = styled.div`
  text-align: center;
  text-transform: uppercase;
  margin-top: 20px;
`;

const LinkBox = styled.a`
  margin-left: 20px;
  text-decoration: none;
  font-weight: bold;
  color: #a6c9dd;
  &:is(:hover, :visited) {
    color: #a6c9dd;
  }
`;
const BackButton = styled.img`
  width: 50px;
  height: 50px;
  padding: 10px;
  position: absolute;
  top: 20px;
  left: 20px;
  &:hover{
    border-radius: 50%;
    background-color: white;
    transition: 0.5s;
  }
`;

const SocialBox = styled.div`
  width: 100%;
  height: 50px;
  margin-top: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  gap: 30px;
`;

const SocialButtonKakao = styled.div`
  width: 50px;
  height: 50px;
  padding: 5px;
  border-radius: 50%;
  background-color: #FFE812;
  cursor: pointer;
  `;

const SocialButtonGoogle = styled.div`
  width: 50px;
  height: 50px;
  padding: 5px;
  border-radius: 50%;
  border: 1px solid #99999944;
  background-color: #ffffff;
  cursor: pointer;
  `;

const SocialButtonNaver = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 1px solid #99999944;
  background-color: #03c75a;
  cursor: pointer;
  `;

const SocialButtonGithub = styled.div`
  width: 50px;
  height: 50px;
  padding: 5px;
  border-radius: 50%;
  background-color: #010409;
  cursor: pointer;
  `;

const SocialButtonImage = styled.img`
  width: 100%;
  border-radius: 50%;
`;





export default function Login() {
  const [data, setData] = useState('');
  const [isActive, setIsActive] = useState(false);

  const toggle = () => {
    setIsActive((prevIsActive) => !prevIsActive);
  };

  useEffect(() => {
    //java에서 데이터 가져오기
    axios.get('/api/data')
      .then(res => setData(res.data))
      .catch(error => {
        if (error.response) {
          // 서버에서 응답이 왔으나 응답 코드가 2xx가 아닌 경우
          console.error('에러 응답:', error.response.data);
          console.error('에러 상태 코드:', error.response.status);
        } else if (error.request) {
          // 요청이 서버에 도달하지 않은 경우
          console.error('요청이 서버에 도달하지 않음:', error.request);
        } else {
          // 요청을 보내기 전에 발생한 에러
          console.error('에러 설정:', error.config);
        }
      })
  }, []);
  return (
    <Body>
      <Wrapper className={isActive ? 'active' : ''}>
        <LeftBox className="left">
          <ImageBox className="inputImage" src={LoginImage} alt="" />
          <SignupBox className="sign-up">
            <BoxTextHead>Create An Account</BoxTextHead>
            <FormBox action="">
              <InputBox type="text" placeholder="Username" />
              <InputBox type="email" placeholder="Email Address" />
              <InputBox type="password" placeholder="Create Password" />
              <InputBox type="password" placeholder="Confirm Password" />
              <SubmitBox>
                <SubmitButton type="submit" value="Sign Up" />
              </SubmitBox>
            </FormBox>
            <BottomText>
              가입한 아이디가 있으신가요? 
              <LinkBox href="#" id="sign-in" onClick={() => toggle()}>로그인</LinkBox>
            </BottomText>
          </SignupBox>
        </LeftBox>
        <RightBox className="right">
          <ImageBox className="inputImage" src={SignupImage} />
          <LoginBox className="login">
            <BoxTextHead>Log In</BoxTextHead>
            <FormBox action="">
              <InputBox type="email" placeholder="Email Address" />
              <InputBox type="password" placeholder="Password" />
              <SubmitBox>
                <SubmitButton type="submit" value="Login" />
              </SubmitBox>
            </FormBox>
            <BottomText>
              가입한 아이디가 없으신가요?  
              <LinkBox href="#" onClick={() => toggle()}>회원가입</LinkBox>
            </BottomText>
            <SocialBox>
              <SocialButtonGoogle>
                <SocialButtonImage src={Google} />
              </SocialButtonGoogle>
              <SocialButtonKakao>
                <SocialButtonImage src={Kakao} />
              </SocialButtonKakao>
              <SocialButtonNaver>
                <SocialButtonImage src={Naver} />
              </SocialButtonNaver>
              <SocialButtonGithub>
                <SocialButtonImage src={Github} />
              </SocialButtonGithub>
            </SocialBox>
          </LoginBox>
        </RightBox>
        <Link to="/">
          <BackButton src={backLogo} />
        </Link>
      </Wrapper>
    </Body>
  )
}