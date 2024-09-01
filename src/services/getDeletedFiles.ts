import axios from 'axios';

const ENPOINT = '/get-deleted-files';

export const getDeletedFiles = async (accessToken: string, subfolder: string) => {
	try {
	const response = await axios.get(ENPOINT, {
		params: { accessToken, subfolder }
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