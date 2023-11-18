import styled from "styled-components";

// 사회 society
// 정치 politics
// 경제 economy
// 국제 International
// 문화 culture
// IT
// 연예 entertainments
// 스포츠 sports
// 긍정적 Positive
// 부정적 negative


const EntertainmentBadge = styled.div`
    width: 100px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    color: #ffffff;
    background-color: #f0e54d;
`;


const PositiveBadge = styled.div`
    width: 100px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    color: #ffffff;
    background-color: #4d73f0;
`;


export function Entertainments() {
    return (
        <EntertainmentBadge>연예</EntertainmentBadge>
    );
}

export function Positive() {
    return (
        <PositiveBadge>긍정적</PositiveBadge>
    )
}