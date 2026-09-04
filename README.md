# goyono

Learn coding and AI with real terminals and a guide. By Black Gold Studios. Powered by Onyx.

Stack: Next.js 14 (App Router) · Prisma · Neon Postgres · NextAuth (Google + email/password) ·
Groq (`openai/gpt-oss-120b`) for the tutor · self-hosted Piston for real code execution.

---

## 0. Before anything: rotate your Groq key

If you ever pasted a Groq API key into a chat, doc, or ticket, it's compromised — go to
console.groq.com, revoke it, and generate a new one. Never put it in a committed file; it
only ever goes into Render's environment variable dashboard (step 5).

## 1. Neon (Postgres)

1. Create a project at neon.tech.
2. In the dashboard, grab two connection strings:
   - **Pooled connection** → this is `DATABASE_URL`
   - **Direct connection** → this is `DIRECT_URL` (Prisma migrations need the non-pooled one)
3. Both go in `.env.local` (see step 4).

## 2. Google OAuth

1. console.cloud.google.com → new project (or existing) → APIs & Services → Credentials.
2. Create OAuth 2.0 Client ID, type "Web application".
3. Authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google` (dev)
   - `https://YOUR-RENDER-URL.onrender.com/api/auth/callback/google` (prod, add after step 5)
4. Copy the Client ID and Client Secret.

## 3. Groq

1. console.groq.com → API keys → create a new key.
2. This is `GROQ_API_KEY`. It powers the tutor using `openai/gpt-oss-120b`.

## 4. Local setup

```bash
cp .env.example .env.local
# fill in DATABASE_URL, DIRECT_URL, GOOGLE_CLIENT_ID/SECRET, GROQ_API_KEY
# generate NEXTAUTH_SECRET with: openssl rand -base64 32
# leave PISTON_URL for later, or point it at a local Piston (see piston-service/)

npm install
npx prisma migrate dev --name init
npx prisma db seed
npm run dev
```

Visit `http://localhost:3000`.

## 5. Deploy to Render

This repo includes `render.yaml` as a Render **Blueprint** — it defines both services
(the app, and the Piston execution service) at once.

1. Push this repo to GitHub.
2. In Render: New → Blueprint → connect the repo. It reads `render.yaml` and proposes
   both services.
3. For the `goyono` service, fill in the environment variables Render prompts for
   (`DATABASE_URL`, `DIRECT_URL`, `NEXTAUTH_SECRET`, `NEXTAUTH_URL` = your Render URL,
   `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `GROQ_API_KEY` — the **new, rotated** one).
   Leave `PISTON_URL` blank for now.
4. Deploy. The `goyono-piston` service will build separately (it's a Docker image, takes
   a few minutes the first time).
5. Once `goyono-piston` is live, copy its URL and set it as `PISTON_URL` in the `goyono`
   service's env vars, then redeploy `goyono`.
6. SSH or use Render's shell on `goyono-piston` to install language runtimes — or run
   `piston-service/install-runtimes.sh` locally pointed at the live URL:
   ```bash
   PISTON_URL=https://goyono-piston.onrender.com ./piston-service/install-runtimes.sh
   ```
7. Go back to Google Cloud Console and add the production redirect URI from step 2.
8. Run migrations against the production DB once (Render's build command already runs
   `prisma migrate deploy` — see `package.json`). Seed content manually if needed:
   ```bash
   DATABASE_URL="your-prod-url" npx prisma db seed
   ```

## Project structure

```
app/                    Next.js App Router pages + API routes
  (auth)/signin, signup  Auth pages
  dashboard/              Main hub after sign-in
  learn/[pathId]/         Lesson paths
  api/auth/               NextAuth handler
  api/signup/             Email/password registration
  api/execute/            Proxies code runs to Piston, saves history
  api/tutor/               Calls Groq for the AI guide
  api/progress/            Marks lessons complete, tracks streaks
components/             Shared React components (Terminal, TutorPanel, Sidebar, etc.)
lib/                    Prisma client, NextAuth config
prisma/                 Schema + seed script
piston-service/         Separate deployable folder for the code-execution engine
render.yaml             Render Blueprint for both services
```

## Notes

- The Piston service on Render's free/starter tier will spin down when idle — the first
  code run after inactivity may take 30-60s while it wakes up. The execute API surfaces
  a friendly message for this rather than a raw timeout.
- Passwords are hashed with bcrypt (12 rounds), never stored in plaintext.
- `NEXTAUTH_SECRET` and all API keys live only in Render's dashboard / `.env.local` —
  neither file is committed (see `.gitignore`).
