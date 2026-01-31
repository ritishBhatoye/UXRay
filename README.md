# ExpoNext UX Copilot

AI-powered UX, accessibility, and performance analysis for Expo and Next.js components.

## What It Does

ExpoNext UX Copilot is a **review + analysis tool** (not a code generator) that analyzes your React components and provides actionable feedback on:

- ✅ **UX Issues** - Visual hierarchy, spacing, tap targets, form UX, error placement
- ♿ **Accessibility** - Missing labels, contrast, keyboard handling, screen readers, focus management
- ⚡ **Performance** - Re-renders, inline functions, heavy effects, list optimizations, image usage
- 📱 **Platform-Specific** - Expo and Next.js pitfalls, KeyboardAvoidingView, Platform.OS usage

## Who It's For

Senior engineers and product teams building with:

- Expo (React Native)
- Next.js
- Both platforms

## Quick Start

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Configure Environment

```bash
cp .env.example .env
```

Add your OpenAI API key to `.env`:

```env
OPENAI_API_KEY=your_api_key_here
```

### 3. Run Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000)

### 4. Deploy to Vercel

```bash
vercel
```

Or connect your GitHub repo to Vercel for automatic deployments.

## Example Input/Output

### Input (Expo Screen)

```tsx
export default function LoginScreen() {
  return (
    <View style={{ padding: 10 }}>
      <TextInput placeholder="Email" />
      <TouchableOpacity style={{ padding: 5 }}>
        <Text>Login</Text>
      </TouchableOpacity>
    </View>
  );
}
```

### Output

```
### UX Issues
❌ Tap target too small - TouchableOpacity has 5pt padding (minimum 44x44pt required)
❌ Insufficient spacing - 10pt padding is cramped on mobile
💡 Increase container padding to 16-24pt and button padding to meet 44pt minimum

### Accessibility Issues
❌ TextInput missing accessibilityLabel
❌ TouchableOpacity missing accessibilityRole="button"
💡 Add accessibilityLabel="Email input" to TextInput
💡 Add accessibilityRole="button" and accessibilityLabel="Login button"

### Performance Issues
✅ No issues found

### Platform Notes
📱 Expo: Consider using KeyboardAvoidingView for better keyboard handling
```

## Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS
- **Backend**: React Server Actions
- **AI**: OpenAI-compatible API (GPT-4)
- **Deployment**: Vercel

## Project Structure

```
/app
  /page.tsx        # Main UI
  /actions.ts      # Server Actions (AI calls)
  /layout.tsx      # Root layout
  /globals.css     # Global styles
/lib
  /aiPrompt.ts     # System prompt & user prompt builder
  /analyze.ts      # AI analysis logic
/components
  /Editor.tsx      # Code input component
  /ResultPanel.tsx # Feedback display component
```

## Quality Guarantees

- ✅ No fake analysis - only analyzes what's actually in your code
- ✅ Deterministic & repeatable results
- ✅ Works with Expo + NativeWind patterns
- ✅ Works with Next.js App Router patterns
- ✅ If something is good, we say so explicitly

## Environment Variables

| Variable          | Required | Description                                |
| ----------------- | -------- | ------------------------------------------ |
| `OPENAI_API_KEY`  | Yes      | Your OpenAI API key                        |
| `OPENAI_BASE_URL` | No       | Custom endpoint for OpenAI-compatible APIs |

## License

MIT
