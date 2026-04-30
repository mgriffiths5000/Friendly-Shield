import { useState, useRef, useEffect } from "react";

// ─── BRAND ────────────────────────────────────────────────────────────────────
const G = "#1E824C", GD = "#155f37", GL = "#eaf5ee";
const BHH_LOGO_URI = "data:image/png;base64,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";
const GOLD_C = "#B8860B", GOLD_BG = "#FFF9E6";
const SILVER_C = "#6B7280", SILVER_BG = "#F3F4F6";
const BRONZE_C = "#92400E", BRONZE_BG = "#FEF3E2";
const TEAL = "#3B8B92", TEAL_BG = "#E8F5F6";

// ─── PRICING ──────────────────────────────────────────────────────────────────
const PRICING = {
  under30: { Bronze: { AO: 10, IA: 18 }, Silver: { AO: 16, IA: 25 }, Gold: { AO: 21, IA: 32 } },
  "31-40": { Bronze: { AO: 13, IA: 20 }, Silver: { AO: 19, IA: 29 }, Gold: { AO: 24, IA: 38 } },
  "41-50": { Bronze: { AO: 15, IA: 24 }, Silver: { AO: 22, IA: 37 }, Gold: { AO: 29, IA: 50 } },
  "51-60": { Bronze: { AO: 20, IA: 34 }, Silver: { AO: 30, IA: 53 }, Gold: { AO: 40, IA: 72 } },
};
const BAND_LABELS = { under30: "Under 31", "31-40": "31-40", "41-50": "41-50", "51-60": "51-60" };

function getAgeBand(age) {
  const n = parseInt(age, 10);
  if (isNaN(n) || n < 18) return "under18";
  if (n > 60) return "over60";
  if (n <= 30) return "under30";
  if (n <= 40) return "31-40";
  if (n <= 50) return "41-50";
  return "51-60";
}

// ─── OCCUPATIONS ──────────────────────────────────────────────────────────────
const OCCUPATIONS = [
  "Abattoir Inspector","Account Executive","Accountant","Actuary","Acupuncturist",
  "Administration Manager","Advertising Manager","Aerobics Instructor","Agricultural Engineer",
  "Agricultural Worker","Air Traffic Controller","Airline Cabin Staff","Airline Pilot",
  "Ambulance Driver","Anaesthetist","Animal Trainer or Keeper","Antique Dealer","Architect",
  "Art Director","Art Gallery Curator","Artist","Auctioneer","Auditor","Author",
  "Bar Manager","Bar Staff","Barista","Barrister","Beauty Therapist","Benefits Adviser",
  "Biochemist","Biomedical Engineer","Bookkeeper","Border Force Officer","Brand Manager",
  "Builder","Building Inspector","Building Surveyor","Bus Driver","Business Analyst",
  "Business Development Manager","Butcher","CAD Designer","Call Centre Manager",
  "Call Centre Worker","Care Co-ordinator","Care Home Manager","Career Coach","Carer",
  "Caretaker","Carpenter","Cashier","Catering Manager","Celebrant","CEO",
  "Change Manager","Charge Nurse","Chauffeur","Chef","Child Care Worker","Childminder",
  "Chiropodist","Chiropractor","Civil Engineer","Civil Servant","Classroom Assistant",
  "Cleaner","Clinical Manager","Clinical Psychologist","Coach Driver","Community Nurse",
  "Compliance Manager","Construction Site Manager","Construction Worker","Contracts Manager",
  "Cook","Copywriter","Counsellor","Counselling Psychologist","Courier","Customer Service Staff",
  "Cyber Security Expert","Data Analyst","Data Scientist","Delivery Driver","Dental Nurse",
  "Dental Therapist","Dentist","Designer","Dermatologist","Dietician","Digital Marketing Specialist",
  "District Nurse","Doctor - General Practice","Dog Groomer","Dog Walker","Drone Pilot",
  "Driving Instructor","Ecological Consultant","Editorial Assistant","Electrical Engineer",
  "Electrician","Emergency Medical Technician","Environmental Health Officer","Estate Agent",
  "Events Manager","Factory Manager","Factory Worker","Farm Manager","Farm Worker","Farmer",
  "Finance Director","Financial Adviser","Financial Controller","Financial Planner",
  "Firefighter","Fitness Instructor","Florist","Food Courier","Foster Parent","Funeral Director",
  "GP - General Practitioner","Gardener","Gastroenterologist","General Practice Nurse",
  "Geneticist","Graphic Artist","Graphic Designer","Groundworker","Gym Instructor",
  "HR Administrator","Haematologist","Hairdresser","Health and Safety Consultant",
  "Health and Safety Officer","Health Care Assistant","Health Visitor","Headteacher",
  "Heating and Ventilation Engineer","Histologist","Hospital Manager","Hotel Manager",
  "Housing Manager","Human Resources Manager","IT Analyst","IT Consultant","IT Contractor",
  "IT Developer","IT Engineer","IT Manager","IT Support","IT Technician","Immunologist",
  "Immigration Officer","Independent Financial Adviser","Interior Designer","Investment Analyst",
  "Investment Fund Manager","Joiner","Journalist","Judge","Kitchen Fitter",
  "Laboratory Technician","Landscape Architect","Landscape Gardener","Lawyer","Lecturer",
  "Legal Adviser","Legal Executive","Librarian","Life Coach","Maintenance Manager",
  "Management Consultant","Marketing Manager","Mechanical Engineer","Medical Receptionist",
  "Medical Secretary","Mental Health Nurse","Midwife","Mortgage Adviser","Musician","NHS Manager",
  "Nanny","Neonatal Nurse","Neurologist","Neurosurgeon","Nurse","Nutritionist",
  "Occupational Health Nurse","Occupational Therapist","Office Administrator","Office Manager",
  "Oncologist","Operations Director","Operations Manager","Optician","Optometrist","Osteopath",
  "Paramedic","Parking Enforcement Officer","Personal Assistant","Personal Trainer","Pharmacist",
  "Phlebotomist","Physiotherapist","Planning Engineer","Plumber","Podiatrist","Police Officer",
  "Practice Manager","Primary School Teacher","Prison Officer","Probation Officer",
  "Product Owner","Professor","Project Manager","Psychiatrist","Psychologist","Psychotherapist",
  "Quantity Surveyor","Radiographer","Radiologist","Receptionist","Recruitment Consultant",
  "Refrigeration Engineer","Remedial Therapist","Renal Physician","Research Chemist",
  "Retail Shop Assistant","Retail Shop Manager","Retired","Rheumatologist","Risk Manager",
  "Robotics Engineer","Sales Executive","Sales Manager","School Teacher","Secondary Teacher",
  "Secretary","Security Consultant","Security Guard","Security Manager","Social Worker",
  "Software Developer","Software Engineer","Solutions Architect","Solicitor",
  "Speech and Language Therapist","Sports Coach","Sports Therapist","Structural Engineer",
  "Student","Supermarket Manager","Supply Teacher","Support Worker","Surgeon",
  "Tax Consultant","Taxi Driver","Teaching Assistant","Theatre Nurse","Town Planner",
  "Train Driver","Transport Manager","Travel Agent","Unemployed","University Lecturer",
  "Van Driver","Veterinarian","Veterinary Nurse","Warehouse Manager","Warehouse Operative",
  "Web Designer","Web Developer","Wellness Coach","X-ray Technician - Radiologist",
  "Yoga Teacher","Other - Occupation Not Listed",
].sort((a, b) => a.localeCompare(b));

// ─── CONFIG ───────────────────────────────────────────────────────────────────
const TOTAL_STEPS = 13;
const ZAPIER_WEBHOOK_URL = "https://hooks.zapier.com/hooks/catch/26526769/uvzadth/";

// sendApplicationEmail now just builds and returns the complete payload.
// firePartial sends it to Zapier as a single call with session_id and status: "complete".
function buildApplicationPayload(data) {
  const {
    coverLevel, coverTypeLabel, price, band,
    salutation, firstName, lastName, email, phone,
    addr1, addr2, city, postcode,
    dobDay, dobMonth, dobYear,
    employment, income, occupation,
    hours16, gpReg, sortCode, accountNum,
    accountName, paymentDay,
    optOutEmail, optOutPhone, optOutSMS, optOutPost,
    smokerStatus, everSmoked, lastSmokedMonth, lastSmokedYear,
  } = data;
  const timestamp = new Date().toLocaleString("en-GB", {
    day: "2-digit", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit",
  });
  const ordSfx = d => {
    if (!d) return "";
    if (d >= 11 && d <= 13) return `${d}th`;
    return `${d}${["th","st","nd","rd"][d % 10] || "th"}`;
  };
  return {
    subject: `New Friendly Shield Application - ${salutation} ${firstName} ${lastName} (${coverLevel}, \u00a3${price}/month)`,
    submitted_at: timestamp,
    status: "complete",
    cover_level: coverLevel,
    cover_type: coverTypeLabel,
    monthly_premium: `\u00a3${price}`,
    age_band: BAND_LABELS[band],
    salutation,
    first_name: firstName,
    last_name: lastName,
    full_name: `${salutation} ${firstName} ${lastName}`,
    email,
    phone,
    date_of_birth: `${dobDay}/${dobMonth}/${dobYear}`,
    address_line_1: addr1,
    address_line_2: addr2 || "",
    city,
    postcode,
    full_address: [addr1, addr2, city, postcode].filter(Boolean).join(", "),
    employment_status: employment,
    gross_annual_income: `\u00a3${Number(income).toLocaleString("en-GB")}`,
    occupation,
    works_16_plus_hours: hours16 ? "Yes" : "No",
    uk_gp_registered_2_years: gpReg ? "Yes" : "No",
    sort_code: sortCode,
    account_number: accountNum,
    account_name: accountName || "",
    payment_day: paymentDay ? `${ordSfx(paymentDay)} of each month` : "",
    opt_out_email: optOutEmail ? "Opt out" : "",
    opt_out_phone: optOutPhone ? "Opt out" : "",
    opt_out_sms: optOutSMS ? "Opt out" : "",
    opt_out_post: optOutPost ? "Opt out" : "",
    smoker: smokerStatus === true ? "Yes" : smokerStatus === false ? "No" : "",
    ever_smoked: everSmoked === true ? "Yes" : everSmoked === false ? "No" : "",
    last_smoked: everSmoked && lastSmokedMonth && lastSmokedYear ? `${lastSmokedMonth}/${lastSmokedYear}` : "",
    message: [
      "NEW FRIENDLY SHIELD APPLICATION",
      `Submitted: ${timestamp}`,
      "",
      "PLAN",
      `Cover Level:     ${coverLevel}`,
      `Cover Type:      ${coverTypeLabel}`,
      `Premium:         \u00a3${price}/month`,
      `Age Band:        ${BAND_LABELS[band]}`,
      "",
      "PERSONAL",
      `Name:            ${salutation} ${firstName} ${lastName}`,
      `Email:           ${email}`,
      `Phone:           ${phone}`,
      `DOB:             ${dobDay}/${dobMonth}/${dobYear}`,
      "",
      "ADDRESS",
      addr1,
      addr2 || "",
      `${city}, ${postcode}`,
      "",
      "EMPLOYMENT",
      `Status:          ${employment}`,
      `Income:          \u00a3${Number(income).toLocaleString("en-GB")}`,
      `Occupation:      ${occupation}`,
      `16+ hrs/week:    ${hours16 ? "Yes" : "No"}`,
      `UK GP 2+ yrs:   ${gpReg ? "Yes" : "No"}`,
      "",
      "BANK",
      `Account Name:    ${accountName || ""}`,
      `Sort Code:       ${sortCode}`,
      `Account Number:  ${accountNum}`,
      `Payment Day:     ${paymentDay ? ordSfx(paymentDay) + " of each month" : ""}`,
      "",
      "MARKETING OPT-OUTS",
      `Email: ${optOutEmail ? "Opted out" : "OK"}  Phone: ${optOutPhone ? "Opted out" : "OK"}  SMS: ${optOutSMS ? "Opted out" : "OK"}  Post: ${optOutPost ? "Opted out" : "OK"}`,
      "",
      "Declaration agreed.",
    ].filter(l => l !== undefined).join("\n"),
  };
}

// ─── PARTIAL WEBHOOK — fired silently at every step transition ────────────────
// Uses the same Zapier webhook. In your Zap, use "Create or Update Row" in
// Google Sheets, matching on session_id so each person stays on one row.
// Filter the "Send Email" action to only fire when status = "complete".
async function sendPartialWebhook(payload) {
  try {
    await fetch(ZAPIER_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "text/plain" },
      body: JSON.stringify(payload),
    });
  } catch (e) {
    // Silent fail — never block the user journey for analytics
  }
}

const TIER_STYLE = {
  Bronze: { color: BRONZE_C, bg: BRONZE_BG, border: "#d97706" },
  Silver: { color: SILVER_C, bg: SILVER_BG, border: "#9ca3af" },
  Gold:   { color: GOLD_C,   bg: GOLD_BG,   border: "#b45309" },
};

const BENEFITS = {
  Bronze: [
    { icon: "💰", label: "Income benefit", value: "GBP750/month for up to 3 months" },
    { icon: "🦴", label: "Fracture cover", value: "GBP1,000 lump sum" },
    { icon: "⚠️", label: "Accidental death", value: "GBP45,000 lump sum" },
    { icon: "🌿", label: "Natural death benefit", value: "GBP2,500 (2-yr qualifying period)" },
    { icon: "🦷", label: "Friendly Dentist+", value: "24/7 virtual dentist access" },
    { icon: "🩺", label: "Friendly GP+", value: "24/7 virtual GP - immediate family" },
    { icon: "🏥", label: "Rehabilitation cover", value: "GBP1,000 private facilities" },
  ],
  Silver: [
    { icon: "💰", label: "Income benefit", value: "GBP1,500/month for up to 3 months" },
    { icon: "🦴", label: "Fracture cover", value: "GBP2,000 lump sum" },
    { icon: "⚠️", label: "Accidental death", value: "GBP85,000 lump sum" },
    { icon: "🌿", label: "Natural death benefit", value: "GBP2,500 (2-yr qualifying period)" },
    { icon: "🦷", label: "Friendly Dentist+", value: "24/7 virtual dentist access" },
    { icon: "🩺", label: "Friendly GP+", value: "24/7 virtual GP - immediate family" },
    { icon: "🏥", label: "Rehabilitation cover", value: "GBP1,000 private facilities" },
  ],
  Gold: [
    { icon: "💰", label: "Income benefit", value: "GBP2,250/month for up to 3 months" },
    { icon: "🦴", label: "Fracture cover", value: "GBP3,000 lump sum" },
    { icon: "⚠️", label: "Accidental death", value: "GBP85,000 lump sum" },
    { icon: "🌿", label: "Natural death benefit", value: "GBP2,500 (2-yr qualifying period)" },
    { icon: "🦷", label: "Friendly Dentist+", value: "24/7 virtual dentist access" },
    { icon: "🩺", label: "Friendly GP+", value: "24/7 virtual GP - immediate family" },
    { icon: "🏥", label: "Rehabilitation cover", value: "GBP1,000 private facilities" },
  ],
};

// Replace GBP placeholder with pound sign
const fmtBenefits = (tier) =>
  (BENEFITS[tier] || []).map(b => ({
    ...b,
    value: b.value.replace(/GBP/g, "\u00a3"),
  }));

// ─── CUSTOM COVER BENEFITS ────────────────────────────────────────────────────
const CUSTOM_BENEFITS = [
  { icon: "📊", label: "Up to 70% of pre-tax earnings" },
  { icon: "💷", label: "Max £20,000/month cover" },
  { icon: "⏱️", label: "Adjustable deferred periods" },
  { icon: "📅", label: "Longer term cover" },
  { icon: "➕", label: "Optional: Fracture cover" },
  { icon: "🎗️", label: "Optional: Private medical (cancer)" },
  { icon: "🌍", label: "Optional: Global private treatment" },
  { icon: "👶", label: "Optional: Children's critical illness" },
];

// ─── PRIMITIVES ───────────────────────────────────────────────────────────────
const Btn = ({ children, onClick, disabled }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    style={{
      background: disabled ? "#ccc" : G,
      color: "#fff",
      border: "none",
      borderRadius: 8,
      padding: "13px 30px",
      fontSize: 15,
      fontWeight: 600,
      cursor: disabled ? "not-allowed" : "pointer",
      fontFamily: "inherit",
      transition: "background 0.2s",
    }}
  >
    {children}
  </button>
);

const Label = ({ children }) => (
  <div style={{ marginBottom: 7 }}>
    <span style={{ fontSize: 14, fontWeight: 600, color: "#1f2937" }}>{children}</span>
  </div>
);

const Input = ({ value, onChange, placeholder, type = "text", maxLength, onFocus }) => (
  <input
    type={type}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    maxLength={maxLength}
    style={{
      width: "100%",
      padding: "11px 13px",
      borderRadius: 8,
      border: "1.5px solid #d1d5db",
      fontSize: 15,
      fontFamily: "inherit",
      outline: "none",
      boxSizing: "border-box",
      color: "#1f2937",
      background: "#fff",
      transition: "border-color 0.2s",
    }}
    onFocus={e => { e.target.style.borderColor = G; onFocus && onFocus(e); }}
    onBlur={e => { e.target.style.borderColor = "#d1d5db"; }}
  />
);

const YesNoBtn = ({ label, selected, onClick }) => (
  <button
    onClick={onClick}
    style={{
      flex: 1,
      padding: "15px 20px",
      borderRadius: 10,
      border: `2px solid ${selected ? G : "#d1d5db"}`,
      background: selected ? GL : "#fff",
      color: selected ? GD : "#374151",
      fontSize: 15,
      fontWeight: selected ? 700 : 500,
      cursor: "pointer",
      fontFamily: "inherit",
      transition: "all 0.15s",
    }}
  >
    {label}
  </button>
);

const Back = ({ onClick }) => (
  <button
    onClick={onClick}
    className="fs-body"
    style={{
      background: "none",
      border: "none",
      color: "#6B7280",
      cursor: "pointer",
      padding: "0 0 18px",
      fontFamily: "inherit",
      display: "flex",
      alignItems: "center",
      gap: 4,
    }}
  >
    {"\u2190"} Back
  </button>
);

const Q = ({ children }) => (
  <h2 className="fs-q" style={{
    margin: "0 0 18px",
    fontWeight: 700,
    color: "#111827",
    lineHeight: 1.35,
    fontFamily: "'DM Serif Display', Georgia, serif",
  }}>
    {children}
  </h2>
);

// ─── PLAN SUMMARY BAR ─────────────────────────────────────────────────────────
const PlanSummaryBar = ({ coverLevel, coverType, price, band }) => {
  if (!coverLevel || !coverType || !price) return null;
  const t = TIER_STYLE[coverLevel] || {};
  const typeLabel = coverType === "AO" ? "Accidents Only" : "Illnesses & Accidents";

  // Metallic gradient backgrounds per tier
  const barTheme = {
    Bronze: {
      bg: "linear-gradient(135deg, #6b3a1f 0%, #cd7f32 35%, #e8a96a 55%, #cd7f32 75%, #8b4e24 100%)",
      text: "#fff", sub: "rgba(255,255,255,0.78)", priceBg: "rgba(0,0,0,0.18)", priceBorder: "rgba(255,255,255,0.25)",
    },
    Silver: {
      bg: "linear-gradient(135deg, #5a5a5a 0%, #a8a8a8 30%, #e8e8e8 50%, #b0b0b0 70%, #6a6a6a 100%)",
      text: "#1a1a1a", sub: "rgba(0,0,0,0.55)", priceBg: "rgba(0,0,0,0.12)", priceBorder: "rgba(0,0,0,0.2)",
    },
    Gold: {
      bg: "linear-gradient(135deg, #7a4e00 0%, #d4a017 30%, #fce570 50%, #c8880a 70%, #8b5e00 100%)",
      text: "#2a1800", sub: "rgba(0,0,0,0.5)", priceBg: "rgba(0,0,0,0.15)", priceBorder: "rgba(0,0,0,0.2)",
    },
  };
  const bt = barTheme[coverLevel] || barTheme.Bronze;

  return (
    <div className="fs-plan-bar" style={{
      background: bt.bg,
      padding: "11px 28px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      flexWrap: "wrap",
      gap: 8,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
        <span className="fs-xsmall" style={{ fontWeight: 700, color: bt.sub, textTransform: "uppercase", letterSpacing: "0.07em" }}>
          Your plan:
        </span>
        <span style={{
          background: "rgba(255,255,255,0.22)",
          border: `1.5px solid rgba(255,255,255,0.4)`,
          color: bt.text,
          borderRadius: 999,
          padding: "2px 11px",
          fontSize: 12,
          fontWeight: 700,
          letterSpacing: "0.02em",
        }}>
          {coverLevel}
        </span>
        <span style={{ color: "rgba(255,255,255,0.4)" }}>{"\u00b7"}</span>
        <span className="fs-small" style={{ fontWeight: 600, color: bt.text }}>{typeLabel}</span>
        {band && (
          <>
            <span style={{ color: "rgba(255,255,255,0.4)" }}>{"\u00b7"}</span>
            <span className="fs-xsmall" style={{ color: bt.sub }}>Age {BAND_LABELS[band]}</span>
          </>
        )}
      </div>
      <div style={{
        background: bt.priceBg,
        border: `1.5px solid ${bt.priceBorder}`,
        borderRadius: 999,
        padding: "3px 14px",
        display: "flex",
        alignItems: "baseline",
        gap: 2,
      }}>
        <span className="fs-barprice" style={{ color: bt.text }}>{"\u00a3"}{price}</span>
        <span className="fs-xsmall" style={{ color: bt.sub, fontWeight: 500 }}>/month</span>
      </div>
    </div>
  );
};

// ─── SEGMENTED PROGRESS BAR ───────────────────────────────────────────────────
const SEGMENTS = [
  { label: "Your Cover",             icon: "\uD83D\uDEE1\uFE0F", steps: [1, 2] },
  { label: "Your Details",           icon: "\uD83D\uDC64",        steps: [3, 4, 5, 7, 8, 9, 10, 12] },
  { label: "Payment & Confirmation", icon: "\uD83D\uDCB3",        steps: [13, 14] },
];

const ProgressBar = ({ step }) => {
  const activeSegIdx = SEGMENTS.findIndex(s => s.steps.includes(step));
  return (
    <div className="fs-progress-wrap" style={{ padding: "14px 24px 16px", background: "rgba(0,0,0,0.15)" }}>
      <div style={{ display: "flex", gap: 8 }}>
        {SEGMENTS.map((seg, i) => {
          const done     = i < activeSegIdx;
          const active   = i === activeSegIdx;
          const upcoming = i > activeSegIdx;
          const stepIdx  = active ? seg.steps.indexOf(step) : 0;
          const segPct   = done ? 100 : active ? Math.round(((stepIdx + 1) / seg.steps.length) * 100) : 0;

          const pillBg = done
            ? "rgba(255,255,255,0.25)"
            : active
            ? "rgba(255,255,255,0.22)"
            : "rgba(255,255,255,0.07)";
          const pillBorder = done
            ? "rgba(255,255,255,0.5)"
            : active
            ? "rgba(255,255,255,0.7)"
            : "rgba(255,255,255,0.15)";
          const labelColor = upcoming ? "rgba(255,255,255,0.38)" : "#fff";

          // Mobile: inactive = emoji-only pill; active = full pill
          const pillClass  = `fs-pill ${active ? "fs-pill--active" : "fs-pill--inactive"}`;
          const barClass   = `fs-bar-wrap ${active ? "fs-bar-wrap--active" : "fs-bar-wrap--inactive"}`;

          return (
            <div key={seg.label} className={barClass} style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
              {/* Pill badge */}
              <div className={pillClass} style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 7,
                background: pillBg,
                border: `1.5px solid ${pillBorder}`,
                borderRadius: 10,
                padding: "10px 10px",
                backdropFilter: "blur(4px)",
                transition: "all 0.3s ease",
                minHeight: 56,
              }}>
                <span className="fs-seg-icon" style={{ lineHeight: 1, fontSize: "2em", flexShrink: 0 }}>{seg.icon}</span>
                <div className="fs-pill-text" style={{ flexDirection: "column", gap: 1, flex: 1, minWidth: 0 }}>
                  <span className="fs-seg-label" style={{
                    fontWeight: active ? 700 : done ? 600 : 400,
                    color: labelColor,
                    letterSpacing: "0.01em",
                    lineHeight: 1.25,
                    whiteSpace: "normal",
                    wordBreak: "break-word",
                  }}>
                    {seg.label}
                  </span>
                  {done && (
                    <span style={{ fontSize: 10, color: "rgba(255,255,255,0.8)", fontWeight: 600 }}>Complete ✓</span>
                  )}
                </div>
              </div>

              {/* Progress bar with position marker */}
              <div className="fs-seg-bar" style={{
                borderRadius: 999,
                background: "rgba(255,255,255,0.18)",
                position: "relative",
              }}>
                <div style={{
                  height: "100%",
                  width: `${segPct}%`,
                  borderRadius: 999,
                  background: done
                    ? "rgba(255,255,255,0.8)"
                    : active
                    ? "linear-gradient(90deg, rgba(255,255,255,0.7), #fff)"
                    : "transparent",
                  transition: "width 0.4s ease",
                }} />
                {active && segPct > 0 && segPct < 100 && (
                  <div style={{
                    position: "absolute",
                    top: "50%",
                    left: `${segPct}%`,
                    transform: "translate(-50%, -50%)",
                    width: 12,
                    height: 12,
                    borderRadius: "50%",
                    background: "#fff",
                    border: `2px solid ${G}`,
                    boxShadow: "0 0 0 2px rgba(255,255,255,0.4)",
                    transition: "left 0.4s ease",
                  }} />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ─── BENEFIT TOOLTIP (pricing table hover) ────────────────────────────────────
const BenefitTooltip = ({ tier, style = {} }) => {
  const t = TIER_STYLE[tier] || {};
  const { _flipped, _caretLeft, ...rest } = style;
  const caretStyle = _flipped
    ? { bottom: -7, top: "auto", borderBottom: `2px solid ${t.border || "#e5e7eb"}`, borderRight: `2px solid ${t.border || "#e5e7eb"}` }
    : { top: -7, borderTop: `2px solid ${t.border || "#e5e7eb"}`, borderLeft: `2px solid ${t.border || "#e5e7eb"}` };
  // _caretLeft is the viewport x of the anchor element centre, relative to the tooltip left edge
  const caretPos = _caretLeft !== undefined
    ? { left: Math.max(10, Math.min(_caretLeft - (rest.left || 0), 220)), marginLeft: 0 }
    : { left: "50%", marginLeft: -6 };
  return (
    <div style={{ position: "fixed", zIndex: 9999, background: "#fff", border: `2px solid ${t.border || "#e5e7eb"}`, borderRadius: 14, boxShadow: "0 12px 40px rgba(0,0,0,0.2)", padding: "13px 15px", width: 240, pointerEvents: "none", ...rest }}>
      <div style={{ position: "absolute", width: 12, height: 12, background: "#fff", transform: "rotate(45deg)", ...caretStyle, ...caretPos }} />
      <div style={{ fontSize: 10, fontWeight: 800, color: t.color, marginBottom: 9, textTransform: "uppercase", letterSpacing: "0.06em", textAlign: "center" }}>
        {tier} {"\u2014"} What{"'"}s included
      </div>
      {fmtBenefits(tier).map(b => (
        <div key={b.label} style={{ display: "flex", gap: 8, marginBottom: 7, alignItems: "flex-start" }}>
          <span style={{ fontSize: 14, flexShrink: 0 }}>{b.icon}</span>
          <div style={{ textAlign: "left" }}>
            <div className="fs-small" style={{ fontWeight: 600, color: "#1f2937", lineHeight: 1.3 }}>{b.label}</div>
            <div className="fs-xsmall" style={{ color: "#6B7280", lineHeight: 1.4 }}>{b.value}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

// ─── PRICING TABLE ────────────────────────────────────────────────────────────
const PricingTable = ({ band, selectedLevel, selectedType, onSelectLevel, onSelectType, onSelectCustom }) => {
  const [tooltip, setTooltip] = useState(null);
  const [showCustomTip, setShowCustomTip] = useState(null);
  const tierHeaderRefs = { Bronze: useRef(null), Silver: useRef(null), Gold: useRef(null) };
  const customHeaderRef = useRef(null);
  const prices = PRICING[band];
  const tiers = [
    { name: "Bronze", color: BRONZE_C, bg: BRONZE_BG, border: "#d97706" },
    { name: "Silver", color: SILVER_C, bg: SILVER_BG, border: "#9ca3af" },
    { name: "Gold",   color: GOLD_C,   bg: GOLD_BG,   border: "#b45309" },
  ];
  const TOOLTIP_W = 240;
  const TOOLTIP_H = 280;
  const CTIP_W = 260;
  const CTIP_H = 300;

  const showTip = (tierName) => {
    const ref = tierHeaderRefs[tierName];
    if (!ref?.current) return;
    const r = ref.current.getBoundingClientRect();
    const anchorCentreX = r.left + r.width / 2;
    const idealLeft = anchorCentreX - TOOLTIP_W / 2;
    const left = Math.max(8, Math.min(idealLeft, window.innerWidth - TOOLTIP_W - 8));
    const fitsAbove = r.top - TOOLTIP_H - 10 > 0;
    setTooltip({ tier: tierName, top: fitsAbove ? r.top - TOOLTIP_H - 10 : r.bottom + 10, left, _flipped: fitsAbove, _caretLeft: anchorCentreX });
  };

  const showCustomTipFn = () => {
    if (!customHeaderRef.current) return;
    const r = customHeaderRef.current.getBoundingClientRect();
    const idealLeft = r.left + r.width / 2 - CTIP_W / 2;
    const left = Math.max(8, Math.min(idealLeft, window.innerWidth - CTIP_W - 8));
    const fitsAbove = r.top - CTIP_H - 10 > 0;
    setShowCustomTip({ top: fitsAbove ? r.top - CTIP_H - 10 : r.bottom + 10, left, _flipped: fitsAbove });
  };

  const isCustomSel = selectedLevel === "Custom";

  return (
    <div style={{ position: "relative" }}>
      {/* Single flat grid: 5 cols × 3 rows desktop, 4 cols × 4 rows mobile */}
      <div className="fs-price-grid" style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr 1fr 1.1fr",
        gridTemplateRows: "auto auto auto",
        gap: 7,
      }}>
        {/* ── Row 1: Headers ── */}
        <div style={{ gridRow: 1, gridColumn: 1 }} /> {/* spacer */}
        {tiers.map((t, ti) => (
          <div
            key={t.name}
            ref={tierHeaderRefs[t.name]}
            onClick={() => onSelectLevel(t.name)}
            onMouseEnter={() => showTip(t.name)}
            onMouseLeave={() => setTooltip(null)}
            style={{
              gridRow: 1, gridColumn: ti + 2,
              background: selectedLevel === t.name ? t.bg : "#f9fafb",
              border: `2px solid ${selectedLevel === t.name ? t.border : "#e5e7eb"}`,
              borderRadius: 9, padding: "9px 6px", textAlign: "center", cursor: "pointer", transition: "all 0.15s",
            }}
          >
            <div className="fs-small" style={{ fontWeight: 700, color: t.color }}>{t.name}</div>
            <div className="fs-xsmall" style={{ color: "#9CA3AF", marginTop: 2 }}>{"\u24d8"} <span className="fs-tap-hint" /></div>
          </div>
        ))}
        {/* Custom header */}
        <div
          className="fs-custom-header"
          ref={customHeaderRef}
          onMouseEnter={showCustomTipFn}
          onMouseLeave={() => setShowCustomTip(null)}
          style={{
            gridRow: 1, gridColumn: 5,
            background: "#f9fafb",
            border: `2px solid ${isCustomSel ? G : "#e5e7eb"}`,
            borderRadius: 9, padding: "9px 6px", textAlign: "center", cursor: "default",
            outline: isCustomSel ? `3px solid ${G}` : "none",
            outlineOffset: 2,
          }}
        >
          <div className="fs-small" style={{ fontWeight: 700, color: "#374151", lineHeight: 1.2 }}>Need more cover?</div>
          <div className="fs-xsmall" style={{ color: "#9CA3AF", marginTop: 2 }}>{"\u24d8"} <span className="fs-tap-hint" /></div>
        </div>

        {/* ── Row 2: Accidents Only ── */}
        <div style={{ gridRow: 2, gridColumn: 1, background: TEAL_BG, borderRadius: 9, padding: "11px 7px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", gap: 3 }}>
          <span style={{ fontSize: 18 }}>🩹</span>
          <span className="fs-small" style={{ fontWeight: 700, color: TEAL, lineHeight: 1.3 }}>Accidents Only</span>
        </div>
        {tiers.map((t, ti) => {
          const isLevelSel = selectedLevel === t.name;
          const isFullSel = isLevelSel && selectedType === "AO";
          return (
            <div key={`${t.name}-AO`}
              onClick={() => { onSelectLevel(t.name); onSelectType("AO"); }}
              onMouseEnter={() => showTip(t.name)}
              onMouseLeave={() => setTooltip(null)}
              style={{
                gridRow: 2, gridColumn: ti + 2,
                background: isFullSel ? t.bg : isLevelSel ? `${t.bg}80` : "#f9fafb",
                border: `2px solid ${isFullSel ? t.border : isLevelSel ? t.border : "#e5e7eb"}`,
                borderRadius: 9, padding: "11px 7px", textAlign: "center", cursor: "pointer", transition: "all 0.15s",
                outline: isFullSel ? `3px solid ${t.border}` : "none", outlineOffset: 2,
              }}
            >
              <div className="fs-price" style={{ color: isFullSel ? t.color : isLevelSel ? t.color : "#374151" }}>{"\u00a3"}{prices[t.name]["AO"]}</div>
              <div className="fs-xsmall" style={{ color: "#6B7280", marginTop: 2 }}>per month</div>
              {isFullSel && <div className="fs-xsmall" style={{ color: t.color, fontWeight: 700, marginTop: 3 }}>{"\u2713"} selected</div>}
            </div>
          );
        })}

        {/* Custom cell — explicitly pinned to col 5, rows 2-3 on desktop; row 4 on mobile */}
        <div
          className="fs-custom-cell"
          onClick={onSelectCustom}
          onMouseEnter={showCustomTipFn}
          onMouseLeave={() => setShowCustomTip(null)}
          style={{
            gridColumn: 5,
            gridRow: "2 / 4",
            background: "#f9fafb",
            border: `2px solid ${isCustomSel ? G : "#e5e7eb"}`,
            borderRadius: 9,
            padding: "14px 8px",
            textAlign: "center",
            cursor: "pointer",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            transition: "all 0.15s",
            outline: isCustomSel ? `3px solid ${G}` : "none",
            outlineOffset: 2,
          }}
        >
          <div className="fs-small" style={{ fontWeight: 700, color: "#374151", lineHeight: 1.3 }}>Request further information</div>
          {isCustomSel && <div className="fs-xsmall" style={{ color: G, fontWeight: 700 }}>{"\u2713"} selected</div>}
        </div>

        {/* ── Row 3: Illnesses & Accidents ── */}
        <div style={{ gridRow: 3, gridColumn: 1, background: TEAL_BG, borderRadius: 9, padding: "11px 7px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", gap: 3 }}>
          <span style={{ fontSize: 18 }}>🏥</span>
          <span className="fs-small" style={{ fontWeight: 700, color: TEAL, lineHeight: 1.3 }}>Illnesses & Accidents</span>
        </div>
        {tiers.map((t, ti) => {
          const isLevelSel = selectedLevel === t.name;
          const isFullSel = isLevelSel && selectedType === "IA";
          return (
            <div key={`${t.name}-IA`}
              onClick={() => { onSelectLevel(t.name); onSelectType("IA"); }}
              onMouseEnter={() => showTip(t.name)}
              onMouseLeave={() => setTooltip(null)}
              style={{
                gridRow: 3, gridColumn: ti + 2,
                background: isFullSel ? t.bg : isLevelSel ? `${t.bg}80` : "#f9fafb",
                border: `2px solid ${isFullSel ? t.border : isLevelSel ? t.border : "#e5e7eb"}`,
                borderRadius: 9, padding: "11px 7px", textAlign: "center", cursor: "pointer", transition: "all 0.15s",
                outline: isFullSel ? `3px solid ${t.border}` : "none", outlineOffset: 2,
              }}
            >
              <div className="fs-price" style={{ color: isFullSel ? t.color : isLevelSel ? t.color : "#374151" }}>{"\u00a3"}{prices[t.name]["IA"]}</div>
              <div className="fs-xsmall" style={{ color: "#6B7280", marginTop: 2 }}>per month</div>
              {isFullSel && <div className="fs-xsmall" style={{ color: t.color, fontWeight: 700, marginTop: 3 }}>{"\u2713"} selected</div>}
            </div>
          );
        })}
      </div>

      {tooltip && <BenefitTooltip tier={tooltip.tier} style={{ top: tooltip.top, left: tooltip.left, _flipped: tooltip._flipped }} />}
      {showCustomTip && <CustomCoverTooltip style={{ top: showCustomTip.top, left: showCustomTip.left, _flipped: showCustomTip._flipped }} />}
    </div>
  );
};

// ─── TIER CARD (step 0) — standalone component so hooks are valid ─────────────
const METALLIC_GRAD = {
  Bronze: "linear-gradient(135deg, #6b3a1f 0%, #cd7f32 35%, #e8a96a 55%, #cd7f32 75%, #8b4e24 100%)",
  Silver: "linear-gradient(135deg, #5a5a5a 0%, #a8a8a8 30%, #e8e8e8 50%, #b0b0b0 70%, #6a6a6a 100%)",
  Gold:   "linear-gradient(135deg, #7a4e00 0%, #d4a017 30%, #fce570 50%, #c8880a 70%, #8b5e00 100%)",
  Custom: "linear-gradient(135deg, #0f4c2a 0%, #1E824C 35%, #3dba73 55%, #1E824C 75%, #0f4c2a 100%)",
};
const METALLIC_TEXT = { Bronze: "#fff", Silver: "#1a1a1a", Gold: "#2a1800", Custom: "#fff" };
const METALLIC_SUB  = { Bronze: "rgba(255,255,255,0.75)", Silver: "rgba(0,0,0,0.55)", Gold: "rgba(0,0,0,0.5)", Custom: "rgba(255,255,255,0.78)" };

// ─── CUSTOM COVER TOOLTIP ─────────────────────────────────────────────────────
const CustomCoverTooltip = ({ style = {} }) => {
  const { _flipped, ...rest } = style;
  const caretStyle = _flipped
    ? { bottom: -7, top: "auto", borderBottom: `2px solid ${G}`, borderRight: `2px solid ${G}` }
    : { top: -7, borderTop: `2px solid ${G}`, borderLeft: `2px solid ${G}` };
  return (
    <div style={{ position: "fixed", zIndex: 9999, background: "#fff", border: `2px solid ${G}`, borderRadius: 14, boxShadow: "0 12px 40px rgba(0,0,0,0.2)", padding: "13px 15px", width: 260, pointerEvents: "none", ...rest }}>
      <div style={{ position: "absolute", left: "50%", marginLeft: -6, width: 12, height: 12, background: "#fff", transform: "rotate(45deg)", ...caretStyle }} />
      <div style={{ fontSize: 10, fontWeight: 800, color: G, marginBottom: 9, textTransform: "uppercase", letterSpacing: "0.06em", textAlign: "center" }}>
        Custom Cover {"\u2014"} Tailored protection
      </div>
      {CUSTOM_BENEFITS.map(b => (
        <div key={b.label} style={{ display: "flex", gap: 8, marginBottom: 6, alignItems: "flex-start" }}>
          <span style={{ fontSize: 14, flexShrink: 0 }}>{b.icon}</span>
          <div className="fs-small" style={{ fontWeight: 600, color: "#1f2937", lineHeight: 1.3, textAlign: "left" }}>{b.label}</div>
        </div>
      ))}
    </div>
  );
};

const TierCard = ({ icon, tier, sub }) => {
  const [hovered, setHovered] = useState(false);
  const btnRef = useRef(null);
  const [tipPos, setTipPos] = useState({ top: 0, left: 0, _flipped: false, _caretLeft: 0 });
  const TOOLTIP_W = 240;
  const TOOLTIP_H = 280;
  const handleEnter = () => {
    if (btnRef.current) {
      const r = btnRef.current.getBoundingClientRect();
      const anchorCentreX = r.left + r.width / 2;
      const idealLeft = anchorCentreX - TOOLTIP_W / 2;
      const left = Math.max(8, Math.min(idealLeft, window.innerWidth - TOOLTIP_W - 8));
      const wouldClip = r.bottom + TOOLTIP_H + 8 > window.innerHeight;
      setTipPos({ top: wouldClip ? r.top - TOOLTIP_H - 8 : r.bottom + 8, left, _flipped: wouldClip, _caretLeft: anchorCentreX });
    }
    setHovered(true);
  };
  // Bronze gets dark text to match Silver and Gold readability
  const textColor = tier === "Silver" ? "#1a1a1a" : tier === "Gold" ? "#2a1800" : "#1a1a1a";
  const subColor  = tier === "Silver" ? "rgba(0,0,0,0.65)" : tier === "Gold" ? "rgba(0,0,0,0.6)" : "rgba(0,0,0,0.65)";
  const hintColor = tier === "Silver" ? "rgba(0,0,0,0.5)" : tier === "Gold" ? "rgba(0,0,0,0.45)" : "rgba(0,0,0,0.5)";
  const hintBg    = "rgba(0,0,0,0.1)";
  const shadow    = tier === "Silver" ? "0 1px 2px rgba(255,255,255,0.6)" : "0 1px 2px rgba(255,255,255,0.3)";
  return (
    <div
      ref={btnRef}
      onMouseEnter={handleEnter}
      onMouseLeave={() => setHovered(false)}
      onTouchStart={e => { e.preventDefault(); hovered ? setHovered(false) : handleEnter(); }}
      style={{
        background: METALLIC_GRAD[tier],
        borderRadius: 14,
        padding: "22px 12px 14px",
        textAlign: "center",
        cursor: "default",
        boxShadow: "0 4px 16px rgba(0,0,0,0.25)",
        border: "1px solid rgba(255,255,255,0.25)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div style={{ fontSize: 42, marginBottom: 10, lineHeight: 1 }}>{icon}</div>
      <div style={{ fontSize: 17, fontWeight: 800, color: textColor, textShadow: shadow, marginBottom: 4, letterSpacing: "0.02em" }}>
        {tier}
      </div>
      <div style={{ fontSize: 12, fontWeight: 600, color: subColor, marginBottom: 0, flex: 1 }}>
        {sub}
      </div>
      {/* Hint badge pinned to bottom, aligned across all cards */}
      <div style={{ marginTop: 10, display: "inline-block", fontSize: 10, fontWeight: 600, color: hintColor, background: hintBg, borderRadius: 999, padding: "2px 8px" }}>
        ℹ <span className="fs-tap-hint" />
      </div>
      {hovered && <BenefitTooltip tier={tier} style={{ top: tipPos.top, left: tipPos.left, _flipped: tipPos._flipped, _caretLeft: tipPos._caretLeft }} />}
    </div>
  );
};

// ─── CUSTOM COVER CARD (step 0) ───────────────────────────────────────────────
const BHH_LOGO = (
  <svg width="32" height="32" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="40" height="40" rx="8" fill="rgba(255,255,255,0.18)" />
    <path d="M20 6L8 12v10c0 8.75 5.25 16.9 12 18.9C27.75 38.9 32 30.75 32 22V12L20 6z" fill="white" opacity="0.9"/>
    <path d="M15 20l3 3 7-7" stroke={G} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CustomTierCard = ({ onSelect }) => {
  const [hovered, setHovered] = useState(false);
  const btnRef = useRef(null);
  const [tipPos, setTipPos] = useState({ top: 0, left: 0, _flipped: false });
  const TOOLTIP_W = 260;
  const TOOLTIP_H = 300;
  const handleEnter = () => {
    if (btnRef.current) {
      const r = btnRef.current.getBoundingClientRect();
      const idealLeft = r.left + r.width / 2 - TOOLTIP_W / 2;
      const left = Math.max(8, Math.min(idealLeft, window.innerWidth - TOOLTIP_W - 8));
      const fitsAbove = r.top - TOOLTIP_H - 8 > 0;
      setTipPos({ top: fitsAbove ? r.top - TOOLTIP_H - 8 : r.bottom + 8, left, _flipped: fitsAbove });
    }
    setHovered(true);
  };
  return (
    <div
      ref={btnRef}
      onMouseEnter={handleEnter}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: METALLIC_GRAD.Custom,
        borderRadius: 14,
        padding: "22px 12px 18px",
        textAlign: "center",
        cursor: "default",
        boxShadow: "0 4px 16px rgba(0,0,0,0.25)",
        border: "1px solid rgba(255,255,255,0.25)",
      }}
    >
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 10 }}>
        <img src={BHH_LOGO_URI} alt="Baker Hudson Health" style={{ height: 38, width: "auto", display: "block" }} />
      </div>
      <div style={{ fontSize: 17, fontWeight: 800, color: "#fff", textShadow: "0 1px 3px rgba(0,0,0,0.4)", marginBottom: 4, letterSpacing: "0.02em" }}>
        Custom Cover
      </div>
      <div style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.88)", textShadow: "0 1px 2px rgba(0,0,0,0.4)", marginBottom: 6 }}>
        Tailored protection
      </div>
      <div style={{ display: "inline-block", fontSize: 10, fontWeight: 600, color: "rgba(255,255,255,0.7)", background: "rgba(0,0,0,0.2)", borderRadius: 999, padding: "2px 8px" }}>
        ℹ <span className="fs-tap-hint" />
      </div>
      {hovered && <CustomCoverTooltip style={{ top: tipPos.top, left: tipPos.left, _flipped: tipPos._flipped }} />}
    </div>
  );
};

const BenefitSummaryPanel = ({ coverLevel }) => {
  const t = TIER_STYLE[coverLevel] || {};
  return (
    <div style={{
      background: t.bg,
      border: `1.5px solid ${t.border}`,
      borderRadius: 11,
      padding: "14px 16px",
      marginBottom: 18,
    }}>
      <div className="fs-xsmall" style={{
        fontWeight: 800,
        color: t.color,
        textTransform: "uppercase",
        letterSpacing: "0.07em",
        marginBottom: 11,
      }}>
        {coverLevel} plan {"\u2014"} included with both cover types below
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "7px 18px" }}>
        {fmtBenefits(coverLevel).map(b => (
          <div key={b.label} style={{ display: "flex", gap: 7, alignItems: "flex-start" }}>
            <span style={{ fontSize: 14, flexShrink: 0 }}>{b.icon}</span>
            <div>
              <div className="fs-small" style={{ fontWeight: 600, color: "#1f2937", lineHeight: 1.3 }}>{b.label}</div>
              <div className="fs-xsmall" style={{ color: "#6B7280", lineHeight: 1.3 }}>{b.value}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── COVER TYPE CARD (step 2, simple) ────────────────────────────────────────
const CoverTypeCard = ({ opt, isSelected, onSelect }) => (
  <div
    onClick={() => onSelect(opt.key)}
    style={{
      border: `2px solid ${isSelected ? G : "#e5e7eb"}`,
      borderRadius: 11,
      padding: "16px 18px",
      cursor: "pointer",
      background: isSelected ? GL : "#fff",
      transition: "border-color 0.15s",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    }}
  >
    <div style={{ display: "flex", gap: 13, alignItems: "flex-start" }}>
      <span style={{ fontSize: 24 }}>{opt.icon}</span>
      <div>
        <div style={{ fontWeight: 700, fontSize: 15, color: "#111827", marginBottom: 3 }}>{opt.label}</div>
        <div className="fs-body" style={{ color: "#6B7280", lineHeight: 1.5 }}>{opt.desc}</div>
      </div>
    </div>
    <div style={{ textAlign: "right", flexShrink: 0, marginLeft: 14 }}>
      <div style={{ fontSize: 20, fontWeight: 800, color: isSelected ? G : "#374151" }}>{"\u00a3"}{opt.price}</div>
      <div style={{ fontSize: 10, color: "#9CA3AF" }}>per month</div>
    </div>
  </div>
);

// ─── MAIN FORM ────────────────────────────────────────────────────────────────
export default function FriendlyShieldForm() {
  const [step, setStep] = useState(0);
  const [ineligible, setIneligible] = useState(false);
  const [ineligibleReason, setIneligibleReason] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [age, setAge] = useState("");
  const [band, setBand] = useState(null);
  const [coverLevel, setCoverLevel] = useState(null);
  const [coverType, setCoverType] = useState(null);
  const [consent, setConsent] = useState(false);
  const [optOutEmail, setOptOutEmail] = useState(false);
  const [optOutPhone, setOptOutPhone] = useState(false);
  const [optOutSMS, setOptOutSMS] = useState(false);
  const [optOutPost, setOptOutPost] = useState(false);
  const [isCustomCover, setIsCustomCover] = useState(false);
  const [smokerStatus, setSmokerStatus] = useState(null);   // true=yes, false=no
  const [everSmoked, setEverSmoked] = useState(null);       // true=yes, false=no
  const [lastSmokedMonth, setLastSmokedMonth] = useState("");
  const [lastSmokedYear, setLastSmokedYear] = useState("");
  const [salutation, setSalutation] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [addr1, setAddr1] = useState("");
  const [addr2, setAddr2] = useState("");
  const [city, setCity] = useState("");
  const [postcode, setPostcode] = useState("");
  const [dobDay, setDobDay] = useState("");
  const [dobMonth, setDobMonth] = useState("");
  const [dobYear, setDobYear] = useState("");
  const [employment, setEmployment] = useState(null);
  const [income, setIncome] = useState("");
  const [occupation, setOccupation] = useState("");
  const [occSearch, setOccSearch] = useState("");
  const [showOccDrop, setShowOccDrop] = useState(false);
  const [hours16, setHours16] = useState(null);
  const [gpReg, setGpReg] = useState(null);
  const [sortCode, setSortCode] = useState("");
  const [accountNum, setAccountNum] = useState("");
  const [accountName, setAccountName] = useState("");
  const [paymentDay, setPaymentDay] = useState("");
  const [declaration, setDeclaration] = useState(false);
  const [sending, setSending] = useState(false);
  const [emailError, setEmailError] = useState(false);

  // Unique ID for this browser session — used to match rows in Google Sheets
  const sessionId = useRef(`fs-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`);

  const price = band && coverLevel && coverType ? PRICING[band]?.[coverLevel]?.[coverType] : null;
  const coverTypeLabel = coverType === "AO" ? "Accidents Only" : coverType === "IA" ? "Illnesses & Accidents" : "";

  // Fire-and-forget partial update — always passes full state snapshot so each
  // Sheets row is a complete picture of how far the user got.
  const firePartial = (stage, overrides = {}) => {
    const base = {
      session_id: sessionId.current,
      status: "partial",
      stage,
      started_at: new Date().toLocaleString("en-GB", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }),
      age: age || "",
      age_band: band ? BAND_LABELS[band] : "",
      cover_level: coverLevel || "",
      cover_type: coverType === "AO" ? "Accidents Only" : coverType === "IA" ? "Illnesses & Accidents" : "",
      monthly_premium: price ? `\u00a3${price}` : "",
      first_name: firstName || "",
      last_name: lastName || "",
      full_name: firstName || lastName ? `${firstName} ${lastName}`.trim() : "",
      salutation: salutation || "",
      email: email || "",
      phone: phone || "",
      date_of_birth: dobDay && dobMonth && dobYear ? `${dobDay}/${dobMonth}/${dobYear}` : "",
      address: addr1 ? [addr1, addr2, city, postcode].filter(Boolean).join(", ") : "",
      employment_status: employment || "",
      gross_annual_income: income ? `\u00a3${Number(income).toLocaleString("en-GB")}` : "",
      occupation: occupation || "",
      works_16_plus_hours: hours16 === true ? "Yes" : hours16 === false ? "No" : "",
      uk_gp_registered_2_years: gpReg === true ? "Yes" : gpReg === false ? "No" : "",
      account_name: accountName || "",
      payment_day: paymentDay ? `${paymentDay}${["st","nd","rd"][((paymentDay%100)-11)%10<3?(paymentDay%10)-1:3]||"th"} of each month`  : "",
      smoker: smokerStatus === true ? "Yes" : smokerStatus === false ? "No" : "",
      ever_smoked: everSmoked === true ? "Yes" : everSmoked === false ? "No" : "",
      last_smoked: everSmoked && lastSmokedMonth && lastSmokedYear ? `${lastSmokedMonth}/${lastSmokedYear}` : "",
      opt_out_email: optOutEmail ? "Opt out" : "",
      opt_out_phone: optOutPhone ? "Opt out" : "",
      opt_out_sms: optOutSMS ? "Opt out" : "",
      opt_out_post: optOutPost ? "Opt out" : "",
    };
    sendPartialWebhook({ ...base, ...overrides });
  };

  const occRef = useRef(null);
  const dobMonthRef = useRef(null);
  const dobYearRef = useRef(null);
  useEffect(() => {
    const h = e => { if (occRef.current && !occRef.current.contains(e.target)) setShowOccDrop(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  const filteredOccs = OCCUPATIONS.filter(o => o.toLowerCase().includes(occSearch.toLowerCase())).slice(0, 10);
  const fmtSortCode = v => {
    const d = v.replace(/\D/g, "").slice(0, 6);
    if (d.length <= 2) return d;
    if (d.length <= 4) return `${d.slice(0, 2)}-${d.slice(2)}`;
    return `${d.slice(0, 2)}-${d.slice(2, 4)}-${d.slice(4)}`;
  };

  const handleDOBSubmit = () => {
    const day = parseInt(dobDay, 10);
    const month = parseInt(dobMonth, 10);
    const year = parseInt(dobYear, 10);
    if (!day || !month || !year || dobYear.length !== 4) return;
    const today = new Date();
    const dob = new Date(year, month - 1, day);
    let calcAge = today.getFullYear() - dob.getFullYear();
    const m = today.getMonth() - dob.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) calcAge--;
    const calcAgeStr = String(calcAge);
    const b = getAgeBand(calcAgeStr);
    if (b === "under18" || b === "over60") {
      setIneligible(true);
      setIneligibleReason(
        calcAge < 18
          ? `Friendly Shield is available for ages 18–60. Based on your date of birth you are ${calcAge} years old.`
          : `Friendly Shield is available for ages 18–60. Based on your date of birth you are ${calcAge} years old, which is above the maximum age for this product.`
      );
      firePartial("Ineligible — Age", { age: calcAgeStr, status: "ineligible", ineligible_reason: "Age out of range" });
      return;
    }
    setAge(calcAgeStr);
    setBand(b);
    setStep(1);
    firePartial("Step 1 — Cover Level", { age: calcAgeStr, age_band: BAND_LABELS[b] });
  };

  const handleHoursAnswer = yes => {
    setHours16(yes);
    if (!yes) {
      setIneligible(true);
      setIneligibleReason("Friendly Shield requires you to work at least 16 hours per week. Unfortunately you are not eligible at this time. An adviser will be in touch to discuss alternative options.");
      firePartial("Ineligible — Hours", { works_16_plus_hours: "No", status: "ineligible", ineligible_reason: "Works fewer than 16 hrs/week" });
      return;
    }
    setStep(12);
    firePartial("Step 12 — GP Registration", { works_16_plus_hours: "Yes" });
  };

  const handleGPAnswer = yes => {
    setGpReg(yes);
    if (!yes) {
      setIneligible(true);
      setIneligibleReason("Friendly Shield requires UK GP registration for at least 2 years. Unfortunately you are not eligible at this time. An adviser will be in touch to discuss alternative options.");
      firePartial("Ineligible — GP", { uk_gp_registered_2_years: "No", status: "ineligible", ineligible_reason: "Not registered with UK GP for 2+ years" });
      return;
    }
    setStep(13);
    firePartial("Step 13 — Bank Details", { uk_gp_registered_2_years: "Yes" });
  };

  const handleSubmit = async () => {
    setSending(true);
    setEmailError(false);
    try {
      const completePayload = buildApplicationPayload({
        coverLevel, coverTypeLabel, price, band,
        salutation, firstName, lastName, email, phone,
        addr1, addr2, city, postcode,
        dobDay, dobMonth, dobYear,
        employment, income, occupation,
        hours16, gpReg, sortCode, accountNum,
        accountName, paymentDay,
        optOutEmail, optOutPhone, optOutSMS, optOutPost,
        smokerStatus, everSmoked, lastSmokedMonth, lastSmokedYear,
      });
      // Single webhook call with session_id, status: "complete", and all fields
      const sessionPayload = {
        session_id: sessionId.current,
        stage: "Complete — Application Submitted",
        ...completePayload,
      };
      const r = await fetch(ZAPIER_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify(sessionPayload),
      });
      if (!r.ok) throw new Error(`Webhook error: ${r.status}`);
    } catch (e) {
      console.error(e);
      setEmailError(true);
    }
    setSending(false);
    setSubmitted(true);
  };

  // ─── CONTENT ─────────────────────────────────────────────────────────────────
  const renderContent = () => {

    if (submitted) {
      // ── Office hours logic ──
      // Mon–Thu 9:30–17:00, Fri 9:30–16:00
      const now = new Date();
      const day = now.getDay(); // 0=Sun, 1=Mon … 5=Fri, 6=Sat
      const h = now.getHours();
      const m = now.getMinutes();
      const mins = h * 60 + m;
      const openMins = 9 * 60 + 30;
      const closeMins = day === 5 ? 16 * 60 : 17 * 60;
      const isWeekday = day >= 1 && day <= 5;
      const isOpen = isWeekday && mins >= openMins && mins < closeMins;

      const nextWorkingDay = () => {
        const d = new Date(now);
        do { d.setDate(d.getDate() + 1); } while (d.getDay() === 0 || d.getDay() === 6);
        return d.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" });
      };

      const timingBg = isOpen ? GL : "#FFF9E6";
      const timingBorder = isOpen ? G : "#d97706";
      const timingIcon = isOpen ? "\uD83D\uDFE2" : "\uD83D\uDFE1";
      const timingTitle = isOpen ? "We are processing your application now" : "Your application will be processed on the next working day";
      const timingBody = isOpen
        ? `Our team is in the office and will process your application today. You are not yet covered — your policy will be set up and confirmed by our advisers, and cover begins once the policy is in force.`
        : `Our office is currently closed (Mon–Thu 9:30–17:00, Fri 9:30–16:00). Your application will be processed on ${nextWorkingDay()}. You are not yet covered — cover begins once your policy has been set up and confirmed by our advisers.`;
      const timingColor = isOpen ? GD : "#92400E";

      return (
        <div style={{ textAlign: "center" }}>
          <div style={{ width: 60, height: 60, borderRadius: "50%", background: GL, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 18px", fontSize: 26 }}>
            {"\u2705"}
          </div>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: GD, margin: "0 0 10px", fontFamily: "'DM Serif Display', Georgia, serif" }}>
            {isCustomCover ? "Enquiry Received" : "Application Received"}
          </h2>
          <p style={{ color: "#374151", lineHeight: 1.7, margin: "0 0 18px" }}>
            {isCustomCover
              ? `Thank you, ${firstName}. Your custom cover enquiry has been submitted. A Baker Hudson Health adviser will be in touch to build your personalised plan.`
              : `Thank you, ${firstName}. Your ${coverLevel} \u2013 ${coverTypeLabel} application at \u00a3${price}/month has been submitted successfully.`
            }
          </p>

          {/* Prominent timing notice — only shown for standard applications, not custom enquiries */}
          {!isCustomCover && (
            <div style={{ background: timingBg, border: `2px solid ${timingBorder}`, borderRadius: 12, padding: "16px 18px", marginBottom: 18, textAlign: "left" }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                <span style={{ fontSize: 20, flexShrink: 0 }}>{timingIcon}</span>
                <div>
                  <div style={{ fontWeight: 800, fontSize: 15, color: timingColor, marginBottom: 6 }}>{timingTitle}</div>
                  <div style={{ fontSize: 13, color: timingColor, lineHeight: 1.6 }}>{timingBody}</div>
                </div>
              </div>
            </div>
          )}

          <div style={{ background: GL, borderRadius: 11, padding: "14px 18px", marginBottom: 16, textAlign: "left" }}>
            <div style={{ fontSize: 12, color: GD, fontWeight: 600, marginBottom: 9 }}>Application Summary</div>
            {[
              ["Cover Level", coverLevel],
              ["Cover Type", coverTypeLabel],
              ["Monthly Premium", `\u00a3${price}`],
              ["Name", `${firstName} ${lastName}`],
              ["Email", email],
            ].map(([k, v]) => (
              <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "4px 0", borderBottom: "1px solid #d1fae5", fontSize: 13 }}>
                <span style={{ color: "#6B7280" }}>{k}</span>
                <span style={{ fontWeight: 600, color: "#1f2937" }}>{v}</span>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 13, color: "#6B7280", margin: "0 0 14px" }}>
            A confirmation email will be sent to <strong>{email}</strong> once your policy has been set up.
          </p>
          {emailError && (
            <div style={{ padding: "11px 13px", background: "#FEF3E2", borderRadius: 8, fontSize: 12, color: "#92400E", marginBottom: 14 }}>
              {"\u26a0\ufe0f"} Notification email could not be sent automatically. Please contact{" "}
              <a href="mailto:m.griffiths@bakerhudsonhealth.com" style={{ color: "#92400E" }}>m.griffiths@bakerhudsonhealth.com</a>{" "}
              to confirm receipt (Zapier webhook not yet configured).
            </div>
          )}
          <div style={{ fontSize: 13, color: G, fontWeight: 600 }}>
            {"\uD83C\uDF81"} Get a {"\u00a3"}50 voucher for every friend you refer who takes out a policy!
          </div>
        </div>
      );
    }

    if (ineligible) return (
      <div style={{ textAlign: "center" }}>
        <div style={{ width: 60, height: 60, borderRadius: "50%", background: "#FEF3E2", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 18px", fontSize: 26 }}>
          {"\u2139\uFE0F"}
        </div>
        <h2 style={{ fontSize: 20, fontWeight: 800, color: "#92400E", margin: "0 0 12px", fontFamily: "'DM Serif Display', Georgia, serif" }}>
          Not Eligible at This Time
        </h2>
        <p style={{ color: "#374151", lineHeight: 1.7, margin: "0 0 22px" }}>{ineligibleReason}</p>
        <a href="https://www.bakerhudsonhealth.com" style={{ display: "inline-block", background: G, color: "#fff", textDecoration: "none", padding: "12px 26px", borderRadius: 8, fontWeight: 600, fontSize: 14 }}>
          Return to Baker Hudson Health
        </a>
      </div>
    );

    // ── STEP 0 ──
    if (step === 0) {
      const dobValid = dobDay && dobMonth && dobYear && dobYear.length === 4;
      return (
        <div>
          <div style={{ textAlign: "center", marginBottom: 24 }}>
            <div style={{ display: "inline-block", background: G, borderRadius: 999, padding: "9px 26px", marginBottom: 14 }}>
              <span style={{ fontSize: 17, fontWeight: 700, color: "#fff", fontFamily: "'DM Sans', system-ui, sans-serif", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                Get Your Quotes &amp; Buy Online
              </span>
            </div>
            <p style={{ color: "#6B7280", fontSize: 14, margin: 0, lineHeight: 1.7 }}>
              Enter your date of birth below to{" "}
              <strong style={{ color: "#374151" }}>see your personalised prices instantly</strong>
              {" "}with no medical questions and no waiting. If you like what you see, you can{" "}
              <strong style={{ color: "#374151" }}>set up your policy in under 5 minutes</strong>
              {" "}without speaking to anyone.
            </p>
          </div>
          <div className="fs-tier-grid" style={{ marginBottom: 24 }}>
            <TierCard icon="🥉" tier="Bronze" sub="Essential cover" />
            <TierCard icon="🥈" tier="Silver" sub="Enhanced cover" />
            <TierCard icon="🥇" tier="Gold" sub="Comprehensive" />
            <div className="fs-custom-card">
              <CustomTierCard onSelect={() => {
                setIsCustomCover(true);
                setStep(4);
                firePartial("Step 4 — Custom Cover Enquiry (from stage 0)", { cover_level: "Custom" });
              }} />
            </div>
          </div>
          <Label>Your date of birth</Label>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 2fr", gap: 11, marginBottom: 6 }}>
            {[
              { label: "Day",   val: dobDay,   set: setDobDay,   max: 2, ph: "DD",   nextRef: dobMonthRef },
              { label: "Month", val: dobMonth, set: setDobMonth, max: 2, ph: "MM",   nextRef: dobYearRef, ref: dobMonthRef },
              { label: "Year",  val: dobYear,  set: setDobYear,  max: 4, ph: "YYYY", ref: dobYearRef },
            ].map(({ label, val, set, max, ph, nextRef, ref: inputRef }) => (
              <div key={label}>
                <div style={{ fontSize: 11, color: "#9CA3AF", marginBottom: 4 }}>{label}</div>
                <input
                  ref={inputRef}
                  type="text"
                  inputMode="numeric"
                  value={val}
                  placeholder={ph}
                  maxLength={max}
                  style={{
                    width: "100%",
                    padding: "11px 13px",
                    borderRadius: 8,
                    border: "1.5px solid #d1d5db",
                    fontSize: 15,
                    fontFamily: "inherit",
                    outline: "none",
                    boxSizing: "border-box",
                    color: "#1f2937",
                    background: "#fff",
                    textAlign: "center",
                    transition: "border-color 0.2s",
                  }}
                  onFocus={e => { e.target.style.borderColor = G; }}
                  onBlur={e => { e.target.style.borderColor = "#d1d5db"; }}
                  onChange={e => {
                    const v = e.target.value.replace(/\D/g, "").slice(0, max);
                    set(v);
                    if (v.length === max && nextRef) nextRef.current?.focus();
                  }}
                />
              </div>
            ))}
          </div>
          <div style={{ marginTop: 18 }}>
            <Btn onClick={handleDOBSubmit} disabled={!dobValid}>
              See My Quotes {"\u2192"}
            </Btn>
          </div>
          <p style={{ fontSize: 11, color: "#9CA3AF", margin: "12px 0 0" }}>
            Available for ages 18–60 {"\u00b7"} Premiums from {"\u00a3"}10/month {"\u00b7"} No medical questions
          </p>
        </div>
      );
    }

    // ── STEP 1 ──
    if (step === 1) return (
      <div>
        <Back onClick={() => setStep(0)} />
        <div style={{ marginBottom: 9 }}>
          <span style={{ fontSize: 11, background: GL, color: GD, borderRadius: 999, padding: "3px 11px", fontWeight: 600 }}>
            Age band: {BAND_LABELS[band]}
          </span>
        </div>
        <Q>Which level of cover would you like?</Q>
        <p className="fs-body" style={{ color: "#6B7280", margin: "0 0 16px" }}>
          Hover any column to see what is included. Click a tier to select it. You will choose your cover type on the next step.
        </p>
        <PricingTable band={band} selectedLevel={coverLevel} selectedType={coverType} onSelectLevel={(tier) => { setCoverLevel(tier); setIsCustomCover(false); }} onSelectType={setCoverType} onSelectCustom={() => { setIsCustomCover(true); setCoverLevel("Custom"); }} />
        <div style={{ marginTop: 22 }}>
          <Btn onClick={() => {
            if (isCustomCover || coverLevel === "Custom") {
              setStep(4);
              firePartial("Step 4 — Custom Cover Enquiry", { cover_level: "Custom" });
            } else {
              setStep(2);
              firePartial("Step 2 — Cover Type", { cover_level: coverLevel });
            }
          }} disabled={!coverLevel}>Continue {"\u2192"}</Btn>
        </div>
      </div>
    );

    // ── STEP 2 ──
    if (step === 2) {
      const prices = coverLevel ? PRICING[band][coverLevel] : null;
      return (
        <div>
          <Back onClick={() => setStep(1)} />
          <div style={{ marginBottom: 10, display: "inline-block", background: TIER_STYLE[coverLevel]?.bg || BRONZE_BG, borderRadius: 999, padding: "3px 11px", fontSize: 12, fontWeight: 600, color: TIER_STYLE[coverLevel]?.color || BRONZE_C }}>
            {coverLevel} cover selected
          </div>
          <Q>Confirm what you would like to protect against</Q>
          <p className="fs-body" style={{ color: "#6B7280", margin: "0 0 14px" }}>
            {coverType
              ? `You selected ${coverType === "AO" ? "Accidents Only" : "Illnesses & Accidents"} on the previous page — this is shown highlighted below. Both options include the same ${coverLevel} plan benefits above. You can change your selection here if you wish.`
              : `Both options include the same ${coverLevel} plan benefits shown above. The only difference is whether your cover includes illness as well as accidents.`}
          </p>
          {coverLevel && <BenefitSummaryPanel coverLevel={coverLevel} />}
          {prices && (
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                { key: "AO", label: "Accidents Only", desc: "Covers you if you are unable to work due to an accident or injury.", price: prices.AO, icon: "\uD83E\uDE79" },
                { key: "IA", label: "Illnesses & Accidents", desc: "Covers you if you are unable to work due to illness or an accident - our most comprehensive option.", price: prices.IA, icon: "\uD83C\uDFE5" },
              ].map(opt => (
                <CoverTypeCard key={opt.key} opt={opt} isSelected={coverType === opt.key} onSelect={setCoverType} />
              ))}
            </div>
          )}
          <div style={{ marginTop: 22 }}>
            <Btn onClick={() => { setStep(3); firePartial("Step 3 — Data Consent", { cover_type: coverType === "AO" ? "Accidents Only" : "Illnesses & Accidents", monthly_premium: price ? `\u00a3${price}` : "" }); }} disabled={!coverType}>Continue {"\u2192"}</Btn>
          </div>
        </div>
      );
    }

    // ── STEP 3 ──
    if (step === 3) return (
      <div>
        <Back onClick={() => setStep(2)} />
        <Q>How National Friendly will use your data</Q>
        <div className="fs-consent-box" style={{ color: "#374151", lineHeight: 1.75, marginBottom: 18, background: "#fff", borderRadius: 9, padding: "13px 15px", overflowY: "auto", border: "1px solid #e5e7eb" }}>
          <p style={{ margin: "0 0 10px" }}>
            The information that you provide in this form will be held and used by National Friendly for the purposes of providing their products and services. Please inform them at any time if your details change. The ways in which they will use your data is laid out in their{" "}
            <a href="https://nationalfriendly.co.uk/member/privacy-notices/" target="_blank" rel="noreferrer" style={{ color: G }}>Privacy Policy</a>. National Friendly will never share your data with any other companies for their marketing purposes, without your consent.
          </p>
          <p style={{ margin: 0 }}>
            National Friendly will always respect your preferences as to the information you receive from them. If you do not wish to be kept up to date with competitions, offers, news, products, and services, please tick the options below. You can update your preferences at any time by calling{" "}
            <a href="tel:03330146244" style={{ color: G }}>0333 014 6244</a> or online at{" "}
            <a href="https://nationalfriendly.co.uk/preferences" target="_blank" rel="noreferrer" style={{ color: G }}>nationalfriendly.co.uk/preferences</a>.
          </p>
        </div>
        <label style={{ display: "flex", gap: 11, alignItems: "flex-start", cursor: "pointer" }}>
          <input type="checkbox" checked={consent} onChange={e => setConsent(e.target.checked)} style={{ marginTop: 3, accentColor: G, width: 17, height: 17, flexShrink: 0 }} />
          <span style={{ color: "#374151", lineHeight: 1.6 }}>
            I have read and understood how National Friendly will use my personal data as described above.
          </span>
        </label>

        {/* Marketing opt-out section */}
        <div style={{ marginTop: 20, background: "#f9fafb", borderRadius: 10, padding: "14px 16px", border: "1px solid #e5e7eb" }}>
          <div className="fs-small" style={{ fontWeight: 700, color: "#374151", marginBottom: 4 }}>
            Marketing preferences (optional)
          </div>
          <div className="fs-body" style={{ color: "#6B7280", marginBottom: 12, lineHeight: 1.6 }}>
            If you do <strong>not</strong> wish to receive marketing communications from National Friendly, please tick the relevant boxes below:
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {[
              { label: "Email",     checked: optOutEmail, set: setOptOutEmail },
              { label: "Phone",     checked: optOutPhone, set: setOptOutPhone },
              { label: "SMS/Text",  checked: optOutSMS,   set: setOptOutSMS },
              { label: "Post",      checked: optOutPost,  set: setOptOutPost },
            ].map(({ label, checked, set }) => (
              <label key={label} style={{ display: "flex", gap: 10, alignItems: "center", cursor: "pointer", padding: "8px 10px", borderRadius: 8, background: checked ? GL : "#fff", border: `1.5px solid ${checked ? G : "#e5e7eb"}`, transition: "all 0.15s" }}>
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={e => set(e.target.checked)}
                  style={{ accentColor: G, width: 16, height: 16, flexShrink: 0 }}
                />
                <span className="fs-body" style={{ fontWeight: checked ? 600 : 400, color: checked ? GD : "#374151" }}>
                  Opt out of {label}
                </span>
              </label>
            ))}
          </div>
        </div>

        <div style={{ marginTop: 22 }}>
          <Btn onClick={() => {
            firePartial("Step 4 — Personal Details", {
              opt_out_email: optOutEmail ? "Opt out" : "",
              opt_out_phone: optOutPhone ? "Opt out" : "",
              opt_out_sms: optOutSMS ? "Opt out" : "",
              opt_out_post: optOutPost ? "Opt out" : "",
            });
            setStep(4);
          }} disabled={!consent}>I Agree &amp; Continue {"\u2192"}</Btn>
        </div>
      </div>
    );

    // ── STEP 4 ──
    if (step === 4) {
      const valid = salutation && firstName && lastName && email && phone && email.includes("@");
      return (
        <div>
          <Back onClick={() => isCustomCover ? setStep(1) : setStep(3)} />
          {isCustomCover && (
            <div style={{ background: GL, border: `1.5px solid ${G}`, borderRadius: 12, padding: "14px 16px", marginBottom: 20 }}>
              <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                <span style={{ fontSize: 20 }}>✨</span>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 15, color: GD, marginBottom: 4 }}>Customised Cover Enquiry</div>
                  <div className="fs-body" style={{ color: "#374151", lineHeight: 1.6 }}>
                    To build a fully customised income protection plan, one of our advisers will need to assess your circumstances in more detail. Please provide your details to allow us to give you a suitable quote.
                  </div>
                </div>
              </div>
            </div>
          )}
          <Q>Please provide your details</Q>
          <div style={{ marginBottom: 12 }}>
            <Label>Salutation</Label>
            <div style={{ position: "relative" }}>
              <select
                value={salutation}
                onChange={e => setSalutation(e.target.value)}
                style={{
                  width: "100%",
                  padding: "11px 36px 11px 13px",
                  borderRadius: 8,
                  border: `1.5px solid ${salutation ? G : "#d1d5db"}`,
                  fontSize: 15,
                  fontFamily: "inherit",
                  outline: "none",
                  color: salutation ? "#1f2937" : "#9CA3AF",
                  background: "#fff",
                  appearance: "none",
                  cursor: "pointer",
                  transition: "border-color 0.2s",
                }}
              >
                <option value="">Select...</option>
                {["Mr", "Mrs", "Miss", "Ms", "Mx", "Dr", "Prof", "Rev", "Sir", "Lady"].map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
              <span style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: "#6B7280", fontSize: 14 }}>{"\u25bc"}</span>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
            <div><Label>First name</Label><Input value={firstName} onChange={e => setFirstName(e.target.value)} placeholder="Jane" /></div>
            <div><Label>Last name</Label><Input value={lastName} onChange={e => setLastName(e.target.value)} placeholder="Smith" /></div>
          </div>
          <div style={{ marginBottom: 12 }}><Label>Email address</Label><Input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="jane@example.com" /></div>
          <div><Label>Phone number</Label><Input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="07700 900000" /></div>
          <div style={{ marginTop: 22 }}><Btn onClick={() => { setStep(5); firePartial("Step 5 — Address", { salutation, first_name: firstName, last_name: lastName, full_name: `${salutation} ${firstName} ${lastName}`, email, phone }); }} disabled={!valid}>Continue {"\u2192"}</Btn></div>
        </div>
      );
    }

    // ── STEP 5 ──
    if (step === 5) {
      const valid = addr1 && city && postcode;
      return (
        <div>
          <Back onClick={() => setStep(4)} />
          <Q>Please provide your address</Q>
          <div style={{ marginBottom: 12 }}><Label>Address line 1</Label><Input value={addr1} onChange={e => setAddr1(e.target.value)} placeholder="123 High Street" /></div>
          <div style={{ marginBottom: 12 }}><Label>Address line 2 (optional)</Label><Input value={addr2} onChange={e => setAddr2(e.target.value)} placeholder="Flat 4" /></div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div><Label>City / Town</Label><Input value={city} onChange={e => setCity(e.target.value)} placeholder="London" /></div>
            <div><Label>Postcode</Label><Input value={postcode} onChange={e => setPostcode(e.target.value.toUpperCase())} placeholder="SW1A 1AA" /></div>
          </div>
          <div style={{ marginTop: 22 }}><Btn onClick={() => { setStep(7); firePartial("Step 7 — Employment", { address: [addr1, addr2, city, postcode].filter(Boolean).join(", ") }); }} disabled={!valid}>Continue {"\u2192"}</Btn></div>
        </div>
      );
    }

    // ── STEP 7 ──
    if (step === 7) return (
      <div>
        <Back onClick={() => setStep(5)} />
        <Q>What is your employment status?</Q>
        <div style={{ display: "flex", gap: 11, marginBottom: 22 }}>
          <YesNoBtn label="Employed" selected={employment === "Employed"} onClick={() => setEmployment("Employed")} />
          <YesNoBtn label="Self-employed" selected={employment === "Self-employed"} onClick={() => setEmployment("Self-employed")} />
        </div>
        <Btn onClick={() => { setStep(8); firePartial("Step 8 — Income", { employment_status: employment }); }} disabled={!employment}>Continue {"\u2192"}</Btn>
      </div>
    );

    // ── STEP 8 ──
    if (step === 8) return (
      <div>
        <Back onClick={() => setStep(7)} />
        <Q>What is your gross annual income?</Q>
        <p className="fs-body" style={{ color: "#6B7280", margin: "0 0 16px" }}>Please enter your income before tax and deductions.</p>
        <div style={{ position: "relative" }}>
          <span style={{ position: "absolute", left: 13, top: "50%", transform: "translateY(-50%)", fontSize: 15, color: "#374151", fontWeight: 600, pointerEvents: "none" }}>{"\u00a3"}</span>
          <input
            type="number"
            value={income}
            onChange={e => setIncome(e.target.value)}
            placeholder="e.g. 35000"
            style={{ width: "100%", padding: "11px 13px 11px 26px", borderRadius: 8, border: "1.5px solid #d1d5db", fontSize: 15, fontFamily: "inherit", outline: "none", boxSizing: "border-box", color: "#1f2937" }}
            onFocus={e => { e.target.style.borderColor = G; }}
            onBlur={e => { e.target.style.borderColor = "#d1d5db"; }}
          />
        </div>
        <div style={{ marginTop: 22 }}><Btn onClick={() => {
          setStep(9);
          firePartial("Step 9 — Occupation", { gross_annual_income: `\u00a3${Number(income).toLocaleString("en-GB")}` });
        }} disabled={!income || parseFloat(income) < 1}>Continue {"\u2192"}</Btn></div>
      </div>
    );

    // ── STEP 9 ──
    if (step === 9) return (
      <div>
        <Back onClick={() => setStep(8)} />
        <Q>What is your occupation?</Q>
        <div ref={occRef} style={{ position: "relative" }}>
          <Input
            value={occSearch}
            onChange={e => { setOccSearch(e.target.value); setOccupation(""); setShowOccDrop(true); }}
            onFocus={() => setShowOccDrop(true)}
            placeholder="Search your occupation..."
          />
          {occupation && (
            <div style={{ marginTop: 7, padding: "7px 11px", background: GL, borderRadius: 7, fontSize: 13, color: GD, fontWeight: 600 }}>
              Selected: {occupation}
            </div>
          )}
          {showOccDrop && occSearch && filteredOccs.length > 0 && (
            <div style={{ position: "absolute", top: "100%", left: 0, right: 0, background: "#fff", border: "1.5px solid #e5e7eb", borderRadius: 9, boxShadow: "0 4px 16px rgba(0,0,0,0.12)", zIndex: 50, maxHeight: 230, overflowY: "auto" }}>
              {filteredOccs.map(o => (
                <div
                  key={o}
                  onMouseDown={() => { setOccupation(o); setOccSearch(o); setShowOccDrop(false); }}
                  style={{ padding: "9px 13px", cursor: "pointer", fontSize: 13, color: "#374151", borderBottom: "1px solid #f3f4f6" }}
                  onMouseEnter={e => { e.currentTarget.style.background = GL; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}
                >
                  {o}
                </div>
              ))}
            </div>
          )}
        </div>
        <div style={{ marginTop: 22 }}><Btn onClick={() => {
          firePartial("Step 10 — Hours / Smoker Status", { occupation });
          if (isCustomCover) {
            setStep(16);
          } else {
            setStep(10);
          }
        }} disabled={!occupation}>{isCustomCover ? "Continue \u2192" : "Continue \u2192"}</Btn></div>
      </div>
    );

    // ── STEP 10 ──
    if (step === 10) return (
      <div>
        <Back onClick={() => setStep(9)} />
        <Q>Do you work more than 16 hours per week?</Q>
        <p className="fs-body" style={{ color: "#6B7280", margin: "0 0 18px" }}>
          Friendly Shield is available to people in regular employment of at least 16 hours per week.
        </p>
        <div style={{ display: "flex", gap: 11 }}>
          <YesNoBtn label="Yes" selected={hours16 === true} onClick={() => handleHoursAnswer(true)} />
          <YesNoBtn label="No" selected={hours16 === false} onClick={() => handleHoursAnswer(false)} />
        </div>
      </div>
    );

    // ── STEP 12 ──
    if (step === 12) return (
      <div>
        <Back onClick={() => setStep(10)} />
        <Q>Have you been registered with a UK GP for at least the last 2 years?</Q>
        <p className="fs-body" style={{ color: "#6B7280", margin: "0 0 18px" }}>
          This is a requirement for income protection cover with National Friendly.
        </p>
        <div style={{ display: "flex", gap: 11 }}>
          <YesNoBtn label="Yes" selected={gpReg === true} onClick={() => handleGPAnswer(true)} />
          <YesNoBtn label="No" selected={gpReg === false} onClick={() => handleGPAnswer(false)} />
        </div>
      </div>
    );

    // ── STEP 13 ──
    if (step === 13) {
      const scDigits = sortCode.replace(/\D/g, "");
      const valid = scDigits.length === 6 && accountNum.replace(/\D/g, "").length === 8 && accountName.trim().length > 0 && paymentDay !== "";
      const ordinal = d => {
        if (d >= 11 && d <= 13) return `${d}th`;
        const s = ["th","st","nd","rd"];
        return `${d}${s[d % 10] || "th"}`;
      };
      return (
        <div>
          <Back onClick={() => setStep(12)} />
          <Q>Please provide your bank details</Q>
          <p className="fs-body" style={{ color: "#6B7280", margin: "0 0 16px" }}>
            Your premium of <strong style={{ color: G }}>{"\u00a3"}{price}/month</strong> will be collected by Direct Debit.
          </p>
          <div style={{ marginBottom: 12 }}>
            <Label>Name on bank account</Label>
            <Input value={accountName} onChange={e => setAccountName(e.target.value)} placeholder="e.g. Jane Smith" />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
            <div><Label>Sort code</Label><Input value={sortCode} onChange={e => setSortCode(fmtSortCode(e.target.value))} placeholder="00-00-00" maxLength={8} /></div>
            <div><Label>Account number</Label><Input value={accountNum} onChange={e => setAccountNum(e.target.value.replace(/\D/g, "").slice(0, 8))} placeholder="00000000" maxLength={8} /></div>
          </div>
          <div style={{ marginBottom: 12 }}>
            <Label>Preferred payment date each month</Label>
            <div style={{ position: "relative" }}>
              <select
                value={paymentDay}
                onChange={e => setPaymentDay(e.target.value ? parseInt(e.target.value) : "")}
                style={{
                  width: "100%",
                  padding: "11px 36px 11px 13px",
                  borderRadius: 8,
                  border: `1.5px solid ${paymentDay ? G : "#d1d5db"}`,
                  fontSize: 15,
                  fontFamily: "inherit",
                  outline: "none",
                  color: paymentDay ? "#1f2937" : "#9CA3AF",
                  background: "#fff",
                  appearance: "none",
                  cursor: "pointer",
                  transition: "border-color 0.2s",
                }}
              >
                <option value="">Select a date...</option>
                {Array.from({ length: 28 }, (_, i) => i + 1).map(d => {
                  const sfx = (d >= 11 && d <= 13) ? "th" : (["th","st","nd","rd"][d % 10] || "th");
                  return <option key={d} value={d}>{d}{sfx} of each month</option>;
                })}
              </select>
              <span style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: "#6B7280", fontSize: 14 }}>{"\u25bc"}</span>
            </div>
            {paymentDay && (
              <div style={{ marginTop: 7, fontSize: 13, color: GD, fontWeight: 600 }}>
                {"\u2713"} Payment will be collected on the <strong>{ordinal(paymentDay)}</strong> of each month.
              </div>
            )}
          </div>
          <div style={{ marginTop: 14, background: "#f9fafb", borderRadius: 9, padding: "13px 15px", border: "1px solid #e5e7eb", fontSize: 13, color: "#374151", lineHeight: 1.7 }}>
            <p style={{ margin: "0 0 10px" }}>
              If there{"'"}s not 14 days between the date of this application and your preferred date, the next available direct debit date will be used to collect your first premium. Your chosen date will then be used for all other direct debits.
            </p>
            <p style={{ margin: "0 0 10px" }}>
              Please note that this Direct Debit, whilst being setup online, will still be covered by the standard safeguards and guarantees under the Direct Debit Scheme.
            </p>
            <p style={{ margin: "0 0 10px" }}>
              You confirm that this account is in your name and you are the only signatory required to authorise payments from the account. If this is a company account, you confirm that you are authorised to set up Direct Debits.
            </p>
            <p style={{ margin: "0 0 10px" }}>
              By continuing, you confirm that you understand that your Direct Debit will be taken from this account each month and will appear on bank statements as <strong>National Friendly</strong>.
            </p>
            <p style={{ margin: 0 }}>
              <a href="https://nationalfriendly.co.uk/member/direct-debit-guarantee/" target="_blank" rel="noreferrer" style={{ color: G, fontWeight: 600 }}>
                View and print the Direct Debit Guarantee
              </a>
            </p>
          </div>
          <div style={{ marginTop: 22 }}><Btn onClick={() => { setStep(14); firePartial("Step 14 — Declaration & Review", { account_name: accountName, payment_day: `${ordinal(paymentDay)} of each month` }); }} disabled={!valid}>Continue {"\u2192"}</Btn></div>
        </div>
      );
    }

    // ── STEP 14 ──
    if (step === 14) return (
      <div>
        <Back onClick={() => setStep(13)} />
        <Q>Review &amp; Submit Your Application</Q>
        <div style={{ background: "#f9fafb", borderRadius: 11, padding: "13px 15px", marginBottom: 18 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#6B7280", marginBottom: 9, textTransform: "uppercase", letterSpacing: "0.05em" }}>
            Application Summary
          </div>
          {[
            ["Cover", `${coverLevel} \u2013 ${coverTypeLabel}`],
            ["Monthly Premium", `\u00a3${price}`],
            ["Name", `${firstName} ${lastName}`],
            ["Email", email],
            ["DOB", `${dobDay}/${dobMonth}/${dobYear}`],
            ["Employment", employment],
            ["Annual Income", `\u00a3${parseInt(income).toLocaleString()}`],
            ["Occupation", occupation],
            ["Account Name", accountName],
            ["Payment Date", paymentDay ? (() => { const d = paymentDay; const sfx = (d >= 11 && d <= 13) ? "th" : (["th","st","nd","rd"][d % 10] || "th"); return `${d}${sfx} of each month`; })() : ""],
          ].map(([k, v]) => (
            <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "4px 0", borderBottom: "1px solid #e5e7eb", fontSize: 12 }}>
              <span style={{ color: "#9CA3AF" }}>{k}</span>
              <span style={{ fontWeight: 600, color: "#374151", textAlign: "right", maxWidth: "58%" }}>{v}</span>
            </div>
          ))}
        </div>
        <div className="fs-body" style={{ color: "#374151", lineHeight: 1.7, background: "#f9fafb", borderRadius: 9, padding: "11px 13px", marginBottom: 16 }}>
          By submitting this application, I confirm that I have read and understood the{" "}
          <a href="https://nationalfriendly.co.uk/adviser/friendly-shield/friendly-shield-declaration/" target="_blank" rel="noreferrer" style={{ color: G, fontWeight: 600 }}>declaration</a>,{" "}
          <a href="https://nationalfriendly.co.uk/member/privacy-notices/" target="_blank" rel="noreferrer" style={{ color: G, fontWeight: 600 }}>privacy policy</a>{" "}
          and the product information provided (or that I will when the welcome pack is received).
        </div>
        <label style={{ display: "flex", gap: 11, alignItems: "flex-start", cursor: "pointer" }}>
          <input type="checkbox" checked={declaration} onChange={e => setDeclaration(e.target.checked)} style={{ marginTop: 3, accentColor: G, width: 17, height: 17, flexShrink: 0 }} />
          <span style={{ color: "#374151", lineHeight: 1.6 }}>I confirm I have read and agree to the declaration above.</span>
        </label>
        <div style={{ marginTop: 22 }}>
          <Btn onClick={handleSubmit} disabled={!declaration || sending}>
            {sending ? "Submitting\u2026" : `Submit Application \u2192`}
          </Btn>
        </div>
      </div>
    );

    // ── STEP 16: SMOKER STATUS (custom cover only) ──
    if (step === 16) {
      const showLastSmoked = smokerStatus === false && everSmoked === true;
      const valid = smokerStatus !== null && (smokerStatus === true || (everSmoked !== null && (everSmoked === false || (lastSmokedMonth && lastSmokedYear && lastSmokedYear.length === 4))));
      return (
        <div>
          <Back onClick={() => setStep(9)} />
          <Q>Smoking status</Q>

          {/* Current smoker */}
          <div style={{ marginBottom: 20 }}>
            <Label>Do you currently smoke, including e-cigarettes or any nicotine products?</Label>
            <div style={{ display: "flex", gap: 11 }}>
              <YesNoBtn label="Yes" selected={smokerStatus === true} onClick={() => { setSmokerStatus(true); setEverSmoked(null); setLastSmokedMonth(""); setLastSmokedYear(""); }} />
              <YesNoBtn label="No" selected={smokerStatus === false} onClick={() => setSmokerStatus(false)} />
            </div>
          </div>

          {/* Ever smoked — only shown if not a current smoker */}
          {smokerStatus === false && (
            <div style={{ marginBottom: 20 }}>
              <Label>Have you ever smoked?</Label>
              <div style={{ display: "flex", gap: 11 }}>
                <YesNoBtn label="Yes" selected={everSmoked === true} onClick={() => setEverSmoked(true)} />
                <YesNoBtn label="No" selected={everSmoked === false} onClick={() => { setEverSmoked(false); setLastSmokedMonth(""); setLastSmokedYear(""); }} />
              </div>
            </div>
          )}

          {/* Last smoked date — only shown if ever smoked */}
          {showLastSmoked && (
            <div style={{ marginBottom: 20 }}>
              <Label>When did you last smoke? (mm/yyyy)</Label>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 12 }}>
                <div>
                  <div style={{ fontSize: 11, color: "#9CA3AF", marginBottom: 4 }}>Month</div>
                  <Input
                    value={lastSmokedMonth}
                    onChange={e => setLastSmokedMonth(e.target.value.replace(/\D/g, "").slice(0, 2))}
                    placeholder="MM"
                    maxLength={2}
                  />
                </div>
                <div>
                  <div style={{ fontSize: 11, color: "#9CA3AF", marginBottom: 4 }}>Year</div>
                  <Input
                    value={lastSmokedYear}
                    onChange={e => setLastSmokedYear(e.target.value.replace(/\D/g, "").slice(0, 4))}
                    placeholder="YYYY"
                    maxLength={4}
                  />
                </div>
              </div>
            </div>
          )}

          <div style={{ marginTop: 8 }}>
            <Btn onClick={() => {
              firePartial("Step 16 — Smoker Status", {
                smoker: smokerStatus ? "Yes" : "No",
                ever_smoked: everSmoked === true ? "Yes" : everSmoked === false ? "No" : "",
                last_smoked: showLastSmoked ? `${lastSmokedMonth}/${lastSmokedYear}` : "",
              });
              setStep(15);
            }} disabled={!valid}>
              Review My Details {"\u2192"}
            </Btn>
          </div>
        </div>
      );
    }

    // ── STEP 15: CUSTOM COVER ENQUIRY SUMMARY ──
    if (step === 15) {
      const handleSubmitEnquiry = async () => {
        setSending(true); setEmailError(false);
        try {
          await sendApplicationEmail({
            coverLevel: "Custom Cover Enquiry",
            coverTypeLabel: "Tailored Income Protection",
            price: "TBC",
            band,
            salutation, firstName, lastName, email, phone,
            addr1, addr2, city, postcode,
            dobDay, dobMonth, dobYear,
            employment, income, occupation,
            hours16: null, gpReg: null, sortCode: "", accountNum: "",
          });
          firePartial("Custom Enquiry Submitted", { status: "custom_enquiry" });
        } catch (e) {
          console.error(e);
          setEmailError(true);
        }
        setSending(false);
        setSubmitted(true);
      };

      return (
        <div>
          <Back onClick={() => setStep(16)} />
          <div style={{ background: GL, border: `1.5px solid ${G}`, borderRadius: 12, padding: "14px 16px", marginBottom: 20 }}>
            <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
              <span style={{ fontSize: 20 }}>✨</span>
              <div>
                <div style={{ fontWeight: 700, fontSize: 15, color: GD, marginBottom: 4 }}>Customised Cover Enquiry</div>
                <div className="fs-body" style={{ color: "#374151" }}>
                  One of our advisers will build a tailored income protection plan around your specific needs.
                </div>
              </div>
            </div>
          </div>

          <Q>Your details</Q>
          <div style={{ background: "#f9fafb", borderRadius: 12, padding: "14px 16px", marginBottom: 24 }}>
            {[
              ["Name", `${salutation} ${firstName} ${lastName}`],
              ["Email", email],
              ["Phone", phone],
              ["Address", [addr1, addr2, city, postcode].filter(Boolean).join(", ")],
              ["Employment", employment],
              ["Annual Income", income ? `\u00a3${Number(income).toLocaleString("en-GB")}` : ""],
              ["Occupation", occupation],
              ["Currently smokes", smokerStatus === true ? "Yes" : smokerStatus === false ? "No" : ""],
              ["Ever smoked", smokerStatus === false && everSmoked !== null ? (everSmoked ? "Yes" : "No") : ""],
              ["Last smoked", everSmoked && lastSmokedMonth && lastSmokedYear ? `${lastSmokedMonth}/${lastSmokedYear}` : ""],
            ].map(([k, v]) => v ? (
              <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "5px 0", borderBottom: "1px solid #e5e7eb", fontSize: 13 }}>
                <span style={{ color: "#9CA3AF" }}>{k}</span>
                <span className="fs-small" style={{ fontWeight: 600, color: "#374151", textAlign: "right", maxWidth: "62%" }}>{v}</span>
              </div>
            ) : null)}
          </div>

          <div className="fs-body" style={{ color: "#6B7280", marginBottom: 20, lineHeight: 1.6 }}>
            How would you like us to get in touch?
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {/* Option 1: Book a call */}
            <a
              href="https://bakerhudsonhealthltd.pipedrive.com/scheduler/J10OGAf3/initial-information-for-insurance"
              target="_blank"
              rel="noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                background: G,
                color: "#fff",
                textDecoration: "none",
                borderRadius: 12,
                padding: "18px 22px",
                transition: "background 0.2s",
              }}
              onMouseEnter={e => e.currentTarget.style.background = GD}
              onMouseLeave={e => e.currentTarget.style.background = G}
            >
              <span style={{ fontSize: 28, flexShrink: 0 }}>📅</span>
              <div>
                <div style={{ fontWeight: 700, fontSize: 16 }}>Request a Call</div>
                <div style={{ fontSize: 13, opacity: 0.85, marginTop: 2 }}>Book a convenient time for one of our advisers to call you and build your personalised quote.</div>
              </div>
              <span style={{ marginLeft: "auto", fontSize: 18, flexShrink: 0 }}>{"\u2192"}</span>
            </a>

            {/* Option 2: Submit enquiry */}
            <button
              onClick={handleSubmitEnquiry}
              disabled={sending}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                background: "#fff",
                color: "#374151",
                border: `2px solid ${G}`,
                borderRadius: 12,
                padding: "18px 22px",
                cursor: sending ? "not-allowed" : "pointer",
                fontFamily: "inherit",
                textAlign: "left",
                width: "100%",
                transition: "background 0.2s",
              }}
              onMouseEnter={e => { if (!sending) e.currentTarget.style.background = GL; }}
              onMouseLeave={e => { e.currentTarget.style.background = "#fff"; }}
            >
              <span style={{ fontSize: 28, flexShrink: 0 }}>📧</span>
              <div>
                <div style={{ fontWeight: 700, fontSize: 16, color: GD }}>Submit an Enquiry</div>
                <div style={{ fontSize: 13, color: "#6B7280", marginTop: 2 }}>Send your details to our team and we{"'"}ll be in touch to discuss your options.</div>
              </div>
              <span style={{ marginLeft: "auto", fontSize: 18, flexShrink: 0, color: G }}>{sending ? "\u23f3" : "\u2192"}</span>
            </button>
          </div>

          {emailError && (
            <div style={{ marginTop: 14, padding: "11px 13px", background: "#FEF3E2", borderRadius: 8, fontSize: 12, color: "#92400E" }}>
              {"\u26a0\ufe0f"} Could not send automatically — please contact{" "}
              <a href="mailto:m.griffiths@bakerhudsonhealth.com" style={{ color: "#92400E" }}>m.griffiths@bakerhudsonhealth.com</a>.
            </div>
          )}
        </div>
      );
    }

    return null;
  };

  // ─── SHELL ────────────────────────────────────────────────────────────────────
  return (
    <div className="fs-page-bg" style={{ fontFamily: "'DM Sans', system-ui, sans-serif", minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=DM+Sans:wght@400;500;600;700&display=swap');
        .fs-prose { font-size: 13px; line-height: 1.75; }
        .fs-label { font-size: 14px; }
        .fs-q { font-size: 20px; }
        .fs-consent-box { font-size: 13px; max-height: 180px; }
        .fs-outer { padding: 0; }
        .fs-card { border-radius: 0; max-width: 100%; margin: 0; box-shadow: none !important; }
        .fs-content { padding: 22px 22px 32px; }
        .fs-brand-title { font-size: 14px; }
        .fs-brand-sub { font-size: 10px; }
        .fs-seg-label { font-size: 10px; }
        .fs-seg-icon { font-size: 12px; }
        .fs-seg-bar { height: 5px; }
        /* Utility size classes */
        .fs-body   { font-size: 13px; line-height: 1.6; }
        .fs-small  { font-size: 11px; }
        .fs-xsmall { font-size: 10px; }
        .fs-price  { font-size: 17px; font-weight: 800; }
        .fs-barprice { font-size: 19px; font-weight: 800; }

        /* hover vs tap label */
        .fs-tap-hint::after { content: "tap"; }
        @media (min-width: 768px) {
          .fs-tap-hint::after { content: "hover"; }
        }
        /* Mobile: no green background, just plain page */
        .fs-page-bg { background: #f3f4f6; }
        @media (min-width: 768px) {
          .fs-page-bg { background: linear-gradient(145deg, #0f4c2a 0%, #1E824C 55%, #2d9e62 100%); }
        }
        .fs-tier-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 9px; }
        .fs-custom-card { grid-column: 1 / -1; }
        @media (min-width: 520px) {
          .fs-tier-grid { grid-template-columns: 1fr 1fr 1fr 1fr; gap: 9px; }
          .fs-custom-card { grid-column: auto; }
        }
        @media (min-width: 768px) {
          .fs-tier-grid { gap: 20px; }
        }

        /* Mobile: pricing table — 4-col main grid, custom column drops to bottom row */
        .fs-price-grid {
          grid-template-columns: 1fr 1fr 1fr 1fr !important;
          grid-template-rows: auto auto auto auto !important;
        }
        .fs-custom-header {
          grid-column: 1 / 3 !important;
          grid-row: 4 !important;
        }
        .fs-custom-cell {
          grid-column: 3 / 5 !important;
          grid-row: 4 !important;
        }
        @media (min-width: 600px) {
          .fs-price-grid {
            grid-template-columns: 1fr 1fr 1fr 1fr 1.1fr !important;
            grid-template-rows: auto auto auto !important;
          }
          .fs-custom-header {
            grid-column: 5 !important;
            grid-row: 1 !important;
          }
          .fs-custom-cell {
            grid-column: 5 !important;
            grid-row: 2 / 4 !important;
          }
        }
        /* Inactive pills: emoji only, centred */
        .fs-pill { transition: all 0.3s ease; }
        .fs-pill--inactive { flex: 0 0 auto !important; width: 44px; min-height: 44px !important; padding: 0 !important; justify-content: center !important; }
        .fs-pill--inactive .fs-pill-text { display: none; }
        .fs-pill--inactive .fs-seg-icon { font-size: 20px !important; }
        /* Active pill: full width, expanded */
        .fs-pill--active { flex: 1 !important; min-height: 52px !important; }
        .fs-pill--active .fs-pill-text { display: flex; }
        /* Bar wrappers shrink/expand to match pills */
        .fs-bar-wrap--inactive { flex: 0 0 44px !important; }
        .fs-bar-wrap--active { flex: 1 !important; }

        @media (min-width: 768px) {
          .fs-prose { font-size: 18px; }
          .fs-label { font-size: 17px; }
          .fs-q { font-size: 30px; }
          .fs-consent-box { font-size: 17px; max-height: 300px; }
          .fs-outer { padding: 0; min-height: 100vh; display: flex; }
          .fs-card { border-radius: 0; max-width: 100%; width: 100%; box-shadow: none !important; display: flex; flex-direction: column; }
          .fs-card-inner { flex: 1; display: flex; flex-direction: column; }
          .fs-content { padding: 48px 22% 48px; flex: 1; }
          .fs-brand-title { font-size: 22px; }
          .fs-brand-sub { font-size: 14px; }
          .fs-seg-label { font-size: 15px; }
          .fs-seg-icon { font-size: 22px; }
          .fs-seg-bar { height: 10px; }
          .fs-header-inner { padding: 24px 22% 0 !important; }
          .fs-progress-wrap { padding: 16px 22% 18px !important; }
          .fs-plan-bar { padding: 13px 22% !important; }
          /* Utility size overrides */
          .fs-body   { font-size: 17px; }
          .fs-small  { font-size: 15px; }
          .fs-xsmall { font-size: 13px; }
          .fs-price  { font-size: 24px; }
          .fs-barprice { font-size: 26px; }
          /* Desktop: all pills full-width, no collapsing */
          .fs-pill--inactive { flex: 1 !important; width: auto !important; min-height: 56px !important; padding: 10px 10px !important; justify-content: center !important; }
          .fs-pill--inactive .fs-pill-text { display: flex !important; }
          .fs-pill--inactive .fs-seg-icon { font-size: 2em !important; }
          .fs-bar-wrap--inactive { flex: 1 !important; }
        }
      `}</style>

      {/* Card */}
      <div className="fs-outer">
      <div className="fs-card" style={{
        background: "#f8faf9",
        boxShadow: "0 8px 48px rgba(0,0,0,0.28)",
        overflow: "hidden",
      }}>
      <div className="fs-card-inner">
        {/* Segmented progress — shown on steps 1–13 */}
        <div style={{ background: `linear-gradient(135deg, ${GD} 0%, ${G} 100%)` }}>
          {step > 0 && step <= TOTAL_STEPS && !submitted && !ineligible && (
            <ProgressBar step={step} />
          )}
        </div>

        {/* Plan summary bar */}
        {step >= 3 && !submitted && !ineligible && coverLevel && coverType && (
          <PlanSummaryBar coverLevel={coverLevel} coverType={coverType} price={price} band={band} />
        )}

        {/* Content area */}
        <div className="fs-content" style={{ background: "#f8faf9" }}>
          {renderContent()}
        </div>

      </div>
      </div>
      </div>
    </div>
  );
}
