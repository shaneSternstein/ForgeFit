import React from 'react';
import { DEFAULT_PROGRAM_DAYS, PHASE_SUMMARIES } from './constants.js';
import { loadFromStorage, saveToStorage } from './utils.js';
import { theme } from './theme.js';
import { Onboarding } from './components/Onboarding.jsx';
import { Icon } from './components/ui.jsx';
import { HomeScreen } from './screens/HomeScreen.jsx';
import { ProgramScreen } from './screens/ProgramScreen.jsx';
import { SessionsScreen } from './screens/SessionsScreen.jsx';
import { ProgressScreen } from './screens/ProgressScreen.jsx';
import { SettingsModal } from './components/SettingsModal.jsx';

export function App() {
  let [e, t] = (0, React.useState)(false),
    [l, n] = (0, React.useState)(null),
    [i, a] = (0, React.useState)({}),
    [o, c] = (0, React.useState)({}),
    [f, m] = (0, React.useState)(DEFAULT_PROGRAM_DAYS),
    [y, b] = (0, React.useState)({}),
    [p, h] = (0, React.useState)("home"),
    [E, T] = (0, React.useState)(false),
    [M, d] = (0, React.useState)({}),
    [r, v] = (0, React.useState)(false),
    [g, _] = (0, React.useState)(false),
    [O, z] = (0, React.useState)(90),
    [Pp, zp] = (0, React.useState)(PHASE_SUMMARIES),
    [XN, setXN] = (0, React.useState)({}),
    [Tg, setTg] = (0, React.useState)(0),
    A = (0, React.useRef)(null);
  (0, React.useEffect)(() => {
    (async () => {
      let Q = await loadFromStorage("settings:user"),
        Me = (await loadFromStorage("data:sessions")) || {},
        Le = (await loadFromStorage("data:rides")) || {},
        Zt = (await loadFromStorage("program:days")) || DEFAULT_PROGRAM_DAYS,
        Ve = (await loadFromStorage("program:overrides")) || {},
        pp = (await loadFromStorage("program:phases")) || PHASE_SUMMARIES,
        SDft = (await loadFromStorage("session:draft")) || {},
        ExNo = (await loadFromStorage("data:exerciseNotes")) || {};
      n(Q), a(Me), c(Le), m(Zt), b(Ve), zp(pp), d(SDft), setXN(ExNo), t(true);
    })();
  }, []);
  (0, React.useEffect)(() => {
    e && saveToStorage("session:draft", M);
  }, [M, e]);
  let XNSet = async Q => {
    setXN(Q), await saveToStorage("data:exerciseNotes", Q);
  };
  let S = async (Q, Me) => {
      let Le = {
        ...i,
        [Q]: Me
      };
      a(Le), await saveToStorage("data:sessions", Le);
    },
    D = async (Q, Me) => {
      let Le = {
        ...o,
        [Q]: Me
      };
      c(Le), await saveToStorage("data:rides", Le);
    },
    q = async Q => {
      n(Q), await saveToStorage("settings:user", Q);
    },
    j = async Q => {
      m(Q), await saveToStorage("program:days", Q);
    },
    H = async Q => {
      b(Q), await saveToStorage("program:overrides", Q);
    },
    Kp = async Q => {
      zp(Q), await saveToStorage("program:phases", Q);
    },
    K = (0, React.useCallback)(() => {
      try {
        let Q = new (window.AudioContext || window.webkitAudioContext)(),
          BpG = Math.max(0, Math.min(1, (l?.beepVolume ?? 40) / 100));
        [[880, 0, 0.12], [880, 0.15, 0.12], [1320, 0.3, 0.25]].forEach(([Me, Le, Zt]) => {
          let Ve = Q.createOscillator(),
            Bt = Q.createGain();
          Ve.connect(Bt), Bt.connect(Q.destination), Ve.frequency.value = Me, Ve.type = "sine", Bt.gain.setValueAtTime(BpG, Q.currentTime + Le), Bt.gain.exponentialRampToValueAtTime(1e-3, Q.currentTime + Le + Zt), Ve.start(Q.currentTime + Le), Ve.stop(Q.currentTime + Le + Zt + 0.05);
        });
      } catch {}
    }, [l]);
  if ((0, React.useEffect)(() => {
    if (!r || g) {
      clearInterval(A.current);
      return;
    }
    return A.current = setInterval(() => {
      z(Q => Q <= 1 ? (clearInterval(A.current), v(false), K(), 0) : Q - 1);
    }, 1e3), () => clearInterval(A.current);
  }, [r, g, Tg]), !e) return <div style={{
      minHeight: "100vh",
      background: theme.black,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "system-ui,sans-serif"
    }}>{<div style={{
      fontSize: 11,
      fontFamily: "monospace",
      letterSpacing: "0.2em",
      color: theme.muted,
      textTransform: "uppercase"
    }}>{"Loading"}</div>}</div>;
  if (!l) return <Onboarding onComplete={n} />;
  let ze = [{
    id: "home",
    label: "Home",
    icon: "home"
  }, {
    id: "program",
    label: "Program",
    icon: "program"
  }, {
    id: "sessions",
    label: "Sessions",
    icon: "sessions"
  }, {
    id: "progress",
    label: "Progress",
    icon: "progress"
  }];
  return <div style={{
      minHeight: "100vh",
      background: theme.black,
      fontFamily: "system-ui,sans-serif",
      width: "100%",
      position: "relative",
      display: "flex",
      flexDirection: "column"
    }}>{<div style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      zIndex: 40,
      background: "rgba(13,13,15,0.95)",
      borderBottom: `1px solid ${theme.border}`,
      backdropFilter: "blur(8px)",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "10px 16px",
      height: 56
    }}>{<div style={{
      fontSize: 11,
      fontFamily: "monospace",
      letterSpacing: "0.18em",
      color: theme.push,
      textTransform: "uppercase",
      fontWeight: 700
    }}>{"ForgeFit"}</div>}{<div style={{
      display: "flex",
      alignItems: "center",
      gap: 8
    }}>{r && p !== "sessions" && <button onClick={() => h("sessions")} style={{
      background: "rgba(168,85,247,0.15)",
      border: `1px solid ${theme.pelo}`,
      borderRadius: 20,
      padding: "3px 10px",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      gap: 5
    }}>{<Icon name={"timer"} size={12} color={theme.pelo} />}{<span style={{
      fontSize: 11,
      fontFamily: "monospace",
      fontWeight: 800,
      color: theme.pelo
    }}>{String(Math.floor(O / 60)).padStart(2, "0")}{":"}{String(O % 60).padStart(2, "0")}</span>}</button>}{<button onClick={() => T(true)} style={{
      background: theme.steel,
      border: `1px solid ${theme.border}`,
      borderRadius: 10,
      padding: 7,
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}>{<Icon name={"gear"} size={18} color={theme.sub} />}</button>}</div>}</div>}{<div style={{
      flex: 1,
      overflowY: "auto",
      paddingBottom: 80,
      paddingTop: 56
    }}>{p === "home" && <HomeScreen settings={l} sessions={i} rides={o} days={f} navigate={h} phases={Pp} />}{p === "program" && <ProgramScreen settings={l} sessions={i} rides={o} days={f} overrides={y} onSaveDays={j} onSaveOverrides={H} phases={Pp} onSavePhases={Kp} onSaveSettings={q} />}{p === "sessions" && <SessionsScreen settings={l} sessions={i} rides={o} days={f} overrides={y} sessionDraft={M} setSessionDraft={d} onSaveSession={S} onSaveRide={D} timerRunning={r} setTimerRunning={v} timerPaused={g} setTimerPaused={_} timerVal={O} setTimerVal={z} timerRef={A} phases={Pp} exerciseNotes={XN} onSaveExerciseNotes={XNSet} bumpTimer={setTg} />}{p === "progress" && <ProgressScreen settings={l} sessions={i} rides={o} days={f} overrides={y} phases={Pp} />}</div>}{<div style={{
      position: "fixed",
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 40,
      background: theme.carbon,
      borderTop: `1px solid ${theme.border}`,
      display: "flex",
      paddingBottom: "env(safe-area-inset-bottom,8px)"
    }}>{ze.map(Q => {
    let Me = p === Q.id;
    return <button key={Q.id} onClick={() => h(Q.id)} style={{
        flex: 1,
        background: "none",
        border: "none",
        cursor: "pointer",
        padding: "10px 4px 4px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 3,
        position: "relative"
      }}>{<Icon name={Q.icon} size={22} color={Me ? theme.push : theme.muted} strokeWidth={Me ? 2 : 1.5} />}{<span style={{
        fontSize: 9,
        fontFamily: "monospace",
        letterSpacing: "0.06em",
        textTransform: "uppercase",
        color: Me ? theme.push : theme.muted
      }}>{Q.label}</span>}{<div style={{
        width: Me ? 20 : 0,
        height: 2,
        background: theme.push,
        borderRadius: 1,
        transition: "width 0.2s"
      }} />}</button>;
  })}</div>}{E && <SettingsModal settings={l} onSave={q} onClose={() => T(false)} />}</div>;
}

