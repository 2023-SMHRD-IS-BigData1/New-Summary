import { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import WordcloudResult from '../components/wordcloud';
import ArrowLeft from '../assets/arrow-left-circle.svg';
import ArrowRight from '../assets/arrow-right-circle.svg';
import { Entertainments } from '../components/category-badge';
import MyBarChart from '../components/bar-chart';
import Bookmark from '../assets/bookmark.svg';
import BookmarkOn from '../assets/bookmark-on.svg';
import Pagination from "react-js-pagination";

// -- Home Main news component -- //
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

const MainNewsImageBox = styled.div`
  width: 100%;
  max-width: 850px;
  height: 600px;
  position: absolute;
  right: 0;
  overflow: hidden;
`;

const MainNewsImage = styled.img`
    width: 100%;
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



// -- Home Trend news component -- //

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



// -- Home Trend Graph & WordCloud component -- //

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



// -- Home Sub news component -- //

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
  display: flex;
  align-items: center;
  position: relative;
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

const SubNewsImageBox = styled.div`
  width: 100%;
  max-height: 720px;
  object-fit:cover;
  box-shadow: 5px 5px 5px 5px #99999944;
`;

const SubNewsImage = styled.img`
    width: 100%;
    object-fit:cover;
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



// -- Home Sub news Category component -- //

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
      background: #F0BE4D;
      color: white;
      transition: 0.5s;
  }
`;



// -- Daily news component -- //

const WrapperBox = styled.div`
  width: 100%;
  max-width: 1400px;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 30px;
  padding: 50px 50px 0px 50px;
  margin: auto;
  position: relative;
  `;

const DateHead = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const DateBox = styled.div`
    width: 100%;
    max-width: 400px;
    height: 70px;
    padding: 10px 20px;
    margin: 20px 0;
    gap: 40px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background-color: #F0BE4D;
    color: #ffffff;
    font-size: 22px;
    font-weight: 600;
`;

const ArrowBox = styled.div`
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 30px;
    cursor: pointer;
    &:hover{
        color: #000000;
    }
`;

const DailyNewsBox = styled.div`
    width: 100%;
    height: 300px;
    border: 1px solid #99999944;
    padding: 30px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    overflow: hidden;
    &:hover .DailyNewsBtn{
        opacity: 1;
        transition: 0.5s;
        transform: translateX(0);
    }
`;

const DailyNewsContentBox = styled.div`
    width: 70%;
    height: 240px;
`;

const DailyNewsImageBox = styled.div`
    width: 30%;
    height: 240px;
    object-fit:cover;
    overflow: hidden;
`;

const DailyNewsImage = styled.img`
    width: 100%;
`;

const DailyNewsDateBox = styled.div`
    width: 100%;
    height: 40px;
    padding-bottom: 10px;
    display: flex;
    align-items: center;
    justify-content: left;
    color: #999999;
    gap: 20px;
`;

const DailyNewsMedia = styled.div`
    font-size: 18px;
`;

const DailyNewsDate = styled.div``;

const DailyNewsTitle = styled.div`
    width: 100%;
    height: 75px;
    font-size: 28px;
    margin-bottom: 10px;
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

const DailyNewsContent = styled.div`    
    width: 100%;
    height: 110px;
    font-size: 18px;
    line-height: 1.2;
    overflow: hidden;
    position: relative;
    white-space: normal;
    word-wrap: break-word;
    display: -webkit-box;
    text-overflow: ellipsis;
    -webkit-line-clamp: 5;
    -webkit-box-orient: vertical;
`;

const DailyNewsSideSlide = styled.div`
    width: 200px;
    height: 100%;
    padding: 20px 20px 0 0;
    display: flex;
    justify-content: right;
    background-image: linear-gradient(to right, #00000000, #00000055);
    position: absolute;
    right: 0;
    opacity: 0;
    transform: translateX(100%);
`;

const DailyNewsSideBtn = styled.img`
    width: 50px;
    height: 50px;
    background-color: #ffffff;
    padding: 10px;
    border-radius: 50%;
    cursor: pointer;
    &:hover{
        padding: 6px;
        transition: 0.5s;
    }
`;



// -- Categori news component -- //

const CategoriWrapperBox = styled.div`
  width: 100%;
  max-width: 1400px;
  height: auto;
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 50px;
  padding: 50px 50px 0px 50px;
  margin: auto;
  position: relative;
  `;

const CategoryNewsArea = styled.div`
  width: 100%;
  max-width: 1000px;
`;

const CategoryNewsBox = styled.div`
    width: 100%;
    height: 300px;
    border: 1px solid #99999944;
    padding: 30px;
    margin-bottom: 30px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    overflow: hidden;
    &:hover .CategoryNewsBtn{
        opacity: 1;
        transition: 0.5s;
        transform: translateX(0);
    }
`;

const CategoryNewsContentBox = styled.div`
    width: 70%;
    height: 240px;
`;

const CategoryNewsImageBox = styled.div`
    width: 30%;
    height: 240px;
    object-fit:cover;
    overflow: hidden;
`;

const CategoryNewsImage = styled.img`
    width: 100%;
`;

const CategoryNewsDateBox = styled.div`
    width: 100%;
    height: 40px;
    padding-bottom: 10px;
    display: flex;
    align-items: center;
    justify-content: left;
    color: #999999;
    gap: 20px;
`;

const CategoryNewsMedia = styled.div`
    font-size: 18px;
`;

const CategoryNewsDate = styled.div``;

const CategoryNewsTitle = styled.div`
    width: 100%;
    height: 75px;
    font-size: 28px;
    margin-bottom: 10px;
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

const CategoryNewsContent = styled.div`    
    width: 100%;
    height: 110px;
    font-size: 18px;
    line-height: 1.2;
    overflow: hidden;
    position: relative;
    white-space: normal;
    word-wrap: break-word;
    display: -webkit-box;
    text-overflow: ellipsis;
    -webkit-line-clamp: 5;
    -webkit-box-orient: vertical;
`;

const NewsRightSlide = styled.div`
    width: 200px;
    height: 100%;
    padding: 20px 20px 0 0;
    display: flex;
    justify-content: right;
    background-image: linear-gradient(to right, #00000000, #00000055);
    position: absolute;
    right: 0;
    opacity: 0;
    transform: translateX(100%);
`;

const NewsBookMarkBtn = styled.img`
    width: 50px;
    height: 50px;
    background-color: #ffffff;
    padding: 10px;
    border-radius: 50%;
    cursor: pointer;
    &:hover{
        padding: 6px;
        transition: 0.5s;
    }
`;

const CategorySideBox = styled.div`
  width: 100%;
  max-width: 300px;
  height: 700px;
  border: 1px solid #99999944;
  box-shadow: 5px 5px 10px 1px #99999944;
  padding-top: 80px;
`;

const CategorySideTitle = styled.div`
    width: 100%;
    height: 30px;
    padding: 30px;
    font-size: 24px;
    display: flex;
    align-items: center;
`;

const CategorySideItemTop = styled.ul``;

const CategorySideItem = styled.li`
    width: 100%;
    height: 50px;
    padding: 30px;
    input[type="checkbox"] {  
        display: none;
    }
`;

const CategorySideItemText = styled.span`
    vertical-align: middle;
    padding-left: 15px;
`;

const CategorySideInput = styled.input`
    &:checked + label:before{
    content:"✔";
    color: #ffffff;
    background-color:#f0be4d;
    border-color:#f0be4d;
    background-repeat: no-repeat;
    background-position: 50%;
}
`;

const CategorySideItemLabel = styled.label`
    width: 100%; 
    cursor: pointer;
    display: flex;
    align-items: center;
    font-size: 22px;
    &:before{
        content:"";
        display:inline-block;
        width:24px;
        height:24px;
        border:2px solid #f0be4d;
        border-radius: 4px;
        vertical-align:middle;
    }
`;




// -- react-js-pagination component -- //

const PaginationBox = styled.div`
  .pagination { display: flex; justify-content: center; margin: 25px 0 100px 0; }
  ul { list-style: none; padding: 0; }
  ul.pagination li {
    display: inline-block;
    width: 40px;
    height: 40px;
    border: 1px solid #e2e2e2;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1rem; 
  }
  ul.pagination li:first-child{ border-radius: 5px 0 0 5px; }
  ul.pagination li:last-child{ border-radius: 0 5px 5px 0; }
  ul.pagination li a { text-decoration: none; color: #F0BE4D; font-size: 1rem; }
  ul.pagination li.active a { color: white; }
  ul.pagination li.active { background-color: #F0BE4D; }
  ul.pagination li:hover,
  ul.pagination li a:hover,
  ul.pagination li a.active { color: black; }
`

const CategoryData = [
    { id: "value1", name: "사회" }, 
    { id: "value2", name: "정치" },
    { id: "value3", name: "경제" },
    { id: "value4", name: "국제" },
    { id: "value5", name: "문화" },
    { id: "value6", name: "IT" },
    { id: "value7", name: "연예" },
    { id: "value8", name: "스포츠" },
]


export function HomeMainNews() {
    return (
        <Main>
            <MainBox>
                <MainNewsImageBox>
                    <MainNewsImage src='https://cdn.spotvnews.co.kr/news/photo/202311/643707_950816_2934.jpg' />
                </MainNewsImageBox>
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
    )
}

export function HomeTrendNews() {
    return (
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
    )
}

export function HomeSubNews() {
    return (
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
                <SubNewsImageBox>
                    <SubNewsImage src="https://imgnews.pstatic.net/image/277/2023/11/17/0005342242_001_20231117092303634.jpg?type=w647" />
                </SubNewsImageBox>
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
    )
}

export function DailyNewsComponent() {
    return (
        <WrapperBox>
            <DateHead>
                <DateBox>
                    <ArrowBox>&lt;</ArrowBox>
                    2023. &nbsp;11. &nbsp;21
                    <ArrowBox>&gt;</ArrowBox>
                </DateBox>
            </DateHead>
            <DailyNewsBox className='DailyNewsBox'>
                <DailyNewsSideSlide className='DailyNewsBtn'>
                    <DailyNewsSideBtn src={BookmarkOn} />
                    <DailyNewsSideBtn src={Bookmark} />
                </DailyNewsSideSlide>
                <DailyNewsContentBox>
                    <DailyNewsDateBox>
                        <DailyNewsMedia>마이데일리</DailyNewsMedia>
                        <DailyNewsDate>2023.11.21. 9:02</DailyNewsDate>
                    </DailyNewsDateBox>
                    <DailyNewsTitle>"빅스의 무한한 여정, 멤버들끼리 약속한 것 있어요" [MD인터뷰](종합)"빅스의 무한한 여정, 멤버들끼리 약속한 것 있어요" [MD인터뷰](종합)"빅스의 무한한 여정, 멤버들끼리 약속한 것 있어요" [MD인터뷰](종합)</DailyNewsTitle>
                    <DailyNewsContent>
                        '컨티뉴엄(CONTINUUM)'은 '연속'이라는 대주제를 다양한 콘셉트로 풀어내며 '빅스'로서 끊임없이 연결된 무한한 여정을 담았다. 지난 2019년 발매된 디지털 싱글 '패럴렐(PARALLEL)' 이후 4년 2개월 만의 신보이기도 하다.
                        2012년 5월 24일 데뷔한 빅스는 올해 11주년을 맞이했다. '컨티뉴엄(CONTINUUM)'에는 지금 이 시점에서 이들이 생각한 '빅스스러움'이 담겼다. 음악, 퍼포먼스 특히 콘셉트까지 이번 앨범을 통해 담아낸 '나'의 정체성, 우리'의 정체성, '빅스'의 정체성이 궁금해졌다.
                        다양한 걸 하겠지만 빅스가 이런 걸로 색깔이 잡힐 수 있는, 강점이 있는 팀이 되면 좋겠다"고 포부를 드러냈다.
                    </DailyNewsContent>
                </DailyNewsContentBox>
                <DailyNewsImageBox>
                    <DailyNewsImage src='https://mimgnews.pstatic.net/image/117/2023/11/21/0003789283_002_20231121090208311.jpg?type=w540' />
                </DailyNewsImageBox>
            </DailyNewsBox>
            <DailyNewsBox className='DailyNewsBox'>
                <DailyNewsSideSlide className='DailyNewsBtn'>
                    <DailyNewsSideBtn src={BookmarkOn} />
                    <DailyNewsSideBtn src={Bookmark} />
                </DailyNewsSideSlide>
                <DailyNewsContentBox>
                    <DailyNewsDateBox>
                        <DailyNewsMedia>마이데일리</DailyNewsMedia>
                        <DailyNewsDate>2023.11.21. 9:02</DailyNewsDate>
                    </DailyNewsDateBox>
                    <DailyNewsTitle>"빅스의 무한한 여정, 멤버들끼리 약속한 것 있어요" [MD인터뷰](종합)"빅스의 무한한 여정, 멤버들끼리 약속한 것 있어요" [MD인터뷰](종합)"빅스의 무한한 여정, 멤버들끼리 약속한 것 있어요" [MD인터뷰](종합)</DailyNewsTitle>
                    <DailyNewsContent>
                        '컨티뉴엄(CONTINUUM)'은 '연속'이라는 대주제를 다양한 콘셉트로 풀어내며 '빅스'로서 끊임없이 연결된 무한한 여정을 담았다. 지난 2019년 발매된 디지털 싱글 '패럴렐(PARALLEL)' 이후 4년 2개월 만의 신보이기도 하다.
                        2012년 5월 24일 데뷔한 빅스는 올해 11주년을 맞이했다. '컨티뉴엄(CONTINUUM)'에는 지금 이 시점에서 이들이 생각한 '빅스스러움'이 담겼다. 음악, 퍼포먼스 특히 콘셉트까지 이번 앨범을 통해 담아낸 '나'의 정체성, 우리'의 정체성, '빅스'의 정체성이 궁금해졌다.
                        다양한 걸 하겠지만 빅스가 이런 걸로 색깔이 잡힐 수 있는, 강점이 있는 팀이 되면 좋겠다"고 포부를 드러냈다.
                    </DailyNewsContent>
                </DailyNewsContentBox>
                <DailyNewsImageBox>
                    <DailyNewsImage src='https://mimgnews.pstatic.net/image/117/2023/11/21/0003789283_002_20231121090208311.jpg?type=w540' />
                </DailyNewsImageBox>
            </DailyNewsBox>
        </WrapperBox>
    )
}

export function CategoriNewsComponent() {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [items, setItems] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    // 선택된 아이템 배열
    const [checkedItem, setCheckedItem] = useState([]);

    /* li 클릭 시 실행 */
    const handleCheckBox = (e) => {
        const selectedItem = e.currentTarget; // 주의: target 아니고 currentTarget이다

        /* checked 여부에 따라 선택된 li 아이템 추가 또는 삭제 */
        // 특정 아이템을 체크 + 선택한 아이템 배열에 체크한 아이템이 없는 경우
        if (selectedItem.checked && !checkedItem.includes(selectedItem.id)) {
            // 선택된 아이템 배열에 선택한 아이템 추가
            setCheckedItem([...checkedItem, selectedItem.id]);

            // 체크 해제 + 클릭한 아이템이 선택된 아이템 배열에 있는 경우
        } else if (!selectedItem.checked && checkedItem.includes(selectedItem.id)) {
            // 해당 아이템을 선택된 아이템 배열에서 삭제
            setCheckedItem(checkedItem.filter((name) => selectedItem.id !== name));
        } else return;
    };

    //페이징 코드
    const NewsData = () => {
        axios.get('https://jsonplaceholder.typicode.com/posts')
            .then(res => {
                setData(res.data)
                calculateTotalPages(res.data.length);
                console.log(res);
                console.log(res.data);
            })
    }

    const handlePageChange = (page) => { setPage(page); };
    const itemChange = (e) => {
        setItems(Number(e.target.value))
        calculateTotalPages(data.length);
    }

    const calculateTotalPages = (totalItems) => {
        const totalPages = Math.ceil(totalItems / items);
        setTotalPages(totalPages);
    }

    useEffect(() => {
        NewsData();
    }, []);

    console.log(items * (page - 1), items * (page - 1) + items)

    return (
        <>
            <CategoriWrapperBox>
                <CategorySideBox>
                    <CategorySideTitle>카테고리</CategorySideTitle>
                    <CategorySideItemTop>
                        {CategoryData.map(({ id, name }) => (
                            <CategorySideItem key={id} className={id}>
                                <CategorySideInput
                                    id={name}
                                    type='checkbox'
                                    onChange={handleCheckBox}
                                />
                                <CategorySideItemLabel htmlFor={name}>
                                    <CategorySideItemText>
                                        {name}
                                    </CategorySideItemText>
                                </CategorySideItemLabel>
                            </CategorySideItem>
                        ))}
                    </CategorySideItemTop>
                </CategorySideBox>
                <CategoryNewsArea>
                    {data.slice(
                        items * (page - 1),
                        items * (page - 1) + items
                    ).map((value, index) => {
                        return (
                            <CategoryNewsBox className='CategoryNewsBox'>
                                <NewsRightSlide className='CategoryNewsBtn'>
                                    <NewsBookMarkBtn src={BookmarkOn} />
                                    <NewsBookMarkBtn src={Bookmark} />
                                </NewsRightSlide>
                                <CategoryNewsContentBox key={index}>
                                    <CategoryNewsDateBox>
                                        <CategoryNewsMedia>{value.userId}</CategoryNewsMedia>
                                        <CategoryNewsDate>{value.id}</CategoryNewsDate>
                                    </CategoryNewsDateBox>
                                    <CategoryNewsTitle>{value.title}</CategoryNewsTitle>
                                    <CategoryNewsContent>{value.body}</CategoryNewsContent>
                                </CategoryNewsContentBox>
                                <CategoryNewsImageBox>
                                    <CategoryNewsImage src='https://mimgnews.pstatic.net/image/117/2023/11/21/0003789283_002_20231121090208311.jpg?type=w540' />
                                </CategoryNewsImageBox>
                            </CategoryNewsBox>
                        )
                    })}
                </CategoryNewsArea>
            </CategoriWrapperBox>
            <PaginationBox>
                <Pagination
                    activePage={page}
                    itemsCountPerPage={items}
                    totalItemsCount={data.length - 1}
                    pageRangeDisplayed={5}
                    onChange={handlePageChange}>
                </Pagination>
            </PaginationBox>
        </>
    )
}