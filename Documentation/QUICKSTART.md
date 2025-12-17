# 🚀 Quick Start Guide - AI Chatbot

## Step 1: Get API Key (2 minutes)

1. Visit: https://makersuite.google.com/app/apikey
2. Click "Create API Key"
3. Copy the key (starts with `AIza...`)

## Step 2: Add API Key

Open `.env.local` and replace:
```env
GEMINI_API_KEY=your_api_key_here
```

With your actual key:
```env
GEMINI_API_KEY=AIzaSyD...your_actual_key
```

## Step 3: Restart Server

```bash
npm run dev
```

## Step 4: Test It!

1. Go to: http://localhost:3000/customize
2. Click "AI Designer" button (bottom-right)
3. Type: "Create a calming ocean bracelet"
4. Click "Apply Design"

## ✅ That's it!

---

## 📝 Update Your Beads

Edit `lib/bead-metadata.ts` to add your beads:

```typescript
{
  id: "blue-ocean",
  filename: "/beads/blue-ocean.png",
  color: "blue",
  vibe: ["calm", "ocean", "peaceful"],
  description: "Ocean blue bead"
}
```

---

For detailed instructions: [GEMINI_SETUP.md](GEMINI_SETUP.md)
