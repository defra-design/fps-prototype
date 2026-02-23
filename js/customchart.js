const create = tag =>
  document.createElementNS("http://www.w3.org/2000/svg", tag);

let svg = document.getElementById("chart");
let chartData = {
   labels: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sept","Oct","Nov","Dec"],
   values: [35, 60, 21, 67, 20, 40, 35, 55, 80, 133, 10, 100],
//     labels: ["Jan","Feb","Mar","Apr"],
//   values: [35, 60, 21, 67],
 // yAxis : getNiceScale(rawMax, 5)
  yAxis: {
    min: 0,
    max: 100,
    step: 20
  }
};
function getNiceScale(values, ticks = 6) {

  // 🔒 normalize values into array
  if (!Array.isArray(values)) {
    if (values == null) {
      values = [0];
    } else if (typeof values === "number") {
      values = [values];
    } else {
      values = Array.from(values);
    }
  }

  values = values.map(Number).filter(v => !isNaN(v));

  if (!values.length) {
    return { min: 0, max: 10, step: 2 };
  }

  const minVal = Math.min(...values);
  const maxVal = Math.max(...values);

  if (minVal === maxVal) {
    return {
      min: minVal - 10,
      max: maxVal + 10,
      step: 10
    };
  }

  const range = maxVal - minVal;
  const roughStep = range / ticks;
  const power = Math.pow(10, Math.floor(Math.log10(roughStep)));
  const step = Math.ceil(roughStep / power) * power;

  return {
    min: Math.floor(minVal / step) * step,
    max: Math.ceil(maxVal / step) * step,
    step
  };
}




function updateChart() {
  const yMax = document.getElementById("yMax").value;
  const yValue = Number(document.getElementById("yValue").value);

 // for(let x in chartData){
    //if(x == 'labels'){
    let idx = chartData['labels'].findIndex((el)=>el == yMax);
    chartData['values'][idx] = yValue;
  //  }
    
 // }

//   chartData.yAxis.max = yMax;
//   chartData.yAxis.step = yStep;

 redrawChart(chartData);

 //return chartData;
}

function redrawChart(chartData) {
   svg.innerHTML = "";   // clear old drawing
  drawChart(chartData);
}

// function drawChart() {
//   // 👉 put your existing drawing logic here
//   console.log("Updated chartData:", chartData);
// }



function drawChart(chartData){



const svg = document.getElementById("chart");
const padding = 10;
const chartWidth = 100 - padding * 2;
//const chartHeight = 100 - padding * 2;


const values = chartData.values;
const rawMax = Math.max(...values);
const yAxis = getNiceScale(chartData.values);//getNiceScale(rawMax, 5);
console.log(yAxis,"LN70")
// Example output: { min: 0, max: 1000, step: 200 }

const paddingTop = 30;
const paddingBottom = 10;

const chartHeight = 100 - paddingTop - paddingBottom;


const scaleXE = i =>
  padding + (i * chartWidth) / (chartData.labels.length - 1);


const innerPadding = 5; // increase this (3–10)

const scaleX = i => {
  const usableWidth = chartWidth - innerPadding * 2;
  return padding + innerPadding +
         (i * usableWidth) / (chartData.labels.length - 1);
}; 

// const scaleY = val =>
//   100 - padding -
//   ((val - yAxis.min) / (yAxis.max - yAxis.min)) * chartHeight;

const scaleY = val =>
  100 - paddingBottom -
  ((val - yAxis.min) / (yAxis.max - yAxis.min)) * chartHeight;






const xLegend = create("text");
  xLegend.setAttribute("x", 50);              // center
  xLegend.setAttribute("y", 98);              // bottom
  xLegend.setAttribute("text-anchor", "middle");
  xLegend.setAttribute("class", "axis-legend");
  //xLegend.setAttribute("transform","rotate(1 5150 220)");
  xLegend.setAttribute("x", 60);      // center
  xLegend.setAttribute("y", 9);       // TOP
  xLegend.setAttribute("text-anchor", "middle"); 
  xLegend.textContent = "Months";
  svg.appendChild(xLegend);


  const yLegend = create("text");
  yLegend.setAttribute("x", 3);               // left side
  yLegend.setAttribute("y", 50);              // center vertically
  yLegend.setAttribute("text-anchor", "middle");
  yLegend.setAttribute(
    "transform",
    "rotate(-90 3 50)"                         // rotate around its position
  );
  yLegend.setAttribute("class", "axis-legend");
  yLegend.textContent = "Values";
  svg.appendChild(yLegend);
//   for (
//   let value = chartData.yAxis.min;
//   value <= chartData.yAxis.max;
//   value += chartData.yAxis.step
// ) {
//   const y = scaleY(value);
// // 1️⃣ helper


// // 2️⃣ get svg
// const svg = document.getElementById("chart");

// // 3️⃣ now draw grid, axes, lines
// //const line = create("line");

//   // Grid line
//   const line = create("line");
//   line.setAttribute("x1", padding);
//   line.setAttribute("x2", 100 - padding);
//   line.setAttribute("y1", y);
//   line.setAttribute("y2", y);
//   line.setAttribute("class", "grid");
//   svg.appendChild(line);

//   // Label
//   const text = create("text");
//   text.setAttribute("x", padding - 2);
//   text.setAttribute("y", y + 1);
//   text.setAttribute("text-anchor", "end");
//   text.setAttribute("class", "label");
//   text.textContent = value;
//   svg.appendChild(text);
// }


// for (let value = yAxis.min; value <= yAxis.max; value += yAxis.step) {
//   const y = scaleY(value);

//   const gridLine = create("line");
//   gridLine.setAttribute("x1", padding);
//   gridLine.setAttribute("x2", 100 - padding);
//   gridLine.setAttribute("y1", y);
//   gridLine.setAttribute("y2", y);
//   gridLine.setAttribute("class", "grid");
//   svg.appendChild(gridLine);

//   const label = create("text");
//   label.setAttribute("x", padding - 2);
//   label.setAttribute("y", y + 1);
//   label.setAttribute("text-anchor", "end");
//   label.setAttribute("class", "label");
//   label.textContent = value;
//   svg.appendChild(label);
// }


for (let value = yAxis.min; value <= yAxis.max; value += yAxis.step) {
  const y = scaleY(value);

  const line = create("line");
  line.setAttribute("x1", padding);
  line.setAttribute("x2", 100 - padding);
  line.setAttribute("y1", y);
  line.setAttribute("y2", y);

  if (value === 0) {
    line.setAttribute("class", "x-axis-zero");
  } else {
    line.setAttribute("class", "grid");
  }

  svg.appendChild(line);

  const label = create("text");
  label.setAttribute("x", padding - 2);
  label.setAttribute("y", y + 1);
  label.setAttribute("text-anchor", "end");
  label.setAttribute("class", "label");
  label.textContent = value;
  svg.appendChild(label);

  if (yAxis.min < 0 && yAxis.max > 0) {
  const y0 = scaleY(0);

  const zeroLine = create("line");
  zeroLine.setAttribute("x1", padding);
  zeroLine.setAttribute("x2", 100 - padding);
  zeroLine.setAttribute("y1", y0);
  zeroLine.setAttribute("y2", y0);
  zeroLine.setAttribute("class", "x-axis-zero");

  svg.appendChild(zeroLine); 
}
}




const xAxisline = create("line");
xAxisline.setAttribute("x1", padding);
xAxisline.setAttribute("y1", 100 - padding);
xAxisline.setAttribute("x2", 100 - padding);
xAxisline.setAttribute("y2", 100 - padding);
xAxisline.setAttribute("class", "axis");
svg.appendChild(xAxisline);

// 🔹 Y-axis (LEFT – thick)
const yAxisline = create("line");
yAxisline.setAttribute("x1", padding);
yAxisline.setAttribute("y1", padding);
yAxisline.setAttribute("x2", padding);
yAxisline.setAttribute("y2", 100 - padding);
yAxisline.setAttribute("class", "axis");
svg.appendChild(yAxisline);

chartData.labels.forEach((label, i) => {
  const text = create("text");
  text.setAttribute("x", scaleX(i));
  text.setAttribute("y", 100 - padding + 4);
  text.setAttribute("text-anchor", "middle");
  text.setAttribute("class", "label");
  text.textContent = label;
  svg.appendChild(text);
    const x = scaleX(i);

  const vLine = create("line");
  vLine.setAttribute("x1", x);
  vLine.setAttribute("y1", padding);
  vLine.setAttribute("x2", x);
  vLine.setAttribute("y2", 100 - padding);
  vLine.setAttribute("class", "v-grid");

  svg.appendChild(vLine);
});

// 🔹 Vertical grid lines
// chartData.labels.forEach((_, i) => {
//   const x = scaleX(i);

//   const vLine = create("line");
//   vLine.setAttribute("x1", x);
//   vLine.setAttribute("y1", padding);
//   vLine.setAttribute("x2", x);
//   vLine.setAttribute("y2", 100 - padding);
//   vLine.setAttribute("class", "v-grid");

//   svg.appendChild(vLine);
// });


 let path = `M ${scaleX(0)} ${scaleY(chartData.values[0])}`;

chartData.values.forEach((val, i) => {
  if (i === 0) return;
  path += ` L ${scaleX(i)} ${scaleY(val)}`;
});

const line = create("path");
line.setAttribute("d", path);
line.setAttribute("id", "line");
svg.appendChild(line);


// const line = create("path");
// line.setAttribute("d", path);
// line.setAttribute("id", "line");
// svg.appendChild(line);

/// 🔹 Points
chartData.values.forEach((val, i) => {
  const circle = create("circle");
  circle.setAttribute("cx", scaleX(i));
  circle.setAttribute("cy", scaleY(val));
  circle.setAttribute("r", 0.8);
  circle.setAttribute("class", "point");
  svg.appendChild(circle);
});

}


drawChart(chartData);