const { exec } = require("child_process");

function executeCommand(command) {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(error);
      } else {
        resolve({ stdout, stderr });
      }
    });
  });
}

async function gifConverter(inputPath, outputPath) {
  try {
    const command = `ffmpeg -i "${inputPath}" -vf "fps=10,split[s0][s1];[s0]palettegen[p];[s1][p]paletteuse" -loop 0 "${outputPath}"`;
    await executeCommand(command);
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
}

module.exports = { gifConverter };
