import { MockRestHandler } from "../types";

export const postUserRegister: MockRestHandler = (req, res, ctx) => {
  return res(
    ctx.status(201),
    ctx.json({
      data: [
        {
          id: "6666cf40-26a5-11ec-a4d6-1e00fb1e9c92",
          type: "coach | client | manager | appService",
          managerUserID: "ade72d06-26a5-11ec-befb-1e00fb1e9c92",
          coachUserID: "ade72d06-26a5-11ec-befb-1e00fb1e9c92",
          clientUserID: "ade72d06-26a5-11ec-befb-1e00fb1e9c92",
          permissions: "'COACH', 'MANAGER', 'CLIENT'",
          email: "example@email.com",
          emailVerified: true,
          password: "****hidden****",
          resetToken: null,
          resetTokenExpiry: null,
          title: "eg. Mr, Mrs ....",
          pronoun: "string",
          firstName: "John",
          lastName: "Doe",
          dateOfBirth: "YYYY-MM-DD eg. '1984-11-24'",
          phones: [
            {
              type: "e.g. ['work', 'personal', 'work2']",
              prefix: "+44",
              number: "[ '074 00 00 00 00' | '07400000000'  | ....]",
            },
          ],
          addresses: [
            {
              type: "e.g. ['work', 'personal', 'work2']",
              entityName: "eg. 'Mr John Doe CFO'",
              organisation: "eg. 'OctopusMoneyCoach', 'Red Cross', ...",
              street1: "string",
              street2: "string",
              street3: "string",
              street4: "string",
              city: "eg. 'London",
              zipCode: "EC1N 2HT",
              countryAlpha2: "GB",
            },
          ],
          metadata: {},
          createdAt: {},
          updatedAt: {},
        },
      ],
      meta: {},
      errors: [],
    }),
  );
};
