import axios from "axios";
import * as cheerio from "cheerio";

async function fetchPage() {
  const url =
    "https://search.naver.com/search.naver?where=news&sm=tab_jum&query=%EC%9D%B4%EC%B0%A8%EC%A0%84%EC%A7%80";
  try {
    const response = await axios.get(url);
    const data = response.data;

    const $ = cheerio.load(data);

    const everything = await Promise.all(
      $(".news_area")
        .map(async (i, el) => {
          const headline = $(el).find(".news_contents .news_tit").prop("title");
          let press = $(el)
            .find(".news_info .info_group .info.press")
            .not("i")
            .text();
          const newsContent = $(el).find(".news_dsc .dsc_wrap a").text();
          const newsImage = $(el)
            .find(".news_contents .dsc_thumb img")
            .prop("data-lazysrc");
          const newsLink = $(el).find(".news_dsc .dsc_wrap a").prop("href");

          if (press.includes("언론사 선정")) {
            press = press.replace("언론사 선정", "");
          }

          async function fetchPage2() {
            try {
              const response = await axios.get(newsLink);
              const data = response.data;
              const $ = cheerio.load(data);
              const newsDetails = $("html").text();
              return newsDetails;
            } catch (err) {
              console.error(err);
            }
          }

          const newsDetail = await fetchPage2();

          return {
            headline,
            press,
            newsContent,
            newsImage,
            //newsDetail
          };
        })
        .get()
    );
    console.log(everything);
  } catch (err) {
    console.error(err);
  }
}

fetchPage();
