import axios from 'axios';
import { parseString } from 'xml2js';

const API_KEY = process.env.REACT_APP_KOR_DIC_API_KEY;

export const searchKorean = ( query, myFnc ) => {
    const options = {
        method: 'GET',
        url : `https://krdict.korean.go.kr/api/search?key=${API_KEY}&type_search=search&part=word&q=${query}&sort=dict`,
    }
    axios.request(options)
    .then((response) => response.data)
    .then(responseData => parseString(responseData, (err, result) => {
        myFnc(result.channel.item);
        console.log('getKoreanSearch Running')
    }))
    .catch((error) => console.log(error));
}

export const getWord = (query, myFnc) => {
    const config = {
        method: 'GET',
        url : `https://krdict.korean.go.kr/api/search?key=${API_KEY}&type_search=search&part=dfn&q=${query}&num=100&sort=popular`,
    }
    axios.request(config)
    .then((response) => response.data)
    .then(responseData => parseString(responseData, (err, result) => {
        myFnc(result.channel.item);
        console.log('getWord Running')
    }))
    .catch((error) => console.log(error));
}


