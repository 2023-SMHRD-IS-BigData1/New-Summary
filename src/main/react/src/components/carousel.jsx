import React from 'react';
import range from 'lodash/range';
import styled from 'styled-components';
import ItemsCarousel from 'react-items-carousel';

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

const carouselItems = range(noOfItems).map(index => (
  <SlideItem key={index}>
    <NewsImageBox>
        <NewsImage src='https://imgnews.pstatic.net/image/648/2023/11/23/0000021251_001_20231123162701558.jpg?type=w647' />
    </NewsImageBox>
    <NewsTitle>오픈AI, 왜 시끄러울까? 오픈AI, 왜 시끄러울까? 오픈AI, 왜 시끄러울까?</NewsTitle>
    <NewsContent>
    지난 18일(한국 기준) 오픈AI 이사회는 올트먼 대표가 회사를 떠난다고 오픈AI 공식 홈페이지를 통해 발표했습니다.  

하지만 이 공지문에는 올트먼 대표의 해임 사유에 대한 구체적인 언급이 빠졌는데요. 단지 "올트먼 대표가 이사회와의 소통이 일관되지 않고 정직하지 않았다"고 했을 뿐입니다. 충격적인 소식이었습니다. 챗GPT의 아버지로 불리는 인물이 한 순간 내쳐진 것이니까요.

이틀 뒤인 20일 마이크로소프트(MS)가 깜짝 발표를 했습니다. MS에서 새 AI 연구팀을 이끌 책임자로 올트먼을 채용한다고 했기 때문입니다. MS는 올해 1월 오픈AI에 130억달러(약 16조8662억원)를 투자한 곳입니다. 그러는 동안 오픈AI 이사회는 인터넷 방송 스트리밍 회사인 트위치 대표를 맡았던 에밋 시어를 새 대표로 영입했습니다.
    </NewsContent>
  </SlideItem>
));

export default class AutoPlayCarousel extends React.Component {
  state = {
    activeItemIndex: 0,
  };

  componentDidMount() {
    this.interval = setInterval(this.tick, autoPlayDelay);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  tick = () => this.setState(prevState => ({
    activeItemIndex: (prevState.activeItemIndex + 1) % (noOfItems-noOfCards + 1),
  }));

  onChange = value => this.setState({ activeItemIndex: value });

  render() {
    return (
      <Wrapper>
        <ItemsCarousel
          gutter={12}
          numberOfCards={noOfCards}
          activeItemIndex={this.state.activeItemIndex}
          requestToChangeActive={this.onChange}
          rightChevron={<CarouselButton>{'>'}</CarouselButton>}
          leftChevron={<CarouselButton>{'<'}</CarouselButton>}
          chevronWidth={chevronWidth}
          outsideChevron
          children={carouselItems}
        />
      </Wrapper>
    );
  }
}
