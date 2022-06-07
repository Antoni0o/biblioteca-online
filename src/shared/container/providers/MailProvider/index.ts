import { container } from "tsyringe";

import { IMailProvider } from "./IMailProvider";
import { SendGridMailProvider } from "./implementations/SendGridMailProvider";

const mailProvider = container.resolve(SendGridMailProvider);

container.registerInstance<IMailProvider>(
  "MailProvider",
  mailProvider
);