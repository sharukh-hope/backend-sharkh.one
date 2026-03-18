// ============================================
// VALIDATE REQUEST MIDDLEWARE
// Validates incoming request body before
// passing to the controller.
//
// INTERVIEW CONCEPT: Input Validation
// Never trust user input! Always validate
// before processing. This prevents:
// - Empty/null inputs crashing your code
// - Oversized inputs causing memory issues
// - Malformed data reaching your AI API
// ============================================
import { Request, Response, NextFunction } from "express";
import { ChatRequest } from "./types/ChatRequest";

export const validateChatRequest = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const { message, history }: ChatRequest = req.body;

  // Check message exists
  if (!message) {
    res.status(400).json({ error: "Message is required" });
    return;
  }

  // Check message is a string
  if (typeof message !== "string") {
    res.status(400).json({ error: "Message must be a string" });
    return;
  }

  // Check message isn't empty
  if (message.trim().length === 0) {
    res.status(400).json({ error: "Message cannot be empty" });
    return;
  }

  // Prevent massive inputs (protects against abuse + keeps AI costs low)
  if (message.length > 500) {
    res.status(400).json({
      error: "Message too long. Please keep it under 500 characters.",
    });
    return;
  }

  // Validate history array if provided
  if (history) {
    if (!Array.isArray(history)) {
      res.status(400).json({ error: "History must be an array" });
      return;
    }

    // Limit history to prevent token overflow
    if (history.length > 20) {
      res.status(400).json({ error: "Too many messages in history. Max 20." });
      return;
    }
  }

  // All good - pass to next middleware/controller
  next();
};
