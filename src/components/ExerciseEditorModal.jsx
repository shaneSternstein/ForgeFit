import React from 'react';
import { theme } from '../theme.js';
import { Icon, Label, PrimaryButton } from './ui.jsx';
import { EQUIPMENT_TYPES } from '../constants.js';

export function ExerciseEditorModal({
  exercise: e,
  onSave: t,
  onClose: l
}) {
  let [n, i] = (0, React.useState)(e?.name || ""),
    [a, o] = (0, React.useState)(e?.equip || "Levergym"),
    [c, f] = (0, React.useState)(e?.sets || 3),
    [m, y] = (0, React.useState)(e?.reps || "8\u201312"),
    [b, p] = (0, React.useState)(e?.note || ""),
    h = () => {
      n.trim() && t({
        ...e,
        name: n.trim(),
        equip: a,
        sets: Number(c),
        reps: m,
        note: b
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
      maxHeight: "88vh",
      overflowY: "auto"
    }} onClick={E => E.stopPropagation()}>{<div style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 20
    }}>{<div style={{
      fontSize: 16,
      fontWeight: 800,
      color: theme.text
    }}>{e?.id ? "Edit Exercise" : "Add Exercise"}</div>}{<button onClick={l} style={{
      background: "none",
      border: "none",
      cursor: "pointer",
      padding: 4
    }}>{<Icon name={"x"} size={20} color={theme.muted} />}</button>}</div>}{<Label>{"Exercise Name"}</Label>}{<input value={n} onChange={E => i(E.target.value)} placeholder={"e.g. Flat Lever Bench Press"} style={{
      width: "100%",
      background: theme.steel,
      border: `1px solid ${n ? theme.pull : theme.border}`,
      borderRadius: 10,
      padding: "12px 14px",
      fontSize: 15,
      color: theme.text,
      marginBottom: 14,
      boxSizing: "border-box"
    }} />}{<Label>{"Equipment"}</Label>}{<div style={{
      display: "grid",
      gridTemplateColumns: "repeat(2,1fr)",
      gap: 6,
      marginBottom: 14
    }}>{EQUIPMENT_TYPES.map(E => <button key={E} onClick={() => o(E)} style={{
      background: a === E ? "rgba(59,130,246,0.15)" : theme.steel,
      border: `1.5px solid ${a === E ? theme.pull : theme.border}`,
      borderRadius: 8,
      padding: "9px 6px",
      cursor: "pointer",
      color: a === E ? theme.pull : theme.sub,
      fontSize: 12,
      fontFamily: "inherit",
      fontWeight: a === E ? 700 : 400
    }}>{E}</button>)}</div>}{<div style={{
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 10,
      marginBottom: 14
    }}>{<div>{<Label>{"Sets"}</Label>}{<input type={"number"} inputMode={"numeric"} value={c} onChange={E => f(E.target.value)} min={1} max={10} style={{
      width: "100%",
      background: theme.steel,
      border: `1px solid ${theme.border}`,
      borderRadius: 10,
      padding: "11px 12px",
      fontSize: 15,
      color: theme.text,
      fontFamily: "monospace",
      boxSizing: "border-box"
    }} />}</div>}{<div>{<Label>{"Target Reps"}</Label>}{<input value={m} onChange={E => y(E.target.value)} placeholder={"e.g. 8\u201312"} style={{
      width: "100%",
      background: theme.steel,
      border: `1px solid ${theme.border}`,
      borderRadius: 10,
      padding: "11px 12px",
      fontSize: 15,
      color: theme.text,
      fontFamily: "monospace",
      boxSizing: "border-box"
    }} />}</div>}</div>}{<Label>{"Coaching Note (optional)"}</Label>}{<input value={b} onChange={E => p(E.target.value)} placeholder={"e.g. Keep elbows tight"} style={{
      width: "100%",
      background: theme.steel,
      border: `1px solid ${theme.border}`,
      borderRadius: 10,
      padding: "12px 14px",
      fontSize: 14,
      color: theme.text,
      marginBottom: 20,
      boxSizing: "border-box"
    }} />}{<PrimaryButton onClick={h} disabled={!n.trim()}>{e?.id ? "Save Changes" : "Add Exercise"}</PrimaryButton>}</div>}</div>;
}

