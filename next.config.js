module.exports = {
  reactStrictMode: true,
  env: {
    URL_BACKEND: "https://jsonplaceholder.typicode.com/",
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

      // MAIN PAGE
      {
        source: "/profile", // source = path sesudah diubah
        destination: "/main/profile", //destination = path sebelum dirubah
      },
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
    ];
  },
};
