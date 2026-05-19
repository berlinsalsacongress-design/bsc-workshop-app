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
const DEMO_VIDEO_UPLOAD_URL =
  "https://forms.gle/qebPUS8sCajMcHFK6";

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
  { Location_Name: "Tempodrom", Location_Group: "Tempodrom", Map_Image: "/Tempodrom Map 2026.png", Address: "Möckernstraße 10, 10963 Berlin", Google_Maps_URL: "https://www.google.com/maps/search/?api=1&query=Tempodrom%20M%C3%B6ckernstra%C3%9Fe%2010%2010963%20Berlin", Description: "Main venue with socials and workshops." },
  { Location_Name: "Aletto Hotel", Location_Group: "Aletto Hotel", Address: "Berlin", Google_Maps_URL: "https://www.google.com/maps/search/?api=1&query=Aletto%20Hotel%20Potsdamer%20Platz%20Luckenwalder%20Str.%2012-14%2010963%20Berlin", Description: "Nearby workshop venue." },
  { Location_Name: "Holiday Inn Express", Location_Group: "Holiday Inn Express", Address: "Berlin", Google_Maps_URL: "https://www.google.com/maps/search/?api=1&query=Holiday%20Inn%20Express%20Berlin%20Stresemannstra%C3%9Fe%2049%2010963%20Berlin", Description: "Additional nearby congress location." },
  { Location_Name: "Sporthall", Location_Group: "Sporthall", Address: "Berlin", Google_Maps_URL: "https://www.google.com/maps/search/?api=1&query=Sporthalle%20Tempodrom%20Berlin%20M%C3%B6ckernstra%C3%9Fe%2010%2010963%20Berlin", Description: "Additional workshop area." },
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

function normalizeExternalUrl(url) {
  const raw = String(url || "").trim();
  if (!raw) return "";
  if (raw.startsWith("@")) return `https://www.instagram.com/${raw.slice(1).replace(/^\/+|\/+$/g, "")}`;
  if (/^https?:\/\//i.test(raw)) return raw;
  if (/^www\./i.test(raw)) return `https://${raw}`;
  if (/^instagram\.com\//i.test(raw)) return `https://www.${raw}`;
  return `https://${raw}`;
}

function getInstagramUrl(artist) {
  if (!artist) return "";
  const directUrl = normalizeExternalUrl(artist.Instagram_URL);
  if (directUrl) return directUrl;
  const handle = String(artist.Instagram_Handle || "").trim().replace(/^@/, "");
  return handle ? `https://www.instagram.com/${handle}` : "";
}

function isDemoUploadReady() {
  return Boolean(DEMO_VIDEO_UPLOAD_URL && !DEMO_VIDEO_UPLOAD_URL.includes("REPLACE_WITH"));
}

function getDemoVideoUploadUrl(workshop) {
  if (!isDemoUploadReady()) return "#";
  try {
    const url = new URL(DEMO_VIDEO_UPLOAD_URL);
    if (workshop) {
      url.searchParams.set("workshop", workshop.Workshop_ID || workshop.Workshop_Title || "");
      url.searchParams.set("title", workshop.Workshop_Title || "");
      url.searchParams.set("artists", namesForWorkshop(workshop).join(" & "));
      url.searchParams.set("day", workshop.Day || "");
      url.searchParams.set("time", `${workshop.Start_Time || ""}-${workshop.End_Time || ""}`);
      url.searchParams.set("room", workshop.Room || "");
    }
    return url.toString();
  } catch (error) {
    return DEMO_VIDEO_UPLOAD_URL;
  }
}

function DemoVideoUploadButton({ workshop = null, compact = false }) {
  const ready = isDemoUploadReady();
  const uploadUrl = getDemoVideoUploadUrl(workshop);

  if (!ready) {
    return (
      <button
        type="button"
        disabled
        title="Upload link will be activated during the event"
        className={compact ? "rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs text-zinc-500" : "inline-flex cursor-not-allowed items-center justify-center rounded-full bg-[#80045d]/50 px-5 py-3 text-sm font-semibold text-white opacity-70"}
      >
        Upload Demo Video
      </button>
    );
  }

  return (
    <a
      href={uploadUrl}
      target="_blank"
      rel="noreferrer"
      className={compact ? "rounded-full border border-[#80045d]/30 bg-[#80045d]/20 px-3 py-2 text-xs text-pink-100 hover:bg-[#80045d]/30" : "inline-flex items-center justify-center rounded-full bg-[#80045d] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#96076d]"}
    >
      Upload Demo Video {icon("external")}
    </a>
  );
}

function openExternalUrl(event, url) {
  event?.preventDefault?.();
  event?.stopPropagation?.();
  const safeUrl = normalizeExternalUrl(url);
  if (!safeUrl) return;
  window.open(safeUrl, "_blank", "noopener,noreferrer");
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

  // Style badges are intentionally softer than level badges.
  // They should help dancers identify On1 / On2 quickly without competing with the level information.
  if (value === "on1") return "border border-cyan-300/35 bg-cyan-300/10 text-cyan-100";
  if (value === "on2") return "border border-violet-300/35 bg-violet-300/10 text-violet-100";
  return "border border-white/10 bg-white/5 text-zinc-300";
}

function getLevelBadgeStyle(level) {
  const value = (level || "").toLowerCase();

  // Level badges stay visually stronger because level is usually the most important decision point.
  if (value.includes("beginner")) return "border border-emerald-300/40 bg-emerald-400/18 text-emerald-100";
  if (value.includes("intermediate") && value.includes("advanced")) return "border border-amber-300/45 bg-amber-400/18 text-amber-100";
  if (value.includes("intermediate")) return "border border-lime-300/40 bg-lime-400/18 text-lime-100";
  if (value.includes("advanced+")) return "border border-fuchsia-300/45 bg-fuchsia-500/20 text-fuchsia-100";
  if (value.includes("advanced")) return "border border-orange-300/45 bg-orange-400/20 text-orange-100";
  return "border border-white/10 bg-white/5 text-zinc-300";
}

function Badge({ children, soft = false, category = false, style = false, level = false }) {
  const badgeStyle = level
    ? getLevelBadgeStyle(children)
    : style
      ? getStyleBadgeStyle(children)
      : category
        ? getCategoryStyle(children)
        : "bg-[#80045d]/30 text-pink-100 ring-1 ring-[#80045d]/40";

  return (
    <span
      className={soft ? "rounded-full bg-white/5 px-2.5 py-1 text-xs text-zinc-300" : `rounded-full px-2.5 py-1 text-xs font-medium ${badgeStyle}`}
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

function getLivePopularityStatus(workshop, capacityData = {}) {
  const live = capacityData?.[workshop.Workshop_ID];
  if (!live) return null;

  const saved = Number(live.current_saved || 0);
  const capacity = Number(live.room_capacity || getRoomCapacity(workshop) || 100);

  if (!saved || !capacity) return null;

  const ratio = saved / capacity;

  if (ratio >= 1) {
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

  return { label: "Plenty of space", shortLabel: "Plenty of space", saved, capacity, ratio, style: "border-emerald-400/30 bg-emerald-400/15 text-emerald-100", dot: "🟢" };
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
  "Tempodrom|Aletto": 8,
  "Tempodrom|Aletto Hotel": 8,
  "Tempodrom|Holiday Inn Express": 3,

  "Sporthall|Aletto": 5,
  "Sporthall|Aletto Hotel": 5,
  "Sporthall|Holiday Inn Express": 5,

  "Aletto|Holiday Inn Express": 8,
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


function SignupInfoTrigger() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={(e) => {
          e.stopPropagation();
          setOpen(true);
        }}
        className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-200 transition hover:bg-white/10"
      >
        Prior Sign Up Required
      </button>

      {open ? (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 p-3"
          onClick={() => setOpen(false)}
        >
          <div
            className="max-h-[82vh] w-full max-w-lg overflow-y-auto rounded-3xl border border-[#ff4fa3]/20 bg-[#12000d] p-5 text-white shadow-2xl sm:p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-3 text-[11px] uppercase tracking-[0.3em] text-[#ff4fa3] sm:text-xs">
              Workshop Sign-Up Info
            </div>

            <h2 className="text-xl font-bold leading-tight sm:text-2xl">
              Workshop Sign-Up – What You Need to Know 💡
            </h2>

            <div className="mt-4 space-y-3 text-sm leading-6 text-zinc-300">
              <p>
                Some workshops require prior sign-up — especially workshops in the smaller rooms.
              </p>

              <div className="space-y-1.5 rounded-2xl border border-white/10 bg-white/5 p-3">
                <div>✅ Managing the number of participants</div>
                <div>✅ Keeping a balanced leader/follower ratio</div>
                <div>→ helping create smooth, high-quality workshops for everyone</div>
              </div>

              <p>
                If your pass includes workshops, you will receive your personal sign-up link via Eventbrite 4 days before the event.
              </p>

              <div className="rounded-2xl border border-[#ff4fa3]/20 bg-[#2a0019] p-3">
                <div className="font-semibold text-white">
                  ⏰ Monday, August 24 — 10:00 AM (CEST)
                </div>
                <div className="mt-1.5 text-zinc-300">
                  Please check your inbox and spam folder carefully.
                </div>
              </div>

              <p>
                This allows you to plan ahead and secure your spots in your favorite workshops.
              </p>
            </div>

            <div className="sticky bottom-0 -mx-5 mt-4 bg-[#12000d] px-5 pb-1 pt-3 sm:-mx-6 sm:px-6">
              <button
                onClick={() => setOpen(false)}
                className="w-full rounded-2xl bg-[#a00064] px-5 py-3 font-medium text-white transition hover:bg-[#c10078]"
              >
                Got it
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

function WorkshopCard({ workshop, isFavorite, toggleFavorite, submitWorkshopRating, artistsByName, locationsByGroup, openDetails, openLocation, onShareWorkshop, capacityData, ratingsData, reminderSet = false, showReminder = false }) {
  const artists = namesForWorkshop(workshop);
  const location = locationsByGroup[workshop.Room_Group] || null;
  const status = getWorkshopStatus(workshop);
  const venueColor = getVenueColor(workshop.Room_Group);
  const popularity = null;
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
  const workshopRatings =
  ratingsData[workshop.Workshop_ID];

const averageRating =
  workshopRatings?.average_rating || 0;

const totalRatings =
  workshopRatings?.total_ratings || 0;
  const ratedWorkshops =
  JSON.parse(localStorage.getItem("ratedWorkshops") || "[]");

const hasRatedWorkshop =
  ratedWorkshops.includes(workshop.Workshop_ID);
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
              <Badge level>{workshop.Level || "All levels"}</Badge>
              {workshop.Signup_Required === "Yes" ? <SignupInfoTrigger /> : null}
              <div className="mt-3 w-full">
  <div className="mb-1 flex items-center justify-between text-[11px] text-zinc-300">
  <span>
    {capacityIcon} {capacityLabel}
  </span>

  <span>
  {capacityPercent}%
</span>
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
      {totalRatings > 0 ? (
  <div className="mt-2 flex items-center gap-2 text-sm text-yellow-300">
  <span>⭐</span>

  <span>
    {averageRating.toFixed(1)} / 5
  </span>

  <span className="text-zinc-400">
    ({totalRatings} ratings)
  </span>
</div>
) : null}
  <p className="mt-3 text-xs font-medium uppercase tracking-[0.18em] text-zinc-300">
  Rate this workshop
</p>
            
            <div className="mt-3 flex items-center gap-1">
  {[1, 2, 3, 4, 5].map((star) => (
    <button
  key={star}
  disabled={hasRatedWorkshop}
  onClick={() => submitWorkshopRating(workshop.Workshop_ID, star)}
  className={`text-xl transition ${
    hasRatedWorkshop
      ? "text-yellow-300 cursor-default"
      : "text-zinc-400 hover:scale-110 hover:text-yellow-300"
  }`}
>
  ☆
</button>
  ))}
</div>
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

        <div className="mt-4 rounded-2xl border border-[#80045d]/20 bg-[#80045d]/10 p-3 text-sm text-pink-50">
          <p className="mb-3 text-xs leading-5 text-pink-100/90">Recorded the final workshop demo? Share it with us for possible Instagram features.</p>
          <DemoVideoUploadButton workshop={workshop} compact />
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {artists.map((name) => {
            const artist = artistsByName[name];
            const instagramUrl = getInstagramUrl(artist);
            if (!instagramUrl) return null;
            return <a key={name} href={instagramUrl} onClick={(event) => openExternalUrl(event, instagramUrl)} target="_blank" rel="noreferrer" className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs text-zinc-200 hover:bg-[#80045d]/10">{artist.Instagram_Handle || name} {icon("external")}</a>;
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

function WorkshopDetailsModal({ workshop, onClose, artistsByName, locationsByGroup, isFavorite, toggleFavorite, favoriteWorkshops, openLocation, reminderSet, toggleReminder, onShareWorkshop, capacityData = {} }) {
  if (!workshop) return null;
  const artists = namesForWorkshop(workshop);
  const location = locationsByGroup[workshop.Room_Group] || null;
  const previousFavorite = getPreviousFavoriteWorkshop(workshop, favoriteWorkshops || []);
  const previousWalkTime = previousFavorite ? getWalkingTime(previousFavorite.Room_Group, workshop.Room_Group) : null;
  const popularity = getLivePopularityStatus(workshop, capacityData);
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
          <Badge level>{workshop.Level || "All levels"}</Badge>
          <PopularityBadge popularity={popularity} />
          <FullyBookedBadge visible={fullyBooked} />
          {workshop.Signup_Required === "Yes" ? <SignupInfoTrigger /> : null}
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
          <div className="mt-4 rounded-2xl border border-[#80045d]/25 bg-[#80045d]/15 p-4">
            <p className="text-[11px] uppercase tracking-[0.2em] text-pink-200">Share Your Demo Video</p>
            <p className="mt-2 leading-6 text-pink-50/90">
              Recorded the final demo? Send it to us and help us capture the magic of this workshop.
            </p>
            <div className="mt-4">
              <DemoVideoUploadButton workshop={workshop} />
            </div>
            <p className="mt-3 text-xs leading-5 text-zinc-400">
              Your video may be used for Berlin Salsacongress social media content.
            </p>
          </div>
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
            const instagramUrl = getInstagramUrl(artist);
            if (!instagramUrl) return null;
            return <a key={name} href={instagramUrl} onClick={(event) => openExternalUrl(event, instagramUrl)} target="_blank" rel="noreferrer" className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm text-zinc-200">{artist.Instagram_Handle || name} {icon("external")}</a>;
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
          {getInstagramUrl(artist) ? <a href={getInstagramUrl(artist)} onClick={(event) => openExternalUrl(event, getInstagramUrl(artist))} target="_blank" rel="noreferrer" className="rounded-full bg-[#80045d] px-5 py-3 text-sm font-semibold text-white">{artist.Instagram_Handle || "Instagram"} {icon("external")}</a> : null}
          <span className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm text-zinc-300">{artistWorkshops.length} workshops</span>
        </div>

        <div className="mt-6">
          <p className="mb-4 text-xs uppercase tracking-[0.2em] text-zinc-500">Workshops with {artist.Artist_Name}</p>
          {artistWorkshops.length ? (
            <div className="grid gap-3">
              {artistWorkshops.map((workshop) => (
                <WorkshopCard key={workshop.Workshop_ID} workshop={workshop} submitWorkshopRating={submitWorkshopRating} isFavorite={favorites.includes(workshop.Workshop_ID)} toggleFavorite={toggleFavorite} artistsByName={artistsByName} locationsByGroup={locationsByGroup} openDetails={openWorkshopDetails} openLocation={openLocation} onShareWorkshop={onShareWorkshop} />
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

        <div className="mt-4 flex flex-wrap items-center gap-3">
          <a
            href="/Tempodrom Map 2026.png"
            download="Berlin-Salsacongress-Tempodrom-Map-2026.png"
            className="inline-flex items-center justify-center rounded-full bg-[#a00073] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#c0008a]"
          >
            Download Tempodrom Map ↧
          </a>
          <a
            href="/Tempodrom Map 2026.png"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/10"
          >
            Open Map in New Tab ↗
          </a>
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
    const favicon = document.querySelector("link[rel='icon']") || document.createElement("link");
    favicon.rel = "icon";
    favicon.type = "image/png";
    favicon.href = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAefElEQVR4nG2ba6xt11Xff2PMudZ+nOf1vdfXzzhxEicxsaMQh6QJBAUSNaSFFFXhUVFVTVU+9AOtWqkq6kNCVRtVfEBtAQmpRQiptJQCFUGQNNDyCkkIYBI3xI65duzrx7XvPfee136steacox/GXPsctz1X2+f4nL3WXnPMMcb/P/5jTPm74dtMRDEMAEFQEaIIUiCYoqqEGAkxEEIkNIHQBGIMxBjrlWAiINCGCROd0GhEVSnBIBgi0DQRBDIZK4ViBTGIMSIhbO5VzEAEEEwMEQX1+4uKv4ISQkAI/vxiIMrZAxWGlDg5Oma1XDEMAzlncp9QDcQQiSFEcsmoKmZGKQVMSCIogklBrWC5IBIJqliGIoapkFJCQ0BUAUODog2E4MYSBdOMBEXEyGQQQUTQEKFPPPzxb+PkpQNe+OKThCZiCIIhIvVnQHCDjN8RMAMTvx/juuvV5t9jiMznc3LOlPGeBRQhxEBUFVLxiwtGsQIimInfUBTDP1jNIA8oSpCIDUY7mVSvUULjC9YgpDCAGqLjc2u9n0DdURMwMy6/7X5EhFKsbrIbyEQYl2bVCKJyZggDKxlRf04xX7jhXkV9rsl0RrFCzpn1kPxSMzAjDim7u2H1n7ufAKq62S1RwVTIUqp7JSihbogQmwaJWncITIwiGcXv4RvlRh2XJPVvEgLaBERqGNV7ju8fr/DfqXubsHnmUgwZn2tcnAiqAqoEM6bTGSUbVox16ch9IqdMTCWfu4lb3cx3wqpbWX2QgqEIpX54qL8LTUQ11Hj18Aj+FvdW84ey6glSF1lXSphEtImgZ3+z1260e4UqIqHeV+p2Wd3NzfL9ttVTpIZL1MhsOkXMoMA6F0rJxDReWQwP4xpJBrl6rNZYBPEHqKER2pbYThANZzss/lDF97d6k1tTDBDD6gLqzQltQ2jj6ONwzvgqwpm9znmCjcut4bF57jHOrb53NI4RNDBpp+zt+vXr9ZpoZ9mDYkZQ9WRaQyCbQTHa6LnAEFSVGBtiaDexXQAFxNxDipVqwIBstqdm9fqQ45dGRYJuXH/zbhlT2miEc55zfsPHxWPV2/zzA9XI1aUECKK0sWF3ZxdFiP/3zUQghoCVCk8h1h0URIPvEAHRBiRgohQTdy0bY7KgKgiFbAIoamf3Z1xkfXANgbQezrJQzeqjQeR8LDDGOOSU6YceqWGgIoQQqX8eTVfjqe5SMRQ3wvb2DtEwVBTMcdpKwUxoNBJQ1DzxBNQTkAhBHeJQj8NiGTUlW6HUnSulIoAV3/UCSqluDaiOEYw2kWbenoXxJlWOcKkI0PUDKWVKKaRhYLlc+K7GyLRtaduGnFJFE/V8YxWBSqHkjBXbIGkTo3vA6F41gRPFFx40+HcCUZoaw55QGg1OTmqCyyU7/ipQpMa6UgqgNUDMkGJQDSN40o2zhun+9uZeUmFXxMNNRUlp4OT4mH4YMDPSkGjbhul0yrQmt5wSeUiY4Ztk7p1KoYwGSBUtgm9sHCEpaEDMEPM3IxByIGiDSiAQERU0CDFGoqrvbHVJG4lYEV8rkIuBFqyoGwRDtGBFzniNCFphcLwPcua+Wo18eHjEcrmkFKNtGra3tpjPZzRNQ86Zvu/JQyINCTOj0QY1hWIOrcXJnOWClQKqoBBVpCaNtHHzbEYIykRnaFHnACJEDTUEFGVMnGziebyvx4HvdCnFY1gNre5nClJhN9TF63lKXSoYqIfA4eEhx0dHgDCbzdiab9G2LapCt17TDwN5GMiDYzsGRM8JOqYOg1IypRhWMpYHzArRzFCtLKoUsrjVsxmr1DEPM4+n4ERI4yY9b5KSY704kywgYm604oRIpVQ+AWLqHEGqkUJAg9cWZk5UZCQ5pXB6csrR4SE5ZZqmrZcESsmsVh1dtyYNiTwM1c2tZvuAIBQrZxuEkSkkKRvuEEEopRCkYjCO/5YzpmtEYCIT2thiMWMS6m0c8hCt9HNMX/6zlHGRgtXdNykEhZKdWWpldhoDGgNUKkv1yiEnbt0+YN11G/qqIZDSQN91rNYr1qs1aRgQoxZXxvbWNhp88WqOJwVIGL0YQy2wguBJ0CqWjsUH+M6JCkUyOSRKCASNNet7rhBRr+YY8fqsPnH0qXUF6h+oFR1GVKsG0qjOBP2DHbEsc3xyzGKxcFgVJTYRs8zi9JRuvabrOprYgAbW6zWpH5jNZsQQ6ucWSqWUGcgCudY2JhmkEEVwGlvyWbA4OHn1FCpJEae9/uBCqXTNzpbusFMruVKzoql45pdKXMUcJM44rifBOCZBp+UpZ05PFqxXa0SFpmnAzGO+GxCM/d09Tk9PWS4W9H2PIDSxcTI3LqXGqNU1UZmhU3KIuRREDDUjvCawxzTtesCYl+vWMpYeY32gaDWBVmPUqqzYpgJ0AxRMhVLUUUe1eoAboORMGQrrbs16tfaYNkNaD7XVau2VZwgcHNxiuTj1YixExpq2ZnUkOJs1qU83PopUZLAwhoCR6y7quX3U/w8FNYNspXqrl821eq85wY2k4l4wFixn+ObMEEr1ElzYiMETVvJMfnx0wtANCI46MQTW684NlDPdumM6mVByYTabMZtMSEPyZJczEhuvBmX8WEHNc1E+swTRixvH38JIh8Z0NrqP1wnZjCClagXCSPsq/yOIYuaG8+vzJgObgBbxPFvcb6xUDwgBiZ5PSp9YLleslkvPS0AIkaEfGPqenBJd1yECQzcmHUeMGM4ot2otmzlngGp6xRHBxlpg5M7jzo8GGcvk7HTOK6tSvCIUx2k9i5fXGC5TyIw1pNX/WmWJ9X2lbOStECM5F1bLFYdHR+RhVJr8rkPvDLDv+8r7lZzdb2dt659figsyCDEEJ1Hn1CLbGGBEKyPuli0KhUwmUzz71zWZQSoZKa7eUAJBAqp1YTW+RcfM7eWnVaC0DaaMG+HwVutkLLuENibaPg2cnp6Ski9WTInB+T0Cw5CYTKaoKkPfE0TQAMMwEFSdoGkgNtE1xnOVpYdh2eQnzLlAvHvvEiVmSh5YrzpO+o6BPGY4KEbOzuYy4gVQAZWAaI3rMubGsyUbvtl6TqsYeQPFQG0TAlKhsO8HhmFANVAoGyY4DNkFjmJM51O2t7bJtTawnOvafDM0BCbTqS9+zDujR9dw8dCqHsBdESEScsPW0NDejBwuV2QrztzqKixXiLJS1RaHElWtmf9s4WevCnmMiU9qyezWKcWJDTgUjhAoKqgGQnRuYMUQE4JEFGW1XLFar8hDIoZQ98lzwNb2NrGJZKsUfNQ66n2wiir1FcuYKABoaPaM+bqwLM6VzYB8/qLKYBUiSsRjzUQpaiQypbr/mF/sXByMAoxRSVFdZDNra5gBQb2a01BJUEAyBIl0q54h9RtVORUvfyeTlnZrjjSRLiU3qgan5TYWbfUBNi+jqgfnnjAqTQiEXJNYOUtxeu4VCEQLhFHYVPeWLF7seMxrvbYWXF4oVsO4DtCvOj7zY/+Jft0z3d5icbhEm9p/UIUhMYmRUjJGYRh6QggMOTGkhARhOp0y354jMbIaBlS9lJdSvCAas+DGFXwTvRawUWapO5PASi1DCWcCwkiDznmBBM8RGwPW5DjCo1Q9TziD0k1WFKMMha0799m//04MY/+J51jcXBJab6ioORVvpSHHnmV3imkk5eTNmiYS24bJdAIhOOhaqTqE1x2GblBuzANWuRIjDPr2FEgZO84M2YlOIDBq7GKyKY2lgFG8JDJHAXDoK1KVIHQs/6q+bxSxyvWdF/Trnr3XXeY9n/gwAM987kluPHWdZjohEDyBxuIS1nxOPuqwPmMiaGwh6FlTRpRyjq2qiEt1SNWh5DwQbIwRudUhTYAM5bSwWA0M1U+Cp0fEBCkuhlBJkBOjDEU2O5wpZB2xvkptjDEvlX64ixQKXUqklDfRJ6I0zYRZu0204ITJCsUcBebzXQ+b1JHMkBBqM0arwFFlfWpjR9zrdKR3IyEdPcEg5puRopneBtZloEiu8CA0BFr1uhoDKcF5PEIuhZ7knKDkysLd0iKhMuJyDoutfmimWCaZ09njG4e8+MQ3EBH6xUDDhC3dQVEyA8UGConMQGxnzNuWCYlkmWwu6o8Su4kbuozUa9x4Ow+DlaqNYfwP9OM2sKo06MyJtpmwFeIGpii11KlQZCgrTay1r4qPv7xzEzaipNuu1gXF5baUE4XMhQcucceb7iS0kYlOmDLHbhbkyG83lI6hdGRzA2QSqQzeWFUvtgpn8Oy1h4ejokTEyVKFoRHVxqoTIBrDhs6muocTIo3optuDAK1iWm8izgK3UkMuxjr0qFUeThU+a/k8NlxzKQx5IOWEmRvhWz/6GI9+97c4dxelDROe+eUnufaZp2m3W4xIsdrUpKBixOCydi6JUmvqUvLIb5zeGIh4vVE2VNDhcEz6o1fHOROMhp6e0c6Cd2Q2KVvEpZNo3upuXHFlaczXDevSY2ob/CvFwHKtI5xJWi2mzMBUGXLiwv2Xecu3PsL5r+c/+wzdsqOdRUJQT7wbKjk+uLF/90VObx/TrzsvzWtWLzXFF3NI9vykZzScs64SgDZEGiKBQENLqJ2eXFnZpvAPBjOFC1PKbkO5ELFLSphALIFSwDIMXaZbdaxXHX03UPqMZEGLS+tNaGlCS9CGks89Sf1arVacrlas1n0VWYO3zSw7BFc6/Mj3vhcVpeRyxvZqiJVyJqxkO9P/RjD3Ur/+8+TlNCfUXxrCYIWhup/3uAzmDdSckHOhREO2vQWVU6bvBlKfKRkoIMUjsQ0TJs0ExcXXJjYIuonD1xhg6Dg6OWHVday6AYmBvXv3aOcNPjMAaT3wR//ht+hOV5Tsbe+cC6lknwMYDWGFcQ/Lpv47g0RgNECpHlYXT6ajsCqZRR7Ig0BXL8rZOUMp3mKW5GVylgqJ1bISaWPLfDqnbSaUZFiGnIzUJae4Y4I995VI3Frc5mh5yqpf0/drTl+6zaWH7j6DslxIqzWTaeQj/+wH2L28Sxo6cknkmm9K3fmxLimjBlBpcanLiZGm5lLH8YGEA+FAwllftoYLXYN1AzT1oQ3IhdwPWI5EaWry8eTZNE2lo8rQJ9Sid2GAoJEYOl65+jJ/9ptfIudEbBtibDi8fkAnHQdHB0jIaJgw08irX7nGfY+9iRf++GksFxQXSq994WusbhwiKROCM8CCkAmIFsS8ig1SVedNleIZLkoVPwcSKzp6XzaFzFDtt5CBdrjE1pFgu4lNX6BkbNFgqSGKzxRMG6GJEbRlOWS6vkNM2ZrPyRSWqxVmxmy2xbNfeBqdKFt3bnP1C09x9OwhwQJxGlh1pxzeHpjv30VRD8+bT1zj/ne/iWtf/BpmQr/oeeo3/4TZHTtcefuDPPf404gU1kNPstpa33B8D9VyxsXHEFB6BlZ0rOldPmZUdLwgGsgcyCnpdIIcRlgarAocRVhtEWlpLbA1HZjtdkx21rTtMTMGMNlMmjRtw8W7L3HXm+/hjnsvIRnufuN9fOwf/QDDque5J67y8tdfdBYZIOxEXn3xZZIWYmyRARYv3OLiA3d5q858YOKtH34XD3/nt9DajDZMmE3mYNT4P8dS63pK5SUFQ3t61vT09NX1PYqlviKRhoaBgePSkU6ncHsLbm/DYgexBrVA0w4w6ylBICgWC6FdMZWIWKDrOgZN7DywT4nG3n0XKEPhofc/zDN/+jTP/MnXabZbtBFIBZLx8X//CR75/vfw6tXrNNsTgirdwYJ2e7YpaTU0PPlrj/OHP/Fp9i5eomknRG1pm+mmA51xITSLbQxRxL/rMcesWNNvpM0NQNAQiPWlKIlMRyaXAKVh1PlEDGkTpsKQB/rBdTvTRBPAsnD57fdw4e2X6ZoO3VUkChfecInP/tSn+Km/8UlKV3wCTYwf+MlP8OYPvo0v/sLv8j3/+m/y0Ece5dVvvIRuR1Lfc/TcDR788KPeZisTSoKLb72L7/rxHyTuzTldLAAhhhZTrflZNmiQsY2ny9/SD1naCJhhwwrG+n/MdyDMmDJjRktDrH4y3jRuL2B7qD2oTEAJJqTTOxjmMy6/7U5WukJ3lNnujFsvHnDPN93PH//qH5L7RDtp6Rc9j/zld/FXf/TjzPfnTLdn7F7ZZ3n7lJ/96L+kRZlOW9IqkSh0y56SA6WFHI3jbsHBqweICltbW0xnc2+lS8KwsyGNKowUMzR7J5CGhgktTVV5fIlhQxxGbzAyiaGKqJmBgWQFusg53ul43BuWA/e88z7CJDLdnhLbwCvPv8w9j9zP8088y3f88HcR2wYNgXd85N3sbO/wlV/5Enfcd5ndK/sAzC9s876//1FevXad49sntcLzdpo10NvAwY0DZDvynh/8diQosWlwCVPqc0Oq7u8cJzHkhPyQftBAaZgAPgwxoa0+4OighLrrVb/DgICgVUBVdmlhfghNZWaDwXpCnN3D5fffR991NHe23Lh+nd179lkeLdi5uMf6cMXl11/hqd/+33zzx97LWz/4CA++9yGmu7PX8IP1yZJ/+23/mHLUs7W7w3Q6pSCsU+K0W3Lj9gF9Htje3qZtWibtZKNIAb5gS2TzEjwNib7riQ3tJtkJyoQJM1yQEFzjO+uyn83iFTLpHG+YMaNdbWH92t9bApQdUsQXv9NyevuYnct7lL7Qziak9cDelX2OXr5Nd9SRlomdS7s887mnuPSmK+zetc90xw0x3Zlz/3vewhP/7fNI2zDU7k9nidP1gi51bO1s8Y4PPcbptRNuP39jI9QIPjHSWKQrPVnW9KnnZHGCTpgyvqZM6u6HDQ40BKa0GwN5cozMaJjTMqMFCiecYraNpAtI2kfKHQy0cFmwqVFCBjWm8xnr4xW7F/cYuoGtC9uUXAimvPG9D/HKUy/zOz/xaT71T36Rq7/3tTMtD7j3nW9kse5Ydh2nXcfxasVivWLVrZ39pcLzX7jKyYu3aEJwjUR9xihqIGpgIi0xK926Y8gDcVxYrKlvTICl5gb/u8dcQWgQNGTH6lJoSqBhm5scc4PCDrtEWnoGjjnk/iuv9+7tYcc933Q/Lz11jXu/6XW8cvUl7nv763nmj57i0Q89Rj5MPPj+h7jwuks8/JF3UHLh4PlXGfqBr/zGl+gWPfNLeyxzwdYrNHUEVXLJdKmvOaeQVj3a+oSLqg+Bp2EglcyqW7NerlgsFqyHJbv7O84Ez3Z87Jp5/I910/hzg6DNAG3xKqKA9Zl2aNliygFHnHJKQEkkTIyjm7e5eN9lrrz+bl74s2/wpve/lWcef5rXvfMN/MUXn+S9H/8Av/tTn+HDP/I9XHjdpZr0tgA4evUWN555mZeffJFf/bFf4K0fepQUCyfdKSRvgVFcD5hOZ6gF1ssVQYUYJwx9z+3DQ58SL9khuuspybjz0iVkFtHzBeKm8h31fmBU+o2MSoJZgj2BOwJcUGy3QNszrchhFFxVzAxlYLVcMgwdzz/xDPe98/U88enHecM3v5mv//6f874f+iCf+vH/yvd+8od44WvP0S3WpG44c/mHHyCnzG//zG9AIzz+2T9indcsuyWL5YLjxQknyxNSSjRNw/Z8i1J8drBbr7l54wb9ek3J2QeouoGSCpcuXGJnuoOUM6gfwYtEIpHP/cYTXbEEcYD9BvYmMJ/A9oTZ/XvEKw0qFfs3oprTpNT3EODK2+7hpSev8b5PfJAnfutPefS7HuPXPvlf+Ng//0F+7kd+kje89838u+/9V3zy23+Ug+dvbAjI7//8b3N0cAiNoa0wFCdafd/TDz1DdgZTijGZTZjP5ojB6empkzTFR2rWHWUo7O/ts7u3synNddQCc83nXhStWUtPkkLPQIfP6DChagKuwEoTuPPhB5hf2aGEvg6GnTXKRJTTmyec3jphcXBCO2t47vGr7N13gWtPPsuD734LT3/uz3nz+x/mq//zy0ijPPPlp/nG41cBOLx+iz/8xf9FkcylN1whtN7w1NpzGL9nMn0anNoGJaXEMAxgMPSJbt1RSmFne4eL+xeJtbeQS0YHegb6jSg6ds4TicF6so8UOeer87wj4bFcuPYnT5OHRGk8aW4WjzdXLBWWr5xCB/N2m+MXDrnyhnt4+Wsv8fYPvZOrX3qax777fTz1B1/lvkcfIFlidboE4KkvfJXTwxMuPnAnW3dsM3QDsQqu3g2OPrqHUErm4Og2r96+yfHJ8cZL1uuOnIz5bJv5fAsE+r4nlcQwJHTs5ZXXdPTY9O/G/ylSIAn0GVKGIVNWPVcevJcH3v1mlqv15g4CqAlahKCRfjlw/cmX6LuOKA3rwxX7d97B//jpT/Guv/6X+M//4mf5zr/3UT7z07/GkAau/vGTHF6/xed/6XfqAQ649tVv+GmU2gL3Iy+hDngqecgcHR+yWK8ZUqLvB5aLJTlntuZzny2MLalLdKmny4PPFf2d+FeMAqFSX8f+kec701eEiURmIcI+sBM2FrJ1TzMLlJ0LPPflZ2uHpjDdmhHahtPbp1y8/05Ob56wfXGX/XvvwBrIJRO3GnRSoapPnLx8xEtPvsDF+y7TTBuuX32R0MbNcDRiG82P6mXjLHAIumnvSQYbEirCfDZna2tO07ZVNocuDyy6JX3uidpEb3KkhFohEDYLBzZFT7bMkALNLUGWCabuGcujJY/90++jT5mrf/Z1ovgH7d1zBzuX9njqc1/l+KVDLtx3idsvHiCtErcjcaellQnrgzWT3SlpmZjuziHD4Yu3QPDzQ3ZOw7E66jK25jfCDD6XaG7YYRiIEpnMpky3ZzTTKUNyLpCtsFqvWfcrnyP4xOyvuV3qlKb34iGYEFDaWhaHkVJSJXGMQQZWNpDU6HPPzuV9Tm+fVjk8c/nBu9na3+GZP32a3f194qzh4OWbtHtT7nr4Xrqjjp0LO5Tk3hRi4OTghJsvvuKDEo3PJmymPeuXIBsBd1Q+zCCnxJAzGpTZdMZ0MmEymRCbSEqJVDJd17FcLZhOJuzt7qJFfCzGFM/sQV4zYOReNc79QMfAqaw5khULepJkhtzxlg88wt/++X9Iu91uhihu3ThgOazYuXefm4c3OF6d0FyacHR0xPNffpaUB04OT1gfrUnHicUrC3Yu7NLQkvvs0no/+JLl7GnGpgaw6T/mnEg5EVSZTiZI8PH9PieW3Yr10LFYLlgsFzQxsr21zXQyJQ4y+FR17aroa6iBVYXQ87vI2ckyO5c6RYRrTzzDz33iJzg9PPYqQgLLkwVb6zVxp0G2AodHt5nuzAnTwLpb8dAHHubiXZcZjntCiMwvbPH8V77BX3zxqTqvnBj6xJCGOvfjI/o6jubZKHL7prVN4zmoFPLQk5IQsmsBKQ0+Yt80vvDoZw1jV4ZNmXsmIY6HpMDEp8NC0Drdaa6uFmrn1lvdi9snJDLv+ti3IkH54q/8PkEjLz19jQfe8UZ2L+5x0N9kfbIEEUpJvOM738X7v/87vLkhPtr26//ml/n8L/1uba25oSniklpSps2EEMNmg6AWPNo4Wpn5BLu5NJ76XHuCRoyBpoloUO9u54xOrWXOhDmtHzqwKnSYt8myGjIJWKuUKNAI2ija6ObEiGGgXkvsXNrn+JVDN2AxGm159stXaaYtd73xXrRxBCkUcp1DGOENwIqdg9Oxz+Axb7nQrTu69dofnrNDHj65Ug9Y6DivZBsvCfWU62bs1wpDTsSZthQKsQSECQtZ+yRobVhqG7AoDJTaE/aJUFEfY6M2JkGI2vB7//HTFGA2nzPZm3Pr+i0abXj16nV27txl/8oFbl57lUwhtP9vY0QbIZOoQ6wbQYNzDS3LxpB7SnV7Pz7rC3Y26iMyuLP6yEwdphjHfnPxVn0U9RMtubbG1YSueEcghkiJRgrOBVyKqghhStM0rrmlsU/vI619Gnj3932A5eEpX/jvf4BqwKxw8uox2fyYbmstn/2ZX6c/7rjz9Xdh2bj+9Et8/hd/jyi+eK09i5FcBalzinW5lMKw7siqfg64iXUybDwXVAc1VGq7nk0rvc52ID+8/THzkxSOrYu0YlU6ACbTCdPptF4sBJM6GSZsojAXUj2MpPjIWjaj2ZqwPFn6AQXLtU/nhDtYQM1HZWPVnR1l/NwR6lR8zAFjgd6EhiC1W2yG1VH9zYIremlQCMEPRlBPk2mo6OYnSscDYDGXvGkiptLTl6FK3T68SGDTZ2MUykTrvA9oDDTB9UEKtQ0OaZn8ZJnkSlB80xpriBZriAWiNd6+kkzBzyP09LUmGSc7RwI0nlM6+52MUFjjOqUBS9SWfvCYD4KWcm5SxIe1RYQ40sNsmW6cvsCHFT3zj5S4eh1WJ0K1zvHW8RnTehrMjRAb8dld81NfihLNaK2hISLFObyfODvrTp4tfMwA45SaJ0hvd9VzweOgtHnra2SM41nBNCRKwvsNUb1lZ+JnI6rx/g/Wpb5Cai8LcwAAAABJRU5ErkJggg==";
    document.head.appendChild(favicon);
  }, []);

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
  async function loadRatingsData() {
  const { data, error } = await supabase
    .from("workshop_ratings")
    .select("*");

  if (error) {
    console.log("LOAD RATINGS ERROR:", error);
    return;
  }

  const groupedRatings = {};

  data.forEach((item) => {
    if (!groupedRatings[item.workshop_id]) {
      groupedRatings[item.workshop_id] = {
        total: 0,
        count: 0,
      };
    }

    groupedRatings[item.workshop_id].total += item.rating;
    groupedRatings[item.workshop_id].count += 1;
  });

  const mappedRatings = {};

  Object.entries(groupedRatings).forEach(([workshopId, values]) => {
    mappedRatings[workshopId] = {
      average_rating: values.total / values.count,
      total_ratings: values.count,
    };
  });

  setRatingsData(mappedRatings);

  console.log("RATINGS DATA:", mappedRatings);
}

loadRatingsData();
  const capacityChannel = supabase
    .channel("workshop-capacity-live")
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "workshop_capacity",
      },
      (payload) => {
        console.log("REALTIME CAPACITY UPDATE:", payload);

        const updatedItem = payload.new;

        if (!updatedItem?.workshop_id) return;

        setCapacityData((current) => ({
          ...current,
          [updatedItem.workshop_id]: updatedItem,
        }));
      }
    )
    .subscribe();
const ratingsChannel = supabase
  .channel("workshop-ratings-live")
  .on(
    "postgres_changes",
    {
      event: "*",
      schema: "public",
      table: "workshop_ratings",
    },
    () => {
      loadRatingsData();
    }
  )
  .subscribe();
  return () => {
  supabase.removeChannel(capacityChannel);
  supabase.removeChannel(ratingsChannel);
};
}, []);
  const [activeTab, setActiveTab] = useState("today");
  const [workshops, setWorkshops] = useState(fallbackWorkshops);
  const [artists, setArtists] = useState(fallbackArtists);
  const [locations, setLocations] = useState(fallbackLocations);
  const [capacityData, setCapacityData] = useState({});
  const [ratingsData, setRatingsData] = useState({});
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
  capacityData[id]?.current_saved || 0;
  const roomCapacity =
  capacityData[id]?.room_capacity || 100;
  const newCapacity =
    alreadyFavorite
      ? Math.max(currentCapacity - 1, 0)
      : currentCapacity + 1;
    setCapacityData((current) => ({
  ...current,
  [id]: {
    ...current[id],
    workshop_id: id,
    current_saved: newCapacity,
    room_capacity: roomCapacity,
  },
}));

  const { error } = await supabase
  .from("workshop_capacity")
  .upsert(
    {
      workshop_id: id,
      current_saved: newCapacity,
      room_capacity: roomCapacity,
    },
    {
      onConflict: "workshop_id",
    }
  );

  console.log("CAPACITY UPDATE:", newCapacity);
  console.log("CAPACITY ERROR:", error);
}
async function submitWorkshopRating(workshopId, rating) {
  
  const ratedWorkshops =
  JSON.parse(localStorage.getItem("ratedWorkshops") || "[]");

if (ratedWorkshops.includes(workshopId)) {
  return;
}
  const { error } = await supabase
    .from("workshop_ratings")
    .insert({
      workshop_id: workshopId,
      rating,
    });

  console.log("RATING SUBMITTED:", workshopId, rating);
  console.log("RATING ERROR:", error);
  if (!error) {
  localStorage.setItem(
    "ratedWorkshops",
    JSON.stringify([...ratedWorkshops, workshopId])
  );
}
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
                        submitWorkshopRating={submitWorkshopRating}
                        ratingsData={ratingsData}
                        isFavorite={favorites.includes(workshop.Workshop_ID)}
                        toggleFavorite={toggleFavorite}
                        artistsByName={artistsByName}
                        locationsByGroup={locationsByGroup}
                        openDetails={setSelectedWorkshop}
                        openLocation={openLocationFromWorkshop}
                        onShareWorkshop={handleShareWorkshop}
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
              Your smart companion for the workshop day. Save favorites, check live capacity, rate workshops, and move smoothly between venues.
            </Hero>
            <div className="mt-5 rounded-[28px] border border-[#80045d]/30 bg-gradient-to-br from-[#80045d]/20 via-black to-[#194d2d]/20 p-5">
              <p className="text-[11px] uppercase tracking-[0.2em] text-pink-200">Install the App</p>
              <h3 className="mt-2 text-xl font-bold text-white">Add BSC Companion to your Home Screen</h3>
              <p className="mt-2 text-sm leading-6 text-zinc-300">
                For quick access during the congress weekend, install this app on your phone — no need to remember the URL.
              </p>
              <div className="mt-4 grid gap-3 text-sm text-zinc-300 md:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-black/30 p-4">🍎 <span className="font-semibold text-white">iPhone:</span> Safari → Share → Add to Home Screen</div>
                <div className="rounded-2xl border border-white/10 bg-black/30 p-4">🤖 <span className="font-semibold text-white">Android:</span> Chrome → ⋮ → Add to Home Screen</div>
              </div>
            </div>
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
                      {getInstagramUrl(artist) ? <a href={getInstagramUrl(artist)} onClick={(event) => openExternalUrl(event, getInstagramUrl(artist))} target="_blank" rel="noreferrer" className="rounded-full bg-[#80045d] px-4 py-2 text-sm font-medium text-white">{artist.Instagram_Handle || "Instagram"} {icon("external")}</a> : null}
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
            <Hero eyebrow="One Family" title="Berlin Salsacongress 2026">Your smart congress companion for the weekend. Build your personal schedule, check live workshop capacity, rate workshops, explore artists and enjoy the magic of social dancing together.</Hero>

            <WeatherCard weather={weather} loading={weatherLoading} error={weatherError} />
            <div className="mt-5 rounded-[30px] border border-[#80045d]/30 bg-gradient-to-br from-[#80045d]/20 via-black to-[#194d2d]/20 p-6">
              <p className="text-[11px] uppercase tracking-[0.2em] text-pink-200">Install the App</p>
              <h3 className="mt-2 text-2xl font-bold text-white">Add BSC Companion to Your Home Screen</h3>
              <p className="mt-3 text-sm leading-6 text-zinc-300">
                For the best experience during Berlin Salsacongress, add the app to your phone’s Home Screen. This gives you fast access to your schedule, favorites, maps, capacity hints and event updates without searching for the link again.
              </p>
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <div className="rounded-3xl border border-white/10 bg-black/30 p-5">
                  <p className="text-[11px] uppercase tracking-[0.2em] text-zinc-500">iPhone</p>
                  <h4 className="mt-2 text-lg font-bold text-white">Use Safari</h4>
                  <p className="mt-3 text-sm leading-6 text-zinc-300">Open the app in Safari, tap the Share icon and choose “Add to Home Screen”.</p>
                </div>
                <div className="rounded-3xl border border-white/10 bg-black/30 p-5">
                  <p className="text-[11px] uppercase tracking-[0.2em] text-zinc-500">Android</p>
                  <h4 className="mt-2 text-lg font-bold text-white">Use Chrome</h4>
                  <p className="mt-3 text-sm leading-6 text-zinc-300">Open the app in Chrome, tap the three-dot menu and choose “Add to Home Screen” or “Install App”.</p>
                </div>
              </div>
            </div>

            <div className="mt-6 grid gap-5 md:grid-cols-2">
              <div className="rounded-[30px] border border-white/10 bg-white/[0.03] p-6">
                <p className="text-[11px] uppercase tracking-[0.2em] text-zinc-500">Features</p>
                <h3 className="mt-2 text-2xl font-bold text-white">What the app offers</h3>
                <ul className="mt-4 space-y-3 text-sm leading-6 text-zinc-400">
                  <li>• Personal workshop schedule with favorites</li>
                  <li>• Live workshop capacity updates</li>
                  <li>• Real-time workshop ratings</li>
                  <li>• Smart venue navigation with Google Maps</li>
                  <li>• Walking time overview between venues</li>
                  <li>• Artist discovery and workshop exploration</li>
                  <li>• Shareable workshop and story features</li>
                </ul>
              </div>

              <div className="rounded-[30px] border border-white/10 bg-white/[0.03] p-6">
                <p className="text-[11px] uppercase tracking-[0.2em] text-zinc-500">How it works</p>
                <h3 className="mt-2 text-2xl font-bold text-white">Built for social dancers</h3>
                <p className="mt-4 text-sm leading-6 text-zinc-400">
                  Plan your congress weekend smoothly with live workshop information, smart scheduling tools, and fast venue navigation designed for social dancers.
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-zinc-300">Live Capacity</span>
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-zinc-300">Workshop Ratings</span>
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


            <div className="mt-5 rounded-[30px] border border-[#25D366]/25 bg-gradient-to-br from-[#25D366]/15 via-black to-[#80045d]/15 p-6">
              <p className="text-[11px] uppercase tracking-[0.2em] text-[#9cf0bf]">Need Help?</p>
              <h3 className="mt-2 text-2xl font-bold text-white">We Are Here for You</h3>
              <p className="mt-3 text-sm leading-6 text-zinc-300">
                Berlin Salsacongress is committed to creating a respectful, welcoming and safer space for everybody. If you experience harassment, inappropriate behavior, discrimination, consent violations or if you feel unsafe in any situation, please contact us immediately.
              </p>
              <p className="mt-3 text-sm leading-6 text-zinc-400">
                You can reach our team directly via WhatsApp. During the event, the registration desk is also staffed almost continuously. You can also approach our team leads Sarah or Emma there at any time.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <a
                  href="https://wa.me/4915223878424"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-full bg-[#25D366] px-5 py-3 text-sm font-semibold text-black transition hover:opacity-90"
                >
                  Contact Us on WhatsApp {icon("external")}
                </a>
              </div>
              <p className="mt-3 text-xs leading-5 text-zinc-500">
                In urgent situations, please also approach any Berlin Salsacongress staff member directly.
              </p>
            </div>


            <div className="mt-5 rounded-[30px] border border-[#80045d]/30 bg-gradient-to-br from-[#80045d]/20 via-black to-amber-300/10 p-6">
              <p className="text-[11px] uppercase tracking-[0.2em] text-pink-200">Share Your Workshop Demo Videos</p>
              <h3 className="mt-2 text-2xl font-bold text-white">Help Us Capture the Magic</h3>
              <p className="mt-3 text-sm leading-6 text-zinc-300">
                Did you record the final demo at the end of a workshop? We would love to receive your videos and use some of them for Berlin Salsacongress Instagram Reels, Stories and future event memories.
              </p>
              <p className="mt-3 text-sm leading-6 text-zinc-400">
                Please only upload videos of final workshop demos, not recordings from the teaching part of the class. By sending us your video, you allow Berlin Salsacongress to use it for social media and promotional content.
              </p>
              <div className="mt-5">
                <DemoVideoUploadButton />
              </div>
              <p className="mt-3 text-xs leading-5 text-zinc-500">
                The upload link is prepared here and can be connected to your Google Drive, Dropbox, Uploadcare or another upload form before the event.
              </p>
            </div>

            <div className="mt-5 rounded-[30px] border border-[#80045d]/30 bg-gradient-to-br from-[#80045d]/25 via-black to-[#194d2d]/20 p-6">
              <p className="text-[11px] uppercase tracking-[0.2em] text-pink-200">Berlin Salsacongress 2027</p>
              <h3 className="mt-2 text-2xl font-bold text-white">Secure Your Next One Family Weekend</h3>
              <p className="mt-3 text-sm leading-6 text-zinc-300">
                Already dreaming about the next edition? During the congress weekend, you will be able to secure your Berlin Salsacongress 2027 ticket directly here in the app.
              </p>
              <p className="mt-3 text-sm leading-6 text-zinc-400">
                Be among the first to grab one of the limited early tickets and keep the magic going for another unforgettable weekend in Berlin.
              </p>

              <a
                href="#"
                onClick={(event) => event.preventDefault()}
                aria-disabled="true"
                className="mt-5 inline-flex cursor-not-allowed items-center justify-center rounded-full bg-[#80045d]/60 px-5 py-3 text-sm font-semibold text-white opacity-80"
              >
                Get Your BSC 2027 Ticket {icon("external")}
              </a>
              <p className="mt-3 text-xs leading-5 text-zinc-500">
                This button is already prepared and will be activated during Berlin Salsacongress 2026.
              </p>
            </div>



            <div className="mt-5 rounded-[30px] border border-red-400/25 bg-gradient-to-br from-red-500/15 via-black to-[#80045d]/15 p-6">
              <p className="text-[11px] uppercase tracking-[0.2em] text-red-200">Workshop Sign-Up</p>
              <h3 className="mt-2 text-2xl font-bold text-white">Prior Sign-Up Required?</h3>
              <p className="mt-3 text-sm leading-6 text-zinc-300">
                Some workshops take place in smaller rooms and require prior sign-up. This helps us manage capacity, keep a better leader/follower balance and create smoother, high-quality workshops for everyone.
              </p>
              <p className="mt-3 text-sm leading-6 text-zinc-400">
                If your pass includes workshops, you will receive your personal sign-up link via Eventbrite 4 days before the event. Please check your inbox and spam folder carefully.
              </p>
              <div className="mt-5 rounded-2xl border border-red-400/20 bg-black/30 p-4 text-sm leading-6 text-zinc-300">
                <span className="font-semibold text-white">⏰ Sign-up email:</span> Monday, August 24 at 10:00 AM (CEST)
              </div>
              <div className="mt-5">
                <SignupInfoTrigger />
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

      <WorkshopDetailsModal workshop={selectedWorkshop} onClose={() => setSelectedWorkshop(null)} artistsByName={artistsByName} locationsByGroup={locationsByGroup} isFavorite={selectedWorkshop ? favorites.includes(selectedWorkshop.Workshop_ID) : false} toggleFavorite={toggleFavorite} favoriteWorkshops={favoriteWorkshops} openLocation={openLocationFromWorkshop} reminderSet={selectedWorkshop ? reminders.includes(selectedWorkshop.Workshop_ID) : false} toggleReminder={toggleReminder} onShareWorkshop={handleShareWorkshop} capacityData={capacityData} />

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
