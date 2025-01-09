import { removeOldPasswords } from "./remove-old-passwords.cron";
import { removeOldTokens } from "./remove-old-tokens";
import { testCron } from "./trest-cron";

export const cronRunner = async () => {
  testCron.start();
  removeOldTokens.start();
  removeOldPasswords.start();
};
