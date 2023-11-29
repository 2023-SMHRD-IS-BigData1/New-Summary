import styled from 'styled-components';
import Header from '../components/header';
import Footer from '../components/footer';
import { SearchNewsComponent } from '../components/news';

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  padding-top: 120px;
  gap: 50px;
`;

export default function SearchNews() {

    return (
        <Wrapper>
            <Header></Header>
            <SearchNewsComponent />
            <Footer></Footer>
        </Wrapper>
    );
}