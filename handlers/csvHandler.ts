import { DynamicJSON, IHandler } from "../interfaces/IUser";

class CsvHandler implements IHandler {
  constructor() {
    console.log("CsvHandler");
  }

  handle(data: DynamicJSON) {
    const flatObj = this.flattenObject(data);
    const headers = Object.keys(flatObj).join(","); // CSV headers
    const values = Object.values(flatObj)
      .map((value) => {
        if (Array.isArray(value)) {
          let arItem = "";
          value.forEach((item) => {
            arItem += `"${item.replace(/"/g, '""')}"`;
          });
        }
        // Escape commas and quotes for CSV formatting
        if (typeof value === "string") {
          return `"${value.replace(/"/g, '""')}"`; // Escape double quotes in strings
        }
        return value;
      })
      .join(","); // Join the values for the CSV row

    return `${headers}\r\n${values}`;
  }

  flattenObject(
    obj: any,
    parentKey: string = "",
    result: DynamicJSON = {}
  ): DynamicJSON {
    for (const [key, value] of Object.entries(obj)) {
      const fullKey = parentKey ? `${parentKey}.${key}` : key;

      if (typeof value === "object" && !Array.isArray(value)) {
        this.flattenObject(value, fullKey, result);
      } else {
        result[fullKey] = Array.isArray(value) ? JSON.stringify(value) : value;
      }
    }
    return result;
  }
}

export default CsvHandler;
