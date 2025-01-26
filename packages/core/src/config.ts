import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootPath = path.resolve(__dirname, "../../../");

function loadEnv() {
    // 1. 加载默认环境变量
    dotenv.config({
        path: path.join(rootPath, ".env"),
    });

    // 2. 加载环境特定配置
    if (process.env.NODE_ENV) {
        dotenv.config({
            path: path.join(rootPath, `.env.${process.env.NODE_ENV}`),
            override: true,
        });
    }

    // 3. 加载本地默认覆盖
    dotenv.config({
        path: path.join(rootPath, ".env.local"),
        override: true,
    });

    // 4. 加载环境特定的本地覆盖
    if (process.env.NODE_ENV) {
        dotenv.config({
            path: path.join(rootPath, `.env.${process.env.NODE_ENV}.local`),
            override: true,
        });
    }

    // Debug输出（可选）
    if (process.env.DEBUG) {
        console.log("Environment:", process.env.NODE_ENV);
        console.log("Loaded env files from:", rootPath);
    }
}

loadEnv();
