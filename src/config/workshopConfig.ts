// Centralized Workshop Content Configuration
// Edit any date, time, price, link, or copy here without touching the UI layout.

export const workshopConfig = {
  // Offer Details
  title: "Fix Your AI Websites Live",
  tagline: "Turn generic AI websites into premium, live ones.",
  subheadline: "Built for designers, developers, and students who want to stop shipping AI slop and start directing AI with taste and craft.",
  
  price: {
    original: "₹1,499",
    display: "₹599",
    currencySymbol: "₹",
    amount: 599,
    earlyBirdLabel: "Early bird offer",
    subtitle: "Live · 3 hours · Saturday",
    note: "One-time payment · 100% Live on Google Meet",
  },

  // Session Dates & Platform
  dates: {
    saturday: {
      day: "Saturday",
      date: "28 November 2026",
      time: "12:00 PM to 3:00 PM IST",
      platform: "Google Meet",
      format: "3-hour live session on Google Meet",
      paymentLink: "PAYMENT_LINK_SAT", // [EDIT: Paste your Saturday payment link here]
      badge: "Main Session",
    },
    sunday: {
      day: "Sunday",
      date: "[DATE: e.g. 29 November 2026]",
      time: "12:00 PM to 3:00 PM IST",
      platform: "Google Meet",
      format: "3-hour live session on Google Meet",
      paymentLink: "PAYMENT_LINK_SUN", // [EDIT: Paste your Sunday payment link here]
      badge: "Alternative Slot",
    },
  },

  // Problems Solved ("Sound Familiar?")
  problems: [
    {
      number: "01",
      quote: "“My AI-built sites look generic, like AI slop.”",
      description: "Default prompts generate default UI: off-key margins, cheap animations, template cards, and awkward contrast that immediately reveals it was made without human taste.",
    },
    {
      number: "02",
      quote: "“I get stuck after the demo: bugs, backend, going live.”",
      description: "Code generation works great for a hero section mockup, but breaks down when you connect routes, add responsive rules, clean dependencies, or try to deploy to Vercel.",
    },
    {
      number: "03",
      quote: "“There are too many tools and I don't know where to start.”",
      description: "Between Claude Code, Antigravity, Cursor, Bolt, and v0, you spend hours watching YouTube hype reels instead of mastering one reliable, end-to-end workflow.",
    },
  ],

  // What You Get (4 Deliverables: 2, 3, 4 merged into 2 boxes + Lifetime Community)
  deliverables: [
    {
      title: "3-Hour Live Interactive Session",
      badge: "Google Meet",
      description: "100% live on Google Meet. We build, debug, and fix real site problems together in real time. Your specific questions answered live.",
    },
    {
      title: "Step-by-Step Guidebook & Prompt Library",
      badge: "Process & Prompts",
      description: "My repeatable framework plus the exact prompt instructions and skill files I use to steer Claude Code and Antigravity toward intentional, polished design.",
    },
    {
      title: "Reusable Production Templates",
      badge: "Production Code",
      description: "Clean, performant Next.js + Tailwind starter templates featuring dark-mode layouts, custom typography scales, and seek-safe micro-interactions.",
    },
    {
      title: "Private Builders WhatsApp Group",
      badge: "Lifetime Community",
      description: "Join an exclusive private WhatsApp community with fellow builders. Get ongoing resource updates, new prompts, and templates after the workshop, and ask questions anytime.",
    },
  ],

  // Timeline Agenda ("What we'll do in 3 hours")
  agenda: [
    {
      block: "01",
      time: "0:00 – 0:45",
      title: "De-slopping AI Code & Establishing Taste",
      description: "How to encode your taste into rules, purge AI layout habits (bad spacing, cheap borders), and establish premium typography scales.",
    },
    {
      block: "02",
      time: "0:45 – 1:30",
      title: "Motion, Depth & Micro-interactions",
      description: "Adding subtle spring animations, custom easing curves, canvas effects, and scrollytelling triggers without crashing performance.",
    },
    {
      block: "03",
      time: "1:30 – 2:15",
      title: "Overcoming The Post-Demo Wall & Going Live",
      description: "Fixing hydration bugs, structuring components cleanly, connecting assets, and deploying with zero build errors to custom domains on Vercel.",
    },
    {
      block: "04",
      time: "2:15 – 3:00",
      title: "Live Attendee Site Teardowns & Open Q&A",
      description: "Attendees submit their rough AI site URLs; I fix them live on screen, point out blind spots, and answer every live question.",
    },
  ],

  // Instructor Info
  instructor: {
    name: "Karan",
    role: "Product Designer",
    experience: "5 years experience",
    handle: "@karansinghh.ai",
    instagramUrl: "https://instagram.com/karansinghh.ai",
    stats: [
      { label: "Instagram Community", value: "37.5K" },
      { label: "Views Generated", value: "7M+" },
      { label: "Design Experience", value: "5+ Years" },
    ],
    bio: "I'm a product designer with 5 years of experience. Over the last 2 years, I've been building with AI and automated my workflow using AI agents like Claude Code, Codex, and Antigravity. I don't believe in AI hype or generic templates. My goal is to teach you how to become the creative director and direct AI with a human eye, so you deploy interfaces that feel intentional and unmistakably premium.",
    email: "karansingh.aix@gmail.com",
  },

  // Project Portfolio Placeholders (Hidden from current render as requested)
  portfolio: [
    {
      title: "Cinematic 3D Scrollytelling Experience",
      description: "Interactive WebGL product presentation with real-time lighting and scroll-tied camera transitions.",
      tag: "3D & Canvas",
      imagePlaceholder: "[SCREENSHOT 1 — ADD LATER]",
    },
    {
      title: "Dark-Mode Luxury SaaS Interface",
      description: "High-density dashboard built with custom micro-interactions, responsive charts, and tactile feedback.",
      tag: "Product Design",
      imagePlaceholder: "[SCREENSHOT 2 — ADD LATER]",
    },
    {
      title: "Tactile Kinetic Landing Page",
      description: "Precision typography, custom cursor states, and seamless fluid layouts built entirely with AI steering.",
      tag: "Creative Web",
      imagePlaceholder: "[SCREENSHOT 3 — ADD LATER]",
    },
  ],

  // Frequently Asked Questions (Strictly no fake answers, updated per requirements)
  faqs: [
    {
      q: "Is this workshop live or pre-recorded?",
      a: "It is 100% live on Google Meet. I share my screen, build alongside you, debug real issues in real time, and answer your questions directly.",
    },
    {
      q: "Will I get the recording of the session?",
      a: "The workshop is designed to be 100% live and interactive. While official cloud recordings are not provided (or require an additional add-on), you are completely welcome and encouraged to screen-record the live session on your computer for your personal reference.",
    },
    {
      q: "Do I need coding experience to join?",
      a: "No coding background is required. If you have an eye for design and know what looks good, I will teach you how to direct AI coding agents to build and fix the code for you.",
    },
    {
      q: "Which tools do I need, and are they free?",
      a: "We will use tools like Claude Code, Antigravity, and VS Code/Cursor. Free tiers and trial plans are completely sufficient to follow along.",
    },
    {
      q: "What if I can't attend after booking?",
      a: "There is a strict no-refund policy once booked. However, if something unexpected comes up, simply email me at least 24 hours before the session starts and I will gladly transfer your seat to the very next live cohort.",
    },
  ],
};
