import styled from 'styled-components';
import Header from '../components/header';
import Footer from '../components/footer';
import Bookmark from '../assets/bookmark.svg';
import BookmarkOn from '../assets/bookmark-on.svg';

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
  flex-direction: column;
  justify-content: center;
  gap: 50px;
  padding: 50px 50px 200px 50px;
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



export default function DailyNews() {

    return (
        <Wrapper>
            <Header></Header>
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
            <Footer></Footer>
        </Wrapper>
    );
}