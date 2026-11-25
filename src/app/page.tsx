import React from 'react';
import GradientASCII from '../components/GradientASCII';
import RazorpayCheckoutButton from '../components/RazorpayCheckoutButton';
import StickyMobileCta from '../components/StickyMobileCta';
import WorkshopFaq from '../components/WorkshopFaq';
import { workshopConfig } from '../config/workshopConfig';

export default function WorkshopLandingPage() {
  return (
    <>
      {/* Sticky Mobile CTA Bar */}
      <StickyMobileCta />

      {/* Main Container */}
      <div className="relative min-h-screen bg-[#0A0A0A] text-white overflow-x-hidden">

        {/* =========================================================================
            STICKY PILL TOP NAV BAR & RIGHT-HAND CTA
        ========================================================================= */}
        <header className="ws-header">
          <div className="ws-header-inner">
            <div className="ws-header-spacer" aria-hidden="true" />

            {/* Transparent / Frosted Pill Navbar */}
            <nav className="ws-nav-pill" aria-label="Page sections">
              <a href="#problems" className="ws-nav-link">
                Problems
              </a>
              <a href="#schedule" className="ws-nav-link">
                Schedule
              </a>
              <a href="#what-you-get" className="ws-nav-link">
                What You Get
              </a>
              <a href="#instructor" className="ws-nav-link">
                About
              </a>
              <a href="#faq" className="ws-nav-link">
                FAQ
              </a>
            </nav>

            {/* Right-Hand Sticky CTA (Outside the pill) */}
            <div className="ws-nav-cta-wrap">
              <a href="#pick-your-day" className="ws-nav-cta">
                <span>Book seat ·</span>
                <span className="ws-btn-strike">{workshopConfig.price.original}</span>
                <span>{workshopConfig.price.display}</span>
              </a>
            </div>
          </div>
        </header>

        {/* Ambient GradientASCII Background pulled from the very top */}
        <div className="ws-ascii-bg" aria-hidden="true">
          <GradientASCII
            colors={['#0A0A0A', '#170c47', '#3518b0', '#5A2BFF']}
            shape="horizon"
            characters=" =+xX0S8#@"
            cellSize={20}
            density={0.42}
            glyphOpacity={0.18}
            gradientOpacity={0.35}
            glow={0.08}
            softness={0.7}
            speed={0.8}
            mouseInteraction={true}
            clickEffect="wave"
            intro={true}
          />
        </div>

        {/* =========================================================================
            SECTION 1: HERO (Standard Large Typography, No Em Dash, No Top Label)
        ========================================================================= */}
        <section className="ws-hero" style={{ zIndex: 1 }}>
          <h1 className="ws-hero-title">
            Turn generic AI websites into premium, live ones.
          </h1>

          <p className="ws-hero-subtitle">
            Built for designers, developers, and students who want to stop shipping AI slop and start directing AI with taste and craft.
          </p>

          <div className="ws-hero-cta-row">
            <a href="#pick-your-day" className="ws-hero-btn">
              <span>Book your seat ·</span>
              <span className="ws-btn-strike">{workshopConfig.price.original}</span>
              <span>{workshopConfig.price.display}</span>
            </a>

            <span className="ws-hero-meta">
              {workshopConfig.price.earlyBirdLabel}
            </span>
          </div>
        </section>


        {/* =========================================================================
            SECTION 2: "SOUND FAMILIAR?" (No fine gray line below Hero)
        ========================================================================= */}
        <section id="problems" className="mx-auto w-full max-w-[760px] px-5 py-16 scroll-mt-24">
          <div className="mb-10 text-center">
            <h2 className="text-3xl sm:text-4xl font-[575] tracking-tight text-white">
              Sound familiar?
            </h2>
            <p className="mt-2 mx-auto text-sm sm:text-base text-white/70 ws-balanced-sub">
              Building websites with AI looks effortless in demos until you sit down to build something you would actually show a client or user.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {workshopConfig.problems.map((prob, idx) => (
              <div
                key={idx}
                className="group relative flex flex-col justify-between rounded-2xl border border-white/10 bg-[#121212] p-6 hover:border-white/20 transition-colors"
              >
                <div>
                  <span className="font-mono text-xs text-white/40 font-semibold tracking-wider">
                    {prob.number}
                  </span>
                  <h3 className="mt-3 text-base font-medium text-white leading-snug">
                    {prob.quote}
                  </h3>
                  <p className="mt-3 text-xs sm:text-sm text-white/70 leading-relaxed">
                    {prob.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>


        {/* =========================================================================
            SECTION 3: "WHAT WE WILL DO IN 3 HOURS" (Unboxed Timeline, No Blue Dots)
        ========================================================================= */}
        <section id="schedule" className="mx-auto w-full max-w-[760px] px-5 py-16 border-t border-white/10 scroll-mt-24">
          <div className="mb-10">
            <h2 className="text-3xl sm:text-4xl font-[575] tracking-tight text-white">
              What we will do in 3 hours
            </h2>
            <p className="mt-2 text-sm sm:text-base text-white/70">
              No filler lectures. Real-time screen sharing, fixing common failure points, and live Q&amp;A.
            </p>
          </div>

          <div className="divide-y divide-white/10">
            {workshopConfig.agenda.map((block, idx) => (
              <div key={idx} className="py-6 first:pt-0 last:pb-0">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 sm:gap-4">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-sm font-semibold text-white">
                      {block.block}
                    </span>
                    <span className="text-xs font-mono text-white/40">
                      {block.time}
                    </span>
                  </div>
                  <span className="text-xs font-mono text-white/40 uppercase tracking-wider hidden sm:inline-flex items-center gap-1.5">
                    <span className="ws-lime-dot" />
                    <span>Live Session</span>
                  </span>
                </div>
                <h3 className="mt-2 text-lg sm:text-xl font-medium text-white">
                  {block.title}
                </h3>
                <p className="mt-2 text-sm sm:text-[15px] text-white/70 leading-relaxed max-w-2xl">
                  {block.description}
                </p>
              </div>
            ))}
          </div>
        </section>


        {/* =========================================================================
            SECTION 4: "WHAT YOU GET" (4 Boxes: 2x2 Grid, White Badges, Highlighted Community)
        ========================================================================= */}
        <section id="what-you-get" className="mx-auto w-full max-w-[760px] px-5 py-16 border-t border-white/10 scroll-mt-24">
          <div className="mb-10">
            <h2 className="text-3xl sm:text-4xl font-[575] tracking-tight text-white">
              What you get in one day
            </h2>
            <p className="mt-2 text-sm sm:text-base text-white/70">
              Everything practical you need to stop guessing and start shipping polished websites.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {workshopConfig.deliverables.map((item, idx) => (
              <div
                key={idx}
                className={`flex flex-col justify-between rounded-2xl border border-white/10 bg-[#121212] p-6 hover:border-white/20 transition-colors ${
                  idx === 3 ? 'ws-whatsapp-card' : ''
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-white/40 font-semibold">
                      0{idx + 1}
                    </span>
                    <span className="font-mono text-[11px] text-white uppercase tracking-wider font-semibold">
                      {item.badge}
                    </span>
                  </div>
                  <h3 className="mt-3 text-lg font-medium text-white">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm text-white/70 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>


        {/* =========================================================================
            SECTION 5: "RESERVE YOUR SPOT" (Single Saturday Session on Google Meet)
        ========================================================================= */}
        <section
          id="pick-your-day"
          className="mx-auto w-full max-w-[760px] px-5 py-16 border-t border-white/10 scroll-mt-24"
        >
          <div className="mb-10 text-center">
            <h2 className="text-3xl sm:text-4xl font-[575] tracking-tight text-white">
              Join the live session
            </h2>
            <p className="mt-2 text-sm sm:text-base text-white/70 max-w-[480px] mx-auto">
              Live on Google Meet. Interactive teardowns and direct screen-sharing.
            </p>
          </div>

          <div className="ws-single-card-wrap">
            {/* Saturday Card */}
            <div className="flex flex-col justify-between rounded-3xl border border-white/15 bg-gradient-to-b from-[#181818] to-[#101010] p-6 sm:p-8 shadow-lg">
              <div>
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 font-mono text-xs ws-violet-text font-semibold tracking-wider uppercase">
                    <span className="ws-lime-dot" />
                    <span>Live Session</span>
                  </span>
                  <span className="font-mono text-xs text-white/60">
                    {workshopConfig.dates.saturday.platform}
                  </span>
                </div>
                <h3 className="mt-3 text-2xl font-[575] text-white">
                  {workshopConfig.dates.saturday.day}
                </h3>
                <div className="mt-4 space-y-1.5 font-mono text-sm">
                  <div className="flex items-center gap-2 text-white/90">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" className="text-white/50">
                      <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
                      <path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                    <span>{workshopConfig.dates.saturday.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/90">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" className="text-white/50">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                      <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                    <span>{workshopConfig.dates.saturday.time}</span>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-white/10">
                  <div className="flex items-baseline gap-2">
                    <span className="text-xl text-white/50 line-through font-mono">
                      {workshopConfig.price.original}
                    </span>
                    <span className="text-3xl font-[575] text-white tracking-tight">
                      {workshopConfig.price.display}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <RazorpayCheckoutButton
                  label="Book Saturday"
                  className="ws-violet-btn"
                />
                <span className="ws-hero-meta text-center block mt-2">
                  {workshopConfig.price.earlyBirdLabel}
                </span>
              </div>
            </div>
          </div>
        </section>


        {/* =========================================================================
            SECTION 6: ABOUT ME (Unboxed, Bold Title, No Photo Placeholder)
        ========================================================================= */}
        <section id="instructor" className="mx-auto w-full max-w-[760px] px-5 py-16 border-t border-white/10 scroll-mt-24">
          <div className="mb-6">
            <span className="font-mono text-xs ws-violet-text uppercase tracking-widest font-semibold">
              Instructor
            </span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Hey, I&apos;m {workshopConfig.instructor.name}
            </h2>
          </div>

          <p className="text-sm sm:text-[15px] text-white/80 leading-relaxed">
            {workshopConfig.instructor.bio}
          </p>

          {/* Verified Metrics */}
          <div className="mt-8 grid grid-cols-3 gap-2 border-t border-white/10 pt-6 text-center">
            {workshopConfig.instructor.stats.map((s, idx) => (
              <div key={idx} className="flex flex-col">
                <span className="text-base sm:text-lg font-semibold text-white tracking-tight">
                  {s.value}
                </span>
                <span className="text-[11px] font-mono text-white/60">
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </section>


        {/* =========================================================================
            SECTION 7: FAQ (Updated Policies, No Refund Question)
        ========================================================================= */}
        <section id="faq" className="mx-auto w-full max-w-[760px] px-5 py-16 border-t border-white/10 scroll-mt-24">
          <div className="mb-10">
            <h2 className="text-3xl sm:text-4xl font-[575] tracking-tight text-white">
              Frequently asked questions
            </h2>
            <p className="mt-2 text-sm sm:text-base text-white/70">
              Clear, direct answers with zero sales fluff.
            </p>
          </div>

          <WorkshopFaq />
        </section>


        {/* =========================================================================
            SECTION 8: FINAL CTA
        ========================================================================= */}
        <section className="mx-auto w-full max-w-[760px] px-5 py-20 border-t border-white/10 text-center">
          <h2 className="text-3xl sm:text-4xl font-[575] tracking-tight text-white max-w-[540px] mx-auto leading-tight">
            Stop shipping AI slop. Fix your websites this weekend.
          </h2>
          <p className="mt-4 text-sm sm:text-base text-white/70 max-w-[420px] mx-auto">
            One 3-hour live Google Meet session. Direct screen-sharing, templates, guidebook, WhatsApp community, and real fixes.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3">
            <RazorpayCheckoutButton
              label="Book your seat"
              className="ws-hero-btn"
            />
            <span className="ws-hero-meta">
              {workshopConfig.price.earlyBirdLabel}
            </span>
          </div>
        </section>


        {/* =========================================================================
            SECTION 9: FOOTER
        ========================================================================= */}
        <footer className="ws-footer">
          <div className="flex items-center gap-2">
            <span className="font-medium text-white">Fix Your AI Websites Live</span>
            <span>·</span>
            <span>By Karan</span>
          </div>

          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-6">
            <a
              href={workshopConfig.instructor.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 hover:text-white transition-colors"
            >
              Instagram @karansinghh.ai
            </a>
            <a
              href={`mailto:${workshopConfig.instructor.email}`}
              className="text-white/70 hover:text-white transition-colors font-mono"
            >
              Contact: {workshopConfig.instructor.email}
            </a>
          </div>
        </footer>

      </div>
    </>
  );
}
