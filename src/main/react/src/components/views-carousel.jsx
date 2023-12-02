import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ItemsCarousel from 'react-items-carousel';
import ModalPortal from "./portal";
import Modal from './modal';
import { register } from 'timeago.js' //임포트하기 register 한국어 선택
import koLocale from 'timeago.js/lib/lang/ko' //한국어 선택
import ViewLogo from '../assets/views.svg'
import { useNewsContext, useNewsViewContext } from '../data/news-data.context';

register('ko', koLocale);

// 캐러셀 임시 데이터 및 딜레이/width
const chevronWidth = 40;

const Wrapper = styled.div`
  padding: 0 ${chevronWidth}px;
  width: 100%;
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
  padding: 5px 20px;
  border-radius: 5px;
  background-color: #F4A261;
  display: flex;
  justify-content: center;
  align-items: center;
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



export default function ViewsCarousel() {
  const { newsData, loading } = useNewsContext();
  const { newsViewData, viewLoading } = useNewsViewContext();
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const [viewsModalOn, setViewsModalOn] = useState(false);
  const [selectedViewsItem, setSelectedViewsItem] = useState(null);
  const [numOfCards, setNumOfCards] = useState(4);

  const onChange = (value) => {
    setActiveItemIndex(value);
  };

  const resize = () => { // window 사이즈 변경되었을 때 실행되는 함수
    const width = window.innerWidth;
    if (width < 500) {
      setNumOfCards(1);
    } else if (width < 768) {
      setNumOfCards(2);
    } else if (width < 1024) {
      setNumOfCards(2);
    } else if (width < 1600) {
      setNumOfCards(3);
    } else {
      setNumOfCards(4);
    }
  };

  useEffect(() => {
    window.addEventListener('resize', resize);
    return () => {
      window.removeEventListener('resize', resize);
    };
  }, []);

  const handleModal = async (item) => {
    setSelectedViewsItem(item);
    setViewsModalOn(!viewsModalOn);

    try {
      // API 호출 등을 통해 viewCount를 1 증가시키는 작업 수행
      const response = await axios.get(`/api/news/detail/${item.id}`);

      // useNewsViewContext 훅을 함수 컴포넌트 내에서 호출
      const { setNewsData } = useNewsViewContext();

      // 훅을 호출하는 함수를 useEffect 내에서 실행
      useEffect(() => {
        setNewsData(response.data);
        console.log('데이터가 성공적으로 로드되었습니다:', response.data);
      }, [response.data, setNewsData]);

    } catch (error) {
      console.error('데이터 로드 중 오류 발생:', error);
    }
  };

  // viewsNewsData 있는 경우에만 실행
  const viewCountNewsData = newsData && newsData
    // viewCount을 기준으로 내림차순 정렬
    .sort((a, b) => b.viewCount - a.viewCount)
    // 상위 10개 항목 선택
    .slice(0, 10);


  // 가져온 데이터를 사용하여 UI를 렌더링  
  const carouseViewsItems = viewCountNewsData && viewCountNewsData.map((item, index) => (
    <SlideViewsItem key={item.id} onClick={() => handleModal(item)}>
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
        numberOfCards={numOfCards}
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

