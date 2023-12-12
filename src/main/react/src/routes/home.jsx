import Header from "../components/header"
import styled from 'styled-components';
import Footer from '../components/footer';
import { BoardMain } from '../components/board-sns';
import { HomeMainNews } from '../components/news';

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
  padding: 0 30px 30px 30px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  align-content: flex-start;
  gap: 50px;
`;

export default function Home() {

  return (
    <Wrapper>
      <Header></Header>
      <WrapperBox>
        <Content>
          <HomeMainNews />
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