interface Report {
    id: string;
    type: ReportType;
    email?: string;
    entries: ReportEntry[];
}
