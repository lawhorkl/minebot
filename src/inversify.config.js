"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const inversify_1 = require("inversify");
const types_1 = require("./types");
const bot_1 = require("./bot");
const command_processor_1 = require("./services/command-processor");
const discord_js_1 = require("discord.js");
const rcon_client_1 = require("rcon-client");
const data = require("../secrets.json");
let container = new inversify_1.Container();
container.bind(types_1.TYPES.Bot).to(bot_1.Bot).inSingletonScope();
container.bind(types_1.TYPES.Client).toConstantValue(new discord_js_1.Client());
container.bind(types_1.TYPES.Token).toConstantValue(process.env.TOKEN);
container.bind(types_1.TYPES.CommandProcessor).to(command_processor_1.CommandProcessor).inSingletonScope();
container.bind(types_1.TYPES.Rcon).toConstantValue(new rcon_client_1.Rcon({
    host: data.rconHost,
    port: data.rconPort,
    password: data.rconPassword
}));
exports.default = container;
//# sourceMappingURL=inversify.config.js.map