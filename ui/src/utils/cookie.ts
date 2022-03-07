import { parseISO } from "date-fns";

interface ISetCookieOptions {
  name: string;
  value: string;
  expires?: string;
  path?: string;
}
export const setCookie = ({ name, value, expires, path = "/" }: ISetCookieOptions): void => {
  let cookie = `${name}=${value}; path=${path}; secure`;
  if (expires) cookie = `${cookie}; expires=${parseISO(expires).toUTCString()}`;
  document.cookie = cookie;
};

export const getCookie = (name: string): string | undefined => {
  const cookies = document.cookie.split(";");
  const tokenCookie = cookies.find((c) => c.indexOf(name) > -1);
  return tokenCookie?.replace(`${name}=`, "").trim();
};

interface IDeleteCookieOptions {
  name: string;
  path?: string;
}
export const deleteCookie = ({ name, path = "/" }: IDeleteCookieOptions): void => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${path}`;
};
