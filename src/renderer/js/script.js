const { gifConverter } = require("./js/converter.js");

const form = document.querySelector("#img-form");
const img = document.querySelector("#img");
const imageBox = document.querySelector("#image-box");
const inputPath = document.querySelector("#input-path");
const outputPath = document.querySelector("#output-path");
const progress = document.querySelector("#progress");
const progressContainer = document.querySelector("#progress-container");

const acceptedImageTypes = ["image/jpeg", "image/png", "video/mp4"];

function loadMenu(e) {
  const file = e.target.files[0];

  if (!isFileValid(file)) {
    alert(`Supported media files:\n${acceptedImageTypes.join(", ")}`);
    return;
  }

  form.style.display = "block";

  let fileName = file.name.split(".");
  let filePath = file.path.replace(file.name, "");

  inputPath.innerHTML = file.path;
  outputPath.innerHTML = `${filePath}${fileName[0]}.gif`;
}

function isFileValid(file) {
  return file && acceptedImageTypes.includes(file["type"]);
}

async function convert(e) {
  e.preventDefault();

  const output = outputPath.innerHTML;
  const input = inputPath.innerHTML;

  progressContainer.style.display = "block";
  form.style.display = "none";
  imageBox.style.display = "none";

  await gifConverter(input, output, handleProgress);
  progress.textContent = `Successfully converted file to gif. File saved to ${output}`;
}

function handleProgress(percent) {
  progress.innerHTML = `Progress: ${percent.toFixed(2)}%`;
}

img.addEventListener("change", loadMenu);
form.addEventListener("submit", convert);
