import React from 'react';
import { getToday, toDateKey } from '../utils.js';
import { ffDayStatus, ffMonthGrid, ffStreaks } from '../stats.js';
import { Card, Icon, Label } from './ui.jsx';
import { theme } from '../theme.js';

export function CalCard({
  settings: e,
  days: n,
  overrides: ov,
  sessions: t,
  rides: l,
  phases: ph,
  monthOffset: mo,
  setMonthOffset: smo
}) {
  let today = getToday(),
    disp = new Date(today.getFullYear(), today.getMonth() + mo, 1),
    grid = ffMonthGrid(disp),
    rows = [];
  for (let i = 0; i < grid.length; i += 7) rows.push(grid.slice(i, i + 7));
  let {
      dayStreak,
      weekStreak
    } = ffStreaks(e, n, ov, t, l, ph),
    activeDays = grid.filter(c => c.inMonth && ffDayStatus(c.date, e, n, ov, t, l, ph) === "active").length,
    monthLabel = disp.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric"
    }),
    atCurrent = mo >= 0,
    sz = 30,
    cellBase = {
      width: sz,
      height: sz,
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 11,
      fontFamily: "monospace",
      margin: "0 auto"
    };
  return <Card style={{
      marginBottom: 14,
      padding: "14px 14px 16px"
    }}>{<div style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 10
    }}>{<Label style={{
      marginBottom: 0
    }}>{"Active Days"}</Label>}{<div style={{
      display: "flex",
      alignItems: "center",
      gap: 6
    }}>{<button onClick={() => smo(mo - 1)} style={{
      background: "none",
      border: "none",
      cursor: "pointer",
      padding: 2,
      display: "flex"
    }}>{<Icon name={"chevron-left"} size={14} color={theme.sub} />}</button>}{<span style={{
      fontSize: 11,
      fontFamily: "monospace",
      color: theme.text,
      minWidth: 76,
      textAlign: "center"
    }}>{monthLabel}</span>}{<button onClick={() => !atCurrent && smo(mo + 1)} disabled={atCurrent} style={{
      background: "none",
      border: "none",
      cursor: atCurrent ? "default" : "pointer",
      padding: 2,
      display: "flex",
      opacity: atCurrent ? 0.25 : 1
    }}>{<Icon name={"chevron-right"} size={14} color={theme.sub} />}</button>}</div>}</div>}{<div style={{
      display: "grid",
      gridTemplateColumns: "repeat(7,1fr)",
      marginBottom: 4
    }}>{["M", "T", "W", "T", "F", "S", "S"].map((d, i) => <div key={i} style={{
      textAlign: "center",
      fontSize: 9,
      color: theme.muted,
      fontFamily: "monospace",
      marginBottom: 4
    }}>{d}</div>)}</div>}{rows.map((row, ri) => <div key={ri} style={{
      display: "grid",
      gridTemplateColumns: "repeat(7,1fr)",
      marginBottom: 2
    }}>{row.map((cell, ci) => {
    if (!cell.inMonth) return <div key={ci} style={{
        ...cellBase,
        color: theme.muted,
        opacity: 0.35
      }}>{cell.date.getDate()}</div>;
    let st = ffDayStatus(cell.date, e, n, ov, t, l, ph),
      dnum = cell.date.getDate();
    if (st === "active") return <div key={ci} style={{
        ...cellBase,
        background: theme.pelo,
        color: "#fff",
        fontWeight: 700
      }}>{dnum}</div>;
    if (st === "missed") return <div key={ci} style={{
        ...cellBase,
        border: `1.5px dashed ${theme.muted}`,
        color: theme.sub
      }}>{dnum}</div>;
    if (toDateKey(cell.date) === toDateKey(today)) return <div key={ci} style={{
        ...cellBase,
        border: `2px solid ${theme.pelo}`,
        color: theme.pelo,
        fontWeight: 700
      }}>{dnum}</div>;
    return <div key={ci} style={{
        ...cellBase,
        background: theme.carbon,
        color: theme.muted
      }}>{dnum}</div>;
  })}</div>)}{<div style={{
      display: "flex",
      gap: 14,
      marginTop: 10,
      marginBottom: 16,
      flexWrap: "wrap"
    }}>{[["Active", theme.pelo, false], ["Rest", theme.carbon, false], ["Missed", theme.muted, true]].map(([lbl, clr, dash]) => <div key={lbl} style={{
      display: "flex",
      alignItems: "center",
      gap: 5
    }}>{<div style={{
      width: 10,
      height: 10,
      borderRadius: "50%",
      background: dash ? "transparent" : clr,
      border: dash ? `1.5px dashed ${clr}` : "none"
    }} />}{<span style={{
      fontSize: 10,
      color: theme.muted
    }}>{lbl}</span>}</div>)}</div>}{<div style={{
      display: "grid",
      gridTemplateColumns: "repeat(3,1fr)",
      gap: 8
    }}>{[{
    val: activeDays,
    label: "Active Days",
    color: theme.text
  }, {
    val: dayStreak,
    label: "Day Streak",
    color: theme.phase
  }, {
    val: weekStreak,
    label: "Week Streak",
    color: theme.legs
  }].map(st => <div key={st.label} style={{
      background: theme.carbon,
      borderRadius: 10,
      padding: "10px 8px",
      textAlign: "center",
      border: `1px solid ${theme.border}`
    }}>{<div style={{
      fontSize: 20,
      fontWeight: 800,
      fontFamily: "monospace",
      color: st.color
    }}>{st.val}</div>}{<div style={{
      fontSize: 9,
      color: theme.muted,
      marginTop: 3,
      textTransform: "uppercase",
      letterSpacing: "0.08em"
    }}>{st.label}</div>}</div>)}</div>}{<div style={{
      fontSize: 11,
      color: theme.muted,
      marginTop: 12,
      lineHeight: 1.5
    }}>{"Rest days don't break your streak — only a missed scheduled day does."}</div>}</Card>;
}

