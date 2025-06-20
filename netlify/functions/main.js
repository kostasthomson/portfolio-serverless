exports.handler = async (event, context) => {
	const allowedOrigins = [
		"https://kostasthomson.github.io",
		"https://kthomasiadis.gr",
		"http://kthomasiadis.gr",
	];

	const origin = event.headers.origin || "";

	// Validate origin
	const isAllowedOrigin = allowedOrigins.some((allowed) =>
		origin.startsWith(allowed)
	);

	if (!isAllowedOrigin) {
		return {
			statusCode: 403,
			body: "Forbidden: Invalid origin " + origin,
		};
	}

	// Handle preflight request
	if (event.httpMethod === "OPTIONS") {
		return {
			statusCode: 200,
			headers: {
				"Access-Control-Allow-Origin": origin,
				"Access-Control-Allow-Headers": "Content-Type",
				"Access-Control-Allow-Methods": "POST, OPTIONS",
			},
			body: "",
		};
	}

	// Reject other methods
	if (event.httpMethod !== "POST") {
		return {
			statusCode: 405,
			headers: {
				Allow: "POST, OPTIONS",
				"Access-Control-Allow-Origin": origin,
			},
			body: "Method Not Allowed",
		};
	}

	// Return Firebase config
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
		}),
	};
};
