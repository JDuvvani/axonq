import dayjs from "dayjs";
import log from "pino";

export const logger = log({
  transport: {
    target: "pino-pretty",
  },
  base: {
    pid: false,
  },
  timestamp: () => `,"time":"${dayjs().format()}"`,
});
