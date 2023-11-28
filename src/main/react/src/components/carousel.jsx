import React, { createContext, useContext, useEffect, useState } from 'react';
import range from 'lodash/range';
import styled from 'styled-components';
import ItemsCarousel from 'react-items-carousel';
import axios from 'axios';
import ModalPortal from "./portal";
import Modal from './modal';
import {format, register } from 'timeago.js' //임포트하기 register 한국어 선택
import koLocale from 'timeago.js/lib/lang/ko' //한국어 선택

register('ko', koLocale);

// 캐러셀 임시 데이터 및 딜레이/width
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

const SubTextBox = styled.div`
  width: 100%;
  height: 30px;
  padding: 5px 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SubDate = styled.div`
  color: #999999;
`;

const SubViewCount = styled.div`
  color: #999999;
`;

const SubCategory = styled.div`
  height: 24px;
  padding: 0 20px;
  border: 1px solid #99999944;
  border-radius: 5px;
  background-color: #ecc76f;
  display: flex;
  justify-content: center;
  align-items: center;
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
    height: 150px;
    padding: 10px;
    font-size: 18px;
    overflow: hidden;
    line-height: 1.3;
    white-space: normal;
    word-wrap: break-word;
    display: -webkit-box;
    text-overflow: ellipsis;
    -webkit-line-clamp: 6;
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



export default function AutoPlayCarousel({ newsData }) {
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const [modalOn, setModalOn] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const interval = setInterval(tick, autoPlayDelay);

    return () => {
      clearInterval(interval);
    };
  }, [activeItemIndex, newsData]);

  const tick = () => {
    // 만약 sortedNewsData가 존재하고 길이가 1 이상인 경우에만 실행
    if (newsData && newsData.length > 0) {
      // 현재 activeItemIndex를 업데이트하여 다음 항목으로 이동
      setActiveItemIndex((prevIndex) => (prevIndex + 1) % newsData.length);
    }
  };

  const onChange = (value) => {
    setActiveItemIndex(value);
  };

  const handleModal = (item) => {
    setSelectedItem(item);
    setModalOn(!modalOn);
  };

  // newsData가 있는 경우에만 실행
const sortedNewsData = newsData && newsData
// articleWriteTime을 기준으로 내림차순 정렬
.sort((a, b) => new Date(b.articleWriteTime) - new Date(a.articleWriteTime))
// 상위 20개 항목 선택
.slice(0, 20);

  
  // 가져온 데이터를 사용하여 UI를 렌더링
  const carouselItems = sortedNewsData && sortedNewsData.map((item, index) => (
    <SlideItem key={index} onClick={() => handleModal(item)}>
      <NewsImageBox>
        <NewsImage src={item.picture} />
      </NewsImageBox>
      <SubTextBox>
        <SubCategory>{item.category}</SubCategory>
        <SubDate>{format(new Date(item.articleWriteTime), 'ko')}</SubDate>
      </SubTextBox>
      {newsData.articleWriteTime}
      <NewsTitle>{item.title}</NewsTitle>
      <NewsContent>{item.articleContent}</NewsContent>
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
      <ModalPortal>
        {modalOn && <Modal item={selectedItem} onClose={() => setModalOn(false)} />}
      </ModalPortal>
    </Wrapper>
  );
};

export function ViewsCarousel({ newsData }) {
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const [viewsModalOn, setViewsModalOn] = useState(false);
  const [selectedViewsItem, setSelectedViewsItem] = useState(null);

  const onChange = (value) => {
    setActiveItemIndex(value);
  };

  const handleModal = (item) => {
    setSelectedViewsItem(item);
    setViewsModalOn(!viewsModalOn);
  };

  // viewsNewsData 있는 경우에만 실행
  const viewCountNewsData = newsData && newsData
    // viewCount을 기준으로 내림차순 정렬
    .sort((a, b) => new Date(b.viewCount) - new Date(a.viewCount))
    // 상위 10개 항목 선택
    .slice(0, 10);

  // 가져온 데이터를 사용하여 UI를 렌더링  
  const carouseViewsItems = viewCountNewsData && viewCountNewsData.map((item, index) => (
    <SlideViewsItem key={index} onClick={() => handleModal(item)}>
      <NewsImageBox>
        <NewsImage src={item.picture} />
      </NewsImageBox>
      <SubTextBox>
        <SubCategory>{item.category}</SubCategory>
        <SubViewCount>{item.viewCount}</SubViewCount>
      </SubTextBox>
      <NewsViewsTitle>{item.title}</NewsViewsTitle>
    </SlideViewsItem>
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
        children={carouseViewsItems}
      />
    </Wrapper>
  );
};

