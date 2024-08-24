import {PDFDocument} from "pdf-lib";
// @ts-ignore
import fontkit from '@pdf-lib/fontkit';
import { saveAs } from 'file-saver'


export default class PDFHelper {

    async mergePDFs(pdf_a: PDFDocument, pdf_b: PDFDocument) {
        // merge action
        const mergedPdf = await PDFDocument.create();
        const copiedPagesA = await mergedPdf.copyPages(pdf_a, pdf_a.getPageIndices());
        copiedPagesA.forEach((page) => mergedPdf.addPage(page));
        const copiedPagesB = await mergedPdf.copyPages(pdf_b, pdf_b.getPageIndices());
        copiedPagesB.forEach((page) => mergedPdf.addPage(page));

        const mergedPdfFileContents = await mergedPdf.save();
        let mergedPdfFile = await PDFDocument.load(mergedPdfFileContents);

        // return
        return {"first": pdf_a, "second": pdf_b, "result": mergedPdfFile};
    }

    async loadTemplate(template_url = "./media/pdf/report_book_entry.pdf") {
        return fetch(template_url)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error: ${response.status}`);
                }
                console.log(response)
                return response.arrayBuffer();
            })
            .catch((err) => console.error(`Fetch problem: ${err.message}`));
    }

    async loadTemplateFont(template_url = "./media/fonts/roboto-mono/roboto-mono-v22-latin-500.ttf") {
        return fetch(template_url)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error: ${response.status}`);
                }
                console.log(response)
                return response.arrayBuffer();
            })
            .catch((err) => console.error(`Fetch problem: ${err.message}`));
    }

    // @ts-ignore
    async createFile(template, args: any) {
        let pdfDoc = await PDFDocument.load(template);
        this._initPDFDocumentFields(pdfDoc).then((pdfDoc) => {
            console.log("beep: ");
            console.log(args)

            pdfDoc.getForm().getTextField("reportbook.apprentice_name").setText(args.name)
            pdfDoc.getForm().getTextField("reportbook.training_year").setText(args.year.toString())
            pdfDoc.getForm().getTextField("reportbook.operational_activities.description").setText(args.content)
            pdfDoc.getForm().getTextField("reportbook.operational_activities.hours").setText("40")

            pdfDoc.save().then(value => {
                saveAs(new Blob([value as BlobPart]), (args.date.start ?? 'eintrag') + ".pdf");
            });
            return 
        });


    }

    async _initPDFDocumentFields(pdfDoc: PDFDocument): Promise<PDFDocument> {
        const page = pdfDoc.getPages()[0];

        const form = pdfDoc.getForm();
        const apprenticeNameField = form.createTextField('reportbook.apprentice_name');
        const trainingYearField = form.createTextField('reportbook.training_year');
        const operationalActivitiesField = form.createTextField('reportbook.operational_activities.description');
        const operationalActivitiesHoursField = form.createTextField('reportbook.operational_activities.hours');

        pdfDoc.registerFontkit(fontkit);
        try {
            const fontBytes = await this.loadTemplateFont();
            // @ts-ignore
            const customFont = await pdfDoc.embedFont(fontBytes);

            // apprentice_name
            apprenticeNameField.acroField.setDefaultAppearance('/' + customFont.name + " 11 Tf");
            apprenticeNameField.setFontSize(11);
            // TODO selbe wie sont im doc aus
            apprenticeNameField.updateAppearances(customFont);
            apprenticeNameField.addToPage(page, {
                x: (page.getWidth() / 2) - 50,
                y: page.getHeight() - 91,
                width: 226,
                height: 15
            });

            // training_year
            trainingYearField.acroField.setDefaultAppearance('/' + customFont.name + " 11 Tf");
            trainingYearField.setFontSize(11);
            trainingYearField.updateAppearances(customFont);
            trainingYearField.addToPage(page, {
                x: (page.getWidth() / 2) - 50,
                y: page.getHeight() - 115,
                width: 39,
                height: 23
            });

            // operational_activities
            operationalActivitiesField.acroField.setDefaultAppearance('/' + customFont.name + " 11 Tf");
            operationalActivitiesField.setFontSize(11);
            operationalActivitiesField.updateAppearances(customFont);
            operationalActivitiesField.addToPage(page, {
                x: 291,
                y: 418,
                width: 308,
                height: 84
            });

            // operational_activities_hours
            operationalActivitiesHoursField.acroField.setDefaultAppearance('/' + customFont.name + " 11 Tf");
            operationalActivitiesHoursField.setFontSize(11);
            operationalActivitiesHoursField.updateAppearances(customFont);
            operationalActivitiesHoursField.addToPage(page, {
                x: 600,
                y: 418,
                width: 52,
                height: 84
            });

            // returning
            return pdfDoc;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}