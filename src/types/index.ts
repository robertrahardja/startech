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
  company?: string;
}

export interface DemoResponse {
  success: boolean;
  result?: Record<string, unknown>;
  error?: string;
}

