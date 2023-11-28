import { useEffect, useState } from 'react';
import axios from 'axios';
import styled, { css, keyframes } from 'styled-components';
import WordcloudResult from '../components/wordcloud';
import AutoPlayCarousel, { ViewsCarousel } from '../components/carousel';
import ArrowLeft from '../assets/arrow-left-circle.svg';
import ArrowRight from '../assets/arrow-right-circle.svg';
import MyBarChart from '../components/bar-chart';
import Bookmark from '../assets/bookmark.svg';
import BookmarkOn from '../assets/bookmark-on.svg';
import Pagination from "react-js-pagination";
import { AutoComponent } from '../data/news-data';

// -- Home Main news component -- //
const Main = styled.div`
  width: 100%;
  max-width: 1400px;
  padding: 50px 0 150px 0;
`;

const MainHeader = styled.div`
    width: 100%;
    font-size: 28px;
    padding: 30px 30px 0 30px;
    display: flex;
    align-items: center;
    background-color: #ffffff;
`;



// -- Home Trend badge component -- //
const MainTrendBox = styled.div`
    width: 100%;
    padding: 30px 40px;
    gap: 20px 40px;
    margin-bottom: 100px;
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



// -- Home 1second news component -- //
const MainSearchBox = styled.div`
    width: 100%;
    height: 320px;
    padding: 30px 40px;
    gap: 40px;
    margin-bottom: 100px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    background-color: #ffffff;
    box-shadow: 5px 5px 5px 2px #99999944;
`;

const MainSearchNews = styled.div`
    width: 100%;
    max-width: 300px;
    height: 260px;
    position: relative;
    display: flex;
    align-items: center;
    &.dailynews-box1:hover {
        z-index: 100;
        .dailynews-area1 {
            transform: translateY(-100%);
            transition: 0.8s;
        }
    }
    &.dailynews-box2:hover {
        z-index: 100;
        .dailynews-imagebox2{
            transform: translateX(calc(-100% - 40px));
            transition: 0.4s;
        }
        .dailynews-area2 {
            transform: translateY(-100%);
            transition: 0.8s;
            transition-delay: 0.4s;
        }
    }
    &.dailynews-box3:hover {
        z-index: 100;
        .dailynews-imagebox3{
            transform: translateX(calc(-200% - 80px));
            transition: 0.6s;
        }
        .dailynews-area3 {
            transform: translateY(-100%);
            transition: 0.8s;
            transition-delay: 0.6s;
        }
    }
    &.dailynews-box4:hover {
        z-index: 100;
        .dailynews-imagebox4{
            transform: translateX(calc(-300% - 120px));
            transition: 0.9s;
        }
        .dailynews-area4 {
            transform: translateY(-100%);
            transition: 0.8s;
            transition-delay: 0.9s;
        }
    }
`;

const MainSearchIamgeBox = styled.div`
    width: 100%;
    position: relative;
`;

const MainSearchImage = styled.img`
    width: 100%;
    max-width: 300px;
    height: 260px;
    object-fit: cover;
`;

const MainSearchTextArea = styled.div`
    width: 340%;
    height: 270px;
    position: absolute;
    left: 310px;
    padding: 20px 20px;
    backdrop-filter: blur(10px);
    background-color: rgba(255, 255, 255, 0.8);
    border: 1px solid #99999944;
    transform: translateY(20%);
`;

const MainSearchTitle = styled.div`
    width: 100%;
    padding: 10px;
    font-size: 32px;
    font-weight: 600;
`;

const MainSearchContent = styled.div`
    width: 100%;
    height: 210px;
    padding: 20px;
    font-size: 20px;
    line-height: 1.3;
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



// -- Home Main category news carousel component -- //
const MainCategoryNewsBox = styled.div`
    width: 100%;
    height: 400px;
    gap: 30px;
    padding: 30px 10px;
    display: flex;
    align-items: center;
    background-color: #ffffff;
    box-shadow: 5px 5px 5px 2px #99999944;
`;



// -- Home Trend news component -- //

const TrendBox = styled.div`
  width: 100%;
  max-width: 1400px;
  height: 800px;
  padding: 20px;
  background-color: #ffffff;
  border: 1px solid #99999944;
  box-shadow: 5px 5px 5px 2px #99999944;
`;

const ArrowButton = styled.img`
  width: 50px;
  height: 50px;
  cursor: pointer;
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
  width: 600px;
  height: 800px;
`;

const GraphBox = styled.div`
  width: 100%;
  height: 850px;
  padding-right: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const GraphHeader = styled.div`
  width: 500px;
  height: 100px;
  padding: 20px 0 0 80px  ;
  display: flex;
  gap: 50px;
`;

const GraphContent = styled.div`
  width: 600px;
  height: 800px;
`;

const GraphTextBox = styled.div`
  width: 60%;
  height: 100px;
`;

const GraphTitle = styled.div`
  white-space: nowrap;
  padding-bottom: 20px;
  font-size: 36px;
`;

const GraphText = styled.div`
  font-size: 24px;
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
  max-width: 1400px;
  height: 850px;
  padding: 20px;
  display: flex;
  justify-content: center;
  flex-direction: row;
  background-color: #ffffff;
  border: 1px solid #99999944;
  box-shadow: 5px 5px 5px 2px #99999944;
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



// -- Search news component -- //

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
    margin-top: 30px;
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
    gap: 20px;
    overflow: hidden;
    &:hover .SearchNewsBtn{
        opacity: 1;
        transition: 0.5s;
        transform: translateX(0);
    }
`;

const SearchNewsContentBox = styled.div`
    width: 70%;
    height: 240px;
`;

const SearchNewsImageBox = styled.div`
    width: 30%;
    height: 240px;
    object-fit:cover;
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
    white-space: normal;
    word-wrap: break-word;
    display: -webkit-box;
    text-overflow: ellipsis;
    -webkit-line-clamp: 5;
    -webkit-box-orient: vertical;
`;

const SearchNewsSideSlide = styled.div`
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

const SearchNewsSideBtn = styled.img`
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
  background-color: #ffffff;
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
        width:20px;
        padding-left: 4px;
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
            <MainHeader>오늘 뜨는 뉴스</MainHeader>
            <MainTrendBox>
                <MainTrendBadge>국정원 정찰위성 보고</MainTrendBadge>
                <MainTrendBadge>조달청 전산망 먹통</MainTrendBadge>
                <MainTrendBadge>네덜란드 총선</MainTrendBadge>
                <MainTrendBadge>폴리코노미</MainTrendBadge>
                <MainTrendBadge>슈링크플레이션 신고</MainTrendBadge>
                <MainTrendBadge>친일파 부당이득 반환</MainTrendBadge>
                <MainTrendBadge>초록낙엽</MainTrendBadge>
                <MainTrendBadge>갤럭시 마르지엘라 에디션</MainTrendBadge>
            </MainTrendBox>
            <MainHeader>1분뉴스</MainHeader>
            <MainSearchBox>
                <MainSearchNews className='dailynews-box1'>
                    <MainSearchIamgeBox className='dailynews-imagebox1'>
                        <MainSearchImage className='dailynews-img1' src='https://imgnews.pstatic.net/image/243/2023/11/22/0000053053_001_20231122143201301.jpg?type=w647' />
                        <MainSearchTextArea className='dailynews-area1'>
                            <MainSearchTitle>컴투스, 글로벌 퍼블리싱 사업 확대하고 대작 라인업 강화한다</MainSearchTitle>
                            <MainSearchContent>'스타시드'의 가장 큰 특징은 수집형 장르에서 쉽게 볼 수 없었던 시원한 실사 비율의 미소녀 캐릭터가 직접 등장하며, 이들이 펼치는 전투 신 또한 액션 RPG 급의 화려한 비주얼로 구현된다는 점이다. 각 인물의 매력을 살린 원화와 애니메이션 등으로 높은 몰입감과 수집의 재미도 느낄 수 있다.</MainSearchContent>
                        </MainSearchTextArea>
                    </MainSearchIamgeBox>
                </MainSearchNews>
                <MainSearchNews className='dailynews-box2'>
                    <MainSearchIamgeBox className='dailynews-imagebox2'>
                        <MainSearchImage className='dailynews-img2' src='https://imgnews.pstatic.net/image/081/2023/11/22/0003410814_001_20231122150401146.jpg?type=w647' />
                        <MainSearchTextArea className='dailynews-area2'>
                            <MainSearchTitle>침 질질… 인간 무서워하지 않는 ‘좀비 사슴’ 미국서 확인</MainSearchTitle>
                            <MainSearchContent>침을 질질 흘리면서 사람을 무서워 하지 않는 일명 ‘좀비 사슴’ 질병 사례가 미국 대표 국립공원에서 최초로 확인됐다.
                                최근 뉴욕포스트·포브스 등 주요 외신이 보도한 내용에 따르면 미국 와이오밍주 북서부와 몬태나주 남부, 아이다호주 동부에 걸쳐 있는 세계 최초이자 미국을 대표하는 국립공원인 옐로스톤 국립공원에서 최근 사슴만성소모성질병(CWD)에 걸린 사슴이 처음으로 확인됐다.</MainSearchContent>
                        </MainSearchTextArea>
                    </MainSearchIamgeBox>
                </MainSearchNews>
                <MainSearchNews className='dailynews-box3'>
                    <MainSearchIamgeBox className='dailynews-imagebox3'>
                        <MainSearchImage className='dailynews-img3' src='https://imgnews.pstatic.net/image/020/2023/11/22/0003532694_001_20231122101403702.jpg?type=w647' />
                        <MainSearchTextArea className='dailynews-area3'>
                            <MainSearchTitle>찰스 3세, ‘윤동주 시’로 환영사…셰익스피어로 화답한 尹</MainSearchTitle>
                            <MainSearchContent>영국을 국빈 방문 중인 윤석열 대통령은 21일(현지 시간) 찰스 3세 국왕이 주최한 국빈 만찬에 참석했다. 찰스 3세가 만찬사에서 한국어로 “영국에 오신 것을 환영한다”고 말하자 참석자들 사이에선 박수가 터져나왔다.</MainSearchContent>
                        </MainSearchTextArea>
                    </MainSearchIamgeBox>
                </MainSearchNews>
                <MainSearchNews className='dailynews-box4'>
                    <MainSearchIamgeBox className='dailynews-imagebox4'>
                        <MainSearchImage className='dailynews-img4' src='https://imgnews.pstatic.net/image/009/2023/11/21/0005218104_001_20231121135401025.png?type=w647' />
                        <MainSearchTextArea className='dailynews-area4'>
                            <MainSearchTitle>크리스마스 꼬리표 달면 10만원 훌쩍...고물가 자극하는 ‘호텔 케이크’ [소비의 달인]</MainSearchTitle>
                            <MainSearchContent>12월을 앞두고 주요 호텔들이 크리스마스 케이크를 앞다퉈 내놓기 시작했다. 호텔 케이크라고 하더라도 평상시엔 10만원 미만이지만 크리스마스 꼬리표만 붙이면 10만원을 훌쩍 넘긴다. 올해도 10만원대는 기본이고 20만~30만원짜리 케이크가 줄줄이 출시되고 있다. 고물가 극복이 국가 경제의 화두로 떠오른 상황에서 치솟는 호텔 케이크 값은 사회적 위화감 조성은 물론 물가 상승을 부채질할수 있다는 우려도 나온다.</MainSearchContent>
                        </MainSearchTextArea>
                    </MainSearchIamgeBox>
                </MainSearchNews>
            </MainSearchBox>
            <MainHeader>오늘의 뉴스</MainHeader>
            <MainNewsBox>
                <AutoComponent>
                    <AutoPlayCarousel />
                </AutoComponent>
            </MainNewsBox>
            <MainHeader>사람들이 많이 본 뉴스</MainHeader>
            <MainCategoryNewsBox>
                <ViewsCarousel />
            </MainCategoryNewsBox>
        </Main>
    )
}

export function HomeTrendNews() {
    return (
        <TrendBox>
            <GraphHeader>
                <GraphTextBox>
                    <GraphTitle>오늘의 트렌드</GraphTitle>
                    <GraphText>연예 트렌드</GraphText>
                </GraphTextBox>
                <GraphBtn>
                    <ArrowButton src={ArrowLeft} />
                    <ArrowButton src={ArrowRight} />
                </GraphBtn>
            </GraphHeader>
            <GraphBox>
                <WordCloudBox>
                    <WordcloudResult />
                </WordCloudBox>
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

export function SearchNewsComponent() {
    return (
        <WrapperBox>
            <SearchNewsBox className='SearchNewsBox'>
                <SearchNewsSideSlide className='SearchNewsBtn'>
                    <SearchNewsSideBtn src={BookmarkOn} />
                    <SearchNewsSideBtn src={Bookmark} />
                </SearchNewsSideSlide>
                <SearchNewsContentBox>
                    <SearchNewsDateBox>
                        <SearchNewsMedia>마이데일리</SearchNewsMedia>
                        <SearchNewsDate>2023.11.21. 9:02</SearchNewsDate>
                    </SearchNewsDateBox>
                    <SearchNewsTitle>"빅스의 무한한 여정, 멤버들끼리 약속한 것 있어요" [MD인터뷰](종합)"빅스의 무한한 여정, 멤버들끼리 약속한 것 있어요" [MD인터뷰](종합)"빅스의 무한한 여정, 멤버들끼리 약속한 것 있어요" [MD인터뷰](종합)</SearchNewsTitle>
                    <SearchNewsContent>
                        '컨티뉴엄(CONTINUUM)'은 '연속'이라는 대주제를 다양한 콘셉트로 풀어내며 '빅스'로서 끊임없이 연결된 무한한 여정을 담았다. 지난 2019년 발매된 디지털 싱글 '패럴렐(PARALLEL)' 이후 4년 2개월 만의 신보이기도 하다.
                        2012년 5월 24일 데뷔한 빅스는 올해 11주년을 맞이했다. '컨티뉴엄(CONTINUUM)'에는 지금 이 시점에서 이들이 생각한 '빅스스러움'이 담겼다. 음악, 퍼포먼스 특히 콘셉트까지 이번 앨범을 통해 담아낸 '나'의 정체성, 우리'의 정체성, '빅스'의 정체성이 궁금해졌다.
                        다양한 걸 하겠지만 빅스가 이런 걸로 색깔이 잡힐 수 있는, 강점이 있는 팀이 되면 좋겠다"고 포부를 드러냈다.
                    </SearchNewsContent>
                </SearchNewsContentBox>
                <SearchNewsImageBox>
                    <SearchNewsImage src='https://mimgnews.pstatic.net/image/117/2023/11/21/0003789283_002_20231121090208311.jpg?type=w540' />
                </SearchNewsImageBox>
            </SearchNewsBox>
            <SearchNewsBox className='SearchNewsBox'>
                <SearchNewsSideSlide className='SearchNewsBtn'>
                    <SearchNewsSideBtn src={BookmarkOn} />
                    <SearchNewsSideBtn src={Bookmark} />
                </SearchNewsSideSlide>
                <SearchNewsContentBox>
                    <SearchNewsDateBox>
                        <SearchNewsMedia>마이데일리</SearchNewsMedia>
                        <SearchNewsDate>2023.11.21. 9:02</SearchNewsDate>
                    </SearchNewsDateBox>
                    <SearchNewsTitle>"빅스의 무한한 여정, 멤버들끼리 약속한 것 있어요" [MD인터뷰](종합)"빅스의 무한한 여정, 멤버들끼리 약속한 것 있어요" [MD인터뷰](종합)"빅스의 무한한 여정, 멤버들끼리 약속한 것 있어요" [MD인터뷰](종합)</SearchNewsTitle>
                    <SearchNewsContent>
                        '컨티뉴엄(CONTINUUM)'은 '연속'이라는 대주제를 다양한 콘셉트로 풀어내며 '빅스'로서 끊임없이 연결된 무한한 여정을 담았다. 지난 2019년 발매된 디지털 싱글 '패럴렐(PARALLEL)' 이후 4년 2개월 만의 신보이기도 하다.
                        2012년 5월 24일 데뷔한 빅스는 올해 11주년을 맞이했다. '컨티뉴엄(CONTINUUM)'에는 지금 이 시점에서 이들이 생각한 '빅스스러움'이 담겼다. 음악, 퍼포먼스 특히 콘셉트까지 이번 앨범을 통해 담아낸 '나'의 정체성, 우리'의 정체성, '빅스'의 정체성이 궁금해졌다.
                        다양한 걸 하겠지만 빅스가 이런 걸로 색깔이 잡힐 수 있는, 강점이 있는 팀이 되면 좋겠다"고 포부를 드러냈다.
                    </SearchNewsContent>
                </SearchNewsContentBox>
                <SearchNewsImageBox>
                    <SearchNewsImage src='https://mimgnews.pstatic.net/image/117/2023/11/21/0003789283_002_20231121090208311.jpg?type=w540' />
                </SearchNewsImageBox>
            </SearchNewsBox>
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
            <DateHead>
                <DateBox>
                    <ArrowBox>&lt;</ArrowBox>
                    2023. &nbsp;11. &nbsp;21
                    <ArrowBox>&gt;</ArrowBox>
                </DateBox>
            </DateHead>
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