
export const DEFAULT_PHASES = [{
    id: 1,
    label: "Phase 1",
    weeks: [1, 2, 3, 4],
    rides: 2,
    ridedays: [3, 6],
    desc: "Strength foundation. Easy rides Wed + Sat only.",
    weekFocus: ["Learn the movements. Form over load on every exercise. Log everything \u2014 this is your baseline.", "Starting to feel the pattern. Add 1 rep where you can. Keep rides conversational.", "Strength habits forming. Push the rep ceiling \u2014 if you hit 12 reps, go heavier next week.", "Final foundation week. Deload Friday if fatigued. Saturday ride is your longest yet."],
    rideGuidance: "Wed: Easy Spin 20\u201330 min after lifting. Sat: Long Endurance 45\u201360 min. Both conversational \u2014 no hard efforts yet."
  }, {
    id: 2,
    label: "Phase 2",
    weeks: [5, 6, 7, 8],
    rides: 4,
    ridedays: [1, 3, 4, 6],
    desc: "Add HIIT Mon + Thu morning. 4 rides/week.",
    weekFocus: ["First week with Mon morning HIIT. Keep it 20 min. Your body is adapting to two-a-days.", "Two-a-days becoming routine. Thu morning ride added. Monitor recovery closely.", "Volume peak for Phase 2. If lifts stall, cut a ride \u2014 never the strength session.", "Consolidation week. You're at 4 rides. Phase 3 adds 2 more \u2014 make sure you're recovering well."],
    rideGuidance: "Mon + Thu: HIIT or Power Zone 20\u201330 min. Wed: Easy Spin after lifting. Sat: Long Endurance 45\u201360 min."
  }, {
    id: 3,
    label: "Phase 3",
    weeks: [9, 10, 11, 12],
    rides: 6,
    ridedays: [1, 2, 3, 4, 5, 6],
    desc: "Full program. Daily morning rides.",
    weekFocus: ["First week of full daily riding. Tue + Fri endurance rides are new \u2014 keep them genuinely easy.", "All systems running. Track recovery: sleep quality, resting HR, appetite.", "Peak program week. PRs should appear regularly. Trust the progressive overload.", "Final week. Finish strong \u2014 document your top sets. Your Week 1 baseline is now obsolete."],
    rideGuidance: "Mon + Thu: HIIT or Power Zone. Tue + Fri: Endurance 20\u201330 min. Wed: Power Zone Endurance after lifting. Sat: Long Endurance 45\u201360 min."
  }];

export const CARDIO_ACTIVITIES = [{
    k: "bike",
    l: "Bike"
  }, {
    k: "run",
    l: "Run"
  }, {
    k: "row",
    l: "Row"
  }, {
    k: "elliptical",
    l: "Elliptical"
  }, {
    k: "walk",
    l: "Walk"
  }, {
    k: "swim",
    l: "Swim"
  }, {
    k: "stairs",
    l: "Stairs"
  }, {
    k: "other",
    l: "Other"
  }];

export const DEFAULT_PROGRAM_DAYS = [{
    id: "push_a",
    label: "Push A",
    type: "push",
    dayOfWeek: 1,
    peloton: {
      ph1: null,
      ph2: "HIIT or Power Zone (20\u201330 min)",
      ph3: "HIIT or Power Zone (20\u201330 min)"
    },
    exercises: [{
      id: "flat_bench",
      name: "Flat Lever Bench Press",
      equip: "Levergym",
      sets: 4,
      reps: "6\u201310",
      note: "Primary compound \u2014 heaviest push movement"
    }, {
      id: "inc_bench",
      name: "Incline Lever Bench Press",
      equip: "Levergym",
      sets: 3,
      reps: "8\u201312",
      note: "Upper chest emphasis"
    }, {
      id: "iso_shoulder",
      name: "Isolateral Shoulder Press",
      equip: "Levergym",
      sets: 3,
      reps: "8\u201312",
      note: "Each arm independently for balance"
    }, {
      id: "lat_raise",
      name: "DB Lateral Raise",
      equip: "Dumbbells",
      sets: 3,
      reps: "12\u201315",
      note: "Control the eccentric \u2014 3 sec down"
    }, {
      id: "tri_pushdown",
      name: "Overhead Triceps Pushdown",
      equip: "Levergym",
      sets: 3,
      reps: "10\u201312",
      note: "Use short triceps bar attachment"
    }, {
      id: "tri_ext",
      name: "DB Overhead Triceps Extension",
      equip: "Dumbbells",
      sets: 3,
      reps: "10\u201312",
      note: "Keep elbows tight \u2014 don't flare"
    }]
  }, {
    id: "pull_a",
    label: "Pull A",
    type: "pull",
    dayOfWeek: 2,
    peloton: {
      ph1: null,
      ph2: null,
      ph3: "Endurance (20\u201330 min)"
    },
    exercises: [{
      id: "wide_pulldown",
      name: "Wide Grip Pulldown",
      equip: "Levergym",
      sets: 4,
      reps: "8\u201312",
      note: "Full stretch at top, squeeze at bottom"
    }, {
      id: "iso_row",
      name: "Isolateral Bent Over Row",
      equip: "Levergym",
      sets: 4,
      reps: "8\u201310",
      note: "Heaviest row \u2014 drive elbows back"
    }, {
      id: "low_row",
      name: "Low Cable Row",
      equip: "Levergym",
      sets: 3,
      reps: "10\u201312",
      note: "Chest tall, no rounding"
    }, {
      id: "hi_curl",
      name: "High Cable Bicep Curl",
      equip: "Levergym",
      sets: 3,
      reps: "10\u201312",
      note: "Arms fixed \u2014 isolate the bicep"
    }, {
      id: "hammer_curl",
      name: "DB Hammer Curl",
      equip: "Dumbbells",
      sets: 3,
      reps: "10\u201312",
      note: "Neutral grip \u2014 targets brachialis too"
    }, {
      id: "rear_fly",
      name: "DB Rear Delt Fly",
      equip: "Dumbbells",
      sets: 3,
      reps: "12\u201315",
      note: "Slight bend in elbow, lead with elbows"
    }]
  }, {
    id: "legs_a",
    label: "Legs A",
    type: "legs",
    dayOfWeek: 3,
    peloton: {
      ph1: "Easy Spin after lifting (20\u201330 min)",
      ph2: "Easy Spin after lifting (20\u201330 min)",
      ph3: "Power Zone Endurance after lifting (30\u201345 min)"
    },
    exercises: [{
      id: "lever_squat",
      name: "Lever Squat",
      equip: "Levergym",
      sets: 4,
      reps: "8\u201310",
      note: "Bench detached \u2014 feet shoulder-width"
    }, {
      id: "rdl",
      name: "DB Romanian Deadlift",
      equip: "Dumbbells",
      sets: 3,
      reps: "10\u201312",
      note: "Hip hinge \u2014 feel the hamstring stretch"
    }, {
      id: "rev_lunge",
      name: "DB Reverse Lunge",
      equip: "Dumbbells",
      sets: 3,
      reps: "10 each",
      note: "Step back \u2014 knee tracks over toe"
    }, {
      id: "calf_raise",
      name: "Lever Calf Raise",
      equip: "Levergym",
      sets: 4,
      reps: "15\u201320",
      note: "Full ROM \u2014 slow and controlled"
    }, {
      id: "plank",
      name: "Plank",
      equip: "Bodyweight",
      sets: 3,
      reps: "45\u201360 sec",
      note: "Neutral spine \u2014 don't let hips sag"
    }, {
      id: "russian_twist",
      name: "DB Russian Twist",
      equip: "Dumbbells",
      sets: 3,
      reps: "15 each",
      note: "Control rotation \u2014 keep feet off floor"
    }]
  }, {
    id: "push_b",
    label: "Push B",
    type: "push",
    dayOfWeek: 4,
    peloton: {
      ph1: null,
      ph2: "HIIT or Power Zone (20\u201330 min)",
      ph3: "HIIT or Power Zone (20\u201330 min)"
    },
    exercises: [{
      id: "dec_bench",
      name: "Decline Lever Bench Press",
      equip: "Levergym",
      sets: 4,
      reps: "8\u201310",
      note: "Lower chest \u2014 different angle from Mon"
    }, {
      id: "db_inc_press",
      name: "DB Incline Press",
      equip: "Dumbbells",
      sets: 3,
      reps: "8\u201312",
      note: "Free weight \u2014 stabilisers work harder"
    }, {
      id: "upright_row",
      name: "Lever Upright Row",
      equip: "Levergym",
      sets: 3,
      reps: "10\u201312",
      note: "Elbows lead above shoulders"
    }, {
      id: "front_raise",
      name: "DB Front Lateral Raise",
      equip: "Dumbbells",
      sets: 3,
      reps: "12\u201315",
      note: "Anterior delt \u2014 avoid swinging"
    }, {
      id: "und_pushdown",
      name: "Underhand Tricep Pushdown",
      equip: "Levergym",
      sets: 3,
      reps: "10\u201312",
      note: "Supinated grip hits long head"
    }, {
      id: "lever_dip",
      name: "Lever Dip",
      equip: "Levergym",
      sets: 3,
      reps: "To failure",
      note: "Forward lean = chest, upright = triceps"
    }]
  }, {
    id: "pull_b",
    label: "Pull B",
    type: "pull",
    dayOfWeek: 5,
    peloton: {
      ph1: null,
      ph2: null,
      ph3: "Endurance (20\u201330 min)"
    },
    exercises: [{
      id: "und_pulldown",
      name: "Underhand Pulldown",
      equip: "Levergym",
      sets: 4,
      reps: "8\u201312",
      note: "Supinated grip \u2014 more bicep involvement"
    }, {
      id: "wide_row",
      name: "Wide Grip Lever Row",
      equip: "Levergym",
      sets: 4,
      reps: "8\u201310",
      note: "Wider grip hits lats differently"
    }, {
      id: "shrug",
      name: "Lever Shrug",
      equip: "Levergym",
      sets: 3,
      reps: "12\u201315",
      note: "Pause at top, no rolling"
    }, {
      id: "low_curl",
      name: "Low Cable Bicep Curl",
      equip: "Levergym",
      sets: 3,
      reps: "10\u201312",
      note: "Constant tension throughout"
    }, {
      id: "inc_curl",
      name: "DB Incline Curl",
      equip: "Dumbbells",
      sets: 3,
      reps: "10\u201312",
      note: "Stretch at bottom for long head"
    }, {
      id: "hi_lo_fly",
      name: "High-to-Low Cable Fly (rear)",
      equip: "Levergym",
      sets: 3,
      reps: "12\u201315",
      note: "Arms wide \u2014 rear delt focus"
    }]
  }, {
    id: "legs_b",
    label: "Legs B",
    type: "legs",
    dayOfWeek: 6,
    peloton: {
      ph1: "Long Endurance (45\u201360 min)",
      ph2: "Long Endurance (45\u201360 min)",
      ph3: "Long Endurance (45\u201360 min)"
    },
    exercises: [{
      id: "narrow_squat",
      name: "Lever Squat (narrow stance)",
      equip: "Levergym",
      sets: 4,
      reps: "10\u201312",
      note: "Narrower stance = more quad emphasis"
    }, {
      id: "sumo_dl",
      name: "DB Sumo Deadlift",
      equip: "Dumbbells",
      sets: 3,
      reps: "10\u201312",
      note: "Wide stance, toes out \u2014 inner thigh + glutes"
    }, {
      id: "walk_lunge",
      name: "DB Walking Lunge",
      equip: "Dumbbells",
      sets: 3,
      reps: "12 each",
      note: "Step long \u2014 keep torso upright"
    }, {
      id: "single_calf",
      name: "Lever Calf Raise (single leg)",
      equip: "Levergym",
      sets: 3,
      reps: "15 each",
      note: "Unilateral to fix imbalances"
    }, {
      id: "knee_raise",
      name: "Hanging Knee Raise",
      equip: "Bodyweight",
      sets: 3,
      reps: "15\u201320",
      note: "Hanging preferred \u2014 decompresses spine"
    }, {
      id: "farmer_carry",
      name: "DB Farmer Carry",
      equip: "Dumbbells",
      sets: 3,
      reps: "40 ft",
      note: "Heavy as possible \u2014 grip + core + traps"
    }]
  }];

export const EQUIPMENT_TYPES = ["Levergym", "Dumbbells", "Bodyweight", "Barbell", "Cable", "Machine", "Other"];

export const WEEKDAY_NAMES = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export const MUSCLE_GROUPS = ["All", "Chest", "Back", "Shoulders", "Arms", "Legs", "Core", "Full Body"];

export const EXERCISE_LIBRARY = [{
    id: "lb_flat_bench",
    name: "Flat Lever Bench Press",
    equip: "Levergym",
    sets: 4,
    reps: "6\u201310",
    muscle: "Chest",
    note: "Primary compound \u2014 heaviest push movement"
  }, {
    id: "lb_inc_bench",
    name: "Incline Lever Bench Press",
    equip: "Levergym",
    sets: 3,
    reps: "8\u201312",
    muscle: "Chest",
    note: "Upper chest emphasis"
  }, {
    id: "lb_dec_bench",
    name: "Decline Lever Bench Press",
    equip: "Levergym",
    sets: 4,
    reps: "8\u201310",
    muscle: "Chest",
    note: "Lower chest \u2014 different angle"
  }, {
    id: "lb_db_inc_press",
    name: "DB Incline Press",
    equip: "Dumbbells",
    sets: 3,
    reps: "8\u201312",
    muscle: "Chest",
    note: "Free weight \u2014 stabilisers work harder"
  }, {
    id: "lb_db_flat_press",
    name: "DB Flat Press",
    equip: "Dumbbells",
    sets: 3,
    reps: "8\u201312",
    muscle: "Chest",
    note: "Full range of motion"
  }, {
    id: "lb_db_fly",
    name: "DB Chest Fly",
    equip: "Dumbbells",
    sets: 3,
    reps: "12\u201315",
    muscle: "Chest",
    note: "Keep slight bend in elbows throughout"
  }, {
    id: "lb_cable_fly",
    name: "Cable Chest Fly",
    equip: "Levergym",
    sets: 3,
    reps: "12\u201315",
    muscle: "Chest",
    note: "Constant tension \u2014 squeeze at top"
  }, {
    id: "lb_hi_lo_fly",
    name: "High-to-Low Cable Fly",
    equip: "Levergym",
    sets: 3,
    reps: "12\u201315",
    muscle: "Chest",
    note: "Targets lower chest fibers"
  }, {
    id: "lb_lo_hi_fly",
    name: "Low-to-High Cable Fly",
    equip: "Levergym",
    sets: 3,
    reps: "12\u201315",
    muscle: "Chest",
    note: "Targets upper chest fibers"
  }, {
    id: "lb_lever_dip",
    name: "Lever Dip",
    equip: "Levergym",
    sets: 3,
    reps: "To failure",
    muscle: "Chest",
    note: "Forward lean = chest, upright = triceps"
  }, {
    id: "lb_pushup",
    name: "Push-Up",
    equip: "Bodyweight",
    sets: 3,
    reps: "15\u201320",
    muscle: "Chest",
    note: "Control the descent \u2014 3 sec down"
  }, {
    id: "lb_iso_shoulder",
    name: "Isolateral Shoulder Press",
    equip: "Levergym",
    sets: 3,
    reps: "8\u201312",
    muscle: "Shoulders",
    note: "Each arm independently"
  }, {
    id: "lb_db_ohp",
    name: "DB Overhead Press",
    equip: "Dumbbells",
    sets: 3,
    reps: "8\u201312",
    muscle: "Shoulders",
    note: "Core tight \u2014 don't arch lower back"
  }, {
    id: "lb_lat_raise",
    name: "DB Lateral Raise",
    equip: "Dumbbells",
    sets: 3,
    reps: "12\u201315",
    muscle: "Shoulders",
    note: "Control the eccentric \u2014 3 sec down"
  }, {
    id: "lb_front_raise",
    name: "DB Front Lateral Raise",
    equip: "Dumbbells",
    sets: 3,
    reps: "12\u201315",
    muscle: "Shoulders",
    note: "Anterior delt \u2014 avoid swinging"
  }, {
    id: "lb_cable_lat",
    name: "Cable Lateral Raise",
    equip: "Levergym",
    sets: 3,
    reps: "12\u201315",
    muscle: "Shoulders",
    note: "Constant tension vs dumbbells"
  }, {
    id: "lb_upright_row",
    name: "Lever Upright Row",
    equip: "Levergym",
    sets: 3,
    reps: "10\u201312",
    muscle: "Shoulders",
    note: "Elbows lead above shoulders"
  }, {
    id: "lb_face_pull",
    name: "Face Pull",
    equip: "Levergym",
    sets: 3,
    reps: "12\u201315",
    muscle: "Shoulders",
    note: "Targets rear delts and rotator cuff"
  }, {
    id: "lb_arnold",
    name: "Arnold Press",
    equip: "Dumbbells",
    sets: 3,
    reps: "10\u201312",
    muscle: "Shoulders",
    note: "Rotate as you press for full delt coverage"
  }, {
    id: "lb_tri_pushdown",
    name: "Overhead Triceps Pushdown",
    equip: "Levergym",
    sets: 3,
    reps: "10\u201312",
    muscle: "Arms",
    note: "Short bar attachment"
  }, {
    id: "lb_und_pushdown",
    name: "Underhand Tricep Pushdown",
    equip: "Levergym",
    sets: 3,
    reps: "10\u201312",
    muscle: "Arms",
    note: "Supinated grip hits long head"
  }, {
    id: "lb_tri_ext",
    name: "DB Overhead Triceps Extension",
    equip: "Dumbbells",
    sets: 3,
    reps: "10\u201312",
    muscle: "Arms",
    note: "Keep elbows tight \u2014 don't flare"
  }, {
    id: "lb_skull_crusher",
    name: "DB Skull Crusher",
    equip: "Dumbbells",
    sets: 3,
    reps: "10\u201312",
    muscle: "Arms",
    note: "Lower to forehead, press back up"
  }, {
    id: "lb_dip",
    name: "Tricep Dip",
    equip: "Bodyweight",
    sets: 3,
    reps: "To failure",
    muscle: "Arms",
    note: "Elbows back, body upright for tricep focus"
  }, {
    id: "lb_kickback",
    name: "DB Tricep Kickback",
    equip: "Dumbbells",
    sets: 3,
    reps: "12\u201315",
    muscle: "Arms",
    note: "Extend fully at the top"
  }, {
    id: "lb_wide_pulldown",
    name: "Wide Grip Pulldown",
    equip: "Levergym",
    sets: 4,
    reps: "8\u201312",
    muscle: "Back",
    note: "Full stretch at top, squeeze at bottom"
  }, {
    id: "lb_und_pulldown",
    name: "Underhand Pulldown",
    equip: "Levergym",
    sets: 4,
    reps: "8\u201312",
    muscle: "Back",
    note: "Supinated grip \u2014 more bicep involvement"
  }, {
    id: "lb_close_pulldown",
    name: "Close Grip Pulldown",
    equip: "Levergym",
    sets: 3,
    reps: "8\u201312",
    muscle: "Back",
    note: "Neutral grip \u2014 hits lower lats"
  }, {
    id: "lb_iso_row",
    name: "Isolateral Bent Over Row",
    equip: "Levergym",
    sets: 4,
    reps: "8\u201310",
    muscle: "Back",
    note: "Heaviest row \u2014 drive elbows back"
  }, {
    id: "lb_wide_row",
    name: "Wide Grip Lever Row",
    equip: "Levergym",
    sets: 4,
    reps: "8\u201310",
    muscle: "Back",
    note: "Wider grip hits lats differently"
  }, {
    id: "lb_low_row",
    name: "Low Cable Row",
    equip: "Levergym",
    sets: 3,
    reps: "10\u201312",
    muscle: "Back",
    note: "Chest tall, no rounding"
  }, {
    id: "lb_db_row",
    name: "DB Single Arm Row",
    equip: "Dumbbells",
    sets: 3,
    reps: "10\u201312",
    muscle: "Back",
    note: "Drive elbow back, squeeze at top"
  }, {
    id: "lb_pullup",
    name: "Pull-Up",
    equip: "Bodyweight",
    sets: 3,
    reps: "To failure",
    muscle: "Back",
    note: "Full hang at bottom, chin over bar"
  }, {
    id: "lb_shrug",
    name: "Lever Shrug",
    equip: "Levergym",
    sets: 3,
    reps: "12\u201315",
    muscle: "Back",
    note: "Pause at top, no rolling"
  }, {
    id: "lb_db_shrug",
    name: "DB Shrug",
    equip: "Dumbbells",
    sets: 3,
    reps: "12\u201315",
    muscle: "Back",
    note: "Straight up \u2014 no rolling"
  }, {
    id: "lb_straight_arm",
    name: "Straight Arm Pulldown",
    equip: "Levergym",
    sets: 3,
    reps: "12\u201315",
    muscle: "Back",
    note: "Arms straight \u2014 isolates lats"
  }, {
    id: "lb_rear_fly",
    name: "DB Rear Delt Fly",
    equip: "Dumbbells",
    sets: 3,
    reps: "12\u201315",
    muscle: "Shoulders",
    note: "Slight bend in elbow, lead with elbows"
  }, {
    id: "lb_hi_lo_rear",
    name: "High-to-Low Cable Fly (rear)",
    equip: "Levergym",
    sets: 3,
    reps: "12\u201315",
    muscle: "Shoulders",
    note: "Arms wide \u2014 rear delt focus"
  }, {
    id: "lb_hi_curl",
    name: "High Cable Bicep Curl",
    equip: "Levergym",
    sets: 3,
    reps: "10\u201312",
    muscle: "Arms",
    note: "Arms fixed \u2014 isolate the bicep"
  }, {
    id: "lb_low_curl",
    name: "Low Cable Bicep Curl",
    equip: "Levergym",
    sets: 3,
    reps: "10\u201312",
    muscle: "Arms",
    note: "Constant tension throughout"
  }, {
    id: "lb_hammer_curl",
    name: "DB Hammer Curl",
    equip: "Dumbbells",
    sets: 3,
    reps: "10\u201312",
    muscle: "Arms",
    note: "Neutral grip \u2014 targets brachialis too"
  }, {
    id: "lb_inc_curl",
    name: "DB Incline Curl",
    equip: "Dumbbells",
    sets: 3,
    reps: "10\u201312",
    muscle: "Arms",
    note: "Stretch at bottom for long head"
  }, {
    id: "lb_conc_curl",
    name: "DB Concentration Curl",
    equip: "Dumbbells",
    sets: 3,
    reps: "12\u201315",
    muscle: "Arms",
    note: "Elbow on inner thigh \u2014 pure isolation"
  }, {
    id: "lb_spider_curl",
    name: "Spider Curl",
    equip: "Dumbbells",
    sets: 3,
    reps: "12\u201315",
    muscle: "Arms",
    note: "Lean over bench \u2014 eliminates shoulder swing"
  }, {
    id: "lb_db_curl",
    name: "DB Standing Curl",
    equip: "Dumbbells",
    sets: 3,
    reps: "10\u201312",
    muscle: "Arms",
    note: "Supinate at top for full contraction"
  }, {
    id: "lb_cross_curl",
    name: "Cross Body Hammer Curl",
    equip: "Dumbbells",
    sets: 3,
    reps: "10\u201312",
    muscle: "Arms",
    note: "Across body \u2014 hits brachialis hard"
  }, {
    id: "lb_lever_squat",
    name: "Lever Squat",
    equip: "Levergym",
    sets: 4,
    reps: "8\u201310",
    muscle: "Legs",
    note: "Bench detached \u2014 feet shoulder-width"
  }, {
    id: "lb_narrow_squat",
    name: "Lever Squat (narrow stance)",
    equip: "Levergym",
    sets: 4,
    reps: "10\u201312",
    muscle: "Legs",
    note: "Narrower stance = more quad emphasis"
  }, {
    id: "lb_sumo_dl",
    name: "DB Sumo Deadlift",
    equip: "Dumbbells",
    sets: 3,
    reps: "10\u201312",
    muscle: "Legs",
    note: "Wide stance, toes out \u2014 inner thigh + glutes"
  }, {
    id: "lb_rdl",
    name: "DB Romanian Deadlift",
    equip: "Dumbbells",
    sets: 3,
    reps: "10\u201312",
    muscle: "Legs",
    note: "Hip hinge \u2014 feel the hamstring stretch"
  }, {
    id: "lb_rev_lunge",
    name: "DB Reverse Lunge",
    equip: "Dumbbells",
    sets: 3,
    reps: "10 each",
    muscle: "Legs",
    note: "Step back \u2014 knee tracks over toe"
  }, {
    id: "lb_walk_lunge",
    name: "DB Walking Lunge",
    equip: "Dumbbells",
    sets: 3,
    reps: "12 each",
    muscle: "Legs",
    note: "Step long \u2014 keep torso upright"
  }, {
    id: "lb_split_squat",
    name: "DB Bulgarian Split Squat",
    equip: "Dumbbells",
    sets: 3,
    reps: "10 each",
    muscle: "Legs",
    note: "Rear foot elevated \u2014 brutal quad builder"
  }, {
    id: "lb_step_up",
    name: "DB Step-Up",
    equip: "Dumbbells",
    sets: 3,
    reps: "12 each",
    muscle: "Legs",
    note: "Drive through heel of front foot"
  }, {
    id: "lb_calf_raise",
    name: "Lever Calf Raise",
    equip: "Levergym",
    sets: 4,
    reps: "15\u201320",
    muscle: "Legs",
    note: "Full ROM \u2014 slow and controlled"
  }, {
    id: "lb_single_calf",
    name: "Lever Calf Raise (single leg)",
    equip: "Levergym",
    sets: 3,
    reps: "15 each",
    muscle: "Legs",
    note: "Unilateral to fix imbalances"
  }, {
    id: "lb_db_calf",
    name: "DB Standing Calf Raise",
    equip: "Dumbbells",
    sets: 4,
    reps: "15\u201320",
    muscle: "Legs",
    note: "Full stretch at bottom"
  }, {
    id: "lb_glute_bridge",
    name: "Glute Bridge",
    equip: "Bodyweight",
    sets: 3,
    reps: "15\u201320",
    muscle: "Legs",
    note: "Squeeze glutes at top \u2014 hold 1 sec"
  }, {
    id: "lb_hip_thrust",
    name: "DB Hip Thrust",
    equip: "Dumbbells",
    sets: 3,
    reps: "12\u201315",
    muscle: "Legs",
    note: "Shoulders on bench, drive hips up"
  }, {
    id: "lb_leg_curl",
    name: "DB Leg Curl (lying)",
    equip: "Dumbbells",
    sets: 3,
    reps: "12\u201315",
    muscle: "Legs",
    note: "Hold DB between feet"
  }, {
    id: "lb_nordic",
    name: "Nordic Hamstring Curl",
    equip: "Bodyweight",
    sets: 3,
    reps: "5\u20138",
    muscle: "Legs",
    note: "Slow eccentric \u2014 elite hamstring builder"
  }, {
    id: "lb_plank",
    name: "Plank",
    equip: "Bodyweight",
    sets: 3,
    reps: "45\u201360 sec",
    muscle: "Core",
    note: "Neutral spine \u2014 don't let hips sag"
  }, {
    id: "lb_side_plank",
    name: "Side Plank",
    equip: "Bodyweight",
    sets: 3,
    reps: "30\u201345 sec",
    muscle: "Core",
    note: "Stack feet or stagger for balance"
  }, {
    id: "lb_russian_twist",
    name: "DB Russian Twist",
    equip: "Dumbbells",
    sets: 3,
    reps: "15 each",
    muscle: "Core",
    note: "Control rotation \u2014 keep feet off floor"
  }, {
    id: "lb_knee_raise",
    name: "Hanging Knee Raise",
    equip: "Bodyweight",
    sets: 3,
    reps: "15\u201320",
    muscle: "Core",
    note: "Hanging preferred \u2014 decompresses spine"
  }, {
    id: "lb_leg_raise",
    name: "Hanging Leg Raise",
    equip: "Bodyweight",
    sets: 3,
    reps: "10\u201315",
    muscle: "Core",
    note: "Keep legs straight \u2014 full ROM"
  }, {
    id: "lb_ab_wheel",
    name: "Ab Wheel Rollout",
    equip: "Bodyweight",
    sets: 3,
    reps: "10\u201312",
    muscle: "Core",
    note: "Keep hips in line \u2014 don't sag"
  }, {
    id: "lb_cable_crunch",
    name: "Cable Crunch",
    equip: "Levergym",
    sets: 3,
    reps: "12\u201315",
    muscle: "Core",
    note: "Crunch with abs \u2014 not neck pull"
  }, {
    id: "lb_pallof",
    name: "Pallof Press",
    equip: "Levergym",
    sets: 3,
    reps: "12 each",
    muscle: "Core",
    note: "Anti-rotation \u2014 brace the core"
  }, {
    id: "lb_dead_bug",
    name: "Dead Bug",
    equip: "Bodyweight",
    sets: 3,
    reps: "10 each",
    muscle: "Core",
    note: "Lower back pressed to floor throughout"
  }, {
    id: "lb_mountain",
    name: "Mountain Climbers",
    equip: "Bodyweight",
    sets: 3,
    reps: "20 each",
    muscle: "Core",
    note: "Hips level \u2014 drive knees to chest"
  }, {
    id: "lb_farmer_carry",
    name: "DB Farmer Carry",
    equip: "Dumbbells",
    sets: 3,
    reps: "40 ft",
    muscle: "Full Body",
    note: "Heavy as possible \u2014 grip + core + traps"
  }, {
    id: "lb_kb_swing",
    name: "Kettlebell Swing",
    equip: "Dumbbells",
    sets: 3,
    reps: "15\u201320",
    muscle: "Full Body",
    note: "Hip hinge power \u2014 not a squat"
  }, {
    id: "lb_clean_press",
    name: "DB Clean and Press",
    equip: "Dumbbells",
    sets: 3,
    reps: "8\u201310",
    muscle: "Full Body",
    note: "Explosive pull into overhead press"
  }, {
    id: "lb_thruster",
    name: "DB Thruster",
    equip: "Dumbbells",
    sets: 3,
    reps: "10\u201312",
    muscle: "Full Body",
    note: "Squat into overhead press \u2014 no rest"
  }, {
    id: "lb_burpee",
    name: "Burpee",
    equip: "Bodyweight",
    sets: 3,
    reps: "10\u201315",
    muscle: "Full Body",
    note: "Full extension at top"
  }, {
    id: "lb_renegade_row",
    name: "Renegade Row",
    equip: "Dumbbells",
    sets: 3,
    reps: "8 each",
    muscle: "Full Body",
    note: "Push-up position \u2014 anti-rotation challenge"
  }];

export const COLOR_PALETTE = [{
    name: "Red",
    value: "#E94560"
  }, {
    name: "Blue",
    value: "#3B82F6"
  }, {
    name: "Green",
    value: "#10B981"
  }, {
    name: "Purple",
    value: "#A855F7"
  }, {
    name: "Amber",
    value: "#F59E0B"
  }, {
    name: "Cyan",
    value: "#06B6D4"
  }, {
    name: "Pink",
    value: "#EC4899"
  }, {
    name: "Slate",
    value: "#64748B"
  }];

export const STORAGE_PREFIX = "forgefit:";

export const PHASE_SUMMARIES = DEFAULT_PHASES.map(e => ({
    id: e.id,
    name: e.label,
    weeks: e.weeks.length,
    desc: e.desc,
    weekFocus: e.weekFocus,
    rideGuidance: e.rideGuidance
  }));

