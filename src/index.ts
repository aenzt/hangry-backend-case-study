import { IncomingMessage, Server, ServerResponse, createServer } from "http";
import controller from "./controllers";

const server: Server = createServer(
  (req: IncomingMessage, res: ServerResponse) => {
    controller(req, res);
  }
);

const port = 4321;

server.listen(port, () => console.log(`Server listening on ${port}`));
