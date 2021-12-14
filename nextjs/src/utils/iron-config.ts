const ironConfig = {
  password: "0123456789",
  cookieName: "fullcycle-session",
  cookieOptions: {
    secure: false,
  },
};

declare module "iron-session" {
  interface IronSessionData {
    account?: {
      id: number;
      name: string;
      token: string;
    };
  }
}

export default ironConfig;
