import React from 'react';
import { ffStrengthBuckets, ffStrengthStats } from '../stats.js';
import { formatShortDate } from '../utils.js';
import { Card, Icon, Label } from './ui.jsx';
import { theme } from '../theme.js';

export function StrengthCard({
  settings: e,
  sessions: t,
  days: n,
  overrides: ov,
  phases: ph
}) {
  let [period, setPeriod] = (0, React.useState)("3M"),
    [off, setOff] = (0, React.useState)(0),
    unit = e.unit || "lbs",
    stats = ffStrengthStats(period, t, e, off),
    buckets = ffStrengthBuckets(period, t, e, off, n, ov, ph),
    maxV = Math.max(...buckets.map(b => b.total), 1e-3),
    rangeLbl = `${formatShortDate(stats.start)} \u2013 ${formatShortDate(stats.end)}, ${stats.end.getFullYear()}`,
    canNav = period !== "All",
    atCurrent = off >= 0,
    showStatus = period === "1W";
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
    }}>{"Strength Volume"}</Label>}</div>}{<div style={{
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
    }}>{stats.total.toLocaleString()}</span>}{<span style={{
      fontSize: 14,
      color: theme.muted
    }}>{unit}{" total"}</span>}</div>}{<div style={{
      display: "flex",
      gap: 8,
      marginBottom: 14
    }}>{[["Weekly Avg", stats.weeklyAvg], ["Per Session", stats.sessionAvg]].map(([lbl, v]) => <div key={lbl} style={{
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
    }}>{v.toLocaleString()}{" "}{<span style={{
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
    let barCount = buckets.length,
      slot = 280 / barCount,
      bw = Math.max(slot * 0.55, 3),
      bx = 10 + i * slot + (slot - bw) / 2,
      hasVolume = b.total > 0,
      bh = hasVolume ? b.total / maxV * 72 : showStatus && b.status !== "future" && b.status !== "before" ? 3 : 0,
      by = 82 - bh,
      fill = hasVolume ? theme.push : b.status === "missed" ? theme.muted : theme.border;
    return <rect key={i} x={bx} y={by} width={bw} height={bh} rx={2} fill={fill} opacity={hasVolume ? 1 : b.status === "missed" ? 0.6 : 0.4} />;
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
