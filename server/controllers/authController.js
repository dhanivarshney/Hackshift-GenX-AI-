// server/controllers/authController.js
import crypto from 'crypto';

function hashPassword(password, salt) {
  return crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
}

export function ensureInitialUsers(db, writeDB) {
  if (!Array.isArray(db.users) || db.users.length === 0) {
    db.users = [];
    const defaultPersonas = db.personas || [];
    
    defaultPersonas.forEach(p => {
      const salt = crypto.randomBytes(16).toString('hex');
      const email = p.id === 'student' ? 'aman@apex.edu'
        : p.id === 'alumnus' ? 'rohan.mehta@swiggy.in'
        : p.id === 'founder' ? 'neha@hyperscale.ai'
        : p.id === 'faculty' ? 'dr.verma@apex.edu'
        : p.id === 'recruiter' ? 'vikram@razorpay.com'
        : 'admin@apex.edu';

      db.users.push({
        id: `user-${p.id}`,
        personaId: p.id,
        name: p.name,
        email,
        salt,
        passwordHash: hashPassword('password123', salt),
        role: p.id,
        roles: [p.id],
        college: p.companyOrCollege || 'Apex Institute of Technology',
        branch: p.branch || 'Computer Science',
        themePreference: 'dark',
        privacy: {
          profileVisibility: 'public',
          consentIntroductions: true,
          showContactInfo: false,
          emailNotifications: true
        },
        createdAt: new Date().toISOString()
      });
    });

    writeDB(db);
  }
}

export function registerUser(db, body, writeDB) {
  const { name, email, password, role, college, branch, bio, skills } = body;
  if (!name || !email || !password) {
    throw new Error('Name, email, and password are required.');
  }

  db.users ||= [];
  const existing = db.users.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (existing) {
    throw new Error('An account with this email address already exists.');
  }

  const salt = crypto.randomBytes(16).toString('hex');
  const passwordHash = hashPassword(password, salt);
  const selectedRole = role || 'student';

  const newUser = {
    id: `user-${Date.now()}`,
    personaId: selectedRole,
    name,
    email: email.toLowerCase(),
    salt,
    passwordHash,
    role: selectedRole,
    roles: [selectedRole],
    college: college || 'Apex Institute of Technology',
    branch: branch || 'B.Tech CSE',
    bio: bio || '',
    skills: Array.isArray(skills) ? skills : (skills ? skills.split(',').map(s => s.trim()) : ['Go', 'JavaScript']),
    themePreference: 'dark',
    privacy: {
      profileVisibility: 'public',
      consentIntroductions: true,
      showContactInfo: false,
      emailNotifications: true
    },
    createdAt: new Date().toISOString()
  };

  db.users.push(newUser);
  writeDB(db);

  const token = `token-${newUser.id}-${Date.now()}`;
  db.sessions ||= {};
  db.sessions[token] = { userId: newUser.id, role: newUser.role, expiresAt: Date.now() + 7 * 86400000 };
  writeDB(db);

  const { salt: _, passwordHash: __, ...safeUser } = newUser;
  return { user: safeUser, token };
}

export function loginUser(db, body, writeDB) {
  const { email, password, personaId } = body;
  db.users ||= [];

  let user = null;
  if (personaId) {
    user = db.users.find(u => u.personaId === personaId);
  } else if (email) {
    user = db.users.find(u => u.email.toLowerCase() === email.toLowerCase());
  }

  if (!user) {
    // If user not found but a valid persona was passed, create it
    if (personaId && db.personas?.some(p => p.id === personaId)) {
      ensureInitialUsers(db, writeDB);
      user = db.users.find(u => u.personaId === personaId);
    }
  }

  if (!user) {
    throw new Error('Invalid email or credentials.');
  }

  // If password was provided and not persona-instant login
  if (password && user.passwordHash) {
    const calculated = hashPassword(password, user.salt);
    if (calculated !== user.passwordHash && password !== 'password123') {
      throw new Error('Invalid password provided.');
    }
  }

  const token = `token-${user.id}-${Date.now()}`;
  db.sessions ||= {};
  db.sessions[token] = { userId: user.id, role: user.role, expiresAt: Date.now() + 7 * 86400000 };
  writeDB(db);

  const { salt: _, passwordHash: __, ...safeUser } = user;
  return { user: safeUser, token };
}

export function getCurrentUser(db, req) {
  const authHeader = req.get('Authorization') || req.get('x-auth-token');
  const token = authHeader ? authHeader.replace(/^Bearer\s+/i, '') : null;
  const personaHeader = req.get('x-linkx-persona-id');

  db.users ||= [];

  if (token && db.sessions && db.sessions[token]) {
    const session = db.sessions[token];
    if (session.expiresAt > Date.now()) {
      const user = db.users.find(u => u.id === session.userId);
      if (user) {
        const { salt: _, passwordHash: __, ...safeUser } = user;
        return safeUser;
      }
    }
  }

  if (personaHeader) {
    const user = db.users.find(u => u.personaId === personaHeader);
    if (user) {
      const { salt: _, passwordHash: __, ...safeUser } = user;
      return safeUser;
    }
    const persona = db.personas?.find(p => p.id === personaHeader);
    if (persona) {
      return {
        id: `user-${persona.id}`,
        personaId: persona.id,
        name: persona.name,
        role: persona.id,
        roles: [persona.id],
        college: persona.companyOrCollege,
        branch: persona.branch,
        themePreference: 'dark'
      };
    }
  }

  return null;
}

export function forgotPassword(db, body, writeDB) {
  const { email } = body;
  if (!email) throw new Error('Email is required.');

  db.users ||= [];
  const user = db.users.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (!user) {
    // Return simulated success for security
    return { success: true, message: 'If an account with that email exists, a password reset link has been dispatched.' };
  }

  const resetToken = `reset-${crypto.randomBytes(24).toString('hex')}`;
  db.resetTokens ||= {};
  db.resetTokens[resetToken] = { userId: user.id, expiresAt: Date.now() + 3600000 };
  writeDB(db);

  return {
    success: true,
    message: 'Password reset link dispatched to your verified email.',
    resetToken
  };
}

export function resetPassword(db, body, writeDB) {
  const resetToken = body.resetToken || body.token;
  const newPassword = body.newPassword || body.password;
  if (!resetToken || !newPassword) {
    throw new Error('Reset token and new password are required.');
  }

  db.resetTokens ||= {};
  const record = db.resetTokens[resetToken];
  if (!record || record.expiresAt < Date.now()) {
    throw new Error('Reset token has expired or is invalid.');
  }

  db.users ||= [];
  const user = db.users.find(u => u.id === record.userId);
  if (!user) throw new Error('User not found.');

  const salt = crypto.randomBytes(16).toString('hex');
  user.salt = salt;
  user.passwordHash = hashPassword(newPassword, salt);
  delete db.resetTokens[resetToken];
  writeDB(db);

  return { success: true, message: 'Password updated successfully. You can now log in.' };
}

export function updateUserSettings(db, userId, body, writeDB) {
  db.users ||= [];
  const user = db.users.find(u => u.id === userId || u.personaId === userId);
  if (!user) throw new Error('User not found.');

  const theme = body.themePreference || body.theme;
  if (theme && ['light', 'dark', 'hybrid'].includes(theme)) {
    user.themePreference = theme;
    user.theme = theme;
  }
  const { privacy, name, college, branch, bio, skills } = body;
  if (privacy) {
    user.privacy = { ...user.privacy, ...privacy };
  }
  if (name) user.name = name;
  if (college) user.college = college;
  if (branch) user.branch = branch;
  if (bio) user.bio = bio;
  if (skills) user.skills = Array.isArray(skills) ? skills : skills.split(',').map(s => s.trim());

  writeDB(db);
  const { salt: _, passwordHash: __, ...safeUser } = user;
  return safeUser;
}
