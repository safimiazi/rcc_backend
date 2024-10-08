import { config } from "dotenv";
import { bool, cleanEnv, port, str } from "envalid";
config({ path: `.env.development.local` });

export function configureEnv() {
  return cleanEnv(process.env, {
    BASE_URL: str(),
    NODE_ENV: str(),
    PORT: port({ devDefault: 5000 }),
    SECRET_KEY: str(),
    ORIGIN: str({ devDefault: "*" }),
    CREDENTIALS: bool({ default: false }),
    LOG_FORMAT: str({
      default:
        ":date[web] :method :url :status :res[content-length] - :response-time ms",
    }),
    DATABASE_HOST: str({ default: "localhost" }),
    DATABASE_NAME: str(),
    DATABASE_PASSWORD: str({ devDefault: "" }),
    DATABASE_USER: str({ devDefault: "root" }),
    DATABASE_PORT: port({ default: 3306 }),
    STORE_SANDBOX_SSL: bool({ default: false }),
    STORE_PASSWORD_SSL: str(),
    STORE_ID_SSL: str(),
  });
}

export const ENV = configureEnv();
