// index.js
import express from "express";
import { port } from "./config.ts";
import chatRoutes from "./routes/chats.routes.ts";
import cors from "cors";

const app = express();
app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Server is running!" });
});

app.use("/api/chat", chatRoutes);

app.listen(port, () => console.log("Running on http://localhost:5001"));
