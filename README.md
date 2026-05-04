🚀 AegisQA: Autonomous AI-Driven Testing Framework
AegisQA is an AI-native end-to-end test suite where Claude 3.5 Sonnet acts as a dynamic QA Agent. Developed within the Antigravity IDE ecosystem, this framework doesn't just run scripts; it plans, codes, and analyzes the entire testing lifecycle on saucedemo.com.

🧠 The Project Brain: CLAUDE.md
At the heart of the repository lies the CLAUDE.md file. This is the "operational manual" for the AI Agent, enabling:

Context Awareness: Deep understanding of the Page Object Model (POM) and TypeScript architecture.

Self-Correction: Autonomous decision-making to fix flaky locators or handle unexpected UI changes.

Workflow Discipline: Enforcing strict naming conventions and modularity without human oversight.

📊 Test Coverage Matrix
Page	Category	User Personas	Status
Login	Happy Path, Security, Edge Cases	standard, locked, problem, performance	✅ Production Ready
Inventory	UI Validation, Product Sorting	standard_user	⏳ In Progress
Cart	Persistence & State Management	standard_user	📅 Backlog
Checkout	E2E Transaction Flow	standard_user	📅 Backlog
🛠️ Technical Stack & Architecture
Core: Playwright + TypeScript

Orchestration: Claude 3.5 Sonnet (Agentic Workflow)

IDE: Antigravity (AI-native development environment)

CI/CD: GitHub Actions with Automated HTML Reporting

🚀 Getting Started

Bash
# Clone the repo and install dependencies
npm install
npx playwright install chromium

# Execute AI-driven test suite
npm test
🤖 AI-Powered Bug Tracking
This framework utilizes LLM analysis to categorize failures. Instead of raw logs, the agent provides Root Cause Analysis (RCA).

ID	Module	Detected Issue	Severity
BUG-001	Auth	Session persistence failure during manual URL redirection.	Medium
BUG-002	UI	Broken image assets detected for problem_user persona.	High
