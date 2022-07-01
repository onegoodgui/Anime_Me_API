export var serviceErrorToStatusCode = {
    unauthorized: 401,
    notFound: 404,
    conflict: 409,
    unprocessableEntity: 422
};
function unauthorizedError(customMessage) {
    return {
        type: "unauthorized",
        message: customMessage ? customMessage : "Unautohrized"
    };
}
function conflictError(customMessage) {
    return {
        type: "conflict",
        message: customMessage ? customMessage : "Conflict"
    };
}
function notFoundError(customMessage) {
    return {
        type: "notFound",
        message: customMessage ? customMessage : "Not found"
    };
}
function unprocessableEntityError(customMessage) {
    return {
        type: "unprocessableEntity",
        message: customMessage ? customMessage : "Unprocessable Entity"
    };
}
export var errorTypes = {
    unauthorizedError: unauthorizedError,
    conflictError: conflictError,
    notFoundError: notFoundError,
    unprocessableEntityError: unprocessableEntityError
};
