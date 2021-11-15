import cookies from "next-cookies";

// PUBLIC ROUTE
export function unAuthPage(context) {
  return new Promise((resolve, reject) => {
    // memfilter cookie nya berdasarkan yang ada di penyimpanan cookie
    const dataCookie = cookies(context);
    console.log(dataCookie);
    if (dataCookie.token) {
      return context.res.writeHead(302, { Location: "/main/home" }).end();
    }
    return resolve("unauthorized");
  });
}

// PRIVATE ROUTE
export function authPage(context) {
  return new Promise((resolve, reject) => {
    const dataCookie = cookies(context);
    console.log(dataCookie);
    if (!dataCookie.token) {
      return context.res.writeHead(302, { Location: "/auth/login" }).end();
    }
    return resolve(dataCookie);
  });
}
