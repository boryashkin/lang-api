import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "../mongodb/mongodb";
import Email from "next-auth/providers/email";
import { AuthOptions, CallbacksOptions, getServerSession } from "next-auth";
import { Adapter, AdapterUser } from "next-auth/adapters";

const smtpUser = process.env.SMTP_USER;
const smtpPass = process.env.SMTP_PASS;
// MongoDBAdapter implements Adapter from "@auth/core/adapters"
const adapter: Adapter = MongoDBAdapter(clientPromise)

//adapter.createUser?({email: "demo@borisd.ru"})

// they are being merged with the default inside NextAuth
const cbcs: CallbacksOptions = {
    async session(params) {
        params.session.user = params.user
        
        return params.session
    },
}

export const authOptions: AuthOptions = {
    callbacks: cbcs,
    adapter: adapter,
    // Configure one or more authentication providers
    providers: [
        Email({
            name: "langapi",
            server: { host: "smtp.yandex.ru", port: 465, auth: { user: smtpUser, pass: smtpPass } },
            from: "LangAPI <langapi@borisd.ru>",
        }),
    ],
}

export const getUserFromSession = async (authOptions: AuthOptions): Promise<AdapterUser|undefined> =>  {
    let sess = await getServerSession(authOptions)
    return sess?.user as AdapterUser
}