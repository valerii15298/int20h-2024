import { config } from "dotenv";
import { expand } from "dotenv-expand";
const res1 = config({ path: "./.env", processEnv: {} });
const res2 = config({ path: "../.env", processEnv: {} });

expand(res2);
expand(res1);
