import React, { useEffect } from "react";
import styled from "styled-components";

const Background = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  left: 0;
  top: 0;
  text-align: center;
  z-index: 200;
  background: #14141414;
`;

const Content = styled.div`
  height: 100%;
  width: 950px;
  margin-top: 70px;
  position: relative;
  overflow: scroll;
  background: #ffffff;
  border-radius: 50px;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: #fff;
  color: #000;
  padding: 5px 10px;
  cursor: pointer;
`;

const HeadBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const HeadTitle = styled.div`
width: 100%;
  padding-top: 50px;
`;





const Modal = ({ onClose, item }) => {
    // 모달이 열릴 때 body에 스타일을 추가하여 스크롤을 막음
    useEffect(() => {
      document.body.style.overflow = "hidden";
      return () => {
        // 모달이 닫힐 때 body 스타일을 초기화하여 스크롤을 활성화
        document.body.style.overflow = "visible";
      };
    }, []);

    
    console.log(item);
    console.log(item.Title);

  return (
      <Background>
        <Content>
        <CloseButton onClick={onClose}>Close</CloseButton>
        <HeadBox>
          <HeadTitle>{item.Title}</HeadTitle>
        </HeadBox>
                  //  ... modal 안의 contents 코드 ...

         </ Content>
      </Background>
  );
};

export default Modal;

