import { IncomingMessage } from "http";

const bindBody: Function = async (
  req: IncomingMessage
): Promise<Object | null> => {
  return new Promise((resolve, reject) => {
    let body: string = "";

    // Bind body to request
    try {
      req.on("data", (chunk) => {
        body += chunk.toString();
      });

      req.on("end", () => {
        if (body) {
          resolve(JSON.parse(body));
        } else {
          resolve(null);
        }
      });
    } catch (error) {
      reject(error);
    }
  });
};

export { bindBody };
