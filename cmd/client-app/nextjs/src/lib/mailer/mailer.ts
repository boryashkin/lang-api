import { createTransport } from "nodemailer"

const smtpUser = process.env.SMTP_USER;
const smtpPass = process.env.SMTP_PASS;
const adminEmail = process.env.ADMIN_MAIL;

export const mailerServerConfig = { host: "smtp.yandex.ru", port: 465, auth: { user: smtpUser, pass: smtpPass } }

export const mailer = {
    async send(subject: string, text: string) {
        const transport = createTransport(mailerServerConfig)
        const result = await transport.sendMail({
            to: adminEmail,
            from: adminEmail,
            subject: subject,
            text: text,
        })
        const failed = result.rejected.concat(result.pending).filter(Boolean)
        if (failed.length) {
            throw new Error(`Email (${failed.join(", ")}) could not be sent`)
        }

    }
}