export type ApiClient = {
	get<T>(path: string): Promise<T>;
	post<T>(path: string, body: unknown): Promise<T>;
	delete(path: string): Promise<void>;
};
