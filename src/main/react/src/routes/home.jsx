import { useEffect, useState } from 'react';
import Header from "../components/header"
import axios from 'axios';
import styled from 'styled-components';
import Footer from '../components/footer';
import WordcloudResult from '../components/wordcloud';
import ArrowLeft from '../assets/arrow-left-circle.svg';
import ArrowRight from '../assets/arrow-right-circle.svg';
import { Entertainments } from '../components/category-badge';
import { BoardMain } from '../components/board-sns';
import MyBarChart from '../components/bar-chart';

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  padding-top: 120px;
  gap: 50px;
  `;

const WrapperBox = styled.div`
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 200px;
  padding-bottom: 200px;
`;

const Content = styled.div`
  width: 100%;
  /* max-width: 1400px; */
  height: auto;
  display: flex;
  justify-content: center;
  `;

const Main = styled.div`
  width: 100%;
  height: 100vh;
  padding-bottom: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #E7AA22;
`;

const MainBox = styled.div`
  width: 100%;
  max-width: 1400px;
  height: 600px;
  padding: 0 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const MainNewsImage = styled.div`
  width: 100%;
  max-width: 850px;
  height: 600px;
  background-image: url('https://cdn.spotvnews.co.kr/news/photo/202311/643707_950816_2934.jpg');
  position: absolute;
  right: 0;
`;

const MainNewsBox = styled.div`
  width: 100%;
  max-width: 650px;
  height: 100%;
  max-height: 450px;
  padding: 30px;
  position: absolute;
  left: 0;
  z-index: 10;
  background-color: #ffffff;
  box-shadow: 5px 5px 5px 5px #99999944;
`;

const NewsBoxTop = styled.div`
  width: 100%;
  height: 25px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const TopText = styled.div`
  width: 100%;
  max-width: 370px;
  height: 25px;
  display: flex;
  align-items: center;
`;

const TopBadge = styled.div`
  width: 100%;
  width: 200px;
  height: 25px;
  display: flex;
  align-items: center;
  justify-content: right;
`;

const TopMedia = styled.div`
  width: auto;
  height: 25px;
  font-size: 16px;
  color: #999999;
  display: flex;
  align-items: center;
`;

const TopDate = styled.div`
  width: auto;
  height: 25px;
  font-size: 14px;
  padding-left: 30px;
  color: #999999;
  display: flex;
  align-items: center;
`;

const MainNewsTitle = styled.div`
  width: 100%;
  max-width: 570px;
  font-size: 32px;
  margin: 20px 0;
  `;

const MainNewsContent = styled.div`
  width: 100%;
  max-width: 570px;
  line-height: 1.8;
`;

const TrendBox = styled.div`
  width: 100%;
  max-width: 1400px;
  height: 1000px;
  padding-top: 150px;
  display: flex;
  background-color: #E7AA22;
  position: relative;
`;

const TrendBoxHead = styled.div`
  width: 100%;
  height: 150px;
  padding: 30px 50px;
  background-color: #F0BE4D;
  position: absolute;
  top: 0;
`;

const TrendHeadText = styled.div`
  color: #ffffff;
  font-size: 32px;
`;

const TrendHeadBtn = styled.div`
  width: 130px;
  height: 50px;
  display: flex;
  align-items: center;
  padding-top: 15px;
  padding-left: 150px;
  gap: 20px;
`;

const ArrowButton = styled.img`
  width: 50px;
  height: 50px;
  cursor: pointer;
`;

const TrendNewsBox = styled.div`
  width: 100%;
  max-width: 1000px;
  height: 150px;
  padding: 20px 30px;
  box-sizing: border-box;
  background-color: #ffffff;
  box-shadow: 2px 2px 2px 2px #99999944;
  border-radius: 5px;
  position: absolute;
  top: 50px;
  left: 350px;
`;

const WordCloudBox = styled.div`
  width: 800px;
  height: 850px;
  padding: 150px 0 100px 0;
`;

const GraphBox = styled.div`
  width: 600px;
  height: 850px;
  padding: 100px 50px 100px 0;
`;

const GraphHeader = styled.div`
  width: 500px;
  height: 100px;
  padding-left: 80px;
  display: flex;
  justify-content: space-between;
`;

const GraphContent = styled.div`
  width: 500px;
  height: 550px;
  padding-top: 50px;
  display: flex;
  justify-content: center;
  align-items: flex-end;
`;

const GraphTextBox = styled.div`
  width: 60%;
  height: 100px;
  text-align: right;
`;

const GraphTitle = styled.div`
  padding-bottom: 20px;
  font-size: 36px;
  color: #ffffff;
`;

const GraphText = styled.div`
  font-size: 24px;
  color: #ffffff;
`;

const GraphBtn = styled.div`
  width: 40%;
  height: 100px;
  display: flex;
  justify-content: left;
  align-items: center;
  gap: 20px;
`;

const BoardBox = styled.div`
  width: 100%;
  max-width: 1400px;
  height: 1220px;
  padding: 0 50px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  align-content: flex-start;
  gap: 50px;
`;

const MainBoxBottom = styled.div`
  width: 100%;
  height: 800px;
  display: flex;
  justify-content: center;
  flex-direction: row;
`;

const BottomSubList = styled.div`
  width: 100%;
  max-width: 500px;
  height: 800px;
  padding: 0 20px;
`;

const BottomSubNews = styled.div`
  width: 100%;
  max-width: 650px;
  height: 800px;
  padding: 0 20px;
  position: relative;
`;

const BottomCategory = styled.div`
  width: 100%;
  max-width: 250px;
  height: 800px;
  padding: 80px 20px 0 20px;
  text-align: right;
  display: flex;
  flex-direction: column;
  justify-content: right;
`;

const BottomListItem = styled.div`
  width: 100%;
  height: 100px;
  padding-bottom: 10px;
  margin: 30px 0;
  border-bottom: 1px solid #99999944;
  display: flex;
  flex-direction: column;
  &:last-child{
    border: none;
  }
`;

const NewsHeaderItem = styled.div`
  width: 100%;
  height: 20px;
  display: flex;
  align-items: center;
  flex-direction: row;
  margin-bottom: 10px;
  color: #999999;
  gap: 30px;
`;

const NewsMediaText = styled.div`
  font-size: 16px;
`;

const NewsDateText = styled.div`
  font-size: 14px;
`;

const ListNewsTitle = styled.div`
  width: 100%;
  height: 60px;
  padding-bottom: 20px;
  font-size: 22px;
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

const SubNewsImage = styled.img`
  width: 100%;
  height: 720px;
  object-fit:cover;
  box-shadow: 5px 5px 5px 5px #99999944;
`;

const SubNewsTextBox = styled.div`
  width: 100%;
  max-width: 700px;
  height: 220px;
  padding: 20px 30px;
  position: absolute;
  bottom: 0;
  right: -150px;
  box-shadow: 5px 5px 5px 5px #99999944;
  background-color: #ffffff;
`;

const SubNewsTitle = styled.div`
  width: 100%;
  height: 145px;
  font-size: 36px;
  line-height: 1.3;
  overflow: hidden;
  position: relative;
  white-space: normal;
  word-wrap: break-word;
  display: -webkit-box;
  text-overflow: ellipsis;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
`;

const TrendNewsTitle = styled.div`
  width: 100%;
  height: 75px;
  padding-top: 5px;
  font-size: 28px;
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

const NewsMediaBottom = styled.div`
  font-size: 22px;
`;

const NewsDateBottom = styled.div`
  font-size: 18px;
`;

const BottomCategoryTitle = styled.div`
  font-size: 40px;
  padding-bottom: 30px;
`;

const BottomCategoryItem = styled.div`
    width: 100%;
    height: 40px;
    padding: 25px;
    display: flex;
    align-items: center;
    justify-content: right;
    font-size: 28px;
    cursor: pointer;
    &:hover {
      /* background-image: linear-gradient(to left, #F0BE4D, #ffffff00); */
      background: #F0BE4D;
      color: white;
      transition: 0.5s;
  }
`;

export default function Home() {
  const [data, setData] = useState('');
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
    <Wrapper>
      <Header></Header>
      <WrapperBox>
        <Content>
          <Main>
          <MainBox>
            <MainNewsImage></MainNewsImage>
            <MainNewsBox>
              <NewsBoxTop>
                <TopText>
                  <TopMedia>SPOTVNEWS</TopMedia>
                  <TopDate>2023.11.14 15:34</TopDate>
                </TopText>
                <TopBadge>
                  <Entertainments></Entertainments>
                </TopBadge>
              </NewsBoxTop>
              <MainNewsTitle>곽튜브, 1000만원 걸고 빠니보틀 찾는다…'나는 솔로' 찍은 사연('서치미')</MainNewsTitle>
              <MainNewsContent>
                16일 방송되는 U+모바일tv, KBS2 '서치미'에서는 곽튜브가 자신의 '찐친'인 여행 크리에이터 빠니보틀(박재한) 찾기에 도전한다.<br /><br />

                MC 전현무는 곽튜브에게 전화로 "5명의 빠니보틀이 있다. 이 중 1명만이 진짜 빠니보틀"이라고 룰을 설명한다. 곽튜브가 진짜 빠니보틀을 찾아내면 1000만 원은 곽튜브의 것이 된다.<br /><br />

                곽튜브를 속이기 위해 두 사람의 또 다른 지인 채코제(박재일)와 '시치미단' 이은지, 곽범, 손동표가 나선다.<br /><br />
              </MainNewsContent>
            </MainNewsBox>
          </MainBox>
          </Main>
        </Content>
        <Content>
          <TrendBox>
            <TrendBoxHead>
              <TrendHeadText>인기뉴스</TrendHeadText>
              <TrendHeadBtn>
                <ArrowButton src={ArrowLeft} />
                <ArrowButton src={ArrowRight} />
              </TrendHeadBtn>
            </TrendBoxHead>
            <TrendNewsBox>
                <NewsHeaderItem>
                    <NewsMediaBottom>아시아경제</NewsMediaBottom>
                    <NewsDateBottom>2023.11.17 09:11</NewsDateBottom>
                </NewsHeaderItem>
                <TrendNewsTitle>"수건이 115만원? 우린 9900원"…발렌시아가 저격한 이케아"수건이 115만원? 우린 9900원"…발렌시아가 저격한 이케아이케아이케아이케아이케아이케아이케아이케아이케아이케아</TrendNewsTitle>
            </TrendNewsBox>
            <WordCloudBox>
              <WordcloudResult></WordcloudResult>
            </WordCloudBox>
            <GraphBox>
              <GraphHeader>
                <GraphBtn>
                  <ArrowButton src={ArrowLeft} />
                  <ArrowButton src={ArrowRight} />
                </GraphBtn>
                <GraphTextBox>
                  <GraphTitle>오늘의 트렌드</GraphTitle>
                  <GraphText>연예 트렌드</GraphText>
                </GraphTextBox>
              </GraphHeader>
              <GraphContent>
                <MyBarChart />
              </GraphContent>
            </GraphBox>
          </TrendBox>
        </Content>
        <Content>
          <BoardBox>
            <BoardMain></BoardMain>
          </BoardBox>
        </Content>
        <Content>
          <MainBoxBottom>
            <BottomSubList>
              <BottomListItem>
                <NewsHeaderItem>
                  <NewsMediaText>연합뉴스</NewsMediaText>
                  <NewsDateText>2023.11.17 09:42</NewsDateText>
                </NewsHeaderItem>
                <ListNewsTitle>고양시 아파트 지하주차장 기둥 파손…차량 통제·긴급 보강작업(종합)</ListNewsTitle>
              </BottomListItem>
              <BottomListItem>
                <NewsHeaderItem>
                  <NewsMediaText>디지털데일리</NewsMediaText>
                  <NewsDateText>2023.11.16 17:20</NewsDateText>
                </NewsHeaderItem>
                <ListNewsTitle>[현장] 매장서 입어보고 온라인 주문? ‘무신사 홍대’에선 바로 구매 OK 매장서 입어보고 온라인 주문? ‘무신사 홍대’에선 바로 구매 OK</ListNewsTitle>
              </BottomListItem>
              <BottomListItem>
                <NewsHeaderItem>
                  <NewsMediaText>연합뉴스</NewsMediaText>
                  <NewsDateText>2023.11.17 09:42</NewsDateText>
                </NewsHeaderItem>
                <ListNewsTitle>고양시 아파트 지하주차장 기둥 파손…차량 통제·긴급 보강작업(종합)</ListNewsTitle>
              </BottomListItem>
              <BottomListItem>
                <NewsHeaderItem>
                  <NewsMediaText>연합뉴스</NewsMediaText>
                  <NewsDateText>2023.11.17 09:42</NewsDateText>
                </NewsHeaderItem>
                <ListNewsTitle>고양시 아파트 지하주차장 기둥 파손…차량 통제·긴급 보강작업(종합)</ListNewsTitle>
              </BottomListItem>
              <BottomListItem>
                <NewsHeaderItem>
                  <NewsMediaText>연합뉴스</NewsMediaText>
                  <NewsDateText>2023.11.17 09:42</NewsDateText>
                </NewsHeaderItem>
                <ListNewsTitle>고양시 아파트 지하주차장 기둥 파손…차량 통제·긴급 보강작업(종합)</ListNewsTitle>
              </BottomListItem>
              <BottomListItem>
                <NewsHeaderItem>
                  <NewsMediaText>연합뉴스</NewsMediaText>
                  <NewsDateText>2023.11.17 09:42</NewsDateText>
                </NewsHeaderItem>
                <ListNewsTitle>고양시 아파트 지하주차장 기둥 파손…차량 통제·긴급 보강작업(종합)</ListNewsTitle>
              </BottomListItem>
            </BottomSubList>
            <BottomSubNews>
              <SubNewsImage src="https://imgnews.pstatic.net/image/277/2023/11/17/0005342242_001_20231117092303634.jpg?type=w647" />
              <SubNewsTextBox>
                <NewsHeaderItem>
                    <NewsMediaBottom>아시아경제</NewsMediaBottom>
                    <NewsDateBottom>2023.11.17 09:11</NewsDateBottom>
                </NewsHeaderItem>
                <SubNewsTitle>"수건이 115만원? 우린 9900원"…발렌시아가 저격한 이케아"수건이 115만원? 우린 9900원"…발렌시아가 저격한 이케아</SubNewsTitle>
              </SubNewsTextBox>
            </BottomSubNews>
            <BottomCategory>
              <BottomCategoryTitle>카테고리</BottomCategoryTitle>
              <BottomCategoryItem>사회</BottomCategoryItem>
              <BottomCategoryItem>정치</BottomCategoryItem>
              <BottomCategoryItem>경제</BottomCategoryItem>
              <BottomCategoryItem>국제</BottomCategoryItem>
              <BottomCategoryItem>문화</BottomCategoryItem>
              <BottomCategoryItem>IT</BottomCategoryItem>
              <BottomCategoryItem>연예</BottomCategoryItem>
              <BottomCategoryItem>스포츠</BottomCategoryItem>
            </BottomCategory>
          </MainBoxBottom>
        </Content>
      </WrapperBox>
      <Footer></Footer>
    </Wrapper>
  )
}