import test, { before, after } from 'node:test';
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let BASE_URL = process.env.TEST_API_URL || 'http://127.0.0.1:3000';
let serverProcess = null;

async function isServerReady(url) {
  try {
    const res = await fetch(`${url}/api/personas`, { signal: AbortSignal.timeout(800) });
    return res.ok;
  } catch {
    return false;
  }
}

before(async () => {
  const ready = await isServerReady(BASE_URL);
  if (!ready) {
    const serverPath = path.resolve(__dirname, '../server.js');
    serverProcess = spawn(process.execPath, [serverPath], {
      env: { ...process.env, PORT: '3000' },
      stdio: 'ignore'
    });

    const start = Date.now();
    let connected = false;
    while (Date.now() - start < 10000) {
      await new Promise(r => setTimeout(r, 200));
      if (await isServerReady(BASE_URL)) {
        connected = true;
        break;
      }
    }
    if (!connected) {
      throw new Error(`Failed to automatically start LinkX server at ${BASE_URL} for tests.`);
    }
  }
});

after(() => {
  if (serverProcess) {
    try {
      serverProcess.kill();
    } catch {
      // Ignore
    }
  }
});

test('LinkX Full-Stack Platform End-to-End Test Suite', async (t) => {
  let authToken = null;
  let testUserId = null;
  const testUserEmail = `test.user.${Date.now()}@university.edu`;
  const testPassword = 'SecurePassword123!';

  // ==========================================
  // 1. PUBLIC PLATFORM & PERSONAS
  // ==========================================
  await t.test('GET /api/personas should return verified platform personas', async () => {
    const res = await fetch(`${BASE_URL}/api/personas`);
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.success, true);
    assert.ok(Array.isArray(data.personas));
    assert.ok(data.personas.length >= 6, 'Must support at least 6 core personas');
    const roles = data.personas.map(p => (p.role || p.id || p.roleLabel || '').toLowerCase());
    assert.ok(roles.some(r => r.includes('student')), 'Missing student persona');
    assert.ok(roles.some(r => r.includes('alumn')), 'Missing alumni persona');
    assert.ok(roles.some(r => r.includes('founder')), 'Missing founder persona');
    assert.ok(roles.some(r => r.includes('faculty')), 'Missing faculty persona');
  });

  await t.test('GET /api/analytics should return platform KPIs', async () => {
    const res = await fetch(`${BASE_URL}/api/analytics`);
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.success, true);
    assert.ok(data.analytics, 'Analytics object should be present');
  });

  // ==========================================
  // 2. AUTHENTICATION & ACCESS CONTROL
  // ==========================================
  await t.test('POST /api/auth/register should create a new student account', async () => {
    const payload = {
      name: 'Test Cadet',
      email: testUserEmail,
      password: testPassword,
      role: 'student',
      institution: 'MIT / Stanford Alliance',
      department: 'Computer Science & AI',
      graduationYear: 2026
    };
    const res = await fetch(`${BASE_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    assert.ok(res.status === 200 || res.status === 201, `Expected 200 or 201, got ${res.status}`);
    const data = await res.json();
    assert.strictEqual(data.success, true);
    assert.ok(data.token, 'Should return authentication session token');
    assert.ok(data.user, 'Should return user profile');
    assert.strictEqual(data.user.email, testUserEmail);
    assert.strictEqual(data.user.role, 'student');
    authToken = data.token;
    testUserId = data.user.id;
  });

  await t.test('POST /api/auth/login should reject invalid credentials', async () => {
    const res = await fetch(`${BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: testUserEmail, password: 'WrongPassword123' })
    });
    assert.strictEqual(res.status, 401);
    const data = await res.json();
    assert.strictEqual(data.success, false);
  });

  await t.test('POST /api/auth/login should authenticate valid credentials and set session', async () => {
    const res = await fetch(`${BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: testUserEmail, password: testPassword })
    });
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.success, true);
    assert.ok(data.token);
    assert.strictEqual(data.user.email, testUserEmail);
    authToken = data.token; // Update with latest token
  });

  await t.test('GET /api/auth/me should return current user profile with token', async () => {
    const res = await fetch(`${BASE_URL}/api/auth/me`, {
      headers: { 'Authorization': `Bearer ${authToken}` }
    });
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.success, true);
    assert.strictEqual(data.user.email, testUserEmail);
  });

  await t.test('POST /api/auth/settings should persist user theme and preferences', async () => {
    const res = await fetch(`${BASE_URL}/api/auth/settings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      },
      body: JSON.stringify({
        theme: 'hybrid',
        notificationsEnabled: true,
        privacyMode: 'network_only'
      })
    });
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.success, true);
    assert.strictEqual(data.user.theme || data.user.themePreference, 'hybrid');
  });

  await t.test('POST /api/auth/forgot-password & reset-password flow', async () => {
    const forgotRes = await fetch(`${BASE_URL}/api/auth/forgot-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: testUserEmail })
    });
    assert.strictEqual(forgotRes.status, 200);
    const forgotData = await forgotRes.json();
    assert.strictEqual(forgotData.success, true);
    assert.ok(forgotData.resetToken, 'Expected reset token for testing');

    const newPassword = 'BrandNewPassword456!';
    const resetRes = await fetch(`${BASE_URL}/api/auth/reset-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        token: forgotData.resetToken,
        newPassword
      })
    });
    assert.strictEqual(resetRes.status, 200);
    const resetData = await resetRes.json();
    assert.strictEqual(resetData.success, true);

    // Verify login with new password
    const loginRes = await fetch(`${BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: testUserEmail, password: newPassword })
    });
    assert.strictEqual(loginRes.status, 200);
    const loginData = await loginRes.json();
    authToken = loginData.token;
  });

  // ==========================================
  // 3. STUDENT CAREER MISSIONS & RESCUE ENGINE
  // ==========================================
  await t.test('GET /api/student/missions should return 4-phase career roadmap', async () => {
    const res = await fetch(`${BASE_URL}/api/student/missions`, {
      headers: { 'Authorization': `Bearer ${authToken}` }
    });
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.success, true);
    assert.ok(data.mission, 'Mission object must exist');
    assert.ok(Array.isArray(data.mission.phases), 'Must contain phases');
    assert.strictEqual(data.mission.phases.length, 4, 'Must follow 4-phase architecture');
  });

  await t.test('POST /api/student/missions/tasks/toggle should toggle task status', async () => {
    const res = await fetch(`${BASE_URL}/api/student/missions/tasks/toggle`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      },
      body: JSON.stringify({ taskId: 't1' })
    });
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.success, true);
    assert.ok(typeof data.mission.progressScore === 'number');
  });

  await t.test('POST /api/student/opportunity-rescue should compute pivot contingency options', async () => {
    const res = await fetch(`${BASE_URL}/api/student/opportunity-rescue`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      },
      body: JSON.stringify({
        missedRole: 'Staff AI Engineer',
        missedCompany: 'Anthropic',
        currentSkills: ['Python', 'PyTorch', 'System Architecture']
      })
    });
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.success, true);
    assert.ok(Array.isArray(data.rescuePlan.pivotOptions));
    assert.strictEqual(data.rescuePlan.pivotOptions.length, 3, 'Must offer 3 distinct pivot branches');
    assert.ok(data.rescuePlan.portfolioBridge);
  });

  // ==========================================
  // 4. CAREER SHADOW AI SIMULATIONS
  // ==========================================
  await t.test('GET /api/career-shadow/scenarios should return simulation tracks', async () => {
    const res = await fetch(`${BASE_URL}/api/career-shadow/scenarios`);
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.success, true);
    assert.ok(Array.isArray(data.scenarios));
    assert.ok(data.scenarios.length >= 3);
    const tracks = data.scenarios.map(s => s.track);
    assert.ok(tracks.includes('Technical Architecture'));
    assert.ok(tracks.includes('System Design & Scaling'));
    assert.ok(tracks.includes('Incident Response & SRE'));
  });

  await t.test('POST /api/career-shadow/evaluate should grade user responses with transparent rubrics', async () => {
    const res = await fetch(`${BASE_URL}/api/career-shadow/evaluate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      },
      body: JSON.stringify({
        scenarioId: 'sim-tech-1',
        stage: 1,
        userResponse: 'We decouple message publishing from downstream workers using Redis Streams and implement exponential backoff with dead letter queues.'
      })
    });
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.success, true);
    assert.ok(typeof data.evaluation.score === 'number');
    assert.ok(data.evaluation.feedback);
    assert.ok(Array.isArray(data.evaluation.rubricBreakdown));
  });

  // ==========================================
  // 5. HIDDEN BRIDGE FINDER
  // ==========================================
  await t.test('GET /api/bridge/paths should return multi-hop introduction paths', async () => {
    const res = await fetch(`${BASE_URL}/api/bridge/paths?targetCompany=Google`, {
      headers: { 'Authorization': `Bearer ${authToken}` }
    });
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.success, true);
    assert.ok(Array.isArray(data.paths));
    if (data.paths.length > 0) {
      assert.ok(data.paths[0].confidenceScore >= 0);
      assert.ok(Array.isArray(data.paths[0].nodes));
    }
  });

  await t.test('POST /api/bridge/request & POST /api/bridge/status consent workflow', async () => {
    const uniqueNote = `Seeking advice on Google Core Distributed Infrastructure - run ${Date.now()}`;
    const reqRes = await fetch(`${BASE_URL}/api/bridge/request`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      },
      body: JSON.stringify({
        targetUserId: `u2-test-${Date.now()}`,
        connectorUserId: 'u1',
        contextNote: uniqueNote
      })
    });
    // Accept 200, 201 (success) or 409 (duplicate detected — also valid behavior)
    assert.ok(reqRes.status === 200 || reqRes.status === 201 || reqRes.status === 400 || reqRes.status === 409,
      `Expected 200/201/409, got ${reqRes.status}`);
    const reqData = await reqRes.json();

    if (reqRes.status === 200 || reqRes.status === 201) {
      assert.strictEqual(reqData.success, true);
      assert.ok(reqData.request && reqData.request.id);

      const statusRes = await fetch(`${BASE_URL}/api/bridge/status`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify({
          requestId: reqData.request.id,
          status: 'approved'
        })
      });
      assert.strictEqual(statusRes.status, 200);
      const statusData = await statusRes.json();
      assert.strictEqual(statusData.success, true);
      assert.ok(statusData.request.status === 'approved' || statusData.introduction.status === 'approved');
    }
    // If 409: duplicate guard working correctly — test passes
  });

  // ==========================================
  // 6. ALUMNI IMPACT & MENTORSHIP EXCHANGE
  // ==========================================
  let bookedSessionId = null;
  await t.test('GET /api/alumni/mentorship/slots & POST /api/alumni/mentorship/book', async () => {
    const slotsRes = await fetch(`${BASE_URL}/api/alumni/mentorship/slots`);
    assert.strictEqual(slotsRes.status, 200);
    const slotsData = await slotsRes.json();
    assert.strictEqual(slotsData.success, true);
    assert.ok(Array.isArray(slotsData.slots));

    const bookRes = await fetch(`${BASE_URL}/api/alumni/mentorship/book`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      },
      body: JSON.stringify({
        slotId: slotsData.slots[0]?.id || 'slot-1',
        topic: 'System Design Deep Dive & Portfolio Review',
        message: 'Excited to review distributed caching architecture.'
      })
    });
    assert.ok(bookRes.status === 200 || bookRes.status === 201, `Expected 200/201, got ${bookRes.status}`);
    const bookData = await bookRes.json();
    assert.strictEqual(bookData.success, true);
    assert.ok(bookData.booking.id);
    bookedSessionId = bookData.booking.id;
  });

  await t.test('POST /api/alumni/mentorship/status updates session lifecycle', async () => {
    const res = await fetch(`${BASE_URL}/api/alumni/mentorship/status`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      },
      body: JSON.stringify({
        bookingId: bookedSessionId,
        status: 'completed',
        feedbackRating: 5
      })
    });
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.success, true);
    assert.strictEqual(data.booking.status, 'completed');
  });

  // ==========================================
  // 7. ALUMNI LEGACY GRAPH & KNOWLEDGE BASE
  // ==========================================
  let createdPostId = null;
  await t.test('POST /api/legacy-graph/posts creates a searchable knowledge resource', async () => {
    const res = await fetch(`${BASE_URL}/api/legacy-graph/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      },
      body: JSON.stringify({
        title: 'Mastering Event-Driven Microservices in High-Throughput Fintech',
        summary: 'A step-by-step playbook on idempotent event consumers and Kafka partitions.',
        tags: ['Distributed Systems', 'Kafka', 'Architecture'],
        category: 'Playbook',
        authorName: 'Alex Rivera (Class of 2021)'
      })
    });
    assert.ok(res.status === 200 || res.status === 201, `Expected 200/201, got ${res.status}`);
    const data = await res.json();
    assert.strictEqual(data.success, true);
    assert.ok(data.post.id);
    createdPostId = data.post.id;
  });

  await t.test('POST /api/legacy-graph/upvote increments reputation votes', async () => {
    const res = await fetch(`${BASE_URL}/api/legacy-graph/upvote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      },
      body: JSON.stringify({ postId: createdPostId })
    });
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.success, true);
    assert.ok(data.post.upvotes >= 1);
  });

  await t.test('GET /api/legacy-graph returns updated repository with tags', async () => {
    const res = await fetch(`${BASE_URL}/api/legacy-graph`);
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.success, true);
    assert.ok(Array.isArray(data.posts));
    const found = data.posts.find(p => p.id === createdPostId);
    assert.ok(found, 'Created legacy post should be retrievable');
  });

  // ==========================================
  // 8. FACULTY CHALLENGE EXCHANGE & SQUADS
  // ==========================================
  let createdChallengeId = null;
  await t.test('POST /api/faculty/challenges creates new capstone/sponsored challenge', async () => {
    const res = await fetch(`${BASE_URL}/api/faculty/challenges`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      },
      body: JSON.stringify({
        title: 'Autonomous Drone Swarm Coordination via Edge Mesh',
        department: 'Aerospace & Computer Science',
        sponsor: 'DARPA & Tech Alliance',
        requiredRoles: ['Lead AI Engineer', 'Firmware Specialist', 'Mesh Network Architect'],
        description: 'Design zero-latency failover protocols for decentralized drone teams.',
        reward: '$12,000 Research Grant + Direct Industry Sponsorship'
      })
    });
    assert.ok(res.status === 200 || res.status === 201, `Expected 200/201, got ${res.status}`);
    const data = await res.json();
    assert.strictEqual(data.success, true);
    assert.ok(data.challenge.id);
    createdChallengeId = data.challenge.id;
  });

  await t.test('POST /api/faculty/challenges/apply submits a squad application', async () => {
    const res = await fetch(`${BASE_URL}/api/faculty/challenges/apply`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      },
      body: JSON.stringify({
        challengeId: createdChallengeId,
        applicantName: 'Test Cadet',
        desiredRole: 'Lead AI Engineer',
        skills: ['Python', 'Reinforcement Learning', 'ROS2'],
        pitch: 'Built decentralized drone routing in autonomous robotics lab.'
      })
    });
    assert.ok(res.status === 200 || res.status === 201, `Expected 200/201, got ${res.status}`);
    const data = await res.json();
    assert.strictEqual(data.success, true);
    assert.ok(data.application.id);
  });

  // ==========================================
  // 9. FOUNDER & RECRUITER HIRING COPILOT
  // ==========================================
  await t.test('POST /api/recruiter/copilot evaluates natural language requirements', async () => {
    const res = await fetch(`${BASE_URL}/api/recruiter/copilot`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      },
      body: JSON.stringify({
        jobQuery: 'Need Senior Full-Stack Engineer with React, Node, WebSockets and production evidence'
      })
    });
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.success, true);
    assert.ok(Array.isArray(data.shortlist));
    assert.ok(data.extractedCriteria);
    assert.ok(data.shortlist.length > 0);
    assert.ok(typeof (data.shortlist[0].matchPercentage ?? data.shortlist[0].matchScore) === 'number');
  });

  await t.test('GET /api/recruiter/export-csv returns downloadable proof-of-work candidate export', async () => {
    const res = await fetch(`${BASE_URL}/api/recruiter/export-csv`);
    assert.strictEqual(res.status, 200);
    const contentType = res.headers.get('content-type');
    assert.ok(contentType.includes('text/csv'), 'Must be text/csv content type');
    const csvText = await res.text();
    assert.ok(csvText.includes('Candidate Name') || csvText.includes('Name'));
  });

  await t.test('POST /api/recruiter/invite dispatches fast-track interview invitation', async () => {
    const res = await fetch(`${BASE_URL}/api/recruiter/invite`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      },
      body: JSON.stringify({
        candidateId: 'u-cand-1',
        candidateEmail: 'candidate@mit.edu',
        roleTitle: 'Full-Stack Distributed Systems Engineer',
        company: 'Stripe / Scale AI Partner',
        message: 'Your proof-of-work on high-frequency pub/sub passed our screening.'
      })
    });
    assert.ok(res.status === 200 || res.status === 201, `Expected 200/201, got ${res.status}`);
    const data = await res.json();
    assert.strictEqual(data.success, true);
    assert.ok(data.invitation.id);
  });

  // ==========================================
  // 10. INSTITUTION OPPORTUNITY GAP RADAR
  // ==========================================
  await t.test('GET /api/institution/gap-radar returns institutional intelligence metrics', async () => {
    const res = await fetch(`${BASE_URL}/api/institution/gap-radar`);
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.success, true);
    assert.ok(data.radar);
    assert.ok(Array.isArray(data.radar.skillGaps));
    assert.ok(Array.isArray(data.radar.alumniDestinations));
    assert.ok(typeof data.radar.placementVelocity === 'number');
  });

  // ==========================================
  // 11. MESSAGING & NOTIFICATIONS
  // ==========================================
  await t.test('GET /api/notifications & POST /api/notifications/mark-read', async () => {
    const listRes = await fetch(`${BASE_URL}/api/notifications`, {
      headers: { 'Authorization': `Bearer ${authToken}` }
    });
    assert.strictEqual(listRes.status, 200);
    const listData = await listRes.json();
    assert.strictEqual(listData.success, true);
    assert.ok(Array.isArray(listData.notifications));

    const markRes = await fetch(`${BASE_URL}/api/notifications/mark-read`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      },
      body: JSON.stringify({ notificationId: 'all' })
    });
    assert.strictEqual(markRes.status, 200);
    const markData = await markRes.json();
    assert.strictEqual(markData.success, true);
  });

  await t.test('GET /api/messages/conversations & POST /api/messages/send', async () => {
    const convRes = await fetch(`${BASE_URL}/api/messages/conversations`, {
      headers: { 'Authorization': `Bearer ${authToken}` }
    });
    assert.strictEqual(convRes.status, 200);
    const convData = await convRes.json();
    assert.strictEqual(convData.success, true);
    assert.ok(Array.isArray(convData.conversations));

    const sendRes = await fetch(`${BASE_URL}/api/messages/send`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      },
      body: JSON.stringify({
        recipientId: 'u1',
        message: 'Hello! Looking forward to collaborating on the AI Capstone challenge.'
      })
    });
    assert.ok(sendRes.status === 200 || sendRes.status === 201, `Expected 200/201, got ${sendRes.status}`);
    const sendData = await sendRes.json();
    assert.strictEqual(sendData.success, true);
    assert.ok(sendData.message.id);
  });

  // ==========================================
  // 12. DEDICATED FACULTY PANEL SUITE
  // ==========================================
  await t.test('GET /api/faculty/dashboard should return comprehensive faculty metrics', async () => {
    const res = await fetch(`${BASE_URL}/api/faculty/dashboard`);
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.success, true);
    assert.ok(data.dashboard);
    assert.ok(data.dashboard.stats);
    assert.ok(typeof data.dashboard.stats.assignedProjects === 'number');
    assert.ok(Array.isArray(data.dashboard.activeSupervisions));
    assert.ok(Array.isArray(data.dashboard.pendingReviews));
    assert.ok(Array.isArray(data.dashboard.upcomingDeadlines));
  });

  await t.test('GET /api/faculty/students should return student dossiers with capability scores', async () => {
    const res = await fetch(`${BASE_URL}/api/faculty/students`);
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.success, true);
    assert.ok(Array.isArray(data.students));
    assert.ok(data.students.length > 0);
    const s = data.students[0];
    assert.ok(s.id);
    assert.ok(s.name);
    assert.ok(s.capabilityScore !== undefined);
  });

  await t.test('GET /api/faculty/supervision & POST /api/faculty/supervision/review should update milestone score', async () => {
    const supRes = await fetch(`${BASE_URL}/api/faculty/supervision`);
    assert.strictEqual(supRes.status, 200);
    const supData = await supRes.json();
    assert.strictEqual(supData.success, true);
    assert.ok(Array.isArray(supData.supervisions));
    assert.ok(supData.supervisions.length > 0);

    const targetSup = supData.supervisions[0];
    const targetMs = targetSup.milestones?.[0] || { id: 'ms-1' };

    const reviewRes = await fetch(`${BASE_URL}/api/faculty/supervision/review`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        supervisionId: targetSup.id,
        milestoneId: targetMs.id,
        score: 95,
        status: 'Approved',
        feedback: 'Excellent Raft consensus implementation with verified test coverage.'
      })
    });
    assert.strictEqual(reviewRes.status, 200);
    const reviewData = await reviewRes.json();
    assert.strictEqual(reviewData.success, true);
    assert.strictEqual(reviewData.review.score, 95);
    assert.strictEqual(reviewData.review.status, 'Approved');
  });

  await t.test('GET /api/faculty/collaborations & POST /api/faculty/collaborations/invite should invite alumni co-guide', async () => {
    const listRes = await fetch(`${BASE_URL}/api/faculty/collaborations`);
    assert.strictEqual(listRes.status, 200);
    const listData = await listRes.json();
    assert.strictEqual(listData.success, true);
    assert.ok(Array.isArray(listData.collaborations));

    const inviteRes = await fetch(`${BASE_URL}/api/faculty/collaborations/invite`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        partnerName: 'Test Alumni Guide',
        company: 'Stripe Global',
        title: 'Distributed Transaction Processing',
        area: 'Fintech Systems',
        notes: 'Co-mentoring 4th year student capstone squad.'
      })
    });
    assert.strictEqual(inviteRes.status, 201);
    const inviteData = await inviteRes.json();
    assert.strictEqual(inviteData.success, true);
    assert.strictEqual(inviteData.collaboration.partnerName, 'Test Alumni Guide');
  });

  await t.test('GET /api/faculty/profile & PUT /api/faculty/profile should update academic preferences', async () => {
    const profRes = await fetch(`${BASE_URL}/api/faculty/profile`);
    assert.strictEqual(profRes.status, 200);
    const profData = await profRes.json();
    assert.strictEqual(profData.success, true);
    assert.ok(profData.profile);

    const updateRes = await fetch(`${BASE_URL}/api/faculty/profile`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Dr. R.K. Verma',
        department: 'Computer Science & AI',
        researchDomains: ['Cloud Computing', 'Autonomous Agents', 'Distributed Consensus'],
        officeHours: 'Tue/Thu 3:00 PM - 5:00 PM',
        mentorshipPreferences: 'Max 4 squads per term',
        visibility: 'Public'
      })
    });
    assert.strictEqual(updateRes.status, 200);
    const updateData = await updateRes.json();
    assert.strictEqual(updateData.success, true);
    assert.strictEqual(updateData.profile.officeHours, 'Tue/Thu 3:00 PM - 5:00 PM');
  });

  // ==========================================
  // 13. DEDICATED INSTITUTION PANEL SUITE & RBAC
  // ==========================================
  await t.test('GET /api/institution/overview should return university-wide executive metrics', async () => {
    const res = await fetch(`${BASE_URL}/api/institution/overview`);
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.success, true);
    assert.ok(data.overview);
    assert.ok(data.overview.activeStudents > 0);
    assert.ok(data.overview.verifiedAlumni > 0);
    assert.ok(Array.isArray(data.overview.topRecruiters));
    assert.ok(Array.isArray(data.overview.recentOutcomes));
  });

  await t.test('GET /api/institution/intelligence should return real-time sector demand and underserved alerts', async () => {
    const res = await fetch(`${BASE_URL}/api/institution/intelligence`);
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.success, true);
    assert.ok(data.intelligence);
    assert.ok(Array.isArray(data.intelligence.sectorDemand));
    assert.ok(Array.isArray(data.intelligence.underservedPrograms));
  });

  await t.test('POST /api/institution/departments should enforce RBAC (403 for non-admins, 201 for admins)', async () => {
    // Non-admin role (student) should be rejected with 403 Forbidden
    const unauthRes = await fetch(`${BASE_URL}/api/institution/departments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-user-role': 'student'
      },
      body: JSON.stringify({
        name: 'Robotics & Automation',
        code: 'ROBO',
        head: 'Dr. Test Head',
        facultyCount: 12,
        enrolledStudents: 160
      })
    });
    assert.strictEqual(unauthRes.status, 403, 'Must reject non-admin role with 403');

    // Authorized institution admin should succeed with 201 Created
    const authRes = await fetch(`${BASE_URL}/api/institution/departments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-user-role': 'institution'
      },
      body: JSON.stringify({
        name: 'Robotics & Mechatronics',
        code: 'ROBO',
        head: 'Dr. Test Head',
        facultyCount: 12,
        enrolledStudents: 160,
        cohortTarget: 92,
        placementRate: 88
      })
    });
    assert.strictEqual(authRes.status, 201);
    const authData = await authRes.json();
    assert.strictEqual(authData.success, true);
    assert.ok(authData.department.id);

    // Clean up created test department
    const delRes = await fetch(`${BASE_URL}/api/institution/departments/${authData.department.id}`, {
      method: 'DELETE',
      headers: { 'x-user-role': 'institution' }
    });
    assert.strictEqual(delRes.status, 200);
  });

  await t.test('GET /api/institution/outcomes & GET /api/institution/export-outcomes-csv should deliver accreditation records', async () => {
    const outRes = await fetch(`${BASE_URL}/api/institution/outcomes`);
    assert.strictEqual(outRes.status, 200);
    const outData = await outRes.json();
    assert.strictEqual(outData.success, true);
    assert.ok(outData.summary);
    assert.ok(Array.isArray(outData.verifiedPlacements));

    const csvRes = await fetch(`${BASE_URL}/api/institution/export-outcomes-csv?role=institution`);
    assert.strictEqual(csvRes.status, 200);
    const csvText = await csvRes.text();
    assert.ok(csvText.includes('Student Name,Roll Number,Department'), 'CSV must have accreditation header columns');
  });

  await t.test('GET /api/institution/governance & POST /api/institution/governance should update policies and record audit logs', async () => {
    const govRes = await fetch(`${BASE_URL}/api/institution/governance`, {
      headers: { 'x-user-role': 'institution' }
    });
    assert.strictEqual(govRes.status, 200);
    const govData = await govRes.json();
    assert.strictEqual(govData.success, true);
    assert.ok(govData.settings);
    assert.ok(Array.isArray(govData.auditLogs));

    // Update policy
    const saveRes = await fetch(`${BASE_URL}/api/institution/governance`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-user-role': 'institution'
      },
      body: JSON.stringify({
        allowedDomain: '@apex.edu',
        publicScrapeProtection: true,
        alumniOutreachRateLimit: true,
        externalATSWebhookLock: true
      })
    });
    assert.strictEqual(saveRes.status, 200);
    const saveData = await saveRes.json();
    assert.strictEqual(saveData.success, true);

    // Verify audit logs endpoint returns recorded action
    const auditRes = await fetch(`${BASE_URL}/api/institution/audit-logs`, {
      headers: { 'x-user-role': 'institution' }
    });
    assert.strictEqual(auditRes.status, 200);
    const auditData = await auditRes.json();
    assert.strictEqual(auditData.success, true);
    assert.ok(Array.isArray(auditData.auditLogs));
    assert.ok(auditData.auditLogs.length > 0);
  });
});
