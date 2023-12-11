import * as React from 'react';
import Masonry from '@mui/lab/Masonry';
import styled from "styled-components"
import Like from "../assets/heart-icon.svg"
import Comment from "../assets/comment-icon.svg"
import ViewsLogo from "../assets/views.svg"
import { useState, useRef, useEffect, useCallback } from 'react';
import Pagination from 'react-js-pagination';
import { Link, json } from 'react-router-dom';
import { useBoardContext, useBoardViewContext, useBoardWriteContext } from '../data/board-data';
import LoadingScreen from './loading-screen';
import { BoardModalPortal } from './portal';
import { BoardModal } from './modal';
import moment from 'moment';
import PhotoLogo from '../assets/photo-logo.svg';
import LinkLogo from '../assets/link-logo.svg';
import ResetLogo from '../assets/reset-logo.svg';
import { useInView } from 'react-intersection-observer';

const Wrapper = styled.div`
    width: 100%;
    max-width: 1400px;
    gap: 50px;
`;

const Item = styled.div`
    width: 400px;
    box-shadow: 5px 5px 5px 5px #99999944;
`;

const ItemImage = styled.img`
    width:100%;
    height: calc(auto - 300px);
    object-fit:cover;
`;

const ItemTextBox = styled.div`
    width: 100%;
    height: auto;
    padding: 20px;
    background-color: white;
    position: relative;
`;

const TextDate = styled.div`
    width: 100%;
    height: 20px;
    margin-bottom: 5px;
    color: #999999;
`;

const TextContent = styled.div`
    width: 100%;
    max-height: 396px;
    padding: 10px 10px 10px 10px;
    margin-bottom: 20px;
    font-size: 20px;
    line-height: 1.2;
    word-wrap: break-word;
    white-space: pre-wrap;
    overflow: hidden;
    position: relative;
    display: -webkit-box;
    text-overflow: ellipsis;
    -webkit-line-clamp: 16;
    -webkit-box-orient: vertical;
`;

const TextUrl = styled.div`
    width: 100%;
    min-height: 40px;
    font-size: 16px;
    padding: 0 10px;
    margin: 10px 0;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #99999999;
    cursor: pointer;
`;

const LikeBox = styled.div`
    width: 100%;
    height: 30px;
    padding-right: 30px;
    display: flex;
    align-items: center;
    justify-content: right;
    gap: 10px;
`;

const Comments = styled.img`
    width: 25px;
    height: 25px;
`;

const Likes = styled.img`
    width: 25px;
    height: 25px;
    margin-left: 20px;
`;

const Views = styled.img`
    width: 25px;
    height: 25px;
    margin-left: 20px;
`;

const UserBox = styled.div`
    width: 90%;
    height: 70px;
    display: flex;
    align-items: center;
    gap: 20px;
`;

const UserBoxImage = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: aqua;
`;

const UserBoxName = styled.div`
    font-size: 22px;
`

const BoardWriteBox = styled.div`
    width: 100%;
    display: flex;
    justify-content: right;
    align-items: center;
    padding: 30px 80px;

`;



//  -- react-js Board Write component -- //
const BoardWriteForm = styled.form`
    width: 100%;
    max-width: 800px;
    min-height: 200px;
    padding-top: 40px;
    background-color: #ffffff;
    border: 1px solid #99999944;
    border-radius: 20px;
    margin: auto;
    display: flex;
    justify-content: center;
    flex-direction: column;
`;

const BoardWriteTextArea = styled.div`
    width: 90%;
    height: auto;
    min-height: 100px;
    margin-left: 5%;
`;

const BoardInputImageBox = styled.div`
    width: 100%;
    position: relative;
`;

const BoardInputImage = styled.img`
    width: 100%;
    object-fit: cover;
`;

const BoardInputImageBtn = styled.button`
    width: 30px;
    height: 30px;
    border-radius: 50%;
    position: absolute;
    border: none;
    top: -15px;
    right: -15px;
    cursor: pointer;
    &:hover {
        background-color: #264653;
        color: #ffffff;
        transition: .5s;
    }
`;

const BoardWriteBottom = styled.div`
    width: 90%;
    height: 80px;
    margin-left: 5%;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const BoardWriteIconArea = styled.div`
    width: 100%;
    display: flex;
    gap: 20px;
`;

const BoardWriteIcon = styled.img`
    width: 50px;
    height: 50px;
    padding: 10px;
    cursor: pointer;
    &:hover {
        border-radius: 50px;
        color: #ffffff;
        background-color: #E9C46A;
        transition: .5s;
    }
`;
const BoardWritePostBox = styled.div`
    display: flex;
    gap: 20px;
`;

const BoardWritePostBtn = styled.button`
    width: 120px;
    height: 40px;
    border-radius: 10px;
    font-size: 18px;
    font-weight: 600;
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

const BoardWriteResetBtn = styled.button`
    width: 40px;
    height: 40px;
    border-radius: 10px;
    font-size: 18px;
    font-weight: 600;
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

const BoardTextAreaInput = styled.textarea`
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

const BoardBottomBox = styled.div`
    width: 100%;
    height: 300px;
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

export function BoardSNS() {
    const { newPostAdd, setNewPostAdd, boardData, setBoardData, loading } = useBoardContext();
    const { boardViewData, loadingViews } = useBoardViewContext();
    const { newPostAdded, setNewPostAdded } = useBoardWriteContext();
    const [columns, setColumns] = useState(3);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [modalOn, setModalOn] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [page, setPage] = useState(-1);
    const [ref, inView] = useInView();
    const [boardDataSlice, setBoardDataSlice] = useState([]);
    const currentScrollPosition = window.scrollY;

    // 무한 스크롤
    // 지정한 타겟 div가 화면에 보일 때 마다 서버에 요청을 보냄
    const productFetch = () => {
        axios
            .get(`/api/board/list?page=${page + 1}&pageSize=${itemsPerPage}`)
            .then((res) => {
                console.log(res.data);
                setBoardDataSlice((prevData) => [...prevData, ...(res.data)]);
                setPage((prevPage) => prevPage + 1);
            })
            .catch((err) => { console.log(err) });
    };

    // 스크롤시 데이터 요청
    useEffect(() => {
        if (inView && !loading) {
            console.log(inView, '무한 스크롤 요청💫');
            productFetch();
        }
    }, [inView, loading]);
    // Ref를 사용하여 스크롤 위치 저장
    const scrollPositionRef = useRef(currentScrollPosition);
    const lastInViewRef = useRef(true);

    // 스크롤 이벤트 핸들러
    const handleScroll = () => {
        if (!lastInViewRef.current) {
            scrollPositionRef.current = window.scrollY;
        }
    };

    // 스크롤 위치 복원 함수
    const restoreScrollPosition = useCallback(() => {
        window.scrollTo(0, scrollPositionRef.current);
    }, []);

    // 스크롤 이벤트 리스너 등록
    useEffect(() => {
        const handleScroll = () => {
            scrollPositionRef.current = window.scrollY;
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // 데이터 로드 후 스크롤 위치 복원
    useEffect(() => {
        if (!loading && inView && lastInViewRef.current) {
            // inView 상태이면서 이전에 inView 상태가 아닌 경우에만 스크롤 위치 복원
            restoreScrollPosition();
        }
        lastInViewRef.current = inView;
    }, [loading, inView, restoreScrollPosition]);


    // 새로운글이 작성되었을때
    const NewBoardData = () => {
        if (newPostAdded) {
            axios
                .get(`/api/board/listdata`)
                .then((res) => {
                    console.log(res.data);
                    const newData = res.data[0];
                    setBoardDataSlice((prevData) => [newData, ...prevData]);
                })
                .catch((err) => { console.log(err) });
        }
    };

    useEffect(() => {
        NewBoardData();
    }, [newPostAdded]);

    // 반응형 게시판
    useEffect(() => {
        const handleResize = () => {
            const newColumns = window.innerWidth <= 700 ? 1 : window.innerWidth <= 1100 ? 2 : 3;
            setColumns(newColumns);
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    // 게시판 글 삭제시
    const handleDelete = (deletedBdIdx) => {
        setBoardDataSlice((prevData) => prevData.filter((item) => item.bdIdx !== deletedBdIdx));
    };


    // DB 게시판데이터 변동시 재요청
    useEffect(() => {
        const axiosData = async () => {
            try {
                const response = await axios.get('/api/board/list');
                setBoardDataSlice(response.data);
                console.log('게시판 갱신 데이터가 성공적으로 로드되었습니다:', response.data);
            } catch (error) {
                console.error('게시판 갱신 데이터 로드 중 오류 발생:', error);
            }
        };
        axiosData();
    }, [setBoardDataSlice]);

    const handleModal = async (item) => {
        setSelectedItem(item);
        setModalOn(!modalOn);

        // API 호출 등을 통해 viewCount를 1 증가시키는 작업 수행
        try {
            const response = await axios.get(`/api/board/detail/${item.bdIdx}`);
            setBoardData(response.data);
            console.log('데이터가 성공적으로 로드되었습니다:', response.data);
        } catch (error) {
            console.error('데이터 로드 중 오류 발생:', error);
        }

    };

    // 가져온 데이터를 사용하여 UI를 렌더링
    const boardItems = boardDataSlice && boardDataSlice.map((item, index) => {
        // Moment.js를 사용하여 날짜 포맷 변경
        const formattedDate = moment(item.createdAt).format('YYYY-MM-DD HH:mm');

        return (
            <>
                <Item key={item.id} onClick={() => handleModal(item)}>
                    {/* 이미지 추가시 들어갈 코드 */}
                    {item.bdProfile && <ItemImage src={item.bdProfile} />}
                    <ItemTextBox>
                        <TextDate>{formattedDate}</TextDate>
                        <TextContent>{item.bdContent}</TextContent>
                        {item.bdUrl && <TextUrl>{item.bdUrl}</TextUrl>}
                        <LikeBox>
                            {/* 댓글추가시 댓글 카운트해서 넣을것 */}
                            <Comments src={Comment} /> 10
                            {/* <Likes src={Like} /> {item.bdLikes} */}
                            <Views src={ViewsLogo} /> {item.bdViews}
                        </LikeBox>
                        <UserBox>
                            {/*  유저 프로필사진 들어가기 */}
                            <UserBoxImage></UserBoxImage>
                            <UserBoxName>{item.userName || "Unknown User"}</UserBoxName>
                        </UserBox>
                    </ItemTextBox>
                </Item>
            </>
        );
    });

    return (
        <Wrapper>
            <Masonry columns={columns} spacing={2} defaultHeight="auto" defaultColumns={1} defaultSpacing={2}>
                {loading ? (
                    <LoadingScreen />
                ) : (
                    boardItems
                )}
            </Masonry>
            <BoardBottomBox ref={ref}></BoardBottomBox>
            <BoardModalPortal>
                {modalOn && <BoardModal item={selectedItem} onClose={() => setModalOn(false)} onDelete={handleDelete} />}
            </BoardModalPortal>
        </Wrapper>
    );
};

export function BoardMain() {
    const { boardData, loading } = useBoardContext();
    const { boardViewData, loadingViews } = useBoardViewContext();
    const [columns, setColumns] = useState(3);
    const [modalOn, setModalOn] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    // 반응형으로 사이즈 조절
    useEffect(() => {
        const handleResize = () => {
            const newColumns = window.innerWidth <= 700 ? 1 : window.innerWidth <= 1100 ? 2 : 3;
            setColumns(newColumns);
        };

        const handleImageLoad = (index, height) => {
            const boardData = [...data];
            boardData[index] = 300 + height;
            setData(boardData);
        };

        handleResize();

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleModal = async (item) => {
        setSelectedItem(item);
        setModalOn(!modalOn);

        // API 호출 등을 통해 viewCount를 1 증가시키는 작업 수행
        try {
            const response = await axios.get(`/api/board/detail/${item.bdIdx}`);
            const { setBoardViewData } = useBoardViewContext();
            useEffect(() => {
                setNewsData(response.data);
                console.log('데이터가 성공적으로 로드되었습니다:', response.data);
            }, [response.data, setNewsData]);

        } catch (error) {
            console.error('데이터 로드 중 오류 발생:', error);
        }
    };

    // 가져온 데이터를 사용하여 UI를 렌더링
    const boardMainItems = boardData && boardData.map((item, index) => {
        // Moment.js를 사용하여 날짜 포맷 변경
        const formattedDate = moment(item.createdAt).format('YYYY-MM-DD HH:mm');
        return (
            <>
                <Item key={item.id} style={{ height: `auto` }} onClick={() => handleModal(item)}>
                    {/* 이미지 추가시 들어갈 코드 */}
                    {/* {imageUrl[item.id] && <ItemImage src={imageUrl[item.id]} />} */}
                    <ItemTextBox>
                        <TextDate>{formattedDate}</TextDate>
                        <TextContent>{item.bdContent}</TextContent>
                        <TextUrl>{item.bdUrl}</TextUrl>
                        <LikeBox>
                            {/* 댓글추가시 댓글 카운트해서 넣을것 */}
                            <Comments src={Comment} /> 10
                            <Likes src={Like} /> {item.bdLikes}
                            <Views src={ViewsLogo} /> {item.bdViews}
                        </LikeBox>
                        <UserBox>
                            {/*  유저 프로필사진 들어가기 */}
                            <UserBoxImage></UserBoxImage>
                            {/* 유저이름 출력 / 아직 시큐리티 적용안되서 null 받는중 */}
                            <UserBoxName>{item.user}</UserBoxName>
                        </UserBox>
                    </ItemTextBox>
                </Item>
                <BoardModalPortal>
                    {modalOn && <BoardModal item={selectedItem} onClose={() => setModalOn(false)} />}
                </BoardModalPortal>
            </>
        );
    });

    const heights = [600, 300, 600, 900, 600, 600];
    const imageUrl = [
        "https://imgnews.pstatic.net/image/448/2023/12/11/2023121190002_0_20231211064101489.jpg?type=w647",
        undefined,
        "https://i.pinimg.com/564x/6b/d7/9d/6bd79d2a74f29643d92d5f83688ffa70.jpg",
        "https://i.pinimg.com/564x/89/92/53/89925343ad179a782689d46ad76a6e2d.jpg",
        "https://pbs.twimg.com/media/FyXzQgSacAANkRw?format=jpg&name=900x900",
        "https://i.pinimg.com/564x/f4/0f/c8/f40fc808687f837af723bad07519e8b5.jpg",
    ];
    const username = ["신비한마법사", "달빛소녀", "스카이워커", "초콜릿드림", "은하수여행자", "비밀의정원"];
    const date = ["2023.11.16 16:06", "2023.12.10 11:16", "2023.11.26 14:52", "2023.12.06 10:00", "2023.12.14 11:08", "2023.12.13 22:01"];
    const content = [
        "참 생각할수록 아쉽네요 금메달 딴 선수들은 군면제해주고 세계에 대한민국 위상을 우뚝세운 케이팝 가수들은 군대가야되니 균형이 안맞네요.",
        "뉴스를 훑다가 이 기사를 발견했는데, 정말 기쁘고 뿌듯한 소식이에요. 이런 긍정적인 이야기가 더 많이 공유되면 좋겠습니다.",
        "세상에는 힘들게 노력하는 사람들이 참 많은데, 이런 성과를 보면 정말 보람을 느낍니다. 모두에게 힘과 용기를 주는 소식입니다.",
        "뉴스를 통해 듣는 이런 이야기가 마음을 따뜻하게 만들어줍니다. 세상은 어려운 일이 많지만, 희망을 주는 순간들이 더 많아지길 기대해 봅니다.",
        "이런 긍정적인 소식을 듣게 되면 마음이 밝아져서 좋아요. 우리 주변에는 정말 대단한 사람들이 많아서 자랑스럽습니다. 꼭 힘내세요!",
        "뉴스에 나오는 이런 성취 소식은 정말 힘이 됩니다. 노력하는 사람들에게 큰 격려가 되고, 우리도 조금 더 희망을 가져볼 수 있게 되네요."
    ]
    const userimage = [
        "https://i.pinimg.com/564x/a3/28/28/a328280b0f9c3fcb40a9038c7394ea38.jpg",
        "https://i.pinimg.com/564x/be/a6/e3/bea6e3867a48d27e2aa47b8eb1864f98.jpg",
        "https://i.pinimg.com/564x/83/bf/58/83bf5862268d5810661c9e84b0772db0.jpg",
        "https://i.pinimg.com/564x/12/ad/00/12ad0029e4a7eb6184eff9cd2e23ac1c.jpg",
        "https://i.pinimg.com/564x/6f/8f/3e/6f8f3ed0dd2e68f06419444fad297239.jpg",
        "https://i.pinimg.com/564x/11/4a/e1/114ae149fa58b7a1d331f04f19a44f21.jpg"
    ];
    const comment = [54, 16, 42, 50, 76, 42];
    const view = [63, 22, 48, 76, 99, 56];
    return (
        <Link to="/board" style={{ width: "100%", display: 'flex', justifyContent: "center", textDecoration: "none", color: "#000000" }}>
            <Masonry columns={columns} spacing={2} defaultHeight={150} defaultColumns={1} defaultSpacing={2}>

                {/* {loading ? (
                    <LoadingScreen />
                ) : (
                    boardMainItems
                )} */}
                {/* 테스트용 데이터 */}
                {heights.map((height, index) => (
                    <Item key={index} style={{ height: `${height}px` }}>
                        {imageUrl[index] && <ItemImage src={imageUrl[index]} />}
                        <ItemTextBox>
                            <TextDate>{date[index]}</TextDate>
                            <TextContent>
                                {content[index]}
                            </TextContent>
                            {/* <TextUrl>https://www.naver.com/</TextUrl> */}
                            <LikeBox>
                                <Comments src={Comment} /> {comment[index]}
                                {/* <Likes src={Like} /> 52 */}
                                <Views src={ViewsLogo} />{view[index]}
                            </LikeBox>
                            <UserBox>
                                <UserBoxImage src={userimage[index]} />
                                <UserBoxName>{username[index]}</UserBoxName>
                            </UserBox>
                        </ItemTextBox>
                    </Item>
                ))}
            </Masonry>
            <BoardModalPortal>
                {modalOn && <BoardModal item={selectedItem} onClose={() => setModalOn(false)} />}
            </BoardModalPortal>
        </Link>
    )
}

export function BoardProfile() {
    const { boardData, loading } = useBoardContext();
    const { boardViewData, loadingViews } = useBoardViewContext();
    const [columns, setColumns] = useState(3);
    const [modalOn, setModalOn] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

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


    // 반응형으로 사이즈 조절
    useEffect(() => {
        const handleResize = () => {
            const newColumns = window.innerWidth <= 1000 ? 1 : 2;
            setColumns(newColumns);
        };

        const handleImageLoad = (index, height) => {
            const boardData = [...data];
            boardData[index] = 300 + height;
            setData(boardData);
        };

        handleResize();

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleModal = async (item) => {
        setSelectedItem(item);
        setModalOn(!modalOn);

        // API 호출 등을 통해 viewCount를 1 증가시키는 작업 수행
        try {
            const response = await axios.get(`/api/news/detail/${item.id}`);
            const { setBoardViewData } = useBoardViewContext();
            useEffect(() => {
                setNewsData(response.data);
                console.log('데이터가 성공적으로 로드되었습니다:', response.data);
            }, [response.data, setNewsData]);

        } catch (error) {
            console.error('데이터 로드 중 오류 발생:', error);
        }
    };

    // 가져온 데이터를 사용하여 UI를 렌더링
    const boardMainItems = boardData && boardData.filter(item => item.userName === userNameData).map((item, index) => {
        // Moment.js를 사용하여 날짜 포맷 변경
        const formattedDate = moment(item.createdAt).format('YYYY-MM-DD HH:mm');
        return (
            <>
                <Item key={item.id} style={{ height: `auto` }} onClick={() => handleModal(item)}>
                    {/* 이미지 추가시 들어갈 코드 */}
                    {/* {imageUrl[item.id] && <ItemImage src={imageUrl[item.id]} />} */}
                    <ItemTextBox>
                        <TextDate>{formattedDate}</TextDate>
                        <TextContent>{item.bdContent}</TextContent>
                        {item.bdUrl && <TextUrl>{item.bdUrl}</TextUrl>}
                        <LikeBox>
                            {/* 댓글추가시 댓글 카운트해서 넣을것 */}
                            <Comments src={Comment} /> {item.bdViews}
                            {/* <Likes src={Like} /> {item.bdLikes} */}
                            <Views src={ViewsLogo} /> {item.bdViews}
                        </LikeBox>
                        {/* <UserBox>
                            <UserBoxImage></UserBoxImage>
                            <UserBoxName>{item.userName}</UserBoxName>
                        </UserBox> */}
                    </ItemTextBox>
                </Item>
                <BoardModalPortal>
                    {modalOn && <BoardModal fetchLatestBoardData={fetchLatestBoardData} item={selectedItem} onClose={() => setModalOn(false)} />}
                </BoardModalPortal>
            </>
        );
    });

    return (
        <>
            <Masonry
                columns={columns}
                spacing={2}
                defaultHeight={300}
                defaultColumns={1}
                defaultSpacing={2}
            >
                {loading ? (
                    <LoadingScreen />
                ) : (
                    boardMainItems
                )}
            </Masonry>
            <BoardModalPortal>
                {modalOn && <BoardModal item={selectedItem} onClose={() => setModalOn(false)} />}
            </BoardModalPortal>
        </>
    )
}

export function BoardWriteArea() {
    const { setBoardData } = useBoardContext();
    const { newPostAdded, setNewPostAdded, boardWriteData, setBoardWriteData, loadingWrite } = useBoardWriteContext();
    const [bdContent, setBdContent] = useState('');
    const [uploadedImage, setUploadedImage] = useState(null);
    const formRef = useRef(null);
    const [textareaHeight, setTextareaHeight] = useState('auto');

    // 세션에 저장된 유저데이터가 있을 경우 이메일 데이터를 가져오기
    let userEmail;
    const userDataString = sessionStorage.getItem('userData');
    if (userDataString) {
        let userData = JSON.parse(userDataString);
        userEmail = userData.userEmail;
    }

    // reset 버튼을 눌렀을 때 textarea 높이를 'auto'로 설정
    const handleReset = () => {
        setTextareaHeight('auto');
        setUploadedImage(null); // 이미지 초기화
        formRef.current.reset();
    };

    // textarea 높이값 조절
    const handleTextareaChange = (e) => {
        setBdContent(e.target.value);
        const minHeight = '0px';
        const newHeight = `${Math.max(e.target.scrollHeight - 10, parseInt(minHeight, 10))}px`;

        setTextareaHeight(newHeight);
    };

    // 이미지 업로드 처리
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        console.log(file.name);
        setUploadedImage(file);

        // console.log('업로드된 이미지:', file.name);
    };

    // 이미지 삭제 처리
    const handleImageDelete = () => {
        setUploadedImage(null);
    };

    // 게시물 작성 제출 처리
    const handleSubmit = async (e) => {
        e.preventDefault();

        // const boardData = {
        //     bdContent: bdContent,
        //     userEmail: userEmail
        //   };
          
        //   const formData = new FormData();
        //   formData.append('BoardRequestDTO', JSON.stringify(boardData));
        //   formData.append('boardPhoto', uploadedImage); // 'file'은 사용자가 선택한 파일 객체
          
        //   axios.post('/api/board/create', formData, {
        //     headers: {
        //       'Content-Type': 'multipart/form-data',
        //     }
        //   })
        //     .then(response => {
        //       // 서버 응답 처리
        //       console.log(response.data);
        //       setBoardWriteData(response.data);
        //       setBoardData((prevData) => [response.data, ...prevData]);
        //       console.log('글 작성이 성공했습니다:', response.data);
  
        //       setNewPostAdded(true);
        //       setUploadedImage(null);
        //       formRef.current.reset();
        //     })
        //     .catch(error => {
        //       // 오류 처리
        //       console.error('Error:', error);
        //                   if (error.response) {
        //         console.error('서버 응답 오류:', error.response.data);
        //     } else if (error.request) {
        //         console.error('서버 응답이 없음:', error.request);
        //     } else {
        //         console.error('요청 전 오류 발생:', error.message);
        //     }
        //     });



        try {
            const formData = new FormData();
            const jsonData = JSON.stringify({
                bdContent : bdContent,
                userEmail : userEmail
            })
            const jsonBlob = new Blob([jsonData], {type: "application/json"})
            formData.append('BoardRequestDTO', jsonBlob);
            console.log(formData);
            // formData.append('bdContent', bdContent);
            // formData.append('userEmail', userEmail);
            // console.log('Keys:', formData.keys());
            // console.log('All entries:', Array.from(formData.entries()));
            // console.log(formData.entries());
            // console.log('bdContent:', formData.get('BoardRequestDTO[bdContent]'));
            // console.log('userEmail:', formData.get('BoardRequestDTO[userEmail]'));
            // console.log('boardPhoto:', formData.get('boardPhoto'));
            if (uploadedImage) {
                formData.append('boardPhoto', uploadedImage);
            }

            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',  // 이 부분을 추가해보세요
                },
            };
            console.log('axios config:', config);
            const response = await axios.post('/api/board/create', formData, config);

            setBoardWriteData(response.data);
            setBoardData((prevData) => [response.data, ...prevData]);
            console.log('글 작성이 성공했습니다:', response.data);

            setNewPostAdded(true);
        } catch (error) {
            console.error('글 작성 중 오류 발생:', error);
            if (error.response) {
                console.error('서버 응답 오류:', error.response.data);
            } else if (error.request) {
                console.error('서버 응답이 없음:', error.request);
            } else {
                console.error('요청 전 오류 발생:', error.message);
            }
        } finally {
            setUploadedImage(null);
            formRef.current.reset();
        }
    };









    return (
        <BoardWriteForm action='/api/board/create' ref={formRef} onSubmit={handleSubmit} method='post'>
            <BoardWriteTextArea>
                {/* 이미지 미리보기 및 삭제 버튼 */}
                {uploadedImage && (
                    <BoardInputImageBox>
                        <BoardInputImage src={URL.createObjectURL(uploadedImage)} alt="미리보기" />
                        <BoardInputImageBtn type="button" onClick={handleImageDelete}>X</BoardInputImageBtn>
                    </BoardInputImageBox>
                )}
                <BoardTextAreaInput
                    rows={1}
                    name='bdContent'
                    placeholder='당신의 생각을 적어주세요'
                    onChange={handleTextareaChange}
                    style={{ height: textareaHeight }} // 동적으로 변경된 높이 적용
                />

            </BoardWriteTextArea>
            <BoardWriteBottom>
                <BoardWriteIconArea>
                    {/* 이미지 업로드 input */}
                    <label htmlFor="fileInput">
                        <BoardWriteIcon src={PhotoLogo} />
                    </label>
                    <input
                        type="file"
                        id="fileInput"
                        accept="image/*"
                        onChange={handleImageUpload}
                        style={{ display: 'none' }}
                    />
                    <BoardWriteIcon src={LinkLogo} />
                </BoardWriteIconArea>
                <BoardWritePostBox>
                    <BoardWriteResetBtn type='reset' onClick={handleReset}>
                        <BoardWriteIcon src={ResetLogo} />
                    </BoardWriteResetBtn>
                    <BoardWritePostBtn type='submit'>작성하기</BoardWritePostBtn>
                </BoardWritePostBox>
            </BoardWriteBottom>
        </BoardWriteForm>
    );
}