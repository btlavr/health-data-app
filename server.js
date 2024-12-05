const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const { OpenAIApi, Configuration } = require("openai"); // שימי לב לשינוי כאן

const app = express();
app.use(cors());
app.use(bodyParser.json());

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

app.post("/healthdata", async (req, res) => {
  try {
    const healthData = req.body;

    const response = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [
        {
          role: "user",
          content: `Here are my health data: ${JSON.stringify(healthData)}`,
        },
      ],
    });

    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error processing request");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));