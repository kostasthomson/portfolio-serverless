exports.handler = async (event, context) => {
	const allowedOrigin = [
		"https://kostasthomson.github.io",
		"https://kthomasiadis.gr/",
		"http://kthomasiadis.gr/",
	];
	const origin = event.headers.origin || event.headers.referer || "";
	for (const allowed of allowedOrigin) {
		if (!origin.startsWith(allowed)) {
			return {
				statusCode: 403,
				body: "Forbidden: Invalid origin",
			};
		}
	}
	if (event.httpMethod === "OPTIONS") {
		return {
			statusCode: 200,
			headers: {
				"Access-Control-Allow-Origin": origin,
				"Access-Control-Allow-Headers": "Content-Type",
				"Access-Control-Allow-Methods": "GET, POST, OPTIONS",
			},
			body: "",
		};
	}
	return {
		statusCode: 200,
		headers: {
			"Access-Control-Allow-Origin": origin,
		},
		body: JSON.stringify({
			FIREBASE_ApiKey: process.env.FIREBASE_ApiKey,
			FIREBASE_AuthDomain: process.env.FIREBASE_AuthDomain,
			FIREBASE_DatabaseURL: process.env.FIREBASE_DatabaseURL,
			FIREBASE_ProjectId: process.env.FIREBASE_ProjectId,
			FIREBASE_StorageBucket: process.env.FIREBASE_StorageBucket,
			FIREBASE_MessagingSenderId: process.env.FIREBASE_MessagingSenderId,
			FIREBASE_AppId: process.env.FIREBASE_AppId,
			FIREBASE_MeasurementId: process.env.FIREBASE_MeasurementId,
			event,
			context,
		}),
	};
};
