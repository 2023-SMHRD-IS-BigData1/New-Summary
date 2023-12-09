const Modal = ({ onClose, item }) => {
    const [bookMarkData, setBookMarkData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [currentBookmarkIdx, setCurrentBookmarkIdx] = useState(null); // 현재 모달의 bookmarkIdx를 관리하는 상태
  
    let userData;
    let userEmailData;
    let bookmarkIdx;
    const userDataString = sessionStorage.getItem('userData');
  
  
      if (userDataString) {
        userData = JSON.parse(userDataString);
        userEmailData = userData.userEmail;
      } else {
        console.error('세션스토리지에 userData가 존재하지 않습니다.');
      }
  
    console.log(userEmailData);
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