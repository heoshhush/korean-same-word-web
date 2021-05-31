import React from 'react';
import styled from 'styled-components'
import SearchResultCard from './SearchResultCard';

const SearchResult = ({query, searchResultObj, sameWordResultObj, itemName }) => {
    
    
    return(
        <Container>
            {itemName.map(item => 
                <SearchResultCard
                    key={item}
                    word={item}
                    wordDefArray={
                        searchResultObj[item]['def']
                    }
                    sameWordResultObj={sameWordResultObj}
                />
                )}

        </Container>
    )
}

const Container = styled.div`
    
`;

export default SearchResult;