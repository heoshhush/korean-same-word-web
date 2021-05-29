import React from 'react';
import styled from 'styled-components';
import SearchTemplate from './SearchTemplate';

const Main = (props) => {
    return(
        <Container>
            <SearchTemplate/>
        </Container>
    )
}

const Container = styled.div`
    display:flex;
    flex-direction:row;
`;

export default Main;