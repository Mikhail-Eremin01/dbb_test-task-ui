export interface IFileObject {
	".tag": string;
	name: string;
	path_lower: string;
	path_display: string;
	id: string;
	client_modified: string;
	server_modified: string;
	rev: string;
	size: number;
	is_downloadable: boolean;
	content_hash: string;
	fullImagebase64: string;
	filesCount?: number
}

export interface IDeletedItem {
	".tag": "deleted";
	name: string;
	path_lower: string;
	path_display: string;
	type: "file" | "folder";
	size?: number;
  }