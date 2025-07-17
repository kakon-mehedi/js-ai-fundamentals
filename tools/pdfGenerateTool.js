const { Tool } = require("langchain/tools");

const pdfGenerateTool = new Tool({
    name: 'generatePdf',
    description: 'Generate a PDF from given weather report',
    func: async (text) => {
        const doc = new PDFDocument();
        const filePath = './weather_report.pdf';
        doc.pipe(fs.createWriteStream(filePath));
        doc.fontSize(20).text('Weather Report', { align: 'center' });
        doc.moveDown().fontSize(14).text(text);
        doc.end();
        return filePath;
    },
});


module.exports = {
    pdfGenerateTool
}