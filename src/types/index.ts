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

export interface ContactResponse {
  success: boolean;
  message?: string;
  error?: string;
}

export interface Product {
  title: string;
  description: string;
  details?: string[];
  icon: string;
  tags: string[];
  span?: "wide" | "tall" | "default";
}

export interface Industry {
  name: string;
  icon: string;
  description: string;
}

export interface TimelineStep {
  week: string;
  title: string;
  items: string[];
  deliverable: string;
}
