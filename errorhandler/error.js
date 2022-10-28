process.on('unhandledRejection', error => {
	console.error('Unhandled promise rejection:', error);
});

client.on(Events.ShardError, error => {
	console.error('A websocket connection encountered an error:', error);
});