import { addDays, dayAt, formatShortDate, getToday, getWeekAndDay, isRoutineMode, makeRoutinePhase, parseDateKey, phaseForWeek, phaseKey, resolveExercises, startOfWeek, toDateKey } from './utils.js';
import { CARDIO_ACTIVITIES, EXERCISE_LIBRARY } from './constants.js';

export function ffDayStatus(dt, e, n, ov, t, l, ph) {
  let dk = toDateKey(dt),
    sk = e.startDate,
    tk = toDateKey(getToday());
  if (dk > tk) return "future";
  if (dk < sk) return "before";
  let logged = !!t[dk] || !!l[dk];
  if (logged) return "active";
  let {
      weekNum: wn,
      dayIndex: di
    } = getWeekAndDay(parseDateKey(sk), dt),
    tmpl = dayAt(di, n),
    ovr = ov[dk],
    exCount;
  if (ovr && ovr.exercises) exCount = ovr.exercises.length;else if (tmpl) {
    let routine = isRoutineMode(wn, ph, e),
      rp = routine ? makeRoutinePhase(ph) : phaseForWeek(wn, ph);
    exCount = resolveExercises(tmpl, phaseKey(rp)).length;
  } else exCount = 0;
  return exCount > 0 ? "missed" : "rest";
}

export function ffMonthGrid(md) {
  let y = md.getFullYear(),
    mo = md.getMonth(),
    first = new Date(y, mo, 1),
    dim = new Date(y, mo + 1, 0).getDate(),
    lead = (first.getDay() + 6) % 7,
    cells = [];
  for (let i = 0; i < lead; i++) cells.push({
    date: new Date(y, mo, 1 - (lead - i)),
    inMonth: false
  });
  for (let d = 1; d <= dim; d++) cells.push({
    date: new Date(y, mo, d),
    inMonth: true
  });
  for (; cells.length % 7 !== 0;) cells.push({
    date: addDays(cells[cells.length - 1].date, 1),
    inMonth: false
  });
  return cells;
}

export function ffStreaks(e, n, ov, t, l, ph) {
  let today = getToday(),
    sk = e.startDate,
    dayStreak = 0;
  ffDayStatus(today, e, n, ov, t, l, ph) === "active" && dayStreak++;
  let cur = addDays(today, -1);
  for (; toDateKey(cur) >= sk;) {
    let st = ffDayStatus(cur, e, n, ov, t, l, ph);
    if (st === "missed") break;
    (st === "active" || st === "rest") && dayStreak++, cur = addDays(cur, -1);
  }
  let wkActive = ws => {
      for (let i = 0; i < 7; i++) if (ffDayStatus(addDays(ws, i), e, n, ov, t, l, ph) === "active") return true;
      return false;
    },
    weekStreak = 0,
    wk = startOfWeek(today),
    first = true,
    sw = startOfWeek(parseDateKey(sk));
  for (; toDateKey(wk) >= toDateKey(sw);) {
    let act = wkActive(wk);
    if (act) weekStreak++;else if (!first) break;
    first = false, wk = addDays(wk, -7);
  }
  return {
    dayStreak,
    weekStreak
  };
}

export function ffNormType(ty2) {
  return CARDIO_ACTIVITIES.some(a => a.k === ty2) ? ty2 : "bike";
}

export function ffRefDate(period, off, rt) {
  if (period === "1W") return addDays(rt, off * 7);
  if (period === "1M") return addDays(rt, off * 30);
  if (period === "3M") return new Date(rt.getFullYear(), rt.getMonth() + off * 3, rt.getDate());
  if (period === "1Y") return new Date(rt.getFullYear(), rt.getMonth() + off * 12, rt.getDate());
  return rt;
}

export function ffCardioStats(period, cat, l, e, off) {
  let rt = getToday(),
    today = ffRefDate(period, off || 0, rt),
    start;
  if (period === "1W") start = addDays(today, -6);else if (period === "1M") start = addDays(today, -29);else if (period === "3M") start = new Date(today.getFullYear(), today.getMonth() - 2, 1);else if (period === "1Y") start = new Date(today.getFullYear(), today.getMonth() - 11, 1);else {
    start = parseDateKey(e.startDate), today = rt;
  }
  let sk = toDateKey(start),
    tk = toDateKey(today),
    entries = Object.entries(l).filter(([dk, r]) => ffNormType(r.type) === cat && dk >= sk && dk <= tk && parseFloat(r.distance) > 0),
    total = entries.reduce((a, [, r]) => a + (parseFloat(r.distance) || 0), 0),
    rangeDays = Math.round((today - start) / 864e5) + 1,
    weeks = Math.max(rangeDays / 7, 1);
  return {
    total: Math.round(total * 100) / 100,
    weeklyAvg: Math.round(total / weeks * 100) / 100,
    activityAvg: entries.length ? Math.round(total / entries.length * 100) / 100 : 0,
    count: entries.length,
    start,
    end: today
  };
}

export function ffCardioBuckets(period, cat, l, e, off) {
  let rt = getToday(),
    today = ffRefDate(period, off || 0, rt);
  if (period === "1W") {
    let start = addDays(today, -6);
    return Array.from({
      length: 7
    }, (_, i) => {
      let d = addDays(start, i),
        dk = toDateKey(d),
        r = l[dk],
        v = r && ffNormType(r.type) === cat ? parseFloat(r.distance) || 0 : 0;
      return {
        label: "SMTWTFS"[d.getDay()],
        total: v
      };
    });
  }
  if (period === "1M") {
    let start = addDays(today, -27);
    return Array.from({
      length: 4
    }, (_, w) => {
      let wStart = addDays(start, w * 7),
        total = 0;
      for (let i = 0; i < 7; i++) {
        let dk = toDateKey(addDays(wStart, i)),
          r = l[dk];
        r && ffNormType(r.type) === cat && (total += parseFloat(r.distance) || 0);
      }
      return {
        label: formatShortDate(wStart),
        total
      };
    });
  }
  let monthsBack;
  if (period === "1Y") monthsBack = 11;else if (period === "All") {
    today = rt;
    let start = parseDateKey(e.startDate);
    monthsBack = (today.getFullYear() - start.getFullYear()) * 12 + (today.getMonth() - start.getMonth());
  } else monthsBack = 2;
  return Array.from({
    length: monthsBack + 1
  }, (_, idx) => {
    let m = monthsBack - idx,
      md = new Date(today.getFullYear(), today.getMonth() - m, 1),
      total = 0;
    return Object.entries(l).forEach(([dk, r]) => {
      if (ffNormType(r.type) !== cat) return;
      let rd = parseDateKey(dk);
      rd.getFullYear() === md.getFullYear() && rd.getMonth() === md.getMonth() && (total += parseFloat(r.distance) || 0);
    }), {
      label: md.toLocaleDateString("en-US", {
        month: "short"
      }),
      total
    };
  });
}

export function ffStatsForPeriod(period, t, l, e) {
  let today = getToday(),
    start;
  if (period === "7D") start = addDays(today, -6);else if (period === "30D") start = addDays(today, -29);else if (period === "90D") start = addDays(today, -89);else start = parseDateKey(e.startDate);
  let sk = toDateKey(start),
    tk = toDateKey(today),
    sessions = Object.entries(t).filter(([D]) => D >= sk && D <= tk),
    rides = Object.entries(l).filter(([D]) => D >= sk && D <= tk),
    totalMin = rides.reduce((a, [, r]) => a + (parseFloat(r.duration) || 0), 0),
    totalCal = rides.reduce((a, [, r]) => a + (parseFloat(r.output) || 0), 0);
  return {
    workouts: sessions.length + rides.length,
    strength: sessions.length,
    cardio: rides.length,
    hrs: Math.floor(totalMin / 60),
    mins: Math.round(totalMin % 60),
    cal: Math.round(totalCal),
    start,
    end: today
  };
}

export function ffExMeta(n) {
  let map = {};
  return n.forEach(D => {
    let ex = D.exercises;
    Array.isArray(ex) ? ex.forEach(x => {
      map[x.id] = x;
    }) : ex && typeof ex == "object" && Object.values(ex).forEach(arr => {
      (arr || []).forEach(x => {
        map[x.id] = x;
      });
    });
  }), map;
}

export function ffMuscleOf(name) {
  let hit = EXERCISE_LIBRARY.find(x => x.name === name);
  return hit ? hit.muscle : "Other";
}

export function ffTrainedExercises(n, t) {
  let exMeta = ffExMeta(n),
    loggedIds = [...new Set(Object.values(t).flatMap(sess => Object.entries(sess.exercises || {}).filter(([, sets]) => sets.some(S => S.done)).map(([id]) => id)))];
  return loggedIds.map(id => {
    let meta = exMeta[id] || {
      id,
      name: id,
      equip: ""
    };
    return {
      id,
      name: meta.name,
      equip: meta.equip,
      muscle: ffMuscleOf(meta.name),
      log: ffExLog(id, t)
    };
  });
}

export function ffExLog(exId, t) {
  return Object.entries(t).filter(([, D]) => D.exercises?.[exId]?.some(S => S.done)).map(([D, q]) => {
    let sets = q.exercises[exId].filter(S => S.done),
      topW = Math.max(...sets.map(S => parseFloat(S.weight) || 0));
    return {
      key: D,
      date: D,
      sets,
      topW
    };
  }).sort((D, q) => D.date.localeCompare(q.date));
}

