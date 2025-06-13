exports.handler = async (event, context) => {
	console.log("Event: ", event);
	console.log("Context: ", context);
	return {
		statusCode: 200,
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
