/**
 * Event Commands
 * Handles event-related operations
 */

import mongoose from 'mongoose';

export class EventCommands {
  constructor(router) {
    this.router = router;
    this.ui = router.ui;
    this.config = router.config;
  }

  /**
   * Get Event model
   */
  async getEventModel() {
    await this.ensureConnection();
    
    if (mongoose.models.Event) {
      return mongoose.models.Event;
    }

    const eventSchema = new mongoose.Schema({
      name: { type: String, required: true },
      slug: { type: String },
      description: { type: String },
      status: { type: String, default: 'draft' },
      start_date: { type: Date },
      end_date: { type: Date },
      voting_start: { type: Date },
      voting_end: { type: Date },
      banner_url: { type: String },
      logo_url: { type: String },
      venue: { type: String },
      organiser: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      is_featured: { type: Boolean, default: false },
      is_public: { type: Boolean, default: true },
    }, { timestamps: true });

    return mongoose.model('Event', eventSchema);
  }

  /**
   * Get Category model
   */
  async getCategoryModel() {
    await this.ensureConnection();
    
    if (mongoose.models.Category) {
      return mongoose.models.Category;
    }

    const categorySchema = new mongoose.Schema({
      name: { type: String, required: true },
      description: { type: String },
      event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' },
      status: { type: String, default: 'active' },
      max_votes_per_voter: { type: Number, default: 1 },
    }, { timestamps: true });

    return mongoose.model('Category', categorySchema);
  }

  /**
   * List events
   */
  async listEvents(args) {
    const options = this.parseArgs(args);
    
    const spinner = this.ui.spinner('Fetching events...');

    try {
      const Event = await this.getEventModel();
      
      const query = {};
      if (options.status) {
        query.status = options.status;
      }

      const limit = parseInt(options.limit) || 20;
      const page = parseInt(options.page) || 1;
      const skip = (page - 1) * limit;

      const [events, total] = await Promise.all([
        Event.find(query)
          .select('name status start_date end_date voting_start voting_end is_featured createdAt')
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(limit)
          .lean(),
        Event.countDocuments(query)
      ]);

      spinner.stop();

      if (events.length === 0) {
        this.ui.info('No events found');
        return;
      }

      this.ui.header(`Events (${page}/${Math.ceil(total / limit)} - ${total} total)`, 'calendar');

      const headers = ['Name', 'Status', 'Start Date', 'End Date', 'Featured'];
      const rows = events.map(event => [
        event.name.substring(0, 30),
        event.status,
        event.start_date ? new Date(event.start_date).toLocaleDateString() : 'N/A',
        event.end_date ? new Date(event.end_date).toLocaleDateString() : 'N/A',
        event.is_featured ? 'Yes' : 'No'
      ]);

      this.ui.table(headers, rows);
      
      this.ui.newLine();
      this.ui.info(`Showing ${events.length} of ${total} events`);
    } catch (error) {
      spinner.stop();
      this.ui.error(`Failed to list events: ${error.message}`);
    }
  }

  /**
   * View event details
   */
  async viewEvent(identifier) {
    if (!identifier) {
      this.ui.error('Please provide an event ID or slug');
      this.ui.info('Usage: event:view <id|slug>');
      return;
    }

    const spinner = this.ui.spinner('Fetching event...');

    try {
      const Event = await this.getEventModel();
      const Category = await this.getCategoryModel();
      
      const query = mongoose.Types.ObjectId.isValid(identifier)
        ? { _id: identifier }
        : { slug: identifier };

      const event = await Event.findOne(query)
        .populate('organiser', 'name email')
        .lean();

      if (!event) {
        spinner.stop();
        this.ui.error('Event not found');
        return;
      }

      // Get categories count
      const categoryCount = await Category.countDocuments({ event: event._id });

      // Get vote count (if Vote model exists)
      let voteCount = 0;
      try {
        if (mongoose.models.Vote) {
          const Vote = mongoose.models.Vote;
          voteCount = await Vote.countDocuments({ event: event._id });
        }
      } catch (e) {
        // Vote model may not exist
      }

      spinner.stop();

      this.ui.header('Event Details', 'calendar');
      this.ui.keyValue('ID', event._id.toString(), 20);
      this.ui.keyValue('Name', event.name, 20);
      this.ui.keyValue('Slug', event.slug || 'N/A', 20);
      this.ui.keyValue('Status', event.status, 20);
      this.ui.keyValue('Featured', event.is_featured ? 'Yes' : 'No', 20);
      this.ui.keyValue('Public', event.is_public !== false ? 'Yes' : 'No', 20);
      this.ui.newLine();
      
      this.ui.subheader('Dates');
      this.ui.keyValue('Event Start', event.start_date ? new Date(event.start_date).toLocaleString() : 'Not set', 20);
      this.ui.keyValue('Event End', event.end_date ? new Date(event.end_date).toLocaleString() : 'Not set', 20);
      this.ui.keyValue('Voting Start', event.voting_start ? new Date(event.voting_start).toLocaleString() : 'Not set', 20);
      this.ui.keyValue('Voting End', event.voting_end ? new Date(event.voting_end).toLocaleString() : 'Not set', 20);
      this.ui.newLine();

      this.ui.subheader('Statistics');
      this.ui.keyValue('Categories', categoryCount.toString(), 20);
      this.ui.keyValue('Total Votes', voteCount.toString(), 20);
      this.ui.newLine();

      if (event.organiser) {
        this.ui.subheader('Organiser');
        this.ui.keyValue('Name', event.organiser.name, 20);
        this.ui.keyValue('Email', event.organiser.email, 20);
      }

      if (event.description) {
        this.ui.newLine();
        this.ui.subheader('Description');
        this.ui.print(event.description, 'dim');
      }
    } catch (error) {
      spinner.stop();
      this.ui.error(`Failed to fetch event: ${error.message}`);
    }
  }

  /**
   * Show event statistics
   */
  async stats() {
    const spinner = this.ui.spinner('Calculating statistics...');

    try {
      const Event = await this.getEventModel();
      
      const [
        totalEvents,
        activeEvents,
        draftEvents,
        completedEvents,
        featuredEvents
      ] = await Promise.all([
        Event.countDocuments(),
        Event.countDocuments({ status: 'active' }),
        Event.countDocuments({ status: 'draft' }),
        Event.countDocuments({ status: 'completed' }),
        Event.countDocuments({ is_featured: true })
      ]);

      // Get events with voting in progress
      const now = new Date();
      const votingInProgress = await Event.countDocuments({
        voting_start: { $lte: now },
        voting_end: { $gte: now }
      });

      spinner.stop();

      this.ui.header('Event Statistics', 'chart');
      this.ui.keyValue('Total Events', totalEvents.toString(), 25);
      this.ui.keyValue('Active', activeEvents.toString(), 25);
      this.ui.keyValue('Draft', draftEvents.toString(), 25);
      this.ui.keyValue('Completed', completedEvents.toString(), 25);
      this.ui.keyValue('Featured', featuredEvents.toString(), 25);
      this.ui.keyValue('Voting In Progress', votingInProgress.toString(), 25);

      // Recent events
      const recentEvents = await Event.find()
        .select('name status createdAt')
        .sort({ createdAt: -1 })
        .limit(5)
        .lean();

      if (recentEvents.length > 0) {
        this.ui.newLine();
        this.ui.subheader('Recent Events');
        
        for (const event of recentEvents) {
          const date = new Date(event.createdAt).toLocaleDateString();
          this.ui.listItem(`${event.name} (${event.status}) - ${date}`);
        }
      }
    } catch (error) {
      spinner.stop();
      this.ui.error(`Failed to get statistics: ${error.message}`);
    }
  }

  /**
   * Ensure database connection
   */
  async ensureConnection() {
    if (mongoose.connection.readyState !== 1) {
      const mongoUri = this.config.get('MONGODB_URI');
      if (!mongoUri) {
        throw new Error('MongoDB URI not configured');
      }
      await mongoose.connect(mongoUri);
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
