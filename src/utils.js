import { CARDIO_ACTIVITIES, DEFAULT_PHASES, STORAGE_PREFIX } from './constants.js';

export const activityLabel = e => CARDIO_ACTIVITIES.find(t => t.k === e)?.l || e;

export const resolveCardio = (e, t) => e?.cardio?.[t] ? e.cardio[t] : e?.peloton?.[t] ? {
    activity: "bike",
    label: e.peloton[t]
  } : null;

export const toDateKey = e => {
    let t = e instanceof Date ? e : new Date(e);
    return `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, "0")}-${String(t.getDate()).padStart(2, "0")}`;
  };

export const parseDateKey = e => {
    let [t, l, n] = e.split("-").map(Number);
    return new Date(t, l - 1, n);
  };

export const getToday = () => {
    let e = /* @__PURE__ */new Date();
    return new Date(e.getFullYear(), e.getMonth(), e.getDate());
  };

export const addDays = (e, t) => {
    let l = new Date(e);
    return l.setDate(l.getDate() + t), l;
  };

export const startOfWeek = e => {
    let t = e.getDay();
    return addDays(e, t === 0 ? -6 : 1 - t);
  };

export const formatShortDate = e => e.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric"
  });

export const formatWeekdayShort = e => e.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric"
  });

export const formatWeekdayLong = e => e.toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric"
  });

export const staticPhaseForWeek = e => DEFAULT_PHASES.find(t => t.weeks.includes(e)) || DEFAULT_PHASES[2];

export const totalWeeks = e => e.reduce((t, l) => t + l.weeks, 0);

export const phaseForWeek = (e, t) => {
    let l = 1;
    for (let n of t) {
      if (e < l + n.weeks) return n;
      l += n.weeks;
    }
    return t[t.length - 1];
  };

export const isPastProgramEnd = (e, t) => e > totalWeeks(t);

export const isRoutineMode = (e, t, l) => l.mode ? l.mode === "routine" : isPastProgramEnd(e, t);

export const makeRoutinePhase = e => ({
    ...e[e.length - 1],
    label: "Routine",
    desc: "Your ongoing weekly program."
  });

export const resolveExercises = (e, t) => {
    if (Array.isArray(e.exercises)) return e.exercises;
    let l = e.exercises || {};
    if (l[t]) return l[t];
    let n = Object.keys(l).filter(i => l[i]).sort();
    return n.length ? l[n[n.length - 1]] : [];
  };

export const phaseKey = e => `ph${e.id}`;

export const getWeekAndDay = (e, t) => {
    let l = Math.floor((t - e) / 864e5);
    return {
      weekNum: Math.floor(l / 7) + 1,
      dayIndex: l % 7
    };
  };

export const dayAt = (e, t) => e >= 0 && e <= 5 ? t[e] : null;

export const loadFromStorage = async e => {
    try {
      let t = localStorage.getItem(STORAGE_PREFIX + e);
      return t ? JSON.parse(t) : null;
    } catch {
      return null;
    }
  };

export const saveToStorage = async (e, t) => {
    try {
      localStorage.setItem(STORAGE_PREFIX + e, JSON.stringify(t));
    } catch {}
  };

