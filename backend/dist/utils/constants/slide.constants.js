"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.SLIDE_TYPE = exports.SLIDE_STATUS = exports.SLIDE_POSITION = exports.BUTTON_STYLE = exports.ANIMATION_TYPE = void 0;
/**
 * Slide constants
 */

var SLIDE_STATUS = exports.SLIDE_STATUS = {
  ACTIVE: "active",
  INACTIVE: "inactive",
  DRAFT: "draft",
  SCHEDULED: "scheduled"
};
var SLIDE_TYPE = exports.SLIDE_TYPE = {
  HERO: "hero",
  BANNER: "banner",
  ANNOUNCEMENT: "announcement",
  PROMOTION: "promotion"
};
var SLIDE_POSITION = exports.SLIDE_POSITION = {
  TOP: "top",
  MIDDLE: "middle",
  BOTTOM: "bottom"
};
var ANIMATION_TYPE = exports.ANIMATION_TYPE = {
  FADE: "fade",
  SLIDE: "slide",
  ZOOM: "zoom",
  NONE: "none"
};
var BUTTON_STYLE = exports.BUTTON_STYLE = {
  PRIMARY: "primary",
  SECONDARY: "secondary",
  OUTLINE: "outline",
  GHOST: "ghost",
  LINK: "link"
};
var _default = exports["default"] = SLIDE_STATUS;