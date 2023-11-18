import { useEffect, useState } from 'react';
import Header from "../components/header"
import axios from 'axios';
import styled from 'styled-components';
import Footer from '../components/footer';

const Wrapper = styled.div`
width: 100%;
  display: grid;
  gap: 50px;
  overflow-y: auto;
  grid-template-rows: 1fr 1fr;
  `;

const Content = styled.div`
  width: 100%;
  min-height: 1200px;
  padding: 120px 15% 0 15%;
  background-color: gray;
`;

const Trend = styled.div`
  height: 30px;
  margin-bottom: 50px;
  display: flex;
  align-items: center;
  padding: 0 30px;
  color: white;
  background-color: aqua;
  gap: 30px;
`;

const TrendHeader = styled.div`
  width: 120px;
  height: 30px;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #FF0B0B;
`;


const TrendNews = styled.div`
  color: black;
`;

const MainNews = styled.div`
  width: 100%;
  height: 500px;
  padding: 20px;
  border: 1px solid #999999;
  border-radius: 10px;
`;


export default function CreateAccount() {
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
      <Content>
        <Trend>
          <TrendHeader>TrendNews</TrendHeader>
          <TrendNews>test news Title Here</TrendNews>
        </Trend>
        <MainNews>
          <div>받아온 값 : {data}</div>
        </MainNews>
      </Content>
      <Footer></Footer>
    </Wrapper>
  )
}