// server/controllers/shadowController.js

const SCENARIOS = [
  {
    id: 'sim-tech-interview',
    type: 'Technical Interview Simulation',
    track: 'Technical Architecture',
    title: 'High-Throughput Order Ingestion Under 50,000 RPS',
    company: 'Swiggy / Razorpay',
    difficulty: 'Advanced SDE-2',
    overview: 'You are interviewing for a Core Systems SDE role. The interviewer asks you to design a high-throughput order ingestion pipeline that must withstand sudden 10x traffic spikes during flash sales without dropping any customer orders or overloading MySQL databases.',
    stages: [
      {
        stageNumber: 1,
        prompt: 'The database is reaching maximum connection limits and replication lag is exceeding 45 seconds. How do you re-architect the write path immediately?',
        options: [
          {
            id: 'opt-1',
            label: 'Introduce Kafka buffer with partitioned consumer groups and async database batch writes',
            analysis: 'Excellent separation of concerns. Buffering writes decouples ingress rate from DB IOPS limit.',
            scoreDelta: 35
          },
          {
            id: 'opt-2',
            label: 'Add Redis write-through cache and write directly to MySQL master synchronously',
            analysis: 'Risky. Direct synchronous MySQL writes will still saturate connection pools and risk cascading downtime.',
            scoreDelta: 15
          },
          {
            id: 'opt-3',
            label: 'Implement client-side exponential backoff with HTTP 429 rate limiting',
            analysis: 'Prevents server crash, but results in high dropped checkout conversion and angry users.',
            scoreDelta: 20
          }
        ]
      },
      {
        stageNumber: 2,
        prompt: 'A network partition occurs between 2 Kafka broker nodes. Some orders risk double processing. How do you enforce idempotent order processing at the payment ledger layer?',
        options: [
          {
            id: 'opt-2-1',
            label: 'Enforce atomic database unique constraint on (order_id, idempotency_key) combined with Redis distributed locks',
            analysis: 'Industry-standard resilience. Guarantees exactly-once processing semantics at database commit boundary.',
            scoreDelta: 45
          },
          {
            id: 'opt-2-2',
            label: 'Check if order exists in memory cache before processing',
            analysis: 'Insufficient. Cache evictions or multiple consumer instances will cause race conditions and duplicate debits.',
            scoreDelta: 18
          }
        ]
      }
    ]
  },
  {
    id: 'sim-product-decision',
    type: 'Product & Architecture Decision',
    track: 'System Design & Scaling',
    title: 'Monolith vs Microservices Migration at Series B',
    company: 'HyperScale AI / YC Startup',
    difficulty: 'Senior Engineer / Tech Lead',
    overview: 'Your engineering team has grown from 4 to 28 engineers. The monolith repository takes 40 minutes to run CI/CD, and deployments fail twice a week due to merge conflicts. The VP of Product wants microservices, but the CTO worries about distributed transaction complexity.',
    stages: [
      {
        stageNumber: 1,
        prompt: 'How do you determine which domain boundary to carve out first from the monolith?',
        options: [
          {
            id: 'opt-1',
            label: 'Extract the independent, high-churn Notification & Webhook service via Strangler Fig pattern',
            analysis: 'Ideal first extraction: low domain entanglement, high I/O workload, safe failure surface.',
            scoreDelta: 40
          },
          {
            id: 'opt-2',
            label: 'Immediately decompose the core billing and user authentication database tables',
            analysis: 'Dangerous. Core transactional state has the highest coupling and risks catastrophic revenue loss.',
            scoreDelta: 15
          }
        ]
      },
      {
        stageNumber: 2,
        prompt: 'The extracted webhook service now experiences transient timeouts communicating back to the monolith. How do you prevent cascade failures?',
        options: [
          {
            id: 'opt-2-1',
            label: 'Deploy circuit breakers (Resilience4j / Hystrix) with dead-letter queue retries',
            analysis: 'Top-tier production readiness. Isolates failing downstream dependencies gracefully.',
            scoreDelta: 45
          },
          {
            id: 'opt-2-2',
            label: 'Increase HTTP request timeout to 60 seconds with unlimited retries',
            analysis: 'Causes resource starvation and thread pool exhaustion across all worker instances.',
            scoreDelta: 10
          }
        ]
      }
    ]
  },
  {
    id: 'sim-team-conflict',
    type: 'Team Leadership & Incident Management',
    track: 'Incident Response & SRE',
    title: 'Critical Production Regression Pushed 30 Minutes Before Sale',
    company: 'Tier-1 Engineering Culture',
    difficulty: 'Lead / Staff Engineer',
    overview: 'A junior teammate hotfixed a bug directly to release branch that accidentally broke zero-downtime database migrations right before an institutional admissions deadline.',
    stages: [
      {
        stageNumber: 1,
        prompt: 'Alerts are firing in Slack. The release is half-deployed. What is your immediate protocol?',
        options: [
          {
            id: 'opt-1',
            label: 'Execute automated blue-green rollback immediately, then initiate blameless incident bridge',
            analysis: 'Flawless engineering leadership: restore customer uptime first, analyze root cause second.',
            scoreDelta: 40
          },
          {
            id: 'opt-2',
            label: 'Hotfix the SQL migration script directly on live database cluster',
            analysis: 'High risk of table lockouts and unrecoverable schema corruption.',
            scoreDelta: 10
          }
        ]
      },
      {
        stageNumber: 2,
        prompt: 'The incident is resolved. How do you conduct the post-mortem with the junior engineer and engineering leadership?',
        options: [
          {
            id: 'opt-1',
            label: 'Draft a blameless retrospective identifying systemic CI/CD guardrail failures and implement branch protection rules',
            analysis: 'Constructive engineering culture. Focuses on system safeguards rather than interpersonal blame.',
            scoreDelta: 45
          },
          {
            id: 'opt-2',
            label: 'Revoke the junior developer’s deployment permissions indefinitely',
            analysis: 'Toxic and demotivating. Fails to fix the underlying lack of automated deployment gates.',
            scoreDelta: 15
          }
        ]
      }
    ]
  }
];

export function listCareerShadowScenarios() {
  return SCENARIOS.map(s => ({
    id: s.id,
    type: s.type,
    track: s.track || s.type,
    title: s.title,
    company: s.company,
    difficulty: s.difficulty,
    overview: s.overview,
    totalStages: s.stages.length
  }));
}

export function getScenarioDetail(scenarioId) {
  const scenario = SCENARIOS.find(s => s.id === scenarioId) || SCENARIOS[0];
  return scenario;
}

export function evaluateSimulationStep(db, body, writeDB) {
  const { scenarioId, stageNumber, selectedOptionId, customAnswer, studentId = 'student' } = body;
  const scenario = SCENARIOS.find(s => s.id === scenarioId) || SCENARIOS[0];
  const stage = scenario.stages.find(st => st.stageNumber === Number(stageNumber)) || scenario.stages[0];

  const matchedOption = stage.options.find(o => o.id === selectedOptionId) || stage.options[0];
  const score = matchedOption ? matchedOption.scoreDelta : 25;
  const analysis = matchedOption ? matchedOption.analysis : 'Custom decision evaluated for production trade-offs.';

  const isFinalStage = Number(stageNumber) >= scenario.stages.length;

  const rubricBreakdown = [
    { criterion: 'System Architecture & Decoupling', score: Math.min(100, 60 + score), status: 'Passed' },
    { criterion: 'Fault Tolerance & Idempotency', score: Math.min(100, 55 + score), status: 'Verified' },
    { criterion: 'Production Pragmatism', score: Math.min(100, 58 + score), status: 'Optimal' }
  ];

  const result = {
    scenarioId: scenario.id,
    scenarioTitle: scenario.title,
    stageNumber: Number(stageNumber),
    isFinalStage,
    score: Math.min(98, 50 + score),
    scoreAwarded: score,
    analysis,
    feedback: score >= 35 ? 'Production-grade decision aligned with senior engineering best practices.' : 'Acceptable, but has significant scalability or failure risks.',
    rubricBreakdown,
    feedbackDetails: {
      soundness: score >= 35 ? 'Strong' : 'Needs Optimization',
      verdict: score >= 35 ? 'Production-grade decision aligned with senior engineering best practices.' : 'Acceptable, but has significant scalability or failure risks.'
    }
  };

  if (isFinalStage) {
    db.shadowSessions ||= [];
    const totalScore = Math.min(98, 50 + score);
    const sessionRecord = {
      id: `shadow-${Date.now()}`,
      studentId,
      scenarioTitle: scenario.title,
      company: scenario.company,
      completedAt: new Date().toISOString(),
      score: totalScore,
      tier: totalScore >= 85 ? 'Principal / High-Conviction' : 'Competent Engineer',
      rubrics: {
        systemArchitecture: Math.min(100, totalScore + 2),
        communication: 92,
        riskMitigation: totalScore >= 85 ? 94 : 78,
        productionPragmatism: Math.min(98, totalScore - 1)
      }
    };
    db.shadowSessions.unshift(sessionRecord);
    writeDB(db);
    result.sessionRecord = sessionRecord;
  }

  return result;
}

export function getStudentShadowHistory(db, studentId = 'student') {
  db.shadowSessions ||= [];
  return db.shadowSessions.filter(s => s.studentId === studentId);
}
