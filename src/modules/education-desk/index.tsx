"use client";

import { useState } from "react";
import styles from "./styles.module.scss";
import { useDashboard } from "@/context/DashboardContext";

const LESSONS = [
  {
    id: "forex-basics",
    title: "What is Forex Trading?",
    desc: "Understand how currency pairs work, what drives FX markets, and how emerging market currencies behave.",
    level: "Beginner",
    levelColor: "#CB1A36",
    levelBg: "rgba(203,26,54,0.1)",
    duration: "8 min",
    track: "trading",
    xp: 50,
    completed: true,
  },
  {
    id: "risk-management",
    title: "Stop Loss & Risk Management",
    desc: "Learn how to size positions correctly, set stop losses, and never risk more than you can afford to lose.",
    level: "Intermediate",
    levelColor: "#D97706",
    levelBg: "rgba(245,158,11,0.1)",
    duration: "12 min",
    track: "trading",
    xp: 75,
    completed: true,
  },
  {
    id: "copy-trading",
    title: "How Copy Trading Works",
    desc: "Understand how Farlo's copy trading engine replicates positions, handles risk, and calculates performance.",
    level: "All levels",
    levelColor: "#0D7A58",
    levelBg: "rgba(13,122,88,0.1)",
    duration: "10 min",
    track: "trading",
    xp: 60,
    completed: true,
  },
  {
    id: "stock-charts",
    title: "Reading Stock Charts",
    desc: "Candlesticks, moving averages, and the indicators every investor should understand before buying a stock.",
    level: "Beginner",
    levelColor: "#3b82f6",
    levelBg: "rgba(59,130,246,0.1)",
    duration: "15 min",
    track: "investing",
    xp: 50,
    completed: false,
  },
  {
    id: "portfolio",
    title: "Building a Long-Term Portfolio",
    desc: "Diversification, ETFs vs individual stocks, and how to construct a resilient portfolio on a limited budget.",
    level: "Investing",
    levelColor: "#0D7A58",
    levelBg: "rgba(13,122,88,0.1)",
    duration: "18 min",
    track: "investing",
    xp: 80,
    completed: false,
  },
  {
    id: "options",
    title: "Options Trading 101",
    desc: "Calls, puts, strike prices, and expiration — the basics of US stock options before you write your first contract.",
    level: "Advanced",
    levelColor: "#D97706",
    levelBg: "rgba(245,158,11,0.1)",
    duration: "20 min",
    track: "investing",
    xp: 100,
    completed: false,
  },
  {
    id: "leverage",
    title: "Understanding Leverage",
    desc: "How leverage amplifies both gains and losses, and why proper margin management is essential for survival.",
    level: "Intermediate",
    levelColor: "#D97706",
    levelBg: "rgba(245,158,11,0.1)",
    duration: "10 min",
    track: "trading",
    xp: 70,
    completed: false,
  },
  {
    id: "technical-analysis",
    title: "Technical Analysis Fundamentals",
    desc: "Support, resistance, trend lines and key chart patterns that professional traders use every day.",
    level: "Intermediate",
    levelColor: "#D97706",
    levelBg: "rgba(245,158,11,0.1)",
    duration: "22 min",
    track: "trading",
    xp: 90,
    completed: false,
  },
  {
    id: "etfs",
    title: "ETFs Explained",
    desc: "What ETFs are, how they track indices, their cost advantages over mutual funds, and how to pick the right one.",
    level: "Beginner",
    levelColor: "#3b82f6",
    levelBg: "rgba(59,130,246,0.1)",
    duration: "12 min",
    track: "investing",
    xp: 55,
    completed: false,
  },
];

const TRACKS = [
  { id: "trading", label: "Trading Fundamentals", total: 4, done: 3, color: "#CB1A36" },
  { id: "risk", label: "Risk Management", total: 4, done: 0, color: "#D97706" },
  { id: "investing", label: "US Equities Investing", total: 4, done: 0, color: "#0D7A58" },
];

export function EducationUI() {
  const { mode } = useDashboard();
  const [filter, setFilter] = useState<"all" | "trading" | "investing">("all");
  const [completedIds, setCompletedIds] = useState<Set<string>>(
    new Set(LESSONS.filter(l => l.completed).map(l => l.id))
  );
  const [toast, setToast] = useState<string | null>(null);
  const [openLesson, setOpenLesson] = useState<string | null>(null);

  const totalXp = LESSONS.filter(l => completedIds.has(l.id)).reduce((a, l) => a + l.xp, 0);
  const completedCount = completedIds.size;
  const streak = 5;
  const nextRewardXp = 500;

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleLessonClick = (lesson: typeof LESSONS[0]) => {
    if (completedIds.has(lesson.id)) {
      showToast(`📖 ${lesson.title} — Reviewing...`);
      return;
    }
    setOpenLesson(lesson.id);
  };

  const completeLesson = (lesson: typeof LESSONS[0]) => {
    setCompletedIds(prev => new Set([...prev, lesson.id]));
    setOpenLesson(null);
    showToast(`✓ +${lesson.xp} XP earned — ${lesson.title} complete!`);
  };

  const filtered = filter === "all" ? LESSONS : LESSONS.filter(l => l.track === filter);

  return (
    <div className={styles.page}>
      {toast && <div className={styles.toast}>{toast}</div>}

      {openLesson && (() => {
        const lesson = LESSONS.find(l => l.id === openLesson)!;
        return (
          <div className={styles.modal_overlay}>
            <div className={styles.modal}>
              <div className={styles.modal_tag} style={{ color: lesson.levelColor, background: lesson.levelBg }}>
                {lesson.level}
              </div>
              <h3 className={styles.modal_title}>{lesson.title}</h3>
              <p className={styles.modal_desc}>{lesson.desc}</p>
              <div className={styles.modal_meta}>
                <span>⏱ {lesson.duration} read</span>
                <span>+{lesson.xp} XP on completion</span>
              </div>
              <div className={styles.modal_placeholder}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--dash-text-muted)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" /><polygon points="10 8 16 12 10 16 10 8" />
                </svg>
                <p>Lesson content loads here</p>
                <span>Video · Interactive quiz · Summary</span>
              </div>
              <div className={styles.modal_btns}>
                <button className={styles.modal_cancel} onClick={() => setOpenLesson(null)}>Close</button>
                <button className={styles.modal_complete} onClick={() => completeLesson(lesson)}>
                  Mark as Complete → +{lesson.xp} XP
                </button>
              </div>
            </div>
          </div>
        );
      })()}

      <div className={styles.page_header}>
        <div>
          <h1 className={styles.page_title}>Education</h1>
          <p className={styles.page_sub}>Build your knowledge. Earn XP. Unlock rewards.</p>
        </div>
      </div>

      <div className={styles.stats_row}>
        <div className={styles.scard}>
          <p className={styles.sc_l}>COMPLETED</p>
          <p className={styles.sc_v}>{completedCount}</p>
          <p className={styles.sc_c}>of {LESSONS.length} lessons</p>
        </div>
        <div className={styles.scard}>
          <p className={styles.sc_l}>STREAK</p>
          <p className={styles.sc_v}>🔥 {streak} days</p>
          <p className={`${styles.sc_c} ${styles.up}`}>Keep it up!</p>
        </div>
        <div className={styles.scard}>
          <p className={styles.sc_l}>XP EARNED</p>
          <p className={styles.sc_v}>{totalXp}</p>
          <p className={styles.sc_c}>Points</p>
        </div>
        <div className={styles.scard}>
          <p className={styles.sc_l}>NEXT REWARD</p>
          <p className={`${styles.sc_v} ${styles.warn}`}>$10 bonus</p>
          <p className={styles.sc_c}>at {nextRewardXp} XP</p>
        </div>
      </div>

      <div className={styles.xp_bar_wrap}>
        <div className={styles.xp_bar_head}>
          <span className={styles.xp_bar_label}>XP Progress to next reward</span>
          <span className={styles.xp_bar_val}>{totalXp} / {nextRewardXp} XP</span>
        </div>
        <div className={styles.xp_bar_bg}>
          <div className={styles.xp_bar_fg} style={{ width: `${Math.min((totalXp / nextRewardXp) * 100, 100)}%` }} />
        </div>
      </div>

      <div className={styles.panel}>
        <div className={styles.panel_head}>
          <span className={styles.panel_title}>Your Learning Path</span>
          <span className={styles.panel_action}>View all tracks</span>
        </div>
        <div className={styles.panel_body}>
          {TRACKS.map(track => (
            <div key={track.id} className={styles.track_row}>
              <div className={styles.track_labels}>
                <span className={styles.track_name}>{track.label}</span>
                <span className={styles.track_count} style={{ color: track.done > 0 ? track.color : "var(--dash-text-muted)" }}>
                  {track.done}/{track.total} complete
                </span>
              </div>
              <div className={styles.track_bar_bg}>
                <div className={styles.track_bar_fg} style={{ width: `${(track.done / track.total) * 100}%`, background: track.color }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.filter_row}>
        <span className={styles.filter_label}>Filter:</span>
        {(["all", "trading", "investing"] as const).map(f => (
          <button
            key={f}
            className={`${styles.filter_btn} ${filter === f ? styles.filter_btn_active : ""}`}
            onClick={() => setFilter(f)}
          >
            {f === "all" ? "All Lessons" : f === "trading" ? "Trading" : "Investing"}
          </button>
        ))}
      </div>

      <div className={styles.lessons_grid}>
        {filtered.map(lesson => {
          const done = completedIds.has(lesson.id);
          return (
            <div
              key={lesson.id}
              className={`${styles.lesson_card} ${done ? styles.lesson_done : ""}`}
              onClick={() => handleLessonClick(lesson)}
            >
              {done && <div className={styles.done_badge}>✓ Done</div>}
              <div className={styles.lesson_tag} style={{ color: lesson.levelColor, background: lesson.levelBg }}>
                {lesson.level}
              </div>
              <h4 className={styles.lesson_title}>{lesson.title}</h4>
              <p className={styles.lesson_desc}>{lesson.desc}</p>
              <div className={styles.lesson_footer}>
                <span className={styles.lesson_dur}>⏱ {lesson.duration}</span>
                <span className={styles.lesson_xp} style={{ color: done ? "#0D7A58" : "var(--dash-text-muted)" }}>
                  {done ? `+${lesson.xp} XP earned` : `+${lesson.xp} XP`}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}