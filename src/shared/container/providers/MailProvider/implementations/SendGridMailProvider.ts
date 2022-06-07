import { injectable } from "tsyringe";
import handlebars from "handlebars";
import fs from "fs";
import { IMailProvider } from "../IMailProvider";
import sgMail from "@sendgrid/mail"

@injectable()
class SendGridMailProvider implements IMailProvider {

  async sendMail(
    to: string,
    subject: string,
    variables: any,
    path: string
  ): Promise<void> {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    const templateFileContent = fs.readFileSync(path).toString("utf-8");

    const templateParse = handlebars.compile(templateFileContent);

    const templateHTML = templateParse(variables);

    const msg = {
      to,
      from: "biblioteca.online.noreply@gmail.com",
      subject,
      html: templateHTML,
    }

    const result = await sgMail.send(msg).then((res) => console.log(res)).catch(err => console.error(err.response.body));
  }
}

export { SendGridMailProvider };