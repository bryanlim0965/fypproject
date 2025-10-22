// upload.js (for your backend server)
import express from "express";
import { v2 as cloudinary } from "cloudinary";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Cloudinary config
cloudinary.config({
  cloud_name: "dqgvby5lb",
  api_key: "963946788365255",
  api_secret: "lm5jt30PLuBOvjATUll-hkH4IHw",
});

app.post("/upload", async (req, res) => {
  try {
    const fileStr = req.body.data;
    const uploadResponse = await cloudinary.uploader.upload(fileStr, {
      folder: "game_images",
    });
    res.json({ url: uploadResponse.secure_url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Upload failed" });
  }
});

app.listen(3000, () => console.log("Server started on port 3000"));
