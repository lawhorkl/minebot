"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const inversify_1 = require("inversify");
const types_1 = require("./types");
const command_processor_1 = require("./services/command-processor");
let Bot = class Bot {
    constructor(client, token, commandProcessor) {
        this.client = client;
        this.token = token;
        this.commandProcessor = commandProcessor;
    }
    listen() {
        this.client.on('message', (message) => {
            if (message.author.bot) {
                console.log('Ignoring bot message!');
                return;
            }
            if (message.content.substr(0, 1) != "!") {
                console.log("message not prefixed, ignoring.");
                return;
            }
            message.content = message.content.substr(1, message.content.length - 1);
            console.log("Message received! Contents: ", message.content);
            this.commandProcessor.handle(message).then(() => {
                console.log("Response sent!");
            }).catch((err) => {
                console.log(`error: ${err}`);
            });
        });
        return this.client.login(this.token);
    }
};
Bot = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(types_1.TYPES.Client)),
    __param(1, inversify_1.inject(types_1.TYPES.Token)),
    __param(2, inversify_1.inject(types_1.TYPES.CommandProcessor)),
    __metadata("design:paramtypes", [discord_js_1.Client, String, command_processor_1.CommandProcessor])
], Bot);
exports.Bot = Bot;
//# sourceMappingURL=bot.js.map