import React, { useState } from 'react';
import styled from 'styled-components';
import ItemsCarousel from 'react-items-carousel';
import ModalPortal from "./portal";
import Modal from './modal';
import { register } from 'timeago.js' //임포트하기 register 한국어 선택
import koLocale from 'timeago.js/lib/lang/ko' //한국어 선택
import ViewLogo from '../assets/views.svg'

register('ko', koLocale);

// 캐러셀 임시 데이터 및 딜레이/width
const noOfCards = 3;
const chevronWidth = 40;

const Wrapper = styled.div`
  padding: 0 ${chevronWidth}px;
  max-width: 1300px;
  margin: 0 auto;
`;


const SlideViewsItem = styled.div`
  height: 360px;
  padding: 10px;
  border: 1px solid #99999999;
  display: flex;
  flex-direction: column;
`;

const NewsImageBox = styled.div`
    height: 200px;
    margin-bottom: 10px;
    overflow: hidden;
    background-color: #ffffff;
    border: 1px solid #99999944;
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

const SubViewCount = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
    color: #999999;
`;

const SubViewImage = styled.img`
    width: 20px;
    height: 20px;
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

const NewsViewsTitle = styled.div`
    height: 100px;
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

const CarouselButton = styled.button`
    width: 24px;
    height: 48px;
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



export default function ViewsCarousel({ newsData }) {
    console.log('Received data in ViewsCarousel:', newsData);
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
    // .sort((a, b) => b.viewCount - a.viewCount)
  
    // title을 기준으로 내림차순 정렬
    .sort((a, b) => {
      // 문자열 비교를 사용하여 알파벳순으로 정렬
      return b.title.localeCompare(a.title);
    })
  
    
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
          <SubViewCount>
            <SubViewImage src={ViewLogo} />
            {item.viewCount}
          </SubViewCount>
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
          rightChevron={<CarouselButton>{'⟩'}</CarouselButton>}
          leftChevron={<CarouselButton>{'⟨'}</CarouselButton>}
          chevronWidth={chevronWidth} 
          outsideChevron
          children={carouseViewsItems}
        />
        <ModalPortal>
        {viewsModalOn && <Modal item={selectedViewsItem} onClose={() => setViewsModalOn(false)} />}
      </ModalPortal>
      </Wrapper>
    );
  };
  
  