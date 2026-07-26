import React from 'react';
import { addDays, formatShortDate, getToday, saveToStorage, startOfWeek, staticPhaseForWeek, toDateKey } from '../utils.js';
import { CATEGORY_COLORS, theme } from '../theme.js';
import { Badge, Card, Icon, Label, PrimaryButton } from './ui.jsx';
import { DEFAULT_PROGRAM_DAYS } from '../constants.js';

export function Onboarding({
  onComplete: e
}) {
  let [t, l] = (0, React.useState)(1),
    n = startOfWeek(getToday()),
    i = staticPhaseForWeek(t),
    [md, setMd] = (0, React.useState)(null),
    a = async () => {
      let o = toDateKey(addDays(n, -(t - 1) * 7)),
        c = {
          week: t,
          startDate: o,
          unit: "lbs",
          restTime: 90,
          mode: "program"
        };
      await saveToStorage("settings:user", c), e(c);
    },
    startRoutine = async () => {
      let c = {
        startDate: toDateKey(n),
        unit: "lbs",
        restTime: 90,
        mode: "routine"
      };
      await saveToStorage("settings:user", c), e(c);
    };
  if (!md) return <div style={{
      minHeight: "100vh",
      background: theme.black,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: 24,
      fontFamily: "system-ui,sans-serif"
    }}>{<div style={{
      maxWidth: 380,
      width: "100%"
    }}>{<div style={{
      textAlign: "center",
      marginBottom: 32
    }}>{<div style={{
      fontSize: 11,
      fontFamily: "monospace",
      letterSpacing: "0.2em",
      color: theme.push,
      textTransform: "uppercase",
      marginBottom: 12
    }}>{"ForgeFit"}</div>}{<div style={{
      fontSize: 28,
      fontWeight: 800,
      color: theme.text,
      lineHeight: 1.1,
      marginBottom: 8
    }}>{"Welcome, Shane."}</div>}{<div style={{
      fontSize: 14,
      color: theme.sub,
      lineHeight: 1.5
    }}>{"Would you like to follow a structured program, or just log freely?"}</div>}</div>}{<button onClick={() => setMd("program")} style={{
      width: "100%",
      textAlign: "left",
      background: theme.steel,
      border: `1.5px solid ${theme.border}`,
      borderRadius: 12,
      padding: "16px",
      cursor: "pointer",
      marginBottom: 12,
      fontFamily: "inherit"
    }}>{<div style={{
      fontSize: 15,
      fontWeight: 800,
      color: theme.text,
      marginBottom: 4
    }}>{"Start a Program"}</div>}{<div style={{
      fontSize: 12,
      color: theme.sub,
      lineHeight: 1.4
    }}>{"A phased, week-by-week plan with progressive overload."}</div>}</button>}{<button onClick={startRoutine} style={{
      width: "100%",
      textAlign: "left",
      background: theme.steel,
      border: `1.5px solid ${theme.border}`,
      borderRadius: 12,
      padding: "16px",
      cursor: "pointer",
      fontFamily: "inherit"
    }}>{<div style={{
      fontSize: 15,
      fontWeight: 800,
      color: theme.text,
      marginBottom: 4
    }}>{"Just a Routine"}</div>}{<div style={{
      fontSize: 12,
      color: theme.sub,
      lineHeight: 1.4
    }}>{"Log workouts and cardio on an ongoing basis — no set end date."}</div>}</button>}</div>}</div>;
  return <div style={{
      minHeight: "100vh",
      background: theme.black,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: 24,
      fontFamily: "system-ui,sans-serif"
    }}>{<div style={{
      maxWidth: 380,
      width: "100%"
    }}>{<div style={{
      textAlign: "center",
      marginBottom: 32
    }}>{<div style={{
      fontSize: 11,
      fontFamily: "monospace",
      letterSpacing: "0.2em",
      color: theme.push,
      textTransform: "uppercase",
      marginBottom: 12
    }}>{"ForgeFit"}</div>}{<div style={{
      fontSize: 28,
      fontWeight: 800,
      color: theme.text,
      lineHeight: 1.1,
      marginBottom: 8
    }}>{"Welcome, Shane."}</div>}{<div style={{
      fontSize: 14,
      color: theme.sub,
      lineHeight: 1.5
    }}>{"Which week of the program are you starting on?"}</div>}</div>}{<Label>{"Select your current week"}</Label>}{<div style={{
      display: "grid",
      gridTemplateColumns: "repeat(4,1fr)",
      gap: 6,
      marginBottom: 20
    }}>{Array.from({
    length: 12
  }, (o, c) => c + 1).map(o => {
    let c = o <= 4 ? theme.phase : o <= 8 ? theme.pull : theme.legs;
    return <button key={o} onClick={() => l(o)} style={{
        background: t === o ? c + "22" : theme.steel,
        border: `1.5px solid ${t === o ? c : theme.border}`,
        borderRadius: 8,
        padding: "10px 4px",
        cursor: "pointer",
        color: t === o ? c : theme.sub,
        fontWeight: 700,
        fontSize: 13,
        fontFamily: "inherit"
      }}>{o}</button>;
  })}</div>}{<Card style={{
      marginBottom: 16
    }}>{<div style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 4
    }}>{<Badge color={theme.phase}>{i.label}</Badge>}{<span style={{
      fontSize: 11,
      color: theme.sub
    }}>{"Weeks "}{i.weeks[0]}{"–"}{i.weeks[3]}</span>}</div>}{<div style={{
      fontSize: 12,
      color: theme.sub,
      marginBottom: 4
    }}>{i.desc}</div>}{<div style={{
      display: "flex",
      alignItems: "center",
      gap: 6,
      fontSize: 11,
      color: theme.pelo
    }}>{<Icon name={"bike"} size={13} color={theme.pelo} />}{" "}{i.rides}{" cardio/week"}</div>}</Card>}{<Label>{"This week starts"}</Label>}{<div style={{
      background: theme.steel,
      borderRadius: 10,
      border: `1px solid ${theme.border}`,
      overflow: "hidden",
      marginBottom: 20
    }}>{DEFAULT_PROGRAM_DAYS.map((o, c) => <div key={c} style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "8px 14px",
      borderBottom: c < 5 ? `1px solid ${theme.border}` : "none"
    }}>{<div style={{
      display: "flex",
      alignItems: "center",
      gap: 8
    }}>{<div style={{
      width: 7,
      height: 7,
      borderRadius: "50%",
      background: CATEGORY_COLORS[o.type]
    }} />}{<span style={{
      fontSize: 12,
      color: theme.text,
      fontWeight: 600
    }}>{o.label}</span>}</div>}{<span style={{
      fontSize: 11,
      color: theme.sub
    }}>{formatShortDate(addDays(n, c))}</span>}</div>)}{<div style={{
      display: "flex",
      justifyContent: "space-between",
      padding: "8px 14px"
    }}>{<div style={{
      display: "flex",
      alignItems: "center",
      gap: 8
    }}>{<div style={{
      width: 7,
      height: 7,
      borderRadius: "50%",
      background: theme.muted
    }} />}{<span style={{
      fontSize: 12,
      color: theme.muted
    }}>{"Rest"}</span>}</div>}{<span style={{
      fontSize: 11,
      color: theme.sub
    }}>{formatShortDate(addDays(n, 6))}</span>}</div>}</div>}{t > 1 && <div style={{
      background: "rgba(245,158,11,0.08)",
      border: "1px solid rgba(245,158,11,0.2)",
      borderRadius: 10,
      padding: "10px 14px",
      marginBottom: 16,
      display: "flex",
      gap: 8,
      alignItems: "flex-start"
    }}>{<Icon name={"info"} size={14} color={theme.phase} />}{<span style={{
      fontSize: 12,
      color: theme.phase
    }}>{"Past sessions show as \"Not logged.\" Fill them in anytime from the Sessions tab."}</span>}</div>}{<PrimaryButton onClick={a}>{"Start Week "}{t}</PrimaryButton>}</div>}</div>;
}

