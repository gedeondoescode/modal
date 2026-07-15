import express, { type Express, type Request, type Response } from "express";
import cors from "cors";
import helmet from "helmet";

import { httpLogger, logger } from "./utils/logger.ts";
import restRouter from "./rest/index.ts";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./utils/auth.ts";

const app: Express = express();
const port = Number(process.env.PORT ?? 5000);

// Must be set to work behind a reverse proxy system
app.set("trust proxy", 1);
app.use(
  cors({
    origin: process.env.BETTER_AUTH_URL,
    credentials: true,
  }),
);
app.use(helmet());

app.all("/rest/auth/{*any}", toNodeHandler(auth));

app.use(express.json());
app.use(httpLogger);

app.use("/rest", restRouter);

app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({
    result: true,
    message: "Health OK",
  });
});

app.listen(port, () => {
  logger.info({ port }, "Server listening");
});
