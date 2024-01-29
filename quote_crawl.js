import axios from 'axios';
import * as cheerio from 'cheerio';
import fs from 'fs';

async function fetchPage() {
    const url = "https://quotes.toscrape.com/";
    try {
        const response = await axios.get(url);
        const data = response.data;

        const $ = cheerio.load(data);

        const everything = await Promise.all($('.quote').map(async (i, el) => {

            const tagLists = $(el).find('.tags .tag').map((i, el) => {
                return $(el).text();
            }).get();

            const quotes = $(el).find('.text').text();
            const authors = $(el).find('.author').text();
            const links = $(el).find('span > a').prop('href');
            const tags = tagLists;

            async function fetchPage2() {
                const urls = url + links;
                try {
                    const response = await axios.get(urls);
                    const data = response.data;
                    const $ = cheerio.load(data);
                    const authorDetails = $('.author-details').text();
                    return authorDetails;

                } catch (err) {
                    console.error(err);
                }
            }

            const authorDetails = await fetchPage2();

            return {
                quotes,
                authors,
                links,
                tags,
                authorDetails
            };

            
        }).get());
        fs.writeFileSync('./quote_crawl.json', JSON.stringify(everything));

        console.log(everything);
        

    } catch (err) {
        console.error(err);
    }
}

fetchPage();
