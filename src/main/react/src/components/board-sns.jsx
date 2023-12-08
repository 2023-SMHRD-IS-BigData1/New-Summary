import * as React from 'react';
import Masonry from '@mui/lab/Masonry';
import styled from "styled-components"
import Like from "../assets/heart-icon.svg"
import Comment from "../assets/comment-icon.svg"
import ViewsLogo from "../assets/views.svg"
import { useState, useRef, useEffect, useCallback } from 'react';
import Pagination from 'react-js-pagination';
import { Link } from 'react-router-dom';
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
    height: calc(100% - 300px);
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
    /* height: 105px; */
    padding: 10px 10px 0 10px;
    margin-bottom: 20px;
    font-size: 20px;
    line-height: 1.2;
    word-wrap: break-word;
    white-space: pre-wrap;
    /* overflow: hidden;
    position: relative;
    display: -webkit-box;
    text-overflow: ellipsis;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical; */
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
    padding-top: 20px;
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



// export function BoardSNS() {
//     // const { boardData, setBoardData, loading } = useBoardContext();
//     const { loading } = useBoardContext();
//     const { boardViewData, loadingViews } = useBoardViewContext();
//     const [columns, setColumns] = useState(3);
//     const [itemsPerPage, setItemsPerPage] = useState(20);
//     const [modalOn, setModalOn] = useState(false);
//     const [selectedItem, setSelectedItem] = useState(null);

//     const [boardData, setBoardData] = useState([]);
//     const [page, setPage] = useState(1);
//     const [load, setLoad] = useState(false);

//     useEffect(() => {
//         if (page !== 1) getPost();
//     }, [page]);


//     const getPost = useCallback(async () => { //글 불러오기  
//         setLoad(true); //로딩 시작
//         try {
//             const res = await axios.get(`/api/board/list?page=${page}`);
//             if (res.data.end) { //마지막 페이지일 경우
//                 endRef.current = true;
//                 noPostShow();
//                 setList(prev => [...prev, ...setBoardData]); //리스트 추가
//                 prevent_duple.current = true;
//             }
//             } catch (e) {
//                 console.error(e)
//             } finally {
//                 setLoad(false); //로딩 종료      
//             }
//         }, [page]);

//     // 게시판 반응형 사이즈조절
//     useEffect(() => {
//         const handleResize = () => {
//             const newColumns = window.innerWidth <= 700 ? 1 : window.innerWidth <= 1100 ? 2 : 3;
//             setColumns(newColumns);
//         };

//         handleResize();
//         window.addEventListener('resize', handleResize);

//         return () => {
//             window.removeEventListener('resize', handleResize);
//         };
//     }, []);

//     // DB 게시판데이터 변동시 재요청
//     useEffect(() => {
//         const axiosData = async () => {
//             try {
//                 const response = await axios.get('/api/board/list');
//                 setBoardData(response.data);
//                 console.log('게시판 갱신 데이터가 성공적으로 로드되었습니다:', response.data);
//             } catch (error) {
//                 console.error('게시판 갱신 데이터 로드 중 오류 발생:', error);
//             }
//         };
//         axiosData();
//     }, [setBoardData]);

//     const handleModal = async (item) => {
//         setSelectedItem(item);
//         setModalOn(!modalOn);

//         // API 호출 등을 통해 viewCount를 1 증가시키는 작업 수행
//         try {
//             const response = await axios.get(`/api/board/detail/${item.bdIdx}`);
//             setNewsData(response.data);
//             console.log('데이터가 성공적으로 로드되었습니다:', response.data);
//         } catch (error) {
//             console.error('데이터 로드 중 오류 발생:', error);
//         }
//     };

//     // 가져온 데이터를 사용하여 UI를 렌더링
//     const boardItems = boardData && boardData.map((item, index) => {
//         // Moment.js를 사용하여 날짜 포맷 변경
//         const formattedDate = moment(item.createdAt).format('YYYY-MM-DD HH:mm');

//         return (
//             <>
//                 <Item key={item.id} onClick={() => handleModal(item)}>
//                     {/* 이미지 추가시 들어갈 코드 */}
//                     {/* {imageUrl[item.id] && <ItemImage src={imageUrl[item.id]} />} */}
//                     <ItemTextBox>
//                         <TextDate>{formattedDate}</TextDate>
//                         <TextContent>{item.bdContent}</TextContent>
//                         {item.bdUrl && <TextUrl>{item.bdUrl}</TextUrl>}
//                         <LikeBox>
//                             {/* 댓글추가시 댓글 카운트해서 넣을것 */}
//                             <Comments src={Comment} /> 10
//                             <Likes src={Like} /> {item.bdLikes}
//                             <Views src={ViewsLogo} /> {item.bdViews}
//                         </LikeBox>
//                         <UserBox>
//                             {/*  유저 프로필사진 들어가기 */}
//                             <UserBoxImage></UserBoxImage>
//                             {/* 유저이름 출력 / 아직 시큐리티 적용안되서 null 받는중 */}
//                             <UserBoxName>{item.userName}</UserBoxName>
//                         </UserBox>
//                     </ItemTextBox>
//                 </Item>
//             </>
//         );
//     });

//     return (
//         <Wrapper>
//             <Masonry columns={columns} spacing={2} defaultHeight={150} defaultColumns={1} defaultSpacing={2}>
//                 {loading ? (
//                     <LoadingScreen />
//                 ) : (
//                     boardItems
//                 )}
//             </Masonry>
//             <BoardBottomBox></BoardBottomBox>
//             <BoardModalPortal>
//                 {modalOn && <BoardModal item={selectedItem} onClose={() => setModalOn(false)} />}
//             </BoardModalPortal>
//         </Wrapper>
//     );
// };


export function BoardSNS() {
    // const { boardData, setBoardData, loading } = useBoardContext();
    const { loading } = useBoardContext();
    const { boardViewData, loadingViews } = useBoardViewContext();
    const [columns, setColumns] = useState(3);
    const [itemsPerPage, setItemsPerPage] = useState(20);
    const [modalOn, setModalOn] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [page, setPage] = useState(0); // 현재 페이지 번호 (페이지네이션)
    const [ref, inView] = useInView();
    const [boardData, setBoardData] = useState([]);

    // 무한 스크롤
    // 지정한 타겟 div가 화면에 보일 때 마다 서버에 요청을 보냄
    const productFetch = () => {
        axios
            .get(`/api/board/list?page=${page + 1}&perPage=${itemsPerPage}`)
            .then((res) => {
                console.log(res.data);
                // 이미 존재하는 데이터를 필터링하여 새로운 아이템만 가져오기
                // const newItems = res.data.filter((newItem) => !boardData.some((item) => item.id === newItem.id));
                // 리스트 뒤로 붙여주기
                // setBoardData((prevData) => [...prevData, ...newItems]);
                setBoardData((prevData) => [...prevData, ...(res.data)]);
                // 요청 성공 시에 페이지에 1 카운트 해주기
                setPage((page) => page + 1);
            })
            .catch((err) => { console.log(err) });
    };

    useEffect(() => {
        // inView가 true 일때만 실행한다.
        if (inView) {
            console.log(inView, '무한 스크롤 요청 🎃');
            productFetch();
        }
    }, [inView, boardData, page, itemsPerPage]);

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

    // DB 게시판데이터 변동시 재요청
    useEffect(() => {
        const axiosData = async () => {
            try {
                const response = await axios.get('/api/board/list');
                setBoardData(response.data);
                console.log('게시판 갱신 데이터가 성공적으로 로드되었습니다:', response.data);
            } catch (error) {
                console.error('게시판 갱신 데이터 로드 중 오류 발생:', error);
            }
        };
        axiosData();
    }, [setBoardData]);

    const handleModal = async (item) => {
        setSelectedItem(item);
        setModalOn(!modalOn);

        // API 호출 등을 통해 viewCount를 1 증가시키는 작업 수행
        try {
            const response = await axios.get(`/api/board/detail/${item.bdIdx}`);
            setNewsData(response.data);
            console.log('데이터가 성공적으로 로드되었습니다:', response.data);
        } catch (error) {
            console.error('데이터 로드 중 오류 발생:', error);
        }

    };

    // 가져온 데이터를 사용하여 UI를 렌더링
    const boardItems = boardData && boardData.map((item, index) => {
        // Moment.js를 사용하여 날짜 포맷 변경
        const formattedDate = moment(item.createdAt).format('YYYY-MM-DD HH:mm');

        return (
            <>
                <Item key={item.id} onClick={() => handleModal(item)}>
                    {/* 이미지 추가시 들어갈 코드 */}
                    {/* {imageUrl[item.id] && <ItemImage src={imageUrl[item.id]} />} */}
                    <ItemTextBox>
                        <TextDate>{formattedDate}</TextDate>
                        <TextContent>{item.bdContent}</TextContent>
                        {item.bdUrl && <TextUrl>{item.bdUrl}</TextUrl>}
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
                            <UserBoxName>{item.userName}</UserBoxName>
                        </UserBox>
                    </ItemTextBox>
                </Item>
            </>
        );
    });

    return (
        <Wrapper>
            <Masonry columns={columns} spacing={2} defaultHeight={150} defaultColumns={1} defaultSpacing={2}>
                {loading ? (
                    <LoadingScreen />
                ) : (
                    boardItems
                )}
            </Masonry>
            <BoardBottomBox ref={ref}></BoardBottomBox>
            <BoardModalPortal>
                {modalOn && <BoardModal item={selectedItem} onClose={() => setModalOn(false)} />}
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
        "https://images.ddengle.com/files/attach/images/64/029/476/019/b48a83cbac7ca97c12171c119ad4d761.jpg",
        undefined,
        "https://i.pinimg.com/564x/6b/d7/9d/6bd79d2a74f29643d92d5f83688ffa70.jpg",
        "https://i.pinimg.com/564x/89/92/53/89925343ad179a782689d46ad76a6e2d.jpg",
        "https://pbs.twimg.com/media/FyXzQgSacAANkRw?format=jpg&name=900x900",
        "https://i.pinimg.com/564x/f4/0f/c8/f40fc808687f837af723bad07519e8b5.jpg",
    ]

    return (
        <Link to="/board" style={{ width: "100%", display: 'flex', justifyContent: "center", textDecoration: "none", color: "#000000" }}>
            <Masonry
                columns={columns}
                spacing={2}
                defaultHeight={300}
                defaultColumns={1}
                defaultSpacing={2}
            >
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
                            <TextDate>2023.11.16 16:06</TextDate>
                            <TextContent>
                                사용자가 작성한 게시판 글이 여기에 나올 예정입니다 AAAAABABABABABBABABABBABABABABVAAVAVAVA 사용자가 작성한 게시판 글이 여기에 나올 예정입니다
                            </TextContent>
                            <TextUrl>https://www.naver.com/</TextUrl>
                            <LikeBox>
                                <Comments src={Comment} /> 10
                                <Likes src={Like} /> 52
                            </LikeBox>
                            <UserBox>
                                <UserBoxImage></UserBoxImage>
                                <UserBoxName>UserName</UserBoxName>
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
        "https://images.ddengle.com/files/attach/images/64/029/476/019/b48a83cbac7ca97c12171c119ad4d761.jpg",
        undefined,
        "https://i.pinimg.com/564x/6b/d7/9d/6bd79d2a74f29643d92d5f83688ffa70.jpg",
        "https://i.pinimg.com/564x/89/92/53/89925343ad179a782689d46ad76a6e2d.jpg",
        "https://pbs.twimg.com/media/FyXzQgSacAANkRw?format=jpg&name=900x900",
        "https://i.pinimg.com/564x/f4/0f/c8/f40fc808687f837af723bad07519e8b5.jpg",
    ]

    return (
        <Link to="/board" style={{ width: "100%", display: 'flex', justifyContent: "center", textDecoration: "none", color: "#000000" }}>
            <Masonry
                columns={columns}
                spacing={2}
                defaultHeight={300}
                defaultColumns={1}
                defaultSpacing={2}
            >
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
                            <TextDate>2023.11.16 16:06</TextDate>
                            <TextContent>
                                사용자가 작성한 게시판 글이 여기에 나올 예정입니다
                            </TextContent>
                            <TextUrl>https://www.naver.com/</TextUrl>
                            <LikeBox>
                                <Comments src={Comment} /> 10
                                <Likes src={Like} /> 52
                            </LikeBox>
                            <UserBox>
                                <UserBoxImage></UserBoxImage>
                                <UserBoxName>UserName</UserBoxName>
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

export function BoardWriteArea() {
    const { setBoardData } = useBoardContext();
    const { boardWriteData, setBoardWriteData, loadingWrite } = useBoardWriteContext();
    const [bdContent, setBdContent] = useState('');
    const formRef = useRef(null);
    const [textareaHeight, setTextareaHeight] = useState('auto'); // 초기값은 'auto'로 설정

    // 세션에 저장된 유저데이터가 있을경우 이메일 데이터를 가져오기
    let userEmail;
    const userDataString = sessionStorage.getItem('userData');
    if (userDataString) {
        let userData = JSON.parse(userDataString);
        userEmail = userData.userEmail;
    }

    // reset 버튼을 눌렀을 때 textarea 높이를 'auto'로 설정
    const handleReset = () => {
        setTextareaHeight('auto');
        formRef.current.reset();
    };

    // textarea 높이값 조절
    const handleTextareaChange = (e) => {
        setBdContent(e.target.value);
        const minHeight = '0px';
        const newHeight = `${Math.max(e.target.scrollHeight - 10, parseInt(minHeight, 10))}px`;

        setTextareaHeight(newHeight);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/board/create', {
                bdContent,
                userEmail
            });
            setBoardWriteData(response.data);
            setBoardData((prevData) => [response.data, ...prevData]); // 기존 데이터 앞에 새로운 데이터 추가
            console.log('글 작성이 성공했습니다:', response.data);
            formRef.current.reset();
        } catch (error) {
            console.error('글 작성 중 오류 발생:', error);
        }
    };


    return (
        <BoardWriteForm action='/api/board/create' ref={formRef} onSubmit={handleSubmit} method='post'>
            <BoardWriteTextArea>
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
                    <BoardWriteIcon src={PhotoLogo} />
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