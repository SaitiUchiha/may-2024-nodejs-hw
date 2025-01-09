import { CronJob } from "cron";

import { timeHelper } from "../helpers/time.helper";
import { oldPasswordRepository } from "../repositories/old-password.repository";

const handler = async () => {
  try {
    const date = timeHelper.subtractCurrentByParams(180, "days");

    const count = await oldPasswordRepository.deleteAllByParams({
      createdAt: { $lt: date },
    });
    console.log(`Deleted ${count} old passwords`);
  } catch (e) {
    console.error(e.message);
  }
};

export const removeOldPasswords = new CronJob("*/60 * * * * *", handler);
