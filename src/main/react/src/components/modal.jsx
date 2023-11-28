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
  background: #14141499;
`;

const Content = styled.div`
  width: 100%;
  max-width: 950px;
  height: 800px;
  padding: 30px;
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
  margin-top: 20px;
  `;

const HeadTitle = styled.div`
  width: 100%;
  padding: 30px 0;
  font-size: 28px;
  font-weight: 600;
`;

const DateBox = styled.div`
  width: 100%;
  height: 30px;
  padding: 20px;
  background-color: aqua;
`;

const Date = styled.div``;

const Media = styled.div``;

const ImageBox = styled.div`
  
`;

const ImageUrl = styled.div`
  width: 100%;
`;

const ContentBox = styled.div``;

const ContentText = styled.div``;





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
          <HeadTitle>{item.title}</HeadTitle>
        </HeadBox>
        <DateBox>

        </DateBox>
                  //  ... modal 안의 contents 코드 ...

         </ Content>
      </Background>
  );
};

export default Modal;

