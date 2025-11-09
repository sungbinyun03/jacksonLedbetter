import "./functions/saveConfig.js";
import "./functions/message.js";
const app = require("@azure/functions");

app.setup({
	enableHttpStream: true,
})