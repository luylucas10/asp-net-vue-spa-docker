const { defineConfig } = require("@vue/cli-service");
const fs = require("fs");
const path = require("path");
console.log("tá no vue.config");
console.log("variavel de ambiente: "+process.env.NODE_ENV);
if (process.env.NODE_ENV === "development") {
	const baseFolder = process.env.APPDATA !== undefined && process.env.APPDATA !== "" ? `${process.env.APPDATA}/ASP.NET/https` : `${process.env.HOME}/.aspnet/https`;

	const certificateArg = process.argv.map(arg => arg.match(/--name=(?<value>.+)/i)).filter(Boolean)[0];
	const certificateName = certificateArg ? certificateArg.groups.value : "vue-client-app";

	if (!certificateName) {
		console.error("Invalid certificate name. Run this script in the context of an npm/yarn script or pass --name=<<app>> explicitly.");
		process.exit(-1);
	}

	const certFilePath = path.join(baseFolder, `${certificateName}.pem`);
	const keyFilePath = path.join(baseFolder, `${certificateName}.key`);

	module.exports = defineConfig({
		transpileDependencies: true,
		devServer: {
			port: 5002,
			server: {
				type: "https",
				options: {
					key: fs.readFileSync(keyFilePath),
					cert: fs.readFileSync(certFilePath)
				}
			},
			client: {
				webSocketURL: {
					hostname: "0.0.0.0",
					pathname: "/ws",
					password: "dev-server",
					port: 5002,
					protocol: "ws",
					username: "webpack"
				}
			},
			proxy: {
				'^/api': {
					target: "https://localhost:7092"
				}
			}
		}
	});

}
