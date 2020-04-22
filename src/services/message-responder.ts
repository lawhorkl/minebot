import {Message} from "discord.js";
import {PingFinder} from "./ping-finder";
import {inject, injectable} from "inversify";
import {TYPES} from "../types";
import { Rcon } from "rcon-client";

@injectable()
export class MessageResponder {
  private readonly rcon: Rcon;

  constructor(@inject(TYPES.Rcon) rcon: Rcon) {
    this.rcon = rcon;
  }

  async handle(message: Message): Promise<Message | Message[]> {
    await this.rcon.connect();
    let res = await this.rcon.send("list");
    this.rcon.end();
    return message.reply(res);
  }
}