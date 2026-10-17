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

    # LinkX Cyber Dark Theme Colors
    BG_DARK = RGBColor(3, 6, 17)        # #030611 Deep Obsidian
    BG_CARD = RGBColor(10, 16, 36)      # #0A1024 Card Glass
    BG_CARD_LIGHT = RGBColor(16, 26, 54) # #101A36
    TEXT_WHITE = RGBColor(248, 250, 252)
    TEXT_MUTED = RGBColor(148, 163, 184)
    TEXT_ACCENT_BLUE = RGBColor(56, 189, 248)   # Sky Blue
    TEXT_ACCENT_PURPLE = RGBColor(192, 132, 252) # Purple
    TEXT_ACCENT_PINK = RGBColor(244, 114, 182)   # Neon Pink
    TEXT_ACCENT_EMERALD = RGBColor(52, 211, 153) # Emerald
    BORDER_COLOR = RGBColor(30, 41, 59)
    BORDER_GLOW = RGBColor(99, 102, 241)

    def set_slide_background(slide):
        bg = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, Inches(13.333), Inches(7.5))
        bg.fill.solid()
        bg.fill.fore_color.rgb = BG_DARK
        bg.line.color.rgb = BG_DARK
        return bg

    def add_header(slide, slide_num, category, title, subtitle):
        # Category & Slide Num
        cat_box = slide.shapes.add_textbox(Inches(0.8), Inches(0.4), Inches(11.733), Inches(0.35))
        tf_c = cat_box.text_frame
        p_c = tf_c.paragraphs[0]
        p_c.text = f"{category.upper()}   •   {slide_num}"
        p_c.font.size = Pt(10)
        p_c.font.bold = True
        p_c.font.color.rgb = TEXT_ACCENT_PINK

        # Title
        title_box = slide.shapes.add_textbox(Inches(0.8), Inches(0.72), Inches(11.733), Inches(0.65))
        tf_t = title_box.text_frame
        p_t = tf_t.paragraphs[0]
        p_t.text = title
        p_t.font.size = Pt(22)
        p_t.font.bold = True
        p_t.font.color.rgb = TEXT_WHITE

        # Subtitle
        sub_box = slide.shapes.add_textbox(Inches(0.8), Inches(1.35), Inches(11.733), Inches(0.45))
        tf_s = sub_box.text_frame
        p_s = tf_s.paragraphs[0]
        p_s.text = subtitle
        p_s.font.size = Pt(11.5)
        p_s.font.color.rgb = TEXT_MUTED

    # ==================== SLIDE 1: COVER SLIDE ====================
    s1 = prs.slides.add_slide(blank_slide_layout)
    set_slide_background(s1)

    # Frame Box
    f1 = s1.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(1.0), Inches(0.9), Inches(11.333), Inches(5.7))
    f1.fill.solid()
    f1.fill.fore_color.rgb = BG_CARD
    f1.line.color.rgb = BORDER_GLOW
    f1.line.width = Pt(1.5)

    # Hackathon Tag
    tb1_tag = s1.shapes.add_textbox(Inches(1.5), Inches(1.2), Inches(10.333), Inches(0.4))
    p = tb1_tag.text_frame.paragraphs[0]
    p.alignment = PP_ALIGN.CENTER
    p.text = "🏛️ HACKSHIFT HACKATHON  •  IIIT DELHI   |   24-HOUR HACKATHON PROJECT"
    p.font.size = Pt(11)
    p.font.bold = True
    p.font.color.rgb = TEXT_ACCENT_PINK

    # Sub-badge
    tb1_sub = s1.shapes.add_textbox(Inches(1.5), Inches(1.6), Inches(10.333), Inches(0.35))
    p = tb1_sub.text_frame.paragraphs[0]
    p.alignment = PP_ALIGN.CENTER
    p.text = "TRACK 1: ALUMNI NETWORK & AI-POWERED MENTORSHIP MATCHING"
    p.font.size = Pt(9.5)
    p.font.bold = True
    p.font.color.rgb = TEXT_ACCENT_BLUE

    # Title: LinkX
    tb1_title = s1.shapes.add_textbox(Inches(1.5), Inches(2.0), Inches(10.333), Inches(1.4))
    p = tb1_title.text_frame.paragraphs[0]
    p.alignment = PP_ALIGN.CENTER
    r1 = p.add_run()
    r1.text = "Link"
    r1.font.size = Pt(64)
    r1.font.bold = True
    r1.font.color.rgb = TEXT_WHITE
    r2 = p.add_run()
    r2.text = "X"
    r2.font.size = Pt(72)
    r2.font.bold = True
    r2.font.italic = True
    r2.font.color.rgb = TEXT_ACCENT_BLUE

    # Taglines
    tb1_tagline = s1.shapes.add_textbox(Inches(1.5), Inches(3.4), Inches(10.333), Inches(0.9))
    p = tb1_tagline.text_frame.paragraphs[0]
    p.alignment = PP_ALIGN.CENTER
    p.text = "“BUILDING A LIVING NETWORK, NOT A DEAD DIRECTORY.”"
    p.font.size = Pt(18)
    p.font.bold = True
    p.font.color.rgb = TEXT_ACCENT_PURPLE

    p2 = tb1_tagline.text_frame.add_paragraph()
    p2.alignment = PP_ALIGN.CENTER
    p2.text = "Not just who you know, but who can help you grow — through verified Proof-of-Work & 1-Click Referrals."
    p2.font.size = Pt(12)
    p2.font.color.rgb = TEXT_MUTED

    # Team Members Box
    tb1_team = s1.shapes.add_textbox(Inches(1.5), Inches(4.7), Inches(10.333), Inches(1.2))
    p = tb1_team.text_frame.paragraphs[0]
    p.alignment = PP_ALIGN.CENTER
    p.text = "PROJECT TEAM MEMBERS:"
    p.font.size = Pt(10)
    p.font.bold = True
    p.font.color.rgb = TEXT_WHITE

    p_names = tb1_team.text_frame.add_paragraph()
    p_names.alignment = PP_ALIGN.CENTER
    p_names.text = "[ Dhani Varshney   •   Dipika Mourya   •   Ansh Kumar   •   Harsh Pal ]"
    p_names.font.size = Pt(14)
    p_names.font.bold = True
    p_names.font.color.rgb = TEXT_ACCENT_PINK

    p_tech = tb1_team.text_frame.add_paragraph()
    p_tech.alignment = PP_ALIGN.CENTER
    p_tech.text = "🧠 AI / AST Code Intelligence   |   ⚡ Full Stack Node.js & Modern Web Architecture"
    p_tech.font.size = Pt(10)
    p_tech.font.color.rgb = TEXT_MUTED

    # ==================== SLIDE 2: THE CHALLENGE ====================
    s2 = prs.slides.add_slide(blank_slide_layout)
    set_slide_background(s2)
    add_header(s2, "02 / 07", "The Challenge", "Finding the right mentor takes more than a dead directory.", 
               "Traditional alumni portals with 10,000+ names fail because they lack relevance, mutual intent, and proof.")

    ch_cards = [
        ("01", "The Relevance & Conviction Gap", 
         "A broad list of alumni names rarely makes it obvious who is actively open to mentoring, hiring, or referring. Students don't know who has the intent to help, resulting in arbitrary outreach.",
         TEXT_ACCENT_BLUE),
        ("02", "Time-Consuming Manual Search", 
         "Students spend hours browsing hundreds of stale LinkedIn profiles, comparing roles and companies manually without knowing whether the alumnus actually works in their target stack.",
         TEXT_ACCENT_PURPLE),
        ("03", "Outreach Hesitation & Cold-DM Spam", 
         "Students are unsure how to start a thoughtful message and default to generic begging ('Sir please refer me'). Busy engineers at Google/Swiggy ignore 98% of cold DMs and close their inboxes.",
         TEXT_ACCENT_PINK)
    ]

    for i, (num, title, desc, col) in enumerate(ch_cards):
        left = Inches(0.8 + i * 3.95)
        card = s2.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left, Inches(2.1), Inches(3.75), Inches(4.5))
        card.fill.solid()
        card.fill.fore_color.rgb = BG_CARD
        card.line.color.rgb = col
        card.line.width = Pt(1.2)

        tb = s2.shapes.add_textbox(left + Inches(0.2), Inches(2.3), Inches(3.35), Inches(4.1))
        tf = tb.text_frame
        tf.word_wrap = True

        p_num = tf.paragraphs[0]
        p_num.text = num
        p_num.font.size = Pt(28)
        p_num.font.bold = True
        p_num.font.color.rgb = col

        p_title = tf.add_paragraph()
        p_title.text = title
        p_title.font.size = Pt(15)
        p_title.font.bold = True
        p_title.font.color.rgb = TEXT_WHITE

        p_desc = tf.add_paragraph()
        p_desc.text = "\n" + desc
        p_desc.font.size = Pt(11.5)
        p_desc.font.color.rgb = TEXT_MUTED

    # ==================== SLIDE 3: SMART WORKFLOW ====================
    s3 = prs.slides.add_slide(blank_slide_layout)
    set_slide_background(s3)
    add_header(s3, "03 / 07", "Smart Workflow", "Our Solution: LinkX Reciprocity Pipeline", 
               "From natural-language career goals to verified proof-of-work and 1-click ATS referrals.")

    flow_steps = [
        ("1. Understand Intent", "Students describe career goals in natural language or specify target engineering challenges (not just keyword search).", TEXT_ACCENT_BLUE),
        ("2. Semantic Matching", "Compares intent with alumni expertise, company hiring slots, target stack, and past mentoring track record.", TEXT_ACCENT_PURPLE),
        ("3. AST Proof-of-Work", "Student attaches GitHub repo/PR. Engine verifies Code Readiness (94/100), Unit Tests (92%), and P99 Latency (14ms).", TEXT_ACCENT_PINK),
        ("4. 1-Minute Dossier", "AI packages a 60-second executive card. Alumnus approves with 1-Click to corporate ATS or gives 2-line code feedback.", TEXT_ACCENT_EMERALD)
    ]

    for i, (title, desc, col) in enumerate(flow_steps):
        left = Inches(0.8 + i * 2.95)
        card = s3.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left, Inches(2.05), Inches(2.78), Inches(2.5))
        card.fill.solid()
        card.fill.fore_color.rgb = BG_CARD
        card.line.color.rgb = col
        card.line.width = Pt(1)

        tb = s3.shapes.add_textbox(left + Inches(0.15), Inches(2.15), Inches(2.48), Inches(2.3))
        tf = tb.text_frame
        tf.word_wrap = True

        p_t = tf.paragraphs[0]
        p_t.text = title
        p_t.font.size = Pt(14)
        p_t.font.bold = True
        p_t.font.color.rgb = col

        p_d = tf.add_paragraph()
        p_d.text = "\n" + desc
        p_d.font.size = Pt(10.5)
        p_d.font.color.rgb = TEXT_MUTED

    # Bottom Example Box
    ex_box = s3.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(4.8), Inches(11.733), Inches(2.0))
    ex_box.fill.solid()
    ex_box.fill.fore_color.rgb = BG_CARD_LIGHT
    ex_box.line.color.rgb = BORDER_GLOW

    tb_ex = s3.shapes.add_textbox(Inches(1.0), Inches(4.9), Inches(11.333), Inches(1.8))
    tf_ex = tb_ex.text_frame
    tf_ex.word_wrap = True
    p = tf_ex.paragraphs[0]
    p.text = "ILLUSTRATIVE VERIFIED WORKFLOW IN LINKX:"
    p.font.size = Pt(10)
    p.font.bold = True
    p.font.color.rgb = TEXT_ACCENT_PINK

    p_run = tf_ex.add_paragraph()
    r = p_run.add_run()
    r.text = "Student Goal: "
    r.font.bold = True
    r.font.color.rgb = TEXT_WHITE
    r = p_run.add_run()
    r.text = "'Backend Distributed Systems internship at Swiggy'  →  "
    r.font.color.rgb = TEXT_ACCENT_BLUE

    r = p_run.add_run()
    r.text = "Proof Attached: "
    r.font.bold = True
    r.font.color.rgb = TEXT_WHITE
    r = p_run.add_run()
    r.text = "Consistent Hashing Ring in Go (94/100 Readiness)  →  "
    r.font.color.rgb = TEXT_ACCENT_PURPLE

    r = p_run.add_run()
    r.text = "Outcome: "
    r.font.bold = True
    r.font.color.rgb = TEXT_WHITE
    r = p_run.add_run()
    r.text = "Rohan Verma (Senior SDE @ Swiggy) triggers 1-Click ATS Referral!"
    r.font.color.rgb = TEXT_ACCENT_EMERALD

    # ==================== SLIDE 4: CAPABILITIES ====================
    s4 = prs.slides.add_slide(blank_slide_layout)
    set_slide_background(s4)
    add_header(s4, "04 / 07", "Capabilities", "Key Features & Differentiators", 
               "A laser-focused set of capabilities engineered to turn passive connections into tangible outcomes.")

    caps = [
        ("Anti-Cold-DM Pitch Lab", "Zero Raw Text Allowed. Students attach an active GitHub repo or PR; the AST engine automatically evaluates code depth, test ratios, and architectural cleanliness.", TEXT_ACCENT_BLUE),
        ("Explainable Recommendations", "Students and alumni see exact match rationale grounded in verified stack compatibility, shared university lineage, and specific technical blocker alignment.", TEXT_ACCENT_PURPLE),
        ("1-Click ATS Referral Radar", "Alumni make referral decisions in under 60 seconds. Pre-formatted dossiers push straight to company ATS (Workday, Lever, Greenhouse) with 0 screening friction.", TEXT_ACCENT_PINK),
        ("Micro-Bounties & Capstones", "Alumni founders post ₹5k–₹25k feature tickets solved in 48 hours; faculty link academic research capstones with alumni tech leads from Google & Microsoft.", TEXT_ACCENT_EMERALD)
    ]

    for i, (title, desc, col) in enumerate(caps):
        row = i // 2
        col_idx = i % 2
        left = Inches(0.8 + col_idx * 5.95)
        top = Inches(2.1 + row * 2.35)

        card = s4.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left, top, Inches(5.75), Inches(2.15))
        card.fill.solid()
        card.fill.fore_color.rgb = BG_CARD
        card.line.color.rgb = col
        card.line.width = Pt(1)

        tb = s4.shapes.add_textbox(left + Inches(0.2), top + Inches(0.2), Inches(5.35), Inches(1.75))
        tf = tb.text_frame
        tf.word_wrap = True

        p1 = tf.paragraphs[0]
        p1.text = title
        p1.font.size = Pt(15)
        p1.font.bold = True
        p1.font.color.rgb = col

        p2 = tf.add_paragraph()
        p2.text = "\n" + desc
        p2.font.size = Pt(11.5)
        p2.font.color.rgb = TEXT_MUTED

    # ==================== SLIDE 5: DIFFERENTIATING ADVANTAGE ====================
    s5 = prs.slides.add_slide(blank_slide_layout)
    set_slide_background(s5)
    add_header(s5, "05 / 07", "Differentiating Advantage", "Traditional Directory vs. LinkX Autonomous Network", 
               "Why traditional college databases fail and how LinkX guarantees high-signal engagement.")

    # Left Column: Traditional Directory
    card_trad = s5.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(2.1), Inches(5.75), Inches(4.5))
    card_trad.fill.solid()
    card_trad.fill.fore_color.rgb = BG_CARD
    card_trad.line.color.rgb = RGBColor(71, 85, 105) # slate-600

    tb_trad = s5.shapes.add_textbox(Inches(1.0), Inches(2.3), Inches(5.35), Inches(4.1))
    tf_trad = tb_trad.text_frame
    tf_trad.word_wrap = True

    p = tf_trad.paragraphs[0]
    p.text = "TRADITIONAL DIRECTORY SEARCH"
    p.font.size = Pt(16)
    p.font.bold = True
    p.font.color.rgb = RGBColor(248, 113, 113) # red-400

    trad_points = [
        ("Keyword & Filter Search:", "Requires students to manually browse thousands of stale records."),
        ("No Active Intent Signal:", "Alumni profiles sit dormant; students have no clue if alumni are available."),
        ("Cold-DM Spam:", "98% of cold messages ignored; alumni close inboxes due to resume fatigue."),
        ("Zero Proof-of-Work:", "Relies on generic self-reported resumes without code verification."),
        ("Zero Accreditation Telemetry:", "College administrations have zero visibility into actual hiring conversions.")
    ]
    for pt, pd in trad_points:
        p_pt = tf_trad.add_paragraph()
        p_pt.text = "• " + pt + " " + pd
        p_pt.font.size = Pt(10.5)
        p_pt.font.color.rgb = TEXT_MUTED

    # Right Column: LinkX Search
    card_linkx = s5.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(6.8), Inches(2.1), Inches(5.75), Inches(4.5))
    card_linkx.fill.solid()
    card_linkx.fill.fore_color.rgb = BG_CARD
    card_linkx.line.color.rgb = TEXT_ACCENT_PINK
    card_linkx.line.width = Pt(1.5)

    tb_linkx = s5.shapes.add_textbox(Inches(7.0), Inches(2.3), Inches(5.35), Inches(4.1))
    tf_linkx = tb_linkx.text_frame
    tf_linkx.word_wrap = True

    p = tf_linkx.paragraphs[0]
    p.text = "LINKX AUTONOMOUS RECIPROCITY"
    p.font.size = Pt(16)
    p.font.bold = True
    p.font.color.rgb = TEXT_ACCENT_EMERALD

    linkx_points = [
        ("Natural-Language Intent Input:", "Students state engineering challenges & target roles directly."),
        ("Real-Time Availability Radar:", "Active badges show referral capacity, bounty slots, and mentoring status."),
        ("Zero Cold DMs & Spam Banned:", "Mandatory code attachment; only verified dossiers reach alumni inboxes."),
        ("AST Code Readiness Engine:", "Parses actual GitHub repo architecture, unit test ratios, and P99 latency."),
        ("1-Click ATS Referral Action:", "Dispatches pre-vetted dossiers directly into Workday/Greenhouse in 60s.")
    ]
    for pt, pd in linkx_points:
        p_pt = tf_linkx.add_paragraph()
        p_pt.text = "✓ " + pt + " " + pd
        p_pt.font.size = Pt(10.5)
        p_pt.font.color.rgb = TEXT_WHITE

    # ==================== SLIDE 6: ARCHITECTURE & PROTOTYPE ====================
    s6 = prs.slides.add_slide(blank_slide_layout)
    set_slide_background(s6)
    add_header(s6, "06 / 07", "Architecture & Prototype", "Full-Stack Technology Stack & Live Engine", 
               "High-performance, modular system powering 6 distinct campus portals.")

    # 3 Architecture Cards
    arch_cols = [
        ("Frontend Client", "Modern ES6+ SPA / React 19", [
            "Tailwind CSS Cyber Obsidian design tokens",
            "Hardware-accelerated mesh gradients & ambient orbs",
            "Lucide icons & responsive RBAC interface",
            "Sub-50ms DOM updates & zero bundle latency"
        ], TEXT_ACCENT_BLUE),
        ("Backend & REST Core", "Node.js & Express REST API", [
            "ES Modules architecture (Node.js v20+)",
            "Role-Based Access Control (RBAC) across 6 roles",
            "ACID-safe persistent JSON datastore (db.json)",
            "CORS & high-throughput API endpoints"
        ], TEXT_ACCENT_PURPLE),
        ("AI & Code Intelligence", "AST Parser & Gemini AI", [
            "GitHub REST API v3 repo tree & commit scanning",
            "AST Code Readiness evaluator (0–100 score)",
            "Google Gemini AI 60s flash dossier synthesizer",
            "Graceful fallback heuristic simulation engine"
        ], TEXT_ACCENT_PINK)
    ]

    for i, (title, sub, bullets, col) in enumerate(arch_cols):
        left = Inches(0.8 + i * 3.95)
        card = s6.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left, Inches(2.1), Inches(3.75), Inches(3.0))
        card.fill.solid()
        card.fill.fore_color.rgb = BG_CARD
        card.line.color.rgb = col
        card.line.width = Pt(1)

        tb = s6.shapes.add_textbox(left + Inches(0.2), Inches(2.25), Inches(3.35), Inches(2.7))
        tf = tb.text_frame
        tf.word_wrap = True

        p1 = tf.paragraphs[0]
        p1.text = title
        p1.font.size = Pt(14)
        p1.font.bold = True
        p1.font.color.rgb = col

        p2 = tf.add_paragraph()
        p2.text = sub
        p2.font.size = Pt(10)
        p2.font.bold = True
        p2.font.color.rgb = TEXT_WHITE

        for b in bullets:
            pb = tf.add_paragraph()
            pb.text = "• " + b
            pb.font.size = Pt(9.5)
            pb.font.color.rgb = TEXT_MUTED

    # Bottom Live Demo Banner
    demo_box = s6.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(5.3), Inches(11.733), Inches(1.5))
    demo_box.fill.solid()
    demo_box.fill.fore_color.rgb = BG_CARD_LIGHT
    demo_box.line.color.rgb = TEXT_ACCENT_EMERALD

    tb_demo = s6.shapes.add_textbox(Inches(1.0), Inches(5.4), Inches(11.333), Inches(1.3))
    tf_demo = tb_demo.text_frame
    tf_demo.word_wrap = True

    p = tf_demo.paragraphs[0]
    p.text = "LIVE SYSTEM DEMONSTRATION AT HACKSHIFT:"
    p.font.size = Pt(11)
    p.font.bold = True
    p.font.color.rgb = TEXT_ACCENT_EMERALD

    p_info = tf_demo.add_paragraph()
    p_info.text = "• Full-Stack Engine running live at http://localhost:3000\n• 6 Interactive Portals: Student, Alumnus, Founder, Faculty, Recruiter, Institution\n• Real-Time GitHub Code Scanner, Micro-Bounties Escrow, and 1-Click ATS Referral Actions"
    p_info.font.size = Pt(10.5)
    p_info.font.color.rgb = TEXT_WHITE

    # ==================== SLIDE 7: ROADMAP & IMPACT ====================
    s7 = prs.slides.add_slide(blank_slide_layout)
    set_slide_background(s7)
    add_header(s7, "07 / 07", "Roadmap & Impact", "Expected MVP Benefits & Future Horizon", 
               "“Not just who you know, but who can help you grow. Better Connections. Better Opportunities.”")

    # Left Card: MVP Benefits
    card_b = s7.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(2.1), Inches(5.75), Inches(3.6))
    card_b.fill.solid()
    card_b.fill.fore_color.rgb = BG_CARD
    card_b.line.color.rgb = TEXT_ACCENT_BLUE

    tb_b = s7.shapes.add_textbox(Inches(1.0), Inches(2.25), Inches(5.35), Inches(3.3))
    tf_b = tb_b.text_frame
    tf_b.word_wrap = True

    p = tf_b.paragraphs[0]
    p.text = "EXPECTED MVP BENEFITS:"
    p.font.size = Pt(15)
    p.font.bold = True
    p.font.color.rgb = TEXT_ACCENT_BLUE

    b_pts = [
        "Zero-Spam Campus Networking: Replaces unsolicited begging DMs with verified engineering proof-of-work.",
        "60-Second Referral Decisions: Saves alumni hours of resume screening while protecting their internal company reputation.",
        "Direct Student Monetization: Campus builders earn real stipends solving startup micro-bounties before graduating.",
        "Accreditation-Ready Telemetry: Provides college administrations with instant, audit-grade data for NAAC and NIRF."
    ]
    for pt in b_pts:
        pb = tf_b.add_paragraph()
        pb.text = "✓ " + pt
        pb.font.size = Pt(10.5)
        pb.font.color.rgb = TEXT_MUTED

    # Right Card: Future Scope
    card_f = s7.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(6.8), Inches(2.1), Inches(5.75), Inches(3.6))
    card_f.fill.solid()
    card_f.fill.fore_color.rgb = BG_CARD
    card_f.line.color.rgb = TEXT_ACCENT_PURPLE

    tb_f = s7.shapes.add_textbox(Inches(7.0), Inches(2.25), Inches(5.35), Inches(3.3))
    tf_f = tb_f.text_frame
    tf_f.word_wrap = True

    p = tf_f.paragraphs[0]
    p.text = "FUTURE HORIZON & SCALABILITY:"
    p.font.size = Pt(15)
    p.font.bold = True
    p.font.color.rgb = TEXT_ACCENT_PURPLE

    f_pts = [
        "AI Skill-Gap Diagnostics: Compares candidate code against corporate hiring benchmarks and auto-assigns targeted learning modules.",
        "Federated Multi-Campus Network: Interconnects university nodes across Delhi-NCR and global alumni chapters.",
        "Automated Calendar Sync: 1-click scheduling for alumni mock interviews and capstone checkpoint reviews.",
        "Smart Contract Escrow: Automated bounty payouts upon merged GitHub Pull Requests."
    ]
    for pt in f_pts:
        pf = tf_f.add_paragraph()
        pf.text = "🚀 " + pt
        pf.font.size = Pt(10.5)
        pf.font.color.rgb = TEXT_MUTED

    # Bottom Footer
    foot_box = s7.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(5.9), Inches(11.733), Inches(1.0))
    foot_box.fill.solid()
    foot_box.fill.fore_color.rgb = BG_CARD_LIGHT
    foot_box.line.color.rgb = TEXT_ACCENT_PINK

    tb_foot = s7.shapes.add_textbox(Inches(1.0), Inches(5.95), Inches(11.333), Inches(0.9))
    tf_foot = tb_foot.text_frame
    tf_foot.word_wrap = True
    p = tf_foot.paragraphs[0]
    p.alignment = PP_ALIGN.CENTER
    p.text = "LinkX   •   HACKSHIFT HACKATHON   •   IIIT DELHI"
    p.font.size = Pt(12)
    p.font.bold = True
    p.font.color.rgb = TEXT_WHITE

    p2 = tf_foot.add_paragraph()
    p2.alignment = PP_ALIGN.CENTER
    p2.text = "Team: Dhani Varshney  |  Dipika Mourya  |  Ansh Kumar  |  Harsh Pal"
    p2.font.size = Pt(11)
    p2.font.bold = True
    p2.font.color.rgb = TEXT_ACCENT_PINK

    output_path = "LinkX_Pitch_Deck.pptx"
    prs.save(output_path)
    print(f"Presentation saved successfully to {output_path}")

if __name__ == "__main__":
    create_deck()
