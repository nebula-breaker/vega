import { DynamicJSON, IHandler } from "../interfaces/IUser";

class HtmlHandler implements IHandler {
  constructor() {
    console.log("HtmlHandler");
  }

  handle(data: DynamicJSON) {
    return `<html><body>${this.formatData(data)}</body></html>`;
  }

  formatData(obj: any, parentKey: string = "") {
    let table =
      '<table width="100%" style="border: 1px solid #333; border-collapse: collapse;" cellpadding="5" cellspacing="2" border="1">';
    for (const [key, value] of Object.entries(obj)) {
      const fullKey = parentKey ? `${parentKey}.${key}` : key;

      if (typeof value === "object" && !Array.isArray(value)) {
        // Recursively handle nested objects
        this.formatData(value, fullKey);
      } else {
        table += `
        <tr>
            <th>${fullKey.toUpperCase()}</th>
            <td>${Array.isArray(value) ? this.formatArray(value) : value}</td>
        </tr>`;
      }
    }

    return table;
  }

  formatArray(arr: any) {
    let list = `<ul>`;
    arr.forEach((item: any) => {
      if (Array.isArray(item)) {
        this.formatArray(item);
      } else {
        list += `<li>${item}</li>`;
      }
    });
    return list + "</ul>";
  }
}

export default HtmlHandler;
