import * as React from 'react';
import Masonry from '@mui/lab/Masonry';
import styled from "styled-components"
import Like from "../assets/heart-icon.svg"
import Comment from "../assets/comment-icon.svg"

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

const CategoryBox = styled.div``;

export function BoardSNS() {
    // return (
    //     <Masonry
    //         columns={4}
    //         spacing={2}
    //         defaultHeight={450}
    //         defaultColumns={4}
    //         defaultSpacing={1}
    //     >
    //         {heights.map((height, index) => (
    //             <Item key={index} sx={{ height }}>
    //                 {index + 1}
    //             </Item>
    //         ))}
    //     </Masonry>
    // )
}

export function BoardMain() {
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
            columns={3}
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