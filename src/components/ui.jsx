import React from 'react';
import { theme } from '../theme.js';

export const Icon = ({
    name: e,
    size: t = 22,
    color: l = theme.sub,
    strokeWidth: n = 1.5
  }) => {
    let i = {
        width: t,
        height: t,
        display: "block",
        flexShrink: 0
      },
      a = {
        fill: "none",
        stroke: l,
        strokeWidth: n,
        strokeLinecap: "round",
        strokeLinejoin: "round"
      };
    switch (e) {
      case "home":
        return <svg viewBox={"0 0 24 24"} style={i}>{<path {...a} d={"M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H15v-5h-6v5H4a1 1 0 01-1-1V9.5z"} />}</svg>;
      case "program":
        return <svg viewBox={"0 0 24 24"} style={i}>{<rect {...a} x={"3"} y={"4"} width={"18"} height={"17"} rx={"2"} />}{<path {...a} d={"M3 9h18M8 4V2M16 4V2"} />}{<circle fill={l} stroke={"none"} cx={"8"} cy={"14"} r={"1.2"} />}{<circle fill={l} stroke={"none"} cx={"12"} cy={"14"} r={"1.2"} />}{<circle fill={l} stroke={"none"} cx={"16"} cy={"14"} r={"1.2"} />}</svg>;
      case "sessions":
        return <svg viewBox={"0 0 24 24"} style={i}>{<rect {...a} x={"3"} y={"3"} width={"8"} height={"8"} rx={"1.5"} />}{<rect {...a} x={"13"} y={"3"} width={"8"} height={"8"} rx={"1.5"} />}{<rect {...a} x={"3"} y={"13"} width={"8"} height={"8"} rx={"1.5"} />}{<path {...a} d={"M13 17h8M17 13v8"} />}</svg>;
      case "progress":
        return <svg viewBox={"0 0 24 24"} style={i}>{<path {...a} d={"M3 20h18M3 20V4"} />}{<polyline {...a} points={"6,16 10,10 14,13 19,6"} />}{<circle fill={l} stroke={"none"} cx={"19"} cy={"6"} r={"2"} />}</svg>;
      case "gear":
        return <svg viewBox={"0 0 24 24"} style={i}>{<path {...a} d={"M12 15a3 3 0 100-6 3 3 0 000 6z"} />}{<path {...a} d={"M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"} />}</svg>;
      case "chevron-left":
        return <svg viewBox={"0 0 24 24"} style={i}>{<polyline {...a} points={"15,18 9,12 15,6"} />}</svg>;
      case "chevron-right":
        return <svg viewBox={"0 0 24 24"} style={i}>{<polyline {...a} points={"9,18 15,12 9,6"} />}</svg>;
      case "chevron-up":
        return <svg viewBox={"0 0 24 24"} style={i}>{<polyline {...a} points={"18,15 12,9 6,15"} />}</svg>;
      case "chevron-down":
        return <svg viewBox={"0 0 24 24"} style={i}>{<polyline {...a} points={"6,9 12,15 18,9"} />}</svg>;
      case "lock":
        return <svg viewBox={"0 0 24 24"} style={i}>{<rect {...a} x={"5"} y={"11"} width={"14"} height={"10"} rx={"2"} />}{<path {...a} d={"M8 11V7a4 4 0 018 0v4"} />}</svg>;
      case "search":
        return <svg viewBox={"0 0 24 24"} style={i}>{<circle {...a} cx={"11"} cy={"11"} r={"7"} />}{<line {...a} x1={"21"} y1={"21"} x2={"16.65"} y2={"16.65"} />}</svg>;
      case "edit":
        return <svg viewBox={"0 0 24 24"} style={i}>{<path {...a} d={"M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"} />}{<path {...a} d={"M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"} />}</svg>;
      case "check-circle":
        return <svg viewBox={"0 0 24 24"} style={i}>{<circle {...a} cx={"12"} cy={"12"} r={"9"} />}{<polyline {...a} points={"9,12 11,14 15,10"} />}</svg>;
      case "dumbbell":
        return <svg viewBox={"0 0 24 24"} style={i}>{<rect {...a} x={"2"} y={"10"} width={"4"} height={"4"} rx={"1"} />}{<rect {...a} x={"18"} y={"10"} width={"4"} height={"4"} rx={"1"} />}{<rect {...a} x={"5"} y={"8"} width={"3"} height={"8"} rx={"1"} />}{<rect {...a} x={"16"} y={"8"} width={"3"} height={"8"} rx={"1"} />}{<line {...a} x1={"8"} y1={"12"} x2={"16"} y2={"12"} />}</svg>;
      case "bike":
        return <svg viewBox={"0 0 24 24"} style={i}>{<circle {...a} cx={"5.5"} cy={"16.5"} r={"3.5"} />}{<circle {...a} cx={"18.5"} cy={"16.5"} r={"3.5"} />}{<polyline {...a} points={"15,16.5 11,7 8,7"} />}{<polyline {...a} points={"11,7 15,7 18.5,16.5"} />}{<line {...a} x1={"5.5"} y1={"16.5"} x2={"11"} y2={"7"} />}{<circle {...a} cx={"15"} cy={"5"} r={"1.5"} />}</svg>;
      case "trophy":
        return <svg viewBox={"0 0 24 24"} style={i}>{<path {...a} d={"M8 21h8M12 17v4M6 3H4a2 2 0 000 4c0 3 2 5 4 6"} />}{<path {...a} d={"M18 3h2a2 2 0 010 4c0 3-2 5-4 6"} />}{<path {...a} d={"M6 3h12v7a6 6 0 01-12 0V3z"} />}</svg>;
      case "star":
        return <svg viewBox={"0 0 24 24"} style={i}>{<polygon {...a} points={"12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"} />}</svg>;
      case "info":
        return <svg viewBox={"0 0 24 24"} style={i}>{<circle {...a} cx={"12"} cy={"12"} r={"9"} />}{<line {...a} x1={"12"} y1={"8"} x2={"12"} y2={"8.5"} />}{<line {...a} x1={"12"} y1={"11"} x2={"12"} y2={"16"} />}</svg>;
      case "timer":
        return <svg viewBox={"0 0 24 24"} style={i}>{<circle {...a} cx={"12"} cy={"13"} r={"8"} />}{<path {...a} d={"M12 9v4l3 3"} />}{<path {...a} d={"M9 3h6M12 3v2"} />}</svg>;
      case "copy":
        return <svg viewBox={"0 0 24 24"} style={i}>{<rect {...a} x={"9"} y={"9"} width={"13"} height={"13"} rx={"2"} />}{<path {...a} d={"M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"} />}</svg>;
      case "plus":
        return <svg viewBox={"0 0 24 24"} style={i}>{<line {...a} x1={"12"} y1={"5"} x2={"12"} y2={"19"} />}{<line {...a} x1={"5"} y1={"12"} x2={"19"} y2={"12"} />}</svg>;
      case "minus":
        return <svg viewBox={"0 0 24 24"} style={i}>{<line {...a} x1={"5"} y1={"12"} x2={"19"} y2={"12"} />}</svg>;
      case "x":
        return <svg viewBox={"0 0 24 24"} style={i}>{<line {...a} x1={"18"} y1={"6"} x2={"6"} y2={"18"} />}{<line {...a} x1={"6"} y1={"6"} x2={"18"} y2={"18"} />}</svg>;
      default:
        return null;
    }
  };

export const Badge = ({
    color: e,
    bg: t,
    children: l,
    style: n = {}
  }) => <span style={{
      display: "inline-block",
      padding: "2px 8px",
      borderRadius: 6,
      fontSize: 10,
      fontWeight: 700,
      fontFamily: "monospace",
      color: e,
      background: t || e + "22",
      letterSpacing: "0.06em",
      ...n
    }}>{l}</span>;

export const PrimaryButton = ({
    onClick: e,
    color: t = theme.push,
    children: l,
    style: n = {},
    outline: i = false,
    disabled: a = false,
    small: o = false
  }) => <button onClick={e} disabled={a} style={{
      background: i ? "transparent" : a ? "#2a2a35" : t,
      color: i ? t : a ? theme.muted : theme.white,
      border: i ? `1.5px solid ${t}` : "none",
      borderRadius: 10,
      padding: o ? "7px 12px" : "11px 16px",
      fontWeight: 700,
      fontSize: o ? 11 : 13,
      cursor: a ? "not-allowed" : "pointer",
      letterSpacing: "0.02em",
      fontFamily: "inherit",
      width: "100%",
      opacity: a ? 0.5 : 1,
      ...n
    }}>{l}</button>;

export const Card = ({
    children: e,
    style: t = {}
  }) => <div style={{
      background: theme.steel,
      borderRadius: 12,
      padding: "12px 14px",
      marginBottom: 8,
      border: `1px solid ${theme.border}`,
      ...t
    }}>{e}</div>;

export const Label = ({
    children: e,
    style: t = {}
  }) => <div style={{
      fontSize: 9,
      fontFamily: "monospace",
      letterSpacing: "0.14em",
      textTransform: "uppercase",
      color: theme.muted,
      marginBottom: 6,
      ...t
    }}>{e}</div>;

export const Divider = ({
    style: e = {}
  }) => <div style={{
      height: 1,
      background: theme.border,
      margin: "12px 0",
      ...e
    }} />;

export function DurationInput({
  value: e,
  onChange: t,
  label: l
}) {
  let n = Math.floor(e / 60),
    i = e % 60,
    a = f => t(Math.max(0, f) * 60 + i),
    o = f => t(n * 60 + Math.max(0, Math.min(59, f))),
    c = (f, m, y) => <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 0,
        background: theme.steel,
        borderRadius: 10,
        border: `1px solid ${theme.border}`,
        overflow: "hidden",
        width: 70
      }}>{<button onClick={() => m(f + 1)} style={{
        background: "none",
        border: "none",
        padding: "8px 0",
        cursor: "pointer",
        color: theme.muted,
        fontSize: 18,
        lineHeight: 1,
        width: "100%"
      }}>{"▲"}</button>}{<div style={{
        fontSize: 24,
        fontWeight: 800,
        fontFamily: "monospace",
        color: theme.pelo,
        padding: "6px 0",
        textAlign: "center",
        width: "100%",
        background: "rgba(168,85,247,0.1)",
        borderTop: `1px solid ${theme.border}`,
        borderBottom: `1px solid ${theme.border}`
      }}>{String(f).padStart(2, "0")}</div>}{<button onClick={() => m(f - 1)} style={{
        background: "none",
        border: "none",
        padding: "8px 0",
        cursor: "pointer",
        color: theme.muted,
        fontSize: 18,
        lineHeight: 1,
        width: "100%"
      }}>{"▼"}</button>}</div>;
  return <div style={{
      marginBottom: 20
    }}>{<Label>{l}</Label>}{<div style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 10
    }}>{c(n, a, 59)}{<span style={{
      fontSize: 24,
      fontWeight: 800,
      color: theme.muted,
      fontFamily: "monospace"
    }}>{":"}</span>}{c(i, o, 59)}{<div style={{
      fontSize: 12,
      color: theme.muted,
      marginLeft: 4
    }}>{<div>{"mm"}</div>}{<div>{"ss"}</div>}</div>}</div>}{<div style={{
      textAlign: "center",
      fontSize: 11,
      color: theme.muted,
      marginTop: 6
    }}>{"= "}{e}{"s total"}</div>}</div>;
}

export function StatRow({
  label,
  value,
  sub
}) {
  return <div style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: sub ? "6px 0 6px 14px" : "10px 0",
      borderBottom: sub ? "none" : `1px solid ${theme.border}`
    }}>{<span style={{
      fontSize: sub ? 13 : 14.5,
      color: sub ? theme.muted : theme.text
    }}>{label}</span>}{<span style={{
      fontSize: sub ? 14 : 18,
      fontWeight: sub ? 500 : 700,
      color: sub ? theme.muted : theme.text,
      fontFamily: "monospace"
    }}>{value}</span>}</div>;
}

