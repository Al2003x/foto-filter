const filters = document.querySelector(".filters");
const inputs = document.querySelectorAll('input[type="range"]');
const resetBtn = document.querySelector(".btn-reset");
const loadBtn = document.querySelector(".btn-load");
const saveBtn = document.querySelector(".btn-save");
const nextBtn = document.querySelector(".btn-next");
const fileInput = document.getElementById("btnInput");
const image = document.querySelector("img");
const inputBtn = document.querySelector(".btn-load--input");
const openFullScreen = document.querySelector(".openfullscreen");
const base =
  "https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/";
const imgList = [
  "01.jpg",
  "02.jpg",
  "03.jpg",
  "05.jpg",
  "06.jpg",
  "07.jpg",
  "08.jpg",
  "09.jpg",
  "10.jpg",
  "11.jpg",
  "12.jpg",
  "13.jpg",
  "14.jpg",
  "15.jpg",
  "16.jpg",
  "17.jpg",
  "18.jpg",
  "19.jpg",
  "20.jpg",
];
let i = 0;

function sizingUpdate(el) {
  const suffix = el.dataset.sizing || "";
  document.documentElement.style.setProperty(`--${el.name}`, el.value + suffix);
  el.nextElementSibling.value = el.value;
}

filters.addEventListener("input", (e) => {
  if (e.target.matches("input[type=range]")) {
    sizingUpdate(e.target);
  }
});

function drawImage() {
  const canvas = document.createElement("canvas");
  const img = new Image();
  img.setAttribute("crossOrigin", "anonymous");
  img.src = image.src;
  img.onload = function () {
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext("2d");
    ctx.filter = `blur(${document.documentElement.style.getPropertyValue(
      "--blur"
    )})
      invert(${document.documentElement.style.getPropertyValue("--invert")})
      sepia(${document.documentElement.style.getPropertyValue("--sepia")})
      saturate(${document.documentElement.style.getPropertyValue("--saturate")})
      hue-rotate(${document.documentElement.style.getPropertyValue("--hue")})`;
    ctx.drawImage(img, 0, 0);
    const a = document.createElement("a");
    a.href = canvas.toDataURL();
    a.download = "image/png";
    a.click();
    canvas.delete;
  };
}

function time() {
  const data = new Date();
  const hours = data.getHours();
  if (hours >= 6 && hours <= 12) return "morning";
  else if (hours > 12 && hours <= 18) return "day";
  else if (hours > 18 && hours <= 23) return "evening";
  else return "night";
}

  function viewImage(src) {
    image.src = src;
    image.onload = () => {
      image.src = src;
    };
  }

function getImage() {
  const imageSrc = `${base}${time()}/${imgList[i]}`;
  viewImage(imageSrc);
  i++;
    if (i === imgList.length) {
      i = 0;
    }
    inputBtn.value = null;
}

function load() {
  const file = inputBtn.files[0];
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function() {
    viewImage(reader.result);
  };
}

function btnReset() {
  inputs.forEach((input) => {
    input.value = input.name === "saturate" ? "100" : "0";
    sizingUpdate(input);
  });
}

function toggleFullScreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
}

openFullScreen.addEventListener("click", toggleFullScreen);
saveBtn.addEventListener("click", drawImage);
inputBtn.addEventListener("change", load);
resetBtn.addEventListener("click", btnReset);
nextBtn.addEventListener("click", getImage);
