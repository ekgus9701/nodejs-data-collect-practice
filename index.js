// const axios=require('axios'); //이게 기본인데 과거에 많이 썼음

import axios from 'axios'; //이거 쓰려면 package.json에 "type":"module", 넣어줘야함

async function fetchPage(){
    const url="https://www.naver.com"
    try{
        const response =await axios.get(url);
        console.log(response.data);
    } catch(err){
        console.error(err);
    }
}
fetchPage();

// axios({
//     method: "get",
//     url: "https://www.naver.com",
//     responseType: "type"
// }).then(function (response) {
//     console.log(response);
// });

// const url="https:www.naver.com";

// axios.get(url,). then(response=>{
//     console.log(response);
// })
