import writeXlsxFile from "write-excel-file";

export const exportXls = async (internData) => {
    const intern = []

    const HEADER_ROW = [
        {
            value: "Name",
            fontWeight: "bold",
        },
        {
            value: "email",
            fontWeight: "bold",
        },
        {
            value: "question",
            fontWeight: "bold",
        },
        {
            value: "answer",
            fontWeight: "bold",
        },
    ];

    const DATA_ROW_1 = [
        // "Name"
        {
            type: String,
            value: "John Smith",
        },

        // "Date of Birth"
        {
            type: Date,
            value: new Date(),
            format: "mm/dd/yyyy",
        },
    ];

    internData.data.data.map(interns => {
        const { email, name, answers } = interns
        intern.push({ type: String, value: name })
        intern.push({ type: String, value: email })
        interns.attributes.answers.data.map(internAns => {
            intern.push({ type: String, value: internAns.Answer })
            const question = internAns.attributes.question.data.attributes.title
            intern.push({ type: String, value: question })

        })

    })
    const data = [HEADER_ROW, intern];
    console.log(data);
    await writeXlsxFile(data, {
        //
        // columns, // (optional) column widths, etc.
        fileName: "file.xlsx",
    });
}