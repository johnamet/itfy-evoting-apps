"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));
var _dotenv = _interopRequireDefault(require("dotenv"));
var _userModel = _interopRequireDefault(require("../../modules/user/user.model.js"));
var _eventModel = _interopRequireDefault(require("../../modules/event/event.model.js"));
var _candidateModel = _interopRequireDefault(require("../../modules/candidate/candidate.model.js"));
var _categoryModel = _interopRequireDefault(require("../../modules/category/category.model.js"));
var _bundleModel = _interopRequireDefault(require("../../modules/vote/bundle/bundle.model.js"));
var _couponModel = _interopRequireDefault(require("../../modules/vote/coupon/coupon.model.js"));
var _formModel = _interopRequireDefault(require("../../modules/form/form.model.js"));
var _slideModel = _interopRequireDefault(require("../../modules/slide/slide.model.js"));
var _notificationModel = _interopRequireDefault(require("../../modules/notification/notification.model.js"));
var _activityModel = _interopRequireDefault(require("../../modules/activity/activity.model.js"));
var _userConstants = require("../../utils/constants/user.constants.js");
var _eventConstants = require("../../utils/constants/event.constants.js");
var _candidateConstants = require("../../utils/constants/candidate.constants.js");
var _categoryConstants = require("../../utils/constants/category.constants.js");
var _voteConstants = require("../../utils/constants/vote.constants.js");
var _formConstants = require("../../utils/constants/form.constants.js");
var _slideConstants = require("../../utils/constants/slide.constants.js");
var _notificationConstants = require("../../utils/constants/notification.constants.js");
var _activityConstants = require("../../utils/constants/activity.constants.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorValues(e) { if (null != e) { var t = e["function" == typeof Symbol && Symbol.iterator || "@@iterator"], r = 0; if (t) return t.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) return { next: function next() { return e && r >= e.length && (e = void 0), { value: e && e[r++], done: !e }; } }; } throw new TypeError(_typeof(e) + " is not iterable"); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } /**
 * Database Seeder
 * Seeds the database with sample data for development and testing
 * Excludes: Vote and Payment collections
 */
// Load environment variables
_dotenv["default"].config();

// Import models

// Import constants

// Local Ghanaian names for candidates
var ghanaianFirstNames = ["Kwame", "Kofi", "Kwesi", "Yaw", "Kwabena", "Kojo", "Kwaku", "Akosua", "Ama", "Abena", "Adjoa", "Akua", "Yaa", "Afia", "Nana", "Adwoa", "Efua", "Araba", "Ekua", "Esi", "Afua", "Kwadwo", "Kwasi", "Papa", "Kobby", "Obeng", "Mensah", "Nii"];
var ghanaianLastNames = ["Asante", "Osei", "Mensah", "Boateng", "Agyeman", "Annan", "Owusu", "Adjei", "Amoah", "Appiah", "Asare", "Baidoo", "Darko", "Donkor", "Frimpong", "Gyamfi", "Kusi", "Nkrumah", "Oppong", "Quaye", "Sarpong", "Tetteh", "Yeboah", "Adomako", "Addo", "Agyapong", "Amponsah", "Ansah", "Boadu", "Dankwa", "Edusei", "Fordjour", "Gyasi", "Kwafo", "Larbi"];

// Helper function to get random item from array
var getRandomItem = function getRandomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

// Helper function to get random number in range
var getRandomInt = function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Helper function to generate slug
var generateSlug = function generateSlug(text) {
  return text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').trim();
};

// Helper function to generate candidate code
var generateCandidateCode = function generateCandidateCode(index) {
  return "CAN".concat(String(index).padStart(4, '0'));
};
var DatabaseSeeder = /*#__PURE__*/function () {
  function DatabaseSeeder() {
    _classCallCheck(this, DatabaseSeeder);
    this.users = [];
    this.events = [];
    this.categories = [];
    this.candidates = [];
    this.bundles = [];
    this.coupons = [];
    this.forms = [];
    this.slides = [];
  }
  return _createClass(DatabaseSeeder, [{
    key: "connect",
    value: function () {
      var _connect = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
        var mongoUri, _t;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.p = _context.n) {
            case 0:
              mongoUri = process.env.MONGODB_URI || "mongodb://localhost:27017/itfy-evoting";
              _context.p = 1;
              console.log("🔗 Connecting to database...");
              _context.n = 2;
              return _mongoose["default"].connect(mongoUri);
            case 2:
              console.log("✅ Database connected successfully");
              _context.n = 4;
              break;
            case 3:
              _context.p = 3;
              _t = _context.v;
              console.error("❌ Database connection failed:", _t.message);
              process.exit(1);
            case 4:
              return _context.a(2);
          }
        }, _callee, null, [[1, 3]]);
      }));
      function connect() {
        return _connect.apply(this, arguments);
      }
      return connect;
    }()
  }, {
    key: "clearCollections",
    value: function () {
      var _clearCollections = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
        var collections, _i, _collections, _collections$_i, model, name, _t2;
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.p = _context2.n) {
            case 0:
              console.log("\n🧹 Clearing existing data (excluding votes and payments)...");
              collections = [{
                model: _userModel["default"],
                name: "Users"
              }, {
                model: _eventModel["default"],
                name: "Events"
              }, {
                model: _candidateModel["default"],
                name: "Candidates"
              }, {
                model: _categoryModel["default"],
                name: "Categories"
              }, {
                model: _bundleModel["default"],
                name: "Bundles"
              }, {
                model: _couponModel["default"],
                name: "Coupons"
              }, {
                model: _formModel["default"],
                name: "Forms"
              }, {
                model: _slideModel["default"],
                name: "Slides"
              }, {
                model: _notificationModel["default"],
                name: "Notifications"
              }, {
                model: _activityModel["default"],
                name: "Activities"
              }];
              _i = 0, _collections = collections;
            case 1:
              if (!(_i < _collections.length)) {
                _context2.n = 6;
                break;
              }
              _collections$_i = _collections[_i], model = _collections$_i.model, name = _collections$_i.name;
              _context2.p = 2;
              _context2.n = 3;
              return model.deleteMany({});
            case 3:
              console.log("  \u2713 Cleared ".concat(name));
              _context2.n = 5;
              break;
            case 4:
              _context2.p = 4;
              _t2 = _context2.v;
              console.log("  \u26A0 Warning clearing ".concat(name, ": ").concat(_t2.message));
            case 5:
              _i++;
              _context2.n = 1;
              break;
            case 6:
              return _context2.a(2);
          }
        }, _callee2, null, [[2, 4]]);
      }));
      function clearCollections() {
        return _clearCollections.apply(this, arguments);
      }
      return clearCollections;
    }()
  }, {
    key: "seedUsers",
    value: function () {
      var _seedUsers = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
        var usersData, _i2, _usersData, userData, user;
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.n) {
            case 0:
              console.log("\n👤 Seeding users...");
              usersData = [{
                name: "Super Admin",
                email: "superadmin@itfy.com",
                password_hash: "Password123!",
                role: _userConstants.ROLES.SUPER_ADMIN,
                permissions: Object.values(_userConstants.PERMISSIONS),
                email_verified: true,
                email_verified_at: new Date(),
                status: _userConstants.STATUS.ACTIVE,
                bio: "System super administrator with full access"
              }, {
                name: "Admin User",
                email: "admin@itfy.com",
                password_hash: "Password123!",
                role: _userConstants.ROLES.ADMIN,
                permissions: [_userConstants.PERMISSIONS.READ, _userConstants.PERMISSIONS.WRITE, _userConstants.PERMISSIONS.UPDATE],
                email_verified: true,
                email_verified_at: new Date(),
                status: _userConstants.STATUS.ACTIVE,
                bio: "Event administrator"
              }, {
                name: "Organiser One",
                email: "organiser@itfy.com",
                password_hash: "Password123!",
                role: _userConstants.ROLES.ORGANISER,
                permissions: [_userConstants.PERMISSIONS.READ, _userConstants.PERMISSIONS.WRITE, _userConstants.PERMISSIONS.UPDATE],
                email_verified: true,
                email_verified_at: new Date(),
                status: _userConstants.STATUS.ACTIVE,
                bio: "Event organiser managing multiple events"
              }, {
                name: "Moderator User",
                email: "moderator@itfy.com",
                password_hash: "Password123!",
                role: _userConstants.ROLES.MODERATOR,
                permissions: [_userConstants.PERMISSIONS.READ, _userConstants.PERMISSIONS.WRITE],
                email_verified: true,
                email_verified_at: new Date(),
                status: _userConstants.STATUS.ACTIVE,
                bio: "Content moderator"
              }];
              _i2 = 0, _usersData = usersData;
            case 1:
              if (!(_i2 < _usersData.length)) {
                _context3.n = 4;
                break;
              }
              userData = _usersData[_i2];
              _context3.n = 2;
              return _userModel["default"].create(userData);
            case 2:
              user = _context3.v;
              this.users.push(user);
              console.log("  \u2713 Created user: ".concat(userData.email));
            case 3:
              _i2++;
              _context3.n = 1;
              break;
            case 4:
              return _context3.a(2);
          }
        }, _callee3, this);
      }));
      function seedUsers() {
        return _seedUsers.apply(this, arguments);
      }
      return seedUsers;
    }()
  }, {
    key: "seedEvents",
    value: function () {
      var _seedEvents = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4() {
        var now, oneMonthLater, twoMonthsLater, threeMonthsLater, eventsData, _i3, _eventsData, eventData, event;
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.n) {
            case 0:
              console.log("\n📅 Seeding events...");
              now = new Date();
              oneMonthLater = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
              twoMonthsLater = new Date(now.getTime() + 60 * 24 * 60 * 60 * 1000);
              threeMonthsLater = new Date(now.getTime() + 90 * 24 * 60 * 60 * 1000);
              eventsData = [{
                name: "Ghana Music Awards 2025",
                description: "The prestigious Ghana Music Awards recognizing excellence in Ghanaian music. Join us for an unforgettable night celebrating the best in the industry.",
                location: {
                  name: "Accra International Conference Centre",
                  address: "Castle Road, Ridge",
                  city: "Accra",
                  country: "Ghana",
                  zipCode: "GA-123",
                  coordinates: {
                    lat: 5.5600,
                    lng: -0.2050
                  },
                  venueInfo: ["Air conditioned", "Wheelchair accessible", "Parking available"],
                  directions: ["Take Castle Road from Ridge Roundabout", "Venue is on the left"]
                },
                start_date: oneMonthLater,
                end_date: new Date(oneMonthLater.getTime() + 8 * 60 * 60 * 1000),
                // 8 hours after start
                status: _eventConstants.STATUS.ACTIVE,
                event_type: _eventConstants.EVENT_TYPE.CONFERENCE,
                visibility: _eventConstants.VISIBILITY.PUBLIC,
                currency: _eventConstants.CURRENCY.GHS,
                slug: "ghana-music-awards-2025",
                created_by: this.users[0]._id,
                organizer: {
                  name: "Ghana Music Rights Organization",
                  email: "info@ghamro.com",
                  phone: "+233244123456"
                },
                voting_config: {
                  voting_enabled: true,
                  votes_per_user: 10,
                  vote_price: 1.0,
                  min_votes_per_purchase: 1,
                  max_votes_per_purchase: 100
                },
                speakers: [{
                  name: "DJ Black",
                  title: "Music Producer",
                  bio: "Award-winning music producer"
                }, {
                  name: "Ameyaw Debrah",
                  title: "Entertainment Journalist",
                  bio: "Ghana's leading entertainment blogger"
                }]
              }, {
                name: "Miss Ghana 2025",
                description: "The annual Miss Ghana Beauty Pageant celebrating Ghanaian women. A celebration of beauty, intelligence, and grace.",
                location: {
                  name: "National Theatre",
                  address: "Liberia Road",
                  city: "Accra",
                  country: "Ghana",
                  coordinates: {
                    lat: 5.5563,
                    lng: -0.2140
                  },
                  venueInfo: ["Historic venue", "VIP lounge available"]
                },
                start_date: twoMonthsLater,
                end_date: new Date(twoMonthsLater.getTime() + 6 * 60 * 60 * 1000),
                // 6 hours after start
                status: _eventConstants.STATUS.UPCOMING,
                event_type: _eventConstants.EVENT_TYPE.OTHER,
                visibility: _eventConstants.VISIBILITY.PUBLIC,
                currency: _eventConstants.CURRENCY.GHS,
                slug: "miss-ghana-2025",
                created_by: this.users[1]._id,
                organizer: {
                  name: "Exclusive Events Ghana",
                  email: "info@exclusiveevents.gh",
                  phone: "+233201234567"
                },
                voting_config: {
                  voting_enabled: true,
                  votes_per_user: 50,
                  vote_price: 0.5,
                  min_votes_per_purchase: 5,
                  max_votes_per_purchase: 500
                }
              }, {
                name: "Ghana Tech Summit 2025",
                description: "Africa's premier technology conference showcasing innovations and connecting tech professionals across the continent.",
                location: {
                  name: "Kempinski Hotel Gold Coast City",
                  address: "Gamel Abdul Nasser Avenue",
                  city: "Accra",
                  country: "Ghana",
                  coordinates: {
                    lat: 5.5582,
                    lng: -0.1877
                  },
                  venueInfo: ["5-star amenities", "Free WiFi", "Exhibition hall"]
                },
                start_date: threeMonthsLater,
                end_date: new Date(threeMonthsLater.getTime() + 3 * 24 * 60 * 60 * 1000),
                // 3 days after start
                status: _eventConstants.STATUS.UPCOMING,
                event_type: _eventConstants.EVENT_TYPE.CONFERENCE,
                visibility: _eventConstants.VISIBILITY.PUBLIC,
                currency: _eventConstants.CURRENCY.GHS,
                slug: "ghana-tech-summit-2025",
                created_by: this.users[2]._id,
                organizer: {
                  name: "Tech Ghana Foundation",
                  email: "summit@techghana.org",
                  phone: "+233551234567"
                },
                voting_config: {
                  voting_enabled: true,
                  votes_per_user: 20,
                  vote_price: 2.0,
                  min_votes_per_purchase: 1,
                  max_votes_per_purchase: 50
                },
                speakers: [{
                  name: "Regina Honu",
                  title: "CEO, Soronko Academy",
                  bio: "Tech educator and entrepreneur"
                }, {
                  name: "Herman Chinery-Hesse",
                  title: "Founder, theSOFTtribe",
                  bio: "Pioneer of Ghana's software industry"
                }]
              }];
              _i3 = 0, _eventsData = eventsData;
            case 1:
              if (!(_i3 < _eventsData.length)) {
                _context4.n = 4;
                break;
              }
              eventData = _eventsData[_i3];
              _context4.n = 2;
              return _eventModel["default"].create(eventData);
            case 2:
              event = _context4.v;
              this.events.push(event);
              console.log("  \u2713 Created event: ".concat(eventData.name));
            case 3:
              _i3++;
              _context4.n = 1;
              break;
            case 4:
              return _context4.a(2);
          }
        }, _callee4, this);
      }));
      function seedEvents() {
        return _seedEvents.apply(this, arguments);
      }
      return seedEvents;
    }()
  }, {
    key: "seedCategories",
    value: function () {
      var _seedCategories = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5() {
        var musicCategories, beautyCategories, techCategories, now, votingStart, votingEnd, allCategories, _i4, _allCategories, _allCategories$_i, categories, event, i, catData, category;
        return _regenerator().w(function (_context5) {
          while (1) switch (_context5.n) {
            case 0:
              console.log("\n🏷️ Seeding categories...");

              // Categories for Ghana Music Awards
              musicCategories = [{
                name: "Artiste of the Year",
                description: "Best overall performing artiste of the year"
              }, {
                name: "Best Male Vocal Performance",
                description: "Outstanding male vocal performance"
              }, {
                name: "Best Female Vocal Performance",
                description: "Outstanding female vocal performance"
              }, {
                name: "Best Hip Hop/Hiplife Artiste",
                description: "Excellence in hip hop and hiplife music"
              }, {
                name: "Best Highlife Artiste",
                description: "Best artiste in the highlife genre"
              }, {
                name: "Best Gospel Artiste",
                description: "Excellence in gospel music"
              }, {
                name: "Best New Artiste",
                description: "Most promising new talent"
              }, {
                name: "Best Collaboration",
                description: "Best musical collaboration of the year"
              }]; // Categories for Miss Ghana
              beautyCategories = [{
                name: "Miss Photogenic",
                description: "Most photogenic contestant"
              }, {
                name: "Miss Congeniality",
                description: "Most friendly and sociable contestant"
              }, {
                name: "Best Traditional Wear",
                description: "Best presentation in traditional attire"
              }, {
                name: "Miss Talent",
                description: "Best talent showcase"
              }, {
                name: "People's Choice",
                description: "Public favorite"
              }]; // Categories for Tech Summit
              techCategories = [{
                name: "Tech Startup of the Year",
                description: "Most innovative tech startup"
              }, {
                name: "Best AI/ML Solution",
                description: "Outstanding artificial intelligence application"
              }, {
                name: "Best FinTech Innovation",
                description: "Excellence in financial technology"
              }, {
                name: "Best Social Impact Tech",
                description: "Technology for social good"
              }, {
                name: "Young Innovator Award",
                description: "Outstanding young tech innovator under 30"
              }];
              now = new Date();
              votingStart = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000); // 1 week from now
              votingEnd = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000); // 1 month from now
              // Create categories for each event
              allCategories = [{
                categories: musicCategories,
                event: this.events[0]
              }, {
                categories: beautyCategories,
                event: this.events[1]
              }, {
                categories: techCategories,
                event: this.events[2]
              }];
              _i4 = 0, _allCategories = allCategories;
            case 1:
              if (!(_i4 < _allCategories.length)) {
                _context5.n = 6;
                break;
              }
              _allCategories$_i = _allCategories[_i4], categories = _allCategories$_i.categories, event = _allCategories$_i.event;
              i = 0;
            case 2:
              if (!(i < categories.length)) {
                _context5.n = 5;
                break;
              }
              catData = categories[i];
              _context5.n = 3;
              return _categoryModel["default"].create({
                name: catData.name,
                description: catData.description,
                slug: generateSlug("".concat(event.name, "-").concat(catData.name)),
                event: event._id,
                status: _categoryConstants.STATUS.ACTIVE,
                is_voting_open: true,
                voting_start_date: votingStart,
                voting_deadline: votingEnd,
                display_order: i,
                is_featured: i === 0,
                results_visibility: _categoryConstants.RESULTS_VISIBILITY.PUBLIC,
                created_by: this.users[0]._id
              });
            case 3:
              category = _context5.v;
              this.categories.push(category);
              console.log("  \u2713 Created category: ".concat(catData.name, " for ").concat(event.name));
            case 4:
              i++;
              _context5.n = 2;
              break;
            case 5:
              _i4++;
              _context5.n = 1;
              break;
            case 6:
              return _context5.a(2);
          }
        }, _callee5, this);
      }));
      function seedCategories() {
        return _seedCategories.apply(this, arguments);
      }
      return seedCategories;
    }()
  }, {
    key: "seedCandidates",
    value: function () {
      var _seedCandidates = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6() {
        var _this = this;
        var candidateIndex, bioTemplates, skillSets, _iterator, _step, _loop, _iterator2, _step2, _loop2, _t3, _t4;
        return _regenerator().w(function (_context8) {
          while (1) switch (_context8.p = _context8.n) {
            case 0:
              console.log("\n👥 Seeding candidates with Ghanaian names...");
              candidateIndex = 1; // Bio templates based on category type
              bioTemplates = {
                music: function music(name) {
                  return "".concat(name, " is a talented Ghanaian artiste known for their unique blend of traditional and contemporary sounds. With multiple hit songs and a growing fanbase, they continue to push boundaries in the music industry.");
                },
                beauty: function beauty(name) {
                  return "".concat(name, " is a confident and accomplished young woman representing the best of Ghanaian culture. She is passionate about community development and youth empowerment.");
                },
                tech: function tech(name) {
                  return "".concat(name, " is an innovative tech entrepreneur from Ghana, leading the charge in Africa's digital transformation. Their solutions have impacted thousands of lives across the continent.");
                }
              };
              skillSets = {
                music: ["Singing", "Songwriting", "Performance", "Music Production", "Dance"],
                beauty: ["Public Speaking", "Community Service", "Fashion", "Leadership", "Cultural Advocacy"],
                tech: ["Software Development", "AI/ML", "Product Management", "Entrepreneurship", "Data Science"]
              }; // Generate candidates for each category
              _iterator = _createForOfIteratorHelper(this.categories);
              _context8.p = 1;
              _loop = /*#__PURE__*/_regenerator().m(function _loop() {
                var category, event, categoryType, numCandidates, categoryIds, i, firstName, lastName, fullName, email, candidateData, candidate;
                return _regenerator().w(function (_context6) {
                  while (1) switch (_context6.n) {
                    case 0:
                      category = _step.value;
                      event = _this.events.find(function (e) {
                        return e._id.toString() === category.event.toString();
                      });
                      categoryType = event.name.includes("Music") ? "music" : event.name.includes("Miss") ? "beauty" : "tech"; // Create 4-6 candidates per category
                      numCandidates = getRandomInt(4, 6);
                      categoryIds = [];
                      i = 0;
                    case 1:
                      if (!(i < numCandidates)) {
                        _context6.n = 4;
                        break;
                      }
                      firstName = getRandomItem(ghanaianFirstNames);
                      lastName = getRandomItem(ghanaianLastNames);
                      fullName = "".concat(firstName, " ").concat(lastName);
                      email = "".concat(firstName.toLowerCase(), ".").concat(lastName.toLowerCase()).concat(candidateIndex, "@example.com");
                      candidateData = {
                        first_name: firstName,
                        last_name: lastName,
                        email: email,
                        password_hash: "Password123!",
                        phone_number: "+233".concat(getRandomInt(20, 59)).concat(getRandomInt(1000000, 9999999)),
                        slug: generateSlug("".concat(fullName, "-").concat(candidateIndex)),
                        bio: bioTemplates[categoryType](fullName),
                        event: event._id,
                        categories: [category._id],
                        admin_verified_categories: [category._id],
                        status: _candidateConstants.STATUS.APPROVED,
                        is_featured: i === 0,
                        is_published: true,
                        display_order: i,
                        vote_count: getRandomInt(100, 5000),
                        view_count: getRandomInt(500, 10000),
                        skills: skillSets[categoryType].slice(0, getRandomInt(2, 5)),
                        why_nominate_me: "I believe my dedication and passion for ".concat(categoryType === "music" ? "music" : categoryType === "beauty" ? "empowering communities" : "technology innovation", " makes me deserving of this recognition. I am committed to making Ghana proud."),
                        impact_statement: "Through my work, I have positively impacted thousands of people in Ghana and beyond. I continue to strive for excellence.",
                        social_links: {
                          twitter: "https://twitter.com/".concat(firstName.toLowerCase()).concat(lastName.toLowerCase()),
                          instagram: "https://instagram.com/".concat(firstName.toLowerCase(), "_").concat(lastName.toLowerCase()),
                          facebook: "https://facebook.com/".concat(firstName.toLowerCase(), ".").concat(lastName.toLowerCase())
                        },
                        education: [{
                          institution: getRandomItem(["University of Ghana", "KNUST", "University of Cape Coast", "Ashesi University", "Ghana Institute of Management"]),
                          qualification: getRandomItem(["Bachelor's Degree", "Master's Degree", "Diploma"]),
                          field: categoryType === "tech" ? "Computer Science" : categoryType === "music" ? "Music" : "Communications",
                          current: false
                        }],
                        experience: categoryType === "music" ? [{
                          company: "Independent Artist",
                          position: "Recording Artist",
                          current: true,
                          description: "Creating and performing original music"
                        }] : categoryType === "tech" ? [{
                          company: getRandomItem(["Hubtel", "MTN Ghana", "Vodafone Ghana", "Tech Startup"]),
                          position: getRandomItem(["Software Engineer", "Product Manager", "CTO", "Data Scientist"]),
                          current: true,
                          description: "Leading technology initiatives"
                        }] : [],
                        achievements: [{
                          title: "".concat(categoryType === "music" ? "Hit Song Award" : categoryType === "beauty" ? "Community Leader Award" : "Innovation Award"),
                          description: "Recognition for outstanding contribution",
                          date: new Date(Date.now() - getRandomInt(30, 365) * 24 * 60 * 60 * 1000),
                          organization: "Ghana Excellence Foundation"
                        }],
                        created_by: _this.users[0]._id
                      };
                      _context6.n = 2;
                      return _candidateModel["default"].create(candidateData);
                    case 2:
                      candidate = _context6.v;
                      _this.candidates.push(candidate);
                      categoryIds.push(candidate._id);
                      candidateIndex++;
                      console.log("  \u2713 Created candidate: ".concat(fullName, " for ").concat(category.name));
                    case 3:
                      i++;
                      _context6.n = 1;
                      break;
                    case 4:
                      _context6.n = 5;
                      return _categoryModel["default"].findByIdAndUpdate(category._id, {
                        $set: {
                          candidates: categoryIds
                        }
                      });
                    case 5:
                      return _context6.a(2);
                  }
                }, _loop);
              });
              _iterator.s();
            case 2:
              if ((_step = _iterator.n()).done) {
                _context8.n = 4;
                break;
              }
              return _context8.d(_regeneratorValues(_loop()), 3);
            case 3:
              _context8.n = 2;
              break;
            case 4:
              _context8.n = 6;
              break;
            case 5:
              _context8.p = 5;
              _t3 = _context8.v;
              _iterator.e(_t3);
            case 6:
              _context8.p = 6;
              _iterator.f();
              return _context8.f(6);
            case 7:
              // Update events with category references
              _iterator2 = _createForOfIteratorHelper(this.events);
              _context8.p = 8;
              _loop2 = /*#__PURE__*/_regenerator().m(function _loop2() {
                var event, eventCategories;
                return _regenerator().w(function (_context7) {
                  while (1) switch (_context7.n) {
                    case 0:
                      event = _step2.value;
                      eventCategories = _this.categories.filter(function (c) {
                        return c.event.toString() === event._id.toString();
                      });
                      _context7.n = 1;
                      return _eventModel["default"].findByIdAndUpdate(event._id, {
                        $set: {
                          categories: eventCategories.map(function (c) {
                            return c._id;
                          })
                        }
                      });
                    case 1:
                      return _context7.a(2);
                  }
                }, _loop2);
              });
              _iterator2.s();
            case 9:
              if ((_step2 = _iterator2.n()).done) {
                _context8.n = 11;
                break;
              }
              return _context8.d(_regeneratorValues(_loop2()), 10);
            case 10:
              _context8.n = 9;
              break;
            case 11:
              _context8.n = 13;
              break;
            case 12:
              _context8.p = 12;
              _t4 = _context8.v;
              _iterator2.e(_t4);
            case 13:
              _context8.p = 13;
              _iterator2.f();
              return _context8.f(13);
            case 14:
              return _context8.a(2);
          }
        }, _callee6, this, [[8, 12, 13, 14], [1, 5, 6, 7]]);
      }));
      function seedCandidates() {
        return _seedCandidates.apply(this, arguments);
      }
      return seedCandidates;
    }()
  }, {
    key: "seedBundles",
    value: function () {
      var _seedBundles = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7() {
        var _this2 = this;
        var bundleTemplates, _iterator3, _step3, _loop3, _t5;
        return _regenerator().w(function (_context0) {
          while (1) switch (_context0.p = _context0.n) {
            case 0:
              console.log("\n📦 Seeding vote bundles...");
              bundleTemplates = [{
                name: "Starter Pack",
                vote_count: 10,
                price: 10,
                description: "Perfect for getting started"
              }, {
                name: "Bronze Bundle",
                vote_count: 25,
                price: 20,
                discount_percentage: 5,
                description: "Great value for supporters"
              }, {
                name: "Silver Bundle",
                vote_count: 50,
                price: 35,
                discount_percentage: 10,
                is_popular: true,
                description: "Most popular choice"
              }, {
                name: "Gold Bundle",
                vote_count: 100,
                price: 60,
                discount_percentage: 15,
                is_featured: true,
                description: "Best value for dedicated fans"
              }, {
                name: "Platinum Bundle",
                vote_count: 250,
                price: 125,
                discount_percentage: 20,
                description: "Ultimate supporter package"
              }, {
                name: "Diamond Bundle",
                vote_count: 500,
                price: 200,
                discount_percentage: 25,
                description: "For the biggest fans"
              }];
              _iterator3 = _createForOfIteratorHelper(this.events);
              _context0.p = 1;
              _loop3 = /*#__PURE__*/_regenerator().m(function _loop3() {
                var event, eventCategories, i, template, bundle;
                return _regenerator().w(function (_context9) {
                  while (1) switch (_context9.n) {
                    case 0:
                      event = _step3.value;
                      eventCategories = _this2.categories.filter(function (c) {
                        return c.event.toString() === event._id.toString();
                      });
                      i = 0;
                    case 1:
                      if (!(i < bundleTemplates.length)) {
                        _context9.n = 4;
                        break;
                      }
                      template = bundleTemplates[i];
                      _context9.n = 2;
                      return _bundleModel["default"].create({
                        name: template.name,
                        description: template.description,
                        slug: generateSlug("".concat(event.name, "-").concat(template.name)),
                        event: event._id,
                        categories: eventCategories.map(function (c) {
                          return c._id;
                        }),
                        vote_count: template.vote_count,
                        price: template.price,
                        currency: _eventConstants.CURRENCY.GHS,
                        discount_percentage: template.discount_percentage || 0,
                        original_price: template.discount_percentage ? Math.round(template.price / (1 - template.discount_percentage / 100)) : template.price,
                        is_featured: template.is_featured || false,
                        is_popular: template.is_popular || false,
                        display_order: i,
                        status: _voteConstants.BUNDLE_STATUS.ACTIVE,
                        validity_start: new Date(),
                        validity_end: event.end_date,
                        created_by: _this2.users[0]._id
                      });
                    case 2:
                      bundle = _context9.v;
                      _this2.bundles.push(bundle);
                      console.log("  \u2713 Created bundle: ".concat(template.name, " for ").concat(event.name));
                    case 3:
                      i++;
                      _context9.n = 1;
                      break;
                    case 4:
                      return _context9.a(2);
                  }
                }, _loop3);
              });
              _iterator3.s();
            case 2:
              if ((_step3 = _iterator3.n()).done) {
                _context0.n = 4;
                break;
              }
              return _context0.d(_regeneratorValues(_loop3()), 3);
            case 3:
              _context0.n = 2;
              break;
            case 4:
              _context0.n = 6;
              break;
            case 5:
              _context0.p = 5;
              _t5 = _context0.v;
              _iterator3.e(_t5);
            case 6:
              _context0.p = 6;
              _iterator3.f();
              return _context0.f(6);
            case 7:
              return _context0.a(2);
          }
        }, _callee7, this, [[1, 5, 6, 7]]);
      }));
      function seedBundles() {
        return _seedBundles.apply(this, arguments);
      }
      return seedBundles;
    }()
  }, {
    key: "seedCoupons",
    value: function () {
      var _seedCoupons = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8() {
        var _this3 = this;
        var couponTemplates, eventPrefixes, _loop4, eventIndex;
        return _regenerator().w(function (_context10) {
          while (1) switch (_context10.n) {
            case 0:
              console.log("\n🎟️ Seeding coupons...");
              couponTemplates = [{
                code: "WELCOME10",
                discount_type: _voteConstants.DISCOUNT_TYPE.PERCENTAGE,
                discount_value: 10,
                max_total_uses: 100,
                description: "Welcome discount for new users"
              }, {
                code: "VOTE20",
                discount_type: _voteConstants.DISCOUNT_TYPE.PERCENTAGE,
                discount_value: 20,
                max_total_uses: 50,
                description: "Special voting discount"
              }, {
                code: "GHANA25",
                discount_type: _voteConstants.DISCOUNT_TYPE.PERCENTAGE,
                discount_value: 25,
                max_total_uses: 25,
                description: "Ghana Independence special"
              }, {
                code: "SAVE5GHS",
                discount_type: _voteConstants.DISCOUNT_TYPE.FIXED_AMOUNT,
                discount_value: 5,
                max_total_uses: 200,
                description: "Save GH₵5 on any purchase"
              }, {
                code: "BONUS50",
                discount_type: _voteConstants.DISCOUNT_TYPE.BONUS_VOTES,
                discount_value: 50,
                max_total_uses: 30,
                description: "Get 50 bonus votes"
              }];
              eventPrefixes = ["GMA", "MGH", "GTS"]; // Ghana Music Awards, Miss Ghana, Ghana Tech Summit
              _loop4 = /*#__PURE__*/_regenerator().m(function _loop4() {
                var event, eventBundles, eventPrefix, _i5, _couponTemplates, template, code, coupon;
                return _regenerator().w(function (_context1) {
                  while (1) switch (_context1.n) {
                    case 0:
                      event = _this3.events[eventIndex];
                      eventBundles = _this3.bundles.filter(function (b) {
                        return b.event.toString() === event._id.toString();
                      });
                      eventPrefix = eventPrefixes[eventIndex] || "E".concat(eventIndex + 1);
                      _i5 = 0, _couponTemplates = couponTemplates;
                    case 1:
                      if (!(_i5 < _couponTemplates.length)) {
                        _context1.n = 4;
                        break;
                      }
                      template = _couponTemplates[_i5];
                      code = "".concat(template.code, "_").concat(eventPrefix);
                      _context1.n = 2;
                      return _couponModel["default"].create({
                        code: code,
                        description: template.description,
                        event: event._id,
                        applicable_bundles: eventBundles.map(function (b) {
                          return b._id;
                        }),
                        discount_type: template.discount_type,
                        discount_value: template.discount_value,
                        status: _voteConstants.COUPON_STATUS.ACTIVE,
                        max_total_uses: template.max_total_uses,
                        max_uses_per_user: 1,
                        validity_start: new Date(),
                        validity_end: event.end_date,
                        is_public: true,
                        created_by: _this3.users[0]._id
                      });
                    case 2:
                      coupon = _context1.v;
                      _this3.coupons.push(coupon);
                      console.log("  \u2713 Created coupon: ".concat(code));
                    case 3:
                      _i5++;
                      _context1.n = 1;
                      break;
                    case 4:
                      return _context1.a(2);
                  }
                }, _loop4);
              });
              eventIndex = 0;
            case 1:
              if (!(eventIndex < this.events.length)) {
                _context10.n = 3;
                break;
              }
              return _context10.d(_regeneratorValues(_loop4()), 2);
            case 2:
              eventIndex++;
              _context10.n = 1;
              break;
            case 3:
              return _context10.a(2);
          }
        }, _callee8, this);
      }));
      function seedCoupons() {
        return _seedCoupons.apply(this, arguments);
      }
      return seedCoupons;
    }()
  }, {
    key: "seedForms",
    value: function () {
      var _seedForms = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9() {
        var _this4 = this;
        var _iterator4, _step4, _loop5, _t6;
        return _regenerator().w(function (_context12) {
          while (1) switch (_context12.p = _context12.n) {
            case 0:
              console.log("\n📝 Seeding forms...");
              _iterator4 = _createForOfIteratorHelper(this.events);
              _context12.p = 1;
              _loop5 = /*#__PURE__*/_regenerator().m(function _loop5() {
                var event, eventCategories, nominationForm, registrationForm;
                return _regenerator().w(function (_context11) {
                  while (1) switch (_context11.n) {
                    case 0:
                      event = _step4.value;
                      eventCategories = _this4.categories.filter(function (c) {
                        return c.event.toString() === event._id.toString();
                      }); // Nomination form
                      _context11.n = 1;
                      return _formModel["default"].create({
                        name: "".concat(event.name, " - Nomination Form"),
                        description: "Submit your nomination for ".concat(event.name),
                        slug: generateSlug("".concat(event.name, "-nomination-form")),
                        form_type: _formConstants.FORM_TYPE.NOMINATION,
                        event: event._id,
                        categories: eventCategories.map(function (c) {
                          return c._id;
                        }),
                        fields: [{
                          field_id: "full_name",
                          label: "Full Name",
                          field_type: _formConstants.FIELD_TYPE.TEXT,
                          placeholder: "Enter nominee's full name",
                          validation: {
                            required: true,
                            min_length: 3,
                            max_length: 100
                          },
                          display_order: 0,
                          is_identifier_field: true
                        }, {
                          field_id: "email",
                          label: "Email Address",
                          field_type: _formConstants.FIELD_TYPE.EMAIL,
                          placeholder: "Enter email address",
                          validation: {
                            required: true
                          },
                          display_order: 1,
                          is_duplicate_check_field: true
                        }, {
                          field_id: "phone",
                          label: "Phone Number",
                          field_type: _formConstants.FIELD_TYPE.PHONE,
                          placeholder: "Enter phone number",
                          validation: {
                            required: true
                          },
                          display_order: 2
                        }, {
                          field_id: "category",
                          label: "Category",
                          field_type: _formConstants.FIELD_TYPE.SELECT,
                          options: eventCategories.map(function (c) {
                            return {
                              label: c.name,
                              value: c._id.toString()
                            };
                          }),
                          validation: {
                            required: true
                          },
                          display_order: 3
                        }, {
                          field_id: "reason",
                          label: "Why should this person be nominated?",
                          field_type: _formConstants.FIELD_TYPE.TEXTAREA,
                          placeholder: "Tell us why this nominee deserves recognition...",
                          validation: {
                            required: true,
                            min_length: 50,
                            max_length: 1000
                          },
                          display_order: 4
                        }, {
                          field_id: "supporting_docs",
                          label: "Supporting Documents (Optional)",
                          field_type: _formConstants.FIELD_TYPE.FILE,
                          help_text: "Upload any supporting documents (PDF, images)",
                          validation: {
                            required: false
                          },
                          display_order: 5
                        }],
                        status: _formConstants.FORM_STATUS.ACTIVE,
                        submission_start_date: new Date(),
                        submission_end_date: event.start_date,
                        created_by: _this4.users[0]._id
                      });
                    case 1:
                      nominationForm = _context11.v;
                      _this4.forms.push(nominationForm);
                      console.log("  \u2713 Created nomination form for ".concat(event.name));

                      // Registration form
                      _context11.n = 2;
                      return _formModel["default"].create({
                        name: "".concat(event.name, " - Event Registration"),
                        description: "Register to attend ".concat(event.name),
                        slug: generateSlug("".concat(event.name, "-registration-form")),
                        form_type: _formConstants.FORM_TYPE.REGISTRATION,
                        event: event._id,
                        fields: [{
                          field_id: "attendee_name",
                          label: "Full Name",
                          field_type: _formConstants.FIELD_TYPE.TEXT,
                          validation: {
                            required: true
                          },
                          display_order: 0
                        }, {
                          field_id: "attendee_email",
                          label: "Email",
                          field_type: _formConstants.FIELD_TYPE.EMAIL,
                          validation: {
                            required: true
                          },
                          display_order: 1,
                          is_duplicate_check_field: true
                        }, {
                          field_id: "attendee_phone",
                          label: "Phone",
                          field_type: _formConstants.FIELD_TYPE.PHONE,
                          validation: {
                            required: true
                          },
                          display_order: 2
                        }, {
                          field_id: "ticket_type",
                          label: "Ticket Type",
                          field_type: _formConstants.FIELD_TYPE.SELECT,
                          options: [{
                            label: "Regular",
                            value: "regular"
                          }, {
                            label: "VIP",
                            value: "vip"
                          }, {
                            label: "VVIP",
                            value: "vvip"
                          }],
                          validation: {
                            required: true
                          },
                          display_order: 3
                        }],
                        status: _formConstants.FORM_STATUS.ACTIVE,
                        submission_start_date: new Date(),
                        submission_end_date: event.start_date,
                        created_by: _this4.users[0]._id
                      });
                    case 2:
                      registrationForm = _context11.v;
                      _this4.forms.push(registrationForm);
                      console.log("  \u2713 Created registration form for ".concat(event.name));
                    case 3:
                      return _context11.a(2);
                  }
                }, _loop5);
              });
              _iterator4.s();
            case 2:
              if ((_step4 = _iterator4.n()).done) {
                _context12.n = 4;
                break;
              }
              return _context12.d(_regeneratorValues(_loop5()), 3);
            case 3:
              _context12.n = 2;
              break;
            case 4:
              _context12.n = 6;
              break;
            case 5:
              _context12.p = 5;
              _t6 = _context12.v;
              _iterator4.e(_t6);
            case 6:
              _context12.p = 6;
              _iterator4.f();
              return _context12.f(6);
            case 7:
              return _context12.a(2);
          }
        }, _callee9, this, [[1, 5, 6, 7]]);
      }));
      function seedForms() {
        return _seedForms.apply(this, arguments);
      }
      return seedForms;
    }()
  }, {
    key: "seedSlides",
    value: function () {
      var _seedSlides = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee0() {
        var slideTemplates, eventIndex, event, i, template, slide, globalSlide;
        return _regenerator().w(function (_context13) {
          while (1) switch (_context13.n) {
            case 0:
              console.log("\n🖼️ Seeding slides...");
              slideTemplates = [{
                title: "Vote for Your Favorites",
                subtitle: "Support your preferred candidates",
                description: "Make your voice heard. Cast your votes now and help your favorite nominees win!",
                slide_type: _slideConstants.SLIDE_TYPE.HERO,
                text_color: "#ffffff",
                overlay_opacity: 50,
                button: {
                  text: "Start Voting",
                  url: "/vote",
                  style: _slideConstants.BUTTON_STYLE.PRIMARY
                }
              }, {
                title: "Nominations Open",
                subtitle: "Know someone who deserves recognition?",
                description: "Submit your nominations before the deadline closes!",
                slide_type: _slideConstants.SLIDE_TYPE.ANNOUNCEMENT,
                text_color: "#ffffff",
                overlay_opacity: 40,
                button: {
                  text: "Nominate Now",
                  url: "/nominate",
                  style: _slideConstants.BUTTON_STYLE.SECONDARY
                }
              }, {
                title: "Special Vote Bundles",
                subtitle: "Save more when you buy bundles",
                description: "Get up to 25% discount on vote bundles. Limited time offer!",
                slide_type: _slideConstants.SLIDE_TYPE.PROMOTION,
                text_color: "#ffffff",
                overlay_opacity: 45,
                button: {
                  text: "View Bundles",
                  url: "/bundles",
                  style: _slideConstants.BUTTON_STYLE.PRIMARY
                }
              }];
              eventIndex = 0;
            case 1:
              if (!(eventIndex < this.events.length)) {
                _context13.n = 6;
                break;
              }
              event = this.events[eventIndex];
              i = 0;
            case 2:
              if (!(i < slideTemplates.length)) {
                _context13.n = 5;
                break;
              }
              template = slideTemplates[i];
              _context13.n = 3;
              return _slideModel["default"].create({
                title: "".concat(template.title, " - ").concat(event.name),
                subtitle: template.subtitle,
                description: template.description,
                slide_type: template.slide_type,
                status: _slideConstants.SLIDE_STATUS.ACTIVE,
                event: event._id,
                image: {
                  url: "https://picsum.photos/seed/".concat(event._id.toString().slice(-6), "-").concat(i, "/1920/1080"),
                  alt: template.title
                },
                text_color: template.text_color,
                overlay_opacity: template.overlay_opacity,
                button: template.button,
                display_order: i,
                is_published: true,
                schedule_start: new Date(),
                schedule_end: event.end_date,
                created_by: this.users[0]._id
              });
            case 3:
              slide = _context13.v;
              this.slides.push(slide);
              console.log("  \u2713 Created slide: ".concat(slide.title));
            case 4:
              i++;
              _context13.n = 2;
              break;
            case 5:
              eventIndex++;
              _context13.n = 1;
              break;
            case 6:
              _context13.n = 7;
              return _slideModel["default"].create({
                title: "Welcome to ITFY eVoting Platform",
                subtitle: "Ghana's Premier Online Voting Platform",
                description: "Secure, transparent, and easy-to-use voting for all your events.",
                slide_type: _slideConstants.SLIDE_TYPE.HERO,
                status: _slideConstants.SLIDE_STATUS.ACTIVE,
                image: {
                  url: "https://picsum.photos/seed/itfy-hero-main/1920/1080",
                  alt: "ITFY eVoting Platform"
                },
                text_color: "#ffffff",
                overlay_opacity: 50,
                button: {
                  text: "Explore Events",
                  url: "/events",
                  style: _slideConstants.BUTTON_STYLE.PRIMARY
                },
                display_order: 0,
                is_published: true,
                created_by: this.users[0]._id
              });
            case 7:
              globalSlide = _context13.v;
              this.slides.push(globalSlide);
              console.log("  \u2713 Created global hero slide");
            case 8:
              return _context13.a(2);
          }
        }, _callee0, this);
      }));
      function seedSlides() {
        return _seedSlides.apply(this, arguments);
      }
      return seedSlides;
    }()
  }, {
    key: "seedNotifications",
    value: function () {
      var _seedNotifications = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee1() {
        var notificationTemplates, _iterator5, _step5, user, _iterator6, _step6, template, _t7, _t8;
        return _regenerator().w(function (_context14) {
          while (1) switch (_context14.p = _context14.n) {
            case 0:
              console.log("\n🔔 Seeding sample notifications...");

              // Create some sample notifications for users
              notificationTemplates = [{
                type: _notificationConstants.NOTIFICATION_TYPE.SYSTEM_ANNOUNCEMENT,
                title: "Welcome to ITFY eVoting!",
                message: "Thank you for joining our platform. Start exploring events and cast your votes!",
                channel: _notificationConstants.NOTIFICATION_CHANNEL.IN_APP,
                priority: _notificationConstants.NOTIFICATION_PRIORITY.NORMAL,
                status: _notificationConstants.NOTIFICATION_STATUS.DELIVERED
              }, {
                type: _notificationConstants.NOTIFICATION_TYPE.VOTING_STARTED,
                title: "Voting is Now Open!",
                message: "Voting has started for Ghana Music Awards 2025. Cast your votes now!",
                channel: _notificationConstants.NOTIFICATION_CHANNEL.IN_APP,
                priority: _notificationConstants.NOTIFICATION_PRIORITY.HIGH,
                status: _notificationConstants.NOTIFICATION_STATUS.DELIVERED
              }, {
                type: _notificationConstants.NOTIFICATION_TYPE.BUNDLE_PROMOTION,
                title: "Special Offer: 25% Off Vote Bundles!",
                message: "Get 25% off on all Diamond Bundles. Limited time offer!",
                channel: _notificationConstants.NOTIFICATION_CHANNEL.IN_APP,
                priority: _notificationConstants.NOTIFICATION_PRIORITY.NORMAL,
                status: _notificationConstants.NOTIFICATION_STATUS.PENDING
              }];
              _iterator5 = _createForOfIteratorHelper(this.users);
              _context14.p = 1;
              _iterator5.s();
            case 2:
              if ((_step5 = _iterator5.n()).done) {
                _context14.n = 11;
                break;
              }
              user = _step5.value;
              _iterator6 = _createForOfIteratorHelper(notificationTemplates);
              _context14.p = 3;
              _iterator6.s();
            case 4:
              if ((_step6 = _iterator6.n()).done) {
                _context14.n = 6;
                break;
              }
              template = _step6.value;
              _context14.n = 5;
              return _notificationModel["default"].create({
                user: user._id,
                type: template.type,
                title: template.title,
                message: template.message,
                channel: template.channel,
                priority: template.priority,
                status: template.status,
                event: this.events[0]._id,
                read_at: template.status === _notificationConstants.NOTIFICATION_STATUS.DELIVERED ? new Date() : null
              });
            case 5:
              _context14.n = 4;
              break;
            case 6:
              _context14.n = 8;
              break;
            case 7:
              _context14.p = 7;
              _t7 = _context14.v;
              _iterator6.e(_t7);
            case 8:
              _context14.p = 8;
              _iterator6.f();
              return _context14.f(8);
            case 9:
              console.log("  \u2713 Created notifications for ".concat(user.email));
            case 10:
              _context14.n = 2;
              break;
            case 11:
              _context14.n = 13;
              break;
            case 12:
              _context14.p = 12;
              _t8 = _context14.v;
              _iterator5.e(_t8);
            case 13:
              _context14.p = 13;
              _iterator5.f();
              return _context14.f(13);
            case 14:
              return _context14.a(2);
          }
        }, _callee1, this, [[3, 7, 8, 9], [1, 12, 13, 14]]);
      }));
      function seedNotifications() {
        return _seedNotifications.apply(this, arguments);
      }
      return seedNotifications;
    }()
  }, {
    key: "seedActivities",
    value: function () {
      var _seedActivities = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee10() {
        var activityTypes, _iterator7, _step7, user, _iterator8, _step8, _this$candidates$, _this$categories$, activity, _t9, _t0;
        return _regenerator().w(function (_context15) {
          while (1) switch (_context15.p = _context15.n) {
            case 0:
              console.log("\n📊 Seeding activity logs...");
              activityTypes = [{
                action: _activityConstants.ACTION_TYPE.LOGIN,
                entity_type: _activityConstants.ENTITY_TYPE.USER,
                description: "User logged in",
                severity: _activityConstants.SEVERITY.INFO
              }, {
                action: _activityConstants.ACTION_TYPE.EVENT_CREATE,
                entity_type: _activityConstants.ENTITY_TYPE.EVENT,
                description: "Created event",
                severity: _activityConstants.SEVERITY.INFO
              }, {
                action: _activityConstants.ACTION_TYPE.CANDIDATE_APPROVE,
                entity_type: _activityConstants.ENTITY_TYPE.CANDIDATE,
                description: "Approved candidate",
                severity: _activityConstants.SEVERITY.INFO
              }, {
                action: _activityConstants.ACTION_TYPE.CATEGORY_CREATE,
                entity_type: _activityConstants.ENTITY_TYPE.CATEGORY,
                description: "Created category",
                severity: _activityConstants.SEVERITY.INFO
              }];
              _iterator7 = _createForOfIteratorHelper(this.users);
              _context15.p = 1;
              _iterator7.s();
            case 2:
              if ((_step7 = _iterator7.n()).done) {
                _context15.n = 11;
                break;
              }
              user = _step7.value;
              _iterator8 = _createForOfIteratorHelper(activityTypes);
              _context15.p = 3;
              _iterator8.s();
            case 4:
              if ((_step8 = _iterator8.n()).done) {
                _context15.n = 6;
                break;
              }
              activity = _step8.value;
              _context15.n = 5;
              return _activityModel["default"].create({
                user: user._id,
                action: activity.action,
                entity_type: activity.entity_type,
                description: activity.description,
                severity: activity.severity,
                ip_address: "127.0.0.1",
                user_agent: "Mozilla/5.0 (Seeder)",
                entity_id: activity.entity_type === _activityConstants.ENTITY_TYPE.EVENT ? this.events[0]._id : activity.entity_type === _activityConstants.ENTITY_TYPE.CANDIDATE ? (_this$candidates$ = this.candidates[0]) === null || _this$candidates$ === void 0 ? void 0 : _this$candidates$._id : activity.entity_type === _activityConstants.ENTITY_TYPE.CATEGORY ? (_this$categories$ = this.categories[0]) === null || _this$categories$ === void 0 ? void 0 : _this$categories$._id : user._id,
                event: activity.entity_type !== _activityConstants.ENTITY_TYPE.USER ? this.events[0]._id : null,
                metadata: {
                  seeded: true,
                  timestamp: new Date()
                }
              });
            case 5:
              _context15.n = 4;
              break;
            case 6:
              _context15.n = 8;
              break;
            case 7:
              _context15.p = 7;
              _t9 = _context15.v;
              _iterator8.e(_t9);
            case 8:
              _context15.p = 8;
              _iterator8.f();
              return _context15.f(8);
            case 9:
              console.log("  \u2713 Created activities for ".concat(user.email));
            case 10:
              _context15.n = 2;
              break;
            case 11:
              _context15.n = 13;
              break;
            case 12:
              _context15.p = 12;
              _t0 = _context15.v;
              _iterator7.e(_t0);
            case 13:
              _context15.p = 13;
              _iterator7.f();
              return _context15.f(13);
            case 14:
              return _context15.a(2);
          }
        }, _callee10, this, [[3, 7, 8, 9], [1, 12, 13, 14]]);
      }));
      function seedActivities() {
        return _seedActivities.apply(this, arguments);
      }
      return seedActivities;
    }()
  }, {
    key: "run",
    value: function () {
      var _run = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee11() {
        var _t1;
        return _regenerator().w(function (_context16) {
          while (1) switch (_context16.p = _context16.n) {
            case 0:
              _context16.p = 0;
              _context16.n = 1;
              return this.connect();
            case 1:
              _context16.n = 2;
              return this.clearCollections();
            case 2:
              _context16.n = 3;
              return this.seedUsers();
            case 3:
              _context16.n = 4;
              return this.seedEvents();
            case 4:
              _context16.n = 5;
              return this.seedCategories();
            case 5:
              _context16.n = 6;
              return this.seedCandidates();
            case 6:
              _context16.n = 7;
              return this.seedBundles();
            case 7:
              _context16.n = 8;
              return this.seedCoupons();
            case 8:
              _context16.n = 9;
              return this.seedForms();
            case 9:
              _context16.n = 10;
              return this.seedSlides();
            case 10:
              _context16.n = 11;
              return this.seedNotifications();
            case 11:
              _context16.n = 12;
              return this.seedActivities();
            case 12:
              console.log("\n" + "═".repeat(50));
              console.log("✅ Database seeding completed successfully!");
              console.log("═".repeat(50));
              console.log("\n📊 Summary:");
              console.log("  \u2022 Users: ".concat(this.users.length));
              console.log("  \u2022 Events: ".concat(this.events.length));
              console.log("  \u2022 Categories: ".concat(this.categories.length));
              console.log("  \u2022 Candidates: ".concat(this.candidates.length));
              console.log("  \u2022 Bundles: ".concat(this.bundles.length));
              console.log("  \u2022 Coupons: ".concat(this.coupons.length));
              console.log("  \u2022 Forms: ".concat(this.forms.length));
              console.log("  \u2022 Slides: ".concat(this.slides.length));
              console.log("\n🔐 Test Credentials:");
              console.log("  Super Admin: superadmin@itfy.com / Password123!");
              console.log("  Admin: admin@itfy.com / Password123!");
              console.log("  Organiser: organiser@itfy.com / Password123!");
              console.log("\n⚠️  Note: Vote and Payment collections were NOT seeded.");
              _context16.n = 14;
              break;
            case 13:
              _context16.p = 13;
              _t1 = _context16.v;
              console.error("\n❌ Seeding failed:", _t1);
              throw _t1;
            case 14:
              _context16.p = 14;
              _context16.n = 15;
              return _mongoose["default"].disconnect();
            case 15:
              console.log("\n🔌 Database disconnected");
              process.exit(0);
              return _context16.f(14);
            case 16:
              return _context16.a(2);
          }
        }, _callee11, this, [[0, 13, 14, 16]]);
      }));
      function run() {
        return _run.apply(this, arguments);
      }
      return run;
    }()
  }]);
}(); // Run seeder
var seeder = new DatabaseSeeder();
seeder.run();