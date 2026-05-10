import React, { useEffect, useMemo, useState } from "react";
import * as htmlToImage from "html-to-image";
import { createClient } from "@supabase/supabase-js";
const CSV_URLS = {
  workshops: "https://docs.google.com/spreadsheets/d/e/2PACX-1vTokxKzviEcDBLh2UGUImhc7_ljyfNvdt2E7vHwHLSO8Cvap_yyzMpm0VblZKjs_Y7we4hh_hYWz7Bw/pub?gid=0&single=true&output=csv",
  artists: "https://docs.google.com/spreadsheets/d/e/2PACX-1vTokxKzviEcDBLh2UGUImhc7_ljyfNvdt2E7vHwHLSO8Cvap_yyzMpm0VblZKjs_Y7we4hh_hYWz7Bw/pub?gid=1358673515&single=true&output=csv",
  locations: "https://docs.google.com/spreadsheets/d/e/2PACX-1vTokxKzviEcDBLh2UGUImhc7_ljyfNvdt2E7vHwHLSO8Cvap_yyzMpm0VblZKjs_Y7we4hh_hYWz7Bw/pub?gid=1924639896&single=true&output=csv",
};
const ADVANCED_LEVEL_ASSESSMENT_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSdVehpLy7zVnFIDcS6E1RdWjhQwpqA0tOui0-JXOlkkL-CRJA/viewform?usp=sharing&ouid=118189387469591371378";
const SUPABASE_URL = "https://nskzzqzioovzgamwyxyl.supabase.co";

const SUPABASE_ANON_KEY =
  "sb_publishable_FWvh6KpEDlyHxg-1FrzjQA_JcXz7E2r";

const supabase = createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);
const fallbackWorkshops = [
  { Workshop_ID: "F001", Day: "Friday", Start_Time: "15:30", End_Time: "18:00", Room: "Restaurant", Room_Group: "Tempodrom", Sort_Index: "1", Workshop_Title: "Social Dance Training", Artist_1: "Fuquan", Artist_2: "Candace", Level: "Advanced", Category: "Salsa", Style: "On2", Partnerwork: "Yes", Signup_Required: "Yes", Notes: "Not included in regular passes" },
  { Workshop_ID: "F002", Day: "Friday", Start_Time: "15:30", End_Time: "16:30", Room: "Big Arena", Room_Group: "Tempodrom", Sort_Index: "1", Workshop_Title: "Partnerwork on2", Artist_1: "Ernesto", Artist_2: "Denisse", Level: "Advanced", Category: "Mambo", Style: "On2", Partnerwork: "Yes", Signup_Required: "No", Notes: "" },
  { Workshop_ID: "F003", Day: "Friday", Start_Time: "16:45", End_Time: "17:45", Room: "Studio A", Room_Group: "Sporthall", Sort_Index: "2", Workshop_Title: "Musicality for Social Dancers", Artist_1: "Moe Flex", Artist_2: "", Level: "Intermediate", Category: "Salsa", Style: "On1", Partnerwork: "No", Signup_Required: "No", Notes: "Limited capacity · No street shoes allowed. Only dance shoes or sports shoes. Shoes must be changed before entering the Sporthall." },
  { Workshop_ID: "F004", Day: "Friday", Start_Time: "18:00", End_Time: "19:00", Room: "Sky Room", Room_Group: "Aletto Hotel", Sort_Index: "3", Workshop_Title: "Cuban Body Movement", Artist_1: "Leo", Artist_2: "Marta", Level: "Advanced+", Category: "Cuban", Partnerwork: "No", Signup_Required: "No", Notes: "" },
  { Workshop_ID: "F005", Day: "Friday", Start_Time: "19:10", End_Time: "20:10", Room: "Conference Hall", Room_Group: "Holiday Inn Express", Sort_Index: "4", Workshop_Title: "Ladies Styling Flow", Artist_1: "Sofia", Artist_2: "", Level: "Intermediate", Category: "Ladies Styling", Partnerwork: "No", Signup_Required: "No", Notes: "Bring comfortable shoes" },
  { Workshop_ID: "S001", Day: "Saturday", Start_Time: "11:30", End_Time: "12:30", Room: "Big Arena", Room_Group: "Tempodrom", Sort_Index: "10", Workshop_Title: "Partnerwork on1", Artist_1: "Owen", Artist_2: "Nadia", Level: "Intermediate/Advanced", Category: "Salsa", Style: "On1", Partnerwork: "Yes", Signup_Required: "No", Notes: "" },
  { Workshop_ID: "S002", Day: "Saturday", Start_Time: "12:45", End_Time: "13:45", Room: "Studio B", Room_Group: "Sporthall", Sort_Index: "11", Workshop_Title: "Footwork Explosion", Artist_1: "Carlos", Artist_2: "", Level: "Advanced", Category: "Mambo", Style: "On2", Partnerwork: "No", Signup_Required: "No", Notes: "No street shoes allowed. Only dance shoes or sports shoes. Shoes must be changed before entering the Sporthall." },
  { Workshop_ID: "S003", Day: "Saturday", Start_Time: "14:00", End_Time: "15:00", Room: "Sky Room", Room_Group: "Aletto Hotel", Sort_Index: "12", Workshop_Title: "Cuban Partner Connection", Artist_1: "Roly", Artist_2: "Laura", Level: "Intermediate", Category: "Cuban", Partnerwork: "Yes", Signup_Required: "No", Notes: "" },
  { Workshop_ID: "SU001", Day: "Sunday", Start_Time: "12:30", End_Time: "13:30", Room: "Small Arena", Room_Group: "Tempodrom", Sort_Index: "20", Workshop_Title: "Partnerwork on2", Artist_1: "Jacopo", Artist_2: "Linda", Level: "Advanced", Category: "Salsa", Partnerwork: "Yes", Signup_Required: "No", Notes: "" },
  { Workshop_ID: "SU002", Day: "Sunday", Start_Time: "13:45", End_Time: "14:45", Room: "Conference Hall", Room_Group: "Holiday Inn Express", Sort_Index: "21", Workshop_Title: "Bachata Fusion Lab", Artist_1: "Miguel", Artist_2: "Anna", Level: "Advanced+", Category: "Bachata", Partnerwork: "Yes", Signup_Required: "No", Notes: "" },
];

const fallbackArtists = [
  { Artist_Name: "Fuquan", Country: "USA", Style: "Mambo", Instagram_Handle: "@fuegoyhielodance", Instagram_URL: "https://www.instagram.com/fuegoyhielodance" },
  { Artist_Name: "Candace", Country: "USA", Style: "Mambo", Instagram_Handle: "@fuegoyhielodance", Instagram_URL: "https://www.instagram.com/fuegoyhielodance" },
  { Artist_Name: "Moe Flex", Country: "UK", Style: "Salsa on1", Instagram_Handle: "@moeflexofficial", Instagram_URL: "https://www.instagram.com/moeflexofficial" },
];

const fallbackLocations = [
  { Location_Name: "Tempodrom", Location_Group: "Tempodrom", Map_Image: "/Tempodrom Map 2026.png", Address: "Möckernstraße 10, 10963 Berlin", Google_Maps_URL: "https://maps.app.goo.gl/aeq6hKUrwpp5cFNJ8", Description: "Main venue with socials and workshops." },
  { Location_Name: "Aletto Hotel", Location_Group: "Aletto Hotel", Address: "Berlin", Google_Maps_URL: "https://maps.app.goo.gl/WwP5o1f6K7u8n9YQ8", Description: "Nearby workshop venue." },
  { Location_Name: "Holiday Inn Express", Location_Group: "Holiday Inn Express", Address: "Berlin", Google_Maps_URL: "https://maps.app.goo.gl/h5L4kM2P9sT7xYxB9", Description: "Additional nearby congress location." },
  { Location_Name: "Sporthall", Location_Group: "Sporthall", Address: "Berlin", Google_Maps_URL: "https://maps.app.goo.gl/r7Gx4NwY8mQ2eF7C7", Description: "Additional workshop area." },
];

function parseCSV(text) {
  const rows = [];
  let row = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const code = text.charCodeAt(i);
    const nextCode = text.charCodeAt(i + 1);

    if (char === '"' && inQuotes && text[i + 1] === '"') {
      current += '"';
      i++;
    } else if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === "," && !inQuotes) {
      row.push(current.trim());
      current = "";
    } else if ((code === 10 || code === 13) && !inQuotes) {
      if (row.length || current) {
        row.push(current.trim());
        rows.push(row);
        row = [];
        current = "";
      }
      if (code === 13 && nextCode === 10) i++;
    } else {
      current += char;
    }
  }

  if (row.length || current) {
    row.push(current.trim());
    rows.push(row);
  }

  const headers = rows.shift() || [];
  return rows
    .filter((r) => r.some(Boolean))
    .map((r) => Object.fromEntries(headers.map((h, i) => [h, r[i] || ""])));
}

async function fetchCSV(url, fallback) {
  const response = await fetch(url, { cache: "no-store" });
  if (!response.ok) throw new Error(`CSV request failed: ${response.status}`);
  const text = await response.text();
  const parsed = parseCSV(text);
  if (!parsed.length) throw new Error("CSV parsed without rows");
  return parsed;
}

function loadCachedData() {
  try {
    const cached = localStorage.getItem("bsc-cached-data");
    return cached ? JSON.parse(cached) : null;
  } catch (error) {
    console.warn("Could not read cached data", error);
    return null;
  }
}

function saveCachedData(data) {
  try {
    localStorage.setItem("bsc-cached-data", JSON.stringify(data));
  } catch (error) {
    console.warn("Could not save cached data", error);
  }
}

function ensureCoreLocations(locationData) {
  const existing = new Set(locationData.map((location) => location.Location_Name));
  const missing = fallbackLocations.filter((location) => !existing.has(location.Location_Name));
  return [...locationData, ...missing];
}

function icon(name, filled = false) {
  const icons = {
    today: "◷",
    schedule: "★",
    mine: filled ? "♥" : "♡",
    artists: "👥",
    locations: "📍",
    info: "i",
    search: "⌕",
    clock: "🕒",
    nav: "➜",
    external: "↗",
    ticket: "🎟",
  };
  return icons[name] || "•";
}

function namesForWorkshop(workshop) {
  return [workshop.Artist_1, workshop.Artist_2].filter(Boolean);
}

function slugify(value) {
  return (value || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function getLocationTarget(workshop) {
  return workshop.Room_Group || workshop.Room;
}

function getCategoryStyle(category) {
  const value = (category || "").toLowerCase();

  if (value.includes("mambo")) {
    return "bg-[#4d5dff]/20 text-[#d7ddff] ring-1 ring-[#4d5dff]/40";
  }

  if (value.includes("salsa") || value.includes("la style")) {
    return "bg-[#3d0f2f]/80 text-[#ffd8f0] ring-1 ring-pink-400/30";
  }

  if (value.includes("cuban")) {
    return "bg-[#6f1a7f]/70 text-[#f1d2ff] ring-1 ring-fuchsia-400/30";
  }

  if (value.includes("ladies")) {
    return "bg-[#ff4db8]/20 text-[#ffd6ef] ring-1 ring-pink-300/30";
  }

  if (value.includes("cali")) {
    return "bg-[#3aa7ff]/20 text-[#d7f0ff] ring-1 ring-sky-300/30";
  }

  if (value.includes("chachacha")) {
    return "bg-[#4636ff]/20 text-[#d9d6ff] ring-1 ring-indigo-300/30";
  }

  if (value.includes("training")) {
    return "bg-[#ff7b22]/20 text-[#ffe4cf] ring-1 ring-orange-300/30";
  }

  return "bg-[#80045d]/30 text-pink-100 ring-1 ring-[#80045d]/40";
}

function getStyleBadgeStyle(style) {
  const value = (style || "").toLowerCase();
  if (value === "on1") return "bg-pink-400/15 text-pink-100 ring-1 ring-pink-300/30";
  if (value === "on2") return "bg-sky-400/15 text-sky-100 ring-1 ring-sky-300/30";
  return "bg-white/5 text-zinc-300 ring-1 ring-white/10";
}

function Badge({ children, soft = false, category = false, style = false }) {
  const badgeStyle = style ? getStyleBadgeStyle(children) : category ? getCategoryStyle(children) : "bg-[#80045d]/30 text-pink-100 ring-1 ring-[#80045d]/40";

  return (
    <span
      className={soft ? "rounded-full bg-white/5 px-2.5 py-1 text-xs text-zinc-300" : `rounded-full px-2.5 py-1 text-xs ${badgeStyle}`}
    >
      {children}
    </span>
  );
}

function Header({ lastUpdated, favoritesCount, dataStatus }) {
  return (
    <header className="sticky top-0 z-20 border-b border-white/10 bg-black/80 px-4 py-4 backdrop-blur-xl">
      <div className="mx-auto flex max-w-4xl items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-[#d780bd]">Berlin Salsacongress 2026</p>
          <h1 className="mt-1 text-2xl font-bold text-white">Workshop Companion</h1>
          <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-zinc-400">
            <span>Last updated: {lastUpdated || "loading..."}</span>
            {dataStatus === "cached" ? <span className="rounded-full border border-amber-300/25 bg-amber-300/10 px-2 py-0.5 text-amber-100">Offline data</span> : null}
            {dataStatus === "live" ? <span className="rounded-full border border-emerald-400/25 bg-emerald-400/10 px-2 py-0.5 text-emerald-100">Live data</span> : null}
          </div>
        </div>
        <div className="hidden rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 md:block">
          <p className="text-[11px] uppercase tracking-[0.2em] text-zinc-500">Favorites</p>
          <p className="mt-1 text-lg font-bold text-white">{favoritesCount}</p>
        </div>
      </div>
    </header>
  );
}

function BottomNav({ activeTab, setActiveTab }) {
  function handleTabChange(tab) {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  const tabs = [
    ["today", "Today"],
    ["schedule", "Schedule"],
    ["mine", "My Schedule"],
    ["artists", "Artists"],
    ["locations", "Locations"],
    ["info", "Info"],
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 border-t border-white/10 bg-black/90 px-2 py-2 pb-4 backdrop-blur-xl">
      <div className="mx-auto grid max-w-4xl grid-cols-6 gap-1">
        {tabs.map(([key, label]) => (
          <button key={key} onClick={() => handleTabChange(key)} className={activeTab === key ? "flex flex-col items-center gap-1 rounded-2xl bg-[#80045d] px-1 py-2.5 text-[10px] text-white" : "flex flex-col items-center gap-1 rounded-2xl px-1 py-2.5 text-[10px] text-zinc-400 hover:bg-white/5"}>
            <span className="text-base">{icon(key, activeTab === key)}</span>
            <span>{label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}

function getVenueColor(group) {
  const value = (group || "").toLowerCase();
  if (value.includes("tempodrom")) return "from-[#80045d]/40 to-pink-500/10 border-[#80045d]/30";
  if (value.includes("sport")) return "from-emerald-700/30 to-emerald-400/5 border-emerald-500/20";
  if (value.includes("aletto")) return "from-sky-700/30 to-sky-400/5 border-sky-500/20";
  if (value.includes("holiday")) return "from-amber-600/30 to-yellow-400/5 border-yellow-500/20";
  return "from-zinc-900 to-black border-white/10";
}

const ROOM_CAPACITY = {
  "Big Arena": 500,
  "Small Arena": 150,
  "Foyer": 150,
  "Restaurant": 50,
  "Seminar II": 30,
  "Aletto 1": 120,
  "Aletto 2": 100,
  "Aletto Hotel": 120,
  "Holiday Inn Express": 60,
  "Sporthall": 100,
  "Studio A": 100,
  "Studio B": 100,
  "Conference Hall": 60,
};

const MOCK_GLOBAL_FAVORITES = {
  F001: 34,
  F002: 82,
  F003: 68,
  F004: 96,
  F005: 54,
  S001: 90,
  S002: 84,
  S003: 77,
  SU001: 122,
  SU002: 65,
};

function getRoomCapacity(workshop) {
  return ROOM_CAPACITY[workshop.Room] || ROOM_CAPACITY[workshop.Room_Group] || null;
}

function getGlobalFavoriteCount(workshop, isFavorite) {
  const base = MOCK_GLOBAL_FAVORITES[workshop.Workshop_ID] || 0;
  return base + (isFavorite ? 1 : 0);
}

function getPopularityStatus(workshop, isFavorite) {
  const capacity = getRoomCapacity(workshop);
  if (!capacity) return null;

  const saved = getGlobalFavoriteCount(workshop, isFavorite);
  const ratio = saved / capacity;

  if (ratio > 1) {
    return { label: "Likely to be crowded", shortLabel: "Likely crowded", saved, capacity, ratio, style: "border-red-400/30 bg-red-400/15 text-red-100", dot: "🔴" };
  }

  if (ratio >= 0.9) {
    return { label: "Very popular", shortLabel: "Very popular", saved, capacity, ratio, style: "border-red-400/30 bg-red-400/15 text-red-100", dot: "🔴" };
  }

  if (ratio >= 0.75) {
    return { label: "Getting crowded", shortLabel: "Crowded", saved, capacity, ratio, style: "border-orange-400/30 bg-orange-400/15 text-orange-100", dot: "🟠" };
  }

  if (ratio >= 0.5) {
    return { label: "Getting popular", shortLabel: "Popular", saved, capacity, ratio, style: "border-yellow-300/30 bg-yellow-300/15 text-yellow-100", dot: "🟡" };
  }

  return null;
}

function PopularityBadge({ popularity }) {
  if (!popularity) return null;

  return (
    <span className={`rounded-full border px-2.5 py-1 text-[11px] font-medium ${popularity.style}`}>
      {popularity.dot} {popularity.shortLabel} · {popularity.saved} saved
    </span>
  );
}

function PopularityPanel({ popularity }) {
  if (!popularity) return null;
  const percent = Math.round(popularity.ratio * 100);

  return (
    <div className={`mt-4 rounded-2xl border p-4 text-sm ${popularity.style}`}>
      <p className="text-[11px] uppercase tracking-[0.2em] opacity-80">Capacity forecast</p>
      <p className="mt-1 font-semibold text-white">{popularity.dot} {popularity.label}</p>
      <p className="mt-1 opacity-90">{popularity.saved} dancers saved this · approx. {percent}% of room capacity</p>
      <div className="mt-3 h-2 overflow-hidden rounded-full bg-black/30">
        <div className="h-full rounded-full bg-current" style={{ width: `${Math.min(percent, 100)}%` }} />
      </div>
    </div>
  );
}

function ReminderBadge({ enabled }) {
  if (!enabled) return null;
  return (
    <span className="rounded-full border border-sky-300/25 bg-sky-300/10 px-2.5 py-1 text-[11px] font-medium text-sky-100">
      🔔 Reminder set
    </span>
  );
}

function FullyBookedBadge({ visible }) {
  if (!visible) return null;

  return (
    <span className="rounded-full border border-red-400/30 bg-red-400/15 px-2.5 py-1 text-[11px] font-semibold text-red-100">
      ⛔ Fully booked
    </span>
  );
}

const WALKING_TIMES = {
  "Tempodrom|Sporthall": 4,
  "Tempodrom|Aletto Hotel": 8,
  "Tempodrom|Holiday Inn Express": 3,
  "Sporthall|Aletto Hotel": 5,
  "Sporthall|Holiday Inn Express": 5,
  "Aletto Hotel|Holiday Inn Express": 8,
};

function getWalkingTime(from, to) {
  if (!from || !to || from === to) return null;
  return WALKING_TIMES[`${from}|${to}`] || WALKING_TIMES[`${to}|${from}`] || null;
}

function getWalkingTimesFrom(locationName, allLocations) {
  return allLocations
    .filter((location) => location.Location_Name !== locationName)
    .map((location) => ({ to: location.Location_Name, minutes: getWalkingTime(locationName, location.Location_Name) }))
    .filter((item) => item.minutes !== null)
    .sort((a, b) => a.minutes - b.minutes);
}

function WalkingTimeChips({ locationName, allLocations }) {
  const times = getWalkingTimesFrom(locationName, allLocations);
  if (!times.length) return null;

  return (
    <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
      {times.map((time) => (
        <span key={time.to} className="shrink-0 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-zinc-300">
          {time.minutes} min walk to {time.to}
        </span>
      ))}
    </div>
  );
}

function WalkingTimeFromTempodrom({ locationName }) {
  const minutes = getWalkingTime("Tempodrom", locationName);
  if (!minutes || locationName === "Tempodrom") return null;

  return (
    <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.03] p-3 text-sm text-zinc-300">
      <p className="text-[11px] uppercase tracking-[0.2em] text-zinc-500">Walking Time</p>
      <p className="mt-1 font-medium text-white">Approx. {minutes} min walk from Tempodrom</p>
    </div>
  );
}

function getPreviousFavoriteWorkshop(currentWorkshop, favoriteWorkshops) {
  if (!currentWorkshop || !favoriteWorkshops.length) return null;
  const previous = favoriteWorkshops
    .filter((workshop) => workshop.Day === currentWorkshop.Day)
    .filter((workshop) => workshop.Workshop_ID !== currentWorkshop.Workshop_ID)
    .filter((workshop) => Number(workshop.Sort_Index || 0) <= Number(currentWorkshop.Sort_Index || 0))
    .sort((a, b) => Number(b.Sort_Index || 0) - Number(a.Sort_Index || 0));
  return previous[0] || null;
}

function timeToMinutes(time) {
  const [hours, minutes] = (time || "00:00").split(":").map(Number);
  return hours * 60 + minutes;
}

function getFavoriteTransitions(favoriteWorkshops) {
  const sorted = favoriteWorkshops
    .slice()
    .sort((a, b) => {
      if (a.Day !== b.Day) return ["Friday", "Saturday", "Sunday"].indexOf(a.Day) - ["Friday", "Saturday", "Sunday"].indexOf(b.Day);
      return timeToMinutes(a.Start_Time) - timeToMinutes(b.Start_Time);
    });

  const transitions = [];
  for (let i = 0; i < sorted.length - 1; i++) {
    const from = sorted[i];
    const to = sorted[i + 1];
    if (from.Day !== to.Day) continue;

    const gapMinutes = timeToMinutes(to.Start_Time) - timeToMinutes(from.End_Time);
    const walkMinutes = getWalkingTime(from.Room_Group, to.Room_Group);
    const sameVenue = from.Room_Group === to.Room_Group;

    if (gapMinutes >= 0 && (!sameVenue || gapMinutes <= 15)) {
      transitions.push({ from, to, gapMinutes, walkMinutes, sameVenue });
    }
  }
  return transitions;
}

function FavoriteTransitions({ transitions }) {
  if (!transitions.length) return null;

  return (
    <div className="mb-5 rounded-[28px] border border-white/10 bg-white/[0.03] p-5">
      <p className="text-xs uppercase tracking-[0.2em] text-[#d780bd]">Between your favorites</p>
      <h3 className="mt-2 text-xl font-bold text-white">Walking time overview</h3>
      <p className="mt-2 text-sm leading-6 text-zinc-400">Plan your venue changes between selected workshops.</p>
      <div className="mt-4 space-y-3">
        {transitions.map((transition) => {
          const isTight = !transition.sameVenue && transition.walkMinutes !== null && transition.gapMinutes < transition.walkMinutes;
          const isClose = !transition.sameVenue && transition.walkMinutes !== null && transition.gapMinutes <= transition.walkMinutes + 5;
          return (
            <div key={`${transition.from.Workshop_ID}-${transition.to.Workshop_ID}`} className={isTight ? "rounded-2xl border border-red-400/25 bg-red-400/10 p-4" : isClose ? "rounded-2xl border border-amber-300/25 bg-amber-300/10 p-4" : "rounded-2xl border border-white/10 bg-black/20 p-4"}>
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-sm font-semibold text-white">{transition.from.Day} · {transition.from.End_Time} → {transition.to.Start_Time}</p>
                  <p className="mt-1 text-sm text-zinc-300">{transition.from.Room_Group} → {transition.to.Room_Group}</p>
                  <p className="mt-1 text-xs text-zinc-500">{transition.from.Workshop_Title} → {transition.to.Workshop_Title}</p>
                </div>
                <div className="flex flex-wrap gap-2 text-xs">
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-zinc-300">Gap: {transition.gapMinutes} min</span>
                  {transition.sameVenue ? <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1.5 text-emerald-200">Same venue</span> : <span className="rounded-full border border-[#80045d]/30 bg-[#80045d]/15 px-3 py-1.5 text-pink-100">Walk: {transition.walkMinutes ?? "?"} min</span>}
                  {isTight ? <span className="rounded-full border border-red-400/30 bg-red-400/15 px-3 py-1.5 text-red-100">Very tight</span> : null}
                  {isClose && !isTight ? <span className="rounded-full border border-amber-300/30 bg-amber-300/15 px-3 py-1.5 text-amber-100">Plan buffer</span> : null}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const WORKSHOP_EVENT_DATES = {
  Friday: "2026-08-28",
  Saturday: "2026-08-29",
  Sunday: "2026-08-30",
};

function getLocalDateString(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getWorkshopStatus(workshop) {
  const eventDate = WORKSHOP_EVENT_DATES[workshop.Day];
  const todayDate = getLocalDateString();

  if (!eventDate || eventDate !== todayDate) return null;

  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  const [startHour, startMinute] = (workshop.Start_Time || "00:00").split(":").map(Number);
  const [endHour, endMinute] = (workshop.End_Time || "00:00").split(":").map(Number);
  const start = startHour * 60 + startMinute;
  const end = endHour * 60 + endMinute;

  if (currentMinutes >= start && currentMinutes <= end) {
    return { label: "Happening now", style: "bg-emerald-500/15 text-emerald-200 border border-emerald-500/30" };
  }

  if (start > currentMinutes && start - currentMinutes <= 30) {
    return { label: `Starts in ${start - currentMinutes} min`, style: "bg-amber-500/15 text-amber-100 border border-amber-500/30" };
  }

  return null;
}

function formatWorkshopShareText(workshop) {
  const artists = namesForWorkshop(workshop).join(" & ") || "Artist info coming soon";
  const signup = workshop.Signup_Required === "Yes" ? "Prior sign up required" : "No prior sign up required";
  const lines = [
    "Berlin Salsacongress Workshop",
    "",
    workshop.Workshop_Title,
    `${workshop.Day}, ${workshop.Start_Time}–${workshop.End_Time}`,
    `${workshop.Room}, ${workshop.Room_Group}`,
    `Artists: ${artists}`,
    `Level: ${workshop.Level || "All levels"}`,
    `Category: ${workshop.Category || "Workshop"}${workshop.Style ? ` · ${workshop.Style}` : ""}`,
    `Sign Up: ${signup}`,
  ];

  if (workshop.Signup_Required === "Yes" && workshop.Fully_Booked === "Yes") lines.push("Status: Fully booked");
  if (workshop.Notes) lines.push(`Notes: ${workshop.Notes}`);

  lines.push("", "Check it in the BSC Workshop App.");
  return lines.join("\n");
}

async function copyTextFallback(text) {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.top = "-9999px";
  textarea.style.left = "-9999px";
  document.body.appendChild(textarea);
  textarea.focus();
  textarea.select();

  try {
    const successful = document.execCommand("copy");
    return successful ? "copied" : "failed";
  } finally {
    document.body.removeChild(textarea);
  }
}

async function shareWorkshop(workshop) {
  const text = formatWorkshopShareText(workshop);
  const title = `${workshop.Workshop_Title} · Berlin Salsacongress`;

  try {
    const shareData = { title, text };

    if (navigator.share && (!navigator.canShare || navigator.canShare(shareData))) {
      await navigator.share(shareData);
      return "shared";
    }

    if (navigator.clipboard?.writeText && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return "copied";
    }

    return await copyTextFallback(text);
  } catch (error) {
    if (error?.name === "AbortError") return "cancelled";

    try {
      return await copyTextFallback(text);
    } catch (fallbackError) {
      console.warn("Could not share workshop", error, fallbackError);
      return "failed";
    }
  }
}

function WorkshopCard({ workshop, isFavorite, toggleFavorite, artistsByName, locationsByGroup, openDetails, openLocation, onShareWorkshop, capacityData, reminderSet = false, showReminder = false }) {
  const artists = namesForWorkshop(workshop);
  const location = locationsByGroup[workshop.Room_Group] || null;
  const status = getWorkshopStatus(workshop);
  const venueColor = getVenueColor(workshop.Room_Group);
  const popularity = getPopularityStatus(workshop, isFavorite);
  const fullyBooked = workshop.Signup_Required === "Yes" && workshop.Fully_Booked === "Yes";
  const liveCapacity =
  capacityData[workshop.Workshop_ID]?.current_saved || 0;

const roomCapacity =
  capacityData[workshop.Workshop_ID]?.room_capacity || 100;

const capacityPercent =
  Math.round((liveCapacity / roomCapacity) * 100);
  const capacityLabel =
  capacityPercent >= 100
    ? "Full / Over Capacity"
    : capacityPercent >= 80
    ? "Almost Full"
    : capacityPercent >= 50
    ? "Filling Fast"
    : liveCapacity > 0
    ? "Plenty of Space"
    : "Be the first to save";

const capacityIcon =
  capacityPercent >= 80
    ? "🔥"
    : capacityPercent >= 50
    ? "🟡"
    : liveCapacity > 0
    ? "🟢"
    : "✨";
  return (
    <div className={`overflow-hidden rounded-[28px] border bg-gradient-to-br ${venueColor} shadow-2xl shadow-black/30 transition hover:border-[#80045d]/50`}>
      <div className="h-1 w-full bg-gradient-to-r from-[#80045d] via-pink-500/70 to-transparent" />
      <div className="p-4 md:p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <div className="mb-3 flex flex-wrap gap-2">
              {status ? <span className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${status.style}`}>{status.label}</span> : null}
              <PopularityBadge popularity={popularity} />
              <FullyBookedBadge visible={fullyBooked} />
              {showReminder ? <ReminderBadge enabled={reminderSet} /> : null}
              <Badge category>{workshop.Category || "Workshop"}</Badge>
              {workshop.Style ? <Badge style>{workshop.Style}</Badge> : null}
              <Badge soft>{workshop.Level || "All levels"}</Badge>
              {workshop.Signup_Required === "Yes" ? <Badge soft>Prior Sign Up Required</Badge> : null}
              <div className="mt-3 w-full">
  <div className="mb-1 flex items-center justify-between text-[11px] text-zinc-300">
    <span>Saved by dancers</span>
    <span>{liveCapacity}</span>
  </div>

  <div className="h-2 overflow-hidden rounded-full bg-white/10">
    <div
      className={`h-full rounded-full transition-all duration-500 ${
        capacityPercent >= 70
          ? "bg-red-500"
          : capacityPercent >= 40
          ? "bg-yellow-400"
          : "bg-emerald-400"
      }`}
      style={{ width: `${Math.min(capacityPercent, 100)}%` }}
    />
  </div>
</div>
            </div>
            <button onClick={() => openDetails(workshop)} className="text-left"><h3 className="text-lg font-bold leading-tight text-white transition hover:text-pink-100 md:text-xl">{workshop.Workshop_Title}</h3></button>
            <p className="mt-2 text-sm text-zinc-300 md:text-base">{artists.join(" & ")}</p>
          </div>
          <button onClick={() => toggleFavorite(workshop.Workshop_ID)} className={isFavorite ? "flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#80045d] bg-[#80045d] text-xl text-white" : "flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-xl text-zinc-300"}>
            {isFavorite ? "♥" : "♡"}
          </button>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3 rounded-2xl border border-white/5 bg-white/[0.03] p-3 text-sm text-zinc-300">
          <div><p className="mb-1 text-[11px] uppercase tracking-wide text-zinc-500">Time</p><p className="font-medium text-white">{icon("clock")} {workshop.Start_Time}–{workshop.End_Time}</p></div>
          <div><p className="mb-1 text-[11px] uppercase tracking-wide text-zinc-500">Room</p><button onClick={() => openLocation(getLocationTarget(workshop))} className="font-medium text-white underline-offset-4 hover:underline">📍 {workshop.Room}</button></div>
          <div><p className="mb-1 text-[11px] uppercase tracking-wide text-zinc-500">Venue</p><button onClick={() => openLocation(getLocationTarget(workshop))} className="text-left underline-offset-4 hover:underline">{icon("nav")} {workshop.Room_Group}</button></div>
          <div><p className="mb-1 text-[11px] uppercase tracking-wide text-zinc-500">Partnerwork</p><p>👥 {workshop.Partnerwork || "No"}</p></div>
        </div>

        {workshop.Notes ? <div className="mt-4 rounded-2xl border border-[#80045d]/20 bg-[#80045d]/10 p-3 text-sm text-pink-100">{workshop.Notes}</div> : null}
        {workshop.Level === "Advanced+" ? (
  <div className="mt-4 rounded-2xl border border-amber-300/25 bg-amber-300/10 p-4 text-sm text-amber-50">
    <p className="text-[11px] uppercase tracking-[0.2em] text-amber-200">
      🎯 Advanced+ Level Assessment
    </p>

    <p className="mt-2 leading-6">
    Participation in this Advanced+ workshop is only possible for dancers who
    successfully passed both the Online Level Assessment and the On-Site Level
    Assessment during the event.
    </p>

    <a
      href={ADVANCED_LEVEL_ASSESSMENT_URL}
      target="_blank"
      rel="noreferrer"
      className="mt-4 inline-flex rounded-full border border-amber-200/20 bg-amber-200/10 px-4 py-2 text-xs font-semibold text-amber-50 transition hover:bg-amber-200/20"
    >
      Take Online Level Assessment ↗
    </a>
  </div>
) : null}
        {fullyBooked ? (
          <div className="mt-4 rounded-2xl border border-red-400/25 bg-red-400/10 p-4 text-sm text-red-50">
            <p className="text-[11px] uppercase tracking-[0.2em] text-red-200">Workshop Status</p>
            <p className="mt-2 leading-6">
              This workshop is already fully booked. Please do not come to the room without confirmed registration.
            </p>
          </div>
        ) : null}

        <PopularityPanel popularity={popularity} />

        <div className="mt-4 flex flex-wrap gap-2">
          {artists.map((name) => {
            const artist = artistsByName[name];
            if (!artist || !artist.Instagram_URL) return null;
            return <a key={name} href={artist.Instagram_URL} target="_blank" rel="noreferrer" className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs text-zinc-200 hover:bg-[#80045d]/10">{artist.Instagram_Handle || name} {icon("external")}</a>;
          })}
          {location && location.Google_Maps_URL ? <a href={location.Google_Maps_URL} target="_blank" rel="noreferrer" className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs text-zinc-200 hover:bg-[#80045d]/10">Google Maps {icon("external")}</a> : null}
          <button onClick={() => openDetails(workshop)} className="rounded-full border border-[#80045d]/30 bg-[#80045d]/20 px-3 py-2 text-xs text-pink-100 hover:bg-[#80045d]/30">Details</button>
          <button onClick={() => onShareWorkshop?.(workshop)} className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs text-zinc-200 hover:bg-white/10">Share Workshop ↗</button>
        </div>
      </div>
    </div>
  );
}

function SearchFilters({ query, setQuery, category, setCategory, categories }) {
  return (
    <div className="mb-5 space-y-3">
      <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-2">
        <span className="text-zinc-400">{icon("search")}</span>
        <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search workshops or artists..." className="w-full bg-transparent text-sm text-white outline-none placeholder:text-zinc-500" />
        {query ? <button onClick={() => setQuery("")} className="text-zinc-400">×</button> : null}
      </div>
      <div className="flex gap-2 overflow-x-auto pb-1">
        {["All", ...categories.filter((cat) => cat !== "Bachata")].map((cat) => {
          const active = category === cat;

          if (cat === "All") {
            return (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={active ? "shrink-0 rounded-full bg-[#80045d] px-4 py-2 text-xs font-medium text-white" : "shrink-0 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-zinc-300"}
              >
                {cat}
              </button>
            );
          }

          return (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`shrink-0 rounded-full px-4 py-2 text-xs font-medium transition ${getCategoryStyle(cat)} ${active ? "scale-[1.03] ring-2 ring-white/20" : "opacity-80 hover:opacity-100"}`}
            >
              {cat}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function SelectFilter({ label, value, onChange, options }) {
  return (
    <label className="block">
      <span className="mb-1 block text-[11px] uppercase tracking-[0.2em] text-zinc-500">{label}</span>
      <select value={value} onChange={(event) => onChange(event.target.value)} className="w-full rounded-2xl border border-white/10 bg-black/60 px-3 py-3 text-sm text-white outline-none">
        {options.map((option) => <option key={option} value={option} className="bg-black text-white">{option}</option>)}
      </select>
    </label>
  );
}

function AdvancedFilters({ level, setLevel, location, setLocation, partnerwork, setPartnerwork, signup, setSignup, styleFilter, setStyleFilter, levels, locations, styles }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="mb-6 rounded-[28px] border border-white/10 bg-white/[0.03] p-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">Advanced Filters</p>
          <p className="mt-1 text-sm text-zinc-400">Refine by style, level, venue, partnerwork and sign-up.</p>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="w-full rounded-full border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-white hover:bg-white/10 sm:w-auto"
        >
          {open ? "Hide Filters" : "Show Filters"}
        </button>
      </div>

      {open ? (
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-5">
          <SelectFilter label="On1 / On2" value={styleFilter} onChange={setStyleFilter} options={["All", ...styles]} />
          <SelectFilter label="Level" value={level} onChange={setLevel} options={["All", ...levels]} />
          <SelectFilter label="Location" value={location} onChange={setLocation} options={["All", ...locations]} />
          <SelectFilter label="Partnerwork" value={partnerwork} onChange={setPartnerwork} options={["All", "Yes", "No"]} />
          <SelectFilter label="Sign Up" value={signup} onChange={setSignup} options={["All", "Prior Sign Up Required", "No prior sign up"]} />
        </div>
      ) : null}
    </div>
  );
}

function DaySwitch({ value, onChange }) {
  return (
    <div className="mt-6 flex gap-3 overflow-x-auto pb-2">
      {["Friday", "Saturday", "Sunday"].map((day) => <button key={day} onClick={() => onChange(day)} className={value === day ? "shrink-0 rounded-full bg-[#80045d] px-5 py-3 text-sm font-medium text-white" : "shrink-0 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-zinc-300"}>{day}</button>)}
    </div>
  );
}

function getRecommendedCategories(favoriteWorkshops) {
  const categoryCounts = {};
  const styleCounts = {};
  const comboCounts = {};

  favoriteWorkshops.forEach((workshop) => {
    const category = workshop.Category;
    const style = workshop.Style;

    if (category) {
      categoryCounts[category] = (categoryCounts[category] || 0) + 1;
    }

    if (style) {
      styleCounts[style] = (styleCounts[style] || 0) + 1;
    }

    if (category && style) {
      const combo = `${category} ${style}`;
      comboCounts[combo] = (comboCounts[combo] || 0) + 1;
    }
  });

  const combos = Object.entries(comboCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 2)
    .map(([label, count]) => {
      const parts = label.split(" ");
      const style = parts[parts.length - 1];
      const category = parts.slice(0, -1).join(" ");
      return { type: "combo", label, category, style, count };
    });

  const styles = Object.entries(styleCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 2)
    .map(([style, count]) => ({ type: "style", label: style, style, count }));

  const categories = Object.entries(categoryCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 2)
    .map(([category, count]) => ({ type: "category", label: category, category, count }));

  return [...combos, ...styles, ...categories].slice(0, 4);
}

function SmartRecommendations({ recommendations, onSelectCategory, onSelectStyle, onSelectCombo }) {
  if (!recommendations.length) return null;

  return (
    <div className="mb-6 rounded-[28px] border border-[#80045d]/20 bg-gradient-to-br from-[#80045d]/15 via-black to-black p-5">
      <p className="text-xs uppercase tracking-[0.2em] text-[#d780bd]">Smart Style Combinations</p>
      <h3 className="mt-2 text-xl font-bold text-white">Your dance preferences</h3>
      <p className="mt-2 text-sm leading-6 text-zinc-400">
        Based on your favorites, the app suggests similar categories, On1/On2 styles and style combinations.
      </p>

      <div className="mt-4 flex flex-wrap gap-3">
        {recommendations.map((item) => {
          const key = `${item.type}-${item.label}`;
          const label = item.type === "combo" ? `More ${item.label}` : item.type === "style" ? `More ${item.style} workshops` : `More ${item.category}`;
          const style = item.type === "style" ? getStyleBadgeStyle(item.style) : getCategoryStyle(item.category || item.label);
          const handleClick = () => {
            if (item.type === "combo") onSelectCombo(item.category, item.style);
            if (item.type === "style") onSelectStyle(item.style);
            if (item.type === "category") onSelectCategory(item.category);
          };

          return (
            <button
              key={key}
              onClick={handleClick}
              className={`rounded-full px-4 py-3 text-sm font-medium transition hover:scale-[1.02] ${style}`}
            >
              {label} · {item.count} saved
            </button>
          );
        })}
      </div>
    </div>
  );
}

function formatDuration(totalMinutes) {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  if (hours && minutes) return `${hours}h ${minutes}min`;
  if (hours) return `${hours}h`;
  return `${minutes}min`;
}

function getCongressStats(favoriteWorkshops, transitions) {
  const totalWorkshopMinutes = favoriteWorkshops.reduce((sum, workshop) => sum + Math.max(0, timeToMinutes(workshop.End_Time) - timeToMinutes(workshop.Start_Time)), 0);
  const venues = new Set(favoriteWorkshops.map((workshop) => workshop.Room_Group).filter(Boolean));
  const partnerworkCount = favoriteWorkshops.filter((workshop) => workshop.Partnerwork === "Yes").length;
  const advancedPlusCount = favoriteWorkshops.filter((workshop) => workshop.Level === "Advanced+").length;
  const walkingMinutes = transitions.reduce((sum, transition) => sum + (!transition.sameVenue && transition.walkMinutes ? transition.walkMinutes : 0), 0);

  const styleCounts = {};
  const venueCounts = {};

  favoriteWorkshops.forEach((workshop) => {
    const styleKey = workshop.Style ? `${workshop.Category} ${workshop.Style}` : workshop.Category;
    if (styleKey) styleCounts[styleKey] = (styleCounts[styleKey] || 0) + 1;
    if (workshop.Room_Group) venueCounts[workshop.Room_Group] = (venueCounts[workshop.Room_Group] || 0) + 1;
  });

  const favoriteStyle = Object.entries(styleCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || "Still discovering";
  const topVenue = Object.entries(venueCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || "Not yet planned";

  return {
    saved: favoriteWorkshops.length,
    venuesVisited: venues.size,
    plannedDancing: formatDuration(totalWorkshopMinutes),
    favoriteStyle,
    partnerworkCount,
    advancedPlusCount,
    walkingTime: formatDuration(walkingMinutes),
    topVenue,
  };
}

function getCongressPersonality(stats, favoriteWorkshops) {
  const hasManyAdvanced = stats.advancedPlusCount >= 2;
  const hasManyPartnerwork = stats.partnerworkCount >= Math.max(2, Math.ceil(stats.saved * 0.6));
  const style = (stats.favoriteStyle || "").toLowerCase();

  if (style.includes("mambo") || style.includes("on2")) {
    return { title: "The Mambo Specialist", text: "Your plan has serious On2 energy. You clearly know where the good timing lives." };
  }

  if (style.includes("cuban")) {
    return { title: "Cuban Energy", text: "Your congress plan is full of rhythm, flow and Cuban flavor." };
  }

  if (style.includes("ladies")) {
    return { title: "Styling Queen", text: "Your weekend is all about expression, confidence and beautiful details." };
  }

  if (hasManyAdvanced) {
    return { title: "The Hardcore Trainer", text: "You came to dance, but also to level up. Your plan is ambitious." };
  }

  if (stats.venuesVisited >= 3) {
    return { title: "The Explorer", text: "You are moving through the whole congress and collecting different energies." };
  }

  if (hasManyPartnerwork) {
    return { title: "The Social Connector", text: "Your schedule is built around connection, partnerwork and shared moments." };
  }

  return { title: "The Congress Flow Dancer", text: "Your plan is balanced, flexible and ready for a magical weekend." };
}

function CongressStats({ stats, personality, onOpenStory }) {
  return (
    <div className="mb-6 rounded-[32px] border border-[#80045d]/25 bg-gradient-to-br from-[#80045d]/20 via-black to-black p-5 shadow-2xl shadow-black/20">
      <p className="text-xs uppercase tracking-[0.25em] text-[#d780bd]">My Congress Stats</p>
      <h3 className="mt-2 text-2xl font-bold text-white">Your Congress Journey</h3>
      <p className="mt-2 text-sm leading-6 text-zinc-400">A playful snapshot of your personal Berlin Salsacongress plan.</p>

      <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-4">
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"><p className="text-2xl font-bold text-white">{stats.saved}</p><p className="mt-1 text-xs text-zinc-400">saved workshops</p></div>
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"><p className="text-2xl font-bold text-white">{stats.venuesVisited}</p><p className="mt-1 text-xs text-zinc-400">venues visited</p></div>
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"><p className="text-2xl font-bold text-white">{stats.plannedDancing}</p><p className="mt-1 text-xs text-zinc-400">planned workshops</p></div>
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"><p className="text-2xl font-bold text-white">{stats.walkingTime}</p><p className="mt-1 text-xs text-zinc-400">walking time</p></div>
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"><p className="text-[11px] uppercase tracking-[0.2em] text-zinc-500">Favorite style</p><p className="mt-2 text-lg font-semibold text-white">{stats.favoriteStyle}</p></div>
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"><p className="text-[11px] uppercase tracking-[0.2em] text-zinc-500">Most visited venue</p><p className="mt-2 text-lg font-semibold text-white">{stats.topVenue}</p></div>
      </div>

      <div className="mt-5 rounded-[26px] border border-[#80045d]/25 bg-[#80045d]/15 p-5">
        <p className="text-[11px] uppercase tracking-[0.2em] text-pink-200">Your Congress Personality</p>
        <h4 className="mt-2 text-2xl font-bold text-white">{personality.title}</h4>
        <p className="mt-2 text-sm leading-6 text-pink-100/80">{personality.text}</p>
      </div>

      <button onClick={onOpenStory} className="mt-5 w-full rounded-full bg-[#80045d] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#96076d]">
        Create Shareable Story Card
      </button>
    </div>
  );
}

function StoryCardModal({ open, onClose, stats, personality, shareCardRef, downloadStoryCard }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm">
      <div className="w-full max-w-sm rounded-[34px] border border-white/10 bg-zinc-950 p-4 shadow-2xl shadow-black">
        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm font-semibold text-white">Shareable Story Card</p>
          <button onClick={onClose} className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-xl text-white">×</button>
        </div>

        <div
  ref={shareCardRef}
  className="relative aspect-[9/16] overflow-hidden rounded-[30px] border border-[#80045d]/30 bg-gradient-to-br from-[#80045d] via-black to-[#160010] p-6"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#ffffff22,transparent_35%),radial-gradient(circle_at_bottom_left,#80045d55,transparent_45%)]" />
          <div className="relative z-10 flex h-full flex-col justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-pink-100">Berlin Salsacongress 2026</p>
              <h3 className="mt-3 text-3xl font-black leading-tight text-white">My Congress Journey</h3>
              <p className="mt-3 text-sm leading-6 text-pink-100/80">{personality.title}</p>
            </div>

            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-2xl bg-white/10 p-3 backdrop-blur-sm"><p className="text-3xl font-black text-white">{stats.saved}</p><p className="text-xs text-pink-100/80">saved workshops</p></div>
                <div className="rounded-2xl bg-white/10 p-3 backdrop-blur-sm"><p className="text-3xl font-black text-white">{stats.venuesVisited}</p><p className="text-xs text-pink-100/80">venues</p></div>
              </div>
              <div className="rounded-2xl bg-white/10 p-4 backdrop-blur-sm"><p className="text-xs uppercase tracking-[0.2em] text-pink-100/70">Favorite style</p><p className="mt-1 text-xl font-bold text-white">{stats.favoriteStyle}</p></div>
              <div className="rounded-2xl bg-white/10 p-4 backdrop-blur-sm"><p className="text-xs uppercase tracking-[0.2em] text-pink-100/70">Planned workshops</p><p className="mt-1 text-xl font-bold text-white">{stats.plannedDancing}</p></div>
            </div>

            <div>
              <p className="text-sm font-semibold text-white">We are One Family ✨</p>
              <p className="mt-1 text-xs text-pink-100/70">berlinsalsacongress.co</p>
            </div>
          </div>
        </div>
<button
  onClick={downloadStoryCard}
  className="mt-4 w-full rounded-full bg-[#80045d] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#a00074]"
>
  Download Story Card
</button>
        <p className="mt-4 text-center text-xs leading-5 text-zinc-400">
          In the final app this can become a downloadable/shareable 9:16 image for Instagram Stories.
        </p>
      </div>
    </div>
  );
}

function QuickPlanIndicator({ favoritesCount, conflictsCount }) {
  return (
    <div className="my-5 grid grid-cols-2 gap-3">
      <div className="rounded-2xl border border-[#80045d]/30 bg-[#80045d]/15 p-4">
        <p className="text-[11px] uppercase tracking-[0.2em] text-pink-200">Favorites</p>
        <p className="mt-1 text-2xl font-bold text-white">{favoritesCount}</p>
        <p className="mt-1 text-xs text-zinc-400">saved workshops</p>
      </div>
      <div className={conflictsCount ? "rounded-2xl border border-amber-300/30 bg-amber-300/10 p-4" : "rounded-2xl border border-white/10 bg-white/[0.03] p-4"}>
        <p className={conflictsCount ? "text-[11px] uppercase tracking-[0.2em] text-amber-200" : "text-[11px] uppercase tracking-[0.2em] text-zinc-500"}>Conflicts</p>
        <p className="mt-1 text-2xl font-bold text-white">{conflictsCount}</p>
        <p className="mt-1 text-xs text-zinc-400">overlapping favorites</p>
      </div>
    </div>
  );
}

function WorkshopDetailsModal({ workshop, onClose, artistsByName, locationsByGroup, isFavorite, toggleFavorite, favoriteWorkshops, openLocation, reminderSet, toggleReminder, onShareWorkshop }) {
  if (!workshop) return null;
  const artists = namesForWorkshop(workshop);
  const location = locationsByGroup[workshop.Room_Group] || null;
  const previousFavorite = getPreviousFavoriteWorkshop(workshop, favoriteWorkshops || []);
  const previousWalkTime = previousFavorite ? getWalkingTime(previousFavorite.Room_Group, workshop.Room_Group) : null;
  const popularity = getPopularityStatus(workshop, isFavorite);
  const fullyBooked = workshop.Signup_Required === "Yes" && workshop.Fully_Booked === "Yes";

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 p-3 backdrop-blur-sm md:items-center">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-[32px] border border-white/10 bg-zinc-950 p-5 shadow-2xl shadow-black">
        <div className="sticky top-0 z-10 -mx-5 -mt-5 mb-5 flex items-center justify-between border-b border-white/10 bg-zinc-950/95 px-5 py-4 backdrop-blur-xl">
          <button onClick={onClose} className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10">← Back to schedule</button>
          <button onClick={onClose} className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-xl text-white hover:bg-white/10">×</button>
        </div>
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-[#d780bd]">Workshop Details</p>
            <h2 className="mt-2 text-2xl font-bold text-white">{workshop.Workshop_Title}</h2>
            <p className="mt-2 text-zinc-300">{artists.join(" & ")}</p>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          <Badge category>{workshop.Category || "Workshop"}</Badge>
          {workshop.Style ? <Badge style>{workshop.Style}</Badge> : null}
          <Badge soft>{workshop.Level || "All levels"}</Badge>
          <PopularityBadge popularity={popularity} />
          <FullyBookedBadge visible={fullyBooked} />
          {workshop.Signup_Required === "Yes" ? <Badge soft>Prior Sign Up Required</Badge> : null}
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm text-zinc-300">
          <div><p className="text-[11px] uppercase tracking-wide text-zinc-500">Day</p><p className="mt-1 font-semibold text-white">{workshop.Day}</p></div>
          <div><p className="text-[11px] uppercase tracking-wide text-zinc-500">Time</p><p className="mt-1 font-semibold text-white">{workshop.Start_Time}–{workshop.End_Time}</p></div>
          <div><p className="text-[11px] uppercase tracking-wide text-zinc-500">Room</p><button onClick={() => openLocation(getLocationTarget(workshop))} className="mt-1 font-semibold text-white underline-offset-4 hover:underline">{workshop.Room}</button></div>
          <div><p className="text-[11px] uppercase tracking-wide text-zinc-500">Venue</p><button onClick={() => openLocation(getLocationTarget(workshop))} className="mt-1 text-left font-semibold text-white underline-offset-4 hover:underline">{workshop.Room_Group}</button></div>
          <div><p className="text-[11px] uppercase tracking-wide text-zinc-500">Partnerwork</p><p className="mt-1 font-semibold text-white">{workshop.Partnerwork || "No"}</p></div>
          <div><p className="text-[11px] uppercase tracking-wide text-zinc-500">Sign Up</p><p className="mt-1 font-semibold text-white">{workshop.Signup_Required === "Yes" ? "Prior Sign Up Required" : "No prior sign up"}</p></div>
        </div>

        {workshop.Notes ? <div className="mt-5 rounded-2xl border border-[#80045d]/20 bg-[#80045d]/10 p-4 text-sm text-pink-100">{workshop.Notes}</div> : null}
        {workshop.Level === "Advanced+" ? (
  <div className="mt-5 rounded-2xl border border-amber-300/25 bg-amber-300/10 p-4 text-sm text-amber-50">
    <p className="text-[11px] uppercase tracking-[0.2em] text-amber-200">
      🎯 Advanced+ Level Assessment
    </p>

    <p className="mt-2 leading-6">
      Participation in this Advanced+ workshop is only possible for dancers who
      successfully passed both the Online Level Assessment and the On-Site Level
      Assessment during the event.
    </p>

    <a
      href={ADVANCED_LEVEL_ASSESSMENT_URL}
      target="_blank"
      rel="noreferrer"
      className="mt-4 inline-flex rounded-full border border-amber-200/20 bg-amber-200/10 px-4 py-2 text-xs font-semibold text-amber-50 transition hover:bg-amber-200/20"
    >
      Take Online Level Assessment ↗
    </a>
  </div>
) : null}
        {fullyBooked ? (
          <div className="mt-5 rounded-2xl border border-red-400/25 bg-red-400/10 p-4 text-sm text-red-50">
            <p className="text-[11px] uppercase tracking-[0.2em] text-red-200">Workshop Status</p>
            <p className="mt-2 leading-6">
              This workshop is already fully booked. Please do not come to the room without confirmed registration.
            </p>
          </div>
        ) : null}

        <div className="mt-5 rounded-2xl border border-amber-300/20 bg-amber-300/10 p-4 text-sm text-amber-50">
          <p className="text-[11px] uppercase tracking-[0.2em] text-amber-200">🎥 Workshop Filming Policy</p>
          <p className="mt-2 leading-6">
            Please do not record during the workshop itself. Teachers will invite participants to film the final workshop demo at the end of the class.
          </p>
        </div>

        <PopularityPanel popularity={popularity} />

        <WalkingTimeFromTempodrom locationName={workshop.Room_Group} />

        {previousFavorite && previousWalkTime ? (
          <div className="mt-5 rounded-2xl border border-amber-300/20 bg-amber-300/10 p-4 text-sm text-amber-50">
            <p className="text-[11px] uppercase tracking-[0.2em] text-amber-200">From previous favorite</p>
            <p className="mt-1">Approx. {previousWalkTime} min walk from {previousFavorite.Room_Group} to {workshop.Room_Group}.</p>
          </div>
        ) : null}

        <div className="mt-5 flex flex-wrap gap-3">
          <button onClick={() => toggleFavorite(workshop.Workshop_ID)} className="rounded-full bg-[#80045d] px-5 py-3 text-sm font-semibold text-white">{isFavorite ? "Remove Favorite" : "Save Favorite"}</button>
          <button onClick={() => toggleReminder(workshop.Workshop_ID)} className={reminderSet ? "rounded-full border border-sky-300/30 bg-sky-300/15 px-5 py-3 text-sm font-semibold text-sky-100" : "rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-zinc-200 hover:bg-white/10"}>{reminderSet ? "Reminder set" : "Remind me 10 min before"}</button>
          <button onClick={() => onShareWorkshop?.(workshop)} className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-zinc-200 hover:bg-white/10">Share Workshop ↗</button>
          {location && location.Google_Maps_URL ? <a href={location.Google_Maps_URL} target="_blank" rel="noreferrer" className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm text-zinc-200">Open Google Maps {icon("external")}</a> : null}
          {artists.map((name) => {
            const artist = artistsByName[name];
            if (!artist || !artist.Instagram_URL) return null;
            return <a key={name} href={artist.Instagram_URL} target="_blank" rel="noreferrer" className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm text-zinc-200">{artist.Instagram_Handle || name} {icon("external")}</a>;
          })}
        </div>
      </div>
    </div>
  );
}

function artistMatchesWorkshop(artistName, workshop) {
  return workshop.Artist_1 === artistName || workshop.Artist_2 === artistName;
}

function ArtistDetailsModal({ artist, workshops, onClose, favorites, toggleFavorite, artistsByName, locationsByGroup, openWorkshopDetails, openLocation, onShareWorkshop }) {
  if (!artist) return null;
  const artistWorkshops = workshops
    .filter((workshop) => artistMatchesWorkshop(artist.Artist_Name, workshop))
    .sort((a, b) => {
      if (a.Day !== b.Day) return ["Friday", "Saturday", "Sunday"].indexOf(a.Day) - ["Friday", "Saturday", "Sunday"].indexOf(b.Day);
      return Number(a.Sort_Index || 0) - Number(b.Sort_Index || 0);
    });

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 p-3 backdrop-blur-sm md:items-center">
      <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-[32px] border border-white/10 bg-zinc-950 p-5 shadow-2xl shadow-black">
        <div className="sticky top-0 z-10 -mx-5 -mt-5 mb-5 flex items-center justify-between border-b border-white/10 bg-zinc-950/95 px-5 py-4 backdrop-blur-xl">
          <button onClick={onClose} className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10">← Back to artists</button>
          <button onClick={onClose} className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-xl text-white hover:bg-white/10">×</button>
        </div>

        <p className="text-xs uppercase tracking-[0.25em] text-[#d780bd]">Artist Overview</p>
        <h2 className="mt-2 text-3xl font-bold text-white">{artist.Artist_Name}</h2>
        <p className="mt-2 text-sm text-zinc-400">{artist.Country} · {artist.Style}</p>

        <div className="mt-5 flex flex-wrap gap-3">
          {artist.Instagram_URL ? <a href={artist.Instagram_URL} target="_blank" rel="noreferrer" className="rounded-full bg-[#80045d] px-5 py-3 text-sm font-semibold text-white">{artist.Instagram_Handle || "Instagram"} {icon("external")}</a> : null}
          <span className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm text-zinc-300">{artistWorkshops.length} workshops</span>
        </div>

        <div className="mt-6">
          <p className="mb-4 text-xs uppercase tracking-[0.2em] text-zinc-500">Workshops with {artist.Artist_Name}</p>
          {artistWorkshops.length ? (
            <div className="grid gap-3">
              {artistWorkshops.map((workshop) => (
                <WorkshopCard key={workshop.Workshop_ID} workshop={workshop} isFavorite={favorites.includes(workshop.Workshop_ID)} toggleFavorite={toggleFavorite} artistsByName={artistsByName} locationsByGroup={locationsByGroup} openDetails={openWorkshopDetails} openLocation={openLocation} onShareWorkshop={onShareWorkshop} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-white/15 bg-white/[0.03] p-6 text-sm text-zinc-400">No workshops found for this artist yet. This may update once the final Google Sheets data is loaded.</div>
          )}
        </div>
      </div>
    </div>
  );
}

function groupByDayAndSlot(workshops) {
  const days = ["Friday", "Saturday", "Sunday"];
  return days.map((day) => {
    const slots = new Map();
    workshops.filter((workshop) => workshop.Day === day).forEach((workshop) => {
      const key = `${workshop.Sort_Index}-${workshop.Start_Time}`;
      if (!slots.has(key)) slots.set(key, []);
      slots.get(key).push(workshop);
    });
    return { day, slots: Array.from(slots.values()).sort((a, b) => Number(a[0]?.Sort_Index || 0) - Number(b[0]?.Sort_Index || 0)) };
  });
}

function findTimeConflicts(workshops) {
  const conflicts = [];

  for (let i = 0; i < workshops.length; i++) {
    for (let j = i + 1; j < workshops.length; j++) {
      const a = workshops[i];
      const b = workshops[j];

      if (a.Day !== b.Day) continue;

      const aStart = timeToMinutes(a.Start_Time);
      const aEnd = timeToMinutes(a.End_Time);

      const bStart = timeToMinutes(b.Start_Time);
      const bEnd = timeToMinutes(b.End_Time);

      const overlaps = aStart < bEnd && bStart < aEnd;

      if (overlaps) {
        conflicts.push({
          day: a.Day,
          startTime: `${a.Start_Time} / ${b.Start_Time}`,
          items: [a, b],
        });
      }
    }
  }

  return conflicts;
}

function ConflictWarnings({ conflicts }) {
  if (!conflicts.length) return null;

  return (
    <div className="mb-5 rounded-[28px] border border-amber-300/25 bg-amber-300/10 p-5 text-amber-50">
      <p className="text-xs uppercase tracking-[0.2em] text-amber-200">Time conflict</p>
      <h3 className="mt-2 text-xl font-bold text-white">You selected overlapping workshops</h3>
      <p className="mt-2 text-sm leading-6 text-amber-100/80">Some favorites happen at the same time. Check your plan and decide which one you want to attend.</p>
      <div className="mt-4 space-y-3">
        {conflicts.map((conflict) => (
          <div key={`${conflict.day}-${conflict.startTime}`} className="rounded-2xl border border-amber-200/15 bg-black/20 p-3">
            <p className="text-sm font-semibold text-white">{conflict.day} · {conflict.startTime}</p>
            <p className="mt-1 text-sm text-amber-100/80">{conflict.items.map((item) => item.Workshop_Title).join(" / ")}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function TempodromMiniMap() {
  return (
    <div className="relative overflow-hidden rounded-[28px] border border-[#80045d]/30 bg-gradient-to-br from-[#3d0830] via-[#190414] to-black p-5">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#ffffff10,transparent_35%)]" />

      <div className="relative z-10">
        <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-[11px] uppercase tracking-[0.25em] text-[#d780bd]">Tempodrom Orientation Map</p>
            <h3 className="mt-1 text-2xl font-bold text-white">Main Areas & Dance Floors</h3>
          </div>

          <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-zinc-300">
            Original venue orientation map
          </div>
        </div>

        <div className="overflow-hidden rounded-[28px] border border-white/10 bg-black/30 p-3">
          <img
            src="/Tempodrom Map 2026.png"
            alt="Tempodrom Orientation Map"
            className="w-full rounded-[22px] object-contain"
          />
        </div>

        <div className="mt-5 grid gap-3 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
            <p className="text-sm font-semibold text-white">Big Arena</p>
            <p className="mt-2 text-sm leading-6 text-zinc-400">
              Main social dance floor and central congress area.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
            <p className="text-sm font-semibold text-white">Small Arena & Seminar Rooms</p>
            <p className="mt-2 text-sm leading-6 text-zinc-400">
              Additional workshop and dancing spaces inside Tempodrom.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
            <p className="text-sm font-semibold text-white">Restaurant & Rooftop</p>
            <p className="mt-2 text-sm leading-6 text-zinc-400">
              Social Dance Trainings, Advanced+ workshops and rooftop socials.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function OfflineNotice({ dataStatus, lastUpdated }) {
  if (dataStatus !== "cached") return null;

  return (
    <div className="mb-5 rounded-[24px] border border-amber-300/25 bg-amber-300/10 p-4 text-sm text-amber-50">
      <p className="font-semibold">Offline mode — showing last saved schedule</p>
      <p className="mt-1 text-amber-100/80">
        The app could not reach Google Sheets right now. Favorites still work, and the last saved schedule is available. Last update: {lastUpdated || "unknown"}.
      </p>
    </div>
  );
}

function Hero({ eyebrow, title, children, green = false }) {
  return (
    <div className={green ? "relative overflow-hidden rounded-[34px] border border-white/10 bg-gradient-to-br from-zinc-950 via-black to-[#194d2d]/20 p-6 shadow-2xl shadow-black/30" : "relative overflow-hidden rounded-[34px] border border-[#80045d]/30 bg-gradient-to-br from-[#80045d]/35 via-black to-black p-6 shadow-2xl shadow-[#80045d]/10"}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#ffffff10,transparent_30%)]" />
      <div className="relative z-10">
        <p className={green ? "text-xs uppercase tracking-[0.25em] text-emerald-300" : "text-xs uppercase tracking-[0.25em] text-[#d780bd]"}>{eyebrow}</p>
        <h2 className="mt-2 text-3xl font-bold leading-tight text-white md:text-4xl">{title}</h2>
        <div className="mt-3 max-w-2xl text-sm leading-6 text-zinc-300 md:text-base">{children}</div>
      </div>
    </div>
  );
}

const WEATHER_CODE_LABELS = {
  0: "Clear sky",
  1: "Mainly clear",
  2: "Partly cloudy",
  3: "Cloudy",
  45: "Foggy",
  48: "Foggy",
  51: "Light drizzle",
  53: "Drizzle",
  55: "Dense drizzle",
  61: "Light rain",
  63: "Rain",
  65: "Heavy rain",
  71: "Light snow",
  73: "Snow",
  75: "Heavy snow",
  80: "Rain showers",
  81: "Rain showers",
  82: "Heavy showers",
  95: "Thunderstorm",
};

function getWeatherIcon(code) {
  if ([0, 1].includes(code)) return "☀️";
  if ([2].includes(code)) return "⛅";
  if ([3, 45, 48].includes(code)) return "☁️";
  if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code)) return "🌧️";
  if ([71, 73, 75].includes(code)) return "❄️";
  if ([95].includes(code)) return "⛈️";
  return "🌤️";
}

function getRooftopOutlook(day) {
  if (!day) return null;
  const rain = Number(day.rainProbability ?? 0);
  const wind = Number(day.windSpeed ?? 0);
  const maxTemp = Number(day.maxTemp ?? 0);
  const code = Number(day.weatherCode ?? 0);
  const rainyCode = [51, 53, 55, 61, 63, 65, 80, 81, 82, 95].includes(code);

  if (rain <= 25 && !rainyCode && wind < 28 && maxTemp >= 18) {
    return {
      title: "Good rooftop chances",
      label: "Weather looks promising — the Rooftop Social might be open.",
      style: "border-emerald-400/25 bg-emerald-400/10 text-emerald-50",
      icon: "✅",
    };
  }

  if (rain >= 60 || rainyCode || wind >= 38) {
    return {
      title: "Rooftop unlikely",
      label: "Rain or strong wind could make rooftop dancing unlikely.",
      style: "border-red-400/25 bg-red-400/10 text-red-50",
      icon: "🌧️",
    };
  }

  return {
    title: "Rooftop depends on conditions",
    label: "The outlook is mixed — please check official event updates during the day.",
    style: "border-amber-300/25 bg-amber-300/10 text-amber-50",
    icon: "⚠️",
  };
}

function WeatherCard({ weather, loading, error }) {
  const rooftopOutlook = getRooftopOutlook(weather?.today);

  return (
    <div className="mt-6 rounded-[30px] border border-sky-300/20 bg-gradient-to-br from-sky-500/10 via-black to-[#80045d]/10 p-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="text-[11px] uppercase tracking-[0.2em] text-sky-200">Live Weather</p>
          <h3 className="mt-2 text-2xl font-bold text-white">Weather at Tempodrom</h3>
          <p className="mt-2 text-sm leading-6 text-zinc-400">Real weather data for Berlin, including a gentle Rooftop Social outlook.</p>
        </div>
        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-zinc-300">Berlin Kreuzberg</span>
      </div>

      {loading ? <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm text-zinc-300">Loading weather data...</div> : null}
      {error ? <div className="mt-5 rounded-2xl border border-amber-300/20 bg-amber-300/10 p-4 text-sm text-amber-50">Weather data is currently unavailable. Please check again later.</div> : null}

      {weather?.days?.length ? (
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {weather.days.map((day) => (
            <div key={day.label} className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.2em] text-zinc-500">{day.label}</p>
                  <h4 className="mt-1 text-xl font-bold text-white">{getWeatherIcon(day.weatherCode)} {day.condition}</h4>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-black text-white">{Math.round(day.maxTemp)}°</p>
                  <p className="text-xs text-zinc-500">high</p>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-2 text-xs text-zinc-300">
                <div className="rounded-2xl bg-black/25 p-3"><p className="text-zinc-500">Low</p><p className="mt-1 font-semibold text-white">{Math.round(day.minTemp)}°C</p></div>
                <div className="rounded-2xl bg-black/25 p-3"><p className="text-zinc-500">Rain</p><p className="mt-1 font-semibold text-white">{day.rainProbability}%</p></div>
                <div className="rounded-2xl bg-black/25 p-3"><p className="text-zinc-500">Wind</p><p className="mt-1 font-semibold text-white">{Math.round(day.windSpeed)} km/h</p></div>
              </div>
            </div>
          ))}
        </div>
      ) : null}

      {rooftopOutlook ? (
        <div className={`mt-5 rounded-3xl border p-5 ${rooftopOutlook.style}`}>
          <p className="text-[11px] uppercase tracking-[0.2em] opacity-80">Rooftop Outlook</p>
          <h4 className="mt-2 text-xl font-bold text-white">{rooftopOutlook.icon} {rooftopOutlook.title}</h4>
          <p className="mt-2 text-sm leading-6 opacity-90">{rooftopOutlook.label}</p>
          <p className="mt-3 text-xs leading-5 opacity-75">This is only a weather-based hint, not an official confirmation. Please follow the event updates for the final decision.</p>
        </div>
      ) : null}
    </div>
  );
}

export default function App() {
  useEffect(() => {
  async function loadCapacityData() {
    const { data, error } = await supabase
      .from("workshop_capacity")
      .select("*");

    if (error) {
      console.log("LOAD CAPACITY ERROR:", error);
      return;
    }

    const mappedData = {};

    data.forEach((item) => {
      mappedData[item.workshop_id] = item;
    });

    setCapacityData(mappedData);

    console.log("CAPACITY DATA:", mappedData);
  }

  loadCapacityData();
}, []);
  const [activeTab, setActiveTab] = useState("today");
  const [workshops, setWorkshops] = useState(fallbackWorkshops);
  const [artists, setArtists] = useState(fallbackArtists);
  const [locations, setLocations] = useState(fallbackLocations);
  const [capacityData, setCapacityData] = useState({});
  const [favorites, setFavorites] = useState([]);
  const [lastUpdated, setLastUpdated] = useState("");
  const [dataStatus, setDataStatus] = useState("loading");
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [selectedDay, setSelectedDay] = useState("All");
  const [todayViewDay, setTodayViewDay] = useState("Friday");
  const [levelFilter, setLevelFilter] = useState("All");
  const [locationFilter, setLocationFilter] = useState("All");
  const [partnerworkFilter, setPartnerworkFilter] = useState("All");
  const [signupFilter, setSignupFilter] = useState("All");
  const [styleFilter, setStyleFilter] = useState("All");
  const [selectedWorkshop, setSelectedWorkshop] = useState(null);
  const [selectedArtist, setSelectedArtist] = useState(null);
  const [storyOpen, setStoryOpen] = useState(false);
  const [reminders, setReminders] = useState([]);
  const [weather, setWeather] = useState(null);
  const [weatherLoading, setWeatherLoading] = useState(false);
  const [weatherError, setWeatherError] = useState(false);
  const [shareNotice, setShareNotice] = useState("");
  const shareCardRef = React.useRef(null);

const downloadStoryCard = async () => {
  if (!shareCardRef.current) return;

  try {
    const dataUrl = await htmlToImage.toPng(shareCardRef.current, {
      pixelRatio: 3,
      backgroundColor: "#000000",
    });

    const link = document.createElement("a");
    link.download = "bsc-story-card.png";
    link.href = dataUrl;
    link.click();
  } catch (error) {
    console.error("Error generating image:", error);
  }
};
  useEffect(() => {
    const saved = localStorage.getItem("bsc-favorites");
    if (saved) setFavorites(JSON.parse(saved));

    const savedReminders = localStorage.getItem("bsc-reminders");
    if (savedReminders) setReminders(JSON.parse(savedReminders));
  }, []);

  useEffect(() => {
    localStorage.setItem("bsc-favorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem("bsc-reminders", JSON.stringify(reminders));
  }, [reminders]);

  useEffect(() => {
    let active = true;

    const cached = loadCachedData();
    if (cached) {
      setWorkshops((cached.workshops || fallbackWorkshops).sort((a, b) => Number(a.Sort_Index || 0) - Number(b.Sort_Index || 0)));
      setArtists(cached.artists || fallbackArtists);
      setLocations(ensureCoreLocations(cached.locations || fallbackLocations));
      setLastUpdated(cached.lastUpdated || "");
      setDataStatus("cached");
    }

    async function loadData() {
      try {
        const [workshopData, artistData, locationData] = await Promise.all([
          fetchCSV(CSV_URLS.workshops, fallbackWorkshops),
          fetchCSV(CSV_URLS.artists, fallbackArtists),
          fetchCSV(CSV_URLS.locations, fallbackLocations),
        ]);

        if (!active) return;

        const timestamp = new Date().toLocaleString([], { dateStyle: "medium", timeStyle: "short" });
        const sortedWorkshops = workshopData.sort((a, b) => Number(a.Sort_Index || 0) - Number(b.Sort_Index || 0));
        const fullLocations = ensureCoreLocations(locationData);

        setWorkshops(sortedWorkshops);
        setArtists(artistData);
        setLocations(fullLocations);
        setLastUpdated(timestamp);
        setDataStatus("live");

        saveCachedData({
          workshops: sortedWorkshops,
          artists: artistData,
          locations: fullLocations,
          lastUpdated: timestamp,
        });
      } catch (error) {
        console.warn("Could not load live data", error);
        if (!active) return;

        const cachedData = loadCachedData();
        if (cachedData) {
          setWorkshops((cachedData.workshops || fallbackWorkshops).sort((a, b) => Number(a.Sort_Index || 0) - Number(b.Sort_Index || 0)));
          setArtists(cachedData.artists || fallbackArtists);
          setLocations(ensureCoreLocations(cachedData.locations || fallbackLocations));
          setLastUpdated(cachedData.lastUpdated || "");
          setDataStatus("cached");
        } else {
          setWorkshops(fallbackWorkshops);
          setArtists(fallbackArtists);
          setLocations(fallbackLocations);
          setLastUpdated("fallback data");
          setDataStatus("cached");
        }
      }
    }

    loadData();
    const interval = setInterval(loadData, 1000 * 60 * 5);
    return () => { active = false; clearInterval(interval); };
  }, []);

  useEffect(() => {
    let active = true;

    async function loadWeather() {
      setWeatherLoading(true);
      setWeatherError(false);

      try {
        const url = "https://api.open-meteo.com/v1/forecast?latitude=52.5009&longitude=13.3815&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,wind_speed_10m_max&timezone=Europe%2FBerlin&forecast_days=2";
        const response = await fetch(url, { cache: "no-store" });
        if (!response.ok) throw new Error(`Weather request failed: ${response.status}`);
        const data = await response.json();

        const days = (data.daily?.time || []).map((date, index) => ({
          date,
          label: index === 0 ? "Today" : "Tomorrow",
          weatherCode: data.daily?.weather_code?.[index] ?? 0,
          condition: WEATHER_CODE_LABELS[data.daily?.weather_code?.[index]] || "Weather update",
          maxTemp: data.daily?.temperature_2m_max?.[index] ?? 0,
          minTemp: data.daily?.temperature_2m_min?.[index] ?? 0,
          rainProbability: data.daily?.precipitation_probability_max?.[index] ?? 0,
          windSpeed: data.daily?.wind_speed_10m_max?.[index] ?? 0,
        }));

        if (!active) return;
        setWeather({ days, today: days[0] || null, tomorrow: days[1] || null, lastUpdated: new Date().toLocaleString([], { dateStyle: "medium", timeStyle: "short" }) });
      } catch (error) {
        console.warn("Could not load weather data", error);
        if (!active) return;

        setWeather({
          days: [
            {
              label: "Today",
              weatherCode: 2,
              condition: "Partly cloudy",
              maxTemp: 24,
              minTemp: 16,
              rainProbability: 20,
              windSpeed: 18,
            },
            {
              label: "Tomorrow",
              weatherCode: 0,
              condition: "Sunny",
              maxTemp: 27,
              minTemp: 17,
              rainProbability: 10,
              windSpeed: 14,
            },
          ],
          today: {
            label: "Today",
            weatherCode: 2,
            condition: "Partly cloudy",
            maxTemp: 24,
            minTemp: 16,
            rainProbability: 20,
            windSpeed: 18,
          },
        });

        setWeatherError(true);
      } finally {
        if (active) setWeatherLoading(false);
      }
    }

    loadWeather();
    const interval = setInterval(loadWeather, 1000 * 60 * 30);
    return () => { active = false; clearInterval(interval); };
  }, []);

  const artistsByName = useMemo(() => Object.fromEntries(artists.map((artist) => [artist.Artist_Name, artist])), [artists]);
  const locationsByGroup = useMemo(() => {
    const map = {};
    locations.forEach((location) => {
      if (location.Location_Group) map[location.Location_Group] = location;
      if (location.Location_Name) map[location.Location_Name] = location;
    });
    return map;
  }, [locations]);

  const displayLocations = useMemo(() => {
    const preferredVenueNames = ["Tempodrom", "Sporthall", "Aletto Hotel", "Holiday Inn Express"];

    function canonicalVenueName(location) {
      const value = String(location.Location_Group || location.Location_Name || "").trim();
      const lower = value.toLowerCase();

      if (lower.includes("tempodrom") || lower.includes("big arena") || lower.includes("small arena") || lower.includes("restaurant") || lower.includes("seminar")) return "Tempodrom";
      if (lower.includes("sport")) return "Sporthall";
      if (lower.includes("aletto")) return "Aletto Hotel";
      if (lower.includes("holiday")) return "Holiday Inn Express";

      return value;
    }

    const byVenue = new Map();

    locations.forEach((location) => {
      const canonicalName = canonicalVenueName(location);
      if (!preferredVenueNames.includes(canonicalName)) return;

      if (!byVenue.has(canonicalName)) {
        const fallback = fallbackLocations.find((item) => item.Location_Name === canonicalName) || {};
        byVenue.set(canonicalName, {
          ...fallback,
          ...location,
          Location_Name: canonicalName,
          Location_Group: canonicalName,
          Address: location.Address || fallback.Address || "Berlin",
          Google_Maps_URL: fallback.Google_Maps_URL || location.Google_Maps_URL || "",
          Description: fallback.Description || location.Description || "Congress venue.",
        });
      }
    });

    preferredVenueNames.forEach((name) => {
      if (!byVenue.has(name)) {
        const fallback = fallbackLocations.find((location) => location.Location_Name === name);
        if (fallback) byVenue.set(name, fallback);
      }
    });

    return preferredVenueNames.map((name) => byVenue.get(name)).filter(Boolean);
  }, [locations]);
  const categories = useMemo(() => {
    return [
      "Salsa",
      "Mambo",
      "Cuban",
      "ChaChaCha",
      "Ladies Styling",
      "Cali",
    ];
  }, []);
  const levels = useMemo(() => Array.from(new Set(workshops.map((workshop) => workshop.Level).filter(Boolean))).sort(), [workshops]);
  const styles = useMemo(() => Array.from(new Set(workshops.map((workshop) => workshop.Style).filter(Boolean))).sort(), [workshops]);
  const locationOptions = useMemo(() => Array.from(new Set(workshops.map((workshop) => workshop.Room_Group).filter(Boolean))).sort(), [workshops]);

  const filteredWorkshops = useMemo(() => {
    const search = query.toLowerCase();
    return workshops.filter((workshop) => {
      const content = `${workshop.Workshop_Title} ${workshop.Artist_1} ${workshop.Artist_2} ${workshop.Room} ${workshop.Room_Group} ${workshop.Level} ${workshop.Category} ${workshop.Style}`.toLowerCase();
      const matchesSearch = !search || content.includes(search);
      const matchesCategory = category === "All" || workshop.Category === category;
      const matchesDay = selectedDay === "All" || workshop.Day === selectedDay;
      const fieldContains = (fieldValue, filterValue) => String(fieldValue || "").toLowerCase().includes(String(filterValue || "").toLowerCase());
      const matchesLevel = levelFilter === "All" || fieldContains(workshop.Level, levelFilter);
      const matchesLocation = locationFilter === "All" || workshop.Room_Group === locationFilter;
      const matchesPartnerwork = partnerworkFilter === "All" || workshop.Partnerwork === partnerworkFilter;
      const matchesSignup = signupFilter === "All" || (signupFilter === "Prior Sign Up Required" ? workshop.Signup_Required === "Yes" : workshop.Signup_Required !== "Yes");
      const matchesStyle = styleFilter === "All" || fieldContains(workshop.Style, styleFilter);
      return matchesSearch && matchesCategory && matchesDay && matchesLevel && matchesLocation && matchesPartnerwork && matchesSignup && matchesStyle;
    });
  }, [workshops, query, category, selectedDay, levelFilter, locationFilter, partnerworkFilter, signupFilter, styleFilter]);

  const favoriteWorkshops = useMemo(() => workshops.filter((workshop) => favorites.includes(workshop.Workshop_ID)), [workshops, favorites]);
  const favoriteConflicts = useMemo(() => findTimeConflicts(favoriteWorkshops), [favoriteWorkshops]);
  const favoriteTransitions = useMemo(() => getFavoriteTransitions(favoriteWorkshops), [favoriteWorkshops]);
  const smartRecommendations = useMemo(() => getRecommendedCategories(favoriteWorkshops), [favoriteWorkshops]);
  const congressStats = useMemo(() => getCongressStats(favoriteWorkshops, favoriteTransitions), [favoriteWorkshops, favoriteTransitions]);
  const congressPersonality = useMemo(() => getCongressPersonality(congressStats, favoriteWorkshops), [congressStats, favoriteWorkshops]);
  const todayDay = todayViewDay;
  const todayWorkshops = filteredWorkshops.filter((workshop) => workshop.Day === todayDay);
  const nextSlot = todayWorkshops[0]?.Start_Time || "15:30";

  async function toggleFavorite(id) {

  const alreadyFavorite = favorites.includes(id);

  setFavorites((current) =>
    alreadyFavorite
      ? current.filter((item) => item !== id)
      : [...current, id]
  );

  const workshop = workshops.find(w => w.Workshop_ID === id);

  if (!workshop) return;

  const currentCapacity =
    workshop.current_saved || 0;

  const newCapacity =
    alreadyFavorite
      ? Math.max(currentCapacity - 1, 0)
      : currentCapacity + 1;

  const { error } = await supabase
    .from("workshop_capacity")
    .upsert({
      workshop_id: id,
      current_saved: newCapacity,
      room_capacity: 100,
    });

  console.log("CAPACITY UPDATE:", newCapacity);
  console.log("CAPACITY ERROR:", error);
}

  function toggleReminder(id) {
    setReminders((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  }

  function openLocationFromWorkshop(locationName) {
    const canonicalLocation = String(locationName || "").toLowerCase().includes("tempodrom") ? "Tempodrom" : locationName;

    setSelectedWorkshop(null);
    setSelectedArtist(null);
    setStoryOpen(false);
    setActiveTab("locations");

    window.setTimeout(() => {
      const targetId = canonicalLocation === "Tempodrom" ? "tempodrom-map" : `location-${slugify(canonicalLocation)}`;
      const element = document.getElementById(targetId);
      if (element) element.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 180);
  }

  async function handleShareWorkshop(workshop) {
    const result = await shareWorkshop(workshop);
    if (result === "copied") setShareNotice("Workshop details copied to clipboard.");
    if (result === "failed") setShareNotice("Sharing did not work. Please try again.");
    if (result === "shared") setShareNotice("Workshop shared.");
    if (result === "cancelled") return;

    window.setTimeout(() => setShareNotice(""), 2600);
  }

  function renderWorkshopList(list) {
  return (
    <div className="space-y-6">
      {groupByDayAndSlot(list).map(({ day, slots }) =>
        slots.length ? (
          <section key={day}>
            <h2 className="mb-3 text-xl font-bold text-white">{day}</h2>
            <div className="space-y-5">
              {slots.map((items) => (
                <div key={`${items[0]?.Day}-${items[0]?.Start_Time}`}>
                  <h3 className="mb-3 text-sm font-semibold text-[#d780bd]">
                    {icon("clock")} {items[0]?.Start_Time}–{items[0]?.End_Time}
                  </h3>

                  <div className="grid gap-3 md:grid-cols-2">
                    {items.map((workshop) => (
                      <WorkshopCard
                        key={workshop.Workshop_ID}
                        workshop={workshop}
                        capacityData={capacityData}
                        isFavorite={favorites.includes(workshop.Workshop_ID)}
                        toggleFavorite={toggleFavorite}
                        artistsByName={artistsByName}
                        locationsByGroup={locationsByGroup}
                        openDetails={setSelectedWorkshop}
                        openLocation={openLocationFromWorkshop}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        ) : null
      )}
    </div>
  );
}

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_top_left,#80045d55,transparent_32%),radial-gradient(circle_at_bottom_right,#194d2d33,transparent_30%)]" />
      <Header lastUpdated={lastUpdated} favoritesCount={favorites.length} dataStatus={dataStatus} />

      {shareNotice ? (
        <div className="fixed left-1/2 top-4 z-[60] w-[calc(100%-2rem)] max-w-sm -translate-x-1/2 rounded-2xl border border-emerald-400/25 bg-emerald-400/15 px-4 py-3 text-center text-sm font-semibold text-emerald-50 shadow-2xl shadow-black/40 backdrop-blur-xl">
          {shareNotice}
        </div>
      ) : null}

      <main className="relative mx-auto max-w-4xl px-4 pb-28 pt-5">
        <OfflineNotice dataStatus={dataStatus} lastUpdated={lastUpdated} />
        {activeTab === "today" ? (
          <div>
            <Hero eyebrow={`Today · ${todayDay}`} title={`Next workshops start at ${nextSlot}`}>
              Your fast overview for the workshop day. Save favorites, discover artists and move smoothly between venues.
            </Hero>
            <DaySwitch value={todayViewDay} onChange={setTodayViewDay} />
            <div className="mt-6"><SearchFilters query={query} setQuery={setQuery} category={category} setCategory={setCategory} categories={categories} /></div>
            <AdvancedFilters level={levelFilter} setLevel={setLevelFilter} location={locationFilter} setLocation={setLocationFilter} partnerwork={partnerworkFilter} setPartnerwork={setPartnerworkFilter} signup={signupFilter} setSignup={setSignupFilter} styleFilter={styleFilter} setStyleFilter={setStyleFilter} levels={levels} locations={locationOptions} styles={styles} />
            <div className="mb-6 rounded-3xl border border-white/10 bg-white/[0.03] p-5"><p className="text-xs uppercase tracking-[0.2em] text-zinc-500">Starting soon</p><h3 className="mt-1 text-xl font-bold text-white">{nextSlot} Workshops</h3></div>
            {renderWorkshopList(todayWorkshops)}

            <div className="mt-8 grid gap-3 md:grid-cols-4">
              <div className="rounded-2xl border border-white/10 bg-black/30 p-4"><p className="text-[11px] uppercase tracking-[0.2em] text-zinc-500">Current focus</p><p className="mt-2 text-lg font-semibold text-white">Today Schedule</p><p className="mt-1 text-sm text-zinc-400">Quick access to all workshops happening today.</p></div>
              <div className="rounded-2xl border border-white/10 bg-black/30 p-4"><p className="text-[11px] uppercase tracking-[0.2em] text-zinc-500">Favorites</p><p className="mt-2 text-lg font-semibold text-white">{favorites.length} saved</p><p className="mt-1 text-sm text-zinc-400">Build your personal weekend plan.</p></div>
              <div className="rounded-2xl border border-white/10 bg-black/30 p-4"><p className="text-[11px] uppercase tracking-[0.2em] text-zinc-500">Locations</p><p className="mt-2 text-lg font-semibold text-white">{displayLocations.length} venues</p><p className="mt-1 text-sm text-zinc-400">Google Maps included.</p></div>
              <div className="rounded-2xl border border-white/10 bg-black/30 p-4"><p className="text-[11px] uppercase tracking-[0.2em] text-zinc-500">Conflicts</p><p className="mt-2 text-lg font-semibold text-white">{favoriteConflicts.length}</p><p className="mt-1 text-sm text-zinc-400">Overlapping favorites detected.</p></div>
            </div>
          </div>
        ) : null}

        {activeTab === "schedule" ? (
          <div>
            <Hero eyebrow="Workshop Overview" title="Full Schedule">Browse all workshops by day, category and artist. Build your perfect congress experience.</Hero>
            <div className="mt-6 flex gap-3 overflow-x-auto pb-2">
              {["All", "Friday", "Saturday", "Sunday"].map((day) => <button key={day} onClick={() => setSelectedDay(day)} className={selectedDay === day ? "shrink-0 rounded-full bg-[#80045d] px-5 py-3 text-sm font-medium text-white" : "shrink-0 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-zinc-300"}>{day}</button>)}
            </div>
            <QuickPlanIndicator favoritesCount={favorites.length} conflictsCount={favoriteConflicts.length} />
            <SmartRecommendations recommendations={smartRecommendations} onSelectCategory={(value) => setCategory(value)} onSelectStyle={(value) => setStyleFilter(value)} onSelectCombo={(categoryValue, styleValue) => { setCategory(categoryValue); setStyleFilter(styleValue); }} />
            <div className="mt-5"><SearchFilters query={query} setQuery={setQuery} category={category} setCategory={setCategory} categories={categories} /></div>
            <AdvancedFilters level={levelFilter} setLevel={setLevelFilter} location={locationFilter} setLocation={setLocationFilter} partnerwork={partnerworkFilter} setPartnerwork={setPartnerworkFilter} signup={signupFilter} setSignup={setSignupFilter} styleFilter={styleFilter} setStyleFilter={setStyleFilter} levels={levels} locations={locationOptions} styles={styles} />
            {renderWorkshopList(filteredWorkshops)}
          </div>
        ) : null}

        {activeTab === "mine" ? (
          <div>
            <Hero eyebrow="Personal Planner" title="My Schedule">Your personal workshop selection for the weekend. Favorites are saved directly on your device.</Hero>
            <div className="mt-6">
              {favoriteWorkshops.length ? (
                <div>
                  <CongressStats stats={congressStats} personality={congressPersonality} onOpenStory={() => setStoryOpen(true)} />
                  <ConflictWarnings conflicts={favoriteConflicts} />
                  <FavoriteTransitions transitions={favoriteTransitions} />
                  {renderWorkshopList(favoriteWorkshops)}
                </div>
              ) : (
                <div className="rounded-[32px] border border-dashed border-white/15 bg-white/[0.03] p-10 text-center">
                  <div className="mb-3 text-4xl text-[#d780bd]">♡</div>
                  <h3 className="text-2xl font-bold text-white">No favorites yet</h3>
                  <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-zinc-400">Tap the heart icon on any workshop to create your personal congress schedule.</p>
                  <button onClick={() => setActiveTab("schedule")} className="mt-6 rounded-full bg-[#80045d] px-5 py-3 text-sm font-semibold text-white">Explore Workshops</button>
                </div>
              )}
            </div>
          </div>
        ) : null}

        {activeTab === "artists" ? (
          <div>
            <Hero eyebrow="Line-Up" title="Artists">Discover the instructors, connect on Instagram and explore the international Berlin Salsacongress family.</Hero>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {artists.slice().sort((a, b) => a.Artist_Name.localeCompare(b.Artist_Name)).map((artist) => {
                const count = workshops.filter((workshop) => artistMatchesWorkshop(artist.Artist_Name, workshop)).length;
                return (
                  <div key={artist.Artist_Name} className="rounded-[28px] border border-white/10 bg-gradient-to-br from-zinc-950 to-black p-5">
                    <p className="text-[11px] uppercase tracking-[0.2em] text-zinc-500">{artist.Country}</p>
                    <button onClick={() => setSelectedArtist(artist)} className="text-left"><h3 className="mt-1 text-xl font-bold text-white transition hover:text-pink-100">{artist.Artist_Name}</h3></button>
                    <p className="mt-2 text-sm text-zinc-400">{artist.Style}</p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      <button onClick={() => setSelectedArtist(artist)} className="rounded-full border border-[#80045d]/30 bg-[#80045d]/20 px-4 py-2 text-sm text-pink-100 hover:bg-[#80045d]/30">View workshops · {count}</button>
                      {artist.Instagram_URL ? <a href={artist.Instagram_URL} target="_blank" rel="noreferrer" className="rounded-full bg-[#80045d] px-4 py-2 text-sm font-medium text-white">{artist.Instagram_Handle || "Instagram"} {icon("external")}</a> : null}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : null}

        {activeTab === "locations" ? (
  <div>
    <Hero eyebrow="Navigation" title="Locations & Venues" green>
      Quickly find your workshop locations, open Google Maps and move smoothly between venues during the congress weekend.
    </Hero>

    <div id="tempodrom-map" className="mt-6 scroll-mt-24">
      <TempodromMiniMap />
    </div>

    <div className="mt-6 grid gap-5">
      {displayLocations.map((location) => (
        <div
          id={`location-${slugify(location.Location_Name)}`}
          key={location.Location_Name}
          className="scroll-mt-24 overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-br from-zinc-950 via-black to-zinc-950"
        >
          <div className="flex h-44 items-center justify-center bg-gradient-to-br from-[#80045d]/30 via-black to-[#194d2d]/30 text-center">
            <div>
              <div className="text-4xl">📍</div>
              <p className="mt-4 text-sm uppercase tracking-[0.25em] text-zinc-300">Venue Map</p>
            </div>
          </div>

          <div className="p-5">
            <h3 className="text-2xl font-bold text-white">{location.Location_Name}</h3>
            <p className="mt-2 text-sm text-zinc-400">{location.Address}</p>
            <p className="mt-3 text-sm leading-6 text-zinc-300">{location.Description}</p>

            {location.Map_Image && location.Location_Name !== "Tempodrom" ? (
              <div className="mt-4 overflow-hidden rounded-2xl border border-white/10">
                <img
                  src={location.Map_Image}
                  alt={`${location.Location_Name} map`}
                  className="w-full object-cover"
                />
              </div>
            ) : null}

            <WalkingTimeChips locationName={location.Location_Name} allLocations={displayLocations} />

            {location.Google_Maps_URL ? (
              <a
                href={location.Google_Maps_URL}
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex rounded-full bg-[#80045d] px-5 py-3 text-sm font-semibold text-white"
              >
                Open in Google Maps {icon("external")}
              </a>
            ) : null}
          </div>
        </div>
      ))}
    </div>
  </div>
) : null}
    {activeTab === "info" ? (
      <div>
            <Hero eyebrow="One Family" title="Berlin Salsacongress 2026">Your practical workshop companion for the congress weekend. Build your personal schedule, explore artists, navigate venues and enjoy the magic of social dancing together.</Hero>

            <WeatherCard weather={weather} loading={weatherLoading} error={weatherError} />

            <div className="mt-6 grid gap-5 md:grid-cols-2">
              <div className="rounded-[30px] border border-white/10 bg-white/[0.03] p-6">
                <p className="text-[11px] uppercase tracking-[0.2em] text-zinc-500">Features</p>
                <h3 className="mt-2 text-2xl font-bold text-white">What the app offers</h3>
                <ul className="mt-4 space-y-3 text-sm leading-6 text-zinc-400">
                  <li>• Personal workshop schedule with favorites</li>
                  <li>• Smart recommendations based on your dance preferences</li>
                  <li>• Venue navigation with Google Maps integration</li>
                  <li>• Walking times between workshops and venues</li>
                  <li>• Capacity forecasts for popular workshops</li>
                  <li>• Congress Stats & shareable Story Cards</li>
                </ul>
              </div>

              <div className="rounded-[30px] border border-white/10 bg-white/[0.03] p-6">
                <p className="text-[11px] uppercase tracking-[0.2em] text-zinc-500">How it works</p>
                <h3 className="mt-2 text-2xl font-bold text-white">Built for social dancers</h3>
                <p className="mt-4 text-sm leading-6 text-zinc-400">
                  Save your favorite workshops, discover artists, navigate easily between venues and create your own smooth congress experience throughout the weekend.
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-zinc-300">Live Schedule</span>
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-zinc-300">Smart Filters</span>
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-zinc-300">Walking Times</span>
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-zinc-300">One Family</span>
                </div>
              </div>
            </div>

            <div className="mt-5 rounded-[30px] border border-white/10 bg-gradient-to-br from-zinc-950 to-black p-6">
              <p className="text-[11px] uppercase tracking-[0.2em] text-zinc-500">Community</p>
              <h3 className="mt-2 text-2xl font-bold text-white">Stay Connected</h3>
              <p className="mt-3 text-sm leading-6 text-zinc-400">
                Join our international One Family community and receive important live updates during the congress weekend — including workshop cancellations, show start times, schedule changes, announcements and much more. It is the fastest way to stay informed throughout the event.
              </p>

              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <div className="rounded-3xl border border-[#25D366]/20 bg-[#25D366]/10 p-5">
                  <p className="text-[11px] uppercase tracking-[0.2em] text-[#9cf0bf]">Live Updates</p>
                  <h4 className="mt-2 text-xl font-bold text-white">WhatsApp Community</h4>
                  <p className="mt-3 text-sm leading-6 text-zinc-300">
                    Receive the fastest event updates during the weekend — including workshop cancellations, show start times, room changes, announcements and important last-minute information.
                  </p>

                  <a
                    href="https://chat.whatsapp.com/JWjXgy9fNer6VRAceuceT1"
                    target="_blank"
                    rel="noreferrer"
                    className="mt-5 inline-flex items-center justify-center rounded-full bg-[#25D366] px-5 py-3 text-sm font-semibold text-black transition hover:opacity-90"
                  >
                    Join WhatsApp Group {icon("external")}
                  </a>
                </div>

                <div className="rounded-3xl border border-[#80045d]/20 bg-[#80045d]/10 p-5">
                  <p className="text-[11px] uppercase tracking-[0.2em] text-pink-200">Social Media</p>
                  <h4 className="mt-2 text-xl font-bold text-white">Follow us on Instagram</h4>
                  <p className="mt-3 text-sm leading-6 text-zinc-300">
                    Discover behind-the-scenes moments, social dancing highlights, artist videos, announcements and the unique One Family atmosphere before and during the congress.
                  </p>

                  <a
                    href="https://www.instagram.com/berlin_salsa_congress"
                    target="_blank"
                    rel="noreferrer"
                    className="mt-5 inline-flex items-center justify-center rounded-full bg-[#80045d] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#96076d]"
                  >
                    Follow on Instagram {icon("external")}
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-5 rounded-[30px] border border-amber-300/20 bg-amber-300/10 p-6">
              <p className="text-[11px] uppercase tracking-[0.2em] text-amber-200">Workshop Etiquette</p>
              <h3 className="mt-2 text-2xl font-bold text-white">Respect the Learning Experience</h3>
              <p className="mt-4 text-sm leading-6 text-amber-50/90">
                To create the best learning atmosphere for everyone, filming during workshops is not allowed.
              </p>
              <p className="mt-4 text-sm leading-6 text-amber-50/90">
                Please wait until the teachers invite participants to record the final workshop demo at the end of the class. ✨
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                <span className="rounded-full border border-amber-200/15 bg-black/20 px-3 py-1.5 text-xs text-amber-100">Respect the teachers</span>
                <span className="rounded-full border border-amber-200/15 bg-black/20 px-3 py-1.5 text-xs text-amber-100">Better focus during class</span>
                <span className="rounded-full border border-amber-200/15 bg-black/20 px-3 py-1.5 text-xs text-amber-100">Film the final demo</span>
              </div>
            </div>
          </div>
        ) : null}
      </main>

      <WorkshopDetailsModal workshop={selectedWorkshop} onClose={() => setSelectedWorkshop(null)} artistsByName={artistsByName} locationsByGroup={locationsByGroup} isFavorite={selectedWorkshop ? favorites.includes(selectedWorkshop.Workshop_ID) : false} toggleFavorite={toggleFavorite} favoriteWorkshops={favoriteWorkshops} openLocation={openLocationFromWorkshop} reminderSet={selectedWorkshop ? reminders.includes(selectedWorkshop.Workshop_ID) : false} toggleReminder={toggleReminder} onShareWorkshop={handleShareWorkshop} />

      <ArtistDetailsModal artist={selectedArtist} workshops={workshops} onClose={() => setSelectedArtist(null)} favorites={favorites} toggleFavorite={toggleFavorite} artistsByName={artistsByName} locationsByGroup={locationsByGroup} openWorkshopDetails={setSelectedWorkshop} openLocation={openLocationFromWorkshop} onShareWorkshop={handleShareWorkshop} />

      <StoryCardModal
  open={storyOpen}
  onClose={() => setStoryOpen(false)}
  stats={congressStats}
  personality={congressPersonality}
  shareCardRef={shareCardRef}
  downloadStoryCard={downloadStoryCard}
/>

      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}
