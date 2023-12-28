import { IncomingMessage, ServerResponse } from "http";

const errorResponse = (
  res: ServerResponse,
  statusCode: number,
  error: any
) => {
  res.writeHead(statusCode, { "Content-Type": "application/json" });
  const response = {
    statusCode: statusCode,
    error: error,
  };
  res.end(JSON.stringify(response));
  return res;
};

export default errorResponse;
