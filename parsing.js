import * as cheerio from 'cheerio';
const data=`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <div id="root">
        <div class="content">
            <ul class="profile">
                <li class="other">윤수</li>
                <li class="me">
                    <a href="/profile/me">민수</a>
                </li>
                <li class="other">수지</li>
            </ul>
        </div>
    </div>
</body>
</html>`

const $ = cheerio.load(data);
// console.log($.html());
// console.log($('a'));
// console.log($('#root'));
// console.log($('#root li.me')); //계층구조는 공백이거나 혹은 꺽새 (>) 로 표현
//공백은 조상부터 자손까지
// 꺽새는 바로 자식까지만


console.log($('ul.profile').children()); //바로 자식만 가져오고 싶어
console.log($('a').prop('href')); //a 태그의 property인 href 가져오고 싶어
console.log($('a').text()); //a 태그의 text를 가져오고 싶어
const names=$('li').map((i,el)=>{ //i는 index, el은 element
    return $(el).text();

}).get();

console.log(names);
 
