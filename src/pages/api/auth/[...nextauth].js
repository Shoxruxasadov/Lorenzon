import GoogleProvider from "next-auth/providers/google"
import NextAuth from "next-auth";

export default NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_SECRET
        })
    ],
    pages: {
        signIn: '/login'
    },
    callbacks: {
        async session({ session, token, user }) {
            console.log("callback", session, token, user);
            session.user.username = session.user.name
            session.user.uid = token.sub;
            console.log("end", session, token, user);
            return session;
        },
        async signIn({ account, profile }) {
            if (account.provider === "google") {
                return profile.email_verified && profile.email.endsWith("@example.com")
            }
            return true // Do different verification for other providers that don't have `email_verified`
        },
    },
})