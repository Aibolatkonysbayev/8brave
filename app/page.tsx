"use client";

import { FormEvent, useMemo, useState } from "react";

type Language = "en" | "ru";

type Copy = {
  hero: {
    title: string;
    subtitleLines: string[];
    supporting: string;
    cta: string;
  };
  problem: {
    bullets: string[];
  };
  whatYouGet: {
    heading: string;
    intro: string;
    bullets: string[];
  };
  howItWorks: {
    heading: string;
    steps: string[];
  };
  trust: {
    lines: string[];
  };
  finalCta: {
    text: string;
    button: string;
  };
  form: {
    emailLabel: string;
    experienceLabel: string;
    experiencePlaceholder: string;
    experienceOptions: string[];
    success: string;
    error: string;
    submit: string;
  };
};

const COPY: Record<Language, Copy> = {
  en: {
    hero: {
      title: "Why strong engineers get stuck for years",
      subtitleLines: [
        "You deliver tasks.",
        "You follow procedures.",
        "You don’t cause problems.",
        "But promotions don’t come, and no one explains why.",
      ],
      supporting:
        "Get a clear, objective signal of your readiness for the next role, in 25 minutes.",
      cta: "Get early access",
    },
    problem: {
      bullets: [
        "Your real strengths are not visible",
        "Interview feedback is vague",
        "Performance reviews don’t explain promotion readiness",
        "You don’t know if the blocker is technical, behavioral, or role fit",
      ],
    },
    whatYouGet: {
      heading: "What you get",
      intro: "After the assessment, you will clearly see:",
      bullets: [
        "where you are strong",
        "what blocks your next role",
        "whether you are ready now or what to work on next",
      ],
    },
    howItWorks: {
      heading: "How it works",
      steps: [
        "Take a structured 25-minute assessment",
        "Receive a clear PDF report by email",
        "Use it for career decisions and interviews",
      ],
    },
    trust: {
      lines: [
        "Built by engineers with real oil and gas project experience.",
        "No HR language. No generic advice.",
      ],
    },
    finalCta: {
      text: "Be one of the first engineers to test it.",
      button: "Join early access",
    },
    form: {
      emailLabel: "Email (required)",
      experienceLabel: "Years of experience (optional)",
      experiencePlaceholder: "Select years of experience",
      experienceOptions: ["1–3", "3–5", "5–10"],
      success: "Thanks! You are on the early access list.",
      error: "Something went wrong. Please try again.",
      submit: "Join early access",
    },
  },
  ru: {
    hero: {
      title: "Почему сильные инженеры годами остаются на одном уровне",
      subtitleLines: [
        "Вы выполняете задачи.",
        "Соблюдаете процедуры.",
        "Не создаёте проблем.",
        "Но повышение не приходит, и никто не объясняет почему.",
      ],
      supporting:
        "Получите чёткий и объективный сигнал о своей готовности к следующей роли, всего за 25 минут.",
      cta: "Получить ранний доступ",
    },
    problem: {
      bullets: [
        "Ваши реальные сильные стороны не видны",
        "Обратная связь после интервью размыта",
        "Оценки эффективности не объясняют готовность к повышению",
        "Непонятно, что именно мешает, техника, поведение или роль",
      ],
    },
    whatYouGet: {
      heading: "Что вы получите",
      intro: "После оценки вы чётко увидите:",
      bullets: [
        "в чём вы сильны",
        "что именно блокирует следующий шаг",
        "готовы ли вы сейчас или над чем работать дальше",
      ],
    },
    howItWorks: {
      heading: "Как это работает",
      steps: [
        "Пройдите структурированную оценку за 25 минут",
        "Получите понятный PDF-отчёт на почту",
        "Используйте его для карьерных решений и интервью",
      ],
    },
    trust: {
      lines: [
        "Создано инженерами с реальным опытом проектов в oil and gas.",
        "Без HR-языка. Без общих фраз.",
      ],
    },
    finalCta: {
      text: "Станьте одним из первых инженеров, кто протестирует это.",
      button: "Присоединиться к раннему доступу",
    },
    form: {
      emailLabel: "Email (обязательно)",
      experienceLabel: "Опыт работы (необязательно)",
      experiencePlaceholder: "Выберите опыт",
      experienceOptions: ["1–3", "3–5", "5–10"],
      success: "Спасибо! Вы в списке раннего доступа.",
      error: "Что-то пошло не так. Попробуйте ещё раз.",
      submit: "Присоединиться к раннему доступу",
    },
  },
};

export default function Home() {
  const [language, setLanguage] = useState<Language>("en");
  const [email, setEmail] = useState("");
  const [experience, setExperience] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );

  const copy = useMemo(() => COPY[language], [language]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("/api/whitelist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, experience: experience || null }),
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      setEmail("");
      setExperience("");
      setStatus("success");
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  return (
    <main>
      <header className="header">
        <div className="container header-inner">
          <div className="brand">8Brave</div>
          <div className="lang-toggle" role="group" aria-label="Language toggle">
            <button
              type="button"
              className={language === "en" ? "active" : ""}
              onClick={() => setLanguage("en")}
            >
              EN
            </button>
            <button
              type="button"
              className={language === "ru" ? "active" : ""}
              onClick={() => setLanguage("ru")}
            >
              RU
            </button>
          </div>
        </div>
      </header>

      <section className="section">
        <div className="container">
          <h1 className="hero-title">{copy.hero.title}</h1>
          <div className="hero-subtitle">
            {copy.hero.subtitleLines.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
          <p className="hero-supporting">{copy.hero.supporting}</p>
          <a className="primary-button" href="#early-access">
            {copy.hero.cta}
          </a>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <ul className="list">
            {copy.problem.bullets.map((bullet) => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="section-title">{copy.whatYouGet.heading}</h2>
          <p className="hero-subtitle">{copy.whatYouGet.intro}</p>
          <ul className="list">
            {copy.whatYouGet.bullets.map((bullet) => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <h2 className="section-title">{copy.howItWorks.heading}</h2>
          <div className="steps">
            {copy.howItWorks.steps.map((step, index) => (
              <div className="step" key={step}>
                <div className="step-number">{index + 1}</div>
                <p>{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="trust-text">
            {copy.trust.lines.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt" id="early-access">
        <div className="container">
          <div className="cta-card">
            <h2 className="section-title">{copy.finalCta.text}</h2>
            <form className="form" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email">{copy.form.emailLabel}</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="experience">{copy.form.experienceLabel}</label>
                <select
                  id="experience"
                  name="experience"
                  value={experience}
                  onChange={(event) => setExperience(event.target.value)}
                >
                  <option value="">{copy.form.experiencePlaceholder}</option>
                  {copy.form.experienceOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <button className="primary-button" type="submit" disabled={status === "loading"}>
                {copy.form.submit}
              </button>
              {status === "success" && (
                <p className="form-message">{copy.form.success}</p>
              )}
              {status === "error" && <p className="form-message">{copy.form.error}</p>}
            </form>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container">
          <p>info@8brave.com</p>
        </div>
      </footer>
    </main>
  );
}
