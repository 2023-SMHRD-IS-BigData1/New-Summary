import styled from "styled-components"
const Wrapper = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const Text = styled.span`
    font-size: 24px;
`;
export default function LoadingScreen() {
    return <Wrapper><Text>Loading....</Text></Wrapper>
}