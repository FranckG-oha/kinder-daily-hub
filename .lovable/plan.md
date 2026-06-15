
## Constat

Tu as raison : la barre de navigation actuelle est **hors-spec**. Elle expose `Dashboard / Calendar / Children / Library / Profile`, alors que la spec Teacher (§7.1) impose **5 onglets précis** avec un **FAB central** :

```
[Today]   [My Class]   [● Quick Log]   [Gallery]   [Messages]
```

→ Les écrans Quick Log (note/photo/incident) et Resources/Library que j'ai créés au tour précédent sont **inaccessibles** depuis la nav, et la palette ne suit pas exactement la charte (`#2D6BE4`, `#EEF3FD`, `#2CB67D`, `#F59E0B`, `#EF4444`, slate `#24324F`).

## Écrans manquants vs spec (Teacher, 45 écrans au total)

Déjà en place (à retravailler) : T-05 Today, T-11 Class List, T-12 Child Overview, T-18 Report History, T-28 Daily Report, T-24 Note, T-25 Incident, T-33 Photo Capture, T-09 Schedule (partiel), T-36 Inbox, T-37 Thread, T-39 Announcement, T-45 Profile.

À créer (≈ 30 écrans) : T-01 Login, T-02 PIN, T-03 Classroom Confirm, T-04 Tour, T-06 Roll Call, T-07 Attendance Summary, T-08 QR Scan, T-10 Alerts, T-13/14/15/16/17 sous-onglets profil enfant, T-19 Quick Log Hub, T-20 Meal, T-21 Nap, T-22 Temp, T-23 Medication, T-26 AI Suggester, T-27 Report Overview, T-29 Batch Report, T-30 Preview, T-31 Past Report, T-32 Gallery grid, T-34 Fullscreen Viewer, T-35 AI Blur Review, T-38 Broadcast Composer, T-40 Eval Periods, T-41 Eval Grid, T-42 Eval Heatmap, T-43 Bulletin, T-44 Weekly Schedule.

## Méthode de livraison

Pour éviter d'être coupé en plein milieu et te laisser sans rien d'affichable, je livre **par lots auto-portants** : à la fin de chaque lot, l'app **compile et est navigable**. Tu peux m'arrêter ou me relancer entre chaque lot.

### Lot 0 — Fondation (un seul tour, prérequis indispensable)
1. **Design tokens** alignés sur la charte v1.1 dans `src/styles.css` :
   - `--primary` = #2D6BE4, `--primary-light` = #EEF3FD, `--success` = #2CB67D, `--warning` = #F59E0B, `--destructive` = #EF4444, `--foreground` = #24324F, `--background` = #F9F9FF.
   - Radius cartes 24–32 px, boutons `rounded-full` 52 px, ombres `shadow-sm`.
2. **Iconographie** : bascule sur `lucide-react` (stroke 1.75) ; suppression de `Material Symbols`. Composant `Icon` réécrit en wrapper Lucide.
3. **Bottom nav** réécrite : 5 onglets `Today / My Class / Quick Log (FAB) / Gallery / Messages`, fond `bg-surface/80 backdrop-blur-xl`, bord supérieur hairline, onglet central surélevé +8 px en cercle plein.
4. Renommage / suppression des routes obsolètes : `/calendar` → fusionné dans Today, `/resources` → supprimé, `/profile` → déplacé dans `account`.
5. **Stubs de routes** pour les 5 onglets + redirections, pour qu'aucun lien existant ne casse.

### Lot 1 — Today complet (T-05, T-06, T-07, T-08, T-09, T-10)
Refonte de `/` selon §7.2 : header date + salle + ratio présents, attendance strip (avatars 44 px avec bordures colorées par statut, long-press → quick profile), Report Progress (barres animées), Today's Schedule read-only avec « NOW », bloc Alerts (médicaments, non-récupérés). Sous-écrans : Roll Call plein écran, Attendance Summary, QR Scan (caméra mock), Full Schedule, Alerts list.

### Lot 2 — My Class (T-11 → T-18)
Liste enfants avec status dots, fiche enfant avec sous-onglets `Overview / Personal / Medical / Emergency / Pickup / Attendance / Reports`. Heatmap calendrier 30 j pour l'historique.

### Lot 3 — Quick Log Hub (T-19 → T-26)
Hub 2×3 atteint depuis le FAB central. Écrans Meal batch, Nap batch, Temperature (auto-flag fièvre), Medication (avec confirmation d'autorisation), Note/Mood (réutilise VoiceRecorder), Incident, AI Suggester.

### Lot 4 — Daily Reports (T-27 → T-31)
Overview du jour, formulaire complet par enfant, batch editor, preview avant envoi, lecture rapports passés.

### Lot 5 — Gallery (T-32 → T-35)
Grille classe, capture + tag enfants + privacy + AI blur (mock), viewer plein écran swipeable, écran de revue du flou IA avant/après.

### Lot 6 — Messages (T-36 → T-39)
Inbox parents/éducateur/direction, fil conversation, broadcast composer, lecture annonce.

### Lot 7 — Evaluations + Account (T-40 → T-45)
Liste périodes, grille de saisie skills × enfants, heatmap de complétion, bulletin PDF mock, weekly schedule, profil.

### Lot 8 — Auth & Onboarding (T-01 → T-04)
Login, PIN setup, confirmation classe assignée, tour 3 slides. Mockés (pas de backend).

## Détails techniques

- 100 % mock (`src/lib/mock.ts` étendu : medications, temperatures, schedule, evaluations, gallery photos, broadcasts).
- Aucun backend / pas de Cloud.
- Stack inchangée : TanStack Start + Tailwind v4 tokens sémantiques + shadcn + framer-motion + Lucide.
- Routing file-based : un fichier `_tabs.<onglet>.<sous-écran>.tsx` par écran de la spec, IDs T-xx en commentaire.
- A11y : cibles ≥ 44 px, `aria-label` systématique, contraste ≥ 4.5:1.

## À confirmer avant que je lance le Lot 0

1. **Tu valides l'ordre des lots ci-dessus ?** (sinon dis-moi lequel prioriser)
2. **Onboarding/Login (Lot 8) maintenant ou à la fin ?** Par défaut je le mets à la fin pour livrer d'abord le cœur métier visible.
3. **Évaluations (Lot 7)** : utile pour CYCLE_0/1 ou on les saute pour gagner du temps ?
