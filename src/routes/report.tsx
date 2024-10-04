import express, { Router } from "express";
import { logger } from "middleware/logger";
import { validate } from "class-validator";
import { plainToClass } from "class-transformer";

import React from "react";
import ReactPDF from "@react-pdf/renderer";
import "reflect-metadata";
import Report from "components/pages/Report";
import { GenderType, PersonalInfoDTO } from "models/personalInfo";
import { EvaluationDTO, SarcopeniaDTO } from "models/sarcopenia";
import PDFStyle from "assets/PDFStyle";
import { Document, Page } from "@react-pdf/renderer";

const router: Router = express.Router();
router.post("/", (req, res) => {
  try {
    logger.info("POST /report");

    // parameter test
    if ("personalInfo" in req.body === false) {
      res.setHeader("Content-Type", "application/json");
      logger.error("personalInfo object is undefined");
      return res.status(400).json({
        message: "personalInfo object is undefined",
      });
    } else if ("evaluations" in req.body === false) {
      res.setHeader("Content-Type", "application/json");
      logger.error("evaluations object is undefined");
      return res.status(400).json({
        message: "evaluations object is undefined",
      });
    }

    // validation request
    let personalInfoDTO = plainToClass(PersonalInfoDTO, req.body.personalInfo);
    let evaluationDTO = plainToClass(EvaluationDTO, req.body.evaluations);

    const getErrorMessage = (dtoName, errors, errorMessageList) => {
      errors?.reduce((origin, ele) => {
        if ("constraints" in ele) {
          Object.keys(ele.constraints).map((key) => {
            // prettier-ignore
            origin.push(`${dtoName}` + ": " + `${ele.constraints[key]}`);
          });
          return origin;
        } else if ("children" in ele) {
          if (ele.children.length > 0) {
            getErrorMessage(dtoName, ele.children, errorMessageList);
          }
        } else {
          // do nothing
        }
      }, errorMessageList);
    };
    let validatePersonalInfo = validate(personalInfoDTO).then((errors) => {
      if (errors.length > 0) {
        let dtoName = "personalInfo";
        let errorMessageList = [];

        getErrorMessage(dtoName, errors, errorMessageList);
        throw errorMessageList;
      }
    });
    let validateEvaluationDTO = validate(evaluationDTO).then((errors) => {
      if (errors.length > 0) {
        let dtoName = "evaluations";
        let errorMessageList = [];

        getErrorMessage(dtoName, errors, errorMessageList);
        throw errorMessageList;
      }
    });

    Promise.all([validatePersonalInfo, validateEvaluationDTO])
      .then(async () => {
        // create pdf
        const pdfStream = await ReactPDF.renderToStream(
          <Document>
            <Page size={"A4"} style={PDFStyle.page}>
              <Report
                personalInfo={req.body.personalInfo}
                evaluations={req.body.evaluations}
              ></Report>
            </Page>
          </Document>
        );
        res.setHeader("Content-Type", "application/pdf");
        pdfStream.pipe(res);
        pdfStream.on("end", () => logger.info("Done Streaming"));
      })
      .catch((err) => {
        logger.error(`${err}`);
        res.status(400).json({
          message: `${err}`,
        });
      });
  } catch (err) {
    logger.error("Server Error");
    res.status(500).send({
      message: "Server Error",
    });
  }
});

export default router;
