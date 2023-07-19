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

    exec("npm start");
  });
} else {
  console.log("Node modules already installed, continuing...");
  exec("npm start");
}
