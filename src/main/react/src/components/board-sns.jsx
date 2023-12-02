import * as React from 'react';
import Masonry from '@mui/lab/Masonry';
import styled from "styled-components"
import Like from "../assets/heart-icon.svg"
import Comment from "../assets/comment-icon.svg"
import { useState } from 'react';
import { useEffect } from 'react';
import Pagination from 'react-js-pagination';
import { Link } from 'react-router-dom';

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
    const [columns, setColumns] = React.useState(3);
    const [page, setPage] = useState(1);
    const [items, setItems] = useState(20);
    const [totalPages, setTotalPages] = useState(1);

    const data = [600, 300, 600, 900, 600, 600, 600, 300, 600, 900, 600, 600];
    const imageUrl = [
        "https://images.ddengle.com/files/attach/images/64/029/476/019/b48a83cbac7ca97c12171c119ad4d761.jpg",
        undefined,
        "https://i.pinimg.com/564x/6b/d7/9d/6bd79d2a74f29643d92d5f83688ffa70.jpg",
        "https://i.pinimg.com/564x/89/92/53/89925343ad179a782689d46ad76a6e2d.jpg",
        "https://pbs.twimg.com/media/FyXzQgSacAANkRw?format=jpg&name=900x900",
        "https://i.pinimg.com/564x/f4/0f/c8/f40fc808687f837af723bad07519e8b5.jpg",
        undefined,
        "https://i.pinimg.com/564x/6b/d7/9d/6bd79d2a74f29643d92d5f83688ffa70.jpg",
        "https://i.pinimg.com/564x/89/92/53/89925343ad179a782689d46ad76a6e2d.jpg",
        "https://pbs.twimg.com/media/FyXzQgSacAANkRw?format=jpg&name=900x900",
    ]



    useEffect(() => {
        const handleResize = () => {
            const newColumns = window.innerWidth <= 700 ? 1 : window.innerWidth <= 1100 ? 2 : 3;
            setColumns(newColumns);
        };

        const handleImageLoad = (index, height) => {
            const newData = [...data];
            newData[index] = 300 + height;
            setData(newData);
        };

        handleResize();

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    // 페이징 코드
    const handlePageChange = (page) => {
        setPage(page);
    };

    const calculateTotalPages = (totalItems, itemsPerPage) => {
        const totalPages = Math.ceil(totalItems / itemsPerPage);
        setTotalPages(totalPages);
    };

    // 검색 결과에 대해 페이징된 데이터 가져오기
    const startIndex = (page - 1) * items;
    const endIndex = startIndex + items;
    // data에 게시판 데이터 넣기
    const paginatedData = data.slice(startIndex, endIndex);

    const searchList = () => {
        return paginatedData.filter((itemData) =>
            itemData.title.toUpperCase().includes(searchTerm.toUpperCase())
        );
    };


    return (
        <Wrapper>
            <Masonry
                columns={columns}
                spacing={2}
                defaultHeight={300}
                defaultColumns={1}
                defaultSpacing={2}
            >
                {data.map((data, index) => (
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
                ))}
            </Masonry>
            <BoardWriteBox>
                <Link  to="/board-write" style={{ textDecoration: "none", color: "black" }}>
                    <BoardWriteButton>글쓰기</BoardWriteButton>
                </Link>
            </BoardWriteBox>
            <PaginationBox>
                <Pagination
                    activePage={page}
                    itemsCountPerPage={items}
                    totalItemsCount={data.length - 6}
                    pageRangeDisplayed={5}
                    onChange={handlePageChange}>
                </Pagination>
            </PaginationBox>
        </Wrapper>
    )
}

export function BoardMain() {
    const [columns, setColumns] = React.useState(3);
    React.useEffect(() => {
        const handleResize = () => {
            const newColumns = window.innerWidth <= 700 ? 1 : window.innerWidth <= 1100 ? 2 : 3;
            setColumns(newColumns);
        };

        const handleImageLoad = (index, height) => {
            const newData = [...data];
            newData[index] = 300 + height;
            setData(newData);
        };

        handleResize();

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

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
        <Masonry
            columns={columns}
            spacing={2}
            defaultHeight={300}
            defaultColumns={1}
            defaultSpacing={2}
        >
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
    )
}