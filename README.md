# RExchange 🎓
> **The Campus Community Resource, Service, Opportunity & Study-Material Exchange Platform**

RExchange is a high-performance, aesthetically rich web application engineered for college students to trade physical items, share verified study notes, offer peer tutoring services, and discover campus opportunities.

Built with Next.js 14 App Router, TypeScript, Tailwind CSS, Supabase (with `pgvector`), and local open-source Ollama AI (with zero-crash offline heuristic fallback).

---

## 🌟 Key Features

1. **4 Tailored Listing Types**:
   - 📚 **Physical Items**: Textbooks, dorm furniture, electronics, lab supplies with condition ratings and campus pickup spots.
   - 🧑‍🏫 **Peer Services**: Tutoring (Python, Calculus, Organic Chem), dorm moving help, resume reviews with hourly rates.
   - 📝 **Study Notes**: Verified exam cheat sheets, flashcards, lecture summaries with subject codes and professors.
   - 🚀 **Campus Opportunities**: Undergraduate research assistant positions, hackathon teammates, club project recruitment.

2. **Magic AI Listing Assistant**:
   - Turn unstructured rough notes (e.g., *"first year calculus 9th edition stewart sell for 35 bucks good condition"*) into fully structured listings with auto-categorization, clean titles, and tags in 1 click.
   - Integrates with local Ollama (`llama3.2:3b`) with an automated, rule-based NLP fallback engine for 100% reliability on Vercel or offline environments.

3. **Smart Matches Radar (pgvector)**:
   - Pairs student requests with available peer offers in real time (e.g. *"Seeking Stewart Calculus"* automatically surfaces *"Calculus: Early Transcendentals 9th Ed"*).
   - Generates match affinity scores (e.g. 96% Match) and semantic reasoning.

4. **Claims & Reservation Lifecycle**:
   - `Available` ➔ `Reserved` ➔ `Completed` transactional flow.
   - Prevents double-reservation and triggers celebratory confetti animations upon reservation.

5. **Real-Time Campus Chat**:
   - Dedicated conversation threads per listing with instant message simulation, quick response chips, and safety guidelines.

6. **Student Trust Profiles & Peer Reviews**:
   - Verified student badges, major, graduation year, sustainability impact metrics, and 5-star rating breakdowns.

7. **1-Click Demo Persona Switcher**:
   - Instantly switch between test student profiles (Alex Chen, Sarah Jenkins, Marcus Brody, Maya Patel, David Kim) to evaluate buyer/seller/tutor workflows seamlessly.

---

## 🚀 Quick Start (Local Development)

### 1. Prerequisites
- Node.js 18.x or 20.x+
- npm

### 2. Clone & Install Dependencies
```bash
git clone https://github.com/your-username/rexchange.git
cd rexchange
npm install
```

### 3. Setup Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🗄️ Supabase & pgvector Setup (Optional for Production)

If connecting to a remote Supabase project:
1. In your Supabase Dashboard, navigate to **SQL Editor**.
2. Run the migration script in `supabase/migrations/001_init.sql`.
3. Run the seed data script in `supabase/seed.sql`.
4. Copy your `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` to `.env.local`.

*(Note: When running without Supabase credentials, RExchange automatically uses its synchronized in-memory/localStorage demo store with 20+ realistic campus listings.)*

---

## 🤖 Local Open-Source AI (Ollama) Setup

To enable local Ollama AI:
1. Install [Ollama](https://ollama.com).
2. Pull the models:
   ```bash
   ollama pull llama3.2:3b
   ollama pull nomic-embed-text
   ```
3. Run Ollama (`ollama serve`).

*(Note: When Ollama is offline or deployed to Vercel, the app automatically switches to the built-in heuristic NLP engine with zero downtime.)*

---

## ☁️ Step-by-Step Vercel Deployment

1. **Push your code to GitHub**:
   ```bash
   git add .
   git commit -m "feat: complete RExchange MVP"
   git push origin main
   ```

2. **Deploy on Vercel**:
   - Go to [vercel.com/new](https://vercel.com/new) and import your GitHub repository.
   - Under **Environment Variables**, add:
     - `ALLOWED_EMAIL_DOMAIN` = `@campus.edu`
     - `AI_PROVIDER` = `fallback` (or `ollama` if using remote Ollama)
     - `NEXT_PUBLIC_SUPABASE_URL` (optional)
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY` (optional)
   - Click **Deploy**.

---

## 🎬 2-Minute Demo Script

1. **Homepage**: Observe the campus hero, quick impact stats ($34k+ saved), and the category carousel.
2. **AI Listing Post**: Click **AI Listing Post** ➔ Click the sample prompt *"engineering maths book first year good condition sell 35"* ➔ Click **Auto-Generate** ➔ Review extracted fields and click **Publish**.
3. **Smart Matches Radar**: Navigate to **Smart Matches** tab ➔ See the semantic pairing between Sarah's Calculus Request and Alex's Calculus Offer (96% Match).
4. **Reserve with Confetti**: Click **Reserve & Claim Item** ➔ Confirm modal ➔ Watch the celebratory confetti animation and status lock to `Reserved`.
5. **Campus Messaging**: Open **Messages** ➔ Send a pickup meetup note to the seller ➔ Receive real-time simulated student response.
6. **Student Profile & Reviews**: Click user avatar ➔ Review 5-star ratings and post a peer review.
