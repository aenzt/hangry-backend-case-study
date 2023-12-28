import { ServerResponse } from "http";

const response = (
  res: ServerResponse,
  statusCode: number,
  message: string,
  data?: any
) => {
  res.writeHead(statusCode, { "Content-Type": "application/json" });
  const responseData = {
    statusCode: statusCode,
    message: message,
    data: data ? data : null,
  };
  res.end(JSON.stringify(responseData));
  return res;
};

export default response;
