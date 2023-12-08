import styled from 'styled-components';
import Header from '../components/header';
import Footer from '../components/footer';
import { BoardSNS, BoardWriteArea } from '../components/board-sns';
import { BrowserRouter as Router } from 'react-router-dom';


const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  padding-top: 120px;
  gap: 50px;
  position: relative;
`;

const WrapperBox = styled.div`
  width: 100%;
  max-width: 1400px;
  height: auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 50px;
  padding: 0 50px 0 50px;
  margin: auto;
  position: relative;
  `;

const WrapperBoxTop = styled.div`
  width: 100%;
  max-width: 1400px;
  height: auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 50px;
  padding: 50px 50px 50px 50px;
  margin: auto;
  position: relative;
  `;

const BoardBack = styled.div`
  width: 100%;
  height: 300px;
  position: absolute;
  background-color: #F4A261;
`;

export default function Board() {

    return(
        <Wrapper>
            <Header></Header>
            <BoardBack></BoardBack>
            <WrapperBoxTop>
              <BoardWriteArea />
            </WrapperBoxTop>
            <WrapperBox>
              <BoardSNS />
            </WrapperBox>
            <Footer></Footer>
        </Wrapper>
    );
}