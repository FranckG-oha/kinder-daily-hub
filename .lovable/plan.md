## Cadre

- App mobile-first, `max-w-[440px]` centrée, header sticky, bottom nav fixe à 5 onglets.
- Stack imposée : TanStack Start v1 + React 19 + Vite 7, Tailwind v4 (tokens sémantiques uniquement), shadcn/ui, lucide-react, framer-motion.
- 100% mock (`src/lib/mock.ts`), aucun backend / pas de Cloud.
- Une seule classe par éducatrice (pas de switcher). Publication directe des rapports (`draft → submitted`, pas d'étape `validated`).
- Variante visuelle « pro » distincte de l'app Parents : même grammaire de cartes / rythmes typographiques, mais palette accent sobre (vert sauge profond + neutres chauds) pour signaler le contexte professionnel.

## Design system (variante pro)

Tokens à définir dans `src/styles.css` (oklch, sémantiques) :
- `--background` neutre crème chaud, `--foreground` graphite.
- `--primary` vert sauge profond (accent pro), `--primary-foreground` crème.
- `--secondary` / `--muted` : neutres sable.
- `--accent` ambre doux pour CTA secondaires.
- Statuts métier : `--status-present`, `--status-absent`, `--status-late`, `--status-left`, `--status-incident`, `--status-draft`, `--status-submitted`.
- Typo : display serif humaniste pour titres (chargée via `<link>` dans `__root.tsx`), sans-serif géométrique pour body — couple distinct de l'app Parents.
- Radius `--radius: 1rem` (cartes plus douces). Ombres définies en token (`--shadow-card`).
- Animations framer-motion : entrée 0.25s ease-out, `whileTap={{ scale: 0.95 }}` sur les contrôles tactiles.

## Architecture routing

Layout pathless `_tabs.tsx` qui rend header + `<Outlet />` + bottom nav. Routes feuilles :

```text
src/routes/
  __root.tsx
  _tabs.tsx                            ← shell mobile (header + bottom nav)
  _tabs.index.tsx                      → /            Today
  _tabs.children.index.tsx             → /children
  _tabs.children.$id.index.tsx         → /children/:id      fiche enfant
  _tabs.children.$id.report.tsx        → /children/:id/report   édition rapport
  _tabs.children.$id.history.tsx       → /children/:id/history  historique
  _tabs.reports.index.tsx              → /reports     vue d'ensemble du jour
  _tabs.reports.week.tsx               → /reports/week
  _tabs.messages.index.tsx             → /messages
  _tabs.messages.$threadId.tsx         → /messages/:threadId
  _tabs.messages.announcements.tsx     → /messages/announcements
  _tabs.account.index.tsx              → /account
  _tabs.account.profile.tsx            → /account/profile
  _tabs.account.preferences.tsx        → /account/preferences
  _tabs.account.help.tsx               → /account/help
  sitemap[.]xml.ts + public/robots.txt
```

Bottom nav : **Today · Children · Reports · Messages · Account**. (Calendrier et Annonces accessibles depuis Today / Messages, pas en onglet bas pour rester à 5.)

## Mock data

Coller `src/lib/mock.ts` fourni (types `Mood`, `AttendanceStatus`, `Cycle`, `VoiceNote`, `MealEntry`, `NapEntry`, `DiaperEntry`, `Incident`, `DailyReport`, `Child`, `Classroom`, `Educator`, `Thread`, `Announcement` + `me`, `classrooms`, `children`, `reportsToday`, `threads`, `announcements`). Étendre avec :
- 6–8 enfants au lieu de 2 (pour des écrans crédibles).
- `todos: Todo[]` du jour (ex. « Préparer goûter », « Appeler Mme Bernard »).
- `events: ClassEvent[]` (sortie parc, anniversaire).
- Helpers : `getChild(id)`, `getReport(childId, date)`, `getThread(id)`.

## Composants partagés `src/components/`

- `AppHeader` (titre + avatar éducatrice + nom classe).
- `SubPageHeader` (back + titre).
- `BottomNav` (5 items + actif animé).
- `ChildCard`, `ChildAvatar`, `MoodPill`, `AttendanceBadge`, `StatusDot`.
- `MoodPicker`, `MealLogger`, `NapLogger`, `DiaperLogger`, `IncidentSheet`.
- `VoiceRecorder` (Web Speech API, garde-fou `typeof window !== 'undefined'`, langues FR/EN/ES/AR).
- `ThreadRow`, `AnnouncementCard`, `TodoCard`, `AlertFeed`, `RollCallStrip`.

## Écrans (contenu attendu)

1. **Today (`/`)** — salutation éducatrice, `RollCallStrip` (présents/absents/retard), `TodoCard` du jour, `AlertFeed` (allergies, incidents en cours), rappel rapports à rédiger (`X/Y enfants rapportés`).
2. **Children (`/children`)** — liste cartes enfants avec `AttendanceToggle` rapide (présent/absent/retard/parti) et accès fiche.
3. **Fiche enfant (`/children/:id`)** — `ChildHero`, `AllergyChips`, `GuardianRow`, notes pédagogiques, CTA « Rapport du jour » + « Historique ».
4. **Édition rapport (`/children/:id/report`)** — sections accordéon : humeur, repas, sieste, change, activités, incidents, highlight 1 phrase, photos (mock), note vocale via `VoiceRecorder`. Bouton « Soumettre » → statut `submitted`.
5. **Historique rapports (`/children/:id/history`)** — timeline verticale par date avec mood + highlight.
6. **Reports (`/reports`)** — board par statut (`draft` / `submitted`) pour tous les enfants du jour, filtre rapide.
7. **Reports semaine (`/reports/week`)** — bande des 7 derniers jours, taux de complétion.
8. **Messages (`/messages`)** — fil par enfant + chips de filtre + lien annonces direction.
9. **Conversation (`/messages/:threadId`)** — bulles parent/éducatrice, input texte, bouton joindre photo (mock).
10. **Annonces (`/messages/announcements`)** — liste `AnnouncementCard`, pinned en haut.
11. **Account (`/account`)** — carte classe, raccourcis Profil / Préférences / Aide, déconnexion.
12. **Profil (`/account/profile`)**, **Préférences (`/account/preferences`)** (langue, notifications), **Aide (`/account/help`)**.

## SEO & a11y

- `head()` par route : title < 60c, description < 160c, og:title/og:description, un seul `<h1>` par écran.
- `aria-label` sur toutes les icônes cliquables. Cibles tactiles ≥ 44px.
- `sitemap.xml` + `robots.txt` ajoutés en fin de scaffolding.

## Ordre d'exécution

1. Tokens + typo + `__root.tsx` (link fonts).
2. `_tabs.tsx` shell + `BottomNav` + `AppHeader`.
3. `src/lib/mock.ts` étendu.
4. Écran Today.
5. Children list + fiche enfant + historique.
6. Rapport (édition + voice).
7. Reports (jour + semaine).
8. Messages (liste + conversation + annonces).
9. Account + sous-pages.
10. `sitemap.xml` + `robots.txt`.

## Hors scope (à confirmer plus tard)

- Auth réelle (`/auth`) — splash décoratif pour l'instant.
- Calendrier classe dédié (`/calendar`) — repoussé, événements visibles dans Today.
- Validation direction des rapports — retiré (publication directe).
- Backend / Cloud / Supabase — non.

Confirme et je lance l'étape 1.