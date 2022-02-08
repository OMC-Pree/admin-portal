import { RestHandler } from "msw";
import idpHandlers from "./idp/idpHandlers";

// const isAuthenticated = () => !!localStorage.getItem("token");

export const handlers: RestHandler[] = [...idpHandlers];
