const fs = require('fs');
const XLSX = require('xlsx');
const nodejieba = require('nodejieba');
const { createCanvas, loadImage, registerFont} = require('canvas');
const { WordCloud } = require('canvas-constructor');

// 读取和解析Excel文件
const workbook = XLSX.readFile('data.xlsx');
const worksheet = workbook.Sheets[workbook.SheetNames[0]];
const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

// 提取文本数据并进行分词处理
const textData = jsonData.map((row) => row[0]).join(' '); // 假设数据在第一列
const words = nodejieba.cut(textData);

// 生成词云图像
const canvas = createCanvas(800, 600);
const ctx = canvas.getContext('2d');

const wc = new WordCloud();
wc.setSize(800, 600);
wc.setCanvas(canvas);
wc.setCtx(ctx);
wc.setColor('random-light');
wc.setText(words);
wc.draw();

const imageBuffer = wc.toBuffer(); // 生成词云图像的缓冲数据

// 将词云保存为图像文件
fs.writeFileSync('wordcloud.png', imageBuffer);



