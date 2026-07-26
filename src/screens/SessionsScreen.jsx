import React from 'react';
import { activityLabel, addDays, dayAt, formatWeekdayLong, getToday, getWeekAndDay, isRoutineMode, makeRoutinePhase, parseDateKey, phaseForWeek, phaseKey, resolveCardio, resolveExercises, startOfWeek, toDateKey } from '../utils.js';
import { CATEGORY_COLORS, theme } from '../theme.js';
import { Badge, Card, Divider, Icon, Label, PrimaryButton } from '../components/ui.jsx';
import { CARDIO_ACTIVITIES } from '../constants.js';

export function SessionsScreen({
  days: e,
  overrides: t,
  settings: l,
  sessions: n,
  rides: i,
  sessionDraft: a,
  setSessionDraft: o,
  onSaveSession: c,
  onSaveRide: f,
  timerRunning: m,
  setTimerRunning: y,
  timerVal: b,
  setTimerVal: p,
  timerRef: h,
  timerPaused: E,
  setTimerPaused: T,
  phases: ph,
  exerciseNotes: XN,
  onSaveExerciseNotes: XNSet,
  bumpTimer: Tb
}) {
  let M = parseDateKey(l.startDate),
    d = addDays(parseDateKey(l.startDate), 0),
    [r, v] = (0, React.useState)(0),
    g = addDays(getToday(), r),
    {
      weekNum: _,
      dayIndex: O
    } = getWeekAndDay(M, g),
    z = toDateKey(g),
    A = dayAt(O, e),
    S = A && t[z] ? {
      ...A,
      ...t[z]
    } : A;
  S = S && n[z] ? {
    ...S,
    label: n[z].label,
    type: n[z].type,
    color: n[z].color
  } : S;
  let D = isRoutineMode(_, ph, l),
    q = D ? makeRoutinePhase(ph) : phaseForWeek(_, ph);
  S = S ? {
    ...S,
    exercises: t[z] && t[z].exercises ? t[z].exercises : resolveExercises(A, phaseKey(q))
  } : S;
  let j = r === 0,
    H = r > 0,
    K = H,
    ze = startOfWeek(parseDateKey(l.startDate)),
    Q = toDateKey(g) <= toDateKey(ze),
    Me = a[z] || {},
    Le = () => Me.exSets || {},
    Zt = () => Me.finished || !!n[z]?.finished;
  (0, React.useEffect)(() => {
    if (!S || a[z]?.exSets) return;
    let C = n[z],
      V = {};
    S.exercises.forEach($ => {
      if (C?.exercises?.[$.id]) V[$.id] = C.exercises[$.id];else {
        let be = toDateKey(addDays(g, -7)),
          w = n[be]?.exercises?.[$.id] || [];
        V[$.id] = Array.from({
          length: $.sets
        }, (ne, he) => ({
          weight: w[he]?.weight || "",
          reps: "",
          done: false
        }));
      }
    }), o($ => ({
      ...$,
      [z]: {
        ...Me,
        exSets: V,
        finished: !!C?.finished
      }
    }));
  }, [z]);
  let Ve = C => {
      o(V => {
        let $ = V[z] || {};
        return {
          ...V,
          [z]: C($)
        };
      });
    },
    Bt = Le(),
    Vt = Zt() && !Me.editing,
    EdS = () => Ve(V => ({
      ...V,
      editing: true
    })),
    [ma, Ut] = (0, React.useState)(null);
  (0, React.useEffect)(() => {
    S && !ma && Ut(S.exercises[0]?.id || null);
  }, [z, S?.id]);
  let pa = (0, React.useCallback)(C => {
      clearInterval(h.current), p(C), T(false), y(true), Tb(Q2 => Q2 + 1);
    }, []),
    ga = C => {
      p(V => Math.max(0, V + C)), m || (T(false), y(true));
    },
    ya = () => {
      clearInterval(h.current), y(false), T(false), p(l.setRestTime || 60);
    },
    lo = () => {
      E ? T(false) : (clearInterval(h.current), T(true));
    },
    [swKey, setSwKey] = (0, React.useState)(null),
    [swStart, setSwStart] = (0, React.useState)(0),
    swToggle = Ky => {
      if (swKey === Ky) {
        let el = Math.max(1, Math.round((Date.now() - swStart) / 1e3));
        setSwKey(null);
        let pIdx = Ky.lastIndexOf(":"),
          exId = Ky.slice(0, pIdx),
          idx = Number(Ky.slice(pIdx + 1));
        va(exId, idx, "weight", String(el)), setTimeout(() => oi(exId, idx), 0);
      } else setSwKey(Ky), setSwStart(Date.now());
    },
    [noteEditId, setNoteEditId] = (0, React.useState)(null),
    [noteDraft, setNoteDraft] = (0, React.useState)(""),
    startNote = exId => {
      setNoteEditId(exId), setNoteDraft(XN[exId] || "");
    },
    saveNote = () => {
      let nd = noteDraft.trim(),
        Nx = {
          ...XN
        };
      nd ? Nx[noteEditId] = nd : delete Nx[noteEditId], XNSet(Nx), setNoteEditId(null);
    },
    clearNote = exId => {
      if (!XN[exId]) return;
      let Nx = {
        ...XN
      };
      delete Nx[exId], XNSet(Nx), noteEditId === exId && setNoteEditId(null);
    },
    va = (C, V, $, be) => {
      Ve(w => {
        let ne = [...(w.exSets?.[C] || [])];
        return ne[V] = {
          ...ne[V],
          [$]: be
        }, {
          ...w,
          exSets: {
            ...w.exSets,
            [C]: ne
          }
        };
      });
    },
    oi = (C, V) => {
      Vt || Ve($ => {
        let be = [...($.exSets?.[C] || [])],
          w = be[V];
        if (!w?.weight && C !== "plank" && C !== "farmer_carry" || !w?.weight) return $;
        be[V] = {
          ...w,
          done: true
        };
        let he = be.every(Ct => Ct.done) ? l.exRestTime || 120 : l.setRestTime || 60;
        return l.autoStartTimer !== false ? pa(he) : p(he), {
          ...$,
          exSets: {
            ...$.exSets,
            [C]: be
          }
        };
      });
    },
    no = (C, V) => {
      Ve($ => {
        let be = ($.exSets?.[C] || []).map(w => ({
          ...w,
          weight: V
        }));
        return {
          ...$,
          exSets: {
            ...$.exSets,
            [C]: be
          }
        };
      });
    },
    B = C => {
      Ve(V => {
        let $ = [...(V.exSets?.[C] || []), {
          weight: "",
          reps: "",
          done: false
        }];
        return {
          ...V,
          exSets: {
            ...V.exSets,
            [C]: $
          }
        };
      });
    },
    U = (C, V) => {
      Ve($ => {
        let be = [...($.exSets?.[C] || [])];
        return be.splice(V, 1), {
          ...$,
          exSets: {
            ...$.exSets,
            [C]: be
          }
        };
      });
    },
    L = async () => {
      if (!S) return;
      let C = [];
      S.exercises.forEach(V => {
        let $ = Bt[V.id] || [],
          be = Math.max(...$.filter(ne => ne.done && ne.weight).map(ne => parseFloat(ne.weight) || 0), 0);
        if (!be) return;
        let w = Object.entries(n).filter(([ne]) => ne < z).map(([, ne]) => Math.max(...(ne?.exercises?.[V.id] || []).map(he => parseFloat(he.weight) || 0), 0));
        be > Math.max(...w, 0) && C.push({
          exId: V.id,
          name: V.name,
          weight: be
        });
      }), await c(z, {
        dayId: S.id,
        label: S.label,
        type: S.type,
        color: S.color || CATEGORY_COLORS[S.type],
        exercises: Bt,
        prs: C,
        finished: true,
        backfill: !j,
        savedAt: Date.now()
      }), Ve(V => ({
        ...V,
        finished: true,
        editing: false
      }));
    },
    N = i[z],
    P = t[z] && "cardio" in t[z] ? t[z].cardio : resolveCardio(A, `ph${q.id}`),
    [Z, ce] = (0, React.useState)(false),
    [_e, Ql] = (0, React.useState)(P?.activity || "bike"),
    [$e, ml] = (0, React.useState)(""),
    [Ht, pn] = (0, React.useState)(""),
    [Kt, ha] = (0, React.useState)(""),
    [si, io] = (0, React.useState)(5),
    Fc = l.unit === "kg" ? "km" : "mi",
    W0 = async () => {
      await f(z, {
        type: _e,
        duration: $e,
        output: Ht,
        distance: Kt,
        effort: si,
        savedAt: Date.now()
      }), ce(false);
    };
  (0, React.useEffect)(() => {
    Z || Ql(P?.activity || "bike");
  }, [z]), F0 = String(Math.floor(b / 60)).padStart(2, "0"), $0 = String(b % 60).padStart(2, "0"), R0 = S ? S.exercises.filter(C => (Bt[C.id] || []).some(V => V.done)).length : 0;
  return <div style={{
      fontFamily: "system-ui,sans-serif",
      paddingTop: m ? 106 : 54,
      transition: "padding-top 0.2s"
    }}>{<div style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "14px 16px 0",
      marginBottom: 8,
      gap: 8
    }}>{<button onClick={() => {
      Q || (v(C => C - 1), Ut(null));
    }} disabled={Q} style={{
      background: theme.steel,
      border: `1px solid ${theme.border}`,
      borderRadius: 8,
      padding: 8,
      cursor: Q ? "not-allowed" : "pointer",
      opacity: Q ? 0.3 : 1,
      display: "flex",
      alignItems: "center"
    }}>{<Icon name={"chevron-left"} size={18} color={theme.sub} />}</button>}{<div style={{
      textAlign: "center",
      flex: 1
    }}>{<div style={{
      fontSize: 13,
      fontWeight: 700,
      color: theme.text
    }}>{j ? "Today" : formatWeekdayLong(g)}</div>}{<div style={{
      fontSize: 10,
      color: theme.muted,
      fontFamily: "monospace"
    }}>{D ? `Routine \xB7 Wk ${_}` : `Week ${_}`}{" · "}{S?.label || "Rest"}</div>}</div>}{<button onClick={() => {
      v(C => C + 1), Ut(null);
    }} style={{
      background: theme.steel,
      border: `1px solid ${theme.border}`,
      borderRadius: 8,
      padding: 8,
      cursor: "pointer",
      display: "flex",
      alignItems: "center"
    }}>{<Icon name={"chevron-right"} size={18} color={theme.sub} />}</button>}</div>}{<div style={{
      position: "fixed",
      top: 56,
      left: 0,
      right: 0,
      zIndex: 50,
      background: "rgba(13,13,15,0.96)",
      borderBottom: "1px solid rgba(168,85,247,0.35)",
      backdropFilter: "blur(12px)",
      padding: "8px 16px",
      boxShadow: "0 4px 20px rgba(0,0,0,0.4)"
    }}>{m ? <>{<div style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 6
    }}>{<div style={{
      display: "flex",
      alignItems: "center",
      gap: 6
    }}>{<Icon name={"timer"} size={14} color={theme.pelo} />}{<span style={{
      fontSize: 10,
      color: theme.pelo,
      fontFamily: "monospace",
      textTransform: "uppercase",
      letterSpacing: "0.1em"
    }}>{E ? "Paused" : "Rest"}</span>}</div>}{<span style={{
      fontSize: 30,
      fontWeight: 800,
      fontFamily: "monospace",
      color: E ? theme.muted : theme.pelo,
      letterSpacing: "0.05em",
      lineHeight: 1
    }}>{F0}{":"}{$0}</span>}{<div style={{
      display: "flex",
      gap: 6,
      alignItems: "center"
    }}>{<button onClick={lo} style={{
      background: E ? "rgba(168,85,247,0.2)" : "rgba(255,255,255,0.06)",
      border: `1px solid ${E ? theme.pelo : theme.border}`,
      borderRadius: 7,
      padding: "5px 10px",
      color: E ? theme.pelo : theme.sub,
      fontSize: 11,
      cursor: "pointer",
      fontFamily: "monospace",
      fontWeight: 700
    }}>{E ? "Resume" : "Pause"}</button>}{<button onClick={ya} style={{
      background: "none",
      border: "none",
      cursor: "pointer",
      padding: 4
    }}>{<Icon name={"x"} size={16} color={theme.muted} />}</button>}</div>}</div>}{<div style={{
      display: "flex",
      gap: 5
    }}>{[-30, -15, 15, 30].map(C => <button key={C} onClick={() => ga(C)} style={{
      flex: 1,
      background: theme.steel,
      border: `1px solid ${theme.border}`,
      borderRadius: 7,
      padding: "4px 2px",
      color: theme.sub,
      fontSize: 10,
      cursor: "pointer",
      fontFamily: "monospace",
      fontWeight: 700
    }}>{C > 0 ? "+" : ""}{C}{"s"}</button>)}</div>}</> : <div style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }}>{<div style={{
      display: "flex",
      alignItems: "center",
      gap: 6
    }}>{<Icon name={"timer"} size={14} color={theme.muted} />}{<span style={{
      fontSize: 10,
      color: theme.muted,
      fontFamily: "monospace",
      textTransform: "uppercase",
      letterSpacing: "0.1em"
    }}>{"Rest Timer"}</span>}</div>}{<button onClick={() => pa(b || l.setRestTime || 60)} style={{
      background: "rgba(168,85,247,0.15)",
      border: `1px solid ${theme.pelo}`,
      borderRadius: 7,
      padding: "6px 14px",
      color: theme.pelo,
      fontSize: 11,
      cursor: "pointer",
      fontFamily: "monospace",
      fontWeight: 700
    }}>{"Start"}</button>}</div>}</div>}{<div style={{
      padding: "0 16px"
    }}>{H && S && <div style={{
      marginTop: 12
    }}>{<div style={{
      background: "rgba(245,158,11,0.08)",
      border: "1px solid rgba(245,158,11,0.2)",
      borderRadius: 10,
      padding: "8px 14px",
      marginBottom: 10,
      fontSize: 12,
      color: theme.phase,
      display: "flex",
      alignItems: "center",
      gap: 6
    }}>{<Icon name={"info"} size={13} color={theme.phase} />}{"Future session — view only. Come back on the day to log it."}</div>}{S.exercises.map(C => <div key={C.id} style={{
      background: theme.steel,
      borderRadius: 12,
      padding: "11px 13px",
      marginBottom: 6,
      border: `1px solid ${theme.border}`,
      opacity: 0.6
    }}>{<div style={{
      fontSize: 13,
      fontWeight: 700,
      color: theme.text
    }}>{C.name}</div>}{<div style={{
      fontSize: 10,
      color: theme.muted,
      marginTop: 2
    }}>{C.equip}{" · "}{C.sets}{"×"}{C.reps}</div>}</div>)}</div>}{H && !S && <Card style={{
      textAlign: "center",
      marginTop: 12
    }}>{<div style={{
      fontSize: 14,
      fontWeight: 700,
      color: theme.text,
      marginBottom: 4
    }}>{"Rest Day"}</div>}{<div style={{
      fontSize: 12,
      color: theme.sub
    }}>{"No session planned."}</div>}</Card>}{!H && !S && <Card style={{
      textAlign: "center",
      marginTop: 12
    }}>{<div style={{
      display: "flex",
      justifyContent: "center",
      marginBottom: 8
    }}>{<Icon name={"timer"} size={28} color={theme.muted} />}</div>}{<div style={{
      fontSize: 16,
      fontWeight: 700,
      color: theme.text,
      marginBottom: 4
    }}>{"Rest Day"}</div>}{<div style={{
      fontSize: 12,
      color: theme.sub
    }}>{"No strength session. Log recovery cardio below if you like."}</div>}</Card>}{!H && S && <>{<div style={{
      display: "flex",
      alignItems: "center",
      gap: 8,
      marginBottom: 8,
      marginTop: 12
    }}>{<Icon name={"dumbbell"} size={15} color={theme.sub} />}{<Label style={{
      marginBottom: 0
    }}>{"Strength · "}{S.label}</Label>}{<Badge color={S.color || CATEGORY_COLORS[S.type]} style={{
      marginLeft: "auto"
    }}>{R0}{"/"}{S.exercises.length}</Badge>}</div>}{S.exercises.map(C => {
    let V = Bt[C.id] || [],
      $ = ma === C.id,
      be = V.length > 0 && V.every(w => w.done);
    return <div key={C.id} onClick={() => Ut(C.id)} style={{
        background: theme.steel,
        borderRadius: 12,
        padding: "11px 13px",
        marginBottom: 6,
        border: `1px solid ${$ ? (S.color || CATEGORY_COLORS[S.type]) + "66" : theme.border}`,
        opacity: !$ && !be ? 0.6 : 1,
        transition: "border 0.15s",
        cursor: "pointer"
      }}>{(() => {
      let w = toDateKey(addDays(g, -7)),
        he = (n[w]?.exercises?.[C.id] || []).filter(Ke => Ke.done),
        Ct = he.length ? Math.max(...he.map(Ke => parseFloat(Ke.weight) || 0)) : 0;
      return <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: $ ? 10 : 0
        }}>{<div style={{
          flex: 1,
          paddingRight: 8
        }}>{<div style={{
          fontSize: 13,
          fontWeight: 700,
          color: be ? theme.legs : theme.text,
          lineHeight: 1.3,
          display: "flex",
          alignItems: "center",
          gap: 6
        }}>{be && <Icon name={"check-circle"} size={14} color={theme.legs} />}{C.name}</div>}{<div style={{
          fontSize: 10,
          color: theme.muted,
          marginTop: 2
        }}>{C.equip}{" · "}{C.sets}{"×"}{C.reps}</div>}{he.length > 0 && <div style={{
          marginTop: 4,
          display: "flex",
          alignItems: "center",
          gap: 4,
          flexWrap: "wrap"
        }}>{<span style={{
          fontSize: 9,
          color: theme.muted,
          fontFamily: "monospace",
          textTransform: "uppercase",
          letterSpacing: "0.08em"
        }}>{"Last wk:"}</span>}{he.slice(0, 4).map((Ke, ba) => <span key={ba} style={{
          fontSize: 9,
          fontFamily: "monospace",
          color: parseFloat(Ke.weight) >= Ct && ba === he.findIndex(ao => parseFloat(ao.weight) === Ct) ? theme.push : theme.sub,
          fontWeight: parseFloat(Ke.weight) >= Ct ? 700 : 400
        }}>{Ke.weight}{"×"}{Ke.reps}</span>)}{he.length > 4 && <span style={{
          fontSize: 9,
          color: theme.muted
        }}>{"+"}{he.length - 4}</span>}</div>}</div>}{<Badge color={be ? theme.legs : S.color || CATEGORY_COLORS[S.type]}>{V.filter(Ke => Ke.done).length}{"/"}{V.length}</Badge>}</div>;
    })()}{$ && <>{(() => {
      let w = V[0]?.weight,
        pl2 = C.id === "plank",
        fc = C.id === "farmer_carry",
        ul = pl2 ? "secs" : fc ? "ft" : l.unit || "lbs";
      return <button onClick={Ev => {
          Ev.stopPropagation(), w && no(C.id, w);
        }} disabled={!w} style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          background: w ? "rgba(59,130,246,0.1)" : "rgba(255,255,255,0.03)",
          border: w ? "1px solid rgba(59,130,246,0.3)" : "1px solid rgba(255,255,255,0.08)",
          borderRadius: 7,
          padding: "5px 10px",
          marginBottom: 8,
          cursor: w ? "pointer" : "not-allowed",
          color: w ? theme.pull : theme.muted,
          fontSize: 11,
          fontFamily: "inherit",
          fontWeight: 600,
          opacity: w ? 1 : 0.5
        }}>{<Icon name={"copy"} size={12} color={w ? theme.pull : theme.muted} />}{w ? <>{"Apply "}{w}{ul}{" to all sets"}</> : "Apply to all sets"}</button>;
    })()}{(() => {
      let w = C.id === "plank",
        ne = C.id === "farmer_carry";
      return <div style={{
          display: "grid",
          gridTemplateColumns: "26px 1fr 1fr 32px",
          gap: 4,
          marginBottom: 4
        }}>{["SET", w ? "SECS" : ne ? "DIST" : "WEIGHT", w ? "SETS" : ne ? "FT" : "REPS", ""].map(Ke => <div key={Ke} style={{
          fontSize: 8,
          fontFamily: "monospace",
          color: theme.muted,
          textAlign: "center",
          letterSpacing: "0.1em"
        }}>{Ke}</div>)}</div>;
    })()}{V.map((w, ne) => {
      let he = C.id === "plank",
        Ct = C.id === "farmer_carry",
        Ke = toDateKey(addDays(g, -7)),
        ba = n[Ke]?.exercises?.[C.id]?.[ne]?.weight || "",
        ao = he ? "secs" : Ct ? "ft" : ba || "lbs",
        I0 = he ? "done" : Ct ? "sets" : "reps";
      return <div key={ne} style={{
          display: "grid",
          gridTemplateColumns: "26px 1fr 1fr 32px",
          gap: 4,
          marginBottom: 4,
          alignItems: "center"
        }}>{<div style={{
          fontSize: 10,
          fontWeight: 700,
          fontFamily: "monospace",
          textAlign: "center",
          color: w.done ? theme.legs : theme.muted
        }}>{ne + 1}</div>}{<input type={"number"} inputMode={"decimal"} placeholder={ao} value={w.weight || ""} disabled={Vt || K} onChange={it => {
          it.stopPropagation(), va(C.id, ne, "weight", it.target.value);
        }} onBlur={() => {
          (he ? w.weight : w.weight && w.reps) && oi(C.id, ne);
        }} onClick={it => it.stopPropagation()} style={{
          background: w.done ? "rgba(16,185,129,0.1)" : "rgba(255,255,255,0.06)",
          border: `1px solid ${w.done ? theme.legs + "55" : w.weight ? theme.pull + "55" : theme.border}`,
          borderRadius: 7,
          padding: "8px 4px",
          textAlign: "center",
          fontSize: 11,
          fontFamily: "monospace",
          fontWeight: 700,
          color: w.done ? theme.legs : w.weight ? theme.text : theme.muted,
          width: "100%",
          outline: "none",
          boxSizing: "border-box"
        }} />}{he ? (() => {
        let Ky = C.id + ":" + ne,
          running = swKey === Ky;
        return <button onClick={it => {
            it.stopPropagation(), !Vt && swToggle(Ky);
          }} disabled={Vt} style={{
            background: running ? "rgba(233,69,96,0.15)" : w.done ? "rgba(16,185,129,0.1)" : "rgba(255,255,255,0.06)",
            border: `1px solid ${running ? theme.push : w.done ? theme.legs + "55" : theme.border}`,
            borderRadius: 7,
            padding: "8px 4px",
            textAlign: "center",
            fontSize: 10,
            fontFamily: "monospace",
            fontWeight: 700,
            color: running ? theme.push : w.done ? theme.legs : theme.muted,
            cursor: "pointer",
            width: "100%"
          }}>{running ? "\u25A0 Stop" : w.weight ? "\u21BB Redo" : "\u23F1 Start"}</button>;
      })() : <input type={"number"} inputMode={"numeric"} placeholder={I0} value={w.reps || ""} disabled={Vt || K} onChange={it => {
          it.stopPropagation(), va(C.id, ne, "reps", it.target.value);
        }} onBlur={() => {
          w.weight && w.reps && oi(C.id, ne);
        }} onClick={it => it.stopPropagation()} style={{
          background: w.done ? "rgba(16,185,129,0.1)" : "rgba(255,255,255,0.06)",
          border: `1px solid ${w.done ? theme.legs + "55" : w.reps ? theme.push + "55" : theme.border}`,
          borderRadius: 7,
          padding: "8px 4px",
          textAlign: "center",
          fontSize: 11,
          fontFamily: "monospace",
          fontWeight: 700,
          color: w.done ? theme.legs : w.reps ? theme.text : theme.muted,
          width: "100%",
          outline: "none",
          boxSizing: "border-box"
        }} />}{<button onClick={it => {
          it.stopPropagation(), Vt || U(C.id, ne);
        }} style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: 4,
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}>{<Icon name={"x"} size={14} color={theme.muted} />}</button>}</div>;
    })}{!Vt && <button onClick={w => {
        w.stopPropagation(), B(C.id);
      }} style={{
        width: "100%",
        background: "none",
        border: `1px dashed ${theme.border}`,
        borderRadius: 7,
        padding: "6px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 6,
        color: theme.muted,
        fontSize: 11,
        cursor: "pointer",
        marginTop: 2
      }}>{<Icon name={"plus"} size={12} color={theme.muted} />}{" Add Set"}</button>}{<div style={{
        fontSize: 10,
        color: theme.muted,
        marginTop: 8,
        display: "flex",
        alignItems: "flex-start",
        gap: 6,
        fontStyle: "italic"
      }}>{<Icon name={"info"} size={11} color={theme.muted} />}{C.note}{<div style={{
        marginTop: 8,
        paddingTop: 8,
        borderTop: `1px solid ${theme.border}`
      }} onClick={it => it.stopPropagation()}>{noteEditId === C.id ? <>{<textarea value={noteDraft} onChange={it => setNoteDraft(it.target.value)} placeholder={"e.g. Went too heavy, drop weight next week"} rows={2} style={{
        width: "100%",
        background: "rgba(255,255,255,0.06)",
        border: `1px solid ${theme.border}`,
        borderRadius: 7,
        padding: "6px 8px",
        fontSize: 12,
        color: theme.text,
        fontFamily: "inherit",
        resize: "vertical",
        boxSizing: "border-box",
        marginBottom: 6
      }} />}{<div style={{
        display: "flex",
        gap: 6
      }}>{<button onClick={saveNote} style={{
        flex: 1,
        background: "rgba(16,185,129,0.15)",
        border: "1px solid rgba(16,185,129,0.4)",
        borderRadius: 7,
        padding: "6px",
        color: theme.legs,
        fontSize: 11,
        fontWeight: 700,
        cursor: "pointer",
        fontFamily: "inherit"
      }}>{"Save Note"}</button>}{<button onClick={() => setNoteEditId(null)} style={{
        background: "none",
        border: `1px solid ${theme.border}`,
        borderRadius: 7,
        padding: "6px 10px",
        color: theme.muted,
        fontSize: 11,
        cursor: "pointer",
        fontFamily: "inherit"
      }}>{"Cancel"}</button>}</div>}</> : XN[C.id] ? <>{<div style={{
        fontSize: 11,
        color: theme.text,
        marginBottom: 6,
        display: "flex",
        alignItems: "flex-start",
        gap: 6
      }}>{<Icon name={"edit"} size={11} color={theme.muted} />}{<span>{XN[C.id]}</span>}</div>}{<div style={{
        display: "flex",
        gap: 6
      }}>{<button onClick={() => startNote(C.id)} style={{
        background: "none",
        border: `1px solid ${theme.border}`,
        borderRadius: 7,
        padding: "5px 10px",
        color: theme.sub,
        fontSize: 10,
        cursor: "pointer",
        fontFamily: "inherit"
      }}>{"Edit Note"}</button>}{<button onClick={() => clearNote(C.id)} style={{
        background: "none",
        border: `1px solid ${theme.border}`,
        borderRadius: 7,
        padding: "5px 10px",
        color: theme.muted,
        fontSize: 10,
        cursor: "pointer",
        fontFamily: "inherit"
      }}>{"Clear"}</button>}</div>}</> : <button onClick={() => startNote(C.id)} style={{
        background: "none",
        border: `1px dashed ${theme.border}`,
        borderRadius: 7,
        padding: "6px",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 6,
        color: theme.muted,
        fontSize: 11,
        cursor: "pointer",
        fontFamily: "inherit"
      }}>{<Icon name={"plus"} size={12} color={theme.muted} />}{"Add Note"}</button>}</div>}</div>}</>}</div>;
  })}{Vt ? <div style={{
      background: "rgba(16,185,129,0.1)",
      border: "1px solid rgba(16,185,129,0.25)",
      borderRadius: 12,
      padding: "12px 14px",
      textAlign: "center",
      marginBottom: 16,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 6
    }}>{<Icon name={"check-circle"} size={24} color={theme.legs} />}{<div style={{
      fontSize: 15,
      fontWeight: 800,
      color: theme.legs
    }}>{"Session Saved"}</div>}{<div style={{
      fontSize: 11,
      color: theme.sub
    }}>{(n[z]?.prs || []).length > 0 ? `${n[z].prs.length} new PR${n[z].prs.length > 1 ? "s" : ""} set` : "Great work. Keep the momentum going."}</div>}{<button onClick={EdS} style={{
      background: "none",
      border: `1px solid ${theme.border}`,
      borderRadius: 8,
      padding: "7px 14px",
      color: theme.sub,
      fontSize: 12,
      cursor: "pointer",
      fontFamily: "inherit",
      fontWeight: 600,
      marginTop: 4
    }}>{"Edit Session"}</button>}</div> : <PrimaryButton onClick={L} color={S.color || CATEGORY_COLORS[S.type]} style={{
      marginBottom: 16
    }}>{n[z] ? "Update Session" : "Finish Session"}</PrimaryButton>}{<Divider />}</>}{!H && <>{<div style={{
      display: "flex",
      alignItems: "center",
      gap: 8,
      marginBottom: 8,
      marginTop: S ? 0 : 12
    }}>{<Icon name={"bike"} size={15} color={theme.sub} />}{<Label style={{
      marginBottom: 0
    }}>{"Cardio"}</Label>}</div>}{N ? <Card style={{
      background: "rgba(168,85,247,0.06)",
      border: "1px solid rgba(168,85,247,0.2)",
      marginBottom: 8
    }}>{<div style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start"
    }}>{<div>{<div style={{
      fontSize: 13,
      fontWeight: 700,
      color: theme.text
    }}>{activityLabel(N.type)}</div>}{<div style={{
      fontSize: 11,
      color: theme.muted,
      marginTop: 2
    }}>{N.duration}{" min · Effort "}{N.effort}{"/10"}</div>}{N.distance && <div style={{
      fontSize: 11,
      color: theme.pelo,
      marginTop: 2
    }}>{N.distance}{" "}{Fc}</div>}{N.output && <div style={{
      fontSize: 11,
      color: theme.pelo,
      marginTop: 2
    }}>{N.output}{" cal"}</div>}</div>}{<Badge color={theme.pelo}>{"Logged"}</Badge>}</div>}{<button onClick={() => ce(true)} style={{
      background: "none",
      border: "none",
      color: theme.muted,
      fontSize: 11,
      cursor: "pointer",
      marginTop: 6,
      padding: 0,
      fontFamily: "inherit"
    }}>{"Edit cardio"}</button>}</Card> : P ? <Card style={{
      background: "rgba(168,85,247,0.06)",
      border: "1px solid rgba(168,85,247,0.2)",
      marginBottom: 8
    }}>{<div style={{
      fontSize: 12,
      color: theme.pelo,
      marginBottom: 6,
      display: "flex",
      gap: 6,
      alignItems: "center"
    }}>{<Icon name={"bike"} size={13} color={theme.pelo} />}{" "}{activityLabel(P.activity)}{" · "}{P.label}</div>}{<PrimaryButton onClick={() => ce(true)} color={theme.pelo}>{"Log Cardio"}</PrimaryButton>}</Card> : <Card style={{
      marginBottom: 8
    }}>{<div style={{
      fontSize: 12,
      color: theme.muted,
      marginBottom: 6
    }}>{q.id === 1 ? "No cardio scheduled today in Phase 1." : "Optional cardio \u2014 not required today."}</div>}{<PrimaryButton onClick={() => ce(true)} color={theme.pelo} outline={true}>{"Log Optional Cardio"}</PrimaryButton>}</Card>}</>}</div>}{Z && <div style={{
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.85)",
      display: "flex",
      alignItems: "flex-end",
      zIndex: 100
    }} onClick={() => ce(false)}>{<div style={{
      background: theme.carbon,
      borderRadius: "20px 20px 0 0",
      padding: "24px 20px 40px",
      width: "100%",
      border: `1px solid ${theme.border}`,
      maxHeight: "80vh",
      overflowY: "auto"
    }} onClick={C => C.stopPropagation()}>{<div style={{
      fontSize: 15,
      fontWeight: 700,
      color: theme.text,
      marginBottom: 16
    }}>{"Log Cardio"}</div>}{<Label>{"Activity"}</Label>}{<div style={{
      display: "grid",
      gridTemplateColumns: "repeat(2,1fr)",
      gap: 6,
      marginBottom: 14
    }}>{CARDIO_ACTIVITIES.map(C => <button key={C.k} onClick={() => Ql(C.k)} style={{
      background: _e === C.k ? "rgba(168,85,247,0.2)" : theme.steel,
      border: `1.5px solid ${_e === C.k ? theme.pelo : theme.border}`,
      borderRadius: 8,
      padding: "8px 6px",
      color: _e === C.k ? theme.pelo : theme.sub,
      fontSize: 11,
      cursor: "pointer",
      fontFamily: "inherit",
      fontWeight: 600
    }}>{C.l}</button>)}</div>}{<div style={{
      display: "grid",
      gridTemplateColumns: "1fr 1fr 1fr",
      gap: 8,
      marginBottom: 12
    }}>{<div>{<Label>{"Duration (min)"}</Label>}{<input value={$e} onChange={C => ml(C.target.value)} type={"number"} inputMode={"numeric"} placeholder={"45"} style={{
      width: "100%",
      background: theme.steel,
      border: `1px solid ${theme.border}`,
      borderRadius: 10,
      padding: "10px 8px",
      fontSize: 14,
      color: theme.text,
      fontFamily: "monospace",
      boxSizing: "border-box"
    }} />}</div>}{<div>{<Label>{"Distance ("}{Fc}{")"}</Label>}{<input value={Kt} onChange={C => ha(C.target.value)} type={"number"} inputMode={"decimal"} placeholder={"0.0"} style={{
      width: "100%",
      background: theme.steel,
      border: `1px solid ${theme.border}`,
      borderRadius: 10,
      padding: "10px 8px",
      fontSize: 14,
      color: theme.text,
      fontFamily: "monospace",
      boxSizing: "border-box"
    }} />}</div>}{<div>{<Label>{"Calories"}</Label>}{<input value={Ht} onChange={C => pn(C.target.value)} type={"number"} inputMode={"numeric"} placeholder={"opt"} style={{
      width: "100%",
      background: theme.steel,
      border: `1px solid ${theme.border}`,
      borderRadius: 10,
      padding: "10px 8px",
      fontSize: 14,
      color: theme.text,
      fontFamily: "monospace",
      boxSizing: "border-box"
    }} />}</div>}</div>}{<Label>{"Effort ("}{si}{"/10)"}</Label>}{<input type={"range"} min={1} max={10} value={si} onChange={C => io(Number(C.target.value))} style={{
      width: "100%",
      marginBottom: 16,
      accentColor: theme.pelo
    }} />}{<PrimaryButton onClick={W0} color={theme.pelo}>{"Save Cardio"}</PrimaryButton>}</div>}</div>}</div>;
}

