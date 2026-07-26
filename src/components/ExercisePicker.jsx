import React from 'react';
import { theme } from '../theme.js';
import { Badge, Divider, Icon, Label, PrimaryButton } from './ui.jsx';
import { EXERCISE_LIBRARY, MUSCLE_GROUPS } from '../constants.js';

export function ExerciseListItem({
  ex: e,
  inProgram: t,
  onSelect: l
}) {
  let n = {
    Chest: theme.push,
    Back: theme.pull,
    Shoulders: theme.pelo,
    Arms: "#06B6D4",
    Legs: theme.legs,
    Core: theme.phase,
    "Full Body": theme.sub
  }[e.muscle] || theme.muted;
  return <div onClick={() => l(e)} style={{
      display: "flex",
      alignItems: "center",
      gap: 10,
      padding: "10px 12px",
      background: theme.steel,
      borderRadius: 10,
      marginBottom: 6,
      cursor: "pointer",
      border: `1px solid ${t ? "rgba(16,185,129,0.25)" : theme.border}`,
      opacity: t ? 0.8 : 1
    }}>{<div style={{
      width: 4,
      height: 36,
      borderRadius: 3,
      background: n,
      flexShrink: 0
    }} />}{<div style={{
      flex: 1,
      minWidth: 0
    }}>{<div style={{
      fontSize: 13,
      fontWeight: 600,
      color: theme.text,
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap"
    }}>{e.name}</div>}{<div style={{
      fontSize: 10,
      color: theme.muted,
      marginTop: 2
    }}>{e.equip}{" · "}{e.sets}{"×"}{e.reps}</div>}</div>}{<div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-end",
      gap: 3,
      flexShrink: 0
    }}>{<Badge color={n} style={{
      fontSize: 8
    }}>{e.muscle}</Badge>}{t && <span style={{
      fontSize: 8,
      color: theme.legs
    }}>{"✓ In program"}</span>}</div>}</div>;
}

export function ExercisePicker({
  currentExercises: e,
  onSelect: t,
  onCustom: l,
  onClose: n
}) {
  let [i, a] = (0, React.useState)(""),
    [o, c] = (0, React.useState)("All"),
    f = new Set((e || []).map(p => p.id)),
    m = EXERCISE_LIBRARY.filter(p => {
      let h = o === "All" || p.muscle === o,
        E = !i || p.name.toLowerCase().includes(i.toLowerCase()) || p.equip.toLowerCase().includes(i.toLowerCase());
      return h && E;
    }),
    y = m.filter(p => f.has(p.id)),
    b = m.filter(p => !f.has(p.id));
  return <div style={{
      position: "fixed",
      inset: 0,
      background: theme.black,
      zIndex: 400,
      display: "flex",
      flexDirection: "column",
      fontFamily: "system-ui,sans-serif"
    }}>{<div style={{
      background: "rgba(13,13,15,0.97)",
      borderBottom: `1px solid ${theme.border}`,
      padding: "14px 16px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      flexShrink: 0
    }}>{<button onClick={n} style={{
      background: "none",
      border: "none",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      gap: 6,
      padding: 0
    }}>{<Icon name={"chevron-left"} size={20} color={theme.muted} />}{<span style={{
      fontSize: 13,
      color: theme.muted
    }}>{"Back"}</span>}</button>}{<div style={{
      fontSize: 15,
      fontWeight: 800,
      color: theme.text
    }}>{"Add Exercise"}</div>}{<button onClick={l} style={{
      background: "none",
      border: "none",
      cursor: "pointer",
      fontSize: 12,
      color: theme.pull,
      fontWeight: 700,
      fontFamily: "inherit"
    }}>{"Custom"}</button>}</div>}{<div style={{
      background: theme.carbon,
      borderBottom: `1px solid ${theme.border}`,
      padding: "10px 16px 0",
      flexShrink: 0
    }}>{<div style={{
      display: "flex",
      alignItems: "center",
      gap: 8,
      background: theme.steel,
      borderRadius: 10,
      border: `1px solid ${theme.border}`,
      padding: "8px 12px",
      marginBottom: 10
    }}>{<Icon name={"search"} size={16} color={theme.muted} />}{<input value={i} onChange={p => a(p.target.value)} placeholder={"Search exercises..."} autoFocus={true} style={{
      flex: 1,
      background: "none",
      border: "none",
      fontSize: 14,
      color: theme.text,
      outline: "none"
    }} />}{i && <button onClick={() => a("")} style={{
      background: "none",
      border: "none",
      cursor: "pointer",
      padding: 0
    }}>{<Icon name={"x"} size={14} color={theme.muted} />}</button>}</div>}{<div style={{
      display: "flex",
      gap: 6,
      overflowX: "auto",
      paddingBottom: 10,
      scrollbarWidth: "none",
      WebkitOverflowScrolling: "touch"
    }}>{MUSCLE_GROUPS.map(p => <button key={p} onClick={() => c(p)} style={{
      flexShrink: 0,
      padding: "5px 12px",
      borderRadius: 20,
      cursor: "pointer",
      background: o === p ? "rgba(59,130,246,0.2)" : theme.steel,
      border: `1.5px solid ${o === p ? theme.pull : theme.border}`,
      color: o === p ? theme.pull : theme.sub,
      fontSize: 11,
      fontWeight: o === p ? 700 : 400,
      fontFamily: "inherit"
    }}>{p}</button>)}</div>}</div>}{<div style={{
      flex: 1,
      overflowY: "auto",
      padding: "10px 16px 40px"
    }}>{y.length > 0 && <>{<Label style={{
      marginBottom: 6,
      color: theme.legs
    }}>{"Already in your program"}</Label>}{y.map(p => <ExerciseListItem key={p.id} ex={p} inProgram={true} onSelect={t} />)}{<Divider style={{
      margin: "10px 0"
    }} />}</>}{b.length > 0 && <>{<Label style={{
      marginBottom: 6
    }}>{"Library · "}{b.length}{" exercise"}{b.length !== 1 ? "s" : ""}</Label>}{b.map(p => <ExerciseListItem key={p.id} ex={p} onSelect={t} />)}</>}{m.length === 0 && <div style={{
      textAlign: "center",
      padding: "40px 0"
    }}>{<div style={{
      fontSize: 14,
      color: theme.muted,
      marginBottom: 16
    }}>{"No exercises match \""}{i}{"\""}</div>}{<PrimaryButton onClick={l} outline={true} color={theme.pull} style={{
      maxWidth: 220,
      margin: "0 auto"
    }}>{"Create Custom Exercise"}</PrimaryButton>}</div>}{m.length > 0 && <button onClick={l} style={{
      width: "100%",
      display: "flex",
      alignItems: "center",
      gap: 8,
      background: "none",
      border: `1px dashed ${theme.border}`,
      borderRadius: 10,
      padding: "12px 14px",
      cursor: "pointer",
      marginTop: 12,
      color: theme.muted,
      fontFamily: "inherit",
      fontSize: 13
    }}>{<Icon name={"plus"} size={16} color={theme.muted} />}{"Create custom exercise"}</button>}</div>}</div>;
}

