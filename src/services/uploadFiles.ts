import axios from "axios";

const ENPOINT = "/upload-files";

export const uploadFile = async (accessToken: string, paths: string[], base64Files: string[], name: string) => {
	try {
		const response = await axios.post(ENPOINT, 
			{ paths, base64Files, name },
			{
			headers: {
				'Authorization': `Bearer ${accessToken}`,
				'Content-Type': 'application/json',
			},
			}
		);
		return response.data;
	} catch (error: unknown) {
		if (axios.isAxiosError(error)) {
			console.error("Server error message:", error.response?.data.message);
			throw new Error(error.response?.data.message || "An unknown error occurred");
		} else {
			console.error("Error message:", (error as Error).message);
			throw new Error(`Error: ${(error as Error).message}`);
		}
	}
};
