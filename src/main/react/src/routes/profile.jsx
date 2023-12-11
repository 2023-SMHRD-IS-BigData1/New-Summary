import { useEffect, useState } from 'react';
import Header from "../components/header"
import axios from 'axios';
import styled from 'styled-components';
import Footer from '../components/footer';
import DoughnutComponent from '../components/doughnut';
import { LineComponent } from '../components/linechart';
import UserDefault from '../assets/image/user-avatar.png';
import Pencil from '../assets/pencil-logo.svg'
import Coin from '../assets/coin-logo.svg'
import Exclamation from '../assets/exclamation-circle.svg'
import MypagePaging from '../components/pagination';
import EmailLogo from '../assets/email-logo.svg';
import UserLogo from '../assets/user-logo.svg';
import PasswordLogo from '../assets/password-logo.svg';
import PhoneLogo from '../assets/phone-logo.svg';
import { BoardProfile } from '../components/board-sns';
import { BrowserRouter as Router } from 'react-router-dom';
import { useBookMarkContext, useNewsContext, useUserViewNewsContext } from '../data/news-data.context';
import LoadingScreen from '../components/loading-screen';
import Modal from '../components/modal';
import ModalPortal from '../components/portal';
import Pagination from "react-js-pagination";

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
  padding: 100px 50px 200px 50px;
  /* padding-bottom: 200px; */
  margin: auto;
  position: relative;
  `;

const LeftMenu = styled.div`
    width: 100%;
    max-width: 300px;
    height: auto;
    max-height: 600px;
    padding: 10px 20px 30px 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-radius: 10px;
    border: 1px solid #99999922;
    box-shadow: 5px 5px 5px 2px #99999944;
    background-color: #ffffff;
  `;

const Content = styled.div`
  width: 100%;
  max-width: 1200px;
  height: auto;
  flex-direction: column;
  justify-content: flex-start;
  display: ${({ active }) => (active ? 'flex' : 'none')};
`;

const HeaderBox = styled.div`
  width: 100%;
  max-width: 1200px;
  padding: 20px 30px;
  font-size: 24px;
  background-color: #ffffff;
`;

const GraphBox = styled.div`
  width: 100%;
  max-width: 1200px;
  height: 600px;
  padding: 25px;
  margin-bottom: 50px;
  border: 1px solid #99999922;
  background-color: #ffffff;
`;

const UserBox = styled.div`
  width: 100%;
  margin-top: 20px;
`;

const UserImageBox = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  margin: auto;
  border: 1px solid #99999944;
  overflow: hidden;
  position: relative;
`;

const UserImage = styled.img`
  position: absolute;
  height: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const UserNickname = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 10px 10px 10px;
  font-size: 24px;
  margin: 10px;
`;

const UserPoint = styled.div`
  width: 100%;
  padding: 10px;
  font-size: 18px;
  display: flex;
  justify-content: right;
  align-items: center;
  border-bottom: 1px solid #99999944;
  margin-bottom: 30px;
`;

const PointImage = styled.img`
  width: 25px;
  height: 25px;
  margin-right: 10px;
`;

const PointexplanationBox = styled.div`
  width: 25px;
  height: 25px;
  position: relative;
  display: inline-block;
  cursor: pointer;
  &:hover {
    .tip {
    visibility: visible;
    opacity: 1;
    transition: opacity 0.7s;
    }
  }
`;

const Pointexplanation = styled.img`
  width: 25px;
  height: 25px;
  margin-left: 10px;
`;

const ExplanationTip = styled.div`
    visibility: hidden;
    width: 240px;
    background: #333;
    color: #fff;
    text-align: center;
    padding: 10px;
    border-radius: 7px;
    position: absolute;
    line-height: 1.2;
    z-index: 100;
    top: -28px;
    left: 210%;
    opacity: 0.1;
    &::after {
      content: "";
      position: absolute;
      border-top: 6px solid transparent;
      border-right: 12px solid #333;
      border-bottom: 6px solid transparent;
      border-left: 12px solid transparent;
      top: 31%;
      right: 100%;
    }
`;

const TipHead = styled.div`
  width: 100%;
  padding-bottom: 10px;
`;

const LeftMenuItem = styled.div`
    width: 100%;
    height: 40px;
    padding: 25px;
    display: flex;
    align-items: center;
    font-size: 18px;
    cursor: pointer;
    color: ${(props) => (props.active ? '#ffffff' : '#000000')};
    background-color: ${(props) => (props.active ? '#264653' : '#ffffff')};
    &:hover {
      background: #F0BE4D;
      color: white;
      transition: 0.5s;
  }
`;

const SecessionBtn = styled.div`
  width: 100px;
  height: 40px;
  border-radius: 10px;
  border: 1px solid #99999944;
  color: #ffffff;
  background-color: #fa4f4f;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 50px;
  cursor: pointer;
  &:hover{
    background-color: #ff0000;
    color: #000000;
    transition: .5s;
  }
`;

const ProfileBack = styled.div`
  width: 100%;
  height: 300px;
  position: absolute;
  background-color: #F4A261;
`;


// 프로필 수정 페이지 컴포넌트
const ProfileUpdateForm = styled.form`
  width: 100%;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 100px;
  background-color: #ffffff;
`;

const ProfileUpdateBox = styled.div`
  width: 100%;
  height: 80px;
  padding: 20px 0px;  
  position: relative; 
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

const ProfileUpdateTop = styled.div`
  width: 100%;
  padding: 20px 0px;  
  position: relative; 
  display: flex;
  justify-content: space-around;
  align-items: center;
  &:last-child {
    border: none;
  }
`;

const ProfileUpdateLogo = styled.img`
  width: 40px;
  height: 40px;
  padding: 8px;
  color: #7875B5;
`;

const ProfileUpdateInput = styled.input`
  border: none;
  border-bottom: 3px solid #D1D1D4;
  background: none;
  padding: 10px;
  padding-left: 30px;
  font-weight: 700;
  font-size: 18px;
  width: 75%;
  max-width: 400px;
  transition: .2s;
  &:active,
  &:focus,
  &:hover {
    outline: none;
    border-color: #00ae68;
  }
  &:focus {
    color: #000000;
  }
  &::placeholder {
    color: #bbbbbb;
  }
`;

const ProfileUpdateBtn = styled.button`
  padding: 10px 20px;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  cursor: pointer;
  background-color: #2A9D8F;
  font-weight: 600;
  &:hover {
    color: #ffffff;
    background-color: #264653;
    transition: .5s;
  }
`;

const ProfileUpdateBoxTop = styled.div`
  width: 75%;
  display: flex;
  justify-content: space-around;
`;

const ProfileBoxArea = styled.div`
  width: 50%;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const ProfileHeader = styled.div`
  padding-right: 100px;
  margin-bottom: 200px;
  font-size: 24px;
  font-weight: 600;
  white-space: nowrap;
`;

const ProfileImageBox = styled.div`
  width: 300px;
  height: 300px;
  border-radius: 50%;
  margin: auto;
  margin-bottom: 20px;
  border: 1px solid #99999944;
  overflow: hidden;
  position: relative;
`;

const ProfileImage = styled.img`
  position: absolute;
  height: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const ProfileImgLabel = styled.label`
  margin-top: 30px;
  background-color: #2A9D8F;
  text-align: center;
  padding: 10px 0;
  width: 65%;
  margin: auto;
  border-radius: 6px;
  cursor: pointer;
  &:hover {
    color: #ffffff;
    background-color: #264653;
    transition: .5s;
  }
`;

const ProfileImgInput = styled.input`
  display: none;
`;

// 조회기록 뉴스
const UserNewsBox = styled.div`
    width: 100%;
    height: 300px;
    border: 1px solid #99999944;
    padding: 30px;
    margin-bottom: 0px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    background-color: #ffffff;
    overflow: hidden;
    &:hover .UserNewsBtn{
        opacity: 1;
        transition: 0.5s;
        transform: translateX(0);
    }
`;

const UserNewsContentBox = styled.div`
    width: 70%;
    height: 240px;
`;

const UserNewsImageBox = styled.div`
    width: 30%;
    height: 240px;
    object-fit:cover;
    overflow: hidden;
`;

const UserNewsImage = styled.img`
    width: 100%;
`;

const UserNewsDateBox = styled.div`
    width: 100%;
    height: 40px;
    padding-bottom: 10px;
    display: flex;
    align-items: center;
    justify-content: left;
    color: #999999;
    gap: 20px;
`;

const UserNewsMedia = styled.div`
    font-size: 18px;
`;

const UserNewsDate = styled.div``;

const UserNewsTitle = styled.div`
    width: 100%;
    height: 75px;
    font-size: 28px;
    margin-bottom: 10px;
    line-height: 1.3;
    overflow: hidden;
    position: relative;
    white-space: normal;
    word-wrap: break-word;
    display: -webkit-box;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
`;

const UserNewsContent = styled.div`    
    width: 100%;
    height: 110px;
    font-size: 18px;
    line-height: 1.2;
    overflow: hidden;
    position: relative;
    white-space: pre-wrap;
    word-wrap: break-word;
    display: -webkit-box;
    text-overflow: ellipsis;
    -webkit-line-clamp: 5;
    -webkit-box-orient: vertical;
`;


// -- react-js-pagination component -- //

const PaginationBox = styled.div`
  .pagination { display: flex; justify-content: center; margin: 25px 0 100px 0; }
  ul { list-style: none; padding: 0; }
  ul.pagination li {
    display: inline-block;
    width: 40px;
    height: 40px;
    border: 1px solid #e2e2e2;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1rem; 
    background-color: #ffffff;
  }
  ul.pagination li:first-child{ border-radius: 5px 0 0 5px; }
  ul.pagination li:last-child{ border-radius: 0 5px 5px 0; }
  ul.pagination li a { text-decoration: none; color: #F0BE4D; font-size: 1rem; }
  ul.pagination li.active a { color: white; }
  ul.pagination li.active { background-color: #F0BE4D; }
  ul.pagination li:hover,
  ul.pagination li a:hover,
  ul.pagination li a.active { color: black; }
`;



export default function Profile() {
  const { newsData, loading } = useNewsContext();
  const [onMenu, setOnMenu] = useState('content1');
  const { getNewsById } = useBookMarkContext();
  const [bookmarkedNews, setBookmarkedNews] = useState([]);
  const [loadingBook, setLoadingBook] = useState(true);
  const [page, setPage] = useState(1);
  const [items, setItems] = useState(10);
  const [modalOn, setModalOn] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [imageFile, setImageFile] = useState(null);

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
  console.log(userEmailData);



  // 사이드메뉴 전환
  const handleContentClick = (contentClass) => {
    setOnMenu(contentClass);
  };

  // 북마크메뉴
  // 아이디로 북마크여부 조회
  useEffect(() => {
    const fetchBookMarkData = async () => {
      try {
        // GET 요청으로 북마크 데이터 조회
        const getResponse = await axios.get(`/api/news/bookmark/${userEmailData}`);
        console.log('북마크 조회 완료:', getResponse.data);
        const bookmarkedNewsIds = getResponse.data.map(item => item.newsObjectId);
        console.log(bookmarkedNewsIds);
        // 각 북마크된 뉴스 아이디에 해당하는 뉴스를 가져와서 리스트에 추가
        const bookmarkedNews = newsData.filter(news => bookmarkedNewsIds.includes(news.id));
        setBookmarkedNews(bookmarkedNews);
        console.log('북마크 뉴스조회 완료:', bookmarkedNews);
        console.log('bookmarkedNews:', bookmarkedNews);
      } catch (error) {
        console.error('북마크 조회 중 오류 발생:', error);
      } finally {
        setLoadingBook(false);
      }
    };
    fetchBookMarkData();
  }, [userEmailData, getNewsById, useNewsContext().newsData]);


  // 페이징 코드
  const handlePageChange = (page) => {
    window.scrollTo({ top: 0 });
    setPage(page);
  };

  // 검색 결과에 대해 페이징된 데이터 가져오기
  const startIndex = (page - 1) * items;
  const endIndex = startIndex + items;
  const paginatedData = bookmarkedNews.slice(startIndex, endIndex);

  // 모달창 출력
  const handleModal = async (item) => {
    setSelectedItem(item);
    setModalOn(!modalOn);

    // API 호출 등을 통해 viewCount를 1 증가시키는 작업 수행
    try {
      const response = await axios.get(`/api/board/detail/${bdIdx}`);
      const { setNewsData } = useNewsViewContext();
      useEffect(() => {
        setNewsData(response.data);
        console.log('데이터가 성공적으로 로드되었습니다:', response.data);
      }, [response.data, setNewsData]);

    } catch (error) {
      console.error('데이터 로드 중 오류 발생:', error);
    }
  };

  // 가져온 데이터를 사용하여 UI를 렌더링  
  const UserNewsItems = paginatedData.map((item, index) => (
    <UserNewsBox className='UserNewsBox' key={index} onClick={() => handleModal(item)}>
      <UserNewsContentBox key={index}>
        <UserNewsDateBox>
          <UserNewsMedia>{item.press || ''}</UserNewsMedia>
          <UserNewsDate>{item.articleWriteTime || ''}</UserNewsDate>
        </UserNewsDateBox>
        <UserNewsTitle>{item.title || ''}</UserNewsTitle>
        <UserNewsContent>{item.summary || ''}</UserNewsContent>
      </UserNewsContentBox>
      <UserNewsImageBox>
        <UserNewsImage src={item.picture || ''} />
      </UserNewsImageBox>
    </UserNewsBox>
  ));

  // 개인정보 수정
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImageFile(file);

    // 선택한 이미지 파일의 미리보기 URL을 생성합니다.
    const previewUrl = URL.createObjectURL(file);
    // 미리보기를 표시하기 위해 ProfileImage 컴포넌트의 src 속성을 업데이트합니다.
    document.getElementById('profileImagePreview').src = previewUrl;
  };


  return (
    <Wrapper>
      <Header></Header>
      <ProfileBack></ProfileBack>
      <WrapperBox>
        <LeftMenu>
          <UserBox>
            <UserImageBox>
              <UserImage src={userData.userProfile || UserDefault} />
            </UserImageBox>
            <UserNickname>{userData.userName}</UserNickname>
            <UserPoint>
              <PointImage src={Coin} />2000 P
              <PointexplanationBox>
                <Pointexplanation src={Exclamation} />
                <ExplanationTip className="tip">
                  <TipHead>포인트 획득 기준</TipHead>
                  뉴스 조회시 : 10 P<br />
                  커뮤니티 글작성 : 20 P<br />
                  커뮤니티 댓글작성 : 10 P<br />
                </ExplanationTip>
              </PointexplanationBox>
            </UserPoint>
          </UserBox>
          <LeftMenuItem onClick={() => handleContentClick('content1')} active={onMenu === 'content1'}>뉴스 시청기록</LeftMenuItem>
          <LeftMenuItem onClick={() => handleContentClick('content2')} active={onMenu === 'content2'}>북마크 뉴스</LeftMenuItem>
          <LeftMenuItem onClick={() => handleContentClick('content3')} active={onMenu === 'content3'}>내가 작성한글</LeftMenuItem>
          <LeftMenuItem onClick={() => handleContentClick('content4')} active={onMenu === 'content4'}>개인정보수정</LeftMenuItem>
          <SecessionBtn>회원탈퇴</SecessionBtn>
        </LeftMenu>
        {/* 뉴스 시청기록 */}
        <Content className={onMenu} active={onMenu === 'content1'}>
          <HeaderBox>카테고리별 조회기록</HeaderBox>
          <GraphBox>
            <DoughnutComponent />
          </GraphBox>
        </Content>
        {/* 북마크 뉴스 */}
        <Content className={`content2 ${onMenu === 'content2' ? 'active' : ''}`} active={onMenu === 'content2'}>
          {loadingBook ? (
            <LoadingScreen />
          ) : (
            <>
              {loading ? (
                <LoadingScreen />
              ) : (
                <>
                  {paginatedData.length > 0 ? (
                    <>
                      {UserNewsItems}
                      <PaginationBox>
                        <Pagination
                          activePage={page}
                          itemsCountPerPage={items}
                          totalItemsCount={bookmarkedNews.length}
                          pageRangeDisplayed={5}
                          onChange={handlePageChange}
                        />
                      </PaginationBox>
                    </>
                  ) : (
                    <p>북마크한 뉴스가 없습니다</p>
                  )}
                </>
              )}
              <ModalPortal>
                {modalOn && <Modal item={selectedItem} onClose={() => setModalOn(false)} />}
              </ModalPortal>
            </>
          )}
        </Content>
        {/* 내가 작성한 글 */}
        <Content className={`content3 ${onMenu === 'content3' ? 'active' : ''}`} active={onMenu === 'content3'}>
          <BoardProfile />
        </Content>
        {/* 개인정보 수정 */}
        <Content className={`content4 ${onMenu === 'content4' ? 'active' : ''}`} active={onMenu === 'content4'}>
          <ProfileUpdateForm action=''>
            <ProfileUpdateTop>
              <ProfileUpdateBoxTop>
                <ProfileBoxArea>
                  <ProfileHeader>개인정보수정</ProfileHeader>
                </ProfileBoxArea>
                <ProfileBoxArea>
                  <ProfileImageBox>
                    <ProfileImage id="profileImagePreview" src={imageFile ? URL.createObjectURL(imageFile) : UserDefault} />
                    <ProfileImgInput
                      className="file"
                      id="chooseFile"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </ProfileImageBox>
                  <ProfileImgLabel class="file-label" for="chooseFile">Image Upload</ProfileImgLabel>
                  <ProfileImgInput class="file" id="chooseFile" type="file" multiple />
                </ProfileBoxArea>
              </ProfileUpdateBoxTop>
            </ProfileUpdateTop>
            <ProfileUpdateBox>
              <ProfileUpdateLogo src={EmailLogo} />
              <ProfileUpdateInput type='email' value={userData.userEmail} disabled />
            </ProfileUpdateBox>
            <ProfileUpdateBox>
              <ProfileUpdateLogo src={UserLogo} />
              <ProfileUpdateInput type='text' value={userData.userName} />
            </ProfileUpdateBox>
            <ProfileUpdateBox>
              <ProfileUpdateLogo src={PasswordLogo} />
              <ProfileUpdateInput type='password' placeholder="password" />
            </ProfileUpdateBox>
            <ProfileUpdateBox>
              <ProfileUpdateLogo src={PasswordLogo} />
              <ProfileUpdateInput type='password' placeholder="password" />
            </ProfileUpdateBox>
            <ProfileUpdateBox>
              <ProfileUpdateLogo src={PhoneLogo} />
              <ProfileUpdateInput value={userData.userPhone} />
            </ProfileUpdateBox>
            <ProfileUpdateBox>
              <ProfileUpdateBtn type='submit'>수정하기</ProfileUpdateBtn>
            </ProfileUpdateBox>
          </ProfileUpdateForm>
        </Content>
      </WrapperBox>
      <Footer></Footer>
    </Wrapper>
  )
}