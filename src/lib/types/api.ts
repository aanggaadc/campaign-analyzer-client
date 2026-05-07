export type ApiClient = {
	get<T>(path: string): Promise<T>;
	getBlob(path: string): Promise<Response>;
	post<T>(path: string, body: unknown): Promise<T>;
	upload<T>(path: string, body: FormData): Promise<T>;
	delete(path: string): Promise<void>;
};
