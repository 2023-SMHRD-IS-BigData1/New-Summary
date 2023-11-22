import { useEffect, useState } from 'react';
import Header from "../components/header"
import axios from 'axios';
import styled from 'styled-components';
import Footer from '../components/footer';
import { BoardMain } from '../components/board-sns';
import { HomeMainNews, HomeSubNews, HomeTrendNews } from '../components/news';

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
  height: auto;
  display: flex;
  justify-content: center;
  `;

const BoardBox = styled.div`
  width: 100%;
  max-width: 1400px;
  height: 1220px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  align-content: flex-start;
  gap: 50px;
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
          <HomeMainNews />
        </Content>
        <Content>
            <HomeSubNews />
        </Content>
        <Content>
          <HomeTrendNews />
        </Content>
        <Content>
          <BoardBox>
            <BoardMain></BoardMain>
          </BoardBox>
        </Content>
      </WrapperBox>
      <Footer></Footer>
    </Wrapper>
  )
}