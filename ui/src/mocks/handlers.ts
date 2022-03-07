import { RestHandler } from "msw";
import idpHandlers from "./idp/idpHandlers";

export const handlers: RestHandler[] = [...idpHandlers];
