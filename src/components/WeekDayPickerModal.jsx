import React from 'react';
import { theme } from '../theme.js';

export function WeekDayPickerModal({
  weekNum: e,
  dayLabel: t,
  onPick: l,
  onClose: n
}) {
  return <div style={{
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.88)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "0 24px",
      zIndex: 400
    }} onClick={n}>{<div style={{
      background: theme.carbon,
      borderRadius: 16,
      padding: "24px 20px",
      width: "100%",
      border: `1px solid ${theme.border}`
    }} onClick={i => i.stopPropagation()}>{<div style={{
      fontSize: 15,
      fontWeight: 800,
      color: theme.text,
      marginBottom: 6
    }}>{"Edit "}{t}</div>}{<div style={{
      fontSize: 12,
      color: theme.muted,
      marginBottom: 20,
      lineHeight: 1.5
    }}>{"Apply your changes to all future weeks, or just Week "}{e}{"?"}</div>}{<div style={{
      display: "flex",
      flexDirection: "column",
      gap: 8
    }}>{<button onClick={() => l("template")} style={{
      background: "rgba(59,130,246,0.1)",
      border: `1.5px solid ${theme.pull}`,
      borderRadius: 10,
      padding: "12px 16px",
      cursor: "pointer",
      textAlign: "left",
      fontFamily: "inherit"
    }}>{<div style={{
      fontSize: 13,
      fontWeight: 700,
      color: theme.pull,
      marginBottom: 2
    }}>{"All future weeks (template)"}</div>}{<div style={{
      fontSize: 11,
      color: theme.muted
    }}>{"Changes apply to every unlogged session of this day going forward."}</div>}</button>}{<button onClick={() => l("week")} style={{
      background: "rgba(245,158,11,0.08)",
      border: `1.5px solid ${theme.phase}`,
      borderRadius: 10,
      padding: "12px 16px",
      cursor: "pointer",
      textAlign: "left",
      fontFamily: "inherit"
    }}>{<div style={{
      fontSize: 13,
      fontWeight: 700,
      color: theme.phase,
      marginBottom: 2
    }}>{"Week "}{e}{" only"}</div>}{<div style={{
      fontSize: 11,
      color: theme.muted
    }}>{"Creates a one-time override just for this week. Other weeks use the template."}</div>}</button>}</div>}{<button onClick={n} style={{
      width: "100%",
      background: "none",
      border: "none",
      marginTop: 14,
      color: theme.muted,
      fontSize: 13,
      cursor: "pointer",
      fontFamily: "inherit",
      padding: 8
    }}>{"Cancel"}</button>}</div>}</div>;
}

