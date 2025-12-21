/**
 * Authentication Commands
 * Handles login, logout, and session management
 */

export class AuthCommands {
  constructor(router) {
    this.router = router;
    this.ui = router.ui;
    this.authManager = router.authManager;
    this.app = router.app;
  }

  /**
   * Login command
   */
  async login(email) {
    // Get email if not provided
    if (!email) {
      email = await this.ui.question('Email');
    }

    // Get password
    const password = await this.ui.question('Password', { hidden: true });

    if (!email || !password) {
      this.ui.error('Email and password are required');
      return;
    }

    const spinner = this.ui.spinner('Authenticating...');

    try {
      const user = await this.authManager.login(email, password);
      spinner.stop();
      
      // Update the app's current user
      this.app.setCurrentUser(user);

      this.ui.success(`Welcome back, ${user.name}!`);
      this.ui.keyValue('Role', user.role, 15);
      this.ui.keyValue('Email', user.email, 15);
      this.ui.newLine();
    } catch (error) {
      spinner.stop();
      this.ui.error(error.message);
    }
  }

  /**
   * Logout command
   */
  logout() {
    this.authManager.logout();
    this.app.clearCurrentUser();
    this.ui.success('Logged out successfully');
  }

  /**
   * Show current user info
   */
  whoami() {
    const user = this.authManager.getCurrentUser();
    
    if (!user) {
      this.ui.warning('Not logged in');
      return;
    }

    this.ui.header('Current User', 'user');
    this.ui.keyValue('Name', user.name);
    this.ui.keyValue('Email', user.email);
    this.ui.keyValue('Role', user.role);
    this.ui.keyValue('Permissions', user.permissions.join(', ') || 'None');
    this.ui.keyValue('User ID', user._id);
  }

  /**
   * Change password
   */
  async changePassword() {
    const currentPassword = await this.ui.question('Current password', { hidden: true });
    
    let passwordMatch = false;
    let newPassword;

    while (!passwordMatch) {
      newPassword = await this.ui.question('New password (min 8 chars)', {
        hidden: true,
        validate: (val) => {
          if (val.length < 8) return 'Password must be at least 8 characters';
          if (!/[A-Z]/.test(val)) return 'Password must contain at least one uppercase letter';
          if (!/[a-z]/.test(val)) return 'Password must contain at least one lowercase letter';
          if (!/[0-9]/.test(val)) return 'Password must contain at least one number';
          return true;
        }
      });

      const confirmPassword = await this.ui.question('Confirm new password', { hidden: true });
      
      if (newPassword === confirmPassword) {
        passwordMatch = true;
      } else {
        this.ui.error('Passwords do not match. Please try again.');
      }
    }

    const spinner = this.ui.spinner('Changing password...');

    try {
      await this.authManager.changePassword(currentPassword, newPassword);
      spinner.stop();
      this.ui.success('Password changed successfully!');
    } catch (error) {
      spinner.stop();
      this.ui.error(error.message);
    }
  }
}
