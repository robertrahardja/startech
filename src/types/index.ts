export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: number;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export interface Product {
  title: string;
  description: string;
  details?: string[];
  icon: string;
  tags: string[];
  span?: "wide" | "tall" | "default";
}

export interface DemoLead {
  email: string;
  name?: string;
  /** Raw Google ID token (JWT). The server re-verifies it; nothing here is trusted as-is. */
  idToken: string;
}

export interface DemoResponse {
  success: boolean;
  result?: Record<string, unknown>;
  error?: string;
}

