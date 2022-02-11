import { IUser } from "./user";

export const sortUsersByKey = (key: keyof IUser) => (a: IUser, b: IUser) => {
  const first = (a[key] || "").toLowerCase(),
    second = (b[key] || "").toLowerCase();
  return first < second ? -1 : second < first ? 1 : 0;
};
