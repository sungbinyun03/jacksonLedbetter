const { app } = require("@azure/functions");

app.http('message', {
	methods: ['GET', 'OPTIONS'],
	authLevel: 'anonymous',
	route: 'message',
	handler: async (request) => {
		if (request.method === 'OPTIONS') {
			return {
				status: 200,
				headers: {
					'Access-Control-Allow-Origin': '*',
					'Access-Control-Allow-Methods': 'GET, OPTIONS',
					'Access-Control-Allow-Headers': 'Content-Type'
				}
			};
		}

		return {
			status: 200,
			headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' },
			body: JSON.stringify({ ok: true, message: 'Hello from Functions' })
		};
	}
});


