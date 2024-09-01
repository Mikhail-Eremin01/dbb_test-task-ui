import axios from "axios";

const ENPOINT = "/delete-files";

export const deleteFile= async (accessToken: string, paths: string[]) => {
	try {
		const response = await axios.delete(ENPOINT, {
			headers: {
				'Authorization': `Bearer ${accessToken}`,
				'Content-Type': 'application/json'
			},
			  data: { paths }
		});
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
