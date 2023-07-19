const fs = require("fs");
const { exec } = require("child_process");

const nodeModulesDir = "./node_modules";

if (!fs.existsSync(nodeModulesDir)) {
  console.log("Node modules not found. Running npm install...");
  exec("npm install", (error, stdout, stderr) => {
    if (error) {
      console.error(`npm install error: ${error.message}`);
      return;
    }
    console.log("npm install completed successfully.");

    startProgram();
  });
} else {
  console.log("Node modules already installed, continuing...");
  startProgram();
}

function startProgram() {
  const command = "ffmpeg -version";

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error("FFmpeg not found. Please make sure it is installed and added to your system PATH.");
    } else {
      exec("npm start");
    }
  });
}
