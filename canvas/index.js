class Clock {
  // 初始化
  constructor(canvas) {
    this.ctx = canvas.getContext("2d");
  }
  // 绘制时钟
  drawClock() {
    const ctx = this.ctx;
    ctx.save();
    ctx.clearRect(0, 0, 600, 600);
    this.ctx.translate(300, 300); // 设置中心点，此时300，300变成了坐标的0，0
    // 画表盘
    ctx.beginPath();
    // 画圆线使用arc(中心点X,中心点Y,半径,起始角度,结束角度)
    ctx.arc(0, 0, 100, 0, 2 * Math.PI);
    ctx.stroke(); // 执行画线段的操作
    ctx.closePath();
    // 把状态保存起来
    ctx.save();

    // 绘制秒针刻度
    for (let i = 0; i < 60; i++) {
      ctx.rotate((6 * Math.PI) / 180);
      ctx.beginPath();
      ctx.moveTo(90, 0);
      ctx.lineTo(95, 0);
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.closePath();
    }
    ctx.restore();
    ctx.save();

    // 绘制时针刻度
    for (let i = 0; i < 12; i++) {
      ctx.rotate((30 * Math.PI) / 180);
      ctx.beginPath();
      ctx.moveTo(90, 0);
      ctx.lineTo(100, 0);
      ctx.lineWidth = 5;
      ctx.stroke();
      ctx.closePath();
    }
    ctx.restore();
    ctx.save();

    // // 画表上的数字
    for (let i = 0; i < 12; i++) {
      const numbers = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2];
      var rad = ((2 * Math.PI) / 12) * i;
      var x = Math.cos(rad) * 80;
      var y = Math.sin(rad) * 80;
      ctx.font = "15px Arial";
      ctx.textBaseline = "middle";
      ctx.textAlign = "center";
      ctx.fillText(numbers[i], x, y);
    }
    // 绘制时针
    var time = new Date();
    var h = time.getHours() % 12;
    var m = time.getMinutes();
    var s = time.getSeconds();
    ctx.rotate(((30 * h - 90) * Math.PI) / 180);
    ctx.beginPath();
    ctx.lineWidth = 8;
    ctx.moveTo(-10, 0);
    ctx.lineTo(40, 0);
    ctx.stroke();
    ctx.closePath();

    ctx.restore();
    ctx.save();

    // 绘制分针
    ctx.rotate(((6 * m - 90) * Math.PI) / 180);
    ctx.beginPath();
    ctx.lineWidth = 5;
    ctx.moveTo(-10, 0);
    ctx.lineTo(60, 0);
    ctx.stroke();
    ctx.closePath();

    ctx.restore();
    ctx.save();

    // 绘制秒针
    ctx.rotate(((6 * s - 90) * Math.PI) / 180);
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.moveTo(-10, 0);
    ctx.lineTo(80, 0);
    ctx.stroke();
    ctx.closePath();

    ctx.restore();
    ctx.restore();
  }
  run() {
    this.timer = setInterval(() => {
      this.drawClock();
    }, 1000);
  }

  stop() {
    clearInterval(this.timer);
  }
}

function drawLine(canvasObj, type) {
  if (type === "line") {
    canvasObj.clearRect(0, 0, 600, 600);
    canvasObj.beginPath();
    canvasObj.moveTo(100, 100);
    canvasObj.lineTo(200, 100);
    canvasObj.lineTo(200, 300);
    canvasObj.closePath();
    canvasObj.stroke();
  } else if (type === "rect") {
    canvasObj.clearRect(0, 0, 600, 600);
    canvasObj.fillRect(10, 10, 100, 50); // 绘制矩形，填充的默认颜色为黑色
    // canvasObj.strokeRect(10, 70, 100, 50);
  } else if (type === "arc") {
    canvasObj.clearRect(0, 0, 600, 600);
    canvasObj.beginPath();
    canvasObj.moveTo(50, 50);
    //参数1、2：控制点1坐标   参数3、4：控制点2坐标  参数4：圆弧半径
    canvasObj.arcTo(200, 50, 200, 200, 100);
    canvasObj.lineTo(200, 200);
    canvasObj.stroke();

    canvasObj.beginPath();
    canvasObj.rect(50, 50, 10, 10);
    canvasObj.rect(200, 50, 10, 10);
    canvasObj.rect(200, 200, 10, 10);
    canvasObj.fill();
  } else if (type === "bezi") {
    canvasObj.clearRect(0, 0, 600, 600);
    canvasObj.beginPath();
    canvasObj.moveTo(10, 200); //起始点
    var cp1x = 40,
      cp1y = 100; //控制点
    var x = 200,
      y = 200; // 结束点
    //绘制二次贝塞尔曲线
    canvasObj.quadraticCurveTo(cp1x, cp1y, x, y);
    canvasObj.stroke();

    canvasObj.beginPath();
    canvasObj.rect(10, 200, 10, 10);
    canvasObj.rect(cp1x, cp1y, 10, 10);
    canvasObj.rect(x, y, 10, 10);
    canvasObj.fill();
  } else if (type === "text") {
    canvasObj.clearRect(0, 0, 600, 600);
    canvasObj.font = "100px sans-serif";
    canvasObj.fillText("canvas", 10, 100);
    canvasObj.strokeText("canvas", 10, 200);
  } else if (type === "pic") {
    canvasObj.clearRect(0, 0, 600, 600);
    var img = new Image(); // 创建img元素
    img.onload = () => {
      canvasObj.drawImage(img, 0, 0);
    };
    img.src = "./logo.png";
  } else {
    canvasObj.clearRect(0, 0, 600, 600);
    var img1 = new Image(); // 创建img元素
    img1.onload = () => {
      canvasObj.drawImage(img1, 40, 0, 120, 120, 0, 0, 50, 50);
    };
    img1.src = "./logo.png";
  }
}
