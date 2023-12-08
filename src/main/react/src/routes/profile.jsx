import { useEffect, useState } from 'react';
import Header from "../components/header"
import axios from 'axios';
import styled from 'styled-components';
import Footer from '../components/footer';
import DoughnutComponent from '../components/doughnut';
import { LineComponent } from '../components/linechart';
import UserDefault from '../assets/image/user-avatar.png';
import Pencil from '../assets/pencil-logo.svg'
import Coin from '../assets/coin-logo.svg'
import Exclamation from '../assets/exclamation-circle.svg'
import MypagePaging from '../components/pagination';
import { BookMarkNewsComponent } from '../components/news';
import EmailLogo from '../assets/email-logo.svg';
import UserLogo from '../assets/user-logo.svg';
import PasswordLogo from '../assets/password-logo.svg';
import PhoneLogo from '../assets/phone-logo.svg';
import { BoardProfile } from '../components/board-sns';
import { BrowserRouter as Router } from 'react-router-dom';

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  padding-top: 120px;
  gap: 50px;
  position: relative;
`;

const WrapperBox = styled.div`
  width: 100%;
  max-width: 1400px;
  height: auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 50px;
  padding: 100px 50px 200px 50px;
  /* padding-bottom: 200px; */
  margin: auto;
  position: relative;
  `;

const LeftMenu = styled.div`
    width: 100%;
    max-width: 300px;
    height: 600px;
    padding: 10px 20px 30px 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-radius: 10px;
    border: 1px solid #99999922;
    box-shadow: 5px 5px 5px 2px #99999944;
    background-color: #ffffff;
  `;

const Content = styled.div`
  width: 100%;
  max-width: 1200px;
  height: auto;
  flex-direction: column;
  justify-content: flex-start;
  display: ${({ active }) => (active ? 'flex' : 'none')};
`;

const HeaderBox = styled.div`
  width: 100%;
  max-width: 1200px;
  padding: 20px 30px;
  font-size: 24px;
  background-color: #ffffff;
`;

const GraphBox = styled.div`
  width: 100%;
  max-width: 1200px;
  height: 500px;
  padding: 25px;
  margin-bottom: 50px;
  border: 1px solid #99999922;
  background-color: #ffffff;
`;

const UserImageBox = styled.div`
  width: 80%;
  border-radius: 50%;
  margin: auto;
  border: 1px solid #99999944;
  overflow: hidden;
`;

const UserImage = styled.img`
  width: 100%;
  transform: translateY(20px);
`;

const UserNickname = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 10px 10px 10px;
  font-size: 24px;
`;

const UserPoint = styled.div`
  width: 100%;
  padding: 10px;
  font-size: 18px;
  display: flex;
  justify-content: right;
  align-items: center;
  border-bottom: 1px solid #99999944;
  margin-bottom: 30px;
`;

const PointImage = styled.img`
  width: 25px;
  height: 25px;
  margin-right: 10px;
`;

const PointexplanationBox = styled.div`
  width: 25px;
  height: 25px;
  position: relative;
  display: inline-block;
  cursor: pointer;
  &:hover {
    .tip {
    visibility: visible;
    opacity: 1;
    transition: opacity 0.7s;
    }
  }
`;

const Pointexplanation = styled.img`
  width: 25px;
  height: 25px;
  margin-left: 10px;
`;

const ExplanationTip = styled.div`
    visibility: hidden;
    width: 240px;
    background: #333;
    color: #fff;
    text-align: center;
    padding: 10px;
    border-radius: 7px;
    position: absolute;
    line-height: 1.2;
    z-index: 100;
    top: -28px;
    left: 210%;
    opacity: 0.1;
    &::after {
      content: "";
      position: absolute;
      border-top: 6px solid transparent;
      border-right: 12px solid #333;
      border-bottom: 6px solid transparent;
      border-left: 12px solid transparent;
      top: 31%;
      right: 100%;
    }
`;

const TipHead = styled.div`
  width: 100%;
  padding-bottom: 10px;
`;

const LeftMenuItem = styled.div`
    width: 100%;
    height: 40px;
    padding: 25px;
    display: flex;
    align-items: center;
    font-size: 18px;
    cursor: pointer;
    color: ${(props) => (props.active ? '#ffffff' : '#000000')};
    background-color: ${(props) => (props.active ? '#264653' : '#ffffff')};
    &:hover {
      background: #F0BE4D;
      color: white;
      transition: 0.5s;
  }
`;

const SecessionBtn = styled.div`
  width: 100px;
  height: 40px;
  border-radius: 10px;
  border: 1px solid #99999944;
  color: #ffffff;
  background-color: #fa4f4f;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 50px;
  cursor: pointer;
  &:hover{
    background-color: #ff0000;
    color: #000000;
    transition: .5s;
  }
`;

const ProfileBack = styled.div`
  width: 100%;
  height: 300px;
  position: absolute;
  background-color: #F4A261;
`;


// 프로필 수정 페이지 컴포넌트
const ProfileUpdateForm = styled.form`
  width: 100%;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 100px;
  background-color: #ffffff;
`;

const ProfileUpdateBox = styled.div`
  width: 100%;
  height: 80px;
  padding: 20px 0px;  
  position: relative; 
  display: flex;
  justify-content: space-around;
  align-items: center;
  &:last-child {
    border: none;
  }
`;

const ProfileUpdateTop = styled.div`
  width: 100%;
  padding: 20px 0px;  
  position: relative; 
  display: flex;
  justify-content: space-around;
  align-items: center;
  &:last-child {
    border: none;
  }
`;

const ProfileUpdateLogo = styled.img`
  width: 40px;
  height: 40px;
  padding: 8px;
  position: absolute;
  top: 20px;
  left: 16%;
  color: #7875B5;
`;

const ProfileUpdateInput = styled.input`
  border: none;
  border-bottom: 3px solid #D1D1D4;
  background: none;
  padding: 10px;
  padding-left: 16%;
  font-weight: 700;
  font-size: 18px;
  width: 75%;
  transition: .2s;
  &:active,
  &:focus,
  &:hover {
    outline: none;
    border-color: #00ae68;
  }
  &:focus {
    color: #000000;
  }
  &::placeholder {
    color: #bbbbbb;
  }
`;

const ProfileUpdateBtn = styled.button`
  padding: 10px 20px;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  cursor: pointer;
  background-color: #2A9D8F;
  font-weight: 600;
  &:hover {
    color: #ffffff;
    background-color: #264653;
    transition: .5s;
  }
`;

const ProfileUpdateBoxTop = styled.div`
  width: 75%;
  display: flex;
  justify-content: space-around;
`;

const ProfileBoxArea = styled.div`
  width: 50%;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const ProfileHeader = styled.div`
  padding-right: 100px;
  margin-bottom: 200px;
  font-size: 24px;
  font-weight: 600;
  white-space: nowrap;
`;

const ProfileImageBox = styled.div`
  width: 80%;
  border-radius: 50%;
  margin: auto;
  margin-bottom: 20px;
  border: 1px solid #99999944;
  overflow: hidden;
`;

const ProfileImage = styled.img`
  width: 100%;
  transform: translateY(30px);
`;

const ProfileImgLabel = styled.label`
  margin-top: 30px;
  background-color: #2A9D8F;
  text-align: center;
  padding: 10px 0;
  width: 65%;
  margin: auto;
  border-radius: 6px;
  cursor: pointer;
  &:hover {
    color: #ffffff;
    background-color: #264653;
    transition: .5s;
  }
`;

const ProfileImgInput = styled.input`
  display: none;
`;



export default function Profile() {
  const [onMenu, setOnMenu] = useState('content1');

  let userData;
  const userDataString = sessionStorage.getItem('userData');

  if (userDataString) {
      userData = JSON.parse(userDataString);
  } else {
      console.error('세션스토리지에 userData가 존재하지 않습니다.');
  }

  const handleContentClick = (contentClass) => {
    setOnMenu(contentClass);
  };
  return (
    <Wrapper>
      <Header></Header>
      <ProfileBack></ProfileBack>
      <WrapperBox>
        <LeftMenu>
          <UserImageBox>
            <UserImage src={userData.userProfile || UserDefault} />
          </UserImageBox>
          <UserNickname>{userData.userName}</UserNickname>
          <UserPoint>
            <PointImage src={Coin} />2000 P
            <PointexplanationBox>
              <Pointexplanation src={Exclamation} />
              <ExplanationTip className="tip">
                <TipHead>포인트 획득 기준</TipHead>
                뉴스 조회시 : 10 P<br />
                커뮤니티 글작성 : 20 P<br />
                커뮤니티 댓글작성 : 10 P<br />
              </ExplanationTip>
            </PointexplanationBox>
          </UserPoint>
          <LeftMenuItem onClick={() => handleContentClick('content1')} active={onMenu === 'content1'}>뉴스 시청기록</LeftMenuItem>
          <LeftMenuItem onClick={() => handleContentClick('content2')} active={onMenu === 'content2'}>북마크 뉴스</LeftMenuItem>
          <LeftMenuItem onClick={() => handleContentClick('content3')} active={onMenu === 'content3'}>내가 작성한글</LeftMenuItem>
          <LeftMenuItem onClick={() => handleContentClick('content4')} active={onMenu === 'content4'}>개인정보수정</LeftMenuItem>
          <SecessionBtn>회원탈퇴</SecessionBtn>
        </LeftMenu>
        {/* 뉴스 시청기록 */}
        <Content className={onMenu} active={onMenu === 'content1'}>
          <HeaderBox>카테고리별 조회기록</HeaderBox>
          <GraphBox>
            <DoughnutComponent />
          </GraphBox>
          <HeaderBox>일일뉴스 조회기록</HeaderBox>
          <GraphBox>
            <LineComponent />
          </GraphBox>
        </Content>
        {/* 북마크 뉴스 */}
        <Content className={`content2 ${onMenu === 'content2' ? 'active' : ''}`} active={onMenu === 'content2'}>
          <BookMarkNewsComponent />
        </Content>
        {/* 내가 작성한 글 */}
        <Content className={`content3 ${onMenu === 'content3' ? 'active' : ''}`} active={onMenu === 'content3'}>
          <BoardProfile />
        </Content>
        {/* 개인정보 수정 */}
        <Content className={`content4 ${onMenu === 'content4' ? 'active' : ''}`} active={onMenu === 'content4'}>
          <ProfileUpdateForm action=''>
            <ProfileUpdateTop>
              <ProfileUpdateBoxTop>
                <ProfileBoxArea>
                  <ProfileHeader>내정보</ProfileHeader>
                </ProfileBoxArea>
                <ProfileBoxArea>
                  <ProfileImageBox>
                    <ProfileImage src={UserDefault} />
                  </ProfileImageBox>
                  <ProfileImgLabel class="file-label" for="chooseFile">Image Upload</ProfileImgLabel>
                  <ProfileImgInput  class="file" id="chooseFile" type="file" multiple />
                </ProfileBoxArea>
              </ProfileUpdateBoxTop>
            </ProfileUpdateTop>
            <ProfileUpdateBox>
              <ProfileUpdateLogo src={EmailLogo} />
              <ProfileUpdateInput type='email' value={userData.userEmail} disabled />
            </ProfileUpdateBox>
            <ProfileUpdateBox>
              <ProfileUpdateLogo src={UserLogo} />
              <ProfileUpdateInput type='text' value={userData.userName} />
            </ProfileUpdateBox>
            <ProfileUpdateBox>
              <ProfileUpdateLogo src={PasswordLogo} />
              <ProfileUpdateInput type='password' placeholder="password" />
            </ProfileUpdateBox>
            <ProfileUpdateBox>
              <ProfileUpdateLogo src={PasswordLogo} />
              <ProfileUpdateInput type='password' placeholder="password" />
            </ProfileUpdateBox>
            <ProfileUpdateBox>
              <ProfileUpdateLogo src={PhoneLogo} />
              <ProfileUpdateInput value={userData.userPhone} />
            </ProfileUpdateBox>
            <ProfileUpdateBox>
              <ProfileUpdateBtn type='submit'>수정하기</ProfileUpdateBtn>
            </ProfileUpdateBox>
          </ProfileUpdateForm>
        </Content>
      </WrapperBox>
      <Footer></Footer>
    </Wrapper>
  )
}