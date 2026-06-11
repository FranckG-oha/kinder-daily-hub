import { createFileRoute } from "@tanstack/react-router";
import { ChevronRight, HelpCircle, Mail, MessageCircle } from "lucide-react";
import { SubPageHeader } from "@/components/app-header";
import { Page } from "@/components/page";

export const Route = createFileRoute("/_tabs/account/help")({
  head: () => ({
    meta: [
      { title: "Aide & support — Éducatrices" },
      { name: "description", content: "Obtenir de l'aide, contacter le support, consulter la FAQ." },
    ],
  }),
  component: HelpPage,
});

const items = [
  { Icon: HelpCircle, label: "Foire aux questions" },
  { Icon: MessageCircle, label: "Contacter le support" },
  { Icon: Mail, label: "Envoyer une suggestion" },
];

function HelpPage() {
  return (
    <>
      <SubPageHeader title="Aide & support" />
      <Page>
        <h1 className="sr-only">Aide et support</h1>
        <ul className="divide-y divide-border/60 overflow-hidden rounded-2xl border border-border/60 bg-card">
          {items.map(({ Icon, label }) => (
            <li key={label}>
              <button className="flex w-full items-center gap-3 px-4 py-3 text-left">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
                  <Icon className="h-4 w-4" />
                </div>
                <span className="flex-1 text-sm font-medium">{label}</span>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </button>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-center text-xs text-muted-foreground">
          Digital Sanctuary · version éducatrices 0.1
        </p>
      </Page>
    </>
  );
}