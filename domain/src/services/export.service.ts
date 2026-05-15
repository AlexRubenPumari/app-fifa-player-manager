export interface ExportService {
  generateCSV<TRow>(options: { data: TRow[] }): string;
  generateExcel<TRow>(options: { data: TRow[]; fileName: string }): Promise<void>;
}