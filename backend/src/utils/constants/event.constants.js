/**
 * Constant file for events
 */

const STATUS = {
    ACTIVE: "active",
    UPCOMING: "upcoming",
    ARCHIVED: "archived",
    CANCELLED: "cancelled",
    DELETED: "deleted",
    PENDING: "pending"
}

const EVENT_TYPE = {
    CONFERENCE: "conference",
    WORKSHOP: "workshop",
    SEMINAR: "seminar",
    NETWORKING: "networking",
    WEBINAR: "webinar",
    HYBRID: "hybrid",
    OTHER: "other"
}

const VISIBILITY = {
    PUBLIC: "public",
    PRIVATE: "private",
    UNLISTED: "unlisted"
}

const CURRENCY = {
    USD: "USD",
    EUR: "EUR",
    GBP: "GBP",
    GHS: "GHS",
    NGN: "₦",
    ZAR: "R",
    INR: "₹",
    JPY: "¥",
    CNY: "¥"
}

export { STATUS, EVENT_TYPE, VISIBILITY, CURRENCY }
export default STATUS