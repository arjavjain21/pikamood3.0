# PikaMood — Deployment Guide
## Deploy for free in ~30 minutes

---

## Step 1 — Set up Supabase (free, ~10 min)

1. Go to **https://supabase.com** → Sign up free
2. Click **New Project** → name it `pikamood` → choose a region close to you → set a DB password
3. Wait ~2 minutes for project to spin up
4. Go to **SQL Editor** → New Query → paste the entire contents of `supabase-schema.sql` → click **Run**
5. Go to **Settings → API** → copy:
   - **Project URL** (looks like `https://xyzabcdef.supabase.co`)
   - **anon/public** key (long JWT string)
6. Open `supabase-config.js` and replace the placeholders:
   ```js
   url:     'https://xyzabcdef.supabase.co',
   anonKey: 'eyJhbGciOiJIUzI1NiIsInR...',
   ```
7. In Supabase → **Authentication → Settings**:
   - Enable **Email** provider
   - Disable "Confirm email" for easier testing (can re-enable later)

---

## Step 2 — Deploy to Netlify (free, ~5 min)

### Option A: Drag & Drop (easiest)
1. Go to **https://netlify.com** → Sign up free
2. Click **Add new site → Deploy manually**
3. Drag your entire project folder onto the Netlify deploy area
4. You'll get a URL like `https://random-name.netlify.app`
5. Optionally rename it: **Site settings → Change site name** → `pikamood` → `https://pikamood.netlify.app`

### Option B: GitHub (better for updates)
1. Push your project to a GitHub repo
2. Netlify → Add new site → Import from GitHub
3. Select your repo → Deploy
4. Every time you push to GitHub, Netlify auto-deploys

---

## Step 3 — Test the PWA install

1. Open your Netlify URL on your phone browser
2. **iPhone (Safari):** Tap Share → Add to Home Screen
3. **Android (Chrome):** Tap the 3-dot menu → Install app
4. The app installs with the PikaMood icon — works like a native app!

---

## Step 4 — Invite your partner

1. Share the Netlify URL with your partner
2. They open it → Sign Up with their email + password
3. Both of you are now on the same Supabase backend
4. Data syncs across devices when online, works offline too

---

## Step 5 — Custom domain (optional, free)

If you want `pikamood.com` or similar:
- Netlify → Domain settings → Add custom domain
- Point your domain's DNS to Netlify (they give you the records)
- Free HTTPS certificate included automatically

---

## Supabase Free Tier Limits (more than enough for 2 users)

| Resource | Free Limit | Your Usage |
|---|---|---|
| Database | 500 MB | ~1 MB/year for 2 users |
| Monthly Active Users | 50,000 | 2 |
| API calls | Unlimited | — |
| Storage | 1 GB | — |
| Realtime connections | 200 concurrent | 2 |

---

## Phase 2 — Partner Sharing (future)

The database schema already supports this. When ready:
1. Add a "Connect with Partner" button → sends invite by email
2. Partner accepts → `partner_connections` table links accounts
3. Enable `subscribeToPartnerMoods()` in DatabaseService.jsx
4. Home screen shows partner's current mood in real-time

---

## File Structure

```
PikaMood/
├── PikaMood.html          ← Main app entry point
├── manifest.json          ← PWA manifest
├── sw.js                  ← Service worker (offline support)
├── supabase-config.js     ← 🔑 PUT YOUR KEYS HERE
├── supabase-schema.sql    ← Run this in Supabase SQL Editor
├── DatabaseService.jsx    ← Supabase + localStorage layer
├── AppState.jsx           ← Theme, shared components
├── PikachuFace.jsx        ← 30 SVG expressions
├── PikaIcons.jsx          ← Custom icon library
├── OnboardingScreen.jsx
├── HomeScreen.jsx
├── DiaryScreen.jsx
├── StatsScreen.jsx
├── SettingsScreen.jsx
└── icons/
    ├── icon-72.png
    ├── icon-96.png
    ├── icon-128.png
    ├── icon-144.png
    ├── icon-152.png
    ├── icon-192.png        ← Used for home screen icon
    ├── icon-384.png
    └── icon-512.png        ← Used for splash screen
```

---

## Troubleshooting

**"Supabase connection failed"** → Check your URL and anon key in supabase-config.js. Make sure there are no trailing spaces.

**"Auth email not arriving"** → In Supabase Auth settings, disable email confirmation for testing.

**"Service worker not registering"** → Must be served over HTTPS. Netlify provides this automatically. Won't work from `file://` locally.

**"Data not syncing between devices"** → Make sure both users are logged in with their Supabase accounts, not in localStorage-only mode.

---

*PikaMood is a fan-made tribute app. Pokémon and Pikachu are trademarks of Nintendo/The Pokémon Company.*
