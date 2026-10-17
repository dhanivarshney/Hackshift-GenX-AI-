import sys
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN
from pptx.enum.shapes import MSO_SHAPE

def create_deck():
    prs = Presentation()
    prs.slide_width = Inches(13.333)
    prs.slide_height = Inches(7.5)
    blank_slide_layout = prs.slide_layouts[6]

    # Color Palette - LinkX Cyber Dark Theme
    BG_DARK = RGBColor(4, 7, 18)       # #040712 Deep Obsidian
    BG_CARD = RGBColor(12, 19, 38)     # #0C1326 Card Glass
    BG_CARD_LIGHT = RGBColor(17, 28, 54) # #111C36
    TEXT_WHITE = RGBColor(248, 250, 252)
    TEXT_MUTED = RGBColor(148, 163, 184)
    TEXT_ACCENT_BLUE = RGBColor(56, 189, 248)   # Sky Blue
    TEXT_ACCENT_PURPLE = RGBColor(192, 132, 252) # Purple
    TEXT_ACCENT_PINK = RGBColor(244, 114, 182)   # Neon Pink
    BORDER_COLOR = RGBColor(30, 41, 59)
    BORDER_GLOW = RGBColor(99, 102, 241)

    def set_slide_background(slide):
        bg = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, Inches(13.333), Inches(7.5))
        bg.fill.solid()
        bg.fill.fore_color.rgb = BG_DARK
        bg.line.color.rgb = BG_DARK
        return bg

    def add_header(slide, badge_text, title_text, subtitle_text=None):
        # Badge
        badge_box = slide.shapes.add_textbox(Inches(0.8), Inches(0.4), Inches(11.7), Inches(0.4))
        tf_b = badge_box.text_frame
        tf_b.word_wrap = True
        p_b = tf_b.paragraphs[0]
        p_b.text = badge_text.upper()
        p_b.font.size = Pt(9)
        p_b.font.bold = True
        p_b.font.color.rgb = TEXT_ACCENT_PINK

        # Title
        title_box = slide.shapes.add_textbox(Inches(0.8), Inches(0.75), Inches(11.7), Inches(0.8))
        tf_t = title_box.text_frame
        tf_t.word_wrap = True
        p_t = tf_t.paragraphs[0]
        p_t.text = title_text
        p_t.font.size = Pt(24)
        p_t.font.bold = True
        p_t.font.color.rgb = TEXT_WHITE

        if subtitle_text:
            sub_box = slide.shapes.add_textbox(Inches(0.8), Inches(1.45), Inches(11.7), Inches(0.4))
            tf_s = sub_box.text_frame
            tf_s.word_wrap = True
            p_s = tf_s.paragraphs[0]
            p_s.text = subtitle_text
            p_s.font.size = Pt(12)
            p_s.font.color.rgb = TEXT_MUTED

    # ==================== SLIDE 1: COVER SLIDE ====================
    s1 = prs.slides.add_slide(blank_slide_layout)
    set_slide_background(s1)

    # Ambient Card behind Title
    glow = s1.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(1.5), Inches(1.2), Inches(10.333), Inches(5.1))
    glow.fill.solid()
    glow.fill.fore_color.rgb = BG_CARD
    glow.line.color.rgb = BORDER_GLOW
    glow.line.width = Pt(1.5)

    # Title Box
    tbox = s1.shapes.add_textbox(Inches(2.0), Inches(1.6), Inches(9.333), Inches(1.2))
    p = tbox.text_frame.paragraphs[0]
    p.text = "TRACK 1: ALUMNI NETWORK & CONNECTIONS"
    p.alignment = PP_ALIGN.CENTER
    p.font.size = Pt(11)
    p.font.bold = True
    p.font.color.rgb = TEXT_ACCENT_PINK

    # Main Brand Name
    brand_box = s1.shapes.add_textbox(Inches(2.0), Inches(2.1), Inches(9.333), Inches(1.5))
    p_brand = brand_box.text_frame.paragraphs[0]
    p_brand.alignment = PP_ALIGN.CENTER
    run1 = p_brand.add_run()
    run1.text = "Link"
    run1.font.size = Pt(64)
    run1.font.bold = True
    run1.font.color.rgb = TEXT_WHITE
    run2 = p_brand.add_run()
    run2.text = "X"
    run2.font.size = Pt(72)
    run2.font.bold = True
    run2.font.italic = True
    run2.font.color.rgb = TEXT_ACCENT_BLUE

    # Mission Statement
    mission_box = s1.shapes.add_textbox(Inches(2.0), Inches(3.6), Inches(9.333), Inches(0.8))
    p_m = mission_box.text_frame.paragraphs[0]
    p_m.alignment = PP_ALIGN.CENTER
    p_m.text = "Building a Living Network, Not a Dead Directory."
    p_m.font.size = Pt(20)
    p_m.font.bold = True
    p_m.font.color.rgb = TEXT_ACCENT_PURPLE

    sub_m = mission_box.text_frame.add_paragraph()
    sub_m.alignment = PP_ALIGN.CENTER
    sub_m.text = "Autonomous Campus & Alumni Intent Network powered by Verified Proof-of-Work"
    sub_m.font.size = Pt(13)
    sub_m.font.color.rgb = TEXT_MUTED

    # Bottom Pillars
    pillars_box = s1.shapes.add_textbox(Inches(2.0), Inches(4.7), Inches(9.333), Inches(0.8))
    p_pil = pillars_box.text_frame.paragraphs[0]
    p_pil.alignment = PP_ALIGN.CENTER
    p_pil.text = "🛡️ Zero Cold DMs   •   ⚡ 1-Click ATS Referrals   •   🚀 Micro-Bounties   •   🏫 NIRF/NAAC Telemetry"
    p_pil.font.size = Pt(12)
    p_pil.font.bold = True
    p_pil.font.color.rgb = TEXT_WHITE

    # ==================== SLIDE 2: THE PROBLEM STATEMENT ====================
    s2 = prs.slides.add_slide(blank_slide_layout)
    set_slide_background(s2)
    add_header(s2, "The Core Dilemma", "Why Traditional Alumni Portals & Cold DMs Fail", "Traditional college portals with 10,000+ registered names have nearly ZERO daily active users.")

    prob_cards = [
        ("The Cold-DM Crisis", "98% Message Drop Rate", 
         "Students spam alumni on LinkedIn with generic begging messages ('Sir please refer me'). Busy engineers at Google & Swiggy have 0 time to read 5-page resumes, leading them to close their inboxes completely.",
         TEXT_ACCENT_PINK),
        ("Directory vs Network", "Dead Phonebook Syndrome", 
         "A directory lists where people work; a NETWORK actively pairs people based on real-time Intent and Expertise. Existing portals have no concept of mutual availability or reciprocation triggers.",
         TEXT_ACCENT_BLUE),
        ("Disconnected Stakeholders", "Siloed Campus Ecosystem", 
         "Alumni founders struggle to find fast campus builders for MVPs; faculty lack industry co-guides for student capstones; and colleges have zero live data on referral-to-offer conversions.",
         TEXT_ACCENT_PURPLE)
    ]

    for i, (title, highlight, desc, col) in enumerate(prob_cards):
        left = Inches(0.8 + i * 3.95)
        card = s2.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left, Inches(2.2), Inches(3.75), Inches(4.4))
        card.fill.solid()
        card.fill.fore_color.rgb = BG_CARD
        card.line.color.rgb = col
        card.line.width = Pt(1)

        tb = s2.shapes.add_textbox(left + Inches(0.2), Inches(2.4), Inches(3.35), Inches(4.0))
        tf = tb.text_frame
        tf.word_wrap = True
        
        p1 = tf.paragraphs[0]
        p1.text = title
        p1.font.size = Pt(16)
        p1.font.bold = True
        p1.font.color.rgb = TEXT_WHITE

        p2 = tf.add_paragraph()
        p2.text = highlight
        p2.font.size = Pt(11)
        p2.font.bold = True
        p2.font.color.rgb = col

        p3 = tf.add_paragraph()
        p3.text = "\n" + desc
        p3.font.size = Pt(12)
        p3.font.color.rgb = TEXT_MUTED

    # ==================== SLIDE 3: THE LINKX SOLUTION ====================
    s3 = prs.slides.add_slide(blank_slide_layout)
    set_slide_background(s3)
    add_header(s3, "The Paradigm Shift", "The LinkX Solution: 6-Role Reciprocity Engine", "An autonomous intent exchange connecting all 6 campus stakeholders with high-conviction proof-of-work.")

    roles = [
        ("🎓 Student Gateway", "Proof-of-Work Pitch Lab", "No raw text allowed. Connects GitHub repo/PR; generates automated Code Readiness Score (0-100).", TEXT_ACCENT_BLUE),
        ("💼 Alumnus Desk", "1-Minute Decision Radar", "Receives executive code dossiers; approves 1-Click ATS referrals without resume screening fatigue.", TEXT_ACCENT_PINK),
        ("🚀 Founder Exchange", "Micro-Bounty Board", "Posts ₹5k–₹25k feature bounties with escrow protection. Hires proven campus builders in hours.", TEXT_ACCENT_PURPLE),
        ("🏛️ Faculty Hub", "Industry Capstones", "Connects semester research projects with alumni tech leads from top tier firms as industry co-guides.", TEXT_ACCENT_BLUE),
        ("🎯 Corporate Recruiter", "Pre-Vetted Talent Radar", "Bypasses campus placement lag; filters candidates by AST test coverage, latency benchmarks, and code readiness.", TEXT_ACCENT_PINK),
        ("🏫 Institution Desk", "Outcome & NIRF Analytics", "Real-time telemetry on student earnings, alumni density in tech hubs, and verified referral conversions.", TEXT_ACCENT_PURPLE)
    ]

    for i, (title, subtitle, desc, col) in enumerate(roles):
        row = i // 3
        col_idx = i % 3
        left = Inches(0.8 + col_idx * 3.95)
        top = Inches(2.1 + row * 2.4)

        card = s3.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left, top, Inches(3.75), Inches(2.15))
        card.fill.solid()
        card.fill.fore_color.rgb = BG_CARD
        card.line.color.rgb = BORDER_COLOR

        tb = s3.shapes.add_textbox(left + Inches(0.15), top + Inches(0.15), Inches(3.45), Inches(1.85))
        tf = tb.text_frame
        tf.word_wrap = True

        p1 = tf.paragraphs[0]
        p1.text = title
        p1.font.size = Pt(14)
        p1.font.bold = True
        p1.font.color.rgb = col

        p2 = tf.add_paragraph()
        p2.text = subtitle
        p2.font.size = Pt(10)
        p2.font.bold = True
        p2.font.color.rgb = TEXT_WHITE

        p3 = tf.add_paragraph()
        p3.text = desc
        p3.font.size = Pt(11)
        p3.font.color.rgb = TEXT_MUTED

    # ==================== SLIDE 4: PROOF-OF-WORK PITCH LAB ====================
    s4 = prs.slides.add_slide(blank_slide_layout)
    set_slide_background(s4)
    add_header(s4, "Feature Spotlight 1", "Anti-Cold-DM Pitch Lab & AST Code Engine", "Replacing begging DMs with verifiable engineering proof-of-work.")

    # Left Card: How it works
    card_l = s4.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(2.2), Inches(5.7), Inches(4.5))
    card_l.fill.solid()
    card_l.fill.fore_color.rgb = BG_CARD
    card_l.line.color.rgb = BORDER_GLOW

    tb_l = s4.shapes.add_textbox(Inches(1.0), Inches(2.4), Inches(5.3), Inches(4.1))
    tf_l = tb_l.text_frame
    tf_l.word_wrap = True
    p = tf_l.paragraphs[0]
    p.text = "How the Anti-Cold-DM Engine Works:"
    p.font.size = Pt(16)
    p.font.bold = True
    p.font.color.rgb = TEXT_WHITE

    steps = [
        ("1. Zero Begging Messages:", "Students are prohibited from sending raw unvetted text like 'Sir please refer me'."),
        ("2. GitHub Repository Staking:", "Student inputs their actual GitHub repository or Pull Request addressing a real problem."),
        ("3. AST Architecture Analysis:", "Engine analyzes test-to-code ratio, cyclomatic complexity, concurrency patterns, and P99 latency."),
        ("4. 60-Second Flash Dossier:", "Generates a clean, verified candidate scorecard that alumni can evaluate in under 60 seconds.")
    ]
    for st, sd in steps:
        p_st = tf_l.add_paragraph()
        p_st.text = "\n" + st
        p_st.font.size = Pt(12)
        p_st.font.bold = True
        p_st.font.color.rgb = TEXT_ACCENT_BLUE

        p_sd = tf_l.add_paragraph()
        p_sd.text = sd
        p_sd.font.size = Pt(11)
        p_sd.font.color.rgb = TEXT_MUTED

    # Right Card: The Flash Dossier Preview
    card_r = s4.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(6.8), Inches(2.2), Inches(5.7), Inches(4.5))
    card_r.fill.solid()
    card_r.fill.fore_color.rgb = BG_CARD_LIGHT
    card_r.line.color.rgb = TEXT_ACCENT_PURPLE

    tb_r = s4.shapes.add_textbox(Inches(7.0), Inches(2.4), Inches(5.3), Inches(4.1))
    tf_r = tb_r.text_frame
    tf_r.word_wrap = True
    p = tf_r.paragraphs[0]
    p.text = "Generated 1-Minute Executive Dossier:"
    p.font.size = Pt(16)
    p.font.bold = True
    p.font.color.rgb = TEXT_ACCENT_PINK

    metrics = [
        "Code Readiness Score: 94 / 100 (Top 5% Tier)",
        "Primary Stack: Go / Distributed Consistent Hashing",
        "Test Coverage: 92.4% Unit & Integration Suites",
        "P99 Benchmark: 14ms Latency at 10k RPS",
        "Memory Analysis: Zero Goroutine Leaks (pprof verified)",
        "Architectural Highlight: Robust virtual-node hashing ring with graceful node failover and zero cache drops.",
        "Target Action: 1-Click ATS Referral Ready"
    ]
    for m in metrics:
        p_m = tf_r.add_paragraph()
        p_m.text = "• " + m
        p_m.font.size = Pt(11)
        p_m.font.color.rgb = TEXT_WHITE

    # ==================== SLIDE 5: ALUMNUS 1-CLICK REFERRAL RADAR ====================
    s5 = prs.slides.add_slide(blank_slide_layout)
    set_slide_background(s5)
    add_header(s5, "Feature Spotlight 2", "Alumnus Referral Radar: Zero-Lag Decisions", "Respecting alumni time with high-conviction 1-click ATS referrals.")

    alum_features = [
        ("No Resume Screening Fatigue", "Alumni receive a concise 1-minute scorecard highlighting actual code quality, eliminating the need to read ambiguous 5-page resumes.", TEXT_ACCENT_BLUE),
        ("1-Click ATS Dispatch", "With a single click, the alumnus validates the student's work and automatically pushes a warm referral into their internal corporate ATS pipeline.", TEXT_ACCENT_PINK),
        ("Constructive Code Feedback Loop", "If the code isn't ready yet, the alumnus provides 2 structured lines of technical guidance. The student refactors and can re-apply once passing benchmarks.", TEXT_ACCENT_PURPLE),
        ("Staked Reputation & Bonus Protection", "Alumni protect their internal company reputation by referring only verified, test-covered candidates while unlocking company referral bonuses (up to ₹1.5L).", TEXT_ACCENT_BLUE)
    ]

    for i, (title, desc, col) in enumerate(alum_features):
        row = i // 2
        col_idx = i % 2
        left = Inches(0.8 + col_idx * 5.95)
        top = Inches(2.2 + row * 2.3)

        card = s5.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left, top, Inches(5.75), Inches(2.1))
        card.fill.solid()
        card.fill.fore_color.rgb = BG_CARD
        card.line.color.rgb = col

        tb = s5.shapes.add_textbox(left + Inches(0.2), top + Inches(0.2), Inches(5.35), Inches(1.7))
        tf = tb.text_frame
        tf.word_wrap = True

        p1 = tf.paragraphs[0]
        p1.text = title
        p1.font.size = Pt(15)
        p1.font.bold = True
        p1.font.color.rgb = col

        p2 = tf.add_paragraph()
        p2.text = "\n" + desc
        p2.font.size = Pt(12)
        p2.font.color.rgb = TEXT_MUTED

    # ==================== SLIDE 6: OPPORTUNITY EXCHANGE & BOUNTIES ====================
    s6 = prs.slides.add_slide(blank_slide_layout)
    set_slide_background(s6)
    add_header(s6, "Feature Spotlight 3", "Opportunity Exchange: Micro-Bounties & Capstones", "Connecting campus talent with live economic opportunities and industry mentorship.")

    opp_items = [
        ("Startup Micro-Bounties", "Alumni Founders post urgent production tickets (₹5,000 to ₹25,000). Students solve webhooks, caching, or SDK features in 48-72 hours, earning stipends and direct PPO interviews.", TEXT_ACCENT_PINK),
        ("Industry-Mentored Capstones", "Faculty link final-year student capstones with alumni engineering leads at Google, Microsoft, and Swiggy. Replaces dummy college projects with production code.", TEXT_ACCENT_PURPLE),
        ("Targeted Campus Requisitions", "Corporate recruiters list urgent off-campus vacancies targeted specifically at students with proven AST Code Readiness Scores above 90.", TEXT_ACCENT_BLUE)
    ]

    for i, (title, desc, col) in enumerate(opp_items):
        left = Inches(0.8 + i * 3.95)
        card = s6.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left, Inches(2.2), Inches(3.75), Inches(4.4))
        card.fill.solid()
        card.fill.fore_color.rgb = BG_CARD
        card.line.color.rgb = col

        tb = s6.shapes.add_textbox(left + Inches(0.2), Inches(2.4), Inches(3.35), Inches(4.0))
        tf = tb.text_frame
        tf.word_wrap = True

        p1 = tf.paragraphs[0]
        p1.text = title
        p1.font.size = Pt(16)
        p1.font.bold = True
        p1.font.color.rgb = col

        p2 = tf.add_paragraph()
        p2.text = "\n" + desc
        p2.font.size = Pt(12)
        p2.font.color.rgb = TEXT_MUTED

    # ==================== SLIDE 7: INSTITUTION OUTCOME COMMAND DESK ====================
    s7 = prs.slides.add_slide(blank_slide_layout)
    set_slide_background(s7)
    add_header(s7, "Feature Spotlight 4", "Institution Impact & Outcome Telemetry", "Transforming college alumni relations from fundraising brochures to real-time accreditation metrics.")

    stats = [
        ("342+", "Verified Referrals Tracked", TEXT_ACCENT_BLUE),
        ("₹4.2L+", "Student Bounty Earnings", TEXT_ACCENT_PINK),
        ("78%", "Alumni Referral Conversion", TEXT_ACCENT_PURPLE),
        ("1,240+", "Active Campus Builders", TEXT_ACCENT_BLUE)
    ]

    for i, (num, label, col) in enumerate(stats):
        left = Inches(0.8 + i * 2.95)
        card = s7.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left, Inches(2.2), Inches(2.75), Inches(1.8))
        card.fill.solid()
        card.fill.fore_color.rgb = BG_CARD
        card.line.color.rgb = col

        tb = s7.shapes.add_textbox(left + Inches(0.1), Inches(2.4), Inches(2.55), Inches(1.4))
        tf = tb.text_frame
        tf.word_wrap = True
        p = tf.paragraphs[0]
        p.alignment = PP_ALIGN.CENTER
        p.text = num
        p.font.size = Pt(28)
        p.font.bold = True
        p.font.color.rgb = col

        p2 = tf.add_paragraph()
        p2.alignment = PP_ALIGN.CENTER
        p2.text = label
        p2.font.size = Pt(11)
        p2.font.color.rgb = TEXT_WHITE

    # Lower Box: Value to Colleges
    low_box = s7.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(4.3), Inches(11.733), Inches(2.4))
    low_box.fill.solid()
    low_box.fill.fore_color.rgb = BG_CARD_LIGHT
    low_box.line.color.rgb = BORDER_GLOW

    tb_low = s7.shapes.add_textbox(Inches(1.1), Inches(4.5), Inches(11.1), Inches(2.0))
    tf_low = tb_low.text_frame
    tf_low.word_wrap = True
    p = tf_low.paragraphs[0]
    p.text = "Why Colleges & Universities Pay for LinkX:"
    p.font.size = Pt(16)
    p.font.bold = True
    p.font.color.rgb = TEXT_WHITE

    reasons = [
        "1. Instant NAAC & NIRF Data: Generates audit-ready evidence on alumni engagement, industry co-guides, and student employment.",
        "2. Geographic Density Mapping: Tracks alumni hubs across Bangalore, Gurgaon, San Francisco, and London for regional alumni chapter meetings.",
        "3. High-Value Industry Placement Rate: Increases Tier-1 placement conversions by up to 3x compared to unmoderated on-campus drives."
    ]
    for r in reasons:
        p_r = tf_low.add_paragraph()
        p_r.text = r
        p_r.font.size = Pt(12)
        p_r.font.color.rgb = TEXT_MUTED

    # ==================== SLIDE 8: TECHNICAL ARCHITECTURE ====================
    s8 = prs.slides.add_slide(blank_slide_layout)
    set_slide_background(s8)
    add_header(s8, "Engineering Excellence", "System Architecture & Production Tech Stack", "High-velocity, zero-bundle latency architecture designed for real-world scale.")

    tech_blocks = [
        ("Frontend Engine", "Modern ES6+ SPA & React 19", [
            "Tailwind CSS Cyber Obsidian design tokens",
            "Hardware-accelerated CSS mesh gradients & orbs",
            "Lucide icons & responsive RBAC layouts",
            "Sub-50ms DOM updates & zero bundle lag"
        ], TEXT_ACCENT_BLUE),
        ("Backend & REST API", "Node.js & Express REST Core", [
            "ES Modules architecture (v20+)",
            "Role-Based Access Control (RBAC) across 6 roles",
            "Persistent JSON database engine with ACID safety",
            "High-throughput REST API with CORS & security"
        ], TEXT_ACCENT_PURPLE),
        ("Intelligence & Analysis", "AST Code Scanner & Gemini AI", [
            "GitHub REST API v3 repo tree & commit parsing",
            "AST heuristic code complexity & readiness scanner",
            "Google Gemini AI LLM dossier summarizer",
            "Automated fallback heuristic engine"
        ], TEXT_ACCENT_PINK)
    ]

    for i, (title, subtitle, bullets, col) in enumerate(tech_blocks):
        left = Inches(0.8 + i * 3.95)
        card = s8.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left, Inches(2.2), Inches(3.75), Inches(4.4))
        card.fill.solid()
        card.fill.fore_color.rgb = BG_CARD
        card.line.color.rgb = col

        tb = s8.shapes.add_textbox(left + Inches(0.2), Inches(2.4), Inches(3.35), Inches(4.0))
        tf = tb.text_frame
        tf.word_wrap = True

        p1 = tf.paragraphs[0]
        p1.text = title
        p1.font.size = Pt(16)
        p1.font.bold = True
        p1.font.color.rgb = col

        p2 = tf.add_paragraph()
        p2.text = subtitle
        p2.font.size = Pt(11)
        p2.font.bold = True
        p2.font.color.rgb = TEXT_WHITE

        for b in bullets:
            p_b = tf.add_paragraph()
            p_b.text = "• " + b
            p_b.font.size = Pt(11)
            p_b.font.color.rgb = TEXT_MUTED

    # ==================== SLIDE 9: BUSINESS MODEL & MONETIZATION ====================
    s9 = prs.slides.add_slide(blank_slide_layout)
    set_slide_background(s9)
    add_header(s9, "Commercial Viability", "Business Model & Monetization Strategy", "A multi-sided economic model providing sustained value to students, alumni, and institutions.")

    biz_models = [
        ("1. B2B College SaaS License", "Annual Institutional Subscription", 
         "₹3L - ₹10L per university per year for outcome analytics, NIRF/NAAC audit telemetry, and branded institutional alumni command center.",
         TEXT_ACCENT_BLUE),
        ("2. Corporate Recruiter Pass", "Talent Radar Subscription", 
         "₹15,000 / month for corporate hiring teams to filter campus candidates based on verified AST code readiness scores and alumni endorsements.",
         TEXT_ACCENT_PINK),
        ("3. Bounty Marketplace Fee", "Escrow Platform Take-Rate", 
         "5% - 8% platform fee on all successfully completed and funded freelance micro-bounties and capstone disbursements.",
         TEXT_ACCENT_PURPLE)
    ]

    for i, (title, subtitle, desc, col) in enumerate(biz_models):
        left = Inches(0.8 + i * 3.95)
        card = s9.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left, Inches(2.2), Inches(3.75), Inches(4.4))
        card.fill.solid()
        card.fill.fore_color.rgb = BG_CARD
        card.line.color.rgb = col

        tb = s9.shapes.add_textbox(left + Inches(0.2), Inches(2.4), Inches(3.35), Inches(4.0))
        tf = tb.text_frame
        tf.word_wrap = True

        p1 = tf.paragraphs[0]
        p1.text = title
        p1.font.size = Pt(16)
        p1.font.bold = True
        p1.font.color.rgb = col

        p2 = tf.add_paragraph()
        p2.text = subtitle
        p2.font.size = Pt(11)
        p2.font.bold = True
        p2.font.color.rgb = TEXT_WHITE

        p3 = tf.add_paragraph()
        p3.text = "\n" + desc
        p3.font.size = Pt(12)
        p3.font.color.rgb = TEXT_MUTED

    # ==================== SLIDE 10: CONCLUSION & SUMMARY ====================
    s10 = prs.slides.add_slide(blank_slide_layout)
    set_slide_background(s10)

    glow10 = s10.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(1.5), Inches(1.2), Inches(10.333), Inches(5.1))
    glow10.fill.solid()
    glow10.fill.fore_color.rgb = BG_CARD
    glow10.line.color.rgb = TEXT_ACCENT_PINK
    glow10.line.width = Pt(1.5)

    tb10 = s10.shapes.add_textbox(Inches(2.0), Inches(1.6), Inches(9.333), Inches(4.3))
    tf10 = tb10.text_frame
    tf10.word_wrap = True

    p = tf10.paragraphs[0]
    p.alignment = PP_ALIGN.CENTER
    p.text = "THE WINNING CONCLUSION"
    p.font.size = Pt(11)
    p.font.bold = True
    p.font.color.rgb = TEXT_ACCENT_PINK

    p_main = tf10.add_paragraph()
    p_main.alignment = PP_ALIGN.CENTER
    p_main.text = "LinkX Turns Dead Directories Into Living Economies."
    p_main.font.size = Pt(28)
    p_main.font.bold = True
    p_main.font.color.rgb = TEXT_WHITE

    p_body = tf10.add_paragraph()
    p_body.alignment = PP_ALIGN.CENTER
    p_body.text = "\n• Traditional directories fail because they lack mutual intent & proof-of-work.\n• LinkX protects alumni time with 1-minute dossiers & 1-click ATS referrals.\n• Students earn stipends & job offers on merit, not begging DMs.\n• Institutions gain actionable, audit-ready data for accreditation."
    p_body.font.size = Pt(14)
    p_body.font.color.rgb = TEXT_MUTED

    p_demo = tf10.add_paragraph()
    p_demo.alignment = PP_ALIGN.CENTER
    p_demo.text = "\n🚀 Live Engine Running at http://localhost:3000 • Ready for Q&A"
    p_demo.font.size = Pt(14)
    p_demo.font.bold = True
    p_demo.font.color.rgb = TEXT_ACCENT_BLUE

    output_path = "LinkX_Pitch_Deck.pptx"
    prs.save(output_path)
    print(f"Presentation saved successfully to {output_path}")

if __name__ == "__main__":
    create_deck()
