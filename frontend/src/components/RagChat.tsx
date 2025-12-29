import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Loader2 } from "lucide-react";

interface Message {
  id: number;
  role: "user" | "assistant";
  text: string;
}

export default function RagChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: "assistant",
      text: "Hi, I’m your Maternal Health assistant. Ask any question about antenatal care, danger signs, or follow‑up.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages, loading]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || loading) return;

    const userMsg: Message = {
      id: Date.now(),
      role: "user",
      text: trimmed,
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("https://maternalai-backend.onrender.com/rag/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: trimmed }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.detail || "Server error");
      }

      const data = await res.json();
      // assume RAG returns { answer: "...", source_docs: [...] } or similar
      const answerText =
        data.answer ||
        data.result ||
        JSON.stringify(data); // fallback if shape is different

      const botMsg: Message = {
        id: Date.now() + 1,
        role: "assistant",
        text: answerText,
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err: any) {
      const botMsg: Message = {
        id: Date.now() + 1,
        role: "assistant",
        text:
          "Sorry, I couldn’t reach the server. Please check that the FastAPI backend on port 8000 is running.",
      };
      setMessages((prev) => [...prev, botMsg]);
      console.error("RAG error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 flex flex-col h-[520px]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#2BB4A0]/10 flex items-center justify-center">
            <Bot className="w-6 h-6 text-[#2BB4A0]" />
          </div>
          <div>
            <h2 className="text-gray-900 text-base">MaternaCare AI Assistant</h2>
            <p className="text-xs text-gray-500">
              Ask pregnancy‑related questions. Responses are decision support, not medical diagnosis.
            </p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-slate-50">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`flex items-start gap-2 max-w-[80%] ${
                  m.role === "user" ? "flex-row-reverse" : "flex-row"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    m.role === "user" ? "bg-[#2BB4A0] text-white" : "bg-white text-[#2BB4A0]"
                  } shadow-sm`}
                >
                  {m.role === "user" ? (
                    <User className="w-4 h-4" />
                  ) : (
                    <Bot className="w-4 h-4" />
                  )}
                </div>
                <div
                  className={`rounded-2xl px-3 py-2 text-sm shadow-sm ${
                    m.role === "user"
                      ? "bg-[#2BB4A0] text-white"
                      : "bg-white text-gray-800"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="flex items-center gap-2 text-xs text-gray-500 px-3 py-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                Thinking…
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <form onSubmit={handleSend} className="px-4 py-3 border-t border-gray-100">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about antenatal care, danger signs, diet..."
              className="flex-1 px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2BB4A0]"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="inline-flex items-center justify-center px-4 py-2.5 rounded-lg bg-[#2BB4A0] text-white text-sm hover:bg-[#259988] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <span>Send</span>
                  <Send className="w-4 h-4 ml-1" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Disclaimer */}
      <p className="mt-3 text-xs text-center text-amber-800 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
        This assistant uses a knowledge base from your clinical guidelines JSON files.
        Always confirm recommendations with a qualified medical professional.
      </p>
    </div>
  );
}
