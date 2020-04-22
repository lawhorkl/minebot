"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data = require("../../secrets.json");
exports.op = {
    name: 'op',
    description: 'Op the mentioned user.',
    channel: data.opChannelId,
    execute(msg, args) {
        return `op ${args[0]}`;
    },
};
exports.deOp = {
    name: 'deop',
    description: 'Deop the mentioned user.',
    channel: data.opChannelId,
    execute(msg, args) {
        return `deop ${args[0]}`;
    },
};
//# sourceMappingURL=op.js.map