const fs = require("fs");
const XLSX = require("xlsx");
const { load, cut } = require("@node-rs/jieba");
// const { createCanvas, loadImage } = require("canvas");
// const { WordCloud } = require("canvas-constructor");

// 读取和解析Excel文件
const workbook = XLSX.readFile("./data/data.xlsx");
const worksheet = workbook.Sheets[workbook.SheetNames[1]];
const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: "A", range: 2 });

// 提取文本数据并进行分词处理
// const textData = jsonData.map((row) => row["E"]).join(" "); // 学历
// const words = cut(textData);
// const hobbyData = jsonData.map((row) => row["G"]).join(" "); // 爱好
// const wishData = jsonData.map((row) => row["H"]); // 期望
// const words = cut(wishData);

load();

const frequencyMap = new Map();
const countKeyWord = (data) => {
  data?.length &&
    data.forEach((value) => {
      if (frequencyMap.has(value)) {
        frequencyMap.set(value, frequencyMap.get(value) + 1);
      } else {
        frequencyMap.set(value, 1);
      }
    });
};
const map2json = (map) => {
  const obj = Object.create(null);
  for (const [k, v] of map) {
    obj[k] = v;
  }
  return obj;
};

const wishData = jsonData.map((row) => {
  const words = row["H"] && cut(row["H"]);
  // console.log("words", words);
  countKeyWord(words);
}); // 期望
console.log("frequencyMap", frequencyMap);
fs.writeFileSync(
  `./data/result/wish-${Date.now()}.txt`,
  JSON.stringify(map2json(frequencyMap))
);

// 生成词云图像
// const canvas = createCanvas(800, 600);
// const ctx = canvas.getContext('2d');

// const wc = new WordCloud();
// wc.setSize(800, 600);
// wc.setCanvas(canvas);
// wc.setCtx(ctx);
// wc.setColor('random-light');
// wc.setText(words);
// wc.draw();

// const imageBuffer = wc.toBuffer(); // 生成词云图像的缓冲数据

// // 将词云保存为图像文件
// fs.writeFileSync('wordcloud.png', imageBuffer);
