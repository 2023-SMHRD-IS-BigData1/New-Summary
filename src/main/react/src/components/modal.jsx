import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Close from "../assets/x-logo.svg"
import Bookmark from "../assets/bookmark.svg"
import BookmarkOn from "../assets/bookmark-on.svg"
import DefaultUser from "../assets/image/user-avatar.png"
import moment from 'moment';
import ViewsLogo from '../assets/views.svg'
import LikesLogo from '../assets/heart-icon.svg'
import CommentLogo from '../assets/comment-icon.svg'
import { useBookMarkContext } from "../data/news-data.context";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
  overflow-y: scroll;
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

const BookmarkButton = styled.button`
  width: 60px;
  height: 60px;
  position: absolute;
  top: 10px;
  left: 50px;
  background-color: #fff;
  padding: 10px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  &:hover {
    transition: 0.5s;
    background-color: #99999944;
  }
`;

const BookmarkButtonImage = styled.img`
  width: 100%;
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
  white-space: pre-wrap;
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
  display: flex;
  overflow: hidden;
`;

const BoardTextBox = styled.div`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  text-align: left;
  white-space: pre-wrap;
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
  border: 1px solid #99999944;
`;

const BoardUserName = styled.div``;

const BoardImage = styled.img`
      width:100%;
    object-fit:cover;
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
  padding: 20px 20px;
  border: 1px solid #99999999;
  border-radius: 5px;
`;

const CommentForm = styled.div`
  width: 100%;
  padding: 0px 20px 20px 20px;
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
  display: flex;
  justify-content: space-between;
`;

const CommentContent = styled.div`
  width: 100%;
  padding: 10px;
  text-align: left;
  line-height: 1.1;
  white-space: pre-wrap;
`;

const ContentUpdate = styled.textarea`
    height: 80px;
    width: 100%;
    min-height: 120px;
    padding: 20px 0;
    /* background-color: aqua; */
    font-size: 18px;
    line-height: 1.2;
    font-family: 'Malgun Gothic';
    border: none;
    resize: none;
    outline: none;
    transition: .2s;
    border-bottom: 3px solid #D1D1D4;
    &::placeholder {
        text-align: center;
    }
    &:active,
    &:focus,
    &:hover {
        outline: none;
        border-color: #E9C46A;
    }
`;

const ContentUpdateBoard = styled.textarea`
    width: 100%;
    min-height: 600px;
    padding: 20px 0;
    /* background-color: aqua; */
    font-size: 18px;
    line-height: 1.2;
    font-family: 'Malgun Gothic';
    border: none;
    resize: none;
    outline: none;
    transition: .2s;
    border-bottom: 3px solid #D1D1D4;
    &::placeholder {
        text-align: center;
    }
    &:active,
    &:focus,
    &:hover {
        outline: none;
        border-color: #E9C46A;
    }
`;

const CommentBottom = styled.div`
  display: flex;
  justify-content: right;
`;

const CommentButtonBox = styled.div`
  width: 100%;
  padding: 20px 20px 10px 20px;
  display: flex;
  justify-content: right;
  gap: 10px;
`;

const CommentButtonBoxForm = styled.form`
  width: 100%;
  padding: 20px 20px 10px 20px;
  display: flex;
  justify-content: right;
  gap: 10px;
`;

const DeleteButton = styled.button`
    padding: 10px 20px;
    height: 30px;
    border-radius: 10px;
    background-color: #E76F51;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    cursor: pointer;
    &:hover {
        background-color: #264653;
        color: #ffffff;
        transition: .5s;
    }
`;

const EditButton = styled.button`
    padding: 10px 20px;
    height: 30px;
    border-radius: 10px;
    background-color: #E9C46A;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    cursor: pointer;
    &:hover {
        background-color: #264653;
        color: #ffffff;
        transition: .5s;
    }
`;

const CancelButton = styled.button`
    padding: 10px 20px;
    height: 30px;
    border-radius: 10px;
    background-color: #E9C46A;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    cursor: pointer;
    &:hover {
        background-color: #264653;
        color: #ffffff;
        transition: .5s;
    }
`;

const CommentTextArea = styled.textarea`
    height: 80px;
    width: 100%;
    min-height: 120px;
    padding: 20px 0;
    /* background-color: aqua; */
    font-size: 18px;
    line-height: 1.2;
    font-family: 'Malgun Gothic';
    border: none;
    resize: none;
    outline: none;
    transition: .2s;
    border-bottom: 3px solid #D1D1D4;
    &::placeholder {
        text-align: center;
    }
    &:active,
    &:focus,
    &:hover {
        outline: none;
        border-color: #E9C46A;
    }
`;

const CommentTextBtnBox = styled.div`
  width: 100%;
  padding: 10px 10px 0 10px;
  display: flex;
  justify-content: right;
  align-items: center;
`;

const CommentBtnInsert = styled.button`
    padding: 10px 20px;
    height: 30px;
    border-radius: 10px;
    background-color: #E9C46A;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    cursor: pointer;
    &:hover {
        background-color: #264653;
        color: #ffffff;
        transition: .5s;
    }
`;

const ButtonBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: right;
  align-items: center;
  padding: 10px 20px;
  gap: 10px;
`;



const Modal = ({ onClose, item }) => {
  const [bookMarkData, setBookMarkData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [currentBookmarkIdx, setCurrentBookmarkIdx] = useState(null); // 현재 모달의 bookmarkIdx를 관리하는 상태


  let userData;
  let userEmailData;
  let userNameData;
  const userDataString = sessionStorage.getItem('userData');


  if (userDataString) {
    userData = JSON.parse(userDataString);
    userEmailData = userData.userEmail;
    userNameData = userData.userName;
  } else {
    console.error('세션스토리지에 userData가 존재하지 않습니다.');
  }

  console.log(userNameData);
  console.log(item.id);
  // 아이디로 북마크여부 조회
  useEffect(() => {
    const fetchBookMarkData = async () => {
      try {
        // GET 요청으로 북마크 데이터 조회
        const getResponse = await axios.get(`/api/news/bookmark/${userEmailData}`);
        setBookMarkData(getResponse.data);

        // 해당 아이템에 대한 북마크 여부를 설정
        const isBookmarkedItem = getResponse.data.some((bookmark) => bookmark.newsObjectId === item.id);
        setIsBookmarked(isBookmarkedItem);
        // 현재 모달에 대한 bookmarkIdx 설정
        const modalBookmark = getResponse.data.find((bookmark) => bookmark.newsObjectId === item.id);
        setCurrentBookmarkIdx(modalBookmark ? modalBookmark.bookmark_idx : null);

        console.log('북마크 조회 완료:', getResponse.data);
      } catch (error) {
        console.error('북마크 조회 중 오류 발생:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchBookMarkData();
  }, [userEmailData, item.id]);

  // 모달이 열릴 때 body에 스타일을 추가하여 스크롤을 막음
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "visible";
    };
  }, []);

  // 모달 내부의 클릭 이벤트일 경우 이벤트 전파 중지
  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  const createBookMark = async () => {
    try {
      // POST 요청으로 북마크 생성
      const createResponse = await axios.post(`/api/news/bookmark/create`, {
        newsObjectId: item.id,
        userEmail: userEmailData,
      });

      setBookMarkData(createResponse.data);
      setIsBookmarked(true);
      setCurrentBookmarkIdx(createResponse.data.bookmark_idx); // 새로 생성된 북마크의 인덱스를 설정
      console.log('북마크 등록 완료:', createResponse.data);
    } catch (error) {
      console.error('북마크 등록 중 오류 발생:', error);
    } finally {
      setLoading(false);
    }
  };


  const deleteBookMark = async (bookmarkIdx) => {
    try {
      // DELETE 요청으로 북마크 삭제
      const deleteResponse = await axios.delete(`/api/news/bookmark/delete/${bookmarkIdx}/${userEmailData}`);
      setBookMarkData(deleteResponse.data);
      setIsBookmarked(false); // 북마크가 삭제되었으므로 false로 설정
      console.log('북마크 삭제 완료:', deleteResponse.data);
    } catch (error) {
      console.error('북마크 삭제 중 오류 발생:', error);
    } finally {
      setLoading(false);
    }
  };

  // 북마크 여부에 따라 북마크를 추가하거나 삭제하는 로직을 작성
  const handleBookmarkClick = (e) => {
    e.stopPropagation();
    if (isBookmarked) {
      deleteBookMark(currentBookmarkIdx);
    } else {
      createBookMark();
    }
  }



  return (
    <BackgroundNews onClick={onClose}>
      <Content onClick={handleModalClick}>
        <BookmarkButton onClick={handleBookmarkClick}>
          {isBookmarked ?
            <BookmarkButtonImage src={BookmarkOn} /> :
            <BookmarkButtonImage src={Bookmark} />
          }
        </BookmarkButton>
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

const BoardModal = ({ onClose, item, fetchLatestBoardData, onDelete }) => {
  const [commentData, setCommentData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isCommented, setIsCommented] = useState(false);
  const [commentWriteData, setCommentWriteData] = useState([]);
  const [cmtContent, setCmtContent] = useState(""); // 댓글작성내용 가져오기
  const [isEditing, setIsEditing] = useState(false);
  const [editedComment, setEditedComment] = useState("");
  const [selectedCommentIdx, setSelectedCommentIdx] = useState(null);
  const [isBoarEditing, setIsBoardEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(item.bdContent);
  const [textareaHeight, setTextareaHeight] = useState('auto');

  let userData;
  let userEmailData;
  let userNameData;
  let userProfileData = null;
  const userDataString = sessionStorage.getItem('userData');


  if (userDataString) {
    userData = JSON.parse(userDataString);
    userEmailData = userData.userEmail;
    userNameData = userData.userName;
    userProfileData = userData.userProfile;
  } else {
    console.error('세션스토리지에 userData가 존재하지 않습니다.');
  }

  const fetchCommentData = async () => {
    try {
      // GET 요청으로 댓글 데이터 조회
      const getResponse = await axios.get(`/api/comment/list/${item.bdIdx}`);
      setCommentData(getResponse.data);
      // 댓글 데이터가 존재하는지 여부를 설정
      setIsCommented(getResponse.data.length > 0);

      console.log('북마크 조회 완료:', getResponse.data);
    } catch (error) {
      console.error('북마크 조회 중 오류 발생:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCommentData();
  }, [userEmailData, item.id]);


  // 게시글 수정 코드

  const updateBoardContent = async () => {
    try {
      const updateResponse = await axios.put(`/api/board/update/${item.bdIdx}`, {
        headers: {
          'Content-Type': 'application/json', // 요청 헤더에 Content-Type을 추가
        },
        data: {
          bdContent: editedContent,
          userEmail: userEmailData,
        }, // 요청에 필요한 데이터를 data 속성에 추가
      });

      const notify = () => toast.success('게시글 수정 완료');
      notify();
      setIsBoardEditing(false);
    } catch (error) {
      console.error('게시물 수정 중 오류 발생:', error);
    }
  };

  const deleteBoardContent = async (cmtIdx) => {
    try {
      // DELETE 요청으로 삭제
      const deleteResponse = await axios.delete(`/api/board/delete/${item.bdIdx}`, {
        headers: {
          'Content-Type': 'application/json', // 요청 헤더에 Content-Type을 추가
        },
        data: { userEmail: userEmailData }, // 삭제 요청에 필요한 데이터를 data 속성에 추가
      });
      const notify = () => toast.success('글삭제 완료');
      notify();
      await fetchLatestBoardData();

    } catch (error) {
      console.error('댓글삭제 중 오류 발생:', error);
    }
  };

  const handleEditBoardClick = () => {
    setIsBoardEditing(true);
    setEditedContent(item.bdContent);
  };


  const handleBoardDeleteClick = (bdIdx) => {
    deleteBoardContent(item.bdIdx);
    onClose(); // 모달 닫기
    onDelete(item.bdIdx); // onDelete를 통해 부모 컴포넌트로 삭제한 글의 bdIdx 전달
  };

  const handleTextareaChange = (e) => {
    setBdContent(e.target.value);
    const minHeight = '0px';
    const newHeight = `${Math.max(e.target.scrollHeight - 10, parseInt(minHeight, 10))}px`;
    setTextareaHeight(newHeight);
  };


  // 댓글 작성하기
  const uploadCommentData = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/comment/create', {
        bdIdx: item.bdIdx,
        cmtContent: cmtContent,
        userEmail: userEmailData
      });
      setCommentData(prevComments => [...prevComments, response.data]);
      const notify = () => toast.success('댓글작성 완료');
      notify();
      setCommentWriteData(response.data);
    } catch (error) {
      console.error('댓글 작성 중 오류 발생:', error);
    }
  };

  // 댓글 삭제하기
  const deleteComment = async (cmtIdx) => {
    try {
      // DELETE 요청으로 삭제
      const deleteResponse = await axios.delete(`/api/comment/delete/${cmtIdx}`, {
        headers: {
          'Content-Type': 'application/json', // 요청 헤더에 Content-Type을 추가
        },
        data: { userEmail: userEmailData }, // 삭제 요청에 필요한 데이터를 data 속성에 추가
      });
      const notify = () => toast.success('댓글삭제 완료');
      notify();
      fetchCommentData();
    } catch (error) {
      console.error('댓글삭제 중 오류 발생:', error);
    }
  };


  // 댓글 수정하기
  const updateComment = async () => {
    try {
      const updateResponse = await axios.put(`/api/comment/update/${selectedCommentIdx}`, {
        cmtContent: editedComment,
        bdIdx: item.bdIdx,
        userEmail: userEmailData,
      });

      const updatedComments = commentData.map((comment) => {
        if (comment.cmtIdx === selectedCommentIdx) {
          return { ...comment, cmtContent: editedComment };
        }
        return comment;
      });

      setCommentData(updatedComments);
      const notify = () => toast.success('댓글 수정 완료');
      notify();
      setIsEditing(false);
    } catch (error) {
      console.error('댓글 수정 중 오류 발생:', error);
    }
  };



  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "visible";
    };
  }, []);

  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  // 댓글삭제 핸들러
  const handleCommentClick = (cmtIdx) => {
    deleteComment(cmtIdx)
  }

  // 댓글수정 핸들러
  const handleEditClick = (cmtIdx, cmtContent) => {
    setIsEditing(true);
    setEditedComment(cmtContent);
    setSelectedCommentIdx(cmtIdx);
  };

  // Moment.js를 사용하여 날짜 포맷 변경
  const formattedDate = moment(item.createdAt).format('YYYY-MM-DD HH:mm');

  // 가져온 데이터를 사용하여 UI를 렌더링
  const CommentItems = commentData && commentData.map((comment, index) => {
    // Moment.js를 사용하여 날짜 포맷 변경
    const formattedDate = moment(comment.createdAt).format('YYYY-MM-DD HH:mm');
    // comment.userName과 userNameData를 비교하여 일치하면 true를 반환
    const isCurrentUserComment = comment.userName === userNameData;

    return (
      <CommentBox key={comment.cmtIdx}>
        <CommentHead>
          <BoardUserBox>
            {/* 해당부분 유저프로필 사진데이터 댓글등록시 가져와야함 */}
            <BoardUserImage src={userProfileData || DefaultUser} />
            <BoardUserName>{comment.userName}</BoardUserName>
          </BoardUserBox>
          <BoardDateBox>{formattedDate}</BoardDateBox>
        </CommentHead>
        {isEditing ?
          <ContentUpdate
            id="Boardtextarea"
            value={editedComment}
            onChange={(e) => setEditedComment(e.target.value)}
          /> :
          <CommentContent>{comment.cmtContent}</CommentContent>
        }
        {isCurrentUserComment && (
          <CommentButtonBox>
            <DeleteButton onClick={() => handleCommentClick(comment.cmtIdx)}>삭제</DeleteButton>
            {isEditing ? (
              <>
                <EditButton onClick={updateComment}>확인</EditButton>
                <CancelButton onClick={() => setIsEditing(false)}>취소</CancelButton>
              </>
            ) : (
              <EditButton onClick={() => handleEditClick(comment.cmtIdx, comment.cmtContent)}>수정</EditButton>
            )}
          </CommentButtonBox>
        )}
        {/* 좋아요 추가시 작성 */}
        {/* <CommentBottom>
                <BoardCommentText>
                  <BoardCommentIcon src={LikesLogo} />
                  {comment.cmtLikes}
                </BoardCommentText>
              </CommentBottom> */}
      </CommentBox>
    );
  });

  return (
    <Background onClick={onClose}>
      <BoardContent onClick={handleModalClick}>
        <CloseButton onClick={onClose}>
          <CloseButtonImage src={Close} />
        </CloseButton>
        <BoardArea>
          <BoardHeadBox>
            <BoardUserBox>
              <BoardUserImage src={userProfileData || DefaultUser} />
              <BoardUserName>{item.userName || "Unknown User"}</BoardUserName>
            </BoardUserBox>
            <BoardDateBox>{formattedDate}</BoardDateBox>
          </BoardHeadBox>
          <BoardImageBox>
            {item.bdProfile && <BoardImage src={item.bdProfile} />}
          </BoardImageBox>
          {isBoarEditing ?
            <ContentUpdateBoard
              value={editedContent}
              onChange={(e) => {
                setEditedContent(e.target.value);
                handleTextareaChange;
              }}
              style={{ height: textareaHeight }}
            /> :
            <BoardTextBox>{item.bdContent}</BoardTextBox>
          }

          {item.bdUrl && <BoardUrlBox href={item.bdUrl} target="_blank">{item.bdUrl}</BoardUrlBox>}
          {userData && item.userName === userData.userName ?
            <ButtonBox>
              {isBoarEditing ? (
                <>
                  <EditButton onClick={updateBoardContent}>확인</EditButton>
                  <CancelButton onClick={() => setIsBoardEditing(false)}>취소</CancelButton>
                </>
              ) : (
                <EditButton onClick={handleEditBoardClick}>수정</EditButton>
              )}
              <DeleteButton onClick={handleBoardDeleteClick}>삭제</DeleteButton>
            </ButtonBox>
            : ""
          }
          <BoardCommentBox>
            <BoardCommentText>
              <BoardCommentIcon src={CommentLogo} />
              {commentData.length}
            </BoardCommentText>
            <BoardCommentText>
              <BoardCommentIcon src={ViewsLogo} />
              {item.bdViews}
            </BoardCommentText>
            {/* <BoardCommentText>
              <BoardCommentIcon src={LikesLogo} />
              {item.bdLikes}
            </BoardCommentText> */}
          </BoardCommentBox>
        </BoardArea>
        <CommentArea>
          {
            isCommented ? (
              CommentItems
            ) : (
              <CommentBoxNull>아직 작성된 댓글이 없어요!</CommentBoxNull>
            )
          }
          <CommentForm action="/api/comment/create" method="post">
            <CommentTextArea
              name="cmtContent"
              value={cmtContent}
              onChange={(e) => setCmtContent(e.target.value)}
            />
            <CommentTextBtnBox>
              <CommentBtnInsert type="submit" onClick={uploadCommentData}>작성하기</CommentBtnInsert>
            </CommentTextBtnBox>
          </CommentForm>
        </CommentArea>
      </BoardContent>
    </Background>
  );
};

export { BoardModal };
