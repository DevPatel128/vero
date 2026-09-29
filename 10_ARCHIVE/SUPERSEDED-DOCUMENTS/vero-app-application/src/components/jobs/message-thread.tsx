"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { createClient } from "@/lib/supabase/client";

interface Message {
  id: string;
  author_id: string;
  body: string;
  created_at: string;
}

interface MessageThreadProps {
  bookingId: string;
  currentUserId: string;
}

export function MessageThread({ bookingId, currentUserId }: MessageThreadProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [draft, setDraft] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mounted = true;

    fetch(`/api/messages?bookingId=${bookingId}`)
      .then((r) => r.json())
      .then((j) => {
        if (mounted && j.messages) setMessages(j.messages);
      });

    const supabase = createClient();
    const channel = supabase
      .channel(`messages:${bookingId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `booking_id=eq.${bookingId}`,
        },
        (payload) => {
          setMessages((prev) => [...prev, payload.new as Message]);
        },
      )
      .subscribe();

    return () => {
      mounted = false;
      supabase.removeChannel(channel);
    };
  }, [bookingId]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function send(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!draft.trim()) return;
    setError(null);
    setIsSending(true);
    const res = await fetch("/api/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ bookingId, body: draft.trim() }),
    });
    const json = await res.json();
    if (!res.ok) {
      setError(json.error ?? "Could not send");
    } else {
      setDraft("");
    }
    setIsSending(false);
  }

  return (
    <div className="rounded-card border border-ink-3/20 bg-surface-1">
      <div className="max-h-80 overflow-y-auto p-4">
        {messages.length === 0 ? (
          <p className="text-center text-xs text-ink-3">
            No messages yet. Start the conversation.
          </p>
        ) : (
          <ul className="space-y-3">
            {messages.map((m) => {
              const mine = m.author_id === currentUserId;
              return (
                <li
                  key={m.id}
                  className={`flex ${mine ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-card px-3 py-2 text-sm ${
                      mine
                        ? "bg-accent/20 text-ink-0"
                        : "bg-surface-2 text-ink-1"
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{m.body}</p>
                    <p className="mt-1 font-mono text-[10px] text-ink-3">
                      {new Date(m.created_at).toLocaleTimeString("en-IN", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
        <div ref={endRef} />
      </div>

      <form onSubmit={send} className="border-t border-ink-3/20 p-3">
        <Textarea
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          maxLength={2000}
          placeholder="Type a message…"
          rows={2}
          disabled={isSending}
        />
        {error && (
          <p role="alert" className="mt-2 text-xs text-signal" aria-live="polite">
            {error}
          </p>
        )}
        <div className="mt-2 flex justify-end">
          <Button size="sm" type="submit" disabled={isSending || !draft.trim()}>
            {isSending ? "…" : "Send"}
          </Button>
        </div>
      </form>
    </div>
  );
}
