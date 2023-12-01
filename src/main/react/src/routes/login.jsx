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
  &:focus {
    box-shadow: 0 0 5px #264653;
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
  // 중복 확인 상태 추가
  const [isDuplicateEmail, setIsDuplicateEmail] = useState(false);

  // 중복 확인 함수
  const checkDuplicateEmail = async () => {
    const email = signupFormData.userEmail;

    // 한글 URL
    const url = `/api/users/duplication-email?email=${encodeURIComponent(email)}`;

    try {
      const response = await axios.get(url);

      // 서버 응답 처리
      if (response.data.isDuplicate) {
        // 중복된 이메일인 경우
        setIsDuplicateEmail(true);
      } else {
        // 중복되지 않은 이메일인 경우
        setIsDuplicateEmail(false);
      }
    } catch (error) {
      console.error('중복 확인 에러:', error);
    }
  };
  

  // 각각의 폼에 대한 데이터 상태 추가
  const [signupFormData, setSignupFormData] = useState({
    userEmail: '',
    userPw: '',
    passwordCheck: '',
    userName: '',
    userPhone: '',
  });

  const [loginFormData, setLoginFormData] = useState({
    email: '',
    password: '',
  });

  const toggle = () => {
    setIsActive((prevIsActive) => !prevIsActive);
  };

  const [userEmail, setUserEmail] = useState("");
  const [userPw, setUserPw] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [userName, setUserName] = useState("");
  const [userPhone, setUserPhone] = useState("");

  const handleUserEmail = (e) => {
    setUserEmail(e.target.value);
  };

  const handleUserPw = (e) => {
    setUserPw(e.target.value);
  };

  const handlePasswordCheck = (e) => {
    setPasswordCheck(e.target.value);
  };

  const handletUserName = (e) => {
    setUserName(e.target.value);
  };

  const handleUserPhone = (e) => {
    setUserPhone(e.target.value);
  };

  const onClickLogin = () => {
    console.log("click login");
    console.log("ID : ", inputId);
    console.log("PW : ", inputPw);
    axios
      .post("http://localhost:8081/users/join", {
        userEmail: userEmail,
        userPw: userPw,
        passwordCheck: passwordCheck,
        userName: userName,
        userPhone: userPhone,
      })
      .then((res) => {
        console.log(res);
        console.log("res.data.userEmail :: ", res.data.userEmail);
        console.log("res.data.msg :: ", res.data.msg);
        if (res.data.userEmail === undefined) {
          // id 일치하지 않는 경우 userId = undefined, msg = '입력하신 id 가 일치하지 않습니다.'
          console.log("======================", res.data.msg);
          alert("입력하신 id 가 일치하지 않습니다.");
        } else if (res.data.userEmail === null) {
          // id는 있지만, pw 는 다른 경우 userId = null , msg = undefined
          console.log(
            "======================",
            "입력하신 비밀번호 가 일치하지 않습니다."
          );
          alert("입력하신 비밀번호 가 일치하지 않습니다.");
        } else if (res.data.userEmail === inputId) {
          // id, pw 모두 일치 userId = userId1, msg = undefined
          console.log("======================", "로그인 성공");
          sessionStorage.setItem("user_id", inputId); // sessionStorage에 id를 user_id라는 key 값으로 저장
          sessionStorage.setItem("name", res.data.name); // sessionStorage에 id를 user_id라는 key 값으로 저장
        }
        // 작업 완료 되면 페이지 이동(새로고침)
        document.location.href = "/";
      })
      .catch();
  };



  // 로그인 폼을 제출할 때 실행되는 함수
  const handleLoginSubmit = (e) => {
    e.preventDefault();

    // axios를 사용하여 로그인 데이터를 백엔드로 보냅니다.
    axios.post('/api/login', loginFormData)
      .then(response => {
        // 성공적으로 응답을 받았을 때 수행할 작업을 여기에 추가합니다.
        console.log('로그인 응답 받음:', response.data);
        history.push('/');
      })
      .catch(error => {
        // 요청이 실패했을 때 수행할 작업을 여기에 추가합니다.
        console.error('로그인 에러 발생:', error);
        // history.push('/login');
      });
  };
  

  // 회원가입 폼을 제출할 때 실행되는 함수
  const handleSignupSubmit = (e) => {
    e.preventDefault();

    // axios를 사용하여 회원가입 데이터를 백엔드로 보냅니다.
    axios.post('/api/users/join', {
      userEmail: userEmail,
      userPw: userPw,
      passwordCheck: passwordCheck,
      userName: userName,
      userPhone: userPhone,
    })
      .then(response => {
        console.log('회원가입 응답 받음:', response.data);
      })
      .catch(error => {
        console.error('회원가입 에러 발생:', error);
      });
    // history.push('/login')
  };


  // const signUpDB = (...signupFormData) => {
  //   return function (dispatch, getState, { history }) {
  //     axios({
  //       method: "post",
  //       url: "/api/users/join",
  //       data: {
  //         userEmail: userEmail,
  //         userPw: userPw,
  //         passwordCheck: passwordCheck,
  //         userName: userName,
  //         userPhone: userPhone,
  //       },
  //     })
  //       .then((res) => {
  //         window.alert(res.data.result);
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   };
  // };

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
                isDuplicate={isDuplicateEmail} // 추가: 중복 여부에 따라 스타일을 변경하기 위한 속성
              />
              <InputBox
                type="password"
                placeholder="Create Password"
                name="userPw"
                id="userPw"
                value={signupFormData.userPw}
                onChange={(e) => setSignupFormData({ ...signupFormData, userPw: e.target.value })}
              />
              <InputBox
                type="password"
                placeholder="Confirm Password"
                name="passwordCheck"
                id="passwordCheck"
                value={signupFormData.passwordCheck}
                onChange={(e) => setSignupFormData({ ...signupFormData, passwordCheck: e.target.value })}
              />
              <InputBox
                type="text"
                placeholder="Username"
                name="userName"
                id="userName"
                value={signupFormData.username}
                onChange={(e) => setSignupFormData({ ...signupFormData, username: e.target.value })}
              />
              <InputBox
                type="text"
                placeholder="Phone Number"
                name="userPhone"
                id="userPhone"
                value={signupFormData.userPhone}
                onChange={(e) => setSignupFormData({ ...signupFormData, userPhone: e.target.value })}
              />
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
            <FormBox action="/api/login" onSubmit={handleLoginSubmit}>
              <InputBox
                type="email"
                placeholder="Email Address"
                name="userEmail"
                value={loginFormData.email}
                onChange={(e) => setLoginFormData({ ...loginFormData, email: e.target.value })}
              />
              <InputBox
                type="password"
                placeholder="Password"
                name="userPw"
                value={loginFormData.password}
                onChange={(e) => setLoginFormData({ ...loginFormData, password: e.target.value })}
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
