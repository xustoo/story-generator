const { spawn } = require("child_process");

const generateStory = async (keywords) => {
  return new Promise((resolve, reject) => {
    // Spawn a new Python process
    const pythonProcess = spawn("python", ["./backend/model/story_model.py"]);

    // Prepare input data
    const input = JSON.stringify({ keywords });

    let output = "";
    let error = "";

    // Handle Python script stdout
    pythonProcess.stdout.on("data", (data) => {
      output += data.toString();
    });

    // Handle Python script stderr
    pythonProcess.stderr.on("data", (data) => {
      error += data.toString();
    });

    // Handle process close
    pythonProcess.on("close", (code) => {
      if (code === 0) {
        try {
          const parsedOutput = JSON.parse(output);
          resolve(parsedOutput.story); // Resolves the generated story
        } catch (err) {
          reject(`Error parsing Python output: ${err}`);
        }
      } else {
        reject(`Python script error: ${error}`);
      }
    });

    // Send input data to Python script
    pythonProcess.stdin.write(input);
    pythonProcess.stdin.end();
  });
};

module.exports = { generateStory };
