const XLSX = require("xlsx");
const { createCanvas, registerFont } = require("canvas");
const Chart = require("chart.js");

const workbook = XLSX.readFile("data.xlsx");
const worksheet = workbook.Sheets[workbook.SheetNames[0]];
const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

// 分析具体列名为Column A的数据
const columnData = jsonData.map((row) => row["Column A"]);

const frequencyMap = new Map();

columnData.forEach((value) => {
  if (frequencyMap.has(value)) {
    frequencyMap.set(value, frequencyMap.get(value) + 1);
  } else {
    frequencyMap.set(value, 1);
  }
});

registerFont("path/to/your/font.ttf", { family: "Font Family" }); // 注册自定义字体（如果需要）

const canvas = createCanvas(800, 600);
const ctx = canvas.getContext("2d");

const labels = Array.from(frequencyMap.keys());
const data = Array.from(frequencyMap.values());

new Chart(ctx, {
  type: "bar",
  data: {
    labels,
    datasets: [
      {
        label: "Frequency",
        data,
        backgroundColor: "rgba(54, 162, 235, 0.8)",
      },
    ],
  },
  options: {
    responsive: false,
    maintainAspectRatio: true,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
    },
  },
});

const image = canvas.toBuffer("image/png"); // 生成
