/**
 * User Management Commands
 * Handles CRUD operations for users
 */

import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

export class UserCommands {
  constructor(router) {
    this.router = router;
    this.ui = router.ui;
    this.config = router.config;
    this.authManager = router.authManager;
  }

  /**
   * Get User model
   */
  async getUserModel() {
    await this.ensureConnection();
    
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
      bio: { type: String },
      photo_url: { type: String },
    }, { timestamps: true });

    return mongoose.model('User', userSchema);
  }

  /**
   * Ensure database connection
   */
  async ensureConnection() {
    if (mongoose.connection.readyState !== 1) {
      const mongoUri = this.config.get('MONGODB_URI');
      await mongoose.connect(mongoUri);
    }
  }

  /**
   * List users
   */
  async listUsers(args) {
    const options = this.parseArgs(args);
    
    const spinner = this.ui.spinner('Fetching users...');

    try {
      const User = await this.getUserModel();
      
      const query = {};
      if (options.role) {
        query.role = options.role;
      }
      if (options.status) {
        query.status = options.status;
      }

      const limit = parseInt(options.limit) || 20;
      const page = parseInt(options.page) || 1;
      const skip = (page - 1) * limit;

      const [users, total] = await Promise.all([
        User.find(query)
          .select('name email role status last_login createdAt')
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(limit)
          .lean(),
        User.countDocuments(query)
      ]);

      spinner.stop();

      if (users.length === 0) {
        this.ui.info('No users found');
        return;
      }

      this.ui.header(`Users (${page}/${Math.ceil(total / limit)} - ${total} total)`, 'user');

      const headers = ['Name', 'Email', 'Role', 'Status', 'Last Login'];
      const rows = users.map(user => [
        user.name,
        user.email,
        user.role,
        user.status || 'active',
        user.last_login ? new Date(user.last_login).toLocaleString() : 'Never'
      ]);

      this.ui.table(headers, rows);
      
      this.ui.newLine();
      this.ui.info(`Showing ${users.length} of ${total} users`);
      
      if (total > limit) {
        this.ui.info(`Use --page=<n> to see more (e.g., user:list --page=2)`);
      }
    } catch (error) {
      spinner.stop();
      this.ui.error(`Failed to list users: ${error.message}`);
    }
  }

  /**
   * Create a new user
   */
  async createUser() {
    this.ui.header('Create New User', 'user');

    const userData = {
      name: await this.ui.question('Full name', {
        validate: (val) => val.length >= 2 ? true : 'Name must be at least 2 characters'
      }),
      email: await this.ui.question('Email', {
        validate: (val) => {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          return emailRegex.test(val) ? true : 'Invalid email address';
        }
      }),
    };

    // Select role
    const roleChoice = await this.ui.select('Select role:', [
      { value: 'admin', label: 'Admin - Full system access' },
      { value: 'organiser', label: 'Organiser - Can manage events and categories' },
      { value: 'moderator', label: 'Moderator - Can moderate content' },
    ]);
    userData.role = roleChoice.value || roleChoice;

    // Password
    let passwordMatch = false;
    while (!passwordMatch) {
      userData.password = await this.ui.question('Password (min 8 chars)', {
        hidden: true,
        validate: (val) => val.length >= 8 ? true : 'Password must be at least 8 characters'
      });

      const confirm = await this.ui.question('Confirm password', { hidden: true });
      if (userData.password === confirm) {
        passwordMatch = true;
      } else {
        this.ui.error('Passwords do not match');
      }
    }

    // Permissions based on role
    const rolePermissions = {
      super_admin: ['read', 'write', 'update', 'delete', 'super'],
      admin: ['read', 'write', 'update', 'delete'],
      organiser: ['read', 'write', 'update'],
      moderator: ['read', 'write'],
    };
    userData.permissions = rolePermissions[userData.role] || ['read'];

    const spinner = this.ui.spinner('Creating user...');

    try {
      const User = await this.getUserModel();

      // Check if email exists
      const existing = await User.findOne({ email: userData.email });
      if (existing) {
        spinner.stop();
        this.ui.error('A user with this email already exists');
        return;
      }

      // Hash password
      const passwordHash = await bcrypt.hash(userData.password, 12);

      const user = await User.create({
        name: userData.name,
        email: userData.email,
        password_hash: passwordHash,
        role: userData.role,
        permissions: userData.permissions,
        email_verified: true,
        status: 'active',
      });

      spinner.stop();
      this.ui.success(`User created successfully!`);
      this.ui.keyValue('ID', user._id.toString());
      this.ui.keyValue('Name', user.name);
      this.ui.keyValue('Email', user.email);
      this.ui.keyValue('Role', user.role);
    } catch (error) {
      spinner.stop();
      this.ui.error(`Failed to create user: ${error.message}`);
    }
  }

  /**
   * View user details
   */
  async viewUser(identifier) {
    if (!identifier) {
      this.ui.error('Please provide an email or user ID');
      this.ui.info('Usage: user:view <email|id>');
      return;
    }

    const spinner = this.ui.spinner('Fetching user...');

    try {
      const User = await this.getUserModel();
      
      const query = mongoose.Types.ObjectId.isValid(identifier)
        ? { _id: identifier }
        : { email: identifier };

      const user = await User.findOne(query).lean();

      spinner.stop();

      if (!user) {
        this.ui.error('User not found');
        return;
      }

      this.ui.header('User Details', 'user');
      this.ui.keyValue('ID', user._id.toString(), 20);
      this.ui.keyValue('Name', user.name, 20);
      this.ui.keyValue('Email', user.email, 20);
      this.ui.keyValue('Role', user.role, 20);
      this.ui.keyValue('Permissions', user.permissions?.join(', ') || 'None', 20);
      this.ui.keyValue('Status', user.status || 'active', 20);
      this.ui.keyValue('Email Verified', user.email_verified ? 'Yes' : 'No', 20);
      this.ui.keyValue('Last Login', user.last_login ? new Date(user.last_login).toLocaleString() : 'Never', 20);
      this.ui.keyValue('Created', new Date(user.createdAt).toLocaleString(), 20);
      this.ui.keyValue('Updated', new Date(user.updatedAt).toLocaleString(), 20);
      
      if (user.bio) {
        this.ui.newLine();
        this.ui.subheader('Bio');
        this.ui.print(user.bio, 'dim');
      }
    } catch (error) {
      spinner.stop();
      this.ui.error(`Failed to fetch user: ${error.message}`);
    }
  }

  /**
   * Edit user
   */
  async editUser(identifier) {
    if (!identifier) {
      this.ui.error('Please provide an email or user ID');
      return;
    }

    try {
      const User = await this.getUserModel();
      
      const query = mongoose.Types.ObjectId.isValid(identifier)
        ? { _id: identifier }
        : { email: identifier };

      const user = await User.findOne(query);

      if (!user) {
        this.ui.error('User not found');
        return;
      }

      this.ui.header(`Edit User: ${user.name}`, 'user');
      this.ui.info('Press Enter to keep current value');
      this.ui.newLine();

      const updates = {};

      const newName = await this.ui.question('Name', { defaultValue: user.name });
      if (newName !== user.name) updates.name = newName;

      const newEmail = await this.ui.question('Email', { defaultValue: user.email });
      if (newEmail !== user.email) updates.email = newEmail;

      const newStatus = await this.ui.select('Status:', [
        { value: user.status || 'active', label: `${user.status || 'active'} (current)` },
        { value: 'active', label: 'Active' },
        { value: 'inactive', label: 'Inactive' },
        { value: 'suspended', label: 'Suspended' },
      ]);
      const statusValue = newStatus.value || newStatus;
      if (statusValue !== user.status) updates.status = statusValue;

      if (Object.keys(updates).length === 0) {
        this.ui.info('No changes made');
        return;
      }

      const confirm = await this.ui.confirm('Save changes?', true);
      if (!confirm) {
        this.ui.info('Cancelled');
        return;
      }

      const spinner = this.ui.spinner('Updating user...');
      await User.updateOne({ _id: user._id }, updates);
      spinner.stop();

      this.ui.success('User updated successfully!');
    } catch (error) {
      this.ui.error(`Failed to edit user: ${error.message}`);
    }
  }

  /**
   * Delete user
   */
  async deleteUser(identifier) {
    if (!identifier) {
      this.ui.error('Please provide an email or user ID');
      return;
    }

    try {
      const User = await this.getUserModel();
      
      const query = mongoose.Types.ObjectId.isValid(identifier)
        ? { _id: identifier }
        : { email: identifier };

      const user = await User.findOne(query);

      if (!user) {
        this.ui.error('User not found');
        return;
      }

      // Prevent deleting yourself
      const currentUser = this.authManager.getCurrentUser();
      if (currentUser && currentUser._id === user._id.toString()) {
        this.ui.error('You cannot delete your own account');
        return;
      }

      // Prevent deleting last super_admin
      if (user.role === 'super_admin') {
        const adminCount = await User.countDocuments({ role: 'super_admin' });
        if (adminCount <= 1) {
          this.ui.error('Cannot delete the last super admin');
          return;
        }
      }

      this.ui.warning(`You are about to delete user: ${user.name} (${user.email})`);
      const confirm = await this.ui.confirm('Are you sure?', false);
      
      if (!confirm) {
        this.ui.info('Cancelled');
        return;
      }

      const hardDelete = await this.ui.confirm('Permanently delete? (No = soft delete)', false);

      const spinner = this.ui.spinner('Deleting user...');

      if (hardDelete) {
        await User.deleteOne({ _id: user._id });
      } else {
        await User.updateOne({ _id: user._id }, { status: 'deleted' });
      }

      spinner.stop();
      this.ui.success(`User ${hardDelete ? 'permanently deleted' : 'soft deleted'} successfully!`);
    } catch (error) {
      this.ui.error(`Failed to delete user: ${error.message}`);
    }
  }

  /**
   * Change user role
   */
  async changeRole(identifier, newRole) {
    if (!identifier) {
      this.ui.error('Please provide an email or user ID');
      return;
    }

    const validRoles = ['super_admin', 'admin', 'organiser', 'moderator'];

    if (!newRole) {
      const roleChoice = await this.ui.select('Select new role:', validRoles.map(r => ({
        value: r,
        label: r
      })));
      newRole = roleChoice.value || roleChoice;
    }

    if (!validRoles.includes(newRole)) {
      this.ui.error(`Invalid role. Must be one of: ${validRoles.join(', ')}`);
      return;
    }

    try {
      const User = await this.getUserModel();
      
      const query = mongoose.Types.ObjectId.isValid(identifier)
        ? { _id: identifier }
        : { email: identifier };

      const user = await User.findOne(query);

      if (!user) {
        this.ui.error('User not found');
        return;
      }

      // Prevent changing your own role
      const currentUser = this.authManager.getCurrentUser();
      if (currentUser && currentUser._id === user._id.toString()) {
        this.ui.error('You cannot change your own role');
        return;
      }

      // Only super_admin can create super_admins
      if (newRole === 'super_admin' && !this.authManager.hasRole('super_admin')) {
        this.ui.error('Only super admins can promote users to super admin');
        return;
      }

      const rolePermissions = {
        super_admin: ['read', 'write', 'update', 'delete', 'super'],
        admin: ['read', 'write', 'update', 'delete'],
        organiser: ['read', 'write', 'update'],
        moderator: ['read', 'write'],
      };

      const spinner = this.ui.spinner('Updating role...');
      
      await User.updateOne(
        { _id: user._id },
        { 
          role: newRole,
          permissions: rolePermissions[newRole]
        }
      );

      spinner.stop();
      this.ui.success(`User role changed from ${user.role} to ${newRole}`);
    } catch (error) {
      this.ui.error(`Failed to change role: ${error.message}`);
    }
  }

  /**
   * Reset user password
   */
  async resetPassword(identifier) {
    if (!identifier) {
      this.ui.error('Please provide an email or user ID');
      return;
    }

    try {
      const User = await this.getUserModel();
      
      const query = mongoose.Types.ObjectId.isValid(identifier)
        ? { _id: identifier }
        : { email: identifier };

      const user = await User.findOne(query);

      if (!user) {
        this.ui.error('User not found');
        return;
      }

      this.ui.info(`Resetting password for: ${user.name} (${user.email})`);

      let passwordMatch = false;
      let newPassword;

      while (!passwordMatch) {
        newPassword = await this.ui.question('New password (min 8 chars)', {
          hidden: true,
          validate: (val) => val.length >= 8 ? true : 'Password must be at least 8 characters'
        });

        const confirm = await this.ui.question('Confirm password', { hidden: true });
        if (newPassword === confirm) {
          passwordMatch = true;
        } else {
          this.ui.error('Passwords do not match');
        }
      }

      const spinner = this.ui.spinner('Resetting password...');
      
      const passwordHash = await bcrypt.hash(newPassword, 12);
      await User.updateOne({ _id: user._id }, { password_hash: passwordHash });

      spinner.stop();
      this.ui.success('Password reset successfully!');
    } catch (error) {
      this.ui.error(`Failed to reset password: ${error.message}`);
    }
  }

  /**
   * Parse command arguments
   */
  parseArgs(args) {
    const options = {};
    for (const arg of args) {
      if (arg.startsWith('--')) {
        const [key, value] = arg.slice(2).split('=');
        options[key] = value || true;
      }
    }
    return options;
  }
}
