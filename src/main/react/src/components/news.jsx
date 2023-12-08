import { useEffect, useState } from 'react';
import axios from 'axios';
import styled, { css, keyframes } from 'styled-components';
import AutoPlayCarousel from '../components/carousel';
import ViewsCarousel from '../components/views-carousel';
import Bookmark from '../assets/bookmark.svg';
import BookmarkOn from '../assets/bookmark-on.svg';
import SearchLogo from '../assets/search-logo.svg';
import Pagination from "react-js-pagination";
import LoadingScreen from './loading-screen';
import ModalPortal from './portal';
import Modal from './modal';
import { useCategoryContext, useCategoryNewsContext, useNewsContext, useNewsViewContext } from '../data/news-data.context';
import { Link } from 'react-router-dom';

// -- Home Main news component -- //
const Main = styled.div`
  width: 100%;
`;

const MainHeader = styled.div`
    width: 100%;
    font-size: 28px;
    padding: 30px 30px 0 30px;
    display: flex;
    align-items: center;
    background-color: #ffffff;
`;

const MainDailyHeader = styled.div`
    width: 100%;
    font-size: 28px;
    padding: 30px 130px 0 130px;
    display: flex;
    align-items: center;
    background-color: #ffffff;
`;





// -- Home Trend badge component -- //
const MainTrendBox = styled.div`
    width: 100%;
    padding: 30px 140px;
    gap: 20px 30px;
    /* margin-bottom: 100px; */
    display: flex;
    align-items: center;
    position: relative;
    flex-wrap: wrap;
    background-color: #ffffff;
    box-shadow: 5px 5px 5px 2px #99999944;
`;

const MainTrendBadge = styled.div`
    height: 36px;
    font-size: 18px;
    padding: 10px 20px;
    border: 1px solid #99999944;
    border-radius: 18px;
    display: flex;
    justify-content: center;
    align-items: center;
    white-space: nowrap;
    cursor: pointer;
    &:hover {
        color: #ffffff;
        background-color: #f0be4d;
        border: 1px solid #99999900;
        transition: 0.5s;
    }
`;



// -- Home Card news component -- //
const MainCardNewsBox = styled.div`
  width: 100%;
  height: 630px;
  padding: 30px 140px;
  gap: 40px;
  position: relative;
  margin-bottom: 100px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  flex-wrap: wrap;
  background: linear-gradient(to bottom, rgba(233,196,106,1) 0%,rgba(240,190,77,1) 50%,rgba(240,190,77,1) 100%);
  box-shadow: 5px 5px 5px 2px #99999944;
  @media screen and (max-width: 1140px) {
        padding-top: 120px;
        height: 710px;
    }
`;

const MainCardNewsArea = styled.div`
    width: 100%;
    max-width: 1400px;
    margin: auto;
`;

const MainCardHeader = styled.div`
    font-size: 28px;
    padding: 30px 200px;
    position: absolute;
    top: 10px;
    right: 30px;
    display: flex;
    align-items: center;
    @media screen and (max-width: 1140px) {
        left: 30px;
    }
`;

const MainCardNews = styled.div`
   width: ${(props) => (props.isFirst ? '440px' : '320px')};
   height: ${(props) => (props.isFirst ? '560px' : '440px')};
  perspective: 1100px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  transition: 0.5s;
  transform-style: preserve-3d;
  `;

const MainCardImageBox = styled.div`
   width: ${(props) => (props.isFirst ? '440px' : '320px')};
   height: ${(props) => (props.isFirst ? '560px' : '440px')};
   border: 1px solid #999999;
  border-radius: 30px;
  overflow: hidden;
  position: absolute;
  backface-visibility: hidden;
  `;

const MainCardImage = styled.img`
  position: absolute;
  height: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  &:hover{
    transition: .5s;
    height: 110%;
  }
  `;

const MainCardKey = styled.div`
    padding: 10px 20px;
    font-size: 18px;
    font-weight: 600;
    border-radius: 10px;
    color: #ffffff;
    background-color: #264653;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    bottom: 10px;
    right: 20px;
`;


const MainCardTextArea = styled.div`
   width: ${(props) => (props.isFirst ? '440px' : '320px')};
  height: ${(props) => (props.isFirst ? '560px' : '440px')};
  border: 1px solid #999999;
  border-radius: 30px;
  padding: 20px;
  background-color: #ffffff;
  position: absolute;
  top: 0;
  transform: rotateY(180deg);
  backface-visibility: hidden;
`;

const MainCardTitle = styled.div`
    width: 100%;
    max-height: 105px;
    padding: 10px;
    font-size: 24px;
    font-weight: 600;
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

const MainCardContent = styled.div`
    width: 100%;
    height: 280px;
    padding: 20px;
    font-size: 18px;
    line-height: 1.3;
    overflow: hidden;
    position: relative;
    white-space: normal;
    word-wrap: break-word;
    display: -webkit-box;
    text-overflow: ellipsis;
    -webkit-line-clamp: 11;
    -webkit-box-orient: vertical;
`;



// -- Home Main news carousel component -- //
const MainNewsBox = styled.div`
    width: 100%;
    height: 560px;
    gap: 30px;
    padding: 30px 10px;
    margin-bottom: 100px;
    display: flex;
    align-items: center;
    background-color: #ffffff;
    box-shadow: 5px 5px 5px 2px #99999944;
`;



// -- Home Main news views carousel component -- //
const MainNewsViewsBox = styled.div`
    width: 100%;
    height: 440px;
    gap: 30px;
    padding: 30px 10px;
    margin-bottom: 100px;
    display: flex;
    align-items: center;
    background-color: #ffffff;
    box-shadow: 5px 5px 5px 2px #99999944;
`;



// -- Home Trend news component -- //
const NewsMediaBottom = styled.div`
`;

const NewsDateBottom = styled.div`
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



// -- Home Sub news component -- //

const MainBoxBottom = styled.div`
  width: 100%;
  max-width: 1401px;
  height: 680px;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  background-color: #ffffff;
  /* border: 1px solid #99999944; */
`;

const MainBoxCategory = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
`;

const CategoryNewsList = styled.div`
  width: 100%;
  max-width: 500px;
  height: 660px;
  padding: 0 20px;
`;

const CategoryNewsMain = styled.div`
  width: 100%;
  max-width: 850px;
  height: 600px;
  padding: 0 20px;
  display: flex;
  align-items: flex-start;
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
  height: 100%;
  margin-top: 30px;
  display: flex;
  align-items: center;
  overflow: hidden;
  position: relative;
  border-radius: 10px;
  `;

const SubNewsImage = styled.img`
  position: absolute;
  height: 100%;
  top: 50%;
  left: 50%;
  border-radius: 10px;
  transform: translate(-50%, -50%);
  &:hover{
    transition: .5s;
    height: 110%;
  }
`;

const SubNewsTextBox = styled.div`
  width: 100%;
  max-width: 700px;
  height: 130px;
  padding: 20px 30px;
  position: absolute;
  bottom: 30px;
  right: 0px;
  border: 1px solid #99999944;
  box-shadow: 5px 5px 5px 5px #99999944;
  background-color: #ffffff;
`;

const SubNewsTitle = styled.div`
  width: 100%;
  height: 64px;
  font-size: 24px;
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



// -- Home Sub news Category component -- //
const BottomCategoryBox = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
`;

const BottomCategory = styled.div`
  width: 100%;
  max-width: 1400px;
  display: flex;
  justify-content: center;
  gap: 5px;
  align-items: flex-end;
`;

const BottomCategoryItem = styled.div`
    width: ${(props) => (props.active ? '100%' : '60%')};
    padding: 20px 25px 5px 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    border-bottom: ${(props) => (props.active ? 'none' : '1px solid #99999944;')};
    cursor: pointer;
    color: ${(props) => (props.active ? '#000000' : '#999999')};
    background-color: ${(props) => (props.active ? '#FFFFFF' : '#f0f0f0')};
    &:hover {
      background: #F0BE4D;
      color: white;
      transition: 0.5s;
  }
`;



// -- Search news component -- //

const WrapperBox = styled.div`
  width: 100%;
  max-width: 1400px;
  height: auto;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 50px 50px 0px 50px;
  margin: auto;
  position: relative;
  `;

const CategoryNewsBack = styled.div`
    width: 100%;
    height: 300px;
    display: flex;
    justify-content: center;
    background-color: #2A9D8F;
    position: absolute;
    z-index: -1;
`;

const DateHead = styled.div`
    width: 100%;
    margin: 30px 0;
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
    font-size: 22px;
    font-weight: 600;
    background-color: #ffffff;
    border: 1px solid #99999944;
    box-shadow: 5px 5px 10px 1px #99999944;
`;

const ArrowBox = styled.div`
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 30px;
    padding-bottom: 6px;
    border-radius: 50%;
    cursor: pointer;
    &:hover{
        background-color: #f0be4d;
        color: #ffffff;
        transition: 0.5s;
    }
`;

const SearchNewsBox = styled.div`
    width: 100%;
    height: 300px;
    border: 1px solid #99999944;
    padding: 30px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #ffffff;
    gap: 20px;
    overflow: hidden;
    &:hover .SearchNewsBtn{
        opacity: 1;
        transition: 0.5s;
        transform: translateX(0);
    }
    &:last-child {
        margin-bottom: 300px;
    }
`;

const SearchBack = styled.div`
    width: 100%;
    height: 300px;
    position: absolute;
    top: 120px;
    background-color: #2A9D8F;
    z-index: -1;
`;

const SearchNewsContentBox = styled.div`
    width: 70%;
    height: 240px;
`;

const SearchNewsImageBox = styled.div`
    width: 30%;
    height: 240px;
    overflow: hidden;
`;

const SearchNewsImage = styled.img`
    width: 100%;
`;

const SearchNewsDateBox = styled.div`
    width: 100%;
    height: 40px;
    padding-bottom: 10px;
    display: flex;
    align-items: center;
    justify-content: left;
    color: #999999;
    gap: 20px;
`;

const SearchNewsMedia = styled.div`
    font-size: 18px;
`;

const SearchNewsDate = styled.div``;

const SearchNewsTitle = styled.div`
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

const SearchNewsContent = styled.div`    
    width: 100%;
    height: 110px;
    font-size: 18px;
    line-height: 1.2;
    overflow: hidden;
    position: relative;
    white-space: pre-wrap;
    word-wrap: break-word;
    display: -webkit-box;
    text-overflow: ellipsis;
    -webkit-line-clamp: 5;
    -webkit-box-orient: vertical;
`;

const SearchInputBox = styled.div`
    width: 100%;
    max-width: 1400px;
    height: 100px;
    margin-bottom: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    `;

const SearchInputBack = styled.div`
    width: 100%;
    max-width: 700px;
    height: 100px;
    background-color: #ffffff;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const SearchInput = styled.input`
  border: none;
  border-bottom: 3px solid #D1D1D4;
  background: none;
  padding: 10px;
  padding-left: 20px;
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
    text-align: center;
    padding-right: 20px;
  }
`;



// -- Category news component -- //

const CategoryWrapperBox = styled.div`
  width: 100%;
  max-width: 1400px;
  height: auto;
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 50px;
  margin: auto;
  position: relative;
  `;

const CategoryNewsArea = styled.div`
  width: 100%;
  max-width: 1400px;
`;

const CategoryNewsBox = styled.div`
    width: 100%;
    height: 300px;
    border: 1px solid #99999944;
    padding: 30px;
    margin-bottom: 0px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    background-color: #ffffff;
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
    white-space: pre-wrap;
    word-wrap: break-word;
    display: -webkit-box;
    text-overflow: ellipsis;
    -webkit-line-clamp: 5;
    -webkit-box-orient: vertical;
`;



// 북마크 뉴스 컴포넌트

const BookMarkBox = styled.div`
  width: 100%;
  max-width: 1200px;
  height: 300px;
  padding: 30px;
  border: 1px solid #99999944;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  box-shadow: 2px 5px 10px 2px #99999944;
  background-color: #ffffff;
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
  height: 72px;
  font-size: 26px;
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
  height: 114px;
  font-size: 18px;
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
    background-color: #ffffff;
  }
  ul.pagination li:first-child{ border-radius: 5px 0 0 5px; }
  ul.pagination li:last-child{ border-radius: 0 5px 5px 0; }
  ul.pagination li a { text-decoration: none; color: #F0BE4D; font-size: 1rem; }
  ul.pagination li.active a { color: white; }
  ul.pagination li.active { background-color: #F0BE4D; }
  ul.pagination li:hover,
  ul.pagination li a:hover,
  ul.pagination li a.active { color: black; }
`;





export function HomeMainNews() {
    const { categoryData, loadingCategory } = useCategoryContext();
    const { categoryNewsData, loadingCategoryNews } = useCategoryNewsContext();
    const { newsData, loading } = useNewsContext();
    const [isFirst, setIsFirst] = useState(true);
    let sortedKeywords;

    // 카드뉴스 뒤집기 핸들러
    const handleCardClick = (event) => {
        const target = event.currentTarget;
        const currentRotation = target.style.transform;
        if (currentRotation === "rotateY(180deg)") {
            target.style.transform = "rotateY(0deg)";
        } else {
            target.style.transform = "rotateY(180deg)";
        }
    };


    // 전체 카테고리 데이터
    // console.log(categoryData);
    // keywordsData 값 가져오기
    // const keywordsDataValue = categoryData;

    // // keywordsData 객체를 배열로 변환하여 값에 따라 정렬
    // const sortedKeywords = Object.entries(keywordsDataValue)
    //     .sort((a, b) => b[1] - a[1]) 
    //     .slice(0, 10) 
    //     .map(entry => entry[0]); 

    // // 결과 출력
    // console.log("Today : ",sortedKeywords);

    // // 오늘의 카테고리 데이터
    console.log(categoryData);


    // // 가져온 데이터를 사용하여 UI를 렌더링  
    const CategoryItems = categoryData.map((categoryData, index) => (
        <Link to="/search" key={index} style={{ textDecoration: "none", color: "black" }} >
            <MainTrendBadge># {categoryData}</MainTrendBadge>
        </Link>
    ));

    return (
        <Main>
            <MainDailyHeader>오늘의 키워드</MainDailyHeader>
            <MainTrendBox>
                {/* {loading ? (
                    <LoadingScreen />
                ) : (
                    CategoryItems
                )} */}
                {/* 테스트용 키워드 */}
                <MainTrendBadge># 국정원 정찰위성 보고</MainTrendBadge>
                <MainTrendBadge># 조달청 전산망 먹통</MainTrendBadge>
                <MainTrendBadge># 네덜란드 총선</MainTrendBadge>
                <MainTrendBadge># 폴리코노미</MainTrendBadge>
                <MainTrendBadge># 슈링크플레이션 신고</MainTrendBadge>
                <MainTrendBadge># 친일파 부당이득 반환</MainTrendBadge>
                <MainTrendBadge># 초록낙엽</MainTrendBadge>
            </MainTrendBox>
            <MainCardNewsBox>
                <MainCardHeader>1분 카드뉴스</MainCardHeader>
                <MainCardNews isFirst={isFirst} onClick={handleCardClick}>
                    <MainCardImageBox isFirst={isFirst}>
                        <MainCardImage src='https://imgnews.pstatic.net/image/243/2023/11/22/0000053053_001_20231122143201301.jpg?type=w647' />
                        <MainCardKey>컴투스</MainCardKey>
                    </MainCardImageBox>
                    <MainCardTextArea isFirst={isFirst}>
                        <MainCardTitle>컴투스, 글로벌 퍼블리싱 사업 확대하고 대작 라인업 강화한다</MainCardTitle>
                        <MainCardContent>
                            '스타시드'의 가장 큰 특징은 수집형 장르에서 쉽게 볼 수 없었던 시원한 실사 비율의 미소녀 캐릭터가 직접 등장하며, 이들이 펼치는 전투 신 또한 액션 RPG 급의 화려한 비주얼로 구현된다는 점이다. 각 인물의 매력을 살린 원화와 애니메이션 등으로 높은 몰입감과 수집의 재미도 느낄 수 있다.
                        </MainCardContent>
                    </MainCardTextArea>
                </MainCardNews>
                <MainCardNews onClick={handleCardClick}>
                    <MainCardImageBox>
                        <MainCardImage src='https://imgnews.pstatic.net/image/081/2023/11/22/0003410814_001_20231122150401146.jpg?type=w647' />
                        <MainCardKey>좀비 사슴</MainCardKey>
                    </MainCardImageBox>
                    <MainCardTextArea>
                        <MainCardTitle>침 질질… 인간 무서워하지 않는 ‘좀비 사슴’ 미국서 확인     침 질질… 인간 무서워하지 않는 ‘좀비 사슴’ 미국서 확인</MainCardTitle>
                        <MainCardContent>
                            침을 질질 흘리면서 사람을 무서워 하지 않는 일명 ‘좀비 사슴’ 질병 사례가 미국 대표 국립공원에서 최초로 확인됐다.
                            최근 뉴욕포스트·포브스 등 주요 외신이 보도한 내용에 따르면 미국 와이오밍주 북서부와 몬태나주 남부, 아이다호주 동부에 걸쳐 있는 세계 최초이자 미국을 대표하는 국립공원인 옐로스톤 국립공원에서 최근 사슴만성소모성질병(CWD)에 걸린 사슴이 처음으로 확인됐다.
                        </MainCardContent>
                    </MainCardTextArea>
                </MainCardNews>
                <MainCardNews onClick={handleCardClick}>
                    <MainCardImageBox>
                        <MainCardImage src='https://imgnews.pstatic.net/image/009/2023/11/21/0005218104_001_20231121135401025.png?type=w647' />
                        <MainCardKey>호텔 케이크</MainCardKey>
                    </MainCardImageBox>
                    <MainCardTextArea>
                        <MainCardTitle>크리스마스 꼬리표 달면 10만원 훌쩍...고물가 자극하는 ‘호텔 케이크’ [소비의 달인]</MainCardTitle>
                        <MainCardContent>
                            12월을 앞두고 주요 호텔들이 크리스마스 케이크를 앞다퉈 내놓기 시작했다. 호텔 케이크라고 하더라도 평상시엔 10만원 미만이지만 크리스마스 꼬리표만 붙이면 10만원을 훌쩍 넘긴다. 올해도 10만원대는 기본이고 20만~30만원짜리 케이크가 줄줄이 출시되고 있다. 고물가 극복이 국가 경제의 화두로 떠오른 상황에서 치솟는 호텔 케이크 값은 사회적 위화감 조성은 물론 물가 상승을 부채질할수 있다는 우려도 나온다.
                        </MainCardContent>
                    </MainCardTextArea>
                </MainCardNews>
                <MainCardNews onClick={handleCardClick}>
                    <MainCardImageBox>
                        <MainCardImage src='https://imgnews.pstatic.net/image/020/2023/11/22/0003532694_001_20231122101403702.jpg?type=w647' />
                        <MainCardKey>찰스 3세</MainCardKey>
                    </MainCardImageBox>
                    <MainCardTextArea>
                        <MainCardTitle>찰스 3세, ‘윤동주 시’로 환영사…셰익스피어로 화답한 尹</MainCardTitle>
                        <MainCardContent>
                            영국을 국빈 방문 중인 윤석열 대통령은 21일(현지 시간) 찰스 3세 국왕이 주최한 국빈 만찬에 참석했다. 찰스 3세가 만찬사에서 한국어로 “영국에 오신 것을 환영한다”고 말하자 참석자들 사이에선 박수가 터져나왔다.
                        </MainCardContent>
                    </MainCardTextArea>
                </MainCardNews>
            </MainCardNewsBox>
            <MainCardNewsArea>
                <MainHeader>오늘의 뉴스</MainHeader>
                <MainNewsBox>
                    {loading ? (
                        <LoadingScreen />
                    ) : (
                        <AutoPlayCarousel newsData={newsData} />
                    )}
                </MainNewsBox>
            </MainCardNewsArea>
            <MainHeader>사람들이 많이 본 뉴스</MainHeader>
            <MainNewsViewsBox>
                {loading ? (
                    <LoadingScreen />
                ) : (
                    <ViewsCarousel newsData={newsData} />
                )}
            </MainNewsViewsBox>
        </Main>
    )
}

export function CategoryNewsComponent() {
    const { newsData, loading } = useNewsContext();
    const { newsViewData, viewLoading } = useNewsViewContext();
    const [page, setPage] = useState(1);
    const [items, setItems] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const [sortedNewsData, setSortedNewsData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredNewsData, setFilteredNewsData] = useState([]);
    const [modalOn, setModalOn] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [onMenu, setOnMenu] = useState('content1');
    const [totalItemsCount, setTotalItemsCount] = useState()

    // 데이터를 최근 날짜순으로 초기 데이터 필터링
    useEffect(() => {
        if (newsData.length > 0) {
            const sortedData = [...newsData].sort((a, b) => {
                const dateA = new Date(a.articleWriteTime);
                const dateB = new Date(b.articleWriteTime);
                return dateB - dateA;
            });
            const filteredResults = sortedData.filter((item) =>
                item.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setSortedNewsData(sortedData);
            setFilteredNewsData(filteredResults);
            calculateTotalPages(filteredResults.length, items);
            setTotalItemsCount(filteredResults.length - 6)
        }
    }, [newsData, searchTerm, items]);

    // 날짜에 해당하는 데이터만 필터링하는 함수
    const filterDataByDate = (data, targetDate) => {
        return data.filter((item) => {
            const itemDate = new Date(item.articleWriteTime);
            return itemDate.toDateString() === targetDate.toDateString();
        });
    };

    // 날짜에 해당하는 데이터만 필터링
    const filteredNewsByDate = filterDataByDate(newsData, currentDate);

    // 페이징 코드
    const handlePageChange = (page) => {
        window.scrollTo({ top: 0 });
        setPage(page);
    };

    const calculateTotalPages = (totalItems, itemsPerPage) => {
        const totalPages = Math.ceil(totalItems / itemsPerPage);
        setTotalPages(totalPages);
    };

    // 검색 결과에 대해 페이징된 데이터 가져오기
    const startIndex = (page - 1) * items;
    const endIndex = startIndex + items;
    const paginatedData = filteredNewsData.slice(startIndex, endIndex);

    const searchList = () => {
        return paginatedData.filter((itemData) =>
            itemData.title.toUpperCase().includes(searchTerm.toUpperCase())
        );
    };

    // 정렬된 전체데이터
    const filterCategoryItem = searchList();
    // 첫번째 데이터
    const firstItem = filterCategoryItem.length > 0 ? [filterCategoryItem[0]] : [];
    // 두번째부터 여섯번째 까지의 데이터
    const restItems = filterCategoryItem.slice(1, 6);
    // 나머지 데이터
    const otherItems = filterCategoryItem.slice(6);

    const handleModal = async (item) => {
        setSelectedItem(item);
        setModalOn(!modalOn);

        // API 호출 등을 통해 viewCount를 1 증가시키는 작업 수행
        try {
            const response = await axios.get(`/api/news/detail/${item.id}`);
            const { setNewsData } = useNewsViewContext();
            useEffect(() => {
                setNewsData(response.data);
                console.log('데이터가 성공적으로 로드되었습니다:', response.data);
            }, [response.data, setNewsData]);

        } catch (error) {
            console.error('데이터 로드 중 오류 발생:', error);
        }
    };

    console.log(items * (page - 1), items * (page - 1) + items)

    // 날짜 핸들링
    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}. ${month}. ${day}`;
    };

    const handleDateChange = (amount) => {
        const newDate = new Date(currentDate);
        newDate.setDate(currentDate.getDate() + amount);
        const today = new Date();

        // 오늘 이후로는 변경하지 않도록 함
        if (newDate <= today) {
            setCurrentDate(newDate);
            const filteredData = filterDataByDate(newsData, newDate);
            setFilteredNewsData(filteredData);
            calculateTotalPages(filteredData.length, items);
        }
    };

    const handleContentClick = (contentClass) => {
        // 카테고리 메뉴 클릭시 css 제어
        setOnMenu(contentClass);
        // 카테고리에 따라 데이터 필터링 수행
        let filteredData;
        switch (contentClass) {
            case 'content1':
                filteredData = sortedNewsData;
                break;
            case 'content2':
                filteredData = sortedNewsData.filter(item => item.category === '사회');
                break;
            case 'content3':
                filteredData = sortedNewsData.filter(item => item.category === '정치');
                break;
            case 'content4':
                filteredData = sortedNewsData.filter(item => item.category === '경제');
                break;
            case 'content5':
                filteredData = sortedNewsData.filter(item => item.category === '국제');
                break;
            case 'content6':
                filteredData = sortedNewsData.filter(item => item.category === '문화');
                break;
            case 'content7':
                filteredData = sortedNewsData.filter(item => item.category === '연예');
                break;
            case 'content8':
                filteredData = sortedNewsData.filter(item => item.category === '스포츠');
                break;
            case 'content9':
                filteredData = sortedNewsData.filter(item => item.category === 'IT');
                break;

            default:
                filteredData = sortedNewsData;
        }

        // 필터링된 데이터를 업데이트하고 페이지 등을 계산
        setFilteredNewsData(filteredData);
        calculateTotalPages(filteredData.length, items);
        setTotalItemsCount(filteredData.length - 6)
        setPage(1);
    };



    // 가져온 데이터를 사용하여 UI를 렌더링  
    const CategoryNewsItems = restItems.map((item, index) => (
        <BottomListItem key={item.id} onClick={() => handleModal(item)}>
            <NewsHeaderItem>
                <NewsMediaText>{item.press}</NewsMediaText>
                <NewsDateText>{item.articleWriteTime}</NewsDateText>
            </NewsHeaderItem>
            <ListNewsTitle>{item.title}</ListNewsTitle>
        </BottomListItem>
    ));

    const CategoryNewsMainItems = firstItem.map((item, index) => (
        <CategoryNewsMain key={item.id} onClick={() => handleModal(item)}>
            <SubNewsImageBox>
                <SubNewsImage src={item.picture} />
            </SubNewsImageBox>
            <SubNewsTextBox>
                <NewsHeaderItem>
                    <NewsMediaBottom>{item.press}</NewsMediaBottom>
                    <NewsDateBottom>{item.articleWriteTime}</NewsDateBottom>
                </NewsHeaderItem>
                <SubNewsTitle>{item.title}</SubNewsTitle>
            </SubNewsTextBox>
        </CategoryNewsMain>
    ));

    const CategoryNewsOtherItems = otherItems.map((item, index) => (
        <CategoryNewsBox className='CategoryNewsBox' key={item.id} onClick={() => handleModal(item)}>
            <CategoryNewsContentBox key={index}>
                <CategoryNewsDateBox>
                    <CategoryNewsMedia>{item.press}</CategoryNewsMedia>
                    <CategoryNewsDate>{item.articleWriteTime}</CategoryNewsDate>
                </CategoryNewsDateBox>
                <CategoryNewsTitle>{item.title}</CategoryNewsTitle>
                <CategoryNewsContent>{item.summary}</CategoryNewsContent>
            </CategoryNewsContentBox>
            <CategoryNewsImageBox>
                <CategoryNewsImage src={item.picture} />
            </CategoryNewsImageBox>
        </CategoryNewsBox>
    ));



    return (
        <>
            <CategoryNewsBack>
            </CategoryNewsBack>
            <DateHead>
                <DateBox>
                    <ArrowBox onClick={() => handleDateChange(-1)}>&lt;</ArrowBox>
                    {formatDate(currentDate)}
                    <ArrowBox onClick={() => handleDateChange(1)}>&gt;</ArrowBox>
                </DateBox>
            </DateHead>
            <BottomCategoryBox>
                <BottomCategory>
                    <BottomCategoryItem onClick={() => handleContentClick('content1')} active={onMenu === 'content1'}>전체</BottomCategoryItem>
                    <BottomCategoryItem onClick={() => handleContentClick('content2')} active={onMenu === 'content2'}>사회</BottomCategoryItem>
                    <BottomCategoryItem onClick={() => handleContentClick('content3')} active={onMenu === 'content3'}>정치</BottomCategoryItem>
                    <BottomCategoryItem onClick={() => handleContentClick('content4')} active={onMenu === 'content4'}>경제</BottomCategoryItem>
                    <BottomCategoryItem onClick={() => handleContentClick('content5')} active={onMenu === 'content5'}>국제</BottomCategoryItem>
                    <BottomCategoryItem onClick={() => handleContentClick('content6')} active={onMenu === 'content6'}>문화</BottomCategoryItem>
                    <BottomCategoryItem onClick={() => handleContentClick('content7')} active={onMenu === 'content7'}>연예</BottomCategoryItem>
                    <BottomCategoryItem onClick={() => handleContentClick('content8')} active={onMenu === 'content8'}>스포츠</BottomCategoryItem>
                    <BottomCategoryItem onClick={() => handleContentClick('content9')} active={onMenu === 'content9'}>IT</BottomCategoryItem>
                </BottomCategory>
            </BottomCategoryBox>
            <MainBoxCategory>
                <MainBoxBottom>
                    <CategoryNewsList>
                        {loading ? (
                            <LoadingScreen />
                        ) : (
                            CategoryNewsItems
                        )}
                    </CategoryNewsList>
                    {loading ? (
                        <LoadingScreen />
                    ) : (
                        CategoryNewsMainItems
                    )}

                </MainBoxBottom>
            </MainBoxCategory>


            <CategoryWrapperBox>
                <CategoryNewsArea>
                    {loading ? (
                        <LoadingScreen />
                    ) : (
                        CategoryNewsOtherItems
                    )}
                </CategoryNewsArea>
            </CategoryWrapperBox>
            <PaginationBox>
                <Pagination
                    activePage={page}
                    itemsCountPerPage={items}
                    totalItemsCount={totalItemsCount}
                    pageRangeDisplayed={5}
                    onChange={handlePageChange}>
                </Pagination>
            </PaginationBox>
            <ModalPortal>
                {modalOn && <Modal item={selectedItem} onClose={() => setModalOn(false)} />}
            </ModalPortal>

        </>
    )
}

export function SearchNewsComponent() {
    const { newsData, loading } = useNewsContext();
    const { newsViewData, viewLoading } = useNewsViewContext();
    const [page, setPage] = useState(1);
    const [items, setItems] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredNewsData, setFilteredNewsData] = useState([]);
    const [modalOn, setModalOn] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    // 데이터를 최근 날짜순으로 정렬 및 검색어에 따라 초기 데이터 필터링
    useEffect(() => {
        if (newsData.length > 0) {
            const sortedData = [...newsData].sort((a, b) => {
                const dateA = new Date(a.articleWriteTime);
                const dateB = new Date(b.articleWriteTime);
                return dateB - dateA;
            });

            // 검색어에 따라 초기 데이터 필터링 ( 검색어 제목,내용 )
            const filteredResults = sortedData.filter((item) =>
                item.title && item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.summary && item.summary.toLowerCase().includes(searchTerm.toLowerCase())
            );

            setFilteredNewsData(filteredResults);
            calculateTotalPages(filteredResults.length, items);
        }
    }, [newsData, searchTerm, items]);

    // 검색어 입력 시 결과를 업데이트하고 페이징을 계산
    const handleSearchInputChange = (e) => {
        const newSearchTerm = e.target.value;
        setSearchTerm(newSearchTerm);
        console.log(newsData);

        // 검색어에 따라 전체 데이터 필터링
        const filteredResults = newsData.filter((item) =>
            item.title && item.title.toLowerCase().includes(newSearchTerm.toLowerCase()) ||
            item.summary && item.summary.toLowerCase().includes(newSearchTerm.toLowerCase())
        );

        calculateTotalPages(filteredResults.length, items);
        setFilteredNewsData(filteredResults);
        setPage(1);
    };

    // 페이징 코드
    const handlePageChange = (page) => {
        window.scrollTo({ top: 0 });
        setPage(page);
    };

    const calculateTotalPages = (totalItems, itemsPerPage) => {
        const totalPages = Math.ceil(totalItems / itemsPerPage);
        setTotalPages(totalPages);
    };

    // 검색 결과에 대해 페이징된 데이터 가져오기
    const startIndex = (page - 1) * items;
    const endIndex = startIndex + items;
    const paginatedData = filteredNewsData.slice(startIndex, endIndex);

    const searchList = () => {
        return paginatedData.filter((itemData) =>
        itemData.title && itemData.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        itemData.summary && itemData.summary.toLowerCase().includes(searchTerm.toLowerCase())
        );
    };

    const filteredSearchItems = searchList();

    const handleModal = async (item) => {
        setSelectedItem(item);
        setModalOn(!modalOn);

        // API 호출 등을 통해 viewCount를 1 증가시키는 작업 수행
        try {
            const response = await axios.get(`/api/news/detail/${item.id}`);
            const { setNewsData } = useNewsViewContext();
            useEffect(() => {
                setNewsData(response.data);
                console.log('데이터가 성공적으로 로드되었습니다:', response.data);
            }, [response.data, setNewsData]);

        } catch (error) {
            console.error('데이터 로드 중 오류 발생:', error);
        }
    };

    // 가져온 데이터를 사용하여 UI를 렌더링  
    const SearchNewsItems = filteredSearchItems.map((item, index) => (
        <SearchNewsBox className='SearchNewsBox' key={item.id} onClick={() => handleModal(item)}>
            <SearchNewsContentBox>
                <SearchNewsDateBox>
                    <SearchNewsMedia>{item.press}</SearchNewsMedia>
                    <SearchNewsDate>{item.articleWriteTime}</SearchNewsDate>
                </SearchNewsDateBox>
                <SearchNewsTitle>{item.title}</SearchNewsTitle>
                <SearchNewsContent>{item.summary}</SearchNewsContent>
            </SearchNewsContentBox>
            <SearchNewsImageBox>
                <SearchNewsImage src={item.picture} />
            </SearchNewsImageBox>
        </SearchNewsBox>
    ));

    return (
        <>
            <SearchBack></SearchBack>
            <WrapperBox>
                <SearchInputBox>
                    <SearchInputBack>
                        <SearchInput value={searchTerm} onChange={handleSearchInputChange} placeholder='검색어를 입력해주세요' />
                    </SearchInputBack>
                </SearchInputBox>
                {loading ? (
                    <LoadingScreen />
                ) : (
                    SearchNewsItems
                )}
                <PaginationBox>
                    <Pagination
                        activePage={page}
                        itemsCountPerPage={items}
                        totalItemsCount={filteredNewsData.length}
                        pageRangeDisplayed={5}
                        onChange={handlePageChange}>
                    </Pagination>
                </PaginationBox>
                <ModalPortal>
                    {modalOn && <Modal item={selectedItem} onClose={() => setModalOn(false)} />}
                </ModalPortal>
            </WrapperBox>
        </>
    )
}

export function BookMarkNewsComponent() {
    const { newsData, loading } = useNewsContext();
    const { newsViewData, viewLoading } = useNewsViewContext();
    const [page, setPage] = useState(1);
    const [items, setItems] = useState(10);
    const [modalOn, setModalOn] = useState(false);
    const [totalPages, setTotalPages] = useState(1);
    const [selectedItem, setSelectedItem] = useState(null);
    const [sortedNewsData, setSortedNewsData] = useState([]);
    const [totalItemsCount, setTotalItemsCount] = useState()
    const [filteredNewsData, setFilteredNewsData] = useState([]);

    // 데이터를 최근 날짜순으로 초기 데이터 필터링
    useEffect(() => {
        if (newsData.length > 0) {
            const sortedData = [...newsData].sort((a, b) => {
                const dateA = new Date(a.articleWriteTime);
                const dateB = new Date(b.articleWriteTime);
                return dateB - dateA;
            });

            setSortedNewsData(sortedData);
            setFilteredNewsData(sortedData);
            calculateTotalPages(sortedData.length, items);
            setTotalItemsCount(sortedData.length)
        }
    }, [newsData, items]);

    // 페이징 코드
    const handlePageChange = (page) => {
        window.scrollTo({ top: 0 });
        setPage(page);
    };

    const calculateTotalPages = (totalItems, itemsPerPage) => {
        const totalPages = Math.ceil(totalItems / itemsPerPage);
        setTotalPages(totalPages);
    };

    // 검색 결과에 대해 페이징된 데이터 가져오기
    const startIndex = (page - 1) * items;
    const endIndex = startIndex + items;
    // data에 게시판 데이터 넣기
    const paginatedData = sortedNewsData.slice(startIndex, endIndex);

    const searchList = () => {
        return paginatedData.filter((itemData) =>
            itemData.title.toUpperCase().includes(searchTerm.toUpperCase())
        );
    };

    const handleModal = async (item) => {
        setSelectedItem(item);
        setModalOn(!modalOn);

        // API 호출 등을 통해 viewCount를 1 증가시키는 작업 수행
        try {
            const response = await axios.get(`/api/board/detail/${bdIdx}`);
            const { setNewsData } = useNewsViewContext();
            useEffect(() => {
                setNewsData(response.data);
                console.log('데이터가 성공적으로 로드되었습니다:', response.data);
            }, [response.data, setNewsData]);

        } catch (error) {
            console.error('데이터 로드 중 오류 발생:', error);
        }
    };
    // 정렬된 전체데이터
    const filterCategoryItem = sortedNewsData;
    // 테스트용 데이터
    const restItems = filterCategoryItem.slice(0, 8);

    const BookMarkNewsItems = restItems.map((item, index) => (
        <>
            <BookMarkBox className='CategoryNewsBox' key={item.id} onClick={() => handleModal(item)}>
                <BookMarkTextBox key={index}>
                    <BookMarkDateBox>
                        <BookMarkMedia>{item.press}</BookMarkMedia>
                        <BookMarkDate>{item.articleWriteTime}</BookMarkDate>
                    </BookMarkDateBox>
                    <BookMarkTitle>{item.title}</BookMarkTitle>
                    <BookMarkContent>{item.summary}</BookMarkContent>
                </BookMarkTextBox>
                <BookMarkImageBox src={item.picture} />
            </BookMarkBox>
        </>
    ));

    return (
        <>
            {loading ? (
                <LoadingScreen />
            ) : (
                BookMarkNewsItems
            )}
            <PaginationBox>
                <Pagination
                    activePage={page}
                    itemsCountPerPage={items}
                    totalItemsCount={restItems.length}
                    pageRangeDisplayed={5}
                    onChange={handlePageChange}>
                </Pagination>
            </PaginationBox>
            <ModalPortal>
                {modalOn && <Modal item={selectedItem} onClose={() => setModalOn(false)} />}
            </ModalPortal>
        </>
    );
}