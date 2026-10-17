// server/controllers/legacyController.js

export function ensureInitialLegacyPosts(db, writeDB) {
  if (!Array.isArray(db.legacyPosts) || db.legacyPosts.length === 0) {
    db.legacyPosts = [
      {
        id: 'legacy-1',
        title: 'From Tier-3 College to Scaling Swiggy’s Order Matching Microservice',
        author: 'Rohan Mehta',
        authorRole: 'SDE-2 Backend @ Swiggy (Batch \'20)',
        category: 'Career Journey',
        tags: ['Backend', 'Go', 'Microservices', 'Distributed Systems'],
        summary: 'How focusing on concurrency primitives, network socket debugging, and Kafka offsets landed me a senior backend role after graduation without 500 cold LinkedIn DMs.',
        content: 'When I was in final year at Apex, every company asked for LeetCode medium + hard. But what actually differentiated my resume was building an end-to-end distributed cache with consistent hashing and benchmarking it with Locust. At Swiggy, we look for candidates who understand thread contention and garbage collection pauses in Go.',
        upvotes: 48,
        createdAt: '2026-09-15T10:00:00Z',
        readTime: '4 min read'
      },
      {
        id: 'legacy-2',
        title: 'What YC Founders Actually Look For When Hiring Student Builders',
        author: 'Neha Kapoor',
        authorRole: 'Founder & CEO @ HyperScale AI (YC W24 • Batch \'19)',
        category: 'Founder Insights',
        tags: ['Startups', 'Next.js', 'AI Agents', 'Hiring'],
        summary: 'Skip 5-page resumes. If you can build a fast, working proof-of-concept that calls an LLM API and handles edge case errors idempotently, you will get hired in 48 hours.',
        content: 'At HyperScale AI, we posted a ₹5,000 micro-bounty on LinkX for an idempotent webhook service. Three students submitted pull requests. The one who included unit tests and docker-compose got a paid summer internship offer that same evening. Proof of work beats pedigree every time.',
        upvotes: 62,
        createdAt: '2026-09-28T14:30:00Z',
        readTime: '3 min read'
      },
      {
        id: 'legacy-3',
        title: 'How to Co-Author an IEEE Research Capstone with Industry Mentors',
        author: 'Dr. R.K. Verma & Aditi Rao',
        authorRole: 'Dean R&D @ Apex & Solutions Architect @ Google Cloud',
        category: 'Research Retrospective',
        tags: ['Kubernetes', 'Cloud', 'Research', 'IEEE'],
        summary: 'A blueprint for undergraduate students to publish peer-reviewed cloud infrastructure research by partnering with industry alumni co-guides.',
        content: 'Industry co-mentors give academic research immediate production credibility. Last year, 4 student teams paired with Google Cloud alumni to deploy an edge autoscaler on real clusters. The resulting IEEE paper provided undeniable evidence for top-tier master’s admissions and international referrals.',
        upvotes: 39,
        createdAt: '2026-10-02T09:15:00Z',
        readTime: '5 min read'
      },
      {
        id: 'legacy-4',
        title: 'The Truth About ATS Scanners and Why Your 4-Page Resume Gets Rejected',
        author: 'Vikram Seth',
        authorRole: 'Tech Talent Partner @ Razorpay',
        category: 'Recruiter Lessons',
        tags: ['ATS', 'Resumes', 'FinTech', 'Hiring'],
        summary: 'Recruiters spend an average of 12 seconds per candidate profile. How to format quantifiable impact metrics and repository links that convert into immediate screen calls.',
        content: 'If your resume lists 20 skills without a single GitHub commit or quantifiable metric (e.g. reduced latency by 35%), it gets flagged as unverified. Always pair target roles with verifiable GitHub evidence or alumni endorsements.',
        upvotes: 55,
        createdAt: '2026-10-10T16:45:00Z',
        readTime: '3 min read'
      }
    ];
    writeDB(db);
  }
}

export function getLegacyPosts(db, query = {}) {
  ensureInitialLegacyPosts(db, () => {});
  let posts = [...db.legacyPosts];

  if (query.tag) {
    posts = posts.filter(p => p.tags.some(t => t.toLowerCase() === query.tag.toLowerCase()));
  }
  if (query.category) {
    posts = posts.filter(p => p.category.toLowerCase() === query.category.toLowerCase());
  }
  if (query.search) {
    const q = query.search.toLowerCase();
    posts = posts.filter(p => p.title.toLowerCase().includes(q) || p.summary.toLowerCase().includes(q) || p.content.toLowerCase().includes(q));
  }

  return posts;
}

export function createLegacyPost(db, body, writeDB) {
  const { title, author, authorRole, category, tags, summary } = body;
  const content = body.content || body.summary || body.text || '';
  if (!title || !content) {
    throw new Error('Title and content or summary are required for a legacy resource.');
  }

  ensureInitialLegacyPosts(db, writeDB);

  const newPost = {
    id: `legacy-${Date.now()}`,
    title,
    author: author || 'Alumni Contributor',
    authorRole: authorRole || 'Alumnus',
    category: category || 'Industry Insight',
    tags: Array.isArray(tags) ? tags : (tags ? tags.split(',').map(s => s.trim()) : ['General', 'Career']),
    summary: summary || content.slice(0, 160) + '...',
    content,
    upvotes: 1,
    createdAt: new Date().toISOString(),
    readTime: `${Math.max(2, Math.round(content.split(' ').length / 150))} min read`
  };

  db.legacyPosts.unshift(newPost);
  writeDB(db);
  return newPost;
}

export function upvoteLegacyPost(db, postId, writeDB) {
  ensureInitialLegacyPosts(db, writeDB);
  const post = db.legacyPosts.find(p => p.id === postId);
  if (!post) throw new Error('Legacy post not found.');

  post.upvotes = (post.upvotes || 0) + 1;
  writeDB(db);
  return post;
}
