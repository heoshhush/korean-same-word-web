import React, { useState } from 'react';
import styled from 'styled-components';
import { getWord, searchKorean } from '../service/TranslateAPI';
import SearchResult from './SearchResult';

const SearchTemplate = (props) => {
    const [inputValue, setInputValue] = useState('');
    const [storedData, setStoredData] = useState([]);
    const [showingData, setShowingData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({});

    const storeData = ( text ) => {
            let items = [...new Set([...storedData, text])]
            if(items.length > 20){
                items = items.slice(1);
            }
            const tempObj = {
                 items : items
            }
           localStorage.setItem('search_key', JSON.stringify(tempObj));
           console.log('saved')
    }

    const getLocalData =  () => {
            const value = localStorage.getItem('search_key')
            const jsonVal = JSON.parse(value);
                if(value!==null){
                    setStoredData(preVal => jsonVal['items']);
                    setShowingData(preVal => [...jsonVal['items']].reverse());
                }    
        }

    
    const onPressSearch = ( text ) => {
        console.log('search')
        setLoading(true);
        storeData(text)
        searchKorean(text, (value) => {
            let temp = {};
            let tempArray = [];
            if(!value){
                // navigation.navigate('SearchFail');
                setLoading(false);
            } else{
                for(let i = 0; i< value.length; i ++){
                    for(let j = 0 ; j < value[i]['sense'].length; j++){
                        tempArray.push(value[i]['sense'][j]['definition'][0])
                        temp[value[i]['word'][0]] = {
                            def: [...tempArray]
                        } 
                    }
                }
            }


            const objKeys = Object.keys(temp);
            const eachDefLength = objKeys.map(item => temp[item]['def'].length)
            const tempResult = objKeys.map(item => temp[item]['def'].slice(
                eachDefLength[objKeys.indexOf(item)-1]))

            for(let k = 0; k < tempResult.length ; k ++){
                temp[objKeys[k]]['def'] = tempResult[k];
            }

            const splitKeys = Object.keys(temp).slice(0,4)
            const newTempObj = {};
            splitKeys.forEach(item => newTempObj[item] = temp[item])
            console.log(newTempObj);

            // 유사어 찾기 및 필터링

            let itemName =[];
            let resultTempObj ={};
            let countNum = [];
                 Object.keys(newTempObj).forEach(item => {
                    getWord(item, (value) => {
                        // value가 있다면, itemName에 선별적 push.
                        
                        let wordTemp = [];
                        let defTemp = [];
                        
                        if(value){
                            itemName.push(item);
                            for(let i= 0; i < value.length; i ++){
                                // 중복단어 배제를 위해 if절 삽입
                                if(!wordTemp.includes(value[i]['word'][0])){
                                    wordTemp.push(value[i]['word'][0]);
                                    defTemp.push(value[i]['sense'][0]['definition'][0]);
                                }
                            }
                            resultTempObj[item] = {
                                sameWordArray: [...wordTemp],
                                defArray: [...defTemp],
                            }
                        }

                        countNum.push(item)
                        
                        

                        //search 결과 페이지로 보내기
                        
                        if(countNum.length === Object.keys(newTempObj).length){
                            if(itemName.length === 0){
                                // navigation.navigate('SearchFail');
                                setLoading(false);
                            } else {
                                // navigation.navigate('SearchResult', {
                                //     query : text,
                                //     resultLength: itemName.length,
                                //     itemName: itemName,
                                //     searchResultObj: newTempObj,
                                //     sameWordResultObj: resultTempObj,
                                // })
                                const searchResult = {
                                    query : text,
                                    resultLength: itemName.length,
                                    itemName: itemName,
                                    searchResultObj: newTempObj,
                                    sameWordResultObj: resultTempObj,
                                }
                                setData(searchResult);
            
                            }
                        }
                        
                    })
                    
                })  
                
        })
        setTimeout(() => {
            setLoading(false);
        }, 5000)
        getLocalData();
        
    }

    const onChangeInput = (e) => {
        setInputValue(e.target.value);
    }



    return (
        <Container>
            <SearchContainer>
                <Input value={inputValue} placeholder='검색어를 입력하세요'  onChange={onChangeInput}>
                </Input>
                <Button onClick={() => onPressSearch(inputValue)}>
                검색하기
                </Button>
            </SearchContainer>

            {data.itemName && <SearchResult 
                query ={data.query}
                searchResultObj ={data.searchResultObj}
                sameWordResultObj ={data.sameWordResultObj}
                itemName ={data.itemName}
            />}
        </Container>
    )
}
const Container = styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    margin-bottom:5em;
    width:80vw;
`;
const SearchContainer = styled.div`
    display:flex;
    flex-direction:row;
    align-items:center;
    margin-bottom: 5em;
`;
const Input = styled.input`
    height:1.5em;
    width:20vw;
    border-radius:0.5em;
    margin-right:2em;
    margin-top:-2em;
    padding:0.5em;
    outline:none;
`;

const Button = styled.button`
    margin-top:-2em;
    padding:0.5em;
`;

export default SearchTemplate;