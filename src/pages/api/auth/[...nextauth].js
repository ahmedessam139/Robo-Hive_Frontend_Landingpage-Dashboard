import NextAuth from "next-auth"
import KeycloakProvider from "next-auth/providers/keycloak";

export default NextAuth({
    providers: [
        KeycloakProvider({
            clientId: process.env.KEYCLOAK_CLIENT_ID,
            clientSecret: process.env.KEYCLOAK_CLIENT_SECRET,
            issuer: process.env.KEYCLOAK_ISSUER_URL,
            authorizationUrl: `${process.env.KEYCLOAK_ISSUER_URL}/protocol/openid-connect/auth`,
            wellKnown: `${process.env.KEYCLOAK_ISSUER_URL}/.well-known/openid-configuration`,
        }),
    ],
    secret: process.env.JWT_SECRET,
    callbacks: {
        async jwt({token, user, account, profile, isNewUser}) {
            if (account) {
                token.accessToken = account.access_token
                token.idToken = account.id_token
                token.provider = account.provider
                token.user = user;
            }
            return token;
        },
        async session({session, token, user}) {
            // Send properties to the client, like an access_token from a provider.
            session.accessToken = token.accessToken;
            console.log(token.accessToken, '\n\n')
            session.idToken = token.idToken;
            session.userInfo = token.user;
            return session;
        }
    },
    events: {
        async signOut(token) {
            if (token.token.provider === "keycloak") {
                const issuerUrl = process.env.KEYCLOAK_ISSUER_URL
                const logOutUrl = new URL(`${issuerUrl}/protocol/openid-connect/logout`)
                logOutUrl.searchParams.set("id_token_hint", token.token.idToken)
                await fetch(logOutUrl);
            }
        },
    }
})