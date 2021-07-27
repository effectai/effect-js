import * as dotenv from "dotenv";
import process from "process";

dotenv.config();

if (process.env.ANSWER){
    const answer: string = process.env.ANSWER
    console.log(answer)
}
