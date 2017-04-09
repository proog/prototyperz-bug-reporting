import * as _ from "lodash";
import { Db, ObjectID } from "mongodb";
import { Project, Report, ReportEntry, User, FormReportRendition } from "./models";

export class DAO {
    constructor(private db: Db) { }

    async getProject(id: string) {
        return await this.projects.findOne({
            _id: new ObjectID(id)
        }) as Project;
    }

    async getReports(project: Project) {
        return await this.reports.find({
            projectId: project._id
        }).toArray() as Report[];
    }

    async addReport(project: Project, rendition: FormReportRendition) {
        let report: Report = {
            projectId: project._id,
            type: rendition.type,
            email: rendition.email,
            entries: [{
                comment: rendition.comment,
                image: rendition.image
            }]
        };
        await this.reports.insertOne(report);
    }

    private get projects() {
        return this.db.collection("projects");
    }

    private get reports() {
        return this.db.collection("reports");
    }
}
