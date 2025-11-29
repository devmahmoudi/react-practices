import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";

export const nextAuthOptions = {
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "Enter username ...",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter password ...",
        },
      },
      //authorization login
      async authorize(credentials, req) {
        const user = {
          id: 1,
          name: "Mahdi Mahmoudi",
          email: "devmahmoudi@github.com",
        };

        // If no error and we have user data, return it
        if (
          credentials.username == "devmahmoudi" &&
          credentials.password == "123456789"
        ) {
          return user;
        }
        // Return null if user data could not be retrieved
        return null;
      },
    }),
    GithubProvider({
      clientId: process.env.GITHUB_OAUTH_ID,
      clientSecret: process.env.GITHUB_OAUTH_SECRET
    })
  ],
  // customize pages
  pages: {
    signIn: "/auth/signin",
    // signOut: '/auth/signout',
    // error: '/auth/error', // Error code passed in query string as ?error=
    // verifyRequest: '/auth/verify-request', // (used for check email message)
    // newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
  },
};
