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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
const types_1 = require("../types");
const rcon_client_1 = require("rcon-client");
const Discord = require("discord.js");
let CommandProcessor = class CommandProcessor {
    constructor(rcon) {
        this.commandsCollection = new Discord.Collection();
        this.commands = require("../commands");
        this.commandChannels = new Set();
        this.rcon = rcon;
        Object.keys(this.commands).map(key => {
            this.commandsCollection.set(this.commands[key].name, this.commands[key]);
            this.commandChannels.add(this.commands[key].channel);
        });
    }
    handle(message) {
        return __awaiter(this, void 0, void 0, function* () {
            let args = message.content.split(/ +/);
            let command = args.shift().toLowerCase();
            if (!this.commandChannels.has(message.channel.id)) {
                console.log("Mesage not in any command channel, ignoring.");
                return;
            }
            if (message.channel.id != this.commandsCollection.get(command).channel) {
                console.log("message not in correct channel, ignoring.");
                return;
            }
            if (!this.commandsCollection.has(command)) {
                message.channel.send("That command does not exist or you do not have access to it.");
                return;
            }
            try {
                let commandString = this.commandsCollection.get(command).execute(message, args);
                yield this.rcon.connect();
                console.log("connect called");
                let response = yield this.rcon.send(commandString);
                this.rcon.end();
                message.channel.send(response);
            }
            catch (err) {
                message.channel.send("An unexpected error has occurred. " + err);
            }
        });
    }
};
CommandProcessor = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(types_1.TYPES.Rcon)),
    __metadata("design:paramtypes", [rcon_client_1.Rcon])
], CommandProcessor);
exports.CommandProcessor = CommandProcessor;
//# sourceMappingURL=command-processor.js.map