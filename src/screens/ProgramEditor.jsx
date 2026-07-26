import React from 'react';
import { activityLabel, addDays, formatShortDate, getToday, getWeekAndDay, isRoutineMode, parseDateKey, phaseForWeek, phaseKey, resolveCardio, resolveExercises, toDateKey, totalWeeks } from '../utils.js';
import { CATEGORY_COLORS, theme } from '../theme.js';
import { Badge, Icon } from '../components/ui.jsx';
import { CARDIO_ACTIVITIES, WEEKDAY_NAMES } from '../constants.js';
import { ExercisePicker } from '../components/ExercisePicker.jsx';
import { ExerciseEditorModal } from '../components/ExerciseEditorModal.jsx';
import { DayEditorModal } from '../components/DayEditorModal.jsx';
import { WeekDayPickerModal } from '../components/WeekDayPickerModal.jsx';

export function ProgramEditor({
  days: e,
  overrides: t,
  sessions: l,
  settings: n,
  currentWeek: i,
  routine: a,
  onSave: o,
  onClose: c,
  phases: ph
}) {
  let [f, m] = (0, React.useState)(e.map(B => ({
      ...B,
      exercises: (B2 => Array.isArray(B2) ? [...B2] : Object.fromEntries(Object.entries(B2 || {}).map(([k, v2]) => [k, [...v2]])))(B.exercises)
    }))),
    [y, b] = (0, React.useState)({
      ...t
    }),
    [p, h] = (0, React.useState)(false),
    [E, T] = (0, React.useState)(null),
    [M, d] = (0, React.useState)(null),
    [r, v] = (0, React.useState)(null),
    [g, _] = (0, React.useState)(/* @__PURE__ */new Set([i])),
    [O, z] = (0, React.useState)("template"),
    [A, S] = (0, React.useState)(null),
    [Ow, Aw] = (0, React.useState)(null),
    [Dc, Sc] = (0, React.useState)(null),
    [lp, slp] = (0, React.useState)(ph.map(B => ({
      ...B
    }))),
    [ap, sap] = (0, React.useState)(a ? ph.length - 1 : 0),
    [Ps, Sps] = (0, React.useState)(false),
    [Dm, SDm] = (0, React.useState)(null),
    D = parseDateKey(n.startDate),
    q = B => !!l[B],
    j = f.length < 7 ? [...f, {
      id: "rest",
      label: "Rest",
      dayOfWeek: 7,
      color: theme.muted,
      exercises: [],
      isRest: true
    }] : f,
    H = (B, U) => {
      if (y[B]?.exercises) return y[B].exercises;
      let {
        weekNum: Hw
      } = getWeekAndDay(D, parseDateKey(B));
      return resolveExercises(j[U], phaseKey(phaseForWeek(Hw, lp)));
    },
    K = B => {
      _(U => {
        let L = new Set(U);
        return L.has(B) ? L.delete(B) : L.add(B), L;
      });
    },
    Ep = (dy2, lpA) => {
      if (Array.isArray(dy2.exercises)) {
        let o3 = {};
        return lpA.forEach(p2 => o3[phaseKey(p2)] = [...dy2.exercises]), o3;
      }
      let o2 = {
        ...dy2.exercises
      };
      return Object.keys(o2).forEach(k => o2[k] = [...(o2[k] || [])]), o2;
    },
    clearEx = (B, U) => {
      m(L => L.map((N, P) => {
        if (B !== null && P !== B) return N;
        let Z = Ep(N, lp);
        return U ? lp.forEach(ce => Z[phaseKey(ce)] = []) : Z[phaseKey(lp[ap])] = [], {
          ...N,
          exercises: Z
        };
      })), h(true), SDm(null);
    },
    ze = (B, U, L) => {
      m(N => {
        let P = N.map(_e => ({
            ..._e,
            exercises: Ep(_e, lp)
          })),
          pk = phaseKey(lp[ap]),
          Z = P[B].exercises[pk],
          ce = U + L;
        return ce < 0 || ce >= Z.length ? N : ([Z[U], Z[ce]] = [Z[ce], Z[U]], P);
      }), h(true);
    },
    Q = (B, U) => {
      m(L => {
        let N = L.map(P => ({
            ...P,
            exercises: Ep(P, lp)
          })),
          pk = phaseKey(lp[ap]);
        return N[B].exercises[pk].splice(U, 1), N;
      }), h(true);
    },
    Me = (B, U, L) => {
      m(N => {
        let P = N.map(Z => ({
            ...Z,
            exercises: Ep(Z, lp)
          })),
          pk = phaseKey(lp[ap]);
        return U === -1 ? P[B].exercises[pk].push({
          ...L,
          id: `custom_${Date.now()}`
        }) : P[B].exercises[pk][U] = L, P;
      }), h(true), T(null);
    },
    Le = (B, U) => {
      m(L => {
        let N = [...L];
        return N[B] = {
          ...N[B],
          ...U
        }, N;
      }), h(true), d(null);
    },
    Cu = (B, ph2, fl, val) => {
      m(L => {
        let N = [...L],
          D2 = {
            ...N[B]
          },
          cur = D2.cardio || {
            ph1: resolveCardio(N[B], "ph1"),
            ph2: resolveCardio(N[B], "ph2"),
            ph3: resolveCardio(N[B], "ph3")
          },
          curPh = cur[ph2],
          nv;
        return fl === "activity" ? nv = val === "none" ? null : {
          activity: val,
          label: curPh?.label || ""
        } : nv = curPh ? {
          ...curPh,
          label: val
        } : {
          activity: "bike",
          label: val
        }, D2.cardio = {
          ...cur,
          [ph2]: nv
        }, N[B] = D2, N;
      }), h(true);
    },
    rnPh = (B, U) => {
      slp(L => L.map((N, P) => P === B ? {
        ...N,
        name: U
      } : N)), h(true);
    },
    adjW = (B, U) => {
      slp(L => L.map((N, P) => P === B ? {
        ...N,
        weeks: Math.max(1, N.weeks + U)
      } : N)), h(true);
    },
    addPh = () => {
      slp(L => [...L, {
        id: Date.now(),
        name: `Phase ${L.length + 1}`,
        weeks: 4
      }]), h(true);
    },
    rmPh = B => {
      lp.length > 1 && (slp(L => L.filter((N, P) => P !== B)), ap >= lp.length - 1 && sap(Math.max(0, lp.length - 2)), h(true));
    },
    Zt = (B, U, L, N) => {
      b(P => {
        let Z = j[U]?.exercises || [],
          ce = P[B] || {
            exercises: [...Z]
          },
          _e = [...(ce.exercises || [])];
        return L === -1 ? _e.push({
          ...N,
          id: `custom_${Date.now()}`
        }) : L >= 0 && L < _e.length && (_e[L] = N), {
          ...P,
          [B]: {
            ...ce,
            exercises: _e
          }
        };
      }), h(true), T(null);
    },
    Ve = (B, U, L) => {
      b(N => {
        let P = j[U]?.exercises || [],
          Z = N[B] || {
            exercises: [...P]
          },
          ce = [...(Z.exercises || [])];
        return L >= 0 && L < ce.length && ce.splice(L, 1), {
          ...N,
          [B]: {
            ...Z,
            exercises: ce
          }
        };
      }), h(true);
    },
    Bt = B => {
      b(U => {
        let L = {
          ...U
        };
        return delete L[B], L;
      }), h(true);
    },
    Zc = (B, U, L) => {
      b(N => {
        let P = N[B]?.cardio,
          Z = P !== void 0 ? P : null,
          ce;
        return U === "activity" ? ce = L === "none" ? null : {
          activity: L,
          label: Z?.label || ""
        } : ce = Z ? {
          ...Z,
          label: L
        } : {
          activity: "bike",
          label: L
        }, {
          ...N,
          [B]: {
            ...(N[B] || {}),
            cardio: ce
          }
        };
      }), h(true);
    },
    Rc2 = B => {
      b(U => {
        let L = {
          ...(U[B] || {})
        };
        delete L.cardio;
        let N = L.exercises || L.label || L.color || L.type,
          P = {
            ...U
          };
        return N ? P[B] = L : delete P[B], P;
      }), h(true);
    },
    Vt = B => {
      let {
        action: U,
        weekNum: L,
        dayIdx: N,
        exIdx: P,
        updated: Z
      } = r;
      if (B === "template") U === "saveEx" ? Me(N, P, Z) : U === "editDay" && Le(N, Z);else {
        let ce = addDays(D, (L - 1) * 7),
          _e = toDateKey(addDays(ce, N));
        U === "saveEx" && Zt(_e, N, P, Z);
      }
      v(null);
    },
    ma = () => {
      let Tk = toDateKey(getToday()),
        Ov = {
          ...y
        };
      for (let B = 1; B <= i; B++) for (let U = 0; U < 6; U++) {
        let Dk = toDateKey(addDays(D, (B - 1) * 7 + U));
        if (Dk < Tk && !Ov[Dk] && JSON.stringify(e[U]) !== JSON.stringify(f[U])) {
          let Pz = phaseKey(phaseForWeek(B, lp));
          Ov[Dk] = {
            label: e[U].label,
            color: e[U].color,
            type: e[U].type,
            exercises: resolveExercises(e[U], Pz),
            cardio: resolveCardio(e[U], Pz)
          };
        }
      }
      o(f, Ov, lp), c();
    },
    Ut = j,
    pa = i,
    [ga, ya] = (0, React.useState)(Math.min(Math.max(i + 4, 12), a ? i + 8 : 12)),
    lo = Array.from({
      length: ga
    }, (B, U) => U + 1),
    va = () => {
      ya(B => B + 1), h(true);
    },
    oi = B => {
      let U = addDays(D, (B - 1) * 7);
      b(L => {
        let N = {};
        return Object.entries(L).forEach(([P, Z]) => {
          let ce = parseDateKey(P),
            _e = Math.round((ce - D) / 864e5),
            Ql = Math.floor(_e / 7) + 1;
          if (Ql < B) N[P] = Z;else if (Ql > B) {
            let $e = addDays(ce, -7);
            N[toDateKey($e)] = Z;
          }
        }), N;
      }), ya(L => Math.max(L - 1, pa)), h(true);
    },
    no = B => {
      let U = addDays(D, (B - 1) * 7);
      return Ut.filter((L, N) => y[toDateKey(addDays(U, N))]).length;
    };
  return <div style={{
      position: "fixed",
      inset: 0,
      background: theme.black,
      zIndex: 100,
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
    }}>{<button onClick={c} style={{
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
    }}>{"Program"}</span>}</button>}{<div style={{
      fontSize: 15,
      fontWeight: 800,
      color: theme.text
    }}>{a ? "Edit Routine" : "Edit Program"}</div>}{<button onClick={ma} style={{
      background: p ? theme.legs : theme.steel,
      border: `1px solid ${p ? theme.legs : theme.border}`,
      borderRadius: 8,
      padding: "6px 14px",
      cursor: "pointer",
      color: p ? theme.white : theme.muted,
      fontSize: 12,
      fontWeight: 700,
      fontFamily: "inherit"
    }}>{p ? "Save \u2713" : "Done"}</button>}</div>}{!a && <div style={{
      background: theme.carbon,
      borderBottom: `1px solid ${theme.border}`,
      padding: "10px 16px",
      flexShrink: 0
    }}>{<div onClick={() => Sps(!Ps)} style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      cursor: "pointer"
    }}>{<div style={{
      display: "flex",
      alignItems: "center",
      gap: 8
    }}>{<div style={{
      fontSize: 10,
      color: theme.muted,
      fontWeight: 700,
      letterSpacing: "0.05em",
      textTransform: "uppercase"
    }}>{"Program Structure"}</div>}{<div style={{
      fontSize: 10,
      color: theme.phase,
      fontWeight: 700
    }}>{totalWeeks(lp)}{" weeks"}</div>}</div>}{<Icon name={Ps ? "chevron-up" : "chevron-down"} size={16} color={theme.muted} />}</div>}{Ps && <div style={{
      marginTop: 10
    }}>{lp.map((P, Pi) => <div key={P.id} style={{
      display: "flex",
      alignItems: "center",
      gap: 6,
      marginBottom: 8
    }}>{<input value={P.name} onChange={ev => rnPh(Pi, ev.target.value)} style={{
      flex: 1,
      background: theme.steel,
      border: `1px solid ${theme.border}`,
      borderRadius: 7,
      padding: "7px 10px",
      color: theme.text,
      fontSize: 12,
      fontFamily: "inherit",
      minWidth: 0
    }} />}{<button onClick={() => adjW(Pi, -1)} style={{
      width: 26,
      height: 26,
      borderRadius: 6,
      background: theme.black,
      border: `1px solid ${theme.border}`,
      color: theme.text,
      fontSize: 14,
      fontWeight: 700,
      cursor: "pointer",
      fontFamily: "inherit",
      flexShrink: 0
    }}>{"–"}</button>}{<div style={{
      width: 32,
      textAlign: "center",
      fontSize: 12,
      color: theme.text,
      fontWeight: 700,
      flexShrink: 0
    }}>{P.weeks}{"w"}</div>}{<button onClick={() => adjW(Pi, 1)} style={{
      width: 26,
      height: 26,
      borderRadius: 6,
      background: theme.black,
      border: `1px solid ${theme.border}`,
      color: theme.text,
      fontSize: 14,
      fontWeight: 700,
      cursor: "pointer",
      fontFamily: "inherit",
      flexShrink: 0
    }}>{"+"}</button>}{<button onClick={() => rmPh(Pi)} disabled={lp.length <= 1} style={{
      background: "none",
      border: "none",
      color: lp.length <= 1 ? theme.muted : theme.push,
      fontSize: 16,
      cursor: lp.length <= 1 ? "default" : "pointer",
      opacity: lp.length <= 1 ? 0.3 : 1,
      flexShrink: 0
    }}>{"×"}</button>}</div>)}{<button onClick={addPh} style={{
      width: "100%",
      background: "none",
      border: `1px dashed ${theme.border}`,
      borderRadius: 8,
      padding: "8px",
      color: theme.sub,
      fontSize: 11,
      cursor: "pointer",
      fontFamily: "inherit"
    }}>{"+ Add Phase"}</button>}</div>}</div>}{!a && <div style={{
      background: theme.carbon,
      borderBottom: `1px solid ${theme.border}`,
      padding: "8px 16px",
      flexShrink: 0
    }}>{<div style={{
      display: "flex",
      background: theme.steel,
      borderRadius: 10,
      padding: 3,
      border: `1px solid ${theme.border}`
    }}>{[["template", "Template (all weeks)"], ["weeks", "Week overrides"]].map(([B, U]) => <button key={B} onClick={() => z(B)} style={{
      flex: 1,
      background: O === B ? theme.pull : "transparent",
      border: "none",
      borderRadius: 7,
      padding: "6px 8px",
      cursor: "pointer",
      fontSize: 11,
      fontWeight: 700,
      fontFamily: "monospace",
      letterSpacing: "0.04em",
      textTransform: "uppercase",
      color: O === B ? theme.white : theme.muted,
      transition: "all 0.15s"
    }}>{U}</button>)}</div>}{<div style={{
      fontSize: 10,
      color: theme.muted,
      marginTop: 6,
      lineHeight: 1.5
    }}>{O === "template" ? "Changes here apply to all future unlogged sessions." : "Create week-specific overrides for individual sessions."}</div>}</div>}{O === "template" && <div style={{
      flex: 1,
      overflowY: "auto",
      padding: "12px 16px 40px"
    }}>{!a && <div style={{
      display: "flex",
      gap: 6,
      marginBottom: 14,
      flexWrap: "wrap"
    }}>{lp.map((P, Pi) => <button key={P.id} onClick={() => sap(Pi)} style={{
      background: ap === Pi ? theme.phase + "22" : "transparent",
      border: `1.5px solid ${ap === Pi ? theme.phase : theme.border}`,
      color: ap === Pi ? theme.phase : theme.sub,
      borderRadius: 8,
      padding: "6px 12px",
      fontSize: 11,
      fontWeight: 700,
      fontFamily: "inherit",
      cursor: "pointer",
      flexShrink: 0
    }}>{P.name}</button>)}</div>}{<div style={{
      display: "flex",
      justifyContent: "flex-end",
      marginBottom: 14
    }}>{<button onClick={() => SDm(a ? {
      step: "confirm",
      dayIdx: null,
      all: false,
      label: "the entire routine"
    } : {
      step: "menu2"
    })} style={{
      background: "none",
      border: "none",
      color: theme.push,
      fontSize: 11,
      cursor: "pointer",
      fontFamily: "inherit"
    }}>{a ? "Clear Entire Routine" : "Clear Exercises\u2026"}</button>}</div>}{Ut.map((B, U) => {
    let L = B.color || CATEGORY_COLORS[B.type] || theme.muted,
      BX = resolveExercises(B, phaseKey(lp[ap])),
      N = B.isRest || BX.length === 0 && U === 6;
    return <div key={B.id} style={{
        marginBottom: 16
      }}>{<div style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        marginBottom: 8
      }}>{<div style={{
        width: 36,
        height: 36,
        borderRadius: 9,
        background: L + "22",
        border: `2px solid ${L}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 9,
        fontWeight: 800,
        fontFamily: "monospace",
        color: L,
        flexShrink: 0
      }}>{(B.dayName || WEEKDAY_NAMES[U] || "").slice(0, 3).toUpperCase()}</div>}{<div style={{
        flex: 1
      }}>{<div style={{
        fontSize: 15,
        fontWeight: 700,
        color: theme.text
      }}>{B.label}</div>}{<div style={{
        fontSize: 10,
        color: theme.muted
      }}>{B.dayName || WEEKDAY_NAMES[U]}{" · "}{N ? "Rest day" : BX.length + " exercises"}</div>}</div>}{<button onClick={() => d({
        scope: "template",
        dayIdx: U
      })} style={{
        background: "rgba(59,130,246,0.1)",
        border: "1px solid rgba(59,130,246,0.25)",
        borderRadius: 7,
        padding: "5px 10px",
        cursor: "pointer",
        color: theme.pull,
        fontSize: 11,
        fontFamily: "inherit"
      }}>{"Edit Day"}</button>}{BX.length > 0 && <button onClick={() => SDm(a ? {
        step: "confirm",
        dayIdx: U,
        all: false,
        label: B.label
      } : {
        step: "menu",
        dayIdx: U,
        label: B.label
      })} style={{
        background: "none",
        border: `1px solid ${theme.border}`,
        borderRadius: 7,
        padding: "5px 7px",
        cursor: "pointer",
        marginLeft: 6
      }}>{<Icon name={"x"} size={12} color={theme.push} />}</button>}</div>}{<div style={{
        background: theme.steel,
        borderRadius: 12,
        overflow: "hidden",
        border: `1px solid ${theme.border}`
      }}>{BX.length === 0 && <div style={{
        padding: "12px 14px",
        fontSize: 12,
        color: theme.muted
      }}>{"No exercises. Add one below."}</div>}{BX.map((P, Z) => <div key={P.id || Z} style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: "10px 12px",
        borderBottom: Z < BX.length - 1 ? `1px solid ${theme.border}` : "none"
      }}>{<div style={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        flexShrink: 0
      }}>{<button onClick={() => ze(U, Z, -1)} disabled={Z === 0} style={{
        background: "none",
        border: "none",
        cursor: Z === 0 ? "default" : "pointer",
        padding: "2px 4px",
        opacity: Z === 0 ? 0.2 : 1
      }}>{<Icon name={"chevron-up"} size={14} color={theme.muted} />}</button>}{<button onClick={() => ze(U, Z, 1)} disabled={Z === BX.length - 1} style={{
        background: "none",
        border: "none",
        cursor: Z === BX.length - 1 ? "default" : "pointer",
        padding: "2px 4px",
        opacity: Z === BX.length - 1 ? 0.2 : 1
      }}>{<Icon name={"chevron-down"} size={14} color={theme.muted} />}</button>}</div>}{<div style={{
        flex: 1,
        minWidth: 0
      }}>{<div style={{
        fontSize: 13,
        fontWeight: 600,
        color: theme.text,
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap"
      }}>{P.name}</div>}{<div style={{
        fontSize: 10,
        color: theme.muted,
        marginTop: 1
      }}>{P.equip}{" · "}{P.sets}{"×"}{P.reps}</div>}</div>}{<div style={{
        display: "flex",
        gap: 6,
        flexShrink: 0
      }}>{<button onClick={() => T({
        scope: "template",
        dayIdx: U,
        exIdx: Z
      })} style={{
        background: "rgba(59,130,246,0.1)",
        border: "1px solid rgba(59,130,246,0.25)",
        borderRadius: 7,
        padding: "5px 9px",
        cursor: "pointer",
        color: theme.pull,
        fontSize: 11,
        fontFamily: "inherit"
      }}>{"Edit"}</button>}{<button onClick={() => Q(U, Z)} style={{
        background: "rgba(233,69,96,0.08)",
        border: "1px solid rgba(233,69,96,0.2)",
        borderRadius: 7,
        padding: "5px 8px",
        cursor: "pointer"
      }}>{<Icon name={"x"} size={13} color={theme.push} />}</button>}</div>}</div>)}{<button onClick={() => S({
        scope: "template",
        dayIdx: U
      })} style={{
        width: "100%",
        background: "none",
        border: "none",
        padding: "10px 12px",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: 6,
        color: theme.muted,
        fontSize: 12,
        fontFamily: "inherit",
        borderTop: BX.length > 0 ? `1px dashed ${theme.border}` : "none"
      }}>{<Icon name={"plus"} size={15} color={theme.muted} />}{"Add Exercise"}</button>}</div>}{<div style={{
        marginTop: 8,
        background: theme.carbon,
        borderRadius: 10,
        border: `1px solid ${theme.border}`,
        padding: "10px 12px"
      }}>{<div style={{
        fontSize: 10,
        color: theme.muted,
        fontWeight: 700,
        letterSpacing: "0.04em",
        textTransform: "uppercase",
        marginBottom: 8
      }}>{a ? "Cardio" : "Cardio \xB7 " + lp[ap].name}</div>}{<div style={{
        display: "flex",
        gap: 6
      }}>{<select value={resolveCardio(B, phaseKey(lp[ap]))?.activity || "none"} onChange={ev => Cu(U, phaseKey(lp[ap]), "activity", ev.target.value)} style={{
        background: theme.steel,
        border: `1px solid ${theme.border}`,
        borderRadius: 8,
        padding: "7px 4px",
        color: theme.text,
        fontSize: 11,
        fontFamily: "inherit",
        flexShrink: 0,
        width: 84
      }}>{<option value={"none"}>{"None"}</option>}{CARDIO_ACTIVITIES.map(ac => <option key={ac.k} value={ac.k}>{ac.l}</option>)}</select>}{resolveCardio(B, phaseKey(lp[ap])) && <input value={resolveCardio(B, phaseKey(lp[ap])).label || ""} onChange={ev => Cu(U, phaseKey(lp[ap]), "label", ev.target.value)} placeholder={"e.g. Endurance (20\u201330 min)"} style={{
        flex: 1,
        background: theme.steel,
        border: `1px solid ${theme.border}`,
        borderRadius: 8,
        padding: "7px 9px",
        color: theme.text,
        fontSize: 11,
        fontFamily: "inherit",
        minWidth: 0
      }} />}</div>}</div>}</div>;
  })}</div>}{O === "weeks" && <div style={{
      flex: 1,
      overflowY: "auto",
      padding: "12px 16px 40px"
    }}>{lo.map(B => {
    let U = addDays(D, (B - 1) * 7),
      L = B === i,
      N = B < i,
      P = Object.values(l).some($e => {
        let ml = parseDateKey(Object.keys(l).find(Ht => l[Ht] === $e) || "2000-01-01");
        return Math.floor((ml - D) / 864e5 / 7) + 1 === B;
      }),
      Z = no(B),
      ce = g.has(B),
      _e = isRoutineMode(B, lp, n),
      Ql = !L && !N;
    return <div key={B} style={{
        marginBottom: 8,
        borderRadius: 12,
        overflow: "hidden",
        border: `1px solid ${L ? theme.pull + "55" : theme.border}`,
        background: L ? theme.steel : theme.carbon
      }}>{<div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "11px 14px"
      }}>{<div onClick={() => K(B)} style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        flex: 1,
        cursor: "pointer"
      }}>{<div style={{
        fontSize: 14,
        fontWeight: 700,
        color: L ? theme.text : N ? theme.sub : theme.text
      }}>{_e ? `Routine Wk ${B}` : `Week ${B}`}</div>}{L && <Badge color={theme.pull} style={{
        fontSize: 9
      }}>{"Current"}</Badge>}{N && <Badge color={theme.muted} style={{
        fontSize: 9
      }}>{"Past"}</Badge>}{Z > 0 && <Badge color={theme.phase} style={{
        fontSize: 9
      }}>{Z}{" override"}{Z > 1 ? "s" : ""}</Badge>}</div>}{<div style={{
        display: "flex",
        alignItems: "center",
        gap: 8
      }}>{<span style={{
        fontSize: 11,
        color: theme.muted
      }}>{formatShortDate(U)}</span>}{Ql && <button onClick={() => Sc(B)} style={{
        background: "rgba(233,69,96,0.1)",
        border: "1px solid rgba(233,69,96,0.25)",
        borderRadius: 7,
        padding: "3px 8px",
        cursor: "pointer",
        color: theme.push,
        fontSize: 11,
        fontWeight: 700,
        fontFamily: "inherit",
        lineHeight: 1.4
      }}>{"–"}</button>}{<Icon onClick={() => K(B)} name={ce ? "chevron-up" : "chevron-down"} size={14} color={theme.muted} />}</div>}</div>}{ce && <div style={{
        borderTop: `1px solid ${theme.border}`,
        padding: "8px 14px 12px"
      }}>{Ut.map(($e, ml) => {
      let Ht = toDateKey(addDays(U, ml)),
        pn = q(Ht),
        Kt = !!y[Ht],
        ha = H(Ht, ml),
        Dov = y[Ht] && y[Ht].label ? y[Ht] : $e,
        si = Dov.color || CATEGORY_COLORS[Dov.type] || theme.muted,
        Pc = y[Ht] && "cardio" in y[Ht] ? y[Ht].cardio : resolveCardio($e, phaseKey(phaseForWeek(B, lp)));
      return <div key={$e.id} style={{
          background: Kt ? "rgba(245,158,11,0.08)" : theme.steel,
          border: `1px solid ${Kt ? "rgba(245,158,11,0.3)" : theme.border}`,
          borderRadius: 10,
          padding: "10px 12px",
          marginBottom: 6
        }}>{<div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: Kt || !pn ? 6 : 0
        }}>{<div style={{
          display: "flex",
          alignItems: "center",
          gap: 8
        }}>{<div style={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: si
        }} />}{<div>{<span style={{
          fontSize: 12,
          fontWeight: 600,
          color: pn ? theme.muted : theme.text
        }}>{Dov.label}</span>}{<span style={{
          fontSize: 10,
          color: theme.muted,
          marginLeft: 6
        }}>{formatShortDate(addDays(U, ml))}</span>}</div>}{Kt && <Badge color={theme.phase} style={{
          fontSize: 8
        }}>{"Custom"}</Badge>}{pn && <Badge color={theme.muted} style={{
          fontSize: 8
        }}>{"Logged"}</Badge>}</div>}{!pn && <div style={{
          display: "flex",
          gap: 5
        }}>{<button onClick={() => Aw(Ow === Ht ? null : Ht)} style={{
          background: "rgba(245,158,11,0.1)",
          border: "1px solid rgba(245,158,11,0.3)",
          borderRadius: 7,
          padding: "4px 8px",
          cursor: "pointer",
          color: theme.phase,
          fontSize: 10,
          fontFamily: "inherit"
        }}>{Ow === Ht ? "Close" : "Override"}</button>}{Kt && <button onClick={() => Bt(Ht)} style={{
          background: "none",
          border: `1px solid ${theme.border}`,
          borderRadius: 7,
          padding: "4px 8px",
          cursor: "pointer",
          color: theme.muted,
          fontSize: 10,
          fontFamily: "inherit"
        }}>{"Reset"}</button>}</div>}</div>}{<div style={{
          fontSize: 10,
          color: Kt ? theme.phase : theme.sub,
          lineHeight: 1.7,
          marginTop: 4
        }}>{ha.length > 0 ? ha.map(io => io.name).join(" \xB7 ") : <span style={{
          color: theme.muted,
          fontStyle: "italic"
        }}>{"No exercises"}</span>}</div>}{<div style={{
          fontSize: 10,
          color: theme.muted,
          marginTop: 4,
          display: "flex",
          alignItems: "center",
          gap: 4
        }}>{<Icon name={"bike"} size={10} color={theme.muted} />}{Pc ? `${activityLabel(Pc.activity)} \xB7 ${Pc.label || "No description"}` : "No cardio"}</div>}{Ow === Ht && <div style={{
          marginTop: 8,
          background: theme.carbon,
          borderRadius: 9,
          border: `1px solid ${theme.border}`,
          padding: "9px 10px"
        }}>{<div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 6
        }}>{<div style={{
          fontSize: 9,
          color: theme.muted,
          fontWeight: 700,
          letterSpacing: "0.04em",
          textTransform: "uppercase"
        }}>{"Cardio"}</div>}{y[Ht] && "cardio" in y[Ht] && <button onClick={() => Rc2(Ht)} style={{
          background: "none",
          border: "none",
          color: theme.muted,
          fontSize: 9,
          cursor: "pointer",
          padding: 0,
          fontFamily: "inherit"
        }}>{"Reset"}</button>}</div>}{<div style={{
          display: "flex",
          gap: 6
        }}>{<select value={Pc?.activity || "none"} onChange={ev => Zc(Ht, "activity", ev.target.value)} style={{
          background: theme.steel,
          border: `1px solid ${theme.border}`,
          borderRadius: 8,
          padding: "7px 4px",
          color: theme.text,
          fontSize: 11,
          fontFamily: "inherit",
          flexShrink: 0,
          width: 80
        }}>{<option value={"none"}>{"None"}</option>}{CARDIO_ACTIVITIES.map(ac => <option key={ac.k} value={ac.k}>{ac.l}</option>)}</select>}{Pc && <input value={Pc.label || ""} onChange={ev => Zc(Ht, "label", ev.target.value)} placeholder={"e.g. Endurance (20\u201330 min)"} style={{
          flex: 1,
          background: theme.steel,
          border: `1px solid ${theme.border}`,
          borderRadius: 8,
          padding: "7px 9px",
          color: theme.text,
          fontSize: 11,
          fontFamily: "inherit",
          minWidth: 0
        }} />}</div>}</div>}{Ow === Ht && <div style={{
          marginTop: 8,
          background: theme.carbon,
          borderRadius: 9,
          border: `1px solid ${theme.border}`,
          overflow: "hidden"
        }}>{ha.length === 0 && <div style={{
          padding: "10px 12px",
          fontSize: 11,
          color: theme.muted
        }}>{"No exercises yet."}</div>}{ha.map((Ex, xi) => <div key={Ex.id || xi} style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "7px 10px",
          borderBottom: xi < ha.length - 1 ? `1px solid ${theme.border}` : "none"
        }}>{<div style={{
          flex: 1,
          minWidth: 0
        }}>{<div style={{
          fontSize: 12,
          fontWeight: 600,
          color: theme.text,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap"
        }}>{Ex.name}</div>}{<div style={{
          fontSize: 9,
          color: theme.muted,
          marginTop: 1
        }}>{Ex.equip}{" · "}{Ex.sets}{"×"}{Ex.reps}</div>}</div>}{<div style={{
          display: "flex",
          gap: 5,
          flexShrink: 0
        }}>{<button onClick={() => T({
          scope: "week",
          weekNum: B,
          dayIdx: ml,
          exIdx: xi,
          dateKey: Ht
        })} style={{
          background: "rgba(59,130,246,0.1)",
          border: "1px solid rgba(59,130,246,0.25)",
          borderRadius: 6,
          padding: "4px 8px",
          cursor: "pointer",
          color: theme.pull,
          fontSize: 10,
          fontFamily: "inherit"
        }}>{"Edit"}</button>}{<button onClick={() => Ve(Ht, ml, xi)} style={{
          background: "rgba(233,69,96,0.08)",
          border: "1px solid rgba(233,69,96,0.2)",
          borderRadius: 6,
          padding: "4px 7px",
          cursor: "pointer"
        }}>{<Icon name={"x"} size={11} color={theme.push} />}</button>}</div>}</div>)}{<button onClick={() => S({
          scope: "week",
          weekNum: B,
          dayIdx: ml,
          dateKey: Ht
        })} style={{
          width: "100%",
          background: "none",
          border: "none",
          padding: "8px 10px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: 6,
          color: theme.muted,
          fontSize: 11,
          fontFamily: "inherit",
          borderTop: ha.length > 0 ? `1px dashed ${theme.border}` : "none"
        }}>{<Icon name={"plus"} size={13} color={theme.muted} />}{"Add Exercise"}</button>}</div>}</div>;
    })}</div>}</div>;
  })}{<button onClick={va} style={{
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      background: "none",
      border: `1.5px dashed ${theme.border}`,
      borderRadius: 12,
      padding: "14px",
      cursor: "pointer",
      color: theme.muted,
      fontFamily: "inherit",
      fontSize: 13,
      fontWeight: 600,
      marginTop: 4
    }}>{<Icon name={"plus"} size={16} color={theme.muted} />}{"Add Week "}{ga + 1}</button>}</div>}{A && <ExercisePicker currentExercises={A.scope === "week" ? H(A.dateKey, A.dayIdx) : resolveExercises(Ut[A.dayIdx], phaseKey(lp[ap]))} onSelect={B => {
      T({
        ...A,
        exIdx: -1,
        prefill: B
      }), S(null);
    }} onCustom={() => {
      T({
        ...A,
        exIdx: -1
      }), S(null);
    }} onClose={() => S(null)} />}{Dc && <div style={{
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.88)",
      display: "flex",
      alignItems: "flex-end",
      justifyContent: "center",
      zIndex: 500
    }} onClick={() => Sc(null)}>{<div style={{
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
    }}>{"Delete Week "}{Dc}{"?"}</div>}{<div style={{
      fontSize: 13,
      color: theme.sub,
      lineHeight: 1.5,
      marginBottom: 20
    }}>{"Any overrides for this week will be removed and later weeks will shift back by one. This can't be undone."}</div>}{<div style={{
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 8
    }}>{<button onClick={() => Sc(null)} style={{
      background: theme.steel,
      border: `1px solid ${theme.border}`,
      borderRadius: 10,
      padding: "12px",
      color: theme.text,
      fontSize: 14,
      fontWeight: 700,
      cursor: "pointer",
      fontFamily: "inherit"
    }}>{"Cancel"}</button>}{<button onClick={() => {
      oi(Dc), Sc(null);
    }} style={{
      background: "rgba(233,69,96,0.2)",
      border: "1px solid rgba(233,69,96,0.4)",
      borderRadius: 10,
      padding: "12px",
      color: theme.push,
      fontSize: 14,
      fontWeight: 700,
      cursor: "pointer",
      fontFamily: "inherit"
    }}>{"Delete Week"}</button>}</div>}</div>}</div>}{Dm && Dm.step === "menu" && <div style={{
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.85)",
      display: "flex",
      alignItems: "flex-end",
      justifyContent: "center",
      zIndex: 500
    }} onClick={() => SDm(null)}>{<div style={{
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
    }}>{"Clear Exercises — "}{Dm.label}</div>}{<button onClick={() => SDm({
      step: "confirm",
      dayIdx: Dm.dayIdx,
      all: false,
      label: `${Dm.label} (${lp[ap].name})`
    })} style={{
      width: "100%",
      textAlign: "left",
      background: theme.steel,
      border: `1px solid ${theme.border}`,
      borderRadius: 10,
      padding: "12px 14px",
      cursor: "pointer",
      marginBottom: 8,
      color: theme.text,
      fontSize: 13,
      fontFamily: "inherit"
    }}>{"This phase only ("}{lp[ap].name}{")"}</button>}{<button onClick={() => SDm({
      step: "confirm",
      dayIdx: Dm.dayIdx,
      all: true,
      label: `${Dm.label} (all phases)`
    })} style={{
      width: "100%",
      textAlign: "left",
      background: theme.steel,
      border: `1px solid ${theme.border}`,
      borderRadius: 10,
      padding: "12px 14px",
      cursor: "pointer",
      marginBottom: 8,
      color: theme.text,
      fontSize: 13,
      fontFamily: "inherit"
    }}>{"Across all phases"}</button>}{<button onClick={() => SDm(null)} style={{
      width: "100%",
      background: "none",
      border: "none",
      padding: "10px",
      color: theme.muted,
      fontSize: 13,
      cursor: "pointer",
      fontFamily: "inherit"
    }}>{"Cancel"}</button>}</div>}</div>}{Dm && Dm.step === "menu2" && <div style={{
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.85)",
      display: "flex",
      alignItems: "flex-end",
      justifyContent: "center",
      zIndex: 500
    }} onClick={() => SDm(null)}>{<div style={{
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
    }}>{"Clear Exercises"}</div>}{<button onClick={() => SDm({
      step: "confirm",
      dayIdx: null,
      all: false,
      label: `${lp[ap].name} (all days)`
    })} style={{
      width: "100%",
      textAlign: "left",
      background: theme.steel,
      border: `1px solid ${theme.border}`,
      borderRadius: 10,
      padding: "12px 14px",
      cursor: "pointer",
      marginBottom: 8,
      color: theme.text,
      fontSize: 13,
      fontFamily: "inherit"
    }}>{"This phase, all days ("}{lp[ap].name}{")"}</button>}{<button onClick={() => SDm({
      step: "confirm",
      dayIdx: null,
      all: true,
      label: "the entire program (all days, all phases)"
    })} style={{
      width: "100%",
      textAlign: "left",
      background: theme.steel,
      border: "1px solid rgba(233,69,96,0.3)",
      borderRadius: 10,
      padding: "12px 14px",
      cursor: "pointer",
      marginBottom: 8,
      color: theme.push,
      fontSize: 13,
      fontFamily: "inherit"
    }}>{"Entire program, all phases"}</button>}{<button onClick={() => SDm(null)} style={{
      width: "100%",
      background: "none",
      border: "none",
      padding: "10px",
      color: theme.muted,
      fontSize: 13,
      cursor: "pointer",
      fontFamily: "inherit"
    }}>{"Cancel"}</button>}</div>}</div>}{Dm && Dm.step === "confirm" && <div style={{
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.88)",
      display: "flex",
      alignItems: "flex-end",
      justifyContent: "center",
      zIndex: 500
    }} onClick={() => SDm(null)}>{<div style={{
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
    }}>{"Clear "}{Dm.label}{"?"}</div>}{<div style={{
      fontSize: 13,
      color: theme.sub,
      lineHeight: 1.5,
      marginBottom: 20
    }}>{"This removes every exercise for the selected scope. This can't be undone once you save."}</div>}{<div style={{
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 8
    }}>{<button onClick={() => SDm(null)} style={{
      background: theme.steel,
      border: `1px solid ${theme.border}`,
      borderRadius: 10,
      padding: "12px",
      color: theme.text,
      fontSize: 14,
      fontWeight: 700,
      cursor: "pointer",
      fontFamily: "inherit"
    }}>{"Cancel"}</button>}{<button onClick={() => clearEx(Dm.dayIdx, Dm.all)} style={{
      background: "rgba(233,69,96,0.2)",
      border: "1px solid rgba(233,69,96,0.4)",
      borderRadius: 10,
      padding: "12px",
      color: theme.push,
      fontSize: 14,
      fontWeight: 700,
      cursor: "pointer",
      fontFamily: "inherit"
    }}>{"Clear"}</button>}</div>}</div>}</div>}{E && (() => {
    let {
        scope: B,
        weekNum: U,
        dayIdx: L,
        exIdx: N,
        dateKey: P,
        prefill: Z
      } = E,
      ce = B === "week" ? H(P, L) : resolveExercises(f[L], phaseKey(lp[ap])),
      _e = Z || (N === -1 ? null : ce[N] || null);
    return <ExerciseEditorModal exercise={_e} onSave={$e => {
        B === "template" ? Me(L, N, $e) : Zt(P, L, N, $e);
      }} onClose={() => T(null)} />;
  })()}{M && (() => {
    let {
      dayIdx: B
    } = M;
    return <DayEditorModal day={f[B]} onSave={U => Le(B, U)} onClose={() => d(null)} />;
  })()}{r && <WeekDayPickerModal weekNum={r.weekNum} dayLabel={Ut[r.dayIdx]?.label || ""} onPick={Vt} onClose={() => v(null)} />}</div>;
}

