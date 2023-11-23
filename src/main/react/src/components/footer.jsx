import styled from "styled-components"
import Github from "../assets/github-mark-white.svg"

const Wrapper = styled.div`
    width: 100%;
    height: 70px;
    background-color: #100F0F;
    display: flex;
    align-items: center;
    justify-content: right;
    position: relative;
`;

const Menu = styled.div`
    width: 100%;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    position: relative;
`;

const MenuItem = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
`;

const GithubBox = styled.a`
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    gap: 20px;
    position: absolute;
    left: 200px;
    text-decoration: none;
`;

const GithubText = styled.div`
    color: white;
    font-size: 20px;
`;

const GithubLogo = styled.img`
    width: 40px;
    height: 40px;
`;


export default function Footer() {

    return (
        <Wrapper>
            <Menu>
                <GithubBox href="https://github.com/2023-SMHRD-IS-BigData1/News-Summary" target="_blank">
                    <GithubLogo src={Github} />
                    <GithubText>GitHub</GithubText>
                </GithubBox>
                <MenuItem>Copyright © 2023 NewsSummary. All rights reserved.</MenuItem>
            </Menu>
        </Wrapper>
    )
}