"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _multer = _interopRequireDefault(require("multer"));
var _path = _interopRequireDefault(require("path"));
var _promises = _interopRequireDefault(require("fs/promises"));
var _sharp = _interopRequireDefault(require("sharp"));
var _uuid = require("uuid");
var _fileConstants = require("../utils/constants/file.constants.js");
var _errorConstants = require("../utils/constants/error.constants.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorValues(e) { if (null != e) { var t = e["function" == typeof Symbol && Symbol.iterator || "@@iterator"], r = 0; if (t) return t.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) return { next: function next() { return e && r >= e.length && (e = void 0), { value: e && e[r++], done: !e }; } }; } throw new TypeError(_typeof(e) + " is not iterable"); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } /* eslint-disable no-undef */ /**
 * File Upload Service
 * Handles file uploads for ITFY E-Voting platform using Multer with support for:
 * - Local storage (development)
 * - Cloud storage (production - S3/Cloudinary)
 * - Image optimization and validation
 * - File type and size restrictions
 * - Automatic cleanup of temporary files
 * 
 * @class FileService
 * @singleton
 */
var FileService = /*#__PURE__*/function () {
  function FileService() {
    _classCallCheck(this, FileService);
    this.uploadDir = process.env.UPLOAD_DIR || "uploads";
    this.maxFileSize = _fileConstants.MAX_FILE_SIZE_MB * 1024 * 1024; // Convert MB to bytes
    this.cloudProvider = _fileConstants.CLOUD_STORAGE.PROVIDER;
    this.isReady = false;

    // Initialize upload directories
    this.initializeDirectories();
  }

  /**
   * Initialize upload directories
   * Creates all necessary upload subdirectories
   * @private
   * @returns {Promise<void>}
   */
  return _createClass(FileService, [{
    key: "initializeDirectories",
    value: (function () {
      var _initializeDirectories = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
        var _this = this;
        var directories, _iterator, _step, dir, _t, _t2;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.p = _context.n) {
            case 0:
              directories = Object.values(_fileConstants.UPLOAD_DIRECTORIES).map(function (dir) {
                return _path["default"].join(_this.uploadDir, dir);
              });
              _context.p = 1;
              _iterator = _createForOfIteratorHelper(directories);
              _context.p = 2;
              _iterator.s();
            case 3:
              if ((_step = _iterator.n()).done) {
                _context.n = 5;
                break;
              }
              dir = _step.value;
              _context.n = 4;
              return _promises["default"].mkdir(dir, {
                recursive: true
              });
            case 4:
              _context.n = 3;
              break;
            case 5:
              _context.n = 7;
              break;
            case 6:
              _context.p = 6;
              _t = _context.v;
              _iterator.e(_t);
            case 7:
              _context.p = 7;
              _iterator.f();
              return _context.f(7);
            case 8:
              this.isReady = true;
              console.log("✅ Upload directories initialized");
              _context.n = 10;
              break;
            case 9:
              _context.p = 9;
              _t2 = _context.v;
              console.error("❌ Failed to create upload directories:", _t2);
              throw new Error("Failed to initialize file service");
            case 10:
              return _context.a(2);
          }
        }, _callee, this, [[2, 6, 7, 8], [1, 9]]);
      }));
      function initializeDirectories() {
        return _initializeDirectories.apply(this, arguments);
      }
      return initializeDirectories;
    }() // ========================================
    // MULTER STORAGE CONFIGURATION
    // ========================================
    /**
     * Configure Multer storage for local uploads
     * @param {string} subfolder - Subfolder within uploads directory
     * @returns {multer.StorageEngine}
     * @private
     */
    )
  }, {
    key: "createLocalStorage",
    value: function createLocalStorage() {
      var _this2 = this;
      var subfolder = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _fileConstants.UPLOAD_DIRECTORIES.TEMP;
      return _multer["default"].diskStorage({
        destination: function () {
          var _destination = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(req, file, cb) {
            var uploadPath, _t3;
            return _regenerator().w(function (_context2) {
              while (1) switch (_context2.p = _context2.n) {
                case 0:
                  uploadPath = _path["default"].join(_this2.uploadDir, subfolder);
                  _context2.p = 1;
                  _context2.n = 2;
                  return _promises["default"].mkdir(uploadPath, {
                    recursive: true
                  });
                case 2:
                  cb(null, uploadPath);
                  _context2.n = 4;
                  break;
                case 3:
                  _context2.p = 3;
                  _t3 = _context2.v;
                  console.error("Failed to create upload directory: ".concat(uploadPath), _t3);
                  cb(_t3, uploadPath);
                case 4:
                  return _context2.a(2);
              }
            }, _callee2, null, [[1, 3]]);
          }));
          function destination(_x, _x2, _x3) {
            return _destination.apply(this, arguments);
          }
          return destination;
        }(),
        filename: function filename(req, file, cb) {
          try {
            var _req$user, _req$user2;
            var userId = ((_req$user = req.user) === null || _req$user === void 0 ? void 0 : _req$user._id) || ((_req$user2 = req.user) === null || _req$user2 === void 0 ? void 0 : _req$user2.id) || "anonymous";
            var timestamp = Date.now();
            var uniqueId = (0, _uuid.v4)().split("-")[0];
            var ext = _path["default"].extname(file.originalname).toLowerCase();
            var nameWithoutExt = _path["default"].basename(file.originalname, ext).replace(/[^a-zA-Z0-9]/g, "_").substring(0, 30);
            var filename = "".concat(userId, "_").concat(timestamp, "_").concat(uniqueId, "_").concat(nameWithoutExt).concat(ext);
            cb(null, filename);
          } catch (error) {
            console.error("Failed to generate filename:", error);
            cb(error, null);
          }
        }
      });
    }

    // ========================================
    // FILE FILTERS
    // ========================================

    /**
     * File filter for images only
     * @param {Object} req - Express request
     * @param {Object} file - Multer file object
     * @param {Function} cb - Callback
     * @private
     */
  }, {
    key: "imageFilter",
    value: function imageFilter(req, file, cb) {
      if (_fileConstants.ALLOWED_FILE_TYPES.IMAGES.includes(file.mimetype)) {
        cb(null, true);
      } else {
        var allowedTypes = _fileConstants.ALLOWED_FILE_TYPES.IMAGES.join(", ");
        cb(new Error("Invalid image type. Allowed types: ".concat(allowedTypes)), false);
      }
    }

    /**
     * File filter for documents (PDFs, Word docs, Excel)
     * @param {Object} req - Express request
     * @param {Object} file - Multer file object
     * @param {Function} cb - Callback
     * @private
     */
  }, {
    key: "documentFilter",
    value: function documentFilter(req, file, cb) {
      if (_fileConstants.ALLOWED_FILE_TYPES.DOCUMENTS.includes(file.mimetype)) {
        cb(null, true);
      } else {
        cb(new Error("Invalid document type. Allowed: PDF, DOC, DOCX, XLS, XLSX"), false);
      }
    }

    /**
     * Generic file filter (images + documents)
     * @param {Object} req - Express request
     * @param {Object} file - Multer file object
     * @param {Function} cb - Callback
     * @private
     */
  }, {
    key: "genericFileFilter",
    value: function genericFileFilter(req, file, cb) {
      if (_fileConstants.ALLOWED_FILE_TYPES.ALL.includes(file.mimetype)) {
        cb(null, true);
      } else {
        cb(new Error(_errorConstants.ERROR_MESSAGES.INVALID_FILE_TYPE), false);
      }
    }

    // ========================================
    // MULTER UPLOAD CONFIGURATIONS
    // ========================================

    /**
     * Profile photo upload middleware (single image)
     * Usage: router.post('/upload-photo', fileService.uploadProfilePhoto, controller)
     * @returns {multer.Multer}
     */
  }, {
    key: "uploadProfilePhoto",
    get: function get() {
      return (0, _multer["default"])({
        storage: this.createLocalStorage(_fileConstants.UPLOAD_DIRECTORIES.PROFILES),
        fileFilter: this.imageFilter.bind(this),
        limits: {
          fileSize: _fileConstants.FILE_SIZE_LIMITS.PROFILE_PHOTO * 1024 * 1024,
          files: _fileConstants.FILE_VALIDATION.MAX_FILES.SINGLE
        }
      }).single("photo");
    }

    /**
     * Logo upload middleware (event/category logos)
     * @returns {multer.Multer}
     */
  }, {
    key: "uploadLogo",
    get: function get() {
      return (0, _multer["default"])({
        storage: this.createLocalStorage(_fileConstants.UPLOAD_DIRECTORIES.LOGOS),
        fileFilter: this.imageFilter.bind(this),
        limits: {
          fileSize: _fileConstants.FILE_SIZE_LIMITS.LOGO * 1024 * 1024,
          files: _fileConstants.FILE_VALIDATION.MAX_FILES.SINGLE
        }
      }).single("logo");
    }

    /**
     * Candidate photo upload middleware
     * @returns {multer.Multer}
     */
  }, {
    key: "uploadCandidatePhoto",
    get: function get() {
      return (0, _multer["default"])({
        storage: this.createLocalStorage(_fileConstants.UPLOAD_DIRECTORIES.CANDIDATES),
        fileFilter: this.imageFilter.bind(this),
        limits: {
          fileSize: _fileConstants.FILE_SIZE_LIMITS.CANDIDATE_PHOTO * 1024 * 1024,
          files: _fileConstants.FILE_VALIDATION.MAX_FILES.SINGLE
        }
      }).single("image");
    }

    /**
     * Slide image upload middleware
     * @returns {multer.Multer}
     */
  }, {
    key: "uploadSlideImage",
    get: function get() {
      return (0, _multer["default"])({
        storage: this.createLocalStorage(_fileConstants.UPLOAD_DIRECTORIES.SLIDES),
        fileFilter: this.imageFilter.bind(this),
        limits: {
          fileSize: _fileConstants.FILE_SIZE_LIMITS.SLIDE_IMAGE * 1024 * 1024,
          files: _fileConstants.FILE_VALIDATION.MAX_FILES.SINGLE
        }
      }).single("image");
    }

    /**
     * Document upload middleware (single file)
     * @returns {multer.Multer}
     */
  }, {
    key: "uploadDocument",
    get: function get() {
      return (0, _multer["default"])({
        storage: this.createLocalStorage(_fileConstants.UPLOAD_DIRECTORIES.DOCUMENTS),
        fileFilter: this.documentFilter.bind(this),
        limits: {
          fileSize: _fileConstants.FILE_SIZE_LIMITS.DOCUMENT * 1024 * 1024,
          files: _fileConstants.FILE_VALIDATION.MAX_FILES.SINGLE
        }
      }).single("document");
    }

    /**
     * Multiple documents upload middleware
     * @param {number} maxCount - Maximum number of files (default: 5)
     * @returns {multer.Multer}
     */
  }, {
    key: "uploadDocuments",
    value: function uploadDocuments() {
      var maxCount = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _fileConstants.FILE_VALIDATION.MAX_FILES.MULTIPLE;
      return (0, _multer["default"])({
        storage: this.createLocalStorage(_fileConstants.UPLOAD_DIRECTORIES.DOCUMENTS),
        fileFilter: this.documentFilter.bind(this),
        limits: {
          fileSize: _fileConstants.FILE_SIZE_LIMITS.DOCUMENT * 1024 * 1024,
          files: maxCount
        }
      }).array("documents", maxCount);
    }

    /**
     * Multiple images upload middleware (for gallery uploads)
     * @returns {multer.Multer}
     */
  }, {
    key: "uploadMultipleImages",
    get: function get() {
      return (0, _multer["default"])({
        storage: this.createLocalStorage(_fileConstants.UPLOAD_DIRECTORIES.CANDIDATES),
        fileFilter: this.imageFilter.bind(this),
        limits: {
          fileSize: _fileConstants.FILE_SIZE_LIMITS.CANDIDATE_PHOTO * 1024 * 1024,
          files: _fileConstants.FILE_VALIDATION.MAX_FILES.MULTIPLE
        }
      }).array("images", _fileConstants.FILE_VALIDATION.MAX_FILES.MULTIPLE);
    }

    /**
     * Generic single file upload
     * @param {string} fieldName - Form field name (default: 'file')
     * @param {string} subfolder - Upload subfolder (default: 'temp')
     * @returns {multer.Multer}
     */
  }, {
    key: "uploadFile",
    value: function uploadFile() {
      var fieldName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "file";
      var subfolder = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _fileConstants.UPLOAD_DIRECTORIES.TEMP;
      return (0, _multer["default"])({
        storage: this.createLocalStorage(subfolder),
        fileFilter: this.genericFileFilter.bind(this),
        limits: {
          fileSize: this.maxFileSize,
          files: _fileConstants.FILE_VALIDATION.MAX_FILES.SINGLE
        }
      }).single(fieldName);
    }

    // ========================================
    // IMAGE PROCESSING
    // ========================================

    /**
     * Optimize and resize image using Sharp
     * @param {string} filePath - Path to image file
     * @param {Object} options - Optimization options
     * @param {number} options.width - Target width
     * @param {number} options.height - Target height
     * @param {number} options.quality - Image quality (1-100)
     * @param {string} options.format - Output format ('jpeg', 'png', 'webp')
     * @param {string} options.fit - Resize fit ('cover', 'contain', 'fill', 'inside', 'outside')
     * @returns {Promise<string>} - Path to optimized image
     */
  }, {
    key: "optimizeImage",
    value: function () {
      var _optimizeImage = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(filePath) {
        var options,
          _options$width,
          width,
          _options$height,
          height,
          _options$quality,
          quality,
          _options$format,
          format,
          _options$fit,
          fit,
          ext,
          optimizedPath,
          sharpInstance,
          _args3 = arguments,
          _t4,
          _t5;
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.p = _context3.n) {
            case 0:
              options = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : {};
              _options$width = options.width, width = _options$width === void 0 ? 800 : _options$width, _options$height = options.height, height = _options$height === void 0 ? 800 : _options$height, _options$quality = options.quality, quality = _options$quality === void 0 ? 80 : _options$quality, _options$format = options.format, format = _options$format === void 0 ? "jpeg" : _options$format, _options$fit = options.fit, fit = _options$fit === void 0 ? "inside" : _options$fit;
              _context3.p = 1;
              ext = ".".concat(format);
              optimizedPath = filePath.replace(_path["default"].extname(filePath), "_optimized".concat(ext));
              sharpInstance = (0, _sharp["default"])(filePath).resize(width, height, {
                fit: fit,
                withoutEnlargement: true
              }); // Apply format-specific processing
              _t4 = format;
              _context3.n = _t4 === "jpeg" ? 2 : _t4 === "png" ? 4 : _t4 === "webp" ? 6 : 8;
              break;
            case 2:
              _context3.n = 3;
              return sharpInstance.jpeg({
                quality: quality
              }).toFile(optimizedPath);
            case 3:
              return _context3.a(3, 9);
            case 4:
              _context3.n = 5;
              return sharpInstance.png({
                quality: quality
              }).toFile(optimizedPath);
            case 5:
              return _context3.a(3, 9);
            case 6:
              _context3.n = 7;
              return sharpInstance.webp({
                quality: quality
              }).toFile(optimizedPath);
            case 7:
              return _context3.a(3, 9);
            case 8:
              _context3.n = 9;
              return sharpInstance.toFile(optimizedPath);
            case 9:
              _context3.n = 10;
              return this.deleteFile(filePath);
            case 10:
              console.log("\u2705 Image optimized: ".concat(_path["default"].basename(optimizedPath)));
              return _context3.a(2, optimizedPath);
            case 11:
              _context3.p = 11;
              _t5 = _context3.v;
              console.error("Image optimization failed:", _t5);
              throw new Error("".concat(_fileConstants.FILE_ERROR_CODES.OPTIMIZATION_FAILED, ": ").concat(_t5.message));
            case 12:
              return _context3.a(2);
          }
        }, _callee3, this, [[1, 11]]);
      }));
      function optimizeImage(_x4) {
        return _optimizeImage.apply(this, arguments);
      }
      return optimizeImage;
    }()
    /**
     * Optimize image with preset configurations
     * @param {string} filePath - Path to image file
     * @param {string} preset - Preset name ('PROFILE', 'LOGO', 'CANDIDATE', 'SLIDE', 'THUMBNAIL')
     * @returns {Promise<string>} - Path to optimized image
     */
  }, {
    key: "optimizeWithPreset",
    value: (function () {
      var _optimizeWithPreset = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(filePath) {
        var preset,
          presetConfig,
          _args4 = arguments;
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.n) {
            case 0:
              preset = _args4.length > 1 && _args4[1] !== undefined ? _args4[1] : "PROFILE";
              presetConfig = _fileConstants.IMAGE_OPTIMIZATION[preset];
              if (presetConfig) {
                _context4.n = 1;
                break;
              }
              throw new Error("Invalid optimization preset: ".concat(preset));
            case 1:
              return _context4.a(2, this.optimizeImage(filePath, presetConfig));
          }
        }, _callee4, this);
      }));
      function optimizeWithPreset(_x5) {
        return _optimizeWithPreset.apply(this, arguments);
      }
      return optimizeWithPreset;
    }()
    /**
     * Create thumbnail from image
     * @param {string} filePath - Path to image file
     * @param {number} size - Thumbnail size (width/height)
     * @returns {Promise<string>} - Path to thumbnail
     */
    )
  }, {
    key: "createThumbnail",
    value: (function () {
      var _createThumbnail = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(filePath) {
        var size,
          ext,
          thumbnailPath,
          _args5 = arguments,
          _t6;
        return _regenerator().w(function (_context5) {
          while (1) switch (_context5.p = _context5.n) {
            case 0:
              size = _args5.length > 1 && _args5[1] !== undefined ? _args5[1] : 150;
              _context5.p = 1;
              ext = _path["default"].extname(filePath);
              thumbnailPath = filePath.replace(ext, "_thumb".concat(ext));
              _context5.n = 2;
              return (0, _sharp["default"])(filePath).resize(size, size, {
                fit: "cover"
              }).jpeg({
                quality: _fileConstants.IMAGE_OPTIMIZATION.THUMBNAIL.quality
              }).toFile(thumbnailPath);
            case 2:
              console.log("\u2705 Thumbnail created: ".concat(_path["default"].basename(thumbnailPath)));
              return _context5.a(2, thumbnailPath);
            case 3:
              _context5.p = 3;
              _t6 = _context5.v;
              console.error("Thumbnail creation failed:", _t6);
              throw new Error("Failed to create thumbnail: ".concat(_t6.message));
            case 4:
              return _context5.a(2);
          }
        }, _callee5, null, [[1, 3]]);
      }));
      function createThumbnail(_x6) {
        return _createThumbnail.apply(this, arguments);
      }
      return createThumbnail;
    }()
    /**
     * Get image dimensions and metadata
     * @param {string} filePath - Path to image file
     * @returns {Promise<Object>} - Image metadata
     */
    )
  }, {
    key: "getImageMetadata",
    value: (function () {
      var _getImageMetadata = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(filePath) {
        var metadata, _t7;
        return _regenerator().w(function (_context6) {
          while (1) switch (_context6.p = _context6.n) {
            case 0:
              _context6.p = 0;
              _context6.n = 1;
              return (0, _sharp["default"])(filePath).metadata();
            case 1:
              metadata = _context6.v;
              return _context6.a(2, {
                width: metadata.width,
                height: metadata.height,
                format: metadata.format,
                size: metadata.size,
                hasAlpha: metadata.hasAlpha,
                orientation: metadata.orientation
              });
            case 2:
              _context6.p = 2;
              _t7 = _context6.v;
              console.error("Failed to read image metadata:", _t7);
              throw new Error("Failed to read image metadata: ".concat(_t7.message));
            case 3:
              return _context6.a(2);
          }
        }, _callee6, null, [[0, 2]]);
      }));
      function getImageMetadata(_x7) {
        return _getImageMetadata.apply(this, arguments);
      }
      return getImageMetadata;
    }()
    /**
     * Validate image dimensions
     * @param {string} filePath - Path to image file
     * @param {string} validationType - Validation type ('PROFILE', 'LOGO', 'CANDIDATE', 'SLIDE')
     * @returns {Promise<boolean>}
     */
    )
  }, {
    key: "validateImageDimensions",
    value: (function () {
      var _validateImageDimensions = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7(filePath) {
        var validationType,
          metadata,
          rules,
          isValid,
          _args7 = arguments,
          _t8;
        return _regenerator().w(function (_context7) {
          while (1) switch (_context7.p = _context7.n) {
            case 0:
              validationType = _args7.length > 1 && _args7[1] !== undefined ? _args7[1] : "PROFILE";
              _context7.p = 1;
              _context7.n = 2;
              return this.getImageMetadata(filePath);
            case 2:
              metadata = _context7.v;
              rules = _fileConstants.FILE_VALIDATION.MIN_IMAGE_DIMENSIONS[validationType];
              if (rules) {
                _context7.n = 3;
                break;
              }
              throw new Error("Invalid validation type: ".concat(validationType));
            case 3:
              isValid = metadata.width >= rules.width && metadata.height >= rules.height;
              if (isValid) {
                _context7.n = 4;
                break;
              }
              throw new Error("Image dimensions too small. Minimum: ".concat(rules.width, "x").concat(rules.height, "px, ") + "got: ".concat(metadata.width, "x").concat(metadata.height, "px"));
            case 4:
              return _context7.a(2, true);
            case 5:
              _context7.p = 5;
              _t8 = _context7.v;
              console.error("Image dimension validation failed:", _t8);
              throw _t8;
            case 6:
              return _context7.a(2);
          }
        }, _callee7, this, [[1, 5]]);
      }));
      function validateImageDimensions(_x8) {
        return _validateImageDimensions.apply(this, arguments);
      }
      return validateImageDimensions;
    }() // ========================================
    // FILE OPERATIONS
    // ========================================
    /**
     * Delete file from local storage
     * @param {string} filePath - Path to file (relative or absolute)
     * @returns {Promise<boolean>}
     */
    )
  }, {
    key: "deleteFile",
    value: function () {
      var _deleteFile = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8(filePath) {
        var absolutePath, exists, _t9;
        return _regenerator().w(function (_context8) {
          while (1) switch (_context8.p = _context8.n) {
            case 0:
              if (filePath) {
                _context8.n = 1;
                break;
              }
              console.warn("deleteFile called with empty path");
              return _context8.a(2, false);
            case 1:
              _context8.p = 1;
              // Handle both absolute and relative paths
              absolutePath = _path["default"].isAbsolute(filePath) ? filePath : _path["default"].join(process.cwd(), filePath.replace(/^\//, "")); // Check if file exists before attempting deletion
              _context8.n = 2;
              return this.fileExists(absolutePath);
            case 2:
              exists = _context8.v;
              if (exists) {
                _context8.n = 3;
                break;
              }
              console.warn("File does not exist: ".concat(filePath));
              return _context8.a(2, false);
            case 3:
              _context8.n = 4;
              return _promises["default"].unlink(absolutePath);
            case 4:
              console.log("\uD83D\uDDD1\uFE0F  File deleted: ".concat(filePath));
              return _context8.a(2, true);
            case 5:
              _context8.p = 5;
              _t9 = _context8.v;
              console.error("Failed to delete file ".concat(filePath, ":"), _t9.message);
              throw new Error("".concat(_fileConstants.FILE_ERROR_CODES.DELETE_FAILED, ": ").concat(_t9.message));
            case 6:
              return _context8.a(2);
          }
        }, _callee8, this, [[1, 5]]);
      }));
      function deleteFile(_x9) {
        return _deleteFile.apply(this, arguments);
      }
      return deleteFile;
    }()
    /**
     * Delete multiple files
     * @param {string[]} filePaths - Array of file paths
     * @returns {Promise<{success: number, failed: number}>}
     */
  }, {
    key: "deleteFiles",
    value: (function () {
      var _deleteFiles = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9(filePaths) {
        var successCount, failedCount, _iterator2, _step2, filePath, deleted, _t0, _t1;
        return _regenerator().w(function (_context9) {
          while (1) switch (_context9.p = _context9.n) {
            case 0:
              if (!(!Array.isArray(filePaths) || filePaths.length === 0)) {
                _context9.n = 1;
                break;
              }
              return _context9.a(2, {
                success: 0,
                failed: 0
              });
            case 1:
              successCount = 0;
              failedCount = 0;
              _iterator2 = _createForOfIteratorHelper(filePaths);
              _context9.p = 2;
              _iterator2.s();
            case 3:
              if ((_step2 = _iterator2.n()).done) {
                _context9.n = 8;
                break;
              }
              filePath = _step2.value;
              _context9.p = 4;
              _context9.n = 5;
              return this.deleteFile(filePath);
            case 5:
              deleted = _context9.v;
              if (deleted) successCount++;else failedCount++;
              _context9.n = 7;
              break;
            case 6:
              _context9.p = 6;
              _t0 = _context9.v;
              console.error("Failed to delete ".concat(filePath, ":"), _t0.message);
              failedCount++;
            case 7:
              _context9.n = 3;
              break;
            case 8:
              _context9.n = 10;
              break;
            case 9:
              _context9.p = 9;
              _t1 = _context9.v;
              _iterator2.e(_t1);
            case 10:
              _context9.p = 10;
              _iterator2.f();
              return _context9.f(10);
            case 11:
              return _context9.a(2, {
                success: successCount,
                failed: failedCount
              });
          }
        }, _callee9, this, [[4, 6], [2, 9, 10, 11]]);
      }));
      function deleteFiles(_x0) {
        return _deleteFiles.apply(this, arguments);
      }
      return deleteFiles;
    }()
    /**
     * Move file to different directory
     * @param {string} sourcePath - Current file path
     * @param {string} destinationPath - New file path
     * @returns {Promise<string>} - New file path
     */
    )
  }, {
    key: "moveFile",
    value: (function () {
      var _moveFile = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee0(sourcePath, destinationPath) {
        var destDir, _t10;
        return _regenerator().w(function (_context0) {
          while (1) switch (_context0.p = _context0.n) {
            case 0:
              _context0.p = 0;
              // Ensure destination directory exists
              destDir = _path["default"].dirname(destinationPath);
              _context0.n = 1;
              return _promises["default"].mkdir(destDir, {
                recursive: true
              });
            case 1:
              _context0.n = 2;
              return _promises["default"].rename(sourcePath, destinationPath);
            case 2:
              console.log("\uD83D\uDCE6 File moved: ".concat(sourcePath, " \u2192 ").concat(destinationPath));
              return _context0.a(2, destinationPath);
            case 3:
              _context0.p = 3;
              _t10 = _context0.v;
              console.error("File move failed:", _t10);
              throw new Error("Failed to move file: ".concat(_t10.message));
            case 4:
              return _context0.a(2);
          }
        }, _callee0, null, [[0, 3]]);
      }));
      function moveFile(_x1, _x10) {
        return _moveFile.apply(this, arguments);
      }
      return moveFile;
    }()
    /**
     * Copy file to different location
     * @param {string} sourcePath - Source file path
     * @param {string} destinationPath - Destination file path
     * @returns {Promise<string>} - Destination file path
     */
    )
  }, {
    key: "copyFile",
    value: (function () {
      var _copyFile = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee1(sourcePath, destinationPath) {
        var destDir, _t11;
        return _regenerator().w(function (_context1) {
          while (1) switch (_context1.p = _context1.n) {
            case 0:
              _context1.p = 0;
              // Ensure destination directory exists
              destDir = _path["default"].dirname(destinationPath);
              _context1.n = 1;
              return _promises["default"].mkdir(destDir, {
                recursive: true
              });
            case 1:
              _context1.n = 2;
              return _promises["default"].copyFile(sourcePath, destinationPath);
            case 2:
              console.log("\uD83D\uDCCB File copied: ".concat(sourcePath, " \u2192 ").concat(destinationPath));
              return _context1.a(2, destinationPath);
            case 3:
              _context1.p = 3;
              _t11 = _context1.v;
              console.error("File copy failed:", _t11);
              throw new Error("Failed to copy file: ".concat(_t11.message));
            case 4:
              return _context1.a(2);
          }
        }, _callee1, null, [[0, 3]]);
      }));
      function copyFile(_x11, _x12) {
        return _copyFile.apply(this, arguments);
      }
      return copyFile;
    }()
    /**
     * Get file metadata and stats
     * @param {string} filePath - Path to file
     * @returns {Promise<Object|null>}
     */
    )
  }, {
    key: "getFileMetadata",
    value: (function () {
      var _getFileMetadata = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee10(filePath) {
        var stats, ext, _t12;
        return _regenerator().w(function (_context10) {
          while (1) switch (_context10.p = _context10.n) {
            case 0:
              _context10.p = 0;
              _context10.n = 1;
              return _promises["default"].stat(filePath);
            case 1:
              stats = _context10.v;
              ext = _path["default"].extname(filePath).toLowerCase();
              return _context10.a(2, {
                filename: _path["default"].basename(filePath),
                path: filePath,
                size: stats.size,
                sizeInMB: (stats.size / (1024 * 1024)).toFixed(2),
                sizeInKB: (stats.size / 1024).toFixed(2),
                extension: ext,
                mimeType: this.getMimeType(ext),
                created_at: stats.birthtime,
                updated_at: stats.mtime,
                isFile: stats.isFile(),
                isDirectory: stats.isDirectory()
              });
            case 2:
              _context10.p = 2;
              _t12 = _context10.v;
              console.error("Failed to get file metadata:", _t12);
              return _context10.a(2, null);
          }
        }, _callee10, this, [[0, 2]]);
      }));
      function getFileMetadata(_x13) {
        return _getFileMetadata.apply(this, arguments);
      }
      return getFileMetadata;
    }()
    /**
     * Check if file exists
     * @param {string} filePath - Path to file
     * @returns {Promise<boolean>}
     */
    )
  }, {
    key: "fileExists",
    value: (function () {
      var _fileExists = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee11(filePath) {
        var _t13;
        return _regenerator().w(function (_context11) {
          while (1) switch (_context11.p = _context11.n) {
            case 0:
              _context11.p = 0;
              _context11.n = 1;
              return _promises["default"].access(filePath);
            case 1:
              return _context11.a(2, true);
            case 2:
              _context11.p = 2;
              _t13 = _context11.v;
              return _context11.a(2, false);
          }
        }, _callee11, null, [[0, 2]]);
      }));
      function fileExists(_x14) {
        return _fileExists.apply(this, arguments);
      }
      return fileExists;
    }()
    /**
     * Get MIME type from file extension
     * @param {string} ext - File extension (with or without dot)
     * @returns {string}
     * @private
     */
    )
  }, {
    key: "getMimeType",
    value: function getMimeType(ext) {
      var extension = ext.startsWith(".") ? ext : ".".concat(ext);
      var mimeTypes = {
        ".jpg": "image/jpeg",
        ".jpeg": "image/jpeg",
        ".png": "image/png",
        ".gif": "image/gif",
        ".webp": "image/webp",
        ".pdf": "application/pdf",
        ".doc": "application/msword",
        ".docx": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        ".xls": "application/vnd.ms-excel",
        ".xlsx": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      };
      return mimeTypes[extension.toLowerCase()] || "application/octet-stream";
    }

    // ========================================
    // CLOUD STORAGE (Placeholder for S3/Cloudinary)
    // ========================================

    /**
     * Upload file to cloud storage (S3, Cloudinary, etc.)
     * @param {Object} file - Multer file object
     * @param {string} folder - Cloud storage folder
     * @returns {Promise<Object>} - { url, publicId, cloudProvider }
     * 
     * TODO: Implement based on CLOUD_STORAGE.PROVIDER
     * For AWS S3: Use @aws-sdk/client-s3
     * For Cloudinary: Use cloudinary package
     */
  }, {
    key: "uploadToCloud",
    value: function () {
      var _uploadToCloud = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee12(file) {
        var folder,
          _args12 = arguments;
        return _regenerator().w(function (_context12) {
          while (1) switch (_context12.n) {
            case 0:
              folder = _args12.length > 1 && _args12[1] !== undefined ? _args12[1] : "uploads";
              if (!(this.cloudProvider === "local")) {
                _context12.n = 1;
                break;
              }
              return _context12.a(2, {
                url: "/".concat(this.uploadDir, "/").concat(folder, "/").concat(file.filename),
                publicId: file.filename,
                cloudProvider: "local"
              });
            case 1:
              if (!(this.cloudProvider === "s3")) {
                _context12.n = 2;
                break;
              }
              throw new Error("S3 upload not implemented yet");
            case 2:
              if (!(this.cloudProvider === "cloudinary")) {
                _context12.n = 3;
                break;
              }
              throw new Error("Cloudinary upload not implemented yet");
            case 3:
              throw new Error("Unknown cloud provider: ".concat(this.cloudProvider));
            case 4:
              return _context12.a(2);
          }
        }, _callee12, this);
      }));
      function uploadToCloud(_x15) {
        return _uploadToCloud.apply(this, arguments);
      }
      return uploadToCloud;
    }()
    /**
     * Delete file from cloud storage
     * @param {string} publicId - Cloud storage file identifier
     * @returns {Promise<boolean>}
     */
  }, {
    key: "deleteFromCloud",
    value: (function () {
      var _deleteFromCloud = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee13(publicId) {
        return _regenerator().w(function (_context13) {
          while (1) switch (_context13.n) {
            case 0:
              if (!(this.cloudProvider === "local")) {
                _context13.n = 1;
                break;
              }
              return _context13.a(2, this.deleteFile(publicId));
            case 1:
              if (!(this.cloudProvider === "s3")) {
                _context13.n = 2;
                break;
              }
              // Example S3 deletion:
              // const command = new DeleteObjectCommand({
              //   Bucket: CLOUD_STORAGE.S3.BUCKET,
              //   Key: publicId,
              // });
              // await s3Client.send(command);
              console.warn("S3 deletion not implemented for:", publicId);
              throw new Error("S3 deletion not implemented yet");
            case 2:
              if (!(this.cloudProvider === "cloudinary")) {
                _context13.n = 3;
                break;
              }
              // Example Cloudinary deletion:
              // await cloudinary.uploader.destroy(publicId);
              console.warn("Cloudinary deletion not implemented for:", publicId);
              throw new Error("Cloudinary deletion not implemented yet");
            case 3:
              return _context13.a(2, false);
          }
        }, _callee13, this);
      }));
      function deleteFromCloud(_x16) {
        return _deleteFromCloud.apply(this, arguments);
      }
      return deleteFromCloud;
    }() // ========================================
    // ERROR HANDLING MIDDLEWARE
    // ========================================
    /**
     * Multer error handler middleware
     * Use after multer middleware: app.use(fileService.handleUploadError)
     * 
     * @param {Error} err - Error object
     * @param {Object} req - Express request
     * @param {Object} res - Express response
     * @param {Function} next - Next middleware
     */
    )
  }, {
    key: "handleUploadError",
    value: function handleUploadError(err, req, res, next) {
      if (err instanceof _multer["default"].MulterError) {
        // Multer-specific errors
        if (err.code === "LIMIT_FILE_SIZE") {
          return res.status(400).json({
            success: false,
            error: _fileConstants.FILE_ERROR_CODES.FILE_TOO_LARGE,
            message: "File size must not exceed ".concat(_fileConstants.MAX_FILE_SIZE_MB, "MB")
          });
        }
        if (err.code === "LIMIT_FILE_COUNT") {
          return res.status(400).json({
            success: false,
            error: _fileConstants.FILE_ERROR_CODES.TOO_MANY_FILES,
            message: err.message
          });
        }
        if (err.code === "LIMIT_UNEXPECTED_FILE") {
          return res.status(400).json({
            success: false,
            error: _fileConstants.FILE_ERROR_CODES.INVALID_FILE_TYPE,
            message: "Unexpected file field in request"
          });
        }
        return res.status(400).json({
          success: false,
          error: _fileConstants.FILE_ERROR_CODES.UPLOAD_FAILED,
          message: err.message
        });
      }

      // Custom file validation errors
      if (err) {
        return res.status(400).json({
          success: false,
          error: _fileConstants.FILE_ERROR_CODES.UPLOAD_FAILED,
          message: err.message || _errorConstants.ERROR_MESSAGES.FILE_UPLOAD_FAILED
        });
      }
      next();
    }

    // ========================================
    // CLEANUP UTILITIES
    // ========================================

    /**
     * Clean up old temporary files
     * @param {number} olderThanDays - Delete files older than N days
     * @returns {Promise<number>} - Number of files deleted
     */
  }, {
    key: "cleanupTempFiles",
    value: function () {
      var _cleanupTempFiles = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee14() {
        var olderThanDays,
          tempDir,
          files,
          cutoffDate,
          deletedCount,
          _iterator3,
          _step3,
          file,
          filePath,
          stats,
          _args14 = arguments,
          _t14,
          _t15;
        return _regenerator().w(function (_context14) {
          while (1) switch (_context14.p = _context14.n) {
            case 0:
              olderThanDays = _args14.length > 0 && _args14[0] !== undefined ? _args14[0] : _fileConstants.CLEANUP_SETTINGS.TEMP_FILES_RETENTION_DAYS;
              _context14.p = 1;
              tempDir = _path["default"].join(this.uploadDir, _fileConstants.UPLOAD_DIRECTORIES.TEMP);
              _context14.n = 2;
              return _promises["default"].readdir(tempDir);
            case 2:
              files = _context14.v;
              cutoffDate = Date.now() - olderThanDays * 24 * 60 * 60 * 1000;
              deletedCount = 0;
              _iterator3 = _createForOfIteratorHelper(files);
              _context14.p = 3;
              _iterator3.s();
            case 4:
              if ((_step3 = _iterator3.n()).done) {
                _context14.n = 8;
                break;
              }
              file = _step3.value;
              filePath = _path["default"].join(tempDir, file);
              _context14.n = 5;
              return _promises["default"].stat(filePath);
            case 5:
              stats = _context14.v;
              if (!(stats.mtimeMs < cutoffDate)) {
                _context14.n = 7;
                break;
              }
              _context14.n = 6;
              return _promises["default"].unlink(filePath);
            case 6:
              deletedCount++;
            case 7:
              _context14.n = 4;
              break;
            case 8:
              _context14.n = 10;
              break;
            case 9:
              _context14.p = 9;
              _t14 = _context14.v;
              _iterator3.e(_t14);
            case 10:
              _context14.p = 10;
              _iterator3.f();
              return _context14.f(10);
            case 11:
              console.log("\uD83E\uDDF9 Cleaned up ".concat(deletedCount, " temporary files (older than ").concat(olderThanDays, " days)"));
              return _context14.a(2, deletedCount);
            case 12:
              _context14.p = 12;
              _t15 = _context14.v;
              console.error("Cleanup failed:", _t15);
              return _context14.a(2, 0);
          }
        }, _callee14, this, [[3, 9, 10, 11], [1, 12]]);
      }));
      function cleanupTempFiles() {
        return _cleanupTempFiles.apply(this, arguments);
      }
      return cleanupTempFiles;
    }()
    /**
     * Clean up orphaned files (files not referenced in database)
     * @param {Array<string>} referencedFiles - List of files currently referenced in DB
     * @param {string} directory - Directory to clean (default: all upload directories)
     * @returns {Promise<number>} - Number of orphaned files deleted
     */
  }, {
    key: "cleanupOrphanedFiles",
    value: (function () {
      var _cleanupOrphanedFiles = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee15() {
        var _this3 = this;
        var referencedFiles,
          directory,
          directories,
          deletedCount,
          _iterator4,
          _step4,
          dir,
          dirPath,
          files,
          _iterator5,
          _step5,
          _loop,
          _args16 = arguments,
          _t16,
          _t17,
          _t18;
        return _regenerator().w(function (_context16) {
          while (1) switch (_context16.p = _context16.n) {
            case 0:
              referencedFiles = _args16.length > 0 && _args16[0] !== undefined ? _args16[0] : [];
              directory = _args16.length > 1 && _args16[1] !== undefined ? _args16[1] : null;
              _context16.p = 1;
              directories = directory ? [directory] : Object.values(_fileConstants.UPLOAD_DIRECTORIES).filter(function (d) {
                return d !== _fileConstants.UPLOAD_DIRECTORIES.TEMP;
              });
              deletedCount = 0;
              _iterator4 = _createForOfIteratorHelper(directories);
              _context16.p = 2;
              _iterator4.s();
            case 3:
              if ((_step4 = _iterator4.n()).done) {
                _context16.n = 12;
                break;
              }
              dir = _step4.value;
              dirPath = _path["default"].join(this.uploadDir, dir);
              _context16.n = 4;
              return _promises["default"].readdir(dirPath);
            case 4:
              files = _context16.v;
              _iterator5 = _createForOfIteratorHelper(files);
              _context16.p = 5;
              _loop = /*#__PURE__*/_regenerator().m(function _loop() {
                var file, filePath, relativeFilePath, isReferenced, stats, fileAge, retentionPeriod;
                return _regenerator().w(function (_context15) {
                  while (1) switch (_context15.n) {
                    case 0:
                      file = _step5.value;
                      filePath = _path["default"].join(dirPath, file);
                      relativeFilePath = "/".concat(_this3.uploadDir, "/").concat(dir, "/").concat(file); // Check if file is referenced in database
                      isReferenced = referencedFiles.some(function (ref) {
                        return ref.includes(file) || ref.includes(relativeFilePath);
                      });
                      if (isReferenced) {
                        _context15.n = 3;
                        break;
                      }
                      _context15.n = 1;
                      return _promises["default"].stat(filePath);
                    case 1:
                      stats = _context15.v;
                      fileAge = Date.now() - stats.mtimeMs;
                      retentionPeriod = _fileConstants.CLEANUP_SETTINGS.ORPHANED_FILES_RETENTION_DAYS * 24 * 60 * 60 * 1000;
                      if (!(fileAge > retentionPeriod)) {
                        _context15.n = 3;
                        break;
                      }
                      _context15.n = 2;
                      return _promises["default"].unlink(filePath);
                    case 2:
                      deletedCount++;
                      console.log("\uD83D\uDDD1\uFE0F  Deleted orphaned file: ".concat(relativeFilePath));
                    case 3:
                      return _context15.a(2);
                  }
                }, _loop);
              });
              _iterator5.s();
            case 6:
              if ((_step5 = _iterator5.n()).done) {
                _context16.n = 8;
                break;
              }
              return _context16.d(_regeneratorValues(_loop()), 7);
            case 7:
              _context16.n = 6;
              break;
            case 8:
              _context16.n = 10;
              break;
            case 9:
              _context16.p = 9;
              _t16 = _context16.v;
              _iterator5.e(_t16);
            case 10:
              _context16.p = 10;
              _iterator5.f();
              return _context16.f(10);
            case 11:
              _context16.n = 3;
              break;
            case 12:
              _context16.n = 14;
              break;
            case 13:
              _context16.p = 13;
              _t17 = _context16.v;
              _iterator4.e(_t17);
            case 14:
              _context16.p = 14;
              _iterator4.f();
              return _context16.f(14);
            case 15:
              console.log("\uD83E\uDDF9 Cleaned up ".concat(deletedCount, " orphaned files"));
              return _context16.a(2, deletedCount);
            case 16:
              _context16.p = 16;
              _t18 = _context16.v;
              console.error("Orphaned files cleanup failed:", _t18);
              return _context16.a(2, 0);
          }
        }, _callee15, this, [[5, 9, 10, 11], [2, 13, 14, 15], [1, 16]]);
      }));
      function cleanupOrphanedFiles() {
        return _cleanupOrphanedFiles.apply(this, arguments);
      }
      return cleanupOrphanedFiles;
    }()
    /**
     * Get storage usage statistics
     * @returns {Promise<Object>}
     */
    )
  }, {
    key: "getStorageStats",
    value: (function () {
      var _getStorageStats = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee16() {
        var directories, stats, totalSize, totalFiles, _i, _directories, dir, dirPath, files, dirSize, _iterator6, _step6, file, filePath, stat, _t19, _t20, _t21;
        return _regenerator().w(function (_context17) {
          while (1) switch (_context17.p = _context17.n) {
            case 0:
              _context17.p = 0;
              directories = Object.values(_fileConstants.UPLOAD_DIRECTORIES);
              stats = {};
              totalSize = 0;
              totalFiles = 0;
              _i = 0, _directories = directories;
            case 1:
              if (!(_i < _directories.length)) {
                _context17.n = 14;
                break;
              }
              dir = _directories[_i];
              dirPath = _path["default"].join(this.uploadDir, dir);
              _context17.p = 2;
              _context17.n = 3;
              return _promises["default"].readdir(dirPath);
            case 3:
              files = _context17.v;
              dirSize = 0;
              _iterator6 = _createForOfIteratorHelper(files);
              _context17.p = 4;
              _iterator6.s();
            case 5:
              if ((_step6 = _iterator6.n()).done) {
                _context17.n = 8;
                break;
              }
              file = _step6.value;
              filePath = _path["default"].join(dirPath, file);
              _context17.n = 6;
              return _promises["default"].stat(filePath);
            case 6:
              stat = _context17.v;
              if (stat.isFile()) {
                dirSize += stat.size;
              }
            case 7:
              _context17.n = 5;
              break;
            case 8:
              _context17.n = 10;
              break;
            case 9:
              _context17.p = 9;
              _t19 = _context17.v;
              _iterator6.e(_t19);
            case 10:
              _context17.p = 10;
              _iterator6.f();
              return _context17.f(10);
            case 11:
              stats[dir] = {
                fileCount: files.length,
                totalSize: dirSize,
                totalSizeMB: (dirSize / (1024 * 1024)).toFixed(2),
                totalSizeGB: (dirSize / (1024 * 1024 * 1024)).toFixed(4)
              };
              totalSize += dirSize;
              totalFiles += files.length;
              _context17.n = 13;
              break;
            case 12:
              _context17.p = 12;
              _t20 = _context17.v;
              console.warn("Failed to read directory ".concat(dir, ":"), _t20.message);
              stats[dir] = {
                fileCount: 0,
                totalSize: 0,
                totalSizeMB: "0.00",
                totalSizeGB: "0.0000"
              };
            case 13:
              _i++;
              _context17.n = 1;
              break;
            case 14:
              stats.total = {
                fileCount: totalFiles,
                totalSize: totalSize,
                totalSizeMB: (totalSize / (1024 * 1024)).toFixed(2),
                totalSizeGB: (totalSize / (1024 * 1024 * 1024)).toFixed(4)
              };
              return _context17.a(2, stats);
            case 15:
              _context17.p = 15;
              _t21 = _context17.v;
              console.error("Failed to get storage stats:", _t21);
              return _context17.a(2, null);
          }
        }, _callee16, this, [[4, 9, 10, 11], [2, 12], [0, 15]]);
      }));
      function getStorageStats() {
        return _getStorageStats.apply(this, arguments);
      }
      return getStorageStats;
    }()
    /**
     * Convert file path to URL
     * @param {string} filePath - Local file path (e.g., 'uploads/profiles/image.jpg')
     * @returns {string} - Full URL to access the file
     */
    )
  }, {
    key: "getFileUrl",
    value: function getFileUrl(filePath) {
      if (!filePath) return null;

      // If already a URL, return as is
      if (filePath.startsWith('http://') || filePath.startsWith('https://')) {
        return filePath;
      }

      // Remove leading slash if present
      var cleanPath = filePath.startsWith('/') ? filePath.substring(1) : filePath;

      // Get base URL from environment
      var baseUrl = process.env.BASE_URL || "http://localhost:".concat(process.env.PORT || 3000);

      // Return full URL
      return "".concat(baseUrl, "/").concat(cleanPath);
    }

    /**
     * Convert multiple file paths to URLs
     * @param {string[]} filePaths - Array of local file paths
     * @returns {string[]} - Array of full URLs
     */
  }, {
    key: "getFileUrls",
    value: function getFileUrls(filePaths) {
      var _this4 = this;
      if (!filePaths || !Array.isArray(filePaths)) return [];
      return filePaths.map(function (path) {
        return _this4.getFileUrl(path);
      }).filter(Boolean);
    }

    /**
     * Get detailed file list for a directory
     * @param {string} directory - Directory name (from UPLOAD_DIRECTORIES)
     * @param {Object} options - Pagination and sorting options
     * @returns {Promise<Object>}
     */
  }, {
    key: "getDirectoryFiles",
    value: (function () {
      var _getDirectoryFiles = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee17(directory) {
        var options,
          _options$page,
          page,
          _options$limit,
          limit,
          _options$sortBy,
          sortBy,
          _options$sortOrder,
          sortOrder,
          dirPath,
          files,
          fileDetails,
          _iterator7,
          _step7,
          file,
          filePath,
          stats,
          startIndex,
          endIndex,
          paginatedFiles,
          _args18 = arguments,
          _t22,
          _t23;
        return _regenerator().w(function (_context18) {
          while (1) switch (_context18.p = _context18.n) {
            case 0:
              options = _args18.length > 1 && _args18[1] !== undefined ? _args18[1] : {};
              _options$page = options.page, page = _options$page === void 0 ? 1 : _options$page, _options$limit = options.limit, limit = _options$limit === void 0 ? 50 : _options$limit, _options$sortBy = options.sortBy, sortBy = _options$sortBy === void 0 ? "created_at" : _options$sortBy, _options$sortOrder = options.sortOrder, sortOrder = _options$sortOrder === void 0 ? "desc" : _options$sortOrder;
              _context18.p = 1;
              dirPath = _path["default"].join(this.uploadDir, directory);
              _context18.n = 2;
              return _promises["default"].readdir(dirPath);
            case 2:
              files = _context18.v;
              fileDetails = [];
              _iterator7 = _createForOfIteratorHelper(files);
              _context18.p = 3;
              _iterator7.s();
            case 4:
              if ((_step7 = _iterator7.n()).done) {
                _context18.n = 7;
                break;
              }
              file = _step7.value;
              filePath = _path["default"].join(dirPath, file);
              _context18.n = 5;
              return _promises["default"].stat(filePath);
            case 5:
              stats = _context18.v;
              if (stats.isFile()) {
                fileDetails.push({
                  filename: file,
                  path: "/".concat(this.uploadDir, "/").concat(directory, "/").concat(file),
                  size: stats.size,
                  sizeInMB: (stats.size / (1024 * 1024)).toFixed(2),
                  created_at: stats.birthtime,
                  updated_at: stats.mtime
                });
              }
            case 6:
              _context18.n = 4;
              break;
            case 7:
              _context18.n = 9;
              break;
            case 8:
              _context18.p = 8;
              _t22 = _context18.v;
              _iterator7.e(_t22);
            case 9:
              _context18.p = 9;
              _iterator7.f();
              return _context18.f(9);
            case 10:
              // Sort files
              fileDetails.sort(function (a, b) {
                var aValue = a[sortBy];
                var bValue = b[sortBy];
                if (sortOrder === "asc") {
                  return aValue > bValue ? 1 : -1;
                }
                return aValue < bValue ? 1 : -1;
              });

              // Pagination
              startIndex = (page - 1) * limit;
              endIndex = startIndex + limit;
              paginatedFiles = fileDetails.slice(startIndex, endIndex);
              return _context18.a(2, {
                files: paginatedFiles,
                pagination: {
                  total: fileDetails.length,
                  page: page,
                  limit: limit,
                  totalPages: Math.ceil(fileDetails.length / limit),
                  hasNextPage: endIndex < fileDetails.length,
                  hasPrevPage: page > 1
                }
              });
            case 11:
              _context18.p = 11;
              _t23 = _context18.v;
              console.error("Failed to get directory files for ".concat(directory, ":"), _t23);
              throw new Error("Failed to list files: ".concat(_t23.message));
            case 12:
              return _context18.a(2);
          }
        }, _callee17, this, [[3, 8, 9, 10], [1, 11]]);
      }));
      function getDirectoryFiles(_x17) {
        return _getDirectoryFiles.apply(this, arguments);
      }
      return getDirectoryFiles;
    }())
  }]);
}(); // Export singleton instance
var fileService = new FileService();
var _default = exports["default"] = fileService;