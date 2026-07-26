import React from 'react';
import { addDays, dayAt, getToday, getWeekAndDay, isRoutineMode, makeRoutinePhase, parseDateKey, phaseForWeek, phaseKey, resolveCardio, startOfWeek, toDateKey } from '../utils.js';
import { CATEGORY_COLORS, theme } from '../theme.js';
import { Badge, Card, Label, PrimaryButton } from '../components/ui.jsx';

export function HomeScreen({
  settings: e,
  sessions: t,
  rides: l,
  days: n,
  navigate: i,
  phases: ph
}) {
  let a = parseDateKey(e.startDate),
    o = getToday(),
    {
      weekNum: c,
      dayIndex: f
    } = getWeekAndDay(a, o),
    m = isRoutineMode(c, ph, e),
    y = m ? makeRoutinePhase(ph) : phaseForWeek(c, ph),
    b = dayAt(f, n),
    p = toDateKey(o),
    h = 0;
  for (let d = 1; d <= 30; d++) {
    let r = toDateKey(addDays(o, -d)),
      v = dayAt(getWeekAndDay(a, parseDateKey(r)).dayIndex, n);
    if (v && t[r]) h++;else if (v) break;
  }
  let E = Object.values(t).reduce((d, r) => d + (r.prs || []).length, 0),
    T = startOfWeek(o),
    M = Array.from({
      length: 7
    }, (d, r) => toDateKey(addDays(T, r))).filter(d => l[d]).length;
  return <div style={{
      padding: "16px 16px 0",
      fontFamily: "system-ui,sans-serif"
    }}>{<div style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
      marginBottom: 16
    }}>{<div>{<div style={{
      fontSize: 11,
      color: theme.muted,
      fontFamily: "monospace",
      letterSpacing: "0.12em",
      textTransform: "uppercase",
      marginBottom: 4
    }}>{"ForgeFit"}</div>}{<div style={{
      fontSize: 22,
      fontWeight: 800,
      color: theme.text
    }}>{(() => {
    let d = (/* @__PURE__ */new Date()).getHours();
    return d < 12 ? "Good morning" : d < 17 ? "Good afternoon" : "Good evening";
  })()}{", Shane."}</div>}</div>}</div>}{m ? <div style={{
      background: "rgba(16,185,129,0.08)",
      border: "1px solid rgba(16,185,129,0.2)",
      borderRadius: 12,
      padding: "10px 14px",
      marginBottom: 12
    }}>{<div style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 4
    }}>{<span style={{
      fontSize: 10,
      fontFamily: "monospace",
      color: theme.legs,
      textTransform: "uppercase",
      letterSpacing: "0.12em"
    }}>{"Routine Mode · Week "}{c}</span>}{<span style={{
      fontSize: 10,
      fontFamily: "monospace",
      color: theme.legs,
      fontWeight: 700
    }}>{"Program Complete ✓"}</span>}</div>}{<div style={{
      fontSize: 11,
      color: theme.sub,
      lineHeight: 1.5
    }}>{"Running your Week 12 routine on repeat. Edit it anytime from the Program tab."}</div>}</div> : <div style={{
      background: "rgba(245,158,11,0.08)",
      border: "1px solid rgba(245,158,11,0.2)",
      borderRadius: 12,
      padding: "10px 14px",
      marginBottom: 12
    }}>{<div style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 6
    }}>{<span style={{
      fontSize: 10,
      fontFamily: "monospace",
      color: theme.phase,
      textTransform: "uppercase",
      letterSpacing: "0.12em"
    }}>{y.label}{" — Wk "}{c}</span>}{<span style={{
      fontSize: 11,
      fontWeight: 700,
      color: theme.phase
    }}>{c}{"/12"}</span>}</div>}{<div style={{
      height: 3,
      background: theme.border,
      borderRadius: 2,
      overflow: "hidden"
    }}>{<div style={{
      height: "100%",
      background: theme.phase,
      borderRadius: 2,
      width: `${(c - 1) / 12 * 100}%`,
      transition: "width 0.4s"
    }} />}</div>}{<div style={{
      fontSize: 11,
      color: theme.sub,
      marginTop: 6,
      lineHeight: 1.5
    }}>{y.weekFocus?.[(c - 1) % 4] || y.desc || ""}</div>}</div>}{<div style={{
      display: "grid",
      gridTemplateColumns: "repeat(3,1fr)",
      gap: 8,
      marginBottom: 12
    }}>{[{
    val: h,
    label: "Streak",
    color: theme.push
  }, {
    val: `${M}/${n.filter(Rd => resolveCardio(Rd, phaseKey(y))).length}`,
    label: "Cardio",
    color: theme.pelo
  }, {
    val: E,
    label: "PRs",
    color: theme.legs
  }].map(d => <div key={d.label} style={{
      background: theme.steel,
      borderRadius: 10,
      padding: "10px 8px",
      textAlign: "center",
      border: `1px solid ${theme.border}`
    }}>{<div style={{
      fontSize: 20,
      fontWeight: 800,
      fontFamily: "monospace",
      color: d.color,
      lineHeight: 1
    }}>{d.val}</div>}{<div style={{
      fontSize: 9,
      color: theme.muted,
      marginTop: 3,
      textTransform: "uppercase",
      letterSpacing: "0.1em"
    }}>{d.label}</div>}</div>)}</div>}{b ? <Card style={{
      border: `1px solid ${b.color || CATEGORY_COLORS[b.type]}44`
    }}>{<div style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
      marginBottom: 8
    }}>{<div>{<Label style={{
      marginBottom: 2
    }}>{"Today"}</Label>}{<div style={{
      fontSize: 17,
      fontWeight: 700,
      color: theme.text
    }}>{b.label}</div>}{<div style={{
      fontSize: 12,
      color: theme.sub
    }}>{b.exercises.length}{" exercises"}</div>}</div>}{<Badge color={b.color || CATEGORY_COLORS[b.type]}>{b.type.toUpperCase()}</Badge>}</div>}{<PrimaryButton onClick={() => i("sessions")} color={b.color || CATEGORY_COLORS[b.type]} outline={!!t[p]}>{t[p] ? "View Today's Session" : "Begin " + b.label}</PrimaryButton>}</Card> : <Card>{<div style={{
      fontSize: 16,
      fontWeight: 700,
      color: theme.text,
      marginBottom: 4
    }}>{"Rest Day"}</div>}{<div style={{
      fontSize: 12,
      color: theme.sub
    }}>{"Recovery is part of the program."}</div>}</Card>}</div>;
}

