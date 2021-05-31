import React, { useState } from 'react';
import styled from 'styled-components';

const SearchResultCard = ({word, wordDefArray, sameWordResultObj}) => {
    const [sameWordArray, setSameWordArray] = useState(sameWordResultObj[word]['sameWordArray']);
    const [sameWordDefArray, setSameWordDefArray] = useState(sameWordResultObj[word]['defArray']);
    

    return (
        <>
        <WordTitle>{word}</WordTitle>
        {wordDefArray.map(item => 
                <EachWordDef>
                    <EachWordDefText>{wordDefArray.indexOf(item) + 1}.  {item}</EachWordDefText>
                </EachWordDef>
            )}
        <SameWordContainer>
            {sameWordArray.map(item => 
                <SameItem>{item}</SameItem>
            
            )}
        </SameWordContainer>

        </>
    )
}


const WordTitle = styled.div`
    font-size:1.7em;
    margin-top: 2em;
    margin-bottom:1.1em;
    padding-bottom: 0.5em;
    border-bottom: 1.5px solid gray;
    color:brown;
`;
const EachWordDef = styled.div`
    margin-top : 1em;
    margin-bottom: 3.5em;
`;
const EachWordDefText = styled.div`
        margin-top: 1em;
        font-weight: 600;
        margin-bottom: 1em;
`;
const Button = styled.button`
    
`;
const SameItem = styled.span`
    margin-right:1em;
    color:blue;
`;
const SameWordContainer = styled.div`
    width:80%;
`;

export default SearchResultCard;