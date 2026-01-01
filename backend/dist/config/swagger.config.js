"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.swaggerUiOptions = exports.setupAPIDocs = exports.redocOptions = exports.openapiDocument = exports["default"] = void 0;
/**
 * Swagger/OpenAPI Configuration
 * Sets up API documentation using Swagger UI and ReDoc
 */

var swaggerUi = require("swagger-ui-express");
var YAML = require("yamljs");
var path = require("path");

// Get current directory (ES6 module compatibility)
var _dirname = path.dirname(__filename);

// Load OpenAPI specification
var openapiDocument = exports.openapiDocument = YAML.load(path.join(_dirname, "../../openapi.yaml"));

/**
 * Swagger UI Options
 * Customizes the appearance and behavior of Swagger UI
 */
var swaggerUiOptions = exports.swaggerUiOptions = {
  customCss: "\n    .swagger-ui .topbar { display: none }\n    .swagger-ui .info { margin: 20px 0; }\n    .swagger-ui .scheme-container { \n      background: #fafafa; \n      box-shadow: none; \n      padding: 20px;\n      border-radius: 4px;\n    }\n    .swagger-ui .info .title {\n      color: #3b4151;\n      font-size: 36px;\n    }\n  ",
  customSiteTitle: "ITFY E-Voting System API Docs",
  customfavIcon: "/favicon.ico",
  swaggerOptions: {
    persistAuthorization: true,
    displayRequestDuration: true,
    docExpansion: "none",
    filter: true,
    showExtensions: true,
    showCommonExtensions: true,
    tryItOutEnabled: true,
    syntaxHighlight: {
      activate: true,
      theme: "monokai"
    },
    defaultModelsExpandDepth: 3,
    defaultModelExpandDepth: 3
  }
};

/**
 * ReDoc Options
 * Customizes the appearance of ReDoc documentation
 */
var redocOptions = exports.redocOptions = {
  title: "ITFY E-Voting System API Documentation",
  specUrl: "/api-docs/openapi.yaml",
  nonce: "",
  // Optional: CSP nonce
  // ReDoc options
  redocOptions: {
    theme: {
      colors: {
        primary: {
          main: "#3b82f6"
        }
      },
      typography: {
        fontSize: "16px",
        fontFamily: "system-ui, -apple-system, sans-serif",
        headings: {
          fontFamily: "system-ui, -apple-system, sans-serif"
        }
      }
    },
    hideDownloadButton: false,
    expandResponses: "200,201",
    jsonSampleExpandLevel: 2,
    hideSingleRequestSampleTab: true,
    menuToggle: true,
    nativeScrollbars: false,
    sortPropsAlphabetically: true,
    sortTagsAlphabetically: true,
    sortEnumValuesAlphabetically: true,
    pathInMiddlePanel: true,
    requiredPropsFirst: true,
    scrollYOffset: 50,
    showExtensions: true,
    hideHostname: false,
    hideLoading: false,
    expandDefaultServerVariables: true,
    maxDisplayedEnumValues: 10
  }
};

/**
 * Setup API documentation routes
 * @param {Express.Application} app - Express application instance
 */
var setupAPIDocs = exports.setupAPIDocs = function setupAPIDocs(app) {
  // Serve OpenAPI YAML file
  app.get("/api-docs/openapi.yaml", function (req, res) {
    res.type("text/yaml");
    res.sendFile(path.join(_dirname, "../../openapi.yaml"));
  });

  // Serve OpenAPI JSON format
  app.get("/api-docs/openapi.json", function (req, res) {
    res.json(openapiDocument);
  });

  // Swagger UI documentation (interactive API explorer)
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openapiDocument, swaggerUiOptions));

  // ReDoc documentation (beautiful, responsive API docs)
  app.get("/api-docs/redoc", function (req, res) {
    res.send("\n      <!DOCTYPE html>\n      <html>\n        <head>\n          <title>".concat(redocOptions.title, "</title>\n          <meta charset=\"utf-8\"/>\n          <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n          <link href=\"https://fonts.googleapis.com/css?family=Montserrat:300,400,700|Roboto:300,400,700\" rel=\"stylesheet\">\n          <style>\n            body {\n              margin: 0;\n              padding: 0;\n            }\n          </style>\n        </head>\n        <body>\n          <redoc spec-url='").concat(redocOptions.specUrl, "'></redoc>\n          <script src=\"https://cdn.redoc.ly/redoc/latest/bundles/redoc.standalone.js\"></script>\n        </body>\n      </html>\n    "));
  });

  // API documentation landing page
  app.get("/docs", function (req, res) {
    res.send("\n      <!DOCTYPE html>\n      <html lang=\"en\">\n      <head>\n        <meta charset=\"UTF-8\">\n        <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n        <title>ITFY E-Voting System - API Documentation</title>\n        <style>\n          * {\n            margin: 0;\n            padding: 0;\n            box-sizing: border-box;\n          }\n          body {\n            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;\n            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n            min-height: 100vh;\n            display: flex;\n            align-items: center;\n            justify-content: center;\n            padding: 20px;\n          }\n          .container {\n            background: white;\n            border-radius: 16px;\n            box-shadow: 0 20px 60px rgba(0,0,0,0.3);\n            max-width: 900px;\n            width: 100%;\n            padding: 60px 40px;\n            text-align: center;\n          }\n          h1 {\n            font-size: 42px;\n            color: #1a202c;\n            margin-bottom: 16px;\n            font-weight: 700;\n          }\n          .subtitle {\n            font-size: 18px;\n            color: #718096;\n            margin-bottom: 48px;\n          }\n          .version {\n            display: inline-block;\n            background: #667eea;\n            color: white;\n            padding: 6px 16px;\n            border-radius: 20px;\n            font-size: 14px;\n            font-weight: 600;\n            margin-bottom: 32px;\n          }\n          .docs-grid {\n            display: grid;\n            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));\n            gap: 24px;\n            margin-top: 40px;\n          }\n          .doc-card {\n            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n            color: white;\n            padding: 32px 24px;\n            border-radius: 12px;\n            text-decoration: none;\n            transition: transform 0.3s ease, box-shadow 0.3s ease;\n            box-shadow: 0 4px 12px rgba(0,0,0,0.1);\n          }\n          .doc-card:hover {\n            transform: translateY(-4px);\n            box-shadow: 0 8px 24px rgba(0,0,0,0.2);\n          }\n          .doc-card h3 {\n            font-size: 24px;\n            margin-bottom: 12px;\n            font-weight: 600;\n          }\n          .doc-card p {\n            font-size: 14px;\n            opacity: 0.95;\n            line-height: 1.6;\n          }\n          .doc-card.swagger {\n            background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);\n          }\n          .doc-card.openapi {\n            background: linear-gradient(135deg, #fc4a1a 0%, #f7b733 100%);\n          }\n          .features {\n            margin-top: 48px;\n            padding-top: 48px;\n            border-top: 2px solid #e2e8f0;\n          }\n          .features h2 {\n            font-size: 28px;\n            color: #1a202c;\n            margin-bottom: 24px;\n          }\n          .feature-list {\n            display: grid;\n            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));\n            gap: 16px;\n            text-align: left;\n          }\n          .feature-item {\n            padding: 16px;\n            background: #f7fafc;\n            border-radius: 8px;\n            border-left: 4px solid #667eea;\n          }\n          .feature-item strong {\n            color: #2d3748;\n            display: block;\n            margin-bottom: 4px;\n          }\n          .feature-item span {\n            color: #718096;\n            font-size: 14px;\n          }\n          .footer {\n            margin-top: 48px;\n            padding-top: 24px;\n            border-top: 1px solid #e2e8f0;\n            color: #718096;\n            font-size: 14px;\n          }\n        </style>\n      </head>\n      <body>\n        <div class=\"container\">\n          <span class=\"version\">v1.0.0</span>\n          <h1>\uD83D\uDDF3\uFE0F ITFY E-Voting System API</h1>\n          <p class=\"subtitle\">\n            Comprehensive API documentation for event-based e-voting platform\n          </p>\n          \n          <div class=\"docs-grid\">\n            <a href=\"/api-docs\" class=\"doc-card\">\n              <h3>\uD83D\uDCD8 Swagger UI</h3>\n              <p>Interactive API explorer with try-it-out functionality. Perfect for testing endpoints.</p>\n            </a>\n            \n            <a href=\"/api-docs/redoc\" class=\"doc-card swagger\">\n              <h3>\uD83D\uDCD7 ReDoc</h3>\n              <p>Beautiful, responsive API documentation. Great for reading and understanding the API.</p>\n            </a>\n            \n            <a href=\"/api-docs/openapi.yaml\" class=\"doc-card openapi\" download>\n              <h3>\uD83D\uDCC4 OpenAPI Spec</h3>\n              <p>Download the OpenAPI 3.0 specification file (YAML format).</p>\n            </a>\n          </div>\n\n          <div class=\"features\">\n            <h2>API Features</h2>\n            <div class=\"feature-list\">\n              <div class=\"feature-item\">\n                <strong>\uD83D\uDD10 Authentication</strong>\n                <span>JWT-based secure authentication</span>\n              </div>\n              <div class=\"feature-item\">\n                <strong>\uD83C\uDF89 Event Management</strong>\n                <span>Create & manage voting events</span>\n              </div>\n              <div class=\"feature-item\">\n                <strong>\uD83D\uDC64 Candidate Management</strong>\n                <span>Nominations & candidate profiles</span>\n              </div>\n              <div class=\"feature-item\">\n                <strong>\uD83D\uDDF3\uFE0F Voting System</strong>\n                <span>Secure vote casting & tracking</span>\n              </div>\n              <div class=\"feature-item\">\n                <strong>\uD83D\uDCB3 Payments</strong>\n                <span>Paystack integration for bundles</span>\n              </div>\n              <div class=\"feature-item\">\n                <strong>\uD83D\uDCCA Analytics</strong>\n                <span>Real-time voting analytics</span>\n              </div>\n            </div>\n          </div>\n\n          <div class=\"footer\">\n            <p>Need help? Contact <strong>support@itfy-evoting.com</strong></p>\n            <p style=\"margin-top: 8px;\">Base URL: <code>".concat(process.env.API_BASE_URL || "http://localhost:3001/api", "</code></p>\n          </div>\n        </div>\n      </body>\n      </html>\n    "));
  });
  console.log("📚 API Documentation routes configured:");
  console.log("   Swagger UI:    /api-docs");
  console.log("   ReDoc:         /api-docs/redoc");
  console.log("   OpenAPI YAML:  /api-docs/openapi.yaml");
  console.log("   OpenAPI JSON:  /api-docs/openapi.json");
  console.log("   Docs Home:     /docs");
};
var _default = exports["default"] = setupAPIDocs;