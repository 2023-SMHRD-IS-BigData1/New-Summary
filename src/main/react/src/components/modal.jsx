import React, { useEffect } from "react";
import styled from "styled-components";
import Close from "../assets/x-logo.svg"
import moment from 'moment';
import ViewsLogo from '../assets/views.svg'
import LikesLogo from '../assets/heart-icon.svg'
import CommentLogo from '../assets/comment-icon.svg'

const BackgroundNews = styled.div`
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
  background: #14141411;
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

const ContentArea = styled.div`
  width: 100%;
  overflow-y: auto;
`;

const BoardContent = styled.div`
  width: 100%;
  max-width: 950px;
  height: 800px;
  padding: 30px;
  display: flex;
  position: relative;
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
  border-radius: 50%;
  border: none;
  cursor: pointer;
  &:hover {
    transition: 0.5s;
    background-color: #99999944;
  }
`;

const CloseButtonImage = styled.img`
  width: 100%;
`;


// 뉴스 컴포넌트
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
  margin-bottom: 20px;
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
  padding-bottom: 20px;
`;

const ImageUrl = styled.img`
  width: 100%;
`;

const ContentBox = styled.div`
  padding: 10px;
  margin-bottom: 30px;
`;

const ContentText = styled.div`
  font-size: 18px;
  margin-bottom: 60px;
  line-height: 1.3;
  white-space: normal;
  word-wrap: break-word;
  text-align: left;
`;

const NewsUrlBox = styled.div`
  width: 100%;
  height: 20px;
  padding-right: 30px;
  font-size: 18px;
  display: flex;
  justify-content: right;
  align-items: center;
  gap: 10px;
`;

const NewsUrl = styled.a`
  text-decoration: none;
  color: #000000;

  &:hover {
    text-decoration: underline;
  }
`;



// 게시판 컴포넌트
const BoardArea = styled.div`
  width: 50%;
  height: auto;
  padding: 20px;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  border-right: 1px solid #999999;
  overflow-y: auto;
`;

const BoardHeadBox = styled.div`
  width: 100%;
  padding: 10px;
  border-bottom: 1px solid #99999999;
  display: flex;
  justify-content: space-between;
`;

const BoardUserBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BoardDateBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BoardImageBox = styled.div`
  width: 100%;
  height: 300px;
  margin: 20px 0;
  display: flex;
  overflow: hidden;
  background-color: gray;
`;

const BoardTextBox = styled.div`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  text-align: left;
`;

const BoardUrlBox = styled.div`
  width: 100%;
  height: auto;
  padding: 10px;
  border: 1px solid #99999999;
`;

const BoardCommentBox = styled.div`
  width: 100%;
  padding: 10px;
  margin: 20px 0;
  display: flex;
  justify-content: right;
  align-items: center;
  border-top: 1px solid #99999999;
`;

const BoardUserImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
  background-color: gray;
`;

const BoardUserName = styled.div``;

const BoardImage = styled.img`
  width: 100%;
`;

const BoardCommentIcon = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BoardCommentText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-right: 20px;
`;




// 댓글 컴포넌트
const CommentArea = styled.div`
  width: 50%;
  height: 100%;
  padding: 50px 20px 0 20px;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  gap: 10px;
  overflow-y: auto;
`;

const CommentBox = styled.div`
  width: 100%;
  padding: 20px 10px;
  border: 1px solid #99999999;
`;

const CommentBoxNull = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CommentHead = styled.div`
  width: 100%;
  padding: 10px;
  display: flex;
  justify-content: space-between;
`;

const CommentContent = styled.div`
  width: 100%;
  padding: 10px;
  text-align: left;
  line-height: 1.1;
`;

const CommentBottom = styled.div`
  display: flex;
  justify-content: right;
`;

const CommentButtonBox = styled.div`
  width: 100%;
  padding: 20px 20px;
  display: flex;
  justify-content: right;
  gap: 10px;
`;

const CommentBtnDelete = styled.div`
  padding: 4px 10px;
  border: 1px solid #99999999;
`;

const CommentBtnUpdate = styled.div`
  padding: 4px 10px;
  border: 1px solid #99999999;
`;

const CommentTextArea = styled.textarea`
  width: 100%;
  height: 80px;
`;

const CommentTextBtnBox = styled.div`
  width: 100%;
  padding: 10px 10px 0 10px;
  display: flex;
  justify-content: right;
  align-items: center;
`;

const CommentBtnInsert = styled.div`
  padding: 4px 10px;
  border: 1px solid #99999999; 
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

  const handleModalClick = (e) => {
    // 모달 내부의 클릭 이벤트일 경우 이벤트 전파 중지
    e.stopPropagation();
  };

  return (
    <BackgroundNews onClick={onClose}>
      <Content onClick={handleModalClick}>
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
        <ContentBox>
          <ContentText>{item.summary}</ContentText>
          <NewsUrlBox>
            기사 원문 :
            <NewsUrl href={item.url} target="_blank">{item.url}</NewsUrl>
          </NewsUrlBox>
        </ContentBox>
      </ Content>
    </BackgroundNews>
  );
};

export default Modal;

const BoardModal = ({ onClose, item }) => {
  // 모달이 열릴 때 body에 스타일을 추가하여 스크롤을 막음
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      // 모달이 닫힐 때 body 스타일을 초기화하여 스크롤을 활성화
      document.body.style.overflow = "visible";
    };
  }, []);

  const handleModalClick = (e) => {
    // 모달 내부의 클릭 이벤트일 경우 이벤트 전파 중지
    e.stopPropagation();
  };

  // Moment.js를 사용하여 날짜 포맷 변경
  const formattedDate = moment(item.createdAt).format('YYYY-MM-DD HH:mm');

  return (
    <Background onClick={onClose}>
      <BoardContent onClick={handleModalClick}>
        <CloseButton onClick={onClose}>
          <CloseButtonImage src={Close} />
        </CloseButton>
        <BoardArea>
          <BoardHeadBox>
            <BoardUserBox>
              <BoardUserImage />
              <BoardUserName>{item.user}유저이름</BoardUserName>
            </BoardUserBox>
            <BoardDateBox>{formattedDate}</BoardDateBox>
          </BoardHeadBox>
          <BoardImageBox>
            <BoardImage />
          </BoardImageBox>
          <BoardTextBox>{item.bdContent}</BoardTextBox>
          <BoardUrlBox href={item.bdUrl} target="_blank">{item.bdUrl}</BoardUrlBox>
          <BoardCommentBox>
            <BoardCommentText>
              <BoardCommentIcon src={CommentLogo} />
              0
            </BoardCommentText>
            <BoardCommentText>
              <BoardCommentIcon src={ViewsLogo} />
              {item.bdViews}
            </BoardCommentText>
            <BoardCommentText>
              <BoardCommentIcon src={LikesLogo} />
              {item.bdLikes}
            </BoardCommentText>
          </BoardCommentBox>
        </BoardArea>
        <CommentArea>
        <CommentBoxNull>아직 작성된 댓글이 없어요!</CommentBoxNull>
        {/* 테스트용 */}
          <CommentBox>
            <CommentHead>
              <BoardUserBox>
                <BoardUserImage />
                <BoardUserName>{item.user}유저이름</BoardUserName>
              </BoardUserBox>
              <BoardDateBox>{formattedDate}</BoardDateBox>
            </CommentHead>
            <CommentContent>
            댓글내용이 여기에 작성 될 예정댓글내용이 여기에 작성 될 예정댓글내용이 여기에 작성 될 예정댓글내용이 여기에 작성 될 예정댓글내용이 여기에 작성 될 예정
            </CommentContent>
            {/* 해당 버튼박스는 자신이 쓴 댓글에만 노출하기 */}
            <CommentBottom>
              <BoardCommentText>
                <BoardCommentIcon src={LikesLogo} />
                0
              </BoardCommentText>
            </CommentBottom>
          </CommentBox>
        {/* 테스트용 */}
          <CommentBox>
            <CommentHead>
              <BoardUserBox>
                <BoardUserImage />
                <BoardUserName>{item.user}유저이름</BoardUserName>
              </BoardUserBox>
              <BoardDateBox>{formattedDate}</BoardDateBox>
            </CommentHead>
            <CommentContent>
            댓글내용이 여기에 작성 될 예정댓글내용이 여기에 작성 될 예정댓글내용이 여기에 작성 될 예정댓글내용이 여기에 작성 될 예정댓글내용이 여기에 작성 될 예정
            </CommentContent>
            {/* 해당 버튼박스는 자신이 쓴 댓글에만 노출하기 */}
            <CommentBottom>
              <BoardCommentText>
                <BoardCommentIcon src={LikesLogo} />
                0
              </BoardCommentText>
            </CommentBottom>
          </CommentBox>
        {/* 테스트용 */}
          <CommentBox>
            <CommentHead>
              <BoardUserBox>
                <BoardUserImage />
                <BoardUserName>{item.user}유저이름</BoardUserName>
              </BoardUserBox>
              <BoardDateBox>{formattedDate}</BoardDateBox>
            </CommentHead>
            <CommentContent>
            댓글내용이 여기에 작성 될 예정댓글내용이 여기에 작성 될 예정댓글내용이 여기에 작성 될 예정댓글내용이 여기에 작성 될 예정댓글내용이 여기에 작성 될 예정
            </CommentContent>
            {/* 해당 버튼박스는 자신이 쓴 댓글에만 노출하기 */}
            <CommentBottom>
              <BoardCommentText>
                <BoardCommentIcon src={LikesLogo} />
                0
              </BoardCommentText>
            </CommentBottom>
          </CommentBox>
          <CommentBox>
            <CommentHead>
              <BoardUserBox>
                <BoardUserImage />
                <BoardUserName>{item.user}유저이름</BoardUserName>
              </BoardUserBox>
              <BoardDateBox>{formattedDate}</BoardDateBox>
            </CommentHead>
            <CommentContent>
              댓글내용이 여기에 작성 될 예정
            </CommentContent>
            {/* 해당 버튼박스는 자신이 쓴 댓글에만 노출하기 */}
            <CommentButtonBox>
              <CommentBtnDelete>삭제</CommentBtnDelete>
              <CommentBtnUpdate>수정</CommentBtnUpdate>
            </CommentButtonBox>
            <CommentBottom>
              <BoardCommentText>
                <BoardCommentIcon src={LikesLogo} />
                0
              </BoardCommentText>
            </CommentBottom>
          </CommentBox>
          <CommentBox>
            <CommentTextArea />
            <CommentTextBtnBox>
              <CommentBtnInsert>작성</CommentBtnInsert>
            </CommentTextBtnBox>
          </CommentBox>
        </CommentArea>
      </BoardContent>
    </Background>
  );
};

export { BoardModal };
