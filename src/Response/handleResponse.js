export const createError = (status, message) => {
	const err = new Error();
	err.status = status;
	err.message = message;
	return err;
}

export const responseDataSuccess = (statusCode, messages, data) => {
 	const response = {status: "Success", code: statusCode, message: messages, data};
 	console.log(response);
 	return response;
}

export const responseSuccess = (statusCode, messages) => {
	const response = {status: "Success", code: statusCode, message: messages};
	console.log(response);
 	return response;
 }