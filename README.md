# ForgeFit — source structure

This is the readable source behind `index.html`. `index.html` is the single
built file that actually gets deployed to GitHub Pages — it's generated from
everything in `src/` via esbuild and should not be hand-edited.

## Layout

```
src/
  theme.js                    Color palette, category colors
  constants.js                Program defaults: phases, exercise library,
                               cardio activity types, equipment, weekdays
  utils.js                    Date/week/phase math, localStorage helpers
  stats.js                    Progress-tab stat computations (streaks,
                               cardio buckets, exercise history)
  components/
    ui.jsx                    Icon, Badge, PrimaryButton, Card, Label,
                               Divider, DurationInput, StatRow
    SettingsModal.jsx
    Onboarding.jsx
    ExercisePicker.jsx         + ExerciseListItem
    ExerciseEditorModal.jsx
    DayEditorModal.jsx
    WeekDayPickerModal.jsx
    CalCard.jsx                Progress-tab calendar
    CardioCard.jsx             Progress-tab cardio distance chart
    StatsCard.jsx               Progress-tab stats row
  screens/
    HomeScreen.jsx
    SessionsScreen.jsx
    ProgramEditor.jsx           Full program/routine editor (biggest file)
    ProgramScreen.jsx
    ProgressScreen.jsx
  App.jsx                      Root component, tab navigation, top-level state
  main.jsx                     Entry point — mounts <App /> to #root
```

## Workflow

Same as before: describe a change, review the diff, test on `forgefit-dev`
GitHub Pages, promote to production when happy. The only difference is edits
now happen in `src/*.jsx` files instead of directly in minified `index.html`.
Claude rebuilds `index.html` from source and hands back both.

## What changed in this cleanup pass (July 2026)

- Converted from a single 145KB minified/bundled file into this source tree
- Renamed all identifiers from minified names (`fy`, `isRt`, `Xg`...) to
  meaningful ones (`ProgramEditor`, `isRoutineMode`, `resolveExercises`...)
- Converted compiled `createElement(...)` calls back to real JSX
- Removed 4 confirmed-dead exports that had zero references anywhere in the
  app: the old Peloton-style cardio type list, an unused background-tint
  map, an unused `> week 12` checker, and an unused routine-builder function
  (superseded by a newer one that's still in use)
- Verified byte-for-byte equivalent compiled output before/after the
  rename + JSX conversion (round-tripped back through esbuild and diffed
  against the pre-conversion version — zero differences)
- Confirmed the rebuilt app behaves identically to the original via
  automated browser testing across Home, Program, Sessions, and Progress

No behavior changed. This was a structural cleanup only.
