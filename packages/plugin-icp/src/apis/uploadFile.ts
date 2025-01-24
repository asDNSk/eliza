import { elizaLogger } from "@elizaos/core";
import { WEB3_STORAGE_API_HOST } from "../constants/apis";
import axios from "axios";
interface UploadResponse {
    success: boolean;
    cid?: string;
    urls?: {
        direct: string;
        raw: string;
        gateway: string;
    };
    type?: string;
    name?: string;
    size?: number;
    error?: string;
}

export async function uploadFileToWeb3Storage(
    base64Data: string,
    fileName: string = "image"
): Promise<UploadResponse> {
    try {
        let base64Content: string;
        let mimeType: string;

        // 判断是否包含 data:image 前缀
        if (base64Data.startsWith("data:")) {
            const matches = base64Data.match(/^data:([^;]+);base64,(.+)$/);
            if (!matches) {
                throw new Error("Invalid base64 format");
            }
            mimeType = matches[1];
            base64Content = matches[2];
        } else {
            // 直接使用 base64 字符串
            base64Content = base64Data;
            mimeType = "image/png";
        }
        const byteCharacters = atob(base64Content);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: "image/png" });
        const formData = new FormData();
        formData.append("file", blob);
        const response = await axios.post(WEB3_STORAGE_API_HOST, formData);
        if (response.status !== 200) {
            throw new Error(`Upload failed with status: ${response.status}`);
        }
        const result: UploadResponse = response.data;
        return result;
    } catch (error) {
        return {
            success: false,
            error: error instanceof Error ? error.message : "upload failed",
        };
    }
}
