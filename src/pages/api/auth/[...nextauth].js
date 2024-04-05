import GoogleProvider from "next-auth/providers/google"
import NextAuth from "next-auth";

export default NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
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
    },
    secret: process.env.NEXTAUTH_SECRET
})