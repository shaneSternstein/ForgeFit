import React from 'react';
import { ffStatsForPeriod } from '../stats.js';
import { formatShortDate } from '../utils.js';
import { Card, Label, StatRow } from './ui.jsx';
import { theme } from '../theme.js';

export function StatsCard({
  sessions: t,
  rides: l,
  settings: e
}) {
  let [period, setPeriod] = (0, React.useState)("30D"),
    stats = ffStatsForPeriod(period, t, l, e),
    rangeLbl = `${formatShortDate(stats.start)} \u2013 ${formatShortDate(stats.end)}, ${stats.end.getFullYear()}`;
  return <Card style={{
      marginBottom: 14,
      padding: "14px 14px 6px"
    }}>{<div style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 2
    }}>{<Label style={{
      marginBottom: 0
    }}>{"Stats"}</Label>}{<div style={{
      display: "flex",
      gap: 6
    }}>{["7D", "30D", "90D", "All"].map(p => <button key={p} onClick={() => setPeriod(p)} style={{
      border: "none",
      cursor: "pointer",
      fontFamily: "monospace",
      fontSize: 11,
      fontWeight: 700,
      padding: "5px 10px",
      borderRadius: 999,
      background: p === period ? theme.text : "transparent",
      color: p === period ? theme.black : theme.muted
    }}>{p}</button>)}</div>}</div>}{<div style={{
      fontSize: 11,
      color: theme.muted,
      marginBottom: 12
    }}>{rangeLbl}</div>}{<StatRow label={"Workouts"} value={stats.workouts} />}{<StatRow label={"Strength"} value={stats.strength} sub={true} />}{<StatRow label={"Cardio"} value={stats.cardio} sub={true} />}{<StatRow label={"Cardio Time"} value={`${stats.hrs}h ${stats.mins}m`} />}{<StatRow label={"Cardio Calories"} value={`${stats.cal} kcal`} />}{<div style={{
      height: 6
    }} />}</Card>;
}

