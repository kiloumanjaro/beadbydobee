# Google Gemini AI Integration Setup Guide

This guide will help you set up the Google Gemini AI chatbot for bracelet design generation.

## Prerequisites

- Google account
- Node.js 18+ installed
- Next.js project already set up

## Step 1: Get Your Gemini API Key

1. **Visit Google AI Studio**
   - Go to [https://makersuite.google.com/app/apikey](https://makersuite.google.com/app/apikey)
   - Sign in with your Google account

2. **Create API Key**
   - Click "Get API Key" or "Create API Key" button
   - Select "Create API key in new project" or use an existing project
   - Copy the generated API key (it starts with `AIza...`)

   ⚠️ **Important**: Keep this key secure and never commit it to version control!

## Step 2: Configure Environment Variables

1. **Locate the `.env.local` file** in your project root (already created during installation)

2. **Add your API key**
   ```env
   GEMINI_API_KEY=your_actual_api_key_here
   ```

   Replace `your_api_key_here` with the API key you copied from Google AI Studio.

3. **Verify the file is in `.gitignore`**
   - Ensure `.env.local` is listed in your `.gitignore` file
   - This prevents accidentally committing your API key

## Step 3: Rename Your Bead Images (Optional but Recommended)

For optimal AI performance, rename your bead images following this convention:

```
{color}-{vibe}.png
```

### Examples:
- `blue-calm.png` - A calming blue bead
- `red-passionate.png` - A passionate red bead
- `pink-romantic.png` - A romantic pink bead
- `green-natural.png` - A natural green bead
- `purple-mystical.png` - A mystical purple bead
- `gold-luxurious.png` - A luxurious gold bead

### Update the Bead Catalog

After renaming your beads, update the `BEAD_CATALOG` in `lib/bead-metadata.ts`:

```typescript
export const BEAD_CATALOG: BeadMetadata[] = [
  {
    id: "blue-calm",
    filename: "/beads/blue-calm.png",
    color: "blue",
    vibe: ["calm", "peaceful", "serene", "ocean", "tranquil"],
    description: "Calming blue bead with ocean vibes",
  },
  // Add more beads following this pattern
];
```

## Step 4: Test the Integration

1. **Start the development server**
   ```bash
   npm run dev
   ```

2. **Navigate to the customize page**
   - Open [http://localhost:3000/customize](http://localhost:3000/customize)

3. **Test the AI Chatbot**
   - Click the "AI Designer" floating button in the bottom-right corner
   - Try an example prompt like:
     - "Create a calming ocean-themed bracelet"
     - "I want something bold and passionate"
     - "Design a romantic sunset gradient"

4. **Apply the design**
   - After the AI generates a design, click "Apply Design to Bracelet"
   - The beads should automatically populate in the editor

## Step 5: API Limits and Pricing

### Free Tier Limits
- Google Gemini API offers a generous free tier
- Check current limits at [https://ai.google.dev/pricing](https://ai.google.dev/pricing)
- Gemini 1.5 Flash (used in this app) is optimized for speed and efficiency

### Rate Limiting
- The free tier typically allows:
  - 15 requests per minute
  - 1,500 requests per day
  - 1 million tokens per day

### Monitoring Usage
- Track your usage in [Google AI Studio](https://makersuite.google.com)
- Set up quota alerts in Google Cloud Console

## Troubleshooting

### Error: "Gemini API key not configured"
- **Solution**: Ensure `GEMINI_API_KEY` is set in `.env.local`
- Restart your development server after adding the key

### Error: "Invalid API key"
- **Solution**: Verify your API key is correct and active
- Check for any extra spaces or quotes in `.env.local`

### Error: "API quota exceeded"
- **Solution**: You've hit the rate limit
- Wait a few minutes or upgrade to a paid plan

### AI Returns Invalid Designs
- **Solution**: Update your bead catalog in `lib/bead-metadata.ts`
- Ensure all bead filenames match the catalog entries
- Check that bead images exist in `/public/beads/`

### Chatbot Not Appearing
- **Solution**: Clear browser cache and reload
- Check browser console for errors
- Ensure all dependencies are installed (`npm install`)

## Advanced Configuration

### Change AI Model
Edit `lib/gemini-service.ts`:
```typescript
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash" // or "gemini-1.5-pro"
});
```

### Customize System Prompt
Edit the `createSystemPrompt` function in `lib/gemini-service.ts` to adjust:
- Design style preferences
- Pattern generation rules
- Color combination logic

### Add More Example Prompts
Edit `EXAMPLE_PROMPTS` array in `lib/gemini-service.ts`:
```typescript
export const EXAMPLE_PROMPTS = [
  "Your custom prompt here",
  // ... more prompts
];
```

## Security Best Practices

1. **Never expose API keys**
   - Always use environment variables
   - Never commit `.env.local` to Git
   - Don't share API keys in screenshots or logs

2. **Use server-side API routes**
   - The API key is only used in `/app/api/generate-design/route.ts`
   - This prevents exposing the key to the client browser

3. **Implement rate limiting** (optional)
   - Add rate limiting middleware to prevent abuse
   - Track user requests per session

4. **Monitor API usage**
   - Regularly check Google AI Studio dashboard
   - Set up billing alerts if using paid tier

## Additional Resources

- [Google Gemini API Documentation](https://ai.google.dev/docs)
- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)
- [Google AI Studio](https://makersuite.google.com)

## Support

If you encounter issues:
1. Check the browser console for errors
2. Review server logs in your terminal
3. Verify all files are saved and server is restarted
4. Consult the troubleshooting section above

---

Happy designing! 🎨✨
