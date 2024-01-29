import axios from 'axios';
import * as cheerio from 'cheerio';
import fs from 'fs';
import iconv from 'iconv-lite';

async function fetchPage() {
    const url = "https://finance.naver.com/item/news_notice.naver?code=005930&page=";
    try {
        const response = await axios.get(url,
            {responseType: 'arraybuffer'},);
        const data = response.data;

        const $ = cheerio.load(iconv.decode(data, 'EUC-KR'));

        const titleList = $('.type6 thead tr th').map((i, el) => {
            const titles = $(el).text().trim();
            return titles;
        });

        const dataList = await Promise.all($('.type6 tbody tr').map(async (i, el) => {
    
            const name= $(el).find('.title a').text().trim();
            const from=$(el).find('.info').text().trim();
            const date=$(el).find('.date').text().trim();

            return {
                
                [titleList[0]]:name,
                [titleList[1]]:from,
                [titleList[2]]:date
            };
            
        }).get());
        

        console.log(dataList);
        fs.writeFileSync('.disclosure_crawl.json', JSON.stringify(dataList));

    } catch (err) {
        console.error(err);
    }
}

fetchPage();