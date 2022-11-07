import { IUser } from "./userModels";

export const sortUsersByKey = (key: keyof IUser) => (a: IUser, b: IUser) => {
  const firstValue = a[key];
  const secondValue = b[key];
  if (typeof firstValue === "string" && typeof secondValue === "string") {
    const first = firstValue.toLowerCase(),
      second = secondValue.toLowerCase();
    return first < second ? -1 : second < first ? 1 : 0;
  } else return 0;
};
