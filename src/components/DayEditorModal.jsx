import React from 'react';
import { CATEGORY_COLORS, theme } from '../theme.js';
import { COLOR_PALETTE, WEEKDAY_NAMES } from '../constants.js';
import { Icon, Label, PrimaryButton } from './ui.jsx';

export function DayEditorModal({
  day: e,
  onSave: t,
  onClose: l
}) {
  let [n, i] = (0, React.useState)(e.label || ""),
    [a, o] = (0, React.useState)(e.color || CATEGORY_COLORS[e.type] || theme.push),
    [c, f] = (0, React.useState)(e.dayName || WEEKDAY_NAMES[e.dayOfWeek - 1] || "Sunday"),
    m = () => {
      n.trim() && t({
        ...e,
        label: n.trim(),
        color: a,
        dayName: c
      });
    };
  return <div style={{
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.88)",
      display: "flex",
      alignItems: "flex-end",
      zIndex: 400
    }} onClick={l}>{<div style={{
      background: theme.carbon,
      borderRadius: "20px 20px 0 0",
      padding: "24px 20px 44px",
      width: "100%",
      border: `1px solid ${theme.border}`,
      maxHeight: "80vh",
      overflowY: "auto"
    }} onClick={y => y.stopPropagation()}>{<div style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 20
    }}>{<div style={{
      fontSize: 16,
      fontWeight: 800,
      color: theme.text
    }}>{"Edit Day"}</div>}{<button onClick={l} style={{
      background: "none",
      border: "none",
      cursor: "pointer",
      padding: 4
    }}>{<Icon name={"x"} size={20} color={theme.muted} />}</button>}</div>}{<Label>{"Day of Week"}</Label>}{<div style={{
      display: "grid",
      gridTemplateColumns: "repeat(4,1fr)",
      gap: 5,
      marginBottom: 14
    }}>{WEEKDAY_NAMES.map(y => <button key={y} onClick={() => f(y)} style={{
      background: c === y ? a + "22" : theme.steel,
      border: `1.5px solid ${c === y ? a : theme.border}`,
      borderRadius: 7,
      padding: "7px 4px",
      cursor: "pointer",
      color: c === y ? a : theme.sub,
      fontSize: 10,
      fontFamily: "inherit",
      fontWeight: c === y ? 700 : 400
    }}>{y.slice(0, 3)}</button>)}</div>}{<Label>{"Session Label"}</Label>}{<input value={n} onChange={y => i(y.target.value)} placeholder={"e.g. Push A, Upper Body, Chest Day"} style={{
      width: "100%",
      background: theme.steel,
      border: `1px solid ${n ? a : theme.border}`,
      borderRadius: 10,
      padding: "12px 14px",
      fontSize: 15,
      color: theme.text,
      marginBottom: 14,
      boxSizing: "border-box"
    }} />}{<Label>{"Color"}</Label>}{<div style={{
      display: "flex",
      gap: 8,
      flexWrap: "wrap",
      marginBottom: 20
    }}>{COLOR_PALETTE.map(y => <button key={y.value} onClick={() => o(y.value)} style={{
      width: 36,
      height: 36,
      borderRadius: "50%",
      background: y.value,
      border: `3px solid ${a === y.value ? theme.white : "transparent"}`,
      cursor: "pointer",
      outline: "none",
      boxShadow: a === y.value ? `0 0 0 1px ${y.value}` : ""
    }} />)}</div>}{<div style={{
      background: a + "15",
      border: `1px solid ${a}44`,
      borderRadius: 10,
      padding: "10px 14px",
      marginBottom: 16,
      display: "flex",
      alignItems: "center",
      gap: 10
    }}>{<div style={{
      width: 10,
      height: 10,
      borderRadius: "50%",
      background: a
    }} />}{<div style={{
      fontSize: 13,
      fontWeight: 700,
      color: theme.text
    }}>{n || "Session Label"}</div>}{<div style={{
      fontSize: 10,
      color: theme.muted,
      marginLeft: "auto"
    }}>{c}</div>}</div>}{<PrimaryButton onClick={m} color={a} disabled={!n.trim()}>{"Save Day"}</PrimaryButton>}</div>}</div>;
}

