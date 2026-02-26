// ============================================
// CHAT ROUTES
// Defines the API endpoints for the chat feature.
//
// INTERVIEW CONCEPT: Express Router
// Router is a mini Express app that handles a
// group of related routes.
// We attach it to the main app with a prefix:
// app.use("/api/chat", chatRoutes)
// So these routes become:
// POST /api/chat     ← send a message
// GET  /api/health   ← check if server is up
//
// INTERVIEW CONCEPT: HTTP Methods
// GET    = Read data (no body)
// POST   = Create/send data (has body)
// PUT    = Replace data (has body)
// PATCH  = Update part of data (has body)
// DELETE = Remove data
// ============================================

import express, { Router } from "express";
import { createError, errorHandler } from "../middleware/errorHandler.ts";
import { rateLimiter } from "../middleware/rateLimiter.ts";

const router = Router();

// POST /api/chat
// Middleware chain: aiChatLimiter → validateChatRequest → chatController
// Each runs in order - if one fails, the rest don't run
router.post(
  "/",
  errorHandler,
  rateLimiter,
  (req: express.Request, res: express.Response) => {
    const { message } = req.body;
    console.log(message);

    // res.json({ message });
    try {
      return res.send({ msg: `This is the message you sent ${message}` });
    } catch (err) {
      throw createError(300, "The error message");
    }
  },
  // aiChatLimiter, // 1. Check rate limit first
  // validateChatRequest, // 2. Validate the request body
  // chatController, // 3. Process with AI and respond
);

// GET /api/health
// Simple health check - no auth or validation needed
// router.get("/health", healthController);

export default router;
