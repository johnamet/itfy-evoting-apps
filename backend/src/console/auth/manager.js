/**
 * Authentication Manager for Console
 * Handles user authentication within the CLI
 */

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

export class AuthManager {
  constructor(config) {
    this.config = config;
    this.currentSession = null;
    this.sessionExpiry = null;
  }

  /**
   * Authenticate user with email and password
   */
  async login(email, password) {
    try {
      // Connect to database
      const mongoUri = this.config.get('MONGODB_URI');
      if (!mongoUri) {
        throw new Error('Database not configured');
      }

      if (mongoose.connection.readyState !== 1) {
        await mongoose.connect(mongoUri);
      }

      // Get User model
      const User = this.getUserModel();

      // Find user with password
      const user = await User.findOne({ 
        email: email.toLowerCase(),
        role: { $in: ['super_admin', 'admin', 'organiser', 'moderator'] }
      }).select('+password_hash');

      if (!user) {
        throw new Error('Invalid credentials or insufficient permissions');
      }

      // Check if account is active
      if (user.status === 'suspended' || user.status === 'deleted') {
        throw new Error('Account is suspended or deleted');
      }

      // Verify password
      const isValid = await bcrypt.compare(password, user.password_hash);
      if (!isValid) {
        throw new Error('Invalid credentials');
      }

      // Update last login
      await User.updateOne(
        { _id: user._id },
        { last_login: new Date(), login_attempts: 0 }
      );

      // Create session
      this.currentSession = {
        _id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
        permissions: user.permissions || [],
      };

      // Set session expiry (4 hours for console)
      this.sessionExpiry = Date.now() + (4 * 60 * 60 * 1000);

      return this.currentSession;
    } catch (error) {
      throw new Error(`Login failed: ${error.message}`);
    }
  }

  /**
   * Logout current user
   */
  logout() {
    this.currentSession = null;
    this.sessionExpiry = null;
    return true;
  }

  /**
   * Check if session is valid
   */
  isAuthenticated() {
    if (!this.currentSession) return false;
    if (Date.now() > this.sessionExpiry) {
      this.logout();
      return false;
    }
    return true;
  }

  /**
   * Get current user
   */
  getCurrentUser() {
    if (!this.isAuthenticated()) return null;
    return this.currentSession;
  }

  /**
   * Check if user has specific role
   */
  hasRole(role) {
    if (!this.currentSession) return false;
    
    const roleHierarchy = {
      'super_admin': ['super_admin', 'admin', 'organiser', 'moderator'],
      'admin': ['admin', 'organiser', 'moderator'],
      'organiser': ['organiser', 'moderator'],
      'moderator': ['moderator'],
    };

    const userRoles = roleHierarchy[this.currentSession.role] || [];
    return userRoles.includes(role);
  }

  /**
   * Check if user has specific permission
   */
  hasPermission(permission) {
    if (!this.currentSession) return false;
    return this.currentSession.permissions.includes(permission) || 
           this.currentSession.permissions.includes('super');
  }

  /**
   * Refresh session
   */
  refreshSession() {
    if (this.currentSession) {
      this.sessionExpiry = Date.now() + (4 * 60 * 60 * 1000);
    }
  }

  /**
   * Change password for current user
   */
  async changePassword(currentPassword, newPassword) {
    if (!this.currentSession) {
      throw new Error('Not authenticated');
    }

    try {
      const User = this.getUserModel();
      const user = await User.findById(this.currentSession._id).select('+password_hash');

      if (!user) {
        throw new Error('User not found');
      }

      // Verify current password
      const isValid = await bcrypt.compare(currentPassword, user.password_hash);
      if (!isValid) {
        throw new Error('Current password is incorrect');
      }

      // Hash new password
      const newHash = await bcrypt.hash(newPassword, 12);

      // Update password
      await User.updateOne(
        { _id: user._id },
        { password_hash: newHash }
      );

      return true;
    } catch (error) {
      throw new Error(`Password change failed: ${error.message}`);
    }
  }

  /**
   * Get User model
   */
  getUserModel() {
    if (mongoose.models.User) {
      return mongoose.models.User;
    }

    const userSchema = new mongoose.Schema({
      name: { type: String, required: true },
      email: { type: String, required: true },
      password_hash: { type: String, required: true, select: false },
      role: { type: String, required: true },
      permissions: { type: [String], default: [] },
      email_verified: { type: Boolean, default: false },
      status: { type: String, default: 'active' },
      last_login: { type: Date },
      login_attempts: { type: Number, default: 0 },
    }, { timestamps: true });

    return mongoose.model('User', userSchema);
  }
}
