import {Client, Message} from "discord.js";
import {inject, injectable} from "inversify";
import { TYPES } from "./types";
import { CommandProcessor } from "./services/command-processor"

@injectable()
export class Bot {
  private client: Client;
  private readonly token: string;
  private readonly commandProcessor: CommandProcessor;

  constructor(
    @inject(TYPES.Client) client: Client,
    @inject(TYPES.Token) token: string,
    @inject(TYPES.CommandProcessor) commandProcessor: CommandProcessor) {
    this.client = client;
    this.token = token;
    this.commandProcessor = commandProcessor;
  }

  public listen(): Promise<string> {
    this.client.on('message', (message: Message) => {
      if (message.author.bot) {
        console.log('Ignoring bot message!')
        return;
      }

      if (message.content.substr(0, 1) != "!") {
          console.log("message not prefixed, ignoring.")
          return;
      }

      message.content = message.content.substr(1, message.content.length - 1);
      console.log("Message received! Contents: ", message.content);

      this.commandProcessor.handle(message).then(() => {
        console.log("Response sent!");
      }).catch((err) => {
        console.log(`error: ${err}`)
      })
    });

    return this.client.login(this.token);
  }
}