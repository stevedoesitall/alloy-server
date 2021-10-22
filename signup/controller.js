import { Buffer } from "node:buffer";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const workflowSecret = process.env.WORKFLOW_SECRET;
const workflowToken = process.env.WORKFLOW_TOKEN;

const authorization = "Basic " + Buffer.from(`${workflowToken}:${workflowSecret}`, "utf8").toString("base64");

const controller = {
    async user(req, res) {
        const data = await fetch("https://sandbox.alloy.co/v1/evaluations", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": authorization
            },
            body: JSON.stringify(req.body)
        });

        if (data.status >= 400) {
            return res.status(data.status).json({
                error: data.statusText
            });
        };

        const response = await data.json()
    
        return res.status(200).json({
            ok: true,
            response: response.summary
        });
    }
};

export default controller;