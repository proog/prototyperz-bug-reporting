import * as express from "express";
import * as bodyParser from "body-parser";
import * as multer from "multer";
import * as path from "path";
import * as fs from "fs";
import { MongoClient, Db } from "mongodb";
import { DAO } from "./dao";
import { FormReportRendition, FormProjectRendition, Project, AdminReportRendition, AdminReportEntryRendition } from "./models";

interface ProjectRequest extends express.Request {
    project?: Project;
}

async function main() {
    let port = 22171,
        baseUrl = process.env.REPORTBACKBASEURL || "http://localhost:22171",
        payloadBase = path.join(__dirname, "..", "frontendPopup"),
        uploadBase = path.join(__dirname, "uploads"),
        app = express(),
        upload = multer({ dest: uploadBase }),
        db = await MongoClient.connect("mongodb://localhost:27017/bugreporting?autoReconnect=true&bufferMaxEntries=0"),
        dao = new DAO(db);

    app.use(bodyParser.json({ type: "application/json" }));
    app.use("/images", express.static(uploadBase));
    app.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });

    app.param("project", async (req: ProjectRequest, res, next, id) => {
        let project = await dao.getProject(id);

        if (!project) {
            res.sendStatus(404);
            return;
        }

        req.project = project;
        next();
    });
    app.get("/projects/:project", async (req: ProjectRequest, res) => {
        let rendition: FormProjectRendition = {
            id: req.project._id.toHexString(),
            name: req.project.name
        };
        res.send(rendition);
    });
    app.get("/projects/:project/reports", async (req: ProjectRequest, res) => {
        let reports = await dao.getReports(req.project),
            rendition: AdminReportRendition[] = reports.map(report => ({
                id: report._id.toHexString(),
                email: report.email,
                type: report.type,
                entries: report.entries.map(entry => ({
                    userId: entry.userId ? entry.userId.toHexString() : undefined,
                    comment: entry.comment,
                    image: entry.image ? `${baseUrl}/images/${path.basename(entry.image)}` : undefined
                } as AdminReportEntryRendition))
            } as AdminReportRendition));
        res.send(rendition);
    });
    app.post("/projects/:project/reports", upload.single("image"), async (req: ProjectRequest, res) => {
        let report = req.body as FormReportRendition;
        report.image = req.file ? req.file.path : undefined;
        await dao.addReport(req.project, report);
        res.send();
    });
    app.get("/projects/:project/snippet", async (req: ProjectRequest, res) => {
        let snippet = `
            <script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
            <script>window._ReportBackProjectID = ${req.project._id.toHexString()};</script>
            <link rel="stylesheet" href="${baseUrl}/payload/css"></script>
            <script src="${baseUrl}/payload/js"></script>`;
        res.send(snippet);
    });
    app.get("/payload/js", async (req, res) => {
        res.sendFile(path.join(payloadBase, "build.js"));
    });
    app.get("/payload/html", async (req, res) => {
        res.sendFile(path.join(payloadBase, "form.html"));
    });
    app.get("/payload/css", async (req, res) => {
        res.sendFile(path.join(payloadBase, "css", "main.css"));
    });

    app.set("trust proxy", true);
    app.listen(port);
    console.log(`Listening on ${port}`);
}

main();
