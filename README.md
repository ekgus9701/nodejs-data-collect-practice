nodejs를 활용하여 각 페이지들을 크롤링하는 실습을 진행했습니다.

- 네이버 공시정보 페이지 크롤링 (disclosure_crawl.js)
  ```
  - cheerio, axios 활용
  - 어려웠던 점: 한글이 깨지는 인코딩 문제가 발생했다. -> iconv 라이브러리를 사용해서 해결했다.
  ```
 
- 네이버 뉴스 검색 페이지 크롤링 (news_crawl.js)
  ```
  - cheerio, axios 활용
  - 어려웠던 점 : img src를 넣어주었는데도 뉴스 썸네일 사진이 크롤링 되지 않았다. 
    -> img src가 이상한 값이 찍혀있어 개발자도구 > 네트워크 > search.naver?where=news&sm=tab_jum& ... >
    응답에서 thumb를 검색해보니 실제 주소는 data-lazysrc에 들어 있어 그에 맞게 수정했다.
  ```
 
- 명언 페이지 크롤링 (quote_crawl.js)
  ```
  - cheerio, axios 활용
  - 어려웠던 점: Promise { <pending> } 문제가 발생했다. 
    -> Promise.all을 사용해 여러 비동기 작업을 병렬로 실행하고, 모든 작업이 완료될 때까지 대기하게 했다.
  ```

- 주식 일별 시세 크롤링 (stock_crawl.js)
  ```
  - cheerio, axios 활용
  - 어려웠던 점 1: iframe을 크롤링 해야 했다. 
    -> html 안에 html이 있는 형태이기 때문에 시세가 나와있는 iframe 주소를 들고 와 axios에 또 넣어 줬다.
  - 어려웠던 점 2: 주소를 넣어줬음에도 데이터가 찍히지 않았다. -> header에 User-Agent를 추가했다.
  ```

- 와디즈 펀딩 페이지 크롤링 (wadiz_crawl.js)
  ```
  - axios 활용
  - 어려웠던 점 1: wadiz 펀딩 페이지 url에 대부분의 데이터가 존재하지 않았다. 
    -> 네트워크 탭을 열고 아래로 스크롤하며 새롭게 생겨나는 네트워크 소스들을 확인했다. 
    funding이라는 소스에 데이터들이 들어와있는 것을 확인했고 url을 변경했다.
  - 어려웠던 점 2: 주소를 넣어줬음에도 데이터가 찍히지 않았다. 
    -> header에 네트워크 탭의 요청 헤더를 맞춰주었고 요청 payload도 추가해서 post 요청을 날려줬다.
    ```
