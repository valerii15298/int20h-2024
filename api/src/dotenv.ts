import dotenv from "dotenv";
import { expand } from "dotenv-expand";
const res1 = dotenv.config({ path: "./.env", processEnv: {} });
const res2 = dotenv.config({ path: "../.env", processEnv: {} });

expand(res2);
expand(res1);
