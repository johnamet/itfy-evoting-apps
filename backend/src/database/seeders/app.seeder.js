/**
 * Database Seeder
 * Seeds the database with sample data for development and testing
 * Excludes: Vote and Payment collections
 */

import mongoose from "mongoose";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Import models
import userModel from "../../modules/user/user.model.js";
import eventModel from "../../modules/event/event.model.js";
import candidateModel from "../../modules/candidate/candidate.model.js";
import categoryModel from "../../modules/category/category.model.js";
import bundleModel from "../../modules/vote/bundle/bundle.model.js";
import couponModel from "../../modules/vote/coupon/coupon.model.js";
import formModel from "../../modules/form/form.model.js";
import slideModel from "../../modules/slide/slide.model.js";
import notificationModel from "../../modules/notification/notification.model.js";
import activityModel from "../../modules/activity/activity.model.js";

// Import constants
import { ROLES, PERMISSIONS, STATUS as USER_STATUS } from "../../utils/constants/user.constants.js";
import { STATUS as EVENT_STATUS, EVENT_TYPE, VISIBILITY, CURRENCY } from "../../utils/constants/event.constants.js";
import { STATUS as CANDIDATE_STATUS } from "../../utils/constants/candidate.constants.js";
import { STATUS as CATEGORY_STATUS, RESULTS_VISIBILITY } from "../../utils/constants/category.constants.js";
import { BUNDLE_STATUS, COUPON_STATUS, DISCOUNT_TYPE } from "../../utils/constants/vote.constants.js";
import { FORM_TYPE, FORM_STATUS, FIELD_TYPE } from "../../utils/constants/form.constants.js";
import { SLIDE_STATUS, SLIDE_TYPE, BUTTON_STYLE } from "../../utils/constants/slide.constants.js";
import { NOTIFICATION_TYPE, NOTIFICATION_CHANNEL, NOTIFICATION_STATUS, NOTIFICATION_PRIORITY } from "../../utils/constants/notification.constants.js";
import { ACTION_TYPE, ENTITY_TYPE, SEVERITY } from "../../utils/constants/activity.constants.js";

// Local Ghanaian names for candidates
const ghanaianFirstNames = [
  "Kwame", "Kofi", "Kwesi", "Yaw", "Kwabena", "Kojo", "Kwaku",
  "Akosua", "Ama", "Abena", "Adjoa", "Akua", "Yaa", "Afia",
  "Nana", "Adwoa", "Efua", "Araba", "Ekua", "Esi", "Afua",
  "Kwadwo", "Kwasi", "Papa", "Kobby", "Obeng", "Mensah", "Nii"
];

const ghanaianLastNames = [
  "Asante", "Osei", "Mensah", "Boateng", "Agyeman", "Annan", "Owusu",
  "Adjei", "Amoah", "Appiah", "Asare", "Baidoo", "Darko", "Donkor",
  "Frimpong", "Gyamfi", "Kusi", "Nkrumah", "Oppong", "Quaye", "Sarpong",
  "Tetteh", "Yeboah", "Adomako", "Addo", "Agyapong", "Amponsah", "Ansah",
  "Boadu", "Dankwa", "Edusei", "Fordjour", "Gyasi", "Kwafo", "Larbi"
];

// Helper function to get random item from array
const getRandomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Helper function to get random number in range
const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// Helper function to generate slug
const generateSlug = (text) => {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
};

// Helper function to generate candidate code
const generateCandidateCode = (index) => {
  return `CAN${String(index).padStart(4, '0')}`;
};

class DatabaseSeeder {
  constructor() {
    this.users = [];
    this.events = [];
    this.categories = [];
    this.candidates = [];
    this.bundles = [];
    this.coupons = [];
    this.forms = [];
    this.slides = [];
  }

  async connect() {
    const mongoUri = process.env.MONGODB_URI || "mongodb://localhost:27017/itfy-evoting";
    
    try {
      console.log("🔗 Connecting to database...");
      await mongoose.connect(mongoUri);
      console.log("✅ Database connected successfully");
    } catch (error) {
      console.error("❌ Database connection failed:", error.message);
      process.exit(1);
    }
  }

  async clearCollections() {
    console.log("\n🧹 Clearing existing data (excluding votes and payments)...");
    
    const collections = [
      { model: userModel, name: "Users" },
      { model: eventModel, name: "Events" },
      { model: candidateModel, name: "Candidates" },
      { model: categoryModel, name: "Categories" },
      { model: bundleModel, name: "Bundles" },
      { model: couponModel, name: "Coupons" },
      { model: formModel, name: "Forms" },
      { model: slideModel, name: "Slides" },
      { model: notificationModel, name: "Notifications" },
      { model: activityModel, name: "Activities" },
    ];

    for (const { model, name } of collections) {
      try {
        await model.deleteMany({});
        console.log(`  ✓ Cleared ${name}`);
      } catch (error) {
        console.log(`  ⚠ Warning clearing ${name}: ${error.message}`);
      }
    }
  }

  async seedUsers() {
    console.log("\n👤 Seeding users...");
    
    const usersData = [
      {
        name: "Super Admin",
        email: "superadmin@itfy.com",
        password_hash: "Password123!",
        role: ROLES.SUPER_ADMIN,
        permissions: Object.values(PERMISSIONS),
        email_verified: true,
        email_verified_at: new Date(),
        status: USER_STATUS.ACTIVE,
        bio: "System super administrator with full access",
      },
      {
        name: "Admin User",
        email: "admin@itfy.com",
        password_hash: "Password123!",
        role: ROLES.ADMIN,
        permissions: [PERMISSIONS.READ, PERMISSIONS.WRITE, PERMISSIONS.UPDATE],
        email_verified: true,
        email_verified_at: new Date(),
        status: USER_STATUS.ACTIVE,
        bio: "Event administrator",
      },
      {
        name: "Organiser One",
        email: "organiser@itfy.com",
        password_hash: "Password123!",
        role: ROLES.ORGANISER,
        permissions: [PERMISSIONS.READ, PERMISSIONS.WRITE, PERMISSIONS.UPDATE],
        email_verified: true,
        email_verified_at: new Date(),
        status: USER_STATUS.ACTIVE,
        bio: "Event organiser managing multiple events",
      },
      {
        name: "Moderator User",
        email: "moderator@itfy.com",
        password_hash: "Password123!",
        role: ROLES.MODERATOR,
        permissions: [PERMISSIONS.READ, PERMISSIONS.WRITE],
        email_verified: true,
        email_verified_at: new Date(),
        status: USER_STATUS.ACTIVE,
        bio: "Content moderator",
      },
    ];

    for (const userData of usersData) {
      const user = await userModel.create(userData);
      this.users.push(user);
      console.log(`  ✓ Created user: ${userData.email}`);
    }
  }

  async seedEvents() {
    console.log("\n📅 Seeding events...");
    
    const now = new Date();
    const oneMonthLater = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
    const twoMonthsLater = new Date(now.getTime() + 60 * 24 * 60 * 60 * 1000);
    const threeMonthsLater = new Date(now.getTime() + 90 * 24 * 60 * 60 * 1000);

    const eventsData = [
      {
        name: "Ghana Music Awards 2025",
        description: "The prestigious Ghana Music Awards recognizing excellence in Ghanaian music. Join us for an unforgettable night celebrating the best in the industry.",
        location: {
          name: "Accra International Conference Centre",
          address: "Castle Road, Ridge",
          city: "Accra",
          country: "Ghana",
          zipCode: "GA-123",
          coordinates: { lat: 5.5600, lng: -0.2050 },
          venueInfo: ["Air conditioned", "Wheelchair accessible", "Parking available"],
          directions: ["Take Castle Road from Ridge Roundabout", "Venue is on the left"],
        },
        start_date: oneMonthLater,
        end_date: new Date(oneMonthLater.getTime() + 8 * 60 * 60 * 1000), // 8 hours after start
        status: EVENT_STATUS.ACTIVE,
        event_type: EVENT_TYPE.CONFERENCE,
        visibility: VISIBILITY.PUBLIC,
        currency: CURRENCY.GHS,
        slug: "ghana-music-awards-2025",
        created_by: this.users[0]._id,
        organizer: {
          name: "Ghana Music Rights Organization",
          email: "info@ghamro.com",
          phone: "+233244123456",
        },
        voting_config: {
          voting_enabled: true,
          votes_per_user: 10,
          vote_price: 1.0,
          min_votes_per_purchase: 1,
          max_votes_per_purchase: 100,
        },
        speakers: [
          { name: "DJ Black", title: "Music Producer", bio: "Award-winning music producer" },
          { name: "Ameyaw Debrah", title: "Entertainment Journalist", bio: "Ghana's leading entertainment blogger" },
        ],
      },
      {
        name: "Miss Ghana 2025",
        description: "The annual Miss Ghana Beauty Pageant celebrating Ghanaian women. A celebration of beauty, intelligence, and grace.",
        location: {
          name: "National Theatre",
          address: "Liberia Road",
          city: "Accra",
          country: "Ghana",
          coordinates: { lat: 5.5563, lng: -0.2140 },
          venueInfo: ["Historic venue", "VIP lounge available"],
        },
        start_date: twoMonthsLater,
        end_date: new Date(twoMonthsLater.getTime() + 6 * 60 * 60 * 1000), // 6 hours after start
        status: EVENT_STATUS.UPCOMING,
        event_type: EVENT_TYPE.OTHER,
        visibility: VISIBILITY.PUBLIC,
        currency: CURRENCY.GHS,
        slug: "miss-ghana-2025",
        created_by: this.users[1]._id,
        organizer: {
          name: "Exclusive Events Ghana",
          email: "info@exclusiveevents.gh",
          phone: "+233201234567",
        },
        voting_config: {
          voting_enabled: true,
          votes_per_user: 50,
          vote_price: 0.5,
          min_votes_per_purchase: 5,
          max_votes_per_purchase: 500,
        },
      },
      {
        name: "Ghana Tech Summit 2025",
        description: "Africa's premier technology conference showcasing innovations and connecting tech professionals across the continent.",
        location: {
          name: "Kempinski Hotel Gold Coast City",
          address: "Gamel Abdul Nasser Avenue",
          city: "Accra",
          country: "Ghana",
          coordinates: { lat: 5.5582, lng: -0.1877 },
          venueInfo: ["5-star amenities", "Free WiFi", "Exhibition hall"],
        },
        start_date: threeMonthsLater,
        end_date: new Date(threeMonthsLater.getTime() + 3 * 24 * 60 * 60 * 1000), // 3 days after start
        status: EVENT_STATUS.UPCOMING,
        event_type: EVENT_TYPE.CONFERENCE,
        visibility: VISIBILITY.PUBLIC,
        currency: CURRENCY.GHS,
        slug: "ghana-tech-summit-2025",
        created_by: this.users[2]._id,
        organizer: {
          name: "Tech Ghana Foundation",
          email: "summit@techghana.org",
          phone: "+233551234567",
        },
        voting_config: {
          voting_enabled: true,
          votes_per_user: 20,
          vote_price: 2.0,
          min_votes_per_purchase: 1,
          max_votes_per_purchase: 50,
        },
        speakers: [
          { name: "Regina Honu", title: "CEO, Soronko Academy", bio: "Tech educator and entrepreneur" },
          { name: "Herman Chinery-Hesse", title: "Founder, theSOFTtribe", bio: "Pioneer of Ghana's software industry" },
        ],
      },
    ];

    for (const eventData of eventsData) {
      const event = await eventModel.create(eventData);
      this.events.push(event);
      console.log(`  ✓ Created event: ${eventData.name}`);
    }
  }

  async seedCategories() {
    console.log("\n🏷️ Seeding categories...");
    
    // Categories for Ghana Music Awards
    const musicCategories = [
      { name: "Artiste of the Year", description: "Best overall performing artiste of the year" },
      { name: "Best Male Vocal Performance", description: "Outstanding male vocal performance" },
      { name: "Best Female Vocal Performance", description: "Outstanding female vocal performance" },
      { name: "Best Hip Hop/Hiplife Artiste", description: "Excellence in hip hop and hiplife music" },
      { name: "Best Highlife Artiste", description: "Best artiste in the highlife genre" },
      { name: "Best Gospel Artiste", description: "Excellence in gospel music" },
      { name: "Best New Artiste", description: "Most promising new talent" },
      { name: "Best Collaboration", description: "Best musical collaboration of the year" },
    ];

    // Categories for Miss Ghana
    const beautyCategories = [
      { name: "Miss Photogenic", description: "Most photogenic contestant" },
      { name: "Miss Congeniality", description: "Most friendly and sociable contestant" },
      { name: "Best Traditional Wear", description: "Best presentation in traditional attire" },
      { name: "Miss Talent", description: "Best talent showcase" },
      { name: "People's Choice", description: "Public favorite" },
    ];

    // Categories for Tech Summit
    const techCategories = [
      { name: "Tech Startup of the Year", description: "Most innovative tech startup" },
      { name: "Best AI/ML Solution", description: "Outstanding artificial intelligence application" },
      { name: "Best FinTech Innovation", description: "Excellence in financial technology" },
      { name: "Best Social Impact Tech", description: "Technology for social good" },
      { name: "Young Innovator Award", description: "Outstanding young tech innovator under 30" },
    ];

    const now = new Date();
    const votingStart = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000); // 1 week from now
    const votingEnd = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000); // 1 month from now

    // Create categories for each event
    const allCategories = [
      { categories: musicCategories, event: this.events[0] },
      { categories: beautyCategories, event: this.events[1] },
      { categories: techCategories, event: this.events[2] },
    ];

    for (const { categories, event } of allCategories) {
      for (let i = 0; i < categories.length; i++) {
        const catData = categories[i];
        const category = await categoryModel.create({
          name: catData.name,
          description: catData.description,
          slug: generateSlug(`${event.name}-${catData.name}`),
          event: event._id,
          status: CATEGORY_STATUS.ACTIVE,
          is_voting_open: true,
          voting_start_date: votingStart,
          voting_deadline: votingEnd,
          display_order: i,
          is_featured: i === 0,
          results_visibility: RESULTS_VISIBILITY.PUBLIC,
          created_by: this.users[0]._id,
        });
        this.categories.push(category);
        console.log(`  ✓ Created category: ${catData.name} for ${event.name}`);
      }
    }
  }

  async seedCandidates() {
    console.log("\n👥 Seeding candidates with Ghanaian names...");
    
    let candidateIndex = 1;
    
    // Bio templates based on category type
    const bioTemplates = {
      music: (name) => `${name} is a talented Ghanaian artiste known for their unique blend of traditional and contemporary sounds. With multiple hit songs and a growing fanbase, they continue to push boundaries in the music industry.`,
      beauty: (name) => `${name} is a confident and accomplished young woman representing the best of Ghanaian culture. She is passionate about community development and youth empowerment.`,
      tech: (name) => `${name} is an innovative tech entrepreneur from Ghana, leading the charge in Africa's digital transformation. Their solutions have impacted thousands of lives across the continent.`,
    };

    const skillSets = {
      music: ["Singing", "Songwriting", "Performance", "Music Production", "Dance"],
      beauty: ["Public Speaking", "Community Service", "Fashion", "Leadership", "Cultural Advocacy"],
      tech: ["Software Development", "AI/ML", "Product Management", "Entrepreneurship", "Data Science"],
    };

    // Generate candidates for each category
    for (const category of this.categories) {
      const event = this.events.find(e => e._id.toString() === category.event.toString());
      const categoryType = event.name.includes("Music") ? "music" : 
                          event.name.includes("Miss") ? "beauty" : "tech";
      
      // Create 4-6 candidates per category
      const numCandidates = getRandomInt(4, 6);
      const categoryIds = [];

      for (let i = 0; i < numCandidates; i++) {
        const firstName = getRandomItem(ghanaianFirstNames);
        const lastName = getRandomItem(ghanaianLastNames);
        const fullName = `${firstName} ${lastName}`;
        const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}${candidateIndex}@example.com`;
        
        const candidateData = {
          first_name: firstName,
          last_name: lastName,
          email: email,
          password_hash: "Password123!",
          phone_number: `+233${getRandomInt(20, 59)}${getRandomInt(1000000, 9999999)}`,
          slug: generateSlug(`${fullName}-${candidateIndex}`),
          bio: bioTemplates[categoryType](fullName),
          event: event._id,
          categories: [category._id],
          admin_verified_categories: [category._id],
          status: CANDIDATE_STATUS.APPROVED,
          is_featured: i === 0,
          is_published: true,
          display_order: i,
          vote_count: getRandomInt(100, 5000),
          view_count: getRandomInt(500, 10000),
          skills: skillSets[categoryType].slice(0, getRandomInt(2, 5)),
          why_nominate_me: `I believe my dedication and passion for ${categoryType === "music" ? "music" : categoryType === "beauty" ? "empowering communities" : "technology innovation"} makes me deserving of this recognition. I am committed to making Ghana proud.`,
          impact_statement: `Through my work, I have positively impacted thousands of people in Ghana and beyond. I continue to strive for excellence.`,
          social_links: {
            twitter: `https://twitter.com/${firstName.toLowerCase()}${lastName.toLowerCase()}`,
            instagram: `https://instagram.com/${firstName.toLowerCase()}_${lastName.toLowerCase()}`,
            facebook: `https://facebook.com/${firstName.toLowerCase()}.${lastName.toLowerCase()}`,
          },
          education: [
            {
              institution: getRandomItem(["University of Ghana", "KNUST", "University of Cape Coast", "Ashesi University", "Ghana Institute of Management"]),
              qualification: getRandomItem(["Bachelor's Degree", "Master's Degree", "Diploma"]),
              field: categoryType === "tech" ? "Computer Science" : categoryType === "music" ? "Music" : "Communications",
              current: false,
            },
          ],
          experience: categoryType === "music" ? [
            {
              company: "Independent Artist",
              position: "Recording Artist",
              current: true,
              description: "Creating and performing original music",
            },
          ] : categoryType === "tech" ? [
            {
              company: getRandomItem(["Hubtel", "MTN Ghana", "Vodafone Ghana", "Tech Startup"]),
              position: getRandomItem(["Software Engineer", "Product Manager", "CTO", "Data Scientist"]),
              current: true,
              description: "Leading technology initiatives",
            },
          ] : [],
          achievements: [
            {
              title: `${categoryType === "music" ? "Hit Song Award" : categoryType === "beauty" ? "Community Leader Award" : "Innovation Award"}`,
              description: "Recognition for outstanding contribution",
              date: new Date(Date.now() - getRandomInt(30, 365) * 24 * 60 * 60 * 1000),
              organization: "Ghana Excellence Foundation",
            },
          ],
          created_by: this.users[0]._id,
        };

        const candidate = await candidateModel.create(candidateData);
        this.candidates.push(candidate);
        categoryIds.push(candidate._id);
        candidateIndex++;
        
        console.log(`  ✓ Created candidate: ${fullName} for ${category.name}`);
      }

      // Update category with candidate references
      await categoryModel.findByIdAndUpdate(category._id, {
        $set: { candidates: categoryIds }
      });
    }

    // Update events with category references
    for (const event of this.events) {
      const eventCategories = this.categories.filter(c => c.event.toString() === event._id.toString());
      await eventModel.findByIdAndUpdate(event._id, {
        $set: { categories: eventCategories.map(c => c._id) }
      });
    }
  }

  async seedBundles() {
    console.log("\n📦 Seeding vote bundles...");
    
    const bundleTemplates = [
      { name: "Starter Pack", vote_count: 10, price: 10, description: "Perfect for getting started" },
      { name: "Bronze Bundle", vote_count: 25, price: 20, discount_percentage: 5, description: "Great value for supporters" },
      { name: "Silver Bundle", vote_count: 50, price: 35, discount_percentage: 10, is_popular: true, description: "Most popular choice" },
      { name: "Gold Bundle", vote_count: 100, price: 60, discount_percentage: 15, is_featured: true, description: "Best value for dedicated fans" },
      { name: "Platinum Bundle", vote_count: 250, price: 125, discount_percentage: 20, description: "Ultimate supporter package" },
      { name: "Diamond Bundle", vote_count: 500, price: 200, discount_percentage: 25, description: "For the biggest fans" },
    ];

    for (const event of this.events) {
      const eventCategories = this.categories.filter(c => c.event.toString() === event._id.toString());
      
      for (let i = 0; i < bundleTemplates.length; i++) {
        const template = bundleTemplates[i];
        const bundle = await bundleModel.create({
          name: template.name,
          description: template.description,
          slug: generateSlug(`${event.name}-${template.name}`),
          event: event._id,
          categories: eventCategories.map(c => c._id),
          vote_count: template.vote_count,
          price: template.price,
          currency: CURRENCY.GHS,
          discount_percentage: template.discount_percentage || 0,
          original_price: template.discount_percentage ? Math.round(template.price / (1 - template.discount_percentage / 100)) : template.price,
          is_featured: template.is_featured || false,
          is_popular: template.is_popular || false,
          display_order: i,
          status: BUNDLE_STATUS.ACTIVE,
          validity_start: new Date(),
          validity_end: event.end_date,
          created_by: this.users[0]._id,
        });
        this.bundles.push(bundle);
        console.log(`  ✓ Created bundle: ${template.name} for ${event.name}`);
      }
    }
  }

  async seedCoupons() {
    console.log("\n🎟️ Seeding coupons...");
    
    const couponTemplates = [
      { code: "WELCOME10", discount_type: DISCOUNT_TYPE.PERCENTAGE, discount_value: 10, max_total_uses: 100, description: "Welcome discount for new users" },
      { code: "VOTE20", discount_type: DISCOUNT_TYPE.PERCENTAGE, discount_value: 20, max_total_uses: 50, description: "Special voting discount" },
      { code: "GHANA25", discount_type: DISCOUNT_TYPE.PERCENTAGE, discount_value: 25, max_total_uses: 25, description: "Ghana Independence special" },
      { code: "SAVE5GHS", discount_type: DISCOUNT_TYPE.FIXED_AMOUNT, discount_value: 5, max_total_uses: 200, description: "Save GH₵5 on any purchase" },
      { code: "BONUS50", discount_type: DISCOUNT_TYPE.BONUS_VOTES, discount_value: 50, max_total_uses: 30, description: "Get 50 bonus votes" },
    ];

    const eventPrefixes = ["GMA", "MGH", "GTS"]; // Ghana Music Awards, Miss Ghana, Ghana Tech Summit

    for (let eventIndex = 0; eventIndex < this.events.length; eventIndex++) {
      const event = this.events[eventIndex];
      const eventBundles = this.bundles.filter(b => b.event.toString() === event._id.toString());
      const eventPrefix = eventPrefixes[eventIndex] || `E${eventIndex + 1}`;
      
      for (const template of couponTemplates) {
        const code = `${template.code}_${eventPrefix}`;
        const coupon = await couponModel.create({
          code: code,
          description: template.description,
          event: event._id,
          applicable_bundles: eventBundles.map(b => b._id),
          discount_type: template.discount_type,
          discount_value: template.discount_value,
          status: COUPON_STATUS.ACTIVE,
          max_total_uses: template.max_total_uses,
          max_uses_per_user: 1,
          validity_start: new Date(),
          validity_end: event.end_date,
          is_public: true,
          created_by: this.users[0]._id,
        });
        this.coupons.push(coupon);
        console.log(`  ✓ Created coupon: ${code}`);
      }
    }
  }

  async seedForms() {
    console.log("\n📝 Seeding forms...");
    
    for (const event of this.events) {
      const eventCategories = this.categories.filter(c => c.event.toString() === event._id.toString());
      
      // Nomination form
      const nominationForm = await formModel.create({
        name: `${event.name} - Nomination Form`,
        description: `Submit your nomination for ${event.name}`,
        slug: generateSlug(`${event.name}-nomination-form`),
        form_type: FORM_TYPE.NOMINATION,
        event: event._id,
        categories: eventCategories.map(c => c._id),
        fields: [
          {
            field_id: "full_name",
            label: "Full Name",
            field_type: FIELD_TYPE.TEXT,
            placeholder: "Enter nominee's full name",
            validation: { required: true, min_length: 3, max_length: 100 },
            display_order: 0,
            is_identifier_field: true,
          },
          {
            field_id: "email",
            label: "Email Address",
            field_type: FIELD_TYPE.EMAIL,
            placeholder: "Enter email address",
            validation: { required: true },
            display_order: 1,
            is_duplicate_check_field: true,
          },
          {
            field_id: "phone",
            label: "Phone Number",
            field_type: FIELD_TYPE.PHONE,
            placeholder: "Enter phone number",
            validation: { required: true },
            display_order: 2,
          },
          {
            field_id: "category",
            label: "Category",
            field_type: FIELD_TYPE.SELECT,
            options: eventCategories.map(c => ({ label: c.name, value: c._id.toString() })),
            validation: { required: true },
            display_order: 3,
          },
          {
            field_id: "reason",
            label: "Why should this person be nominated?",
            field_type: FIELD_TYPE.TEXTAREA,
            placeholder: "Tell us why this nominee deserves recognition...",
            validation: { required: true, min_length: 50, max_length: 1000 },
            display_order: 4,
          },
          {
            field_id: "supporting_docs",
            label: "Supporting Documents (Optional)",
            field_type: FIELD_TYPE.FILE,
            help_text: "Upload any supporting documents (PDF, images)",
            validation: { required: false },
            display_order: 5,
          },
        ],
        status: FORM_STATUS.ACTIVE,
        submission_start_date: new Date(),
        submission_end_date: event.start_date,
        created_by: this.users[0]._id,
      });
      this.forms.push(nominationForm);
      console.log(`  ✓ Created nomination form for ${event.name}`);

      // Registration form
      const registrationForm = await formModel.create({
        name: `${event.name} - Event Registration`,
        description: `Register to attend ${event.name}`,
        slug: generateSlug(`${event.name}-registration-form`),
        form_type: FORM_TYPE.REGISTRATION,
        event: event._id,
        fields: [
          {
            field_id: "attendee_name",
            label: "Full Name",
            field_type: FIELD_TYPE.TEXT,
            validation: { required: true },
            display_order: 0,
          },
          {
            field_id: "attendee_email",
            label: "Email",
            field_type: FIELD_TYPE.EMAIL,
            validation: { required: true },
            display_order: 1,
            is_duplicate_check_field: true,
          },
          {
            field_id: "attendee_phone",
            label: "Phone",
            field_type: FIELD_TYPE.PHONE,
            validation: { required: true },
            display_order: 2,
          },
          {
            field_id: "ticket_type",
            label: "Ticket Type",
            field_type: FIELD_TYPE.SELECT,
            options: [
              { label: "Regular", value: "regular" },
              { label: "VIP", value: "vip" },
              { label: "VVIP", value: "vvip" },
            ],
            validation: { required: true },
            display_order: 3,
          },
        ],
        status: FORM_STATUS.ACTIVE,
        submission_start_date: new Date(),
        submission_end_date: event.start_date,
        created_by: this.users[0]._id,
      });
      this.forms.push(registrationForm);
      console.log(`  ✓ Created registration form for ${event.name}`);
    }
  }

  async seedSlides() {
    console.log("\n🖼️ Seeding slides...");
    
    const slideTemplates = [
      {
        title: "Vote for Your Favorites",
        subtitle: "Support your preferred candidates",
        description: "Make your voice heard. Cast your votes now and help your favorite nominees win!",
        slide_type: SLIDE_TYPE.HERO,
        text_color: "#ffffff",
        overlay_opacity: 50,
        button: {
          text: "Start Voting",
          url: "/vote",
          style: BUTTON_STYLE.PRIMARY,
        },
      },
      {
        title: "Nominations Open",
        subtitle: "Know someone who deserves recognition?",
        description: "Submit your nominations before the deadline closes!",
        slide_type: SLIDE_TYPE.ANNOUNCEMENT,
        text_color: "#ffffff",
        overlay_opacity: 40,
        button: {
          text: "Nominate Now",
          url: "/nominate",
          style: BUTTON_STYLE.SECONDARY,
        },
      },
      {
        title: "Special Vote Bundles",
        subtitle: "Save more when you buy bundles",
        description: "Get up to 25% discount on vote bundles. Limited time offer!",
        slide_type: SLIDE_TYPE.PROMOTION,
        text_color: "#ffffff",
        overlay_opacity: 45,
        button: {
          text: "View Bundles",
          url: "/bundles",
          style: BUTTON_STYLE.PRIMARY,
        },
      },
    ];

    for (let eventIndex = 0; eventIndex < this.events.length; eventIndex++) {
      const event = this.events[eventIndex];
      for (let i = 0; i < slideTemplates.length; i++) {
        const template = slideTemplates[i];
        const slide = await slideModel.create({
          title: `${template.title} - ${event.name}`,
          subtitle: template.subtitle,
          description: template.description,
          slide_type: template.slide_type,
          status: SLIDE_STATUS.ACTIVE,
          event: event._id,
          image: {
            url: `https://picsum.photos/seed/${event._id.toString().slice(-6)}-${i}/1920/1080`,
            alt: template.title,
          },
          text_color: template.text_color,
          overlay_opacity: template.overlay_opacity,
          button: template.button,
          display_order: i,
          is_published: true,
          schedule_start: new Date(),
          schedule_end: event.end_date,
          created_by: this.users[0]._id,
        });
        this.slides.push(slide);
        console.log(`  ✓ Created slide: ${slide.title}`);
      }
    }

    // Create a global slide (not tied to any event)
    const globalSlide = await slideModel.create({
      title: "Welcome to ITFY eVoting Platform",
      subtitle: "Ghana's Premier Online Voting Platform",
      description: "Secure, transparent, and easy-to-use voting for all your events.",
      slide_type: SLIDE_TYPE.HERO,
      status: SLIDE_STATUS.ACTIVE,
      image: {
        url: "https://picsum.photos/seed/itfy-hero-main/1920/1080",
        alt: "ITFY eVoting Platform",
      },
      text_color: "#ffffff",
      overlay_opacity: 50,
      button: {
        text: "Explore Events",
        url: "/events",
        style: BUTTON_STYLE.PRIMARY,
      },
      display_order: 0,
      is_published: true,
      created_by: this.users[0]._id,
    });
    this.slides.push(globalSlide);
    console.log(`  ✓ Created global hero slide`);
  }

  async seedNotifications() {
    console.log("\n🔔 Seeding sample notifications...");
    
    // Create some sample notifications for users
    const notificationTemplates = [
      {
        type: NOTIFICATION_TYPE.SYSTEM_ANNOUNCEMENT,
        title: "Welcome to ITFY eVoting!",
        message: "Thank you for joining our platform. Start exploring events and cast your votes!",
        channel: NOTIFICATION_CHANNEL.IN_APP,
        priority: NOTIFICATION_PRIORITY.NORMAL,
        status: NOTIFICATION_STATUS.DELIVERED,
      },
      {
        type: NOTIFICATION_TYPE.VOTING_STARTED,
        title: "Voting is Now Open!",
        message: "Voting has started for Ghana Music Awards 2025. Cast your votes now!",
        channel: NOTIFICATION_CHANNEL.IN_APP,
        priority: NOTIFICATION_PRIORITY.HIGH,
        status: NOTIFICATION_STATUS.DELIVERED,
      },
      {
        type: NOTIFICATION_TYPE.BUNDLE_PROMOTION,
        title: "Special Offer: 25% Off Vote Bundles!",
        message: "Get 25% off on all Diamond Bundles. Limited time offer!",
        channel: NOTIFICATION_CHANNEL.IN_APP,
        priority: NOTIFICATION_PRIORITY.NORMAL,
        status: NOTIFICATION_STATUS.PENDING,
      },
    ];

    for (const user of this.users) {
      for (const template of notificationTemplates) {
        await notificationModel.create({
          user: user._id,
          type: template.type,
          title: template.title,
          message: template.message,
          channel: template.channel,
          priority: template.priority,
          status: template.status,
          event: this.events[0]._id,
          read_at: template.status === NOTIFICATION_STATUS.DELIVERED ? new Date() : null,
        });
      }
      console.log(`  ✓ Created notifications for ${user.email}`);
    }
  }

  async seedActivities() {
    console.log("\n📊 Seeding activity logs...");
    
    const activityTypes = [
      { action: ACTION_TYPE.LOGIN, entity_type: ENTITY_TYPE.USER, description: "User logged in", severity: SEVERITY.INFO },
      { action: ACTION_TYPE.EVENT_CREATE, entity_type: ENTITY_TYPE.EVENT, description: "Created event", severity: SEVERITY.INFO },
      { action: ACTION_TYPE.CANDIDATE_APPROVE, entity_type: ENTITY_TYPE.CANDIDATE, description: "Approved candidate", severity: SEVERITY.INFO },
      { action: ACTION_TYPE.CATEGORY_CREATE, entity_type: ENTITY_TYPE.CATEGORY, description: "Created category", severity: SEVERITY.INFO },
    ];

    for (const user of this.users) {
      for (const activity of activityTypes) {
        await activityModel.create({
          user: user._id,
          action: activity.action,
          entity_type: activity.entity_type,
          description: activity.description,
          severity: activity.severity,
          ip_address: "127.0.0.1",
          user_agent: "Mozilla/5.0 (Seeder)",
          entity_id: activity.entity_type === ENTITY_TYPE.EVENT ? this.events[0]._id : 
                     activity.entity_type === ENTITY_TYPE.CANDIDATE ? this.candidates[0]?._id : 
                     activity.entity_type === ENTITY_TYPE.CATEGORY ? this.categories[0]?._id : user._id,
          event: activity.entity_type !== ENTITY_TYPE.USER ? this.events[0]._id : null,
          metadata: {
            seeded: true,
            timestamp: new Date(),
          },
        });
      }
      console.log(`  ✓ Created activities for ${user.email}`);
    }
  }

  async run() {
    try {
      await this.connect();
      await this.clearCollections();
      
      // Seed in order of dependencies
      await this.seedUsers();
      await this.seedEvents();
      await this.seedCategories();
      await this.seedCandidates();
      await this.seedBundles();
      await this.seedCoupons();
      await this.seedForms();
      await this.seedSlides();
      await this.seedNotifications();
      await this.seedActivities();

      console.log("\n" + "═".repeat(50));
      console.log("✅ Database seeding completed successfully!");
      console.log("═".repeat(50));
      console.log("\n📊 Summary:");
      console.log(`  • Users: ${this.users.length}`);
      console.log(`  • Events: ${this.events.length}`);
      console.log(`  • Categories: ${this.categories.length}`);
      console.log(`  • Candidates: ${this.candidates.length}`);
      console.log(`  • Bundles: ${this.bundles.length}`);
      console.log(`  • Coupons: ${this.coupons.length}`);
      console.log(`  • Forms: ${this.forms.length}`);
      console.log(`  • Slides: ${this.slides.length}`);
      console.log("\n🔐 Test Credentials:");
      console.log("  Super Admin: superadmin@itfy.com / Password123!");
      console.log("  Admin: admin@itfy.com / Password123!");
      console.log("  Organiser: organiser@itfy.com / Password123!");
      console.log("\n⚠️  Note: Vote and Payment collections were NOT seeded.");
      
    } catch (error) {
      console.error("\n❌ Seeding failed:", error);
      throw error;
    } finally {
      await mongoose.disconnect();
      console.log("\n🔌 Database disconnected");
      process.exit(0);
    }
  }
}

// Run seeder
const seeder = new DatabaseSeeder();
seeder.run();
