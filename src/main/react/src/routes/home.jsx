import { useEffect, useState } from 'react';
import Header from "../components/header"
import axios from 'axios';
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

const MainHeaderBox = styled.div`
  width: 100%;
  max-width: 1400px;
  padding: 0 38px;
`;

const MainHeader = styled.div`
    width: 100%;
    font-size: 28px;
    padding: 30px;
    display: flex;
    align-items: center;
    background-color: #ffffff;
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
  /* background-color: #ffffff; */
`;

export default function Home() {

  return (
    <Wrapper>
      <Header></Header>
      <WrapperBox>
        <Content>
          <HomeMainNews />
        </Content>
        {/* <MainHeaderBox>
          <MainHeader>당신의 생각을 나눠보세요</MainHeader>
        </MainHeaderBox> */}
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