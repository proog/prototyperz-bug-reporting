import { ObjectID } from "mongodb";

interface MongoDocument {
    _id?: ObjectID;
}

export type ReportType = "feature" | "bug";

export interface User extends MongoDocument {
    email: string;
    password: string;
}

export interface Project extends MongoDocument {
    userId?: ObjectID;
    name: string;
}

export interface Report extends MongoDocument {
    projectId?: ObjectID;
    type: ReportType;
    email?: string;
    entries: ReportEntry[];
}

export interface ReportEntry {
    userId?: ObjectID;
    comment?: string;
    image?: string;
}

export interface FormReportRendition {
    type: ReportType;
    email?: string;
    comment?: string;
    image?: string;
}

export interface FormProjectRendition {
    id: string;
    name: string;
}
