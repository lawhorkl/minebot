import * as data from "../../secrets.json";

export const op = {
    name: 'op',
    description: 'Op the mentioned user.',
    channel: data.opChannelId,
    execute(msg, args): string {
        return `op ${args[0]}`;
    },   
}

export const deOp = {
    name: 'deop',
    description: 'Deop the mentioned user.',
    channel: data.opChannelId, 
    execute(msg, args): string {
        return `deop ${args[0]}`;
    }, 
}
