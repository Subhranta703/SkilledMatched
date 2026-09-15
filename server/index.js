import dotenv from "dotenv";

dotenv.config();

const { default: app } = await import("./app.js");
const { default: connectDB } = await import("./db.js");

const PORT = process.env.PORT || 5000;

try {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(
      `Gemini API key loaded: ${Boolean(process.env.GEMINI_API_KEY)}`
    );
  });
} catch (error) {
  console.error("Server startup failed:", error.message);
  process.exit(1);
}