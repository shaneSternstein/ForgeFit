import React from 'react';
import { activityLabel, addDays, formatShortDate, getToday, getWeekAndDay, isRoutineMode, makeRoutinePhase, parseDateKey, phaseKey, resolveCardio, resolveExercises, saveToStorage, startOfWeek, toDateKey, totalWeeks } from '../utils.js';
import { ProgramEditor } from './ProgramEditor.jsx';
import { Badge, Icon, Label } from '../components/ui.jsx';
import { CATEGORY_COLORS, theme } from '../theme.js';

export function ProgramScreen({
  settings: e,
  sessions: t,
  rides: l,
  days: n,
  overrides: i,
  onSaveDays: a,
  onSaveOverrides: o,
  phases: ph,
  onSavePhases: op,
  onSaveSettings: os
}) {
  let c = parseDateKey(e.startDate),
    f = getToday(),
    {
      weekNum: m
    } = getWeekAndDay(c, f),
    y = isRoutineMode(m, ph, e),
    [b, p] = (0, React.useState)(y ? m : Math.min(m, totalWeeks(ph))),
    [h, E] = (0, React.useState)(false),
    [Am, setAm] = (0, React.useState)(null),
    toRoutine = async () => {
      let d = {
        ...e,
        mode: "routine"
      };
      await saveToStorage("settings:user", d), os(d), setAm(null);
    },
    newProgram = async () => {
      let d = {
        ...e,
        mode: "program",
        startDate: toDateKey(startOfWeek(getToday()))
      };
      await saveToStorage("settings:user", d), os(d), await saveToStorage("program:overrides", {}), o({}), setAm(null);
    };
  return h ? <ProgramEditor days={n} overrides={i} sessions={t} settings={e} currentWeek={m} routine={y} phases={ph} onSave={(T, M, Pz) => {
      a(T), o(M), Pz && op(Pz);
    }} onClose={() => E(false)} /> : <div style={{
      padding: "16px 16px 0",
      fontFamily: "system-ui,sans-serif"
    }}>{<Label style={{
      marginBottom: 2
    }}>{"Program"}</Label>}{<div style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 14
    }}>{<div style={{
      fontSize: 20,
      fontWeight: 800,
      color: theme.text
    }}>{y ? "Routine" : `${totalWeeks(ph)}-Week Plan`}</div>}{<button onClick={() => E(true)} style={{
      background: "rgba(59,130,246,0.1)",
      border: "1px solid rgba(59,130,246,0.3)",
      borderRadius: 9,
      padding: "7px 14px",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      gap: 6,
      color: theme.pull,
      fontSize: 12,
      fontWeight: 700,
      fontFamily: "inherit"
    }}>{<Icon name={"edit"} size={14} color={theme.pull} />}{y ? "Edit Routine" : "Edit Program"}</button>}{<button onClick={() => setAm("menu")} style={{
      background: theme.steel,
      border: `1px solid ${theme.border}`,
      borderRadius: 9,
      padding: "7px 10px",
      cursor: "pointer",
      color: theme.sub,
      fontSize: 14,
      fontWeight: 700,
      fontFamily: "inherit",
      marginLeft: 6
    }}>{"⋯"}</button>}</div>}{Am === "menu" && <div style={{
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.85)",
      display: "flex",
      alignItems: "flex-end",
      justifyContent: "center",
      zIndex: 500
    }} onClick={() => setAm(null)}>{<div style={{
      background: theme.carbon,
      borderRadius: "20px 20px 0 0",
      padding: "20px 20px 32px",
      width: "100%",
      maxWidth: 480,
      border: `1px solid ${theme.border}`
    }} onClick={B => B.stopPropagation()}>{<div style={{
      fontSize: 15,
      fontWeight: 800,
      color: theme.text,
      marginBottom: 14
    }}>{"Program Actions"}</div>}{!y && <button onClick={() => setAm("routine")} style={{
      width: "100%",
      textAlign: "left",
      background: theme.steel,
      border: "1px solid rgba(168,85,247,0.3)",
      borderRadius: 10,
      padding: "13px 14px",
      cursor: "pointer",
      marginBottom: 8,
      fontFamily: "inherit"
    }}>{<div style={{
      fontSize: 13,
      fontWeight: 700,
      color: theme.pelo,
      marginBottom: 2
    }}>{"Switch to Routine Mode"}</div>}{<div style={{
      fontSize: 11,
      color: theme.sub
    }}>{"Stop following the phased plan, log on an ongoing basis"}</div>}</button>}{<button onClick={() => setAm("newprogram")} style={{
      width: "100%",
      textAlign: "left",
      background: theme.steel,
      border: "1px solid rgba(59,130,246,0.3)",
      borderRadius: 10,
      padding: "13px 14px",
      cursor: "pointer",
      marginBottom: 8,
      fontFamily: "inherit"
    }}>{<div style={{
      fontSize: 13,
      fontWeight: 700,
      color: theme.pull,
      marginBottom: 2
    }}>{"Start New Program"}</div>}{<div style={{
      fontSize: 11,
      color: theme.sub
    }}>{"Reset your week count back to Week 1, starting today"}</div>}</button>}{<button onClick={() => setAm(null)} style={{
      width: "100%",
      background: "none",
      border: "none",
      padding: "10px",
      color: theme.muted,
      fontSize: 13,
      cursor: "pointer",
      fontFamily: "inherit"
    }}>{"Cancel"}</button>}</div>}</div>}{(Am === "routine" || Am === "newprogram") && <div style={{
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.88)",
      display: "flex",
      alignItems: "flex-end",
      justifyContent: "center",
      zIndex: 500
    }} onClick={() => setAm(null)}>{<div style={{
      background: theme.carbon,
      borderRadius: "20px 20px 0 0",
      padding: "24px 20px 32px",
      width: "100%",
      maxWidth: 480,
      border: `1px solid ${theme.border}`
    }} onClick={B => B.stopPropagation()}>{<div style={{
      fontSize: 16,
      fontWeight: 800,
      color: theme.text,
      marginBottom: 8
    }}>{Am === "routine" ? "Switch to Routine Mode?" : "Start New Program?"}</div>}{<div style={{
      fontSize: 13,
      color: theme.sub,
      lineHeight: 1.5,
      marginBottom: 20
    }}>{Am === "routine" ? "You'll stop following the phased program and just work through your exercises and cardio on an ongoing basis. You can start a new program anytime." : "This resets your week count back to Week 1 starting today. Your logged history stays exactly as it is \u2014 only the week numbering going forward changes."}</div>}{<div style={{
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 8
    }}>{<button onClick={() => setAm(null)} style={{
      background: theme.steel,
      border: `1px solid ${theme.border}`,
      borderRadius: 10,
      padding: "12px",
      color: theme.text,
      fontSize: 14,
      fontWeight: 700,
      cursor: "pointer",
      fontFamily: "inherit"
    }}>{"Cancel"}</button>}{<button onClick={() => Am === "routine" ? toRoutine() : newProgram()} style={{
      background: Am === "routine" ? "rgba(168,85,247,0.2)" : "rgba(59,130,246,0.2)",
      border: `1px solid ${Am === "routine" ? "rgba(168,85,247,0.4)" : "rgba(59,130,246,0.4)"}`,
      borderRadius: 10,
      padding: "12px",
      color: Am === "routine" ? theme.pelo : theme.pull,
      fontSize: 14,
      fontWeight: 700,
      cursor: "pointer",
      fontFamily: "inherit"
    }}>{Am === "routine" ? "Switch" : "Start New Program"}</button>}</div>}</div>}</div>}{y && <div style={{
      background: "rgba(16,185,129,0.08)",
      border: "1px solid rgba(16,185,129,0.2)",
      borderRadius: 12,
      padding: "10px 14px",
      marginBottom: 14
    }}>{<div style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 4
    }}>{<span style={{
      fontSize: 10,
      fontFamily: "monospace",
      color: theme.legs,
      textTransform: "uppercase",
      letterSpacing: "0.12em"
    }}>{"Program Complete"}</span>}{<Badge color={theme.legs} style={{
      fontSize: 9
    }}>{"Routine Mode · Wk "}{m}</Badge>}</div>}{<div style={{
      fontSize: 12,
      color: theme.sub,
      lineHeight: 1.5
    }}>{"You've finished the 12-week program. Your routine repeats weekly from Week 12. Use Edit Routine (coming soon) to swap exercises or adjust sets."}</div>}</div>}{(() => {
    if (y) {
      let RT = makeRoutinePhase(ph),
        _ = addDays(c, (m - 1) * 7);
      return <div style={{
          marginBottom: 16
        }}>{n.map((A, S) => {
        let D = addDays(_, S),
          q = toDateKey(D),
          j = !!t[q],
          H = q === toDateKey(f),
          K = i[q]?.exercises || resolveExercises(A, phaseKey(RT)),
          Dv = j ? t[q] : i[q] && i[q].label ? i[q] : A,
          ze = Dv.color || CATEGORY_COLORS[Dv.type] || theme.muted,
          Cd = i[q] && "cardio" in i[q] ? i[q].cardio : resolveCardio(A, phaseKey(RT));
        return <div key={S} style={{
            marginBottom: 6,
            background: j ? "rgba(16,185,129,0.05)" : H ? "rgba(255,255,255,0.03)" : theme.steel + "66",
            border: `1px solid ${j ? theme.legs + "33" : H ? theme.white + "22" : theme.border}`,
            borderRadius: 9,
            padding: "8px 10px"
          }}>{<div style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 4
          }}>{<div style={{
            width: 7,
            height: 7,
            borderRadius: "50%",
            background: j ? theme.legs : ze,
            flexShrink: 0
          }} />}{<div style={{
            fontSize: 12,
            fontWeight: 700,
            color: j ? theme.legs : H ? theme.text : theme.sub
          }}>{["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][S]}{" · "}{Dv.label}</div>}{j && <span style={{
            marginLeft: "auto",
            fontSize: 10,
            color: theme.legs,
            fontFamily: "monospace"
          }}>{"✓ logged"}</span>}{H && !j && <span style={{
            marginLeft: "auto",
            fontSize: 10,
            color: theme.phase,
            fontFamily: "monospace"
          }}>{"today"}</span>}</div>}{<div style={{
            fontSize: 10,
            color: theme.muted,
            lineHeight: 1.7,
            paddingLeft: 15
          }}>{K.length > 0 ? K.map(Q => Q.name).join(" \xB7 ") : <span style={{
            fontStyle: "italic"
          }}>{"No exercises set"}</span>}</div>}{<div style={{
            fontSize: 10,
            color: theme.pelo,
            lineHeight: 1.7,
            paddingLeft: 15
          }}>{Cd ? `${activityLabel(Cd.activity)} \xB7 ${Cd.label || "No description"}` : "No cardio"}</div>}</div>;
      })}{(() => {
        let RD = n[6] || {
            type: "rest"
          },
          Rq = toDateKey(addDays(_, 6)),
          Ri = i[Rq],
          RCd = Ri && "cardio" in Ri ? Ri.cardio : resolveCardio(RD, phaseKey(RT));
        return <div style={{
            background: theme.steel + "44",
            border: `1px solid ${theme.border}`,
            borderRadius: 9,
            padding: "8px 10px"
          }}>{<div style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 4
          }}>{<div style={{
            width: 7,
            height: 7,
            borderRadius: "50%",
            background: theme.muted
          }} />}{<div style={{
            fontSize: 12,
            color: theme.muted
          }}>{"Sun · Rest"}</div>}{l[Rq] && <span style={{
            marginLeft: "auto",
            fontSize: 10,
            color: theme.pelo
          }}>{"🚴 rode"}</span>}</div>}{<div style={{
            fontSize: 10,
            color: theme.pelo,
            lineHeight: 1.7,
            paddingLeft: 15
          }}>{RCd ? `${activityLabel(RCd.activity)} \xB7 ${RCd.label || "No description"}` : "No cardio"}</div>}</div>;
      })()}</div>;
    }
    let PW = (() => {
      let cur = 1;
      return ph.map(P => {
        let r = {
          ph: P,
          Ws: cur,
          We: cur + P.weeks - 1
        };
        cur += P.weeks;
        return r;
      });
    })();
    return PW.map(({
      ph: T,
      Ws,
      We
    }, Pi) => <div key={T.id} style={{
        marginBottom: 16
      }}>{!y && <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 8
      }}>{<Badge color={[theme.phase, theme.pull, theme.legs, theme.pelo][Pi % 4]}>{T.name}</Badge>}{<span style={{
        fontSize: 11,
        color: theme.muted
      }}>{"Wks "}{Ws}{"–"}{We}</span>}</div>}{Array.from({
      length: We - Ws + 1
    }, (Ai, Bi) => Ws + Bi).map(M => {
      let d = M === m,
        r = M < m,
        v = b === M,
        g = [theme.phase, theme.pull, theme.legs, theme.pelo][Pi % 4],
        _ = addDays(c, (M - 1) * 7),
        O = n.map((A, S) => t[toDateKey(addDays(_, S))] ? 1 : 0).reduce((A, S) => A + S, 0),
        z = Array.from({
          length: 7
        }, (A, S) => toDateKey(addDays(_, S))).filter(A => l[A]).length,
        Tr = n.filter(A => resolveCardio(A, phaseKey(T))).length;
      return <div key={M} style={{
          background: d ? theme.steel : r ? "rgba(16,185,129,0.04)" : theme.carbon,
          borderRadius: 12,
          marginBottom: 6,
          overflow: "hidden",
          border: `1.5px solid ${d ? g + "55" : r ? "rgba(16,185,129,0.2)" : theme.border}`,
          opacity: !d && !r && M > m ? 0.6 : 1
        }}>{<div onClick={() => p(v ? null : M)} style={{
          padding: "11px 14px",
          cursor: "pointer"
        }}>{<div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 6
        }}>{<div style={{
          display: "flex",
          alignItems: "center",
          gap: 8
        }}>{<div style={{
          fontSize: 14,
          fontWeight: 700,
          color: d ? theme.text : r ? theme.sub : theme.muted
        }}>{"Week "}{M}</div>}{d && <Badge color={g} style={{
          fontSize: 9
        }}>{"Current"}</Badge>}{r && !d && <span style={{
          fontSize: 10,
          color: theme.legs
        }}>{"✓"}</span>}</div>}{<div style={{
          display: "flex",
          alignItems: "center",
          gap: 8
        }}>{<span style={{
          fontSize: 11,
          color: theme.muted
        }}>{formatShortDate(_)}</span>}{<Icon name={v ? "chevron-left" : "chevron-right"} size={14} color={theme.muted} />}</div>}</div>}{<div style={{
          display: "flex",
          gap: 12,
          marginBottom: 8
        }}>{<div style={{
          display: "flex",
          alignItems: "center",
          gap: 4,
          fontSize: 11,
          color: O === 6 ? theme.legs : theme.muted
        }}>{<Icon name={"dumbbell"} size={12} color={O === 6 ? theme.legs : theme.muted} />}{" "}{O}{"/6"}</div>}{<div style={{
          display: "flex",
          alignItems: "center",
          gap: 4,
          fontSize: 11,
          color: z >= Tr ? theme.pelo : theme.muted
        }}>{<Icon name={"bike"} size={12} color={z >= Tr ? theme.pelo : theme.muted} />}{" "}{z}{"/"}{Tr}</div>}</div>}{<div style={{
          display: "grid",
          gridTemplateColumns: "repeat(7,1fr)",
          gap: 3
        }}>{n.map((A, S) => {
        let D = addDays(_, S),
          Dk = toDateKey(D),
          K = t[Dk],
          Pv = i[Dk] && i[Dk].label ? i[Dk] : A,
          j = Dk === toDateKey(f),
          Ac = Pv.color || CATEGORY_COLORS[Pv.type];
        return <div key={S} style={{
            height: 18,
            borderRadius: 4,
            background: K ? (K.color || CATEGORY_COLORS[K.type]) + "33" : Ac + "22",
            border: `1.5px solid ${K ? K.color || CATEGORY_COLORS[K.type] : j ? theme.white + "55" : Ac + "55"}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 7,
            fontWeight: 700,
            color: K ? K.color || CATEGORY_COLORS[K.type] : Ac,
            fontFamily: "monospace"
          }}>{K ? "\u2713" : (Pv.label ? Pv.label[0] : Pv.type[0]).toUpperCase()}</div>;
      })}</div>}{<div style={{
          display: "flex",
          gap: 3,
          marginTop: 3
        }}>{["M", "T", "W", "T", "F", "S", "S"].map((A, S) => <div key={S} style={{
          flex: 1,
          textAlign: "center",
          fontSize: 7,
          color: theme.muted,
          fontFamily: "monospace"
        }}>{A}</div>)}</div>}</div>}{v && <div style={{
          borderTop: `1px solid ${theme.border}`,
          padding: "10px 14px 14px",
          background: theme.black + "66"
        }}>{n.map((A, S) => {
        let D = addDays(_, S),
          q = toDateKey(D),
          j = !!t[q],
          H = q === toDateKey(f),
          K = i[q]?.exercises || resolveExercises(A, phaseKey(T)),
          Dv = j ? t[q] : i[q] && i[q].label ? i[q] : A,
          ze = Dv.color || CATEGORY_COLORS[Dv.type] || theme.muted,
          Cd = i[q] && "cardio" in i[q] ? i[q].cardio : resolveCardio(A, phaseKey(T));
        return <div key={S} style={{
            marginBottom: 6,
            background: j ? "rgba(16,185,129,0.05)" : H ? "rgba(255,255,255,0.03)" : theme.steel + "66",
            border: `1px solid ${j ? theme.legs + "33" : H ? theme.white + "22" : theme.border}`,
            borderRadius: 9,
            padding: "8px 10px"
          }}>{<div style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 4
          }}>{<div style={{
            width: 7,
            height: 7,
            borderRadius: "50%",
            background: j ? theme.legs : ze,
            flexShrink: 0
          }} />}{<div style={{
            fontSize: 12,
            fontWeight: 700,
            color: j ? theme.legs : H ? theme.text : theme.sub
          }}>{["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][S]}{" · "}{Dv.label}</div>}{j && <span style={{
            marginLeft: "auto",
            fontSize: 10,
            color: theme.legs,
            fontFamily: "monospace"
          }}>{"✓ logged"}</span>}{H && !j && <span style={{
            marginLeft: "auto",
            fontSize: 10,
            color: theme.phase,
            fontFamily: "monospace"
          }}>{"today"}</span>}</div>}{<div style={{
            fontSize: 10,
            color: theme.muted,
            lineHeight: 1.7,
            paddingLeft: 15
          }}>{K.length > 0 ? K.map(Q => Q.name).join(" \xB7 ") : <span style={{
            fontStyle: "italic"
          }}>{"No exercises set"}</span>}</div>}{<div style={{
            fontSize: 10,
            color: theme.pelo,
            lineHeight: 1.7,
            paddingLeft: 15
          }}>{Cd ? `${activityLabel(Cd.activity)} \xB7 ${Cd.label || "No description"}` : "No cardio"}</div>}</div>;
      })}{(() => {
        let RD = n[6] || {
            type: "rest"
          },
          Rq = toDateKey(addDays(_, 6)),
          Ri = i[Rq],
          RCd = Ri && "cardio" in Ri ? Ri.cardio : resolveCardio(RD, phaseKey(T));
        return <div style={{
            background: theme.steel + "44",
            border: `1px solid ${theme.border}`,
            borderRadius: 9,
            padding: "8px 10px"
          }}>{<div style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 4
          }}>{<div style={{
            width: 7,
            height: 7,
            borderRadius: "50%",
            background: theme.muted
          }} />}{<div style={{
            fontSize: 12,
            color: theme.muted
          }}>{"Sun · Rest"}</div>}{l[Rq] && <span style={{
            marginLeft: "auto",
            fontSize: 10,
            color: theme.pelo
          }}>{"🚴 rode"}</span>}</div>}{<div style={{
            fontSize: 10,
            color: theme.pelo,
            lineHeight: 1.7,
            paddingLeft: 15
          }}>{RCd ? `${activityLabel(RCd.activity)} \xB7 ${RCd.label || "No description"}` : "No cardio"}</div>}</div>;
      })()}</div>}</div>;
    })}</div>);
  })()}</div>;
}

