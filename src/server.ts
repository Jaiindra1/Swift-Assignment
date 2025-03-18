import express from "express";
import { connectDB } from "./db";
import routes from "./routes";

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Routes
app.use("/", routes);

// Start the server
app.listen(PORT, async () => {
  await connectDB();
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
