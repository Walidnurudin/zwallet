module.exports = {
  reactStrictMode: true,
  env: {
    URL_BACKEND: "https://jsonplaceholder.typicode.com/",
    URL_LOCAL: "http://localhost:3001/",
  },
  async rewrites() {
    return [
      // AUTH PAGE
      {
        source: "/login",
        destination: "/auth/login",
      },
      {
        source: "/register",
        destination: "/auth/register",
      },
      {
        source: "/create-pin",
        destination: "/auth/create-pin",
      },
      {
        source: "/reset-password",
        destination: "/auth/reset-password",
      },
      {
        source: "/reset-password/:id",
        destination: "/auth/reset-password/:id",
      },

      // MAIN PAGE
      {
        source: "/home",
        destination: "/main/home",
      },
      {
        source: "/transfer",
        destination: "/main/transfer",
      },
      {
        source: "/history",
        destination: "/main/history",
      },
      {
        source: "/history/:id",
        destination: "/main/history/:id",
      },

      // PROFILE
      {
        source: "/profile", // source = path sesudah diubah
        destination: "/main/profile", //destination = path sebelum dirubah
      },
      {
        source: "/profile/personal-info",
        destination: "/main/profile/personal-info",
      },
      {
        source: "/profile/change-pin",
        destination: "/main/profile/change-pin",
      },
      {
        source: "/profile/change-password",
        destination: "/main/profile/change-password",
      },
    ];
  },
};
