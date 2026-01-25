import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { promises as fs } from "fs";
import path from "path";

export const runtime = "nodejs";

const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 5;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const EXPERIENCE_OPTIONS = ["1–3", "3–5", "5–10"];

const getRateLimitStore = () => {
  const globalStore = globalThis as typeof globalThis & {
    __rateLimitStore?: Map<string, number[]>;
  };

  if (!globalStore.__rateLimitStore) {
    globalStore.__rateLimitStore = new Map();
  }

  return globalStore.__rateLimitStore;
};

const getClientIp = (request: NextRequest) => {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() ?? "unknown";
  }
  return request.ip ?? "unknown";
};

const getWhitelistFilePath = () =>
  path.join(process.cwd(), "data", "whitelist.json");

const readWhitelist = async () => {
  try {
    const file = await fs.readFile(getWhitelistFilePath(), "utf-8");
    const parsed = JSON.parse(file);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return [];
    }
    throw error;
  }
};

const writeWhitelist = async (entries: unknown[]) => {
  await fs.mkdir(path.join(process.cwd(), "data"), { recursive: true });
  await fs.writeFile(
    getWhitelistFilePath(),
    JSON.stringify(entries, null, 2),
    "utf-8",
  );
};

const sendNotificationEmail = async (payload: {
  email: string;
  experience: string | null;
  timestamp: string;
  ip: string;
}) => {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;

  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
    return { skipped: true };
  }

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: Number(SMTP_PORT) === 465,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  });

  await transporter.sendMail({
    from: `8Brave <${SMTP_USER}>`,
    to: "info@8brave.com",
    subject: "New 8Brave early access signup",
    text: [
      `Email: ${payload.email}`,
      `Experience: ${payload.experience ?? "Not provided"}`,
      `Timestamp: ${payload.timestamp}`,
      `IP: ${payload.ip}`,
    ].join("\n"),
  });

  return { skipped: false };
};

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);
  const rateLimitStore = getRateLimitStore();
  const now = Date.now();
  const timestamps = rateLimitStore.get(ip) ?? [];
  const recent = timestamps.filter((time) => now - time < RATE_LIMIT_WINDOW_MS);

  if (recent.length >= MAX_REQUESTS_PER_WINDOW) {
    return NextResponse.json(
      { message: "Too many requests. Please try again later." },
      { status: 429 },
    );
  }

  let body: { email?: string; experience?: string | null } = {};

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: "Invalid payload." }, { status: 400 });
  }

  const email = body.email?.trim() ?? "";
  const experience = body.experience ?? null;

  if (!EMAIL_REGEX.test(email)) {
    return NextResponse.json({ message: "Invalid email." }, { status: 400 });
  }

  if (experience && !EXPERIENCE_OPTIONS.includes(experience)) {
    return NextResponse.json(
      { message: "Invalid experience option." },
      { status: 400 },
    );
  }

  const entry = {
    email,
    experience,
    timestamp: new Date().toISOString(),
    ip,
  };

  const existing = await readWhitelist();
  existing.push(entry);
  await writeWhitelist(existing);

  rateLimitStore.set(ip, [...recent, now]);

  try {
    await sendNotificationEmail(entry);
  } catch (error) {
    console.error("Email failed:", error);
  }

  return NextResponse.json({ message: "OK" }, { status: 200 });
}
