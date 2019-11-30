import XLSX from "xlsx";
import { saveAs } from "file-saver";

export const arrayToXlsx = <T>(data: T[], filename: string) => {
  /* make the worksheet */
  let ws = XLSX.utils.json_to_sheet(data);

  /* add to workbook */
  let wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, filename);

  /* write workbook (use type 'binary') */
  let wbout = XLSX.write(wb, { bookType: "xlsx", type: "binary" });

  /* generate a download */
  function s2ab(s: any) {
    let buf = new ArrayBuffer(s.length);
    let view = new Uint8Array(buf);
    for (let i = 0; i !== s.length; ++i) view[i] = s.charCodeAt(i) & 0xff;
    return buf;
  }

  const isodate = new Date()
    .toISOString()
    .substring(0, 16)
    .replace(":", "-");

  saveAs(
    new Blob([s2ab(wbout)], { type: "application/octet-stream" }),
    `${filename}-${isodate}.xlsx`
  );
};
