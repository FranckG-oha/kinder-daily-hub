import { createFileRoute, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { Image as ImageIcon, Send } from "lucide-react";
import { SubPageHeader } from "@/components/app-header";
import { getChild, getThread, messagesByThread, type Message } from "@/lib/mock";

export const Route = createFileRoute("/_tabs/messages/$threadId")({
  loader: ({ params }) => {
    const thread = getThread(params.threadId);
    if (!thread) throw notFound();
    return { thread };
  },
  head: ({ params }) => ({
    meta: [
      { title: `Conversation — ${params.threadId}` },
      { name: "description", content: "Conversation avec un parent." },
    ],
  }),
  component: ConversationPage,
});

function ConversationPage() {
  const { thread } = Route.useLoaderData();
  const child = getChild(thread.childId);
  const initial: Message[] = messagesByThread[thread.id] ?? [];
  const [messages, setMessages] = useState<Message[]>(initial);
  const [text, setText] = useState("");

  function send(e: React.FormEvent) {
    e.preventDefault();
    if (!text.trim()) return;
    setMessages((m) => [
      ...m,
      {
        id: crypto.randomUUID(),
        threadId: thread.id,
        from: "educator",
        text: text.trim(),
        at: new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" }),
      },
    ]);
    setText("");
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SubPageHeader title={`${thread.parentName} · ${child?.firstName ?? ""}`} />
      <main className="mx-auto flex w-full max-w-[440px] flex-1 flex-col px-5 py-4">
        <h1 className="sr-only">Conversation avec {thread.parentName}</h1>
        <ul className="flex-1 space-y-2">
          {messages.map((m) => (
            <li
              key={m.id}
              className={
                "flex " + (m.from === "educator" ? "justify-end" : "justify-start")
              }
            >
              <div
                className={
                  "max-w-[80%] rounded-2xl px-4 py-2 text-sm " +
                  (m.from === "educator"
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-foreground")
                }
              >
                <p>{m.text}</p>
                <p
                  className={
                    "mt-1 text-[10px] " +
                    (m.from === "educator" ? "text-primary-foreground/70" : "text-muted-foreground")
                  }
                >
                  {m.at}
                </p>
              </div>
            </li>
          ))}
        </ul>

        <form onSubmit={send} className="sticky bottom-2 mt-4 flex items-center gap-2 rounded-full border border-border bg-card p-1.5 shadow-card">
          <button
            type="button"
            aria-label="Joindre une photo"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-secondary-foreground"
          >
            <ImageIcon className="h-4 w-4" />
          </button>
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Écrire un message…"
            className="flex-1 bg-transparent px-2 text-sm outline-none"
          />
          <motion.button
            whileTap={{ scale: 0.92 }}
            type="submit"
            aria-label="Envoyer"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground"
          >
            <Send className="h-4 w-4" />
          </motion.button>
        </form>
      </main>
    </div>
  );
}