import writeXlsxFile from "write-excel-file";

export const exportXls = async (internData) => {
    let internObj = []
    let hader_row = [
        {
            value: "Name",
            fontWeight: "bold",
        },
        {
            value: "email",
            fontWeight: "bold",
        },
    ]
    // const HEADER_ROW = [
    //     {
    //         value: "Name",
    //         fontWeight: "bold",
    //     },
    //     {
    //         value: "email",
    //         fontWeight: "bold",
    //     },
    //     {
    //         value: "question",
    //         fontWeight: "bold",
    //     },
    //     {
    //         value: "answer",
    //         fontWeight: "bold",
    //     },
    // ];

    internData.data.data.map((interns, index) => {
        let internArr = []
        let header = []
        const { Email, Name, answers } = interns.attributes
        internArr.push({ type: String, value: Name })
        internArr.push({ type: String, value: Email })
        answers.data.map((internAns, index) => {
            header = [
                {
                    value: "question",
                    fontWeight: "bold",
                },
                {
                    value: "answer",
                    fontWeight: "bold",
                },]
            hader_row = [...hader_row, ...header]
            const question = internAns.attributes.question.data.attributes.Title
            internArr.push({ type: String, value: question })
            internArr.push({ type: String, value: internAns.attributes.Answer })
        })
        internObj[index] = internArr
    })
    const data = [hader_row, ...internObj];
    await writeXlsxFile(data, {
        fileName: "internResults.xlsx",
    });
}