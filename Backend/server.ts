import app from "./src/app";
import { envConfig } from "./src/config/env.config";

function startServer() {
  const port = envConfig.port || 3000;
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
}
startServer();
