"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Role = void 0;
// Define Role enum locally if not available from @prisma/client
var Role;
(function (Role) {
    Role["ADMIN"] = "ADMIN";
    Role["USER"] = "USER";
    // Add other roles as needed
})(Role || (exports.Role = Role = {}));
