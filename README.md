# 8Brave Landing Page

A production-ready landing page for the 8Brave skill assessment platform. Built with Next.js 14 App Router and TypeScript.

## Getting started

```bash
npm install
npm run dev
```

Open `http://localhost:3000` in your browser.

## Environment variables

The API can send email notifications when these are configured:

```
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASS=
```

If any SMTP variables are missing, signups are still stored locally and the API returns success.

## Whitelist storage

Signup data is appended to `data/whitelist.json`. Each entry includes the email, optional experience, timestamp, and IP address. The API validates email format, checks experience values, and applies a simple in-memory rate limit per IP.

## Deployment (Vercel)

1. Push the repository to GitHub.
2. Create a new Vercel project and import the repository.
3. Add the SMTP environment variables in Vercel (optional).
4. Deploy. Vercel will run `npm run build` automatically.

## Updating copy

All user-facing copy, including the EN/RU translations, lives in `app/page.tsx` inside the `COPY` object.
