import * as React from 'react';
import Masonry from '@mui/lab/Masonry';
import styled from "styled-components"
import Like from "../assets/heart-icon.svg"
import Comment from "../assets/comment-icon.svg"
import ViewsLogo from "../assets/views.svg"
import { useState } from 'react';
import { useEffect } from 'react';
import Pagination from 'react-js-pagination';
import { Link } from 'react-router-dom';
import { useBoardContext, useBoardViewContext } from '../data/board-data';
import LoadingScreen from './loading-screen';
import { BoardModalPortal } from './portal';
import { BoardModal } from './modal';
import moment from 'moment';

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
    height: 300px;
    padding: 20px;
    background-color: white;
    position: relative;
`;

const TextDate = styled.div`
    color: #999999;
`;

const TextContent = styled.div`
    width: 100%;
    height: 105px;
    padding: 10px 10px 0 10px;
    font-size: 20px;
    line-height: 1.2;
    overflow: hidden;
    position: relative;
    white-space: normal;
    word-wrap: break-word;
    display: -webkit-box;
    text-overflow: ellipsis;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
`;

const TextUrl = styled.div`
    width: 100%;
    height: 40px;
    font-size: 16px;
    padding: 0 10px;
    margin-top: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #99999999;
    cursor: pointer;
`;

const LikeBox = styled.div`
    width: 90%;
    height: 30px;
    padding-right: 30px;
    display: flex;
    align-items: center;
    justify-content: right;
    position: absolute;
    bottom: 70px;
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
    position: absolute;
    bottom: 20px;
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

const BoardWriteButton = styled.div`
    width: 120px;
    height: 40px;
    border-radius: 10px;
    font-size: 18px;
    font-weight: 600;
    background-color: #2A9D8F;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    &:hover {
        background-color: #264653;
        color: #ffffff;
        transition: .5s;
    }
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
`



export function BoardSNS() {
    const { boardData, loading } = useBoardContext();
    const { boardViewData, loadingViews } = useBoardViewContext();
    const [columns, setColumns] = useState(3);
    const [page, setPage] = useState(1);
    const [itemsBoard, setItemsBoard] = useState(20);
    const [modalOn, setModalOn] = useState(false);
    const [totalPages, setTotalPages] = useState(1);
    const [selectedItem, setSelectedItem] = useState(null);

    // const data = [600, 300, 600, 900, 600, 600, 600, 300, 600, 900, 600, 600];
    // const imageUrl = [
    //     "https://images.ddengle.com/files/attach/images/64/029/476/019/b48a83cbac7ca97c12171c119ad4d761.jpg",
    //     undefined,
    //     "https://i.pinimg.com/564x/6b/d7/9d/6bd79d2a74f29643d92d5f83688ffa70.jpg",
    //     "https://i.pinimg.com/564x/89/92/53/89925343ad179a782689d46ad76a6e2d.jpg",
    //     "https://pbs.twimg.com/media/FyXzQgSacAANkRw?format=jpg&name=900x900",
    //     "https://i.pinimg.com/564x/f4/0f/c8/f40fc808687f837af723bad07519e8b5.jpg",
    //     undefined,
    //     "https://i.pinimg.com/564x/6b/d7/9d/6bd79d2a74f29643d92d5f83688ffa70.jpg",
    //     "https://i.pinimg.com/564x/89/92/53/89925343ad179a782689d46ad76a6e2d.jpg",
    //     "https://pbs.twimg.com/media/FyXzQgSacAANkRw?format=jpg&name=900x900",
    // ]



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

    // 페이징 코드
    const handlePageChange = (page) => {
        window.scrollTo({ top: 0 });
        setPage(page);
    };

    const calculateTotalPages = (totalItems, itemsPerPage) => {
        const totalPages = Math.ceil(totalItems / itemsPerPage);
        setTotalPages(totalPages);
    };

    // 검색 결과에 대해 페이징된 데이터 가져오기
    const startIndex = (page - 1) * itemsBoard;
    const endIndex = startIndex + itemsBoard;
    // data에 게시판 데이터 넣기
    const paginatedData = boardData.slice(startIndex, endIndex);

    const searchList = () => {
        return paginatedData.filter((itemData) =>
            itemData.title.toUpperCase().includes(searchTerm.toUpperCase())
        );
    };

    const handleModal = async (item) => {
        setSelectedItem(item);
        setModalOn(!modalOn);

        // API 호출 등을 통해 viewCount를 1 증가시키는 작업 수행
        try {
            const response = await axios.get(`/api/board/detail/${bdIdx}`);
            useEffect(() => {
                setNewsData(response.data);
                console.log('데이터가 성공적으로 로드되었습니다:', response.data);
            }, [response.data, setNewsData]);

        } catch (error) {
            console.error('데이터 로드 중 오류 발생:', error);
        }
    };

    // 가져온 데이터를 사용하여 UI를 렌더링
    const boardItems = boardData  && boardData.map((item, index) => {
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


    return (
        <Wrapper>
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
                    boardItems
                )}
                {/* 테스트 데이터 출력용 */}
                {/* {data.map((data, index) => (
                    <Item key={index} style={{ height: `auto` }}>
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
                ))} */}
            </Masonry>
            <BoardWriteBox>
                <Link to="/board-write" style={{ textDecoration: "none", color: "black" }}>
                    <BoardWriteButton>글쓰기</BoardWriteButton>
                </Link>
            </BoardWriteBox>
            <PaginationBox>
                <Pagination
                    activePage={page}
                    itemsCountPerPage={itemsBoard}
                    totalItemsCount={boardData.length}
                    pageRangeDisplayed={5}
                    onChange={handlePageChange}>
                </Pagination>
            </PaginationBox>
        </Wrapper>
    )
}

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
        <Link to="/board" style={{width: "100%", display: 'flex', justifyContent: "center", textDecoration: "none", color: "#000000"}}>
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