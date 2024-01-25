import axios from 'axios'; 
import * as cheerio from 'cheerio';

async function fetchPage(){
    const url="https://quotes.toscrape.com/"
    try{
        const response =await axios.get(url);
        const data=response.data;
        console.log(response.data);

        const $ = cheerio.load(data);

        const $q = cheerio.load(
            `<ul>
              <li>Item 1</li>
              <li>Item 2</li>
            </ul>`,
          );
          
        const listItems = $('ul').find('li');
          

        const everything=$('.quote').map((i,el)=>{

            const tagLists=$(el).find('.tags .tag').map((i,el)=>{
                return $(el).text();

            }).get();

            return{
                quotes: $(el).find('.text').text(),
                authors: $(el).find('.author').text(),
                links: $(el).find('span>a').prop('href'),
                tags: tagLists 
                //authorDetails: s

            }
        }).get();

        console.log(everything);

        /*
        const quotes=$('.quote .text').map((i,el)=>{ 
            return $(el).text();
        
        }).get();
        
        console.log(quotes);

        const authors=$('.quote .author').map((i,el)=>{ 
            return $(el).text();
        
        }).get();
        
        console.log(authors);

        const links=$('.quote span>a').map((i,el)=>{ 
            return $(el).prop('href');
        
        }).get();
        console.log(links);

       */


    } catch(err){
        console.error(err);
    }
}
fetchPage();


 