import "reflect-metadata";
import { Container } from "inversify";
import { TYPES } from "./types";
import { Bot } from "./bot";
import { CommandProcessor } from "./services/command-processor"
import { Client } from "discord.js";
import { Rcon } from "rcon-client";
import * as data from "../secrets.json";

let container = new Container();

container.bind<Bot>(TYPES.Bot).to(Bot).inSingletonScope();
container.bind<Client>(TYPES.Client).toConstantValue(new Client());
container.bind<string>(TYPES.Token).toConstantValue(process.env.TOKEN);
container.bind<CommandProcessor>(TYPES.CommandProcessor).to(CommandProcessor).inSingletonScope();
container.bind<Rcon>(TYPES.Rcon).toConstantValue(new Rcon({
    host: data.rconHost,
    port: data.rconPort,
    password: data.rconPassword
}));

export default container;