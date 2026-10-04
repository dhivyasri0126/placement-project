# Prompt: Implement Landing Page & Refactor Resume Analysis UI

## Purpose
Analyse the provided UI mockup (`docs/ui/mockup.png`), extract design notes for Screen 1 (Landing Page) and Screen 3 (Resume Analysis), and implement the UI using CareerPilot's semantic design tokens and calm, non-AI-hype design language.

## Source Analysis & Extracted UI Notes

### 1. Screen 1: Landing Page
- **Navigation Bar**:
  - Brand Logo + "CareerPilot" placement preparation platform identifier.
  - Navigation links: Home, Features, How It Works, Preparation Loop.
  - Action CTA: Sign In / Register / Dashboard (context-aware for authenticated users).
- **Hero Section**:
  - Headline: "Your Placement Preparation Companion" (calm, professional phrasing, avoiding gimmicky AI tags).
  - Subhead: "Personalized learning. Smarter practice. Track your progress. Get placement ready."
  - Primary CTA: "Get Started" (routes to `/register` or `/dashboard`).
  - Secondary CTA: "Explore Preparation Loop" (smooth scroll / visual walkthrough).
  - Hero Graphic: Polished, professional student placement preparation showcase with clean live metric cards (Resume Score 82%, Target Company: Google / Zoho, LeetCode 247, Mock Ready) using semantic tokens.
- **Hero Feature Modules (4 Core Pills from Mockup)**:
  1. *Resume Analysis*: In-depth structure & ATS evaluation.
  2. *Job Matching*: Role benchmarks and alignment against company requirements.
  3. *Personalized Study Plan*: Goal-oriented learning roadmaps.
  4. *Track LeetCode & GitHub*: Quantitative coding progress and commit activity.
- **Preparation Loop Section**:
  - Visualizing the 8-step preparation loop defined in `docs/07-ux-design-spec.md` (Target Company → Resume Analysis → Skill Gap → Learning Roadmap → Practice → Mock Interview → Feedback → Progress).
- **Footer**:
  - Platform links, documentation references, and copyright.

### 2. Screen 3: Resume Analysis
- **Top Header**:
  - Page title: "Resume Analysis" with subtitle.
  - Actions:
    - "Re-upload" (outline button with upload icon) opens upload dropzone/modal.
    - "Download Report" (primary filled button with download icon) downloads parsed report.
- **Top Metric Cards**:
  - **Overall Resume Score Card**:
    - Large circular/gauge progress meter with "82%" in semantic success green (`--color-success-500` / `#10B981`).
    - Evaluation status: "Good resume. A few improvements can make it stronger."
    - Metric breakdown: ATS formatting, keyword density, project clarity.
  - **Key Suggestions Card**:
    - Bullet list with accent icons:
      * Add measurable achievements in projects
      * Include relevant keywords for target roles
      * Mention more technical skills (Docker, AWS)
      * Improve project descriptions with impact
- **Lower Tabbed Interface**:
  - Tabs:
    1. *Extracted Information* (Default active):
       - Personal Information: Name, Email, Education, Location.
       - Skills: Categorized badges (Java, Spring Boot, React, SQL, MongoDB, Git, HTML, CSS, DSA, Problem Solving).
       - Projects: Structured project cards (HydroShield, Smart Parking System, YumSpot) with tech tags and summaries.
    2. *Skills Analysis*:
       - Core competency breakdown, match coverage, verified vs missing skills.
    3. *Suggestions*:
       - Detailed actionable improvements categorized by priority (Impact, Technical Keywords, Formatting).
    4. *Matched Roles*:
       - Role fit benchmarks (Backend Developer Intern @ Zoho 88%, SDE Intern @ Google 85%, etc.).
- **State Handling**:
  - Integrated with live backend (`/api/v1/resumes/latest`, `/api/v1/resumes`, `/api/v1/students/me`).
  - Seamless loading, empty (first-time upload), and error states.

## Step-by-Step Flow
1. **Document Prompt**: Create this prompt file under `prompts/fe-ui-001-landing-page-and-resume-analysis.md`.
2. **Build Landing Page Component**: Implement `careerpilot-frontend/src/pages/LandingPage.tsx` with clean semantic tokens, hero showcase, feature pills, preparation loop visualizer, and call to actions.
3. **Build/Refactor Resume Analysis Component**:
   - Create `careerpilot-frontend/src/pages/ResumeAnalysisPage.tsx` adhering to the mockup's layout (top score card + suggestions, lower 4-tab panel with extracted info, skills, suggestions, and matched roles).
   - Support re-uploading via integrated modal/dropzone and downloading report via backend API.
4. **Update Routing & Navigation**:
   - Update `careerpilot-frontend/src/App.tsx` so `/` serves `LandingPage` while maintaining smooth redirection if requested.
   - Mount `/resume-analysis` under authenticated protected routes.
   - Update `careerpilot-frontend/src/components/Navbar.tsx` and `DashboardPage.tsx` with direct navigation to Resume Analysis.
5. **Validation**: Run type checks, lint checks (`npm run lint`), and build checks (`npm run build`).

## Decision Point
- **Option A**: Implement hardcoded static mockups with raw CSS and purple AI badges.
  - *Short description*: Replicates visual look quickly, but violates project rules (no AI hype signs, semantic tokens must be used) and doesn't connect to backend student/resume data.
- **Option B (Recommended)**: Build token-driven, fully accessible React pages for Landing Page and Resume Analysis with calm semantic colors, real state transitions (empty, loading, populated), tabbed exploration, and direct integration with `/api/v1/resumes`.
  - *Why*: Satisfies user constraint ("use our semantic colors and non ai signs"), aligns with `docs/07-ux-design-spec.md` and `AGENTS.md`, and connects to the existing Spring Boot backend and auth flows.

## Definition of Done
- Landing page renders at `/` with hero, feature pills, and preparation loop.
- Resume analysis renders at `/resume-analysis` matching Mockup 3 (score card 82%, suggestions, tabs: Extracted Information, Skills Analysis, Suggestions, Matched Roles).
- Re-upload and download actions are accessible and functional.
- Fully adheres to WCAG 2.2 AA accessibility and CareerPilot semantic tokens without AI hype signs.
- `npm run lint` and `npm run build` pass with 0 errors.
