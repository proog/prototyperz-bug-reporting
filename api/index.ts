import * as express from "express";
import * as bodyParser from "body-parser";
import { MongoClient, Db} from "mongodb";
import { DAO } from "./dao";
import { FormReportRendition, FormProjectRendition } from "./models";

async function main() {
    let app = express(),
        port = 22171,
        db = await MongoClient.connect("mongodb://localhost:27017/bugreporting?autoReconnect=true&bufferMaxEntries=0"),
        dao = new DAO(db);

    app.use(bodyParser.json({ type: "*/*" }));
    app.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });

    app.get("/projects/:projectId", async (req, res) => {
        let project = await dao.getProject(req.param("projectId"));

        if (!project) {
            res.send(404);
            return;
        }

        let rendition: FormProjectRendition = {
            id: project._id.toHexString(),
            name: project.name
        };
        res.send(rendition);
    });
    app.post("/projects/:projectId/reports", async (req, res) => {
        let project = await dao.getProject(req.param("projectId")),
            report = req.body as FormReportRendition;

        if (!project) {
            res.send(404);
            return;
        }

        await dao.addReport(project, report);
        res.send();
    });

    app.set("trust proxy", true);
    app.listen(port);
    console.log(`Listening on ${port}`);
}

main();
