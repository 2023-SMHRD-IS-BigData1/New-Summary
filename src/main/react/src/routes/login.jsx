import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import LoginImage from '../assets/image/Login.jpg';
import SignupImage from '../assets/image/Sign-up.jpg';
import backLogo from '../assets/back-logo.svg'
import Kakao from '../assets/kakaotalk-logo.svg'
import Google from '../assets/google-logo.svg'
import Naver from '../assets/naver-logo.png'
import Github from '../assets/github-mark-white.svg'
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../data/user-login';

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
  gap: 10px;  
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
  &:focus {
    box-shadow: 0 0 5px #264653;
  }
  &#userPw,
  &#userName,
  &.userEmail {
    margin-bottom: 20px;
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
  &:hover {
    background-color: #2A9D8F;
    transition: .5s;
  }
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
  &:is(:visited) {
    color: #a6c9dd;
  }
  &:hover{
    color: #264653;
    transition: .5s;
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

// 중복확인을 위한 메세지 출력
const DuplicateBox = styled.div`
  height: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
`


export default function Login() {
  const [data, setData] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [isDuplicateEmail, setIsDuplicateEmail] = useState(false);
  const [isDuplicatePhone, setIsDuplicatePhone] = useState(false);
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const [isDuplicatePw, setIsDuplicatePw] = useState(false);
  const [signupFormData, setSignupFormData] = useState({
    userEmail: '',
    userPw: '',
    passwordCheck: '',
    userName: '',
    userPhone: '',
  });
  const [loginFormData, setLoginFormData] = useState({
    userEmail: '',
    userPw: '',
  });
  const navigate = useNavigate();


  // 중복 확인 함수
  const checkDuplicateEmail = async () => {
    const email = signupFormData.userEmail;
    const url = `/api/users/duplication-email/${email}`;
    try {
      const response = await axios.get(url);
      const responseData = response.data;

      if (responseData === true) {
        // if (response.data.isDuplicate) {
        setIsDuplicateEmail(true);
        console.log("이메일 중복");
      } else {
        setIsDuplicateEmail(false);
        console.log("사용가능한 이메일")
      }
    } catch (error) {
      console.error('중복 확인 에러:', error);
    }
  };

  const checkDuplicatePhone = async () => {
    const phone = signupFormData.userPhone;
    const url = `/api/users/duplication-phone/${phone}`;
    try {
      const response = await axios.get(url);
      const responseData = response.data;

      if (responseData === true) {
        setIsDuplicatePhone(true);
        console.log("핸드폰번호 중복");
      } else {
        setIsDuplicatePhone(false);
        console.log("사용가능한 핸드폰번호")
      }
    } catch (error) {
      console.error('중복 확인 에러:', error);
    }
  };

  const toggle = () => {
    setIsActive((prevIsActive) => !prevIsActive);
  };

  // 로그인 폼을 제출할 때 실행되는 함수
  const handleLoginSubmit = (e) => {
    e.preventDefault();

    // 비밀번호와 확인 비밀번호를 비교하여 일치 여부 확인
    if (signupFormData.userPw !== signupFormData.passwordCheck) {
      setIsDuplicatePw(true);
      return;
    }

    axios.post('/api/users/loginuser', loginFormData)
      .then(response => {
        console.log('로그인 응답 받음:', response.data);
        const userEmail = response.data.userEmail;
        if (!response.data) {
          alert("아이디와 비밀번호를 확인해주세요");
          return;
        }
        setIsLoggedIn(true);
        console.log("유저 로그인 성공");
        axios.get(`/api/users/${userEmail}`)
          .then(userResponse => {
            console.log('유저 정보 응답 받음:', userResponse.data);
            const userDataString = JSON.stringify(userResponse.data);
            sessionStorage.setItem('userData', userDataString);
            navigate('/');
          })
          .catch(userError => {
            console.error('유저 정보 요청 에러 발생:', userError);
          })
      })
      .catch(error => {
        console.error('로그인 에러 발생:', error);
      });

  };

  // 회원가입 폼을 제출할 때 실행되는 함수
  const handleSignupSubmit = (e) => {
    e.preventDefault();

    axios.post('/api/users/join', signupFormData)
      .then(response => {
        console.log('회원가입 응답 받음:', response.data);
        window.alert('회원가입이 성공적으로 완료되었습니다!');
        window.location.reload()
      })
      .catch(error => {
        console.error('회원가입 에러 발생:', error);
      });
  };


  return (
    <Body>
      <Wrapper className={isActive ? 'active' : ''}>
        <LeftBox className="left">
          <ImageBox className="inputImage" src={LoginImage} alt="" />
          <SignupBox className="sign-up">
            <BoxTextHead>Create An Account</BoxTextHead>
            <FormBox action="/api/users/join" method='post' onSubmit={handleSignupSubmit}>
              <InputBox
                type="email"
                placeholder="Email Address"
                name="userEmail"
                id="userEmail"
                value={signupFormData.userEmail}
                onChange={(e) => setSignupFormData({ ...signupFormData, userEmail: e.target.value })}
                onBlur={checkDuplicateEmail} //focus가 해제될 때 중복 확인
                isDuplicate={isDuplicateEmail} // 중복 여부에 따라 스타일을 변경
              />
              <DuplicateBox>
                {/* signupFormData.userEmail이 존재할 때만 메시지를 보여준다 */}
                {signupFormData.userEmail && (
                  <>
                    {isDuplicateEmail
                      ? "이미 사용 중인 이메일입니다 ❌"
                      : "사용 가능한 이메일입니다 ✔️"}
                  </>
                )}
              </DuplicateBox>
              <InputBox
                type="password"
                placeholder="Create Password"
                name="userPw"
                id="userPw"
                value={signupFormData.userPw}
                onChange={(e) => {
                  setSignupFormData({ ...signupFormData, userPw: e.target.value });
                  setIsDuplicatePw(e.target.value !== signupFormData.passwordCheck);
                }}
              />
              <InputBox
                type="password"
                placeholder="Confirm Password"
                name="passwordCheck"
                id="passwordCheck"
                value={signupFormData.passwordCheck}
                onChange={(e) => {
                  setSignupFormData({ ...signupFormData, passwordCheck: e.target.value });
                  setIsDuplicatePw(e.target.value !== signupFormData.userPw);
                }}
              />
              <DuplicateBox>
                {signupFormData.passwordCheck && (
                  <>
                    {isDuplicatePw
                      ? "비밀번호가 다릅니다 ❌"
                      : "비밀번호가 일치합니다 ✔️"}
                  </>
                )}
              </DuplicateBox>
              <InputBox
                type="text"
                placeholder="Username"
                name="userName"
                id="userName"
                value={signupFormData.userName}
                onChange={(e) => setSignupFormData({ ...signupFormData, userName: e.target.value })}
              />
              <InputBox
                type="text"
                placeholder="Phone Number"
                name="userPhone"
                id="userPhone"
                value={signupFormData.userPhone}
                onChange={(e) => setSignupFormData({ ...signupFormData, userPhone: e.target.value })}
                onBlur={checkDuplicatePhone}
                isDuplicate={isDuplicatePhone}
              />
              <DuplicateBox>
                {signupFormData.userPhone && (
                  <>
                    {isDuplicatePhone
                      ? "이미 사용 중인 번호입니다 ❌"
                      : "사용 가능한 번호입니다 ✔️"}
                  </>
                )}
              </DuplicateBox>
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
            <FormBox action="/api/users/loginuser" method="post" onSubmit={handleLoginSubmit}>
              <InputBox
                type="email"
                placeholder="Email Address"
                name="userEmail"
                className='userEmail'
                value={loginFormData.userEmail}
                onChange={(e) => setLoginFormData({ ...loginFormData, userEmail: e.target.value })}
              />
              <InputBox
                type="password"
                placeholder="Password"
                name="userPw"
                value={loginFormData.userPw}
                onChange={(e) => setLoginFormData({ ...loginFormData, userPw: e.target.value })}
              />
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
              <a href='https://kauth.kakao.com/oauth/authorize?client_id=a5336752ae75dfa19b52019c374a13c6&redirect_uri=http://localhost:8081/member/kakao&response_type=code'>
                <SocialButtonKakao>
                  <SocialButtonImage src={Kakao} />
                </SocialButtonKakao>
              </a>
              {/* <SocialButtonNaver>
                <SocialButtonImage src={Naver} />
              </SocialButtonNaver>
              <SocialButtonGithub>
                <SocialButtonImage src={Github} />
              </SocialButtonGithub> */}
            </SocialBox>
          </LoginBox>
        </RightBox>
        <Link to="/">
          <BackButton src={backLogo} />
        </Link>
      </Wrapper>
    </Body>
  );
}
