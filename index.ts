import express from "express";
import axios from "axios";

const app = express();
app.use(express.json());
const port = 3434;

app.post("/search", async (req, res) => {
  try {
    const response = await axios.post(
      "http://faiss_service:5454/search",
      req.body
    );
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error communicating with FAISS service");
  }
});

app.post("/add", async (req, res) => {
  try {
    const { id, vector } = req.body;
    const response = await axios.post("http://faiss_service:5454/add", {
      id,
      vector,
    });

    res.status(response.status).json(response.data);
  } catch (error: any) {
    console.error("Error in /add:", error.message);
    res
      .status(500)
      .json({ error: "An error occurred while adding the vector." });
  }
});

app.listen(port, () => {
  console.log(`TypeScript service listening at http://localhost:${port}`);
});
