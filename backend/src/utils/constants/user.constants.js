// User roles
export const ROLES = {
    SUPER_ADMIN: "super_admin",
    ADMIN: "admin",
    ORGANISER: "organiser",
    MODERATOR: "moderator", 
}

// User permissions
const PERMSSIONS = {
    READ: "read",
    WRITE: "write",
    UPDATE: "update", //update includes soft deleting
    DELETE: "delete", // delete means hard deleting so exists exclusively for admins
    SUPER: "super"

}

const STATUS = {
    ACTIVE: "active",
    INACTIVE: "inactive",
    SUSPENDED: "suspended",
    DELETED: "deleted"
}

export default ROLES
export { PERMSSIONS, ROLES, STATUS }