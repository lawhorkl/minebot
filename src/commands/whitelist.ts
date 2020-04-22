import * as data from "../../secrets.json";

export const whitelistAdd = {
    name: 'whitelist',
    description: 'Add the mentioned user to the whitelist.',
    channel: data.whitelistChannelId,
    execute(msg, args): string {
        return `whitelist add ${args[0]}`;
    },   
}