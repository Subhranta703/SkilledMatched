import { parseResume } from "./utils/resumeParser.js";

const filePath =
  "D:/skillmatched/server/uploads/1769528628150-648148787.pdf";

try {
  const text = await parseResume(filePath);

  console.log("Resume parsed successfully!");
  console.log(text);
} catch (error) {
  console.error("Parser test failed:", error.message);
}