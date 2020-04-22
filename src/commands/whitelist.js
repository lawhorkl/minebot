"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data = require("../../secrets.json");
exports.whitelistAdd = {
    name: 'whitelist',
    description: 'Add the mentioned user to the whitelist.',
    channel: data.whitelistChannelId,
    execute(msg, args) {
        return `whitelist add ${args[0]}`;
    },
};
//# sourceMappingURL=whitelist.js.map