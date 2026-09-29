// Minimal D1 typings. The full @cloudflare/workers-types package redeclares
// DOM globals (e.g. Response.json) and breaks type checking of the app.
interface D1Meta {
  changes?: number;
}
interface D1Result<T = unknown> {
  results: T[];
  success: boolean;
  meta: D1Meta;
}
interface D1PreparedStatement {
  bind(...values: unknown[]): D1PreparedStatement;
  first<T = unknown>(): Promise<T | null>;
  run(): Promise<D1Result>;
  all<T = unknown>(): Promise<D1Result<T>>;
}
interface D1Database {
  prepare(query: string): D1PreparedStatement;
}
interface Fetcher {
  fetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response>;
}
