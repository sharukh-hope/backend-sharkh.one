// ============================================
// TYPES
// All TypeScript types/interfaces in one place
// ============================================

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export interface ChatRequest {
  message: string;
  history?: ChatMessage[]; // Previous messages for context
}

export interface ChatResponse {
  response: string;
  error?: string;
}

export interface ApiError {
  message: string;
  status: number;
}
