import React, { useEffect } from "react";
import styled from "styled-components";
import Close from "../assets/x-logo.svg"

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
  width: 60px;
  height: 60px;
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: #fff;
  padding: 5px 10px;
  border: none;
  cursor: pointer;
  &:hover {
    border-radius: 50%;
    transition: 0.5s;
    background-color: #99999944;
  }
`;

const CloseButtonImage = styled.img`
  width: 100%;
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
  display: flex;
  justify-content: right;
  align-items: center;
  gap: 30px;
  border-bottom: 1px solid #99999944;
`;

const Date = styled.div`
  color: #999999;
`;

const Media = styled.div`
  color: #999999;
`;

const ImageBox = styled.div`
  width: 100%;
  /* height: 400px;
  overflow: hidden; */
  padding-bottom: 30px;
  background-color: aqua;
`;

const ImageUrl = styled.img`
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
        <CloseButton onClick={onClose}>
          <CloseButtonImage src={Close} />
        </CloseButton>
        <HeadBox>
          <HeadTitle>{item.title}</HeadTitle>
        </HeadBox>
        <DateBox>
          <Media>{item.press}</Media>
          <Date>{item.articleWriteTime}</Date>
        </DateBox>
        <ImageBox>
          <ImageUrl src={item.picture} />
        </ImageBox>

         </ Content>
      </Background>
  );
};

export default Modal;

