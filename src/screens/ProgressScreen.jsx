import React from 'react';
import { dayAt, formatWeekdayShort, getToday, getWeekAndDay, parseDateKey, phaseForWeek, phaseKey, resolveExercises } from '../utils.js';
import { ffExMeta, ffTrainedExercises } from '../stats.js';
import { EXERCISE_LIBRARY, MUSCLE_GROUPS } from '../constants.js';
import { Badge, Card, Icon, Label } from '../components/ui.jsx';
import { CATEGORY_COLORS, theme } from '../theme.js';
import { CalCard } from '../components/CalCard.jsx';
import { CardioCard } from '../components/CardioCard.jsx';
import { StatsCard } from '../components/StatsCard.jsx';

export function ProgressScreen({
  settings: e,
  sessions: t,
  rides: l,
  days: n,
  overrides: ov,
  phases: ph
}) {
  let i = parseDateKey(e.startDate),
    a = getToday(),
    {
      weekNum: o
    } = getWeekAndDay(i, a),
    [f, m] = (0, React.useState)("weeks"),
    [y, b] = (0, React.useState)(null),
    [p, h] = (0, React.useState)(null),
    [CMo, SCMo] = (0, React.useState)(0),
    [MG, setMG] = (0, React.useState)(null),
    [EO, SEO] = (0, React.useState)("day"),
    trainedAll = ffTrainedExercises(n, t),
    mgList = [...MUSCLE_GROUPS.filter(D => D !== "All"), "Other"].map(nm2 => ({
      name: nm2,
      exs: trainedAll.filter(D => D.muscle === nm2)
    })).filter(D => D.exs.length > 0),
    V = () => <div style={{
        padding: "16px 16px 0",
        fontFamily: "system-ui,sans-serif"
      }}>{<Label style={{
        marginBottom: 2
      }}>{"Progress"}</Label>}{<div style={{
        fontSize: 20,
        fontWeight: 800,
        color: theme.text,
        marginBottom: 14
      }}>{"Your Gains"}</div>}{<CalCard settings={e} days={n} overrides={ov} sessions={t} rides={l} phases={ph} monthOffset={CMo} setMonthOffset={SCMo} />}{<CardioCard settings={e} rides={l} />}{<Card style={{
        marginBottom: 14,
        padding: "14px 14px 6px"
      }}>{<Label style={{
        marginBottom: 10
      }}>{"Strength by Muscle Group"}</Label>}{mgList.length ? mgList.map(gp => <div key={gp.name} onClick={() => {
        setMG(gp.name), m("group");
      }} style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "12px 2px",
        borderBottom: `1px solid ${theme.border}`,
        cursor: "pointer"
      }}>{<span style={{
        fontSize: 14,
        fontWeight: 700,
        color: theme.text
      }}>{gp.name}</span>}{<div style={{
        display: "flex",
        alignItems: "center",
        gap: 6,
        color: theme.muted
      }}>{<span style={{
        fontSize: 11,
        fontFamily: "monospace"
      }}>{gp.exs.length}{" exercises"}</span>}{<span style={{
        fontSize: 12
      }}>{"›"}</span>}</div>}</div>) : <div style={{
        fontSize: 12,
        color: theme.muted,
        padding: "6px 2px 12px"
      }}>{"Log a session to see exercise history here."}</div>}</Card>}</div>;
  if (f === "weeks") return <div style={{
      fontFamily: "system-ui,sans-serif"
    }}>{<V />}{<div style={{
      padding: "0 16px"
    }}>{<StatsCard sessions={t} rides={l} settings={e} />}</div>}</div>;
  if (f === "day" && y) {
    let g = t[y],
      _ = parseDateKey(y),
      {
        weekNum: Wk,
        dayIndex: O
      } = getWeekAndDay(i, _),
      z = dayAt(O, n),
      A = l[y],
      Dv = g ? {
        label: g.label,
        type: g.type,
        color: g.color
      } : ov[y] && ov[y].label ? ov[y] : z,
      Ex = ov[y] && ov[y].exercises ? ov[y].exercises : z ? resolveExercises(z, phaseKey(phaseForWeek(Wk, ph))) : [];
    return <div style={{
        padding: "16px 16px 0",
        fontFamily: "system-ui,sans-serif"
      }}>{<button onClick={() => m("weeks")} style={{
        background: "none",
        border: "none",
        color: theme.muted,
        fontSize: 13,
        cursor: "pointer",
        padding: "0 0 12px",
        display: "flex",
        alignItems: "center",
        gap: 4,
        fontFamily: "inherit"
      }}>{<Icon name={"chevron-left"} size={16} color={theme.muted} />}{" All Weeks"}</button>}{<div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: 12
      }}>{<div>{<Label style={{
        marginBottom: 2
      }}>{formatWeekdayShort(_)}</Label>}{<div style={{
        fontSize: 20,
        fontWeight: 800,
        color: theme.text
      }}>{Dv?.label || "Rest"}</div>}</div>}{Dv && <Badge color={Dv.color || CATEGORY_COLORS[Dv.type]}>{Dv.type.toUpperCase()}</Badge>}</div>}{g ? <>{<div style={{
        display: "grid",
        gridTemplateColumns: "repeat(3,1fr)",
        gap: 8,
        marginBottom: 14
      }}>{[{
      val: Object.keys(g.exercises || {}).length,
      label: "Exercises",
      color: theme.text
    }, {
      val: Object.values(g.exercises || {}).flat().filter(S => S.done).length,
      label: "Sets",
      color: theme.legs
    }, {
      val: (g.prs || []).length,
      label: "PRs",
      color: theme.push
    }].map(S => <div key={S.label} style={{
        background: theme.steel,
        borderRadius: 10,
        padding: "10px 8px",
        textAlign: "center",
        border: `1px solid ${theme.border}`
      }}>{<div style={{
        fontSize: 20,
        fontWeight: 800,
        fontFamily: "monospace",
        color: S.color
      }}>{S.val}</div>}{<div style={{
        fontSize: 9,
        color: theme.muted,
        textTransform: "uppercase",
        letterSpacing: "0.08em",
        marginTop: 2
      }}>{S.label}</div>}</div>)}</div>}{<Label>{"Exercises"}</Label>}{<Card style={{
        padding: 0,
        overflow: "hidden"
      }}>{Ex.map((S, D) => {
      let j = (g.exercises?.[S.id] || []).filter(ze => ze.done),
        H = Math.max(...j.map(ze => parseFloat(ze.weight) || 0), 0),
        K = (g.prs || []).some(ze => ze.exId === S.id);
      return <div key={S.id} onClick={() => {
          h(S.id), SEO("day"), m("exercise");
        }} style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px 14px",
          borderBottom: D < Ex.length - 1 ? `1px solid ${theme.border}` : "none",
          cursor: "pointer",
          background: K ? "rgba(233,69,96,0.04)" : "transparent"
        }}>{<div>{<div style={{
          fontSize: 13,
          fontWeight: 700,
          color: theme.text
        }}>{S.name}</div>}{<div style={{
          fontSize: 10,
          color: theme.muted,
          marginTop: 2
        }}>{j.map(ze => `${ze.weight}\xD7${ze.reps}`).join(" \xB7 ")}</div>}</div>}{<div style={{
          textAlign: "right",
          display: "flex",
          alignItems: "center",
          gap: 4
        }}>{<div style={{
          fontSize: 12,
          fontFamily: "monospace",
          color: K ? theme.push : theme.sub,
          fontWeight: 700
        }}>{H > 0 ? `${H}${S.id === "plank" ? "secs" : e.unit || "lbs"}` : ""}</div>}{K && <Icon name={"trophy"} size={12} color={theme.push} />}{<span style={{
          fontSize: 9,
          color: theme.muted
        }}>{"›"}</span>}</div>}</div>;
    })}</Card>}</> : <Card style={{
        textAlign: "center"
      }}>{<div style={{
        fontSize: 14,
        color: theme.muted
      }}>{"Session not logged"}</div>}{<div style={{
        fontSize: 11,
        color: theme.muted,
        marginTop: 4
      }}>{"Go to Sessions tab to fill this in."}</div>}</Card>}{A && <Card style={{
        background: "rgba(168,85,247,0.06)",
        border: "1px solid rgba(168,85,247,0.2)",
        marginTop: 8
      }}>{<div style={{
        display: "flex",
        alignItems: "center",
        gap: 6,
        marginBottom: 4
      }}>{<Icon name={"bike"} size={13} color={theme.pelo} />}{<Label style={{
        marginBottom: 0,
        color: theme.pelo
      }}>{"Ride"}</Label>}</div>}{<div style={{
        fontSize: 13,
        fontWeight: 700,
        color: theme.text
      }}>{A.type}</div>}{<div style={{
        fontSize: 11,
        color: theme.muted
      }}>{A.duration}{" min · Effort "}{A.effort}{"/10"}</div>}{A.output && <div style={{
        fontSize: 11,
        color: theme.pelo,
        marginTop: 2
      }}>{A.output}{" cal"}</div>}</Card>}</div>;
  }
  if (f === "exercise" && p) {
    let g = ffExMeta(n)[p] || EXERCISE_LIBRARY.find(D => D.id === p),
      _ = Object.entries(t).filter(([, D]) => D.exercises?.[p]?.some(q => q.done)).sort(([D], [q]) => D.localeCompare(q)).map(([D, q]) => {
        let j = q.exercises[p].filter(K => K.done),
          H = Math.max(...j.map(K => parseFloat(K.weight) || 0));
        return {
          key: D,
          date: parseDateKey(D),
          sets: j,
          topW: H
        };
      }),
      O = Math.max(..._.map(D => D.topW), 1),
      z = Math.min(..._.map(D => D.topW), 0),
      A = _.reduce((D, q) => q.topW > D.topW ? q : D, _[0]),
      S = _.length > 1 ? A.topW - _[0].topW : 0;
    return <div style={{
        padding: "16px 16px 0",
        fontFamily: "system-ui,sans-serif"
      }}>{<button onClick={() => m(EO === "group" ? "group" : "day")} style={{
        background: "none",
        border: "none",
        color: theme.muted,
        fontSize: 13,
        cursor: "pointer",
        padding: "0 0 12px",
        display: "flex",
        alignItems: "center",
        gap: 4,
        fontFamily: "inherit"
      }}>{<Icon name={"chevron-left"} size={16} color={theme.muted} />}{" Back"}</button>}{<div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: 14
      }}>{<div>{<Label style={{
        marginBottom: 2
      }}>{"Exercise Trend"}</Label>}{<div style={{
        fontSize: 17,
        fontWeight: 800,
        color: theme.text,
        lineHeight: 1.2
      }}>{g?.name}</div>}{<div style={{
        fontSize: 11,
        color: theme.muted,
        marginTop: 2
      }}>{g?.equip}</div>}</div>}{A && <Icon name={"trophy"} size={20} color={theme.push} />}</div>}{_.length >= 2 ? <div style={{
        background: theme.steel,
        borderRadius: 12,
        padding: "12px",
        border: `1px solid ${theme.border}`,
        marginBottom: 12
      }}>{<Label style={{
        marginBottom: 8
      }}>{"Top Set Weight ("}{p === "plank" ? "secs" : e.unit || "lbs"}{")"}</Label>}{<svg viewBox={"0 0 300 80"} preserveAspectRatio={"none"} style={{
        width: "100%",
        height: 80
      }}>{[0.25, 0.5, 0.75].map(D => <line key={D} x1={"0"} y1={80 - D * 70} x2={"300"} y2={80 - D * 70} stroke={theme.border} strokeWidth={"0.5"} />)}{<polygon points={[..._.map((D, q) => `${q / (_.length - 1) * 280 + 10},${80 - (D.topW - z) / (O - z || 1) * 65}`), "290,80", "10,80"].join(" ")} fill={`${theme.push}15`} />}{<polyline points={_.map((D, q) => `${q / (_.length - 1) * 280 + 10},${80 - (D.topW - z) / (O - z || 1) * 65}`).join(" ")} fill={"none"} stroke={theme.push} strokeWidth={"2"} strokeLinecap={"round"} strokeLinejoin={"round"} />}{_.map((D, q) => {
      let j = q / (_.length - 1) * 280 + 10,
        H = 80 - (D.topW - z) / (O - z || 1) * 65,
        K = D.topW === O;
      return <g key={q}>{K && <circle cx={j} cy={H} r={7} fill={"none"} stroke={theme.push} strokeWidth={"1"} opacity={"0.4"} />}{<circle cx={j} cy={H} r={K ? 4 : 2.5} fill={K ? theme.push : theme.muted} />}{K && <text x={j - 8} y={H - 8} fontSize={"6"} fill={theme.push} fontFamily={"monospace"} fontWeight={"bold"}>{D.topW}{" PR"}</text>}</g>;
    })}{<text x={"2"} y={"77"} fontSize={"6"} fill={theme.muted} fontFamily={"monospace"}>{z}</text>}{<text x={"2"} y={"12"} fontSize={"6"} fill={theme.muted} fontFamily={"monospace"}>{O}</text>}</svg>}</div> : <Card>{<div style={{
        color: theme.muted,
        fontSize: 13
      }}>{"Log more sessions to see your trend."}</div>}</Card>}{_.length > 0 && <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(3,1fr)",
        gap: 8,
        marginBottom: 12
      }}>{[{
      val: `${A?.topW || 0}`,
      label: "PR",
      color: theme.push
    }, {
      val: S > 0 ? `+${S}` : `${S}`,
      label: "Total Gain",
      color: theme.legs
    }, {
      val: _.length,
      label: "Sessions",
      color: theme.pull
    }].map(D => <div key={D.label} style={{
        background: theme.steel,
        borderRadius: 10,
        padding: "10px 8px",
        textAlign: "center",
        border: `1px solid ${theme.border}`
      }}>{<div style={{
        fontSize: 18,
        fontWeight: 800,
        fontFamily: "monospace",
        color: D.color
      }}>{D.val}</div>}{<div style={{
        fontSize: 8,
        color: theme.muted,
        textTransform: "uppercase",
        letterSpacing: "0.08em",
        marginTop: 2
      }}>{D.label}</div>}</div>)}</div>}{<Label>{"Session Log"}</Label>}{_.slice().reverse().slice(0, 5).map(D => <Card key={D.key} style={{
        marginBottom: 6
      }}>{<div style={{
        display: "flex",
        justifyContent: "space-between",
        marginBottom: 4
      }}>{<div style={{
        fontSize: 12,
        fontWeight: 700,
        color: theme.text
      }}>{formatWeekdayShort(D.date)}</div>}{<div style={{
        fontSize: 12,
        fontFamily: "monospace",
        color: theme.push,
        fontWeight: 700
      }}>{D.topW}{p === "plank" ? "secs" : e.unit || "lbs"}</div>}</div>}{<div style={{
        fontSize: 10,
        color: theme.muted,
        lineHeight: 1.6
      }}>{D.sets.map((q, j) => `${j + 1}: ${q.weight}\xD7${q.reps}`).join("  \xB7  ")}</div>}</Card>)}</div>;
  }
  if (f === "group" && MG) {
    let trained = ffTrainedExercises(n, t).filter(D => D.muscle === MG),
      setsLogged = trained.reduce((a2, D) => a2 + D.log.reduce((a22, en) => a22 + en.sets.length, 0), 0),
      atPR = trained.filter(D => {
        let mx = Math.max(...D.log.map(en => en.topW));
        return D.log[D.log.length - 1].topW === mx;
      }).length;
    return <div style={{
        padding: "16px 16px 0",
        fontFamily: "system-ui,sans-serif"
      }}>{<button onClick={() => m("weeks")} style={{
        background: "none",
        border: "none",
        color: theme.muted,
        fontSize: 13,
        cursor: "pointer",
        padding: "0 0 12px",
        display: "flex",
        alignItems: "center",
        gap: 4,
        fontFamily: "inherit"
      }}>{<Icon name={"chevron-left"} size={16} color={theme.muted} />}{" All Muscle Groups"}</button>}{<div style={{
        fontSize: 20,
        fontWeight: 800,
        color: theme.text,
        marginBottom: 12
      }}>{MG}</div>}{<div style={{
        display: "grid",
        gridTemplateColumns: "repeat(3,1fr)",
        gap: 8,
        marginBottom: 14
      }}>{[{
      val: trained.length,
      label: "Exercises",
      color: theme.text
    }, {
      val: setsLogged,
      label: "Sets Logged",
      color: theme.legs
    }, {
      val: atPR,
      label: "At PR",
      color: theme.push
    }].map(S => <div key={S.label} style={{
        background: theme.steel,
        borderRadius: 10,
        padding: "10px 8px",
        textAlign: "center",
        border: `1px solid ${theme.border}`
      }}>{<div style={{
        fontSize: 20,
        fontWeight: 800,
        fontFamily: "monospace",
        color: S.color
      }}>{S.val}</div>}{<div style={{
        fontSize: 9,
        color: theme.muted,
        textTransform: "uppercase",
        letterSpacing: "0.08em",
        marginTop: 2
      }}>{S.label}</div>}</div>)}</div>}{<Label>{"Exercises"}</Label>}{<Card style={{
        padding: 0,
        overflow: "hidden"
      }}>{trained.map((o2, D) => {
      let last = o2.log[o2.log.length - 1],
        mx = Math.max(...o2.log.map(en => en.topW)),
        atP = last.topW === mx;
      return <div key={o2.id} onClick={() => {
          h(o2.id), SEO("group"), m("exercise");
        }} style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px 14px",
          borderBottom: D < trained.length - 1 ? `1px solid ${theme.border}` : "none",
          cursor: "pointer",
          background: atP ? "rgba(233,69,96,0.04)" : "transparent"
        }}>{<div>{<div style={{
          fontSize: 13,
          fontWeight: 700,
          color: theme.text
        }}>{o2.name}</div>}{<div style={{
          fontSize: 10,
          color: theme.muted,
          marginTop: 2
        }}>{last.sets.map(S => `${S.weight}\xD7${S.reps}`).join(" \xB7 ")}</div>}</div>}{<div style={{
          textAlign: "right",
          display: "flex",
          alignItems: "center",
          gap: 4
        }}>{<div style={{
          fontSize: 12,
          fontFamily: "monospace",
          color: atP ? theme.push : theme.sub,
          fontWeight: 700
        }}>{last.topW > 0 ? `${last.topW}${o2.id === "plank" ? "secs" : e.unit || "lbs"}` : ""}</div>}{atP && <Icon name={"trophy"} size={12} color={theme.push} />}{<span style={{
          fontSize: 9,
          color: theme.muted
        }}>{"›"}</span>}</div>}</div>;
    })}</Card>}</div>;
  }
  return null;
}

