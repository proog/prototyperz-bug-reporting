import * as express from "express";
import * as bodyParser from "body-parser";
import * as path from "path";
import { MongoClient, Db} from "mongodb";
import { DAO } from "./dao";
import { FormReportRendition, FormProjectRendition, Project } from "./models";

interface ProjectRequest extends express.Request {
    project?: Project;
}

async function main() {
    let port = 22171,
        payloadBase = path.join(__dirname, "..", "frontendPopup"),
        app = express(),
        db = await MongoClient.connect("mongodb://localhost:27017/bugreporting?autoReconnect=true&bufferMaxEntries=0"),
        dao = new DAO(db);

    app.use(bodyParser.json({ type: "*/*" }));
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
    app.post("/projects/:project/reports", async (req: ProjectRequest, res) => {
        let report = req.body as FormReportRendition;
        await dao.addReport(req.project, report);
        res.send();
    });
    app.get("/projects/:project/snippet", async (req: ProjectRequest, res) => {
        let snippet = `
            <script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
            <script>window._ReportBackProjectID = ${req.project._id.toHexString()};</script>`;
        res.send(snippet);
    });
    app.get("/payload/js", async (req, res) => {
        res.sendFile(path.join(payloadBase, "build.js"));
    });
    app.get("/payload/html", async (req, res) => {
        res.sendFile(path.join(payloadBase, "form.html"));
    });
    app.get("/payload/css", async (req, res) => {
        res.sendFile(path.join(payloadBase, "form.css"));
    });

    app.set("trust proxy", true);
    app.listen(port);
    console.log(`Listening on ${port}`);
}

main();
