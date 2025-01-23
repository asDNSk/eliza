import { WEB3_STORAGE_API_HOST } from "../constants/apis";

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
        // Extract MIME type from base64 data
        const mimeType =
            base64Data.match(/^data:([^;]+);base64,/)?.[1] || "image/png";

        // Add file extension based on MIME type if fileName doesn't have one
        const extension = mimeType.split("/")[1];
        const fileNameWithExt = fileName.includes(".")
            ? fileName
            : `${fileName}.${extension}`;

        // Convert base64 to Blob directly
        const base64Response = await fetch(base64Data);
        const blob = await base64Response.blob();

        // Create form data and append file
        const formData = new FormData();
        formData.append("file", blob, fileNameWithExt);

        const response = await fetch(WEB3_STORAGE_API_HOST, {
            method: "POST",
            body: formData,
        });

        if (!response.ok) {
            throw new Error(`Upload failed with status: ${response.status}`);
        }

        const result: UploadResponse = await response.json();
        return result;
    } catch (error) {
        return {
            success: false,
            error: error instanceof Error ? error.message : "upload failed",
        };
    }
}
