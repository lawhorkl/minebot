import {Message, Collection} from "discord.js";
import {PingFinder} from "./ping-finder";
import {inject, injectable} from "inversify";
import {TYPES} from "../types";
import { Rcon } from "rcon-client";

const Discord = require("discord.js");

@injectable()
export class CommandProcessor {
  private readonly rcon: Rcon;
  private commandsCollection = new Discord.Collection();
  private commands = require("../commands");
  private commandChannels = new Set();

  constructor(@inject(TYPES.Rcon) rcon: Rcon) {
    this.rcon = rcon;

    Object.keys(this.commands).map(key => {
        this.commandsCollection.set(this.commands[key].name, this.commands[key]);
        this.commandChannels.add(this.commands[key].channel)
    });
  }

  async handle(message: Message): Promise<Message | Message[]> {
    let args = message.content.split(/ +/);
    let command = args.shift().toLowerCase();

    if (!this.commandChannels.has(message.channel.id)) {
        console.log("Mesage not in any command channel, ignoring.")
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
        await this.rcon.connect();
        console.log("connect called");
        let response = await this.rcon.send(commandString);
        this.rcon.end();

        message.channel.send(response);
    }
    catch(err) {
        message.channel.send("An unexpected error has occurred. " + err);
    }
  }
}