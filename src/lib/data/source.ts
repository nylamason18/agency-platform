export type DataSource = "mock" | "real";

export function isValidSource(v: string | null): v is DataSource {
  return v === "mock" || v === "real";
}
