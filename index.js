// setInterval(callback, timer) - выполняется до тех пор, пока не выключишь таймер, с промежутком timer
// setTimeout(callback, delay) - выполняется один раз после задержки (delay)

const gameArea = document.querySelector("#gameArea");

let score = 0;

const fruitImages = [
  "apple.png",
  "banana.png",
  "bomb.png",
  "grapes.png",
  "orange.png",
  "watermelon.png",
];

function randomIntegerFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
const getRandomPositionx = () => {
  const x = Math.random() * (gameArea.clientWidth - 80);
  const y = 0;
  return { x, y };
};

const getRandomPositiony = () => {
  const x = 0;
  const y = Math.random() * (gameArea.clientHeight - 80);
  return { x, y };
};

const createFruit = () => {
  const fruit = document.createElement("div");
  fruit.classList.add("fruit");

  const randomImage =
    fruitImages[Math.floor(Math.random() * fruitImages.length)];

  fruit.style.backgroundImage = `url(images/${randomImage})`;

  // console.log(getrandomnum())
  // console.log(Math.floor(0.3))
  // console.log(Math.ceil(0.3))
  let x = null
  let y = null

  if (randomIntegerFromInterval(1,2) === 1) {
    const randomPositionX = getRandomPositionx();
    x = randomPositionX.x
    y = randomPositionX.y
  } else {
    const randomPositionY = getRandomPositiony();
    x = randomPositionY.x
    y = randomPositionY.y
  }

  // деструктуризация объекта

  fruit.style.left = `${x}px`;
  fruit.style.top = `${y}px`;

  gameArea.append(fruit);
  let fallInterval = null
  if (y === 0) {
    fallInterval = setInterval(() => {
      const currentTop = parseInt(fruit.style.top);
      fruit.style.top = currentTop + 2 + "px";
      if (currentTop > gameArea.clientHeight) {
        clearInterval(fallInterval);
        fruit.remove();
      }
    }, 10);
  } else {
    fallInterval = setInterval(() => {
      const currentleft = parseInt(fruit.style.left);
      fruit.style.left = currentleft + 2 + "px";
      if (currentleft > gameArea.clientWidth) {
        clearInterval(fallInterval);
        fruit.remove();
      }
    }, 10);
  }

  fruit.addEventListener("mouseover", () => {
    // наведение мыши на фрукт
    if (fruit.style.backgroundImage.includes("bomb.png")) {
      gameOver();
    }

    clearInterval(fallInterval);
    fruit.style.transform = "scaleY(0)";
    fruit.style.opacity = "0";

    setTimeout(() => {
      const half1 = document.createElement("div");
      const half2 = document.createElement("div");

      half1.classList.add("fruit");
      half2.classList.add("fruit");

      half1.style.backgroundImage = `url(images/${randomImage})`;
      half2.style.backgroundImage = `url(images/${randomImage})`;

      half1.style.left = fruit.style.left;
      half2.style.left = fruit.style.left;

      half1.style.top = fruit.style.top;
      half2.style.top = fruit.style.top;

      half1.style.width = "40px";
      half2.style.width = "40px";

      half1.style.transform = "rotate(-200deg)";
      half2.style.transform = "rotate(200deg)";

      gameArea.append(half1, half2);

      setTimeout(() => {
        half1.remove();
        half2.remove();
      }, 1000);
    }, 200);

    score++;
    updateScore();

    if (score >= 10) {
      endGame();
    }
  });
};

function updateScore() {
  const s = document.querySelector("#score");
  s.textContent = `1Очки: ${score}`;
}

function gameOver() {
  alert("Бомба! Вы проиграли!");
  clearInterval(gameInterval);
}

function endGame() {
  alert("Вы набрали 10 очков! Поздравляем!");
  clearInterval(gameInterval);
}

const gameInterval = setInterval(createFruit, 2000);
