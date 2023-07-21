import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "../mongodb/mongodb";
import Email from "next-auth/providers/email";
import { AuthOptions, CallbacksOptions, getServerSession } from "next-auth";
import { Adapter, AdapterUser } from "next-auth/adapters";
import type { Adapter as CAdapter } from "@auth/core/adapters"
import { mailerServerConfig } from "../mailer/mailer";

// MongoDBAdapter implements Adapter from "@auth/core/adapters"
const adapter: Adapter|CAdapter = MongoDBAdapter(clientPromise)

// they are being merged with the default inside NextAuth
const cbcs: CallbacksOptions = {
    async session(params) {
        params.session.user = params.user
        
        return params.session
    },
    signIn() {
        return true
      },
      redirect({ url, baseUrl }) {
        if (url.startsWith("/")) return `${baseUrl}${url}`
        else if (new URL(url).origin === baseUrl) return url
        return baseUrl
      },
      jwt({ token }) {
        return token
      },
}

export const authOptions: AuthOptions = {
    callbacks: cbcs,
    adapter: adapter,
    //secret
    // Configure one or more authentication providers
    providers: [
        Email({
            name: "langapi",
            server: mailerServerConfig,
            from: "LangAPI <langapi@borisd.ru>",
        }),
    ],
}

export const getUserFromSession = async (authOptions: AuthOptions): Promise<AdapterUser|undefined> =>  {
    let sess = await getServerSession(authOptions)
    return sess?.user as AdapterUser
}