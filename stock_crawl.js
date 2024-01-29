import axios from 'axios';
import * as cheerio from 'cheerio';
import fs from 'fs';
import iconv from 'iconv-lite';

async function fetchPage() {
    const url = "https://finance.naver.com/item/sise.nhn?code=005930";
    try {
        const response = await axios.get(url);
        const data = response.data;

        const $ = cheerio.load(data);

        const iframeDataList = await Promise.all($('iframe').map(async (i, el) => {
            const iframeSrc = $(el).prop('src');
            
            if (iframeSrc === "/item/sise_day.naver?code=005930") {
                console.log("https://finance.naver.com" + iframeSrc)
                const iframeResponse = await axios.get(
                    "https://finance.naver.com" + iframeSrc, {
                        headers: {
                            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36'
                        },
                        responseType: 'arraybuffer', // 설정 추가
                    });

                const $iframe = cheerio.load(iconv.decode(iframeResponse.data, 'EUC-KR')); // 인코딩 변환

                const titleList = $iframe('.type2').find('tr th').map((i, el) => {
                    const titles = $(el).text().trim();
                    return titles;
                });

                const tableText = $iframe('.type2').find('tr').map((i, el) => {
                    const date = $(el).find('td:nth-child(1)').text().trim();
                    const end = $(el).find('td:nth-child(2)').text().trim();
                    const thanYesterday = $(el).find('td:nth-child(3)').text().trim();
                    const market = $(el).find('td:nth-child(4)').text().trim();
                    const highest = $(el).find('td:nth-child(5)').text().trim();
                    const lowest = $(el).find('td:nth-child(6)').text().trim();
                    const amount = $(el).find('td:nth-child(7)').text().trim();

                    return {
                        [titleList[0]]: date,
                        [titleList[1]]:end,
                        [titleList[2]]:thanYesterday,
                        [titleList[3]]:market,
                        [titleList[4]]:highest,
                        [titleList[5]]:lowest,
                        [titleList[6]]:amount
                    };
                }).get();

                fs.writeFileSync('./stock_crawl.json', JSON.stringify(tableText));

                return {
                    tableText
                };
            }
        }).get());

    } catch (err) {
        console.error(err);
    }
}

fetchPage();
