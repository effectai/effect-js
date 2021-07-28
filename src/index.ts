import * as dotenv from "dotenv";
import process from "process";

dotenv.config();

const getAnswer = (): string => {
    return process.env.ANSWER || "42"
}

export { getAnswer }
