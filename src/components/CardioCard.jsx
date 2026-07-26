import React from 'react';
import { ffCardioBuckets, ffCardioStats } from '../stats.js';
import { activityLabel, formatShortDate } from '../utils.js';
import { Card, Icon, Label } from './ui.jsx';
import { theme } from '../theme.js';
import { CARDIO_ACTIVITIES } from '../constants.js';

export function CardioCard({
  settings: e,
  rides: l
}) {
  let [cat, setCat] = (0, React.useState)("bike"),
    [period, setPeriod] = (0, React.useState)("3M"),
    [open, setOpen] = (0, React.useState)(false),
    [off, setOff] = (0, React.useState)(0),
    unit = e.unit === "kg" ? "km" : "mi",
    stats = ffCardioStats(period, cat, l, e, off),
    buckets = ffCardioBuckets(period, cat, l, e, off),
    maxV = Math.max(...buckets.map(b => b.total), 1e-3),
    catLbl = activityLabel(cat),
    rangeLbl = `${formatShortDate(stats.start)} \u2013 ${formatShortDate(stats.end)}, ${stats.end.getFullYear()}`,
    canNav = period !== "All",
    atCurrent = off >= 0;
  return <Card style={{
      marginBottom: 14,
      padding: "14px 14px 16px"
    }}>{<div style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 2
    }}>{<Label style={{
      marginBottom: 0
    }}>{"Cardio Distance"}</Label>}{<div style={{
      position: "relative"
    }}>{<button onClick={() => setOpen(!open)} style={{
      display: "flex",
      alignItems: "center",
      gap: 4,
      background: theme.carbon,
      border: `1px solid ${theme.border}`,
      borderRadius: 8,
      padding: "5px 9px",
      color: theme.text,
      fontSize: 12,
      fontFamily: "inherit",
      cursor: "pointer"
    }}>{catLbl}{<Icon name={"chevron-down"} size={12} color={theme.muted} />}</button>}{open && <div style={{
      position: "absolute",
      right: 0,
      top: 30,
      background: theme.carbon,
      border: `1px solid ${theme.border}`,
      borderRadius: 10,
      zIndex: 10,
      overflow: "hidden",
      minWidth: 110
    }}>{CARDIO_ACTIVITIES.map(c => <div key={c.k} onClick={() => {
      setCat(c.k), setOpen(false), setOff(0);
    }} style={{
      padding: "8px 12px",
      fontSize: 12,
      color: c.k === cat ? theme.pelo : theme.text,
      cursor: "pointer"
    }}>{c.l}</div>)}</div>}</div>}</div>}{<div style={{
      display: "flex",
      alignItems: "center",
      justifyContent: canNav ? "center" : "flex-start",
      gap: 8,
      marginBottom: 6
    }}>{canNav && <button onClick={() => setOff(off - 1)} style={{
      background: "none",
      border: "none",
      cursor: "pointer",
      padding: 2,
      display: "flex"
    }}>{<Icon name={"chevron-left"} size={14} color={theme.muted} />}</button>}{<div style={{
      fontSize: 11,
      color: theme.muted
    }}>{rangeLbl}</div>}{canNav && <button onClick={() => !atCurrent && setOff(off + 1)} disabled={atCurrent} style={{
      background: "none",
      border: "none",
      cursor: atCurrent ? "default" : "pointer",
      padding: 2,
      display: "flex",
      opacity: atCurrent ? 0.25 : 1
    }}>{<Icon name={"chevron-right"} size={14} color={theme.muted} />}</button>}</div>}{<div style={{
      display: "flex",
      alignItems: "baseline",
      gap: 6,
      marginBottom: 12
    }}>{<span style={{
      fontSize: 34,
      fontWeight: 800,
      color: theme.text,
      fontFamily: "monospace"
    }}>{stats.total}</span>}{<span style={{
      fontSize: 14,
      color: theme.muted
    }}>{unit}</span>}</div>}{<div style={{
      display: "flex",
      gap: 8,
      marginBottom: 14
    }}>{[["Weekly Avg", stats.weeklyAvg], ["Activity Avg", stats.activityAvg]].map(([lbl, v]) => <div key={lbl} style={{
      background: theme.carbon,
      borderRadius: 10,
      padding: "9px 12px",
      flex: 1,
      border: `1px solid ${theme.border}`
    }}>{<div style={{
      fontFamily: "monospace",
      fontSize: 15,
      fontWeight: 700,
      color: theme.text
    }}>{v}{" "}{<span style={{
      fontSize: 11,
      color: theme.muted,
      fontWeight: 400
    }}>{unit}</span>}</div>}{<div style={{
      fontSize: 10,
      color: theme.muted,
      marginTop: 2
    }}>{lbl}</div>}</div>)}</div>}{<svg viewBox={"0 0 300 90"} preserveAspectRatio={"none"} style={{
      width: "100%",
      height: 90,
      display: "block"
    }}>{buckets.map((b, i) => {
    let n = buckets.length,
      slot = 280 / n,
      bw = Math.max(slot * 0.55, 3),
      bx = 10 + i * slot + (slot - bw) / 2,
      bh = b.total > 0 ? b.total / maxV * 72 : 0,
      by = 82 - bh;
    return <rect key={i} x={bx} y={by} width={bw} height={bh} rx={2} fill={theme.pelo} />;
  })}</svg>}{<div style={{
      display: "flex",
      marginBottom: 14
    }}>{buckets.map((b, i) => <div key={i} style={{
      flex: 1,
      textAlign: "center",
      fontSize: 9,
      color: theme.muted,
      fontFamily: "monospace"
    }}>{b.label}</div>)}</div>}{<div style={{
      display: "flex",
      gap: 6
    }}>{["1W", "1M", "3M", "1Y", "All"].map(p => <button key={p} onClick={() => {
      setPeriod(p), setOff(0);
    }} style={{
      border: "none",
      cursor: "pointer",
      fontFamily: "monospace",
      fontSize: 11,
      fontWeight: 700,
      padding: "6px 11px",
      borderRadius: 999,
      background: p === period ? theme.text : "transparent",
      color: p === period ? theme.black : theme.muted
    }}>{p}</button>)}</div>}</Card>;
}

