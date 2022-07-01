import { serviceErrorToStatusCode } from "../utils/errorUtils.js";
export default function errorHandlerMiddleware(err, req, res, next) {
    if (err.type) {
        return res.status(serviceErrorToStatusCode[err.type]).send(err.message);
    }
    res.sendStatus(500);
}
