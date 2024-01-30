import axios from "axios";
import fs from "fs";

async function fetchPage() {
  const url = "https://service.wadiz.kr/api/search/funding";

  try {
    const response = await axios.post(
      url,
      {
        limit: 10,
        order: "recommend",
        startNum: 0,
      },
      {
        headers: {
          authority: "service.wadiz.kr",
          "User-Agent":
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
          "Accept-Language": "ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7",
          "Content-Type": "application/json",
        },
      }
    );

    const data = response.data;
    const list = data["data"]["list"];

    // Promise.all로 여러 이미지 URL을 비동기적으로 가져옴
    const imgArr = await Promise.all(list.map(async (el, i) => el.photoUrl));

    console.log(list.length);

    fs.writeFileSync("./wadiz_crawl.json", JSON.stringify(list));

    const outputFolder = "images";

    //console.log(list);

    // saveImagesLocally 함수 수정 없이 imgArr를 전달
    saveImagesLocally(imgArr, outputFolder);
  } catch (err) {
    console.error(err);
  }
}

async function saveImagesLocally(imageUrls, outputFolder) {
  try {
    // 1. outputFolder 확인 및 생성
    if (!fs.existsSync(outputFolder)) {
      // 만약 출력 폴더가 없다면 생성
      fs.mkdirSync(outputFolder);
    }

    // 2. 이미지 다운로드 및 저장
    for (let i = 0; i < imageUrls.length; i++) {
      const imageUrl = imageUrls[i];

      // 이미지 다운로드: axios를 사용하여 이미지 데이터를 arraybuffer 형태로 받아옴
      const response = await axios.get(imageUrl, {
        responseType: "arraybuffer",
      });

      // 이미지 데이터를 바이너리 형태의 버퍼로 변환
      const buffer = Buffer.from(response.data);

      // 로컬 파일 저장: 이미지를 로컬 파일로 저장 (파일명은 'image_i.jpg' 형식)
      const outputPath = `${outputFolder}/image_${i + 1}.jpg`;
      fs.writeFileSync(outputPath, buffer);

      // 성공 메시지 출력
      // console.log("Image saved locally:", outputPath);
    }
  } catch (error) {
    // 오류 발생 시 오류 메시지 출력
    console.error("Error:", error.message);
  }
}

fetchPage();
