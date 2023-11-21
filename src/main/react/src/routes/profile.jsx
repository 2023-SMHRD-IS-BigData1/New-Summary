import { useEffect, useState } from 'react';
import Header from "../components/header"
import axios from 'axios';
import styled from 'styled-components';
import Footer from '../components/footer';
import DoughnutComponent from '../components/doughnut';
import { LineComponent } from '../components/linechart';
import UserDefault from '../assets/image/user-avatar.png';
import Pencil from '../assets/pencil-logo.svg'
import MypagePaging from '../components/pagination';

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  padding-top: 120px;
  gap: 50px;
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
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-radius: 10px;
    border: 1px solid #99999922;
    box-shadow: 5px 5px 5px 2px #99999944;
  `;

const Content = styled.div`
  width: 100%;
  max-width: 1200px;
  height: auto;
  flex-direction: column;
  justify-content: center;
  display: ${({ active }) => (active ? 'flex' : 'none')};
`;

const HeaderBox = styled.div`
  width: 100%;
  max-width: 1200px;
  padding: 20px 30px;
  font-size: 28px;
`;

const GraphBox = styled.div`
  width: 100%;
  max-width: 1200px;
  height: 500px;
  padding: 25px;
  margin-bottom: 50px;
  border: 1px solid #99999922;
  box-shadow: 5px 5px 5px 2px #99999944;
`;

const UserImage = styled.img`
  width: 100%;
  border-radius: 50%;
  border: 1px solid #99999944;
`;

const UserNickname = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 30px 10px 30px 25px;
  margin-bottom: 10px;
  font-size: 24px;
  border-bottom: 1px solid #99999944;
`;

const UserInputButton = styled.img`
  width: 25px;
  height: 25px;
  margin-left: 10px;
  cursor: pointer;
`;

const LeftMenuItem = styled.div`
    width: 100%;
    height: 40px;
    padding: 25px;
    display: flex;
    align-items: center;
    font-size: 22px;
    cursor: pointer;
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
`;

const BookMarkBox = styled.div`
  width: 100%;
  max-width: 1200px;
  height: 300px;
  padding: 30px;
  margin-bottom: 20px;
  border: 1px solid #99999944;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  box-shadow: 2px 5px 10px 2px #99999944;
`;

const BookMarkTextBox = styled.div`
  width: 65%;
  max-width: 600px;
  height: 240px;
`;

const BookMarkDateBox = styled.div`
  width: 100%;
  height: 30px;
  padding-bottom: 10px;
  gap: 30px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const BookMarkMedia = styled.div`
  font-size: 18px;
  color: #999999;
`;

const BookMarkDate = styled.div`
  color: #999999;
`;

const BookMarkTitle = styled.div`
  width: 100%;
  height: 80px;
  font-size: 30px;
  font-weight: 600;
  margin-bottom: 20px;
  line-height: 1.3;
  overflow: hidden;
  position: relative;
  white-space: normal;
  word-wrap: break-word;
  display: -webkit-box;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const BookMarkContent = styled.div`
  width: 100%;
  height: 105px;
  font-size: 20px;
  line-height: 1.3;
  overflow: hidden;
  position: relative;
  white-space: normal;
  word-wrap: break-word;
  display: -webkit-box;
  text-overflow: ellipsis;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
`;

const BookMarkImageBox = styled.img`
  width: 40%;
  max-width: 300px;
  height: 240px;
`;

export default function Profile() {
  const [data, setData] = useState('');
  const [onMenu, setOnMenu] = useState('content1');
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

  const handleContentClick = (contentClass) => {
    setOnMenu(contentClass);
  };
  return (
    <Wrapper>
      <Header></Header>
      <WrapperBox>
        <LeftMenu>
          <UserImage src={UserDefault} />
          <UserNickname>UserNickname<UserInputButton src={Pencil} /></UserNickname>
          <LeftMenuItem onClick={() => handleContentClick('content1')}>뉴스 시청기록</LeftMenuItem>
          <LeftMenuItem onClick={() => handleContentClick('content2')}>북마크 뉴스</LeftMenuItem>
          <LeftMenuItem onClick={() => handleContentClick('content3')}>포인트 획득내역</LeftMenuItem>
          <LeftMenuItem onClick={() => handleContentClick('content4')}>개인정보수정</LeftMenuItem>
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
          <BookMarkBox>
            <BookMarkTextBox>
              <BookMarkDateBox>
                <BookMarkMedia> KBS </BookMarkMedia>
                <BookMarkDate>2023.11.20 15:22</BookMarkDate>
              </BookMarkDateBox>
              <BookMarkTitle>시가 600억 클럽마약 밀수·유통조직 일망 타진…어떻게?시가 600억 클럽마약 밀수·유통조직 일망 타진…어떻게?</BookMarkTitle>
              <BookMarkContent>
              강원도 평창경찰서와 춘천지검 영월지청은 케타민과 필로폰 등 30kg 시가 600억 원어치의 마약을 밀수해 서울의 강남지역 클럽 등에 유통시킨 조직원 30여 명을 검거했다고 밝혔습니다. 이 조직은 밀수 담당과 유통 담당으로 나뉘어 체계적으로 움직였습니다. 각 조직원은 또 '탈퇴 시 보복' 등 엄격한 행동강령 아래 역할을 분담한 것으로 드러났습니다.
              </BookMarkContent>
            </BookMarkTextBox>
            <BookMarkImageBox src='https://imgnews.pstatic.net/image/056/2023/11/20/0011605744_001_20231120153305436.jpg?type=w647' />
          </BookMarkBox>
          <BookMarkBox>
            <BookMarkTextBox>
              <BookMarkDateBox>
                <BookMarkMedia> KBS </BookMarkMedia>
                <BookMarkDate>2023.11.20 15:22</BookMarkDate>
              </BookMarkDateBox>
              <BookMarkTitle>시가 600억 클럽마약 밀수·유통조직 일망 타진…어떻게?시가 600억 클럽마약 밀수·유통조직 일망 타진…어떻게?</BookMarkTitle>
              <BookMarkContent>
              강원도 평창경찰서와 춘천지검 영월지청은 케타민과 필로폰 등 30kg 시가 600억 원어치의 마약을 밀수해 서울의 강남지역 클럽 등에 유통시킨 조직원 30여 명을 검거했다고 밝혔습니다. 이 조직은 밀수 담당과 유통 담당으로 나뉘어 체계적으로 움직였습니다. 각 조직원은 또 '탈퇴 시 보복' 등 엄격한 행동강령 아래 역할을 분담한 것으로 드러났습니다.
              </BookMarkContent>
            </BookMarkTextBox>
            <BookMarkImageBox src='https://imgnews.pstatic.net/image/056/2023/11/20/0011605744_001_20231120153305436.jpg?type=w647' />
          </BookMarkBox>
          <BookMarkBox>
            <BookMarkTextBox>
              <BookMarkDateBox>
                <BookMarkMedia> KBS </BookMarkMedia>
                <BookMarkDate>2023.11.20 15:22</BookMarkDate>
              </BookMarkDateBox>
              <BookMarkTitle>시가 600억 클럽마약 밀수·유통조직 일망 타진…어떻게?시가 600억 클럽마약 밀수·유통조직 일망 타진…어떻게?</BookMarkTitle>
              <BookMarkContent>
              강원도 평창경찰서와 춘천지검 영월지청은 케타민과 필로폰 등 30kg 시가 600억 원어치의 마약을 밀수해 서울의 강남지역 클럽 등에 유통시킨 조직원 30여 명을 검거했다고 밝혔습니다. 이 조직은 밀수 담당과 유통 담당으로 나뉘어 체계적으로 움직였습니다. 각 조직원은 또 '탈퇴 시 보복' 등 엄격한 행동강령 아래 역할을 분담한 것으로 드러났습니다.
              </BookMarkContent>
            </BookMarkTextBox>
            <BookMarkImageBox src='https://imgnews.pstatic.net/image/056/2023/11/20/0011605744_001_20231120153305436.jpg?type=w647' />
          </BookMarkBox>
          <BookMarkBox>
            <BookMarkTextBox>
              <BookMarkDateBox>
                <BookMarkMedia> KBS </BookMarkMedia>
                <BookMarkDate>2023.11.20 15:22</BookMarkDate>
              </BookMarkDateBox>
              <BookMarkTitle>시가 600억 클럽마약 밀수·유통조직 일망 타진…어떻게?시가 600억 클럽마약 밀수·유통조직 일망 타진…어떻게?</BookMarkTitle>
              <BookMarkContent>
              강원도 평창경찰서와 춘천지검 영월지청은 케타민과 필로폰 등 30kg 시가 600억 원어치의 마약을 밀수해 서울의 강남지역 클럽 등에 유통시킨 조직원 30여 명을 검거했다고 밝혔습니다. 이 조직은 밀수 담당과 유통 담당으로 나뉘어 체계적으로 움직였습니다. 각 조직원은 또 '탈퇴 시 보복' 등 엄격한 행동강령 아래 역할을 분담한 것으로 드러났습니다.
              </BookMarkContent>
            </BookMarkTextBox>
            <BookMarkImageBox src='https://imgnews.pstatic.net/image/056/2023/11/20/0011605744_001_20231120153305436.jpg?type=w647' />
          </BookMarkBox>
          <MypagePaging />
        </Content>
        {/* 포인트 획득내역 */}
        <Content className={`content3 ${onMenu === 'content3' ? 'active' : ''}`} active={onMenu === 'content3'}>
        </Content>
        {/* 개인정보 수정 */}
        <Content className={`content4 ${onMenu === 'content4' ? 'active' : ''}`} active={onMenu === 'content4'}>
        </Content>
      </WrapperBox>
        <Footer></Footer>
    </Wrapper>
  )
}