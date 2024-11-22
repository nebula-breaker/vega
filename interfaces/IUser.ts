export type DynamicJSON = Record<string, any>;
export type IOutput = "html" | "json" | "text" | "csv";

export interface IHandler {
  handle(data: DynamicJSON): string | DynamicJSON;
}
