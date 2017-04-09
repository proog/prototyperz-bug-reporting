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

    app.use(bodyParser.json({ type: "*/*" }));
    app.set("trust proxy", true);
    app.listen(port);
    console.log(`Listening on ${port}`);
}

main();
