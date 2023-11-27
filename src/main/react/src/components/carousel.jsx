import React, { createContext, useContext, useEffect, useState } from 'react';
import range from 'lodash/range';
import styled from 'styled-components';
import ItemsCarousel from 'react-items-carousel';
import axios from 'axios';
// import LoadingScreen from './loading-screen';
// import NewsListContext from './news-data'

const noOfItems = 12;
const noOfCards = 3;
const autoPlayDelay = 3000;
const chevronWidth = 40;

const Wrapper = styled.div`
  padding: 0 ${chevronWidth}px;
  max-width: 1300px;
  margin: 0 auto;
`;

const SlideItem = styled.div`
  height: 500px;
  padding: 10px;
  border: 1px solid #99999999;
  display: flex;
  flex-direction: column;
`;

const SlideViewsItem = styled.div`
  height: 340px;
  padding: 10px;
  border: 1px solid #99999999;
  display: flex;
  flex-direction: column;
`;

const NewsImageBox = styled.div`
    height: 200px;
    margin-bottom: 10px;
    overflow: hidden;
`;

const NewsImage = styled.img`
    width: 100%;
    object-fit:cover;
`;

const NewsTitle = styled.div`
    height: 54px;
    overflow: hidden;
    font-size: 26px;
    font-weight: 600;
    margin: 10px;
    white-space: normal;
    word-wrap: break-word;
    display: -webkit-box;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
`;

const NewsViewsTitle = styled.div`
    height: 80px;
    overflow: hidden;
    font-size: 26px;
    font-weight: 600;
    margin: 10px;
    white-space: normal;
    word-wrap: break-word;
    display: -webkit-box;
    text-overflow: ellipsis;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
`;

const NewsContent = styled.div`
    width: 100%;
    height: 196px;
    padding: 10px;
    font-size: 20px;
    overflow: hidden;
    line-height: 1.3;
    white-space: normal;
    word-wrap: break-word;
    display: -webkit-box;
    text-overflow: ellipsis;
    -webkit-line-clamp: 7;
    -webkit-box-orient: vertical;
`;

const CarouselButton = styled.button`
    width: 50px;
    height: 40px;
    border-radius: 50%;
    font-size: 26px;
    background-color: #ffffff;
    border: 1px solid #99999944;
    &:hover{
        color: #ffffff;
        background-color: #f0be4d;
        border: none;
        transition: 0.5s;
    }
`;

// const carouselItems = range(noOfItems).map(index => (
//   <SlideItem key={index}>
//     <NewsImageBox>
//         <NewsImage src='https://imgnews.pstatic.net/image/648/2023/11/23/0000021251_001_20231123162701558.jpg?type=w647' />
//     </NewsImageBox>
//     <NewsTitle>오픈AI, 왜 시끄러울까? 오픈AI, 왜 시끄러울까? 오픈AI, 왜 시끄러울까?</NewsTitle>
//     <NewsContent>
//     지난 18일(한국 기준) 오픈AI 이사회는 올트먼 대표가 회사를 떠난다고 오픈AI 공식 홈페이지를 통해 발표했습니다.  

// 하지만 이 공지문에는 올트먼 대표의 해임 사유에 대한 구체적인 언급이 빠졌는데요. 단지 "올트먼 대표가 이사회와의 소통이 일관되지 않고 정직하지 않았다"고 했을 뿐입니다. 충격적인 소식이었습니다. 챗GPT의 아버지로 불리는 인물이 한 순간 내쳐진 것이니까요.

// 이틀 뒤인 20일 마이크로소프트(MS)가 깜짝 발표를 했습니다. MS에서 새 AI 연구팀을 이끌 책임자로 올트먼을 채용한다고 했기 때문입니다. MS는 올해 1월 오픈AI에 130억달러(약 16조8662억원)를 투자한 곳입니다. 그러는 동안 오픈AI 이사회는 인터넷 방송 스트리밍 회사인 트위치 대표를 맡았던 에밋 시어를 새 대표로 영입했습니다.
//     </NewsContent>
//   </SlideItem>
// ));

const carouseViewslItems = range(noOfItems).map(index => (
  <SlideViewsItem key={index}>
    <NewsImageBox>
        <NewsImage src='https://imgnews.pstatic.net/image/648/2023/11/23/0000021251_001_20231123162701558.jpg?type=w647' />
    </NewsImageBox>
    <NewsViewsTitle>오픈AI, 왜 시끄러울까? 오픈AI, 왜 시끄러울까? 오픈AI, 왜 시끄러울까?, 왜 시끄러울까?, 왜 시끄러울까?, 왜 시끄러울까?, 왜 시끄러울까?, 왜 시끄러울까?</NewsViewsTitle>
  </SlideViewsItem>
));



const getDayMinuteCounter = (date) => {
  if (!date) {
    return '';
  }

  const today = moment();
  const postingDate = moment(date);
  const dayDiff = postingDate.diff(today, 'days');
  const hourDiff = postingDate.diff(today, 'hours');
  const minutesDiff = postingDate.diff(today, 'minutes');
  
  if (dayDiff === 0 && hourDiff === 0) { // 작성한 지 1시간도 안 지났을 때
    const minutes = Math.ceil(-minutesDiff);
    return minutes + '분 전';		 // '분'으로 표시
  }

  if (dayDiff === 0 && hourDiff <= 24) { // 작성한 지 1시간은 넘었지만 하루는 안 지났을 때
    const hour = Math.ceil(-hourDiff);
    return hour + '시간 전';		 // '시간'으로 표시
  }

  return -dayDiff + '일 전';		 // '일'로 표시
};




export default function AutoPlayCarousel({ newsData }) {
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  console.log(newsData);

  useEffect(() => {
    const interval = setInterval(tick, autoPlayDelay);

    return () => {
      clearInterval(interval);
    };
  }, [activeItemIndex]);

  const tick = () => {
    setActiveItemIndex((prevIndex) => (prevIndex + 1) % (noOfItems - noOfCards + 1));
  };

  const onChange = (value) => {
    setActiveItemIndex(value);
  };


  // if (isLoading) {
  //   // 로딩 중에 대한 처리
  //   return <div>Loading...</div>;
  // }


// 가져온 데이터를 사용하여 UI를 렌더링
const carouselItems = newsData && newsData.map((item, index) => (
    <SlideItem key={index}>
        <NewsImageBox>
            <NewsImage src={item.Image} /> {/* Assuming the news data has an 'imageUrl' property */}
        </NewsImageBox>
        <NewsTitle>{item.Title}</NewsTitle>
        <NewsContent>{item.Content}</NewsContent>
    </SlideItem>
));


  return (
    <Wrapper>
      <ItemsCarousel
        gutter={12}
        numberOfCards={noOfCards}
        activeItemIndex={activeItemIndex}
        requestToChangeActive={onChange}
        rightChevron={<CarouselButton>{'>'}</CarouselButton>}
        leftChevron={<CarouselButton>{'<'}</CarouselButton>}
        chevronWidth={chevronWidth}
        outsideChevron
        children={carouselItems}
      />
    </Wrapper>
  );
};

export function ViewsCarousel() {
  const [activeItemIndex, setActiveItemIndex] = useState(0);

  const onChange = (value) => {
    setActiveItemIndex(value);
  };

  return (
    <Wrapper>
      <ItemsCarousel
        gutter={12}
        numberOfCards={noOfCards}
        activeItemIndex={activeItemIndex}
        requestToChangeActive={onChange}
        rightChevron={<CarouselButton>{'>'}</CarouselButton>}
        leftChevron={<CarouselButton>{'<'}</CarouselButton>}
        chevronWidth={chevronWidth}
        outsideChevron
        children={carouseViewslItems}
      />
    </Wrapper>
  );
};
