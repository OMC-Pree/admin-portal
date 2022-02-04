import { RestHandler } from "msw";
import { setupServer } from "msw/node";
import idpHandlers from "./idp/idpHandlers";

const isAuthenticated = () => !!localStorage.getItem("token");

export const handlers: RestHandler[] = [...idpHandlers];

export const mockServer = setupServer(...handlers);
