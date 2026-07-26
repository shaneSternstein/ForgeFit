import React from 'react';
import { saveToStorage } from '../utils.js';
import { theme } from '../theme.js';
import { Divider, DurationInput, Icon, Label, PrimaryButton } from './ui.jsx';

export function SettingsModal({
  settings: e,
  onSave: t,
  onClose: l
}) {
  let [a, o] = (0, React.useState)(e.unit || "lbs"),
    [c, f] = (0, React.useState)(e.setRestTime || 60),
    [m, y] = (0, React.useState)(e.exRestTime || 120),
    [b, p] = (0, React.useState)(false),
    [asT, setAsT] = (0, React.useState)(e.autoStartTimer !== false),
    [bpV, setBpV] = (0, React.useState)(e.beepVolume ?? 40),
    h = async () => {
      let d = {
        ...e,
        unit: a,
        setRestTime: c,
        exRestTime: m,
        autoStartTimer: asT,
        beepVolume: bpV
      };
      await saveToStorage("settings:user", d), t(d), l();
    },
    E = async () => {
      await saveToStorage("settings:user", null), await saveToStorage("data:sessions", {}), await saveToStorage("data:rides", {}), window.location.reload();
    };
  return <div style={{
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.85)",
      display: "flex",
      alignItems: "flex-end",
      zIndex: 200
    }} onClick={l}>{<div style={{
      background: theme.carbon,
      borderRadius: "20px 20px 0 0",
      padding: "24px 20px 44px",
      width: "100%",
      border: `1px solid ${theme.border}`,
      maxHeight: "90vh",
      overflowY: "auto"
    }} onClick={T => T.stopPropagation()}>{<div style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 20
    }}>{<div style={{
      fontSize: 17,
      fontWeight: 800,
      color: theme.text
    }}>{"Settings"}</div>}{<button onClick={l} style={{
      background: "none",
      border: "none",
      color: theme.muted,
      cursor: "pointer",
      padding: 4
    }}>{<Icon name={"x"} size={20} color={theme.muted} />}</button>}</div>}{<Label>{"Weight Unit"}</Label>}{<div style={{
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 8,
      marginBottom: 20
    }}>{["lbs", "kg"].map(T => <button key={T} onClick={() => o(T)} style={{
      background: a === T ? "rgba(233,69,96,0.15)" : theme.steel,
      border: `1.5px solid ${a === T ? theme.push : theme.border}`,
      borderRadius: 8,
      padding: "10px",
      color: a === T ? theme.push : theme.sub,
      fontWeight: 700,
      fontSize: 14,
      cursor: "pointer",
      fontFamily: "inherit"
    }}>{T}</button>)}</div>}{<DurationInput value={c} onChange={f} label={"Rest Between Sets"} />}{<DurationInput value={m} onChange={y} label={"Rest Between Exercises"} />}{<Label>{"Auto-Start Rest Timer"}</Label>}{<div style={{
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 8,
      marginBottom: 20
    }}>{["On", "Off"].map(T => <button key={T} onClick={() => setAsT(T === "On")} style={{
      background: (asT ? "On" : "Off") === T ? "rgba(233,69,96,0.15)" : theme.steel,
      border: `1.5px solid ${(asT ? "On" : "Off") === T ? theme.push : theme.border}`,
      borderRadius: 8,
      padding: "10px",
      color: (asT ? "On" : "Off") === T ? theme.push : theme.sub,
      fontWeight: 700,
      fontSize: 14,
      cursor: "pointer",
      fontFamily: "inherit"
    }}>{T}</button>)}</div>}{<Label>{"Timer Beep Volume ("}{bpV}{"%)"}</Label>}{<input type={"range"} min={0} max={100} value={bpV} onChange={C => setBpV(Number(C.target.value))} style={{
      width: "100%",
      marginBottom: 20,
      accentColor: theme.push
    }} />}{<PrimaryButton onClick={h} style={{
      marginBottom: 12
    }}>{"Save Changes"}</PrimaryButton>}{<Divider />}{b ? <div style={{
      background: "rgba(233,69,96,0.08)",
      border: "1px solid rgba(233,69,96,0.3)",
      borderRadius: 10,
      padding: "14px",
      textAlign: "center"
    }}>{<div style={{
      fontSize: 13,
      color: theme.text,
      marginBottom: 10
    }}>{"This will erase all sessions, rides, and settings. Are you sure?"}</div>}{<div style={{
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 8
    }}>{<button onClick={() => p(false)} style={{
      background: theme.steel,
      border: `1px solid ${theme.border}`,
      borderRadius: 8,
      padding: "9px",
      color: theme.sub,
      cursor: "pointer",
      fontFamily: "inherit",
      fontSize: 13
    }}>{"Cancel"}</button>}{<button onClick={E} style={{
      background: "rgba(233,69,96,0.2)",
      border: "1px solid rgba(233,69,96,0.4)",
      borderRadius: 8,
      padding: "9px",
      color: theme.push,
      cursor: "pointer",
      fontFamily: "inherit",
      fontSize: 13,
      fontWeight: 700
    }}>{"Erase Everything"}</button>}</div>}</div> : <button onClick={() => p(true)} style={{
      background: "none",
      border: "1px solid rgba(233,69,96,0.3)",
      borderRadius: 10,
      padding: "11px",
      width: "100%",
      color: "rgba(233,69,96,0.6)",
      fontSize: 13,
      cursor: "pointer",
      fontFamily: "inherit"
    }}>{"Reset All Data"}</button>}</div>}</div>;
}

