import writeXlsxFile from "write-excel-file";

export const exportXls = async (internData, questionsList) => {
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
    console.log(questionsList);
    const exportAnswersLen = questionsList.data.data.length
    for (let index = 0; index < exportAnswersLen; index++) {
        const header = [
            {
                value: "question",
                fontWeight: "bold",
            },
            {
                value: "answer",
                fontWeight: "bold",
            },
        ]
        hader_row = [...hader_row, ...header]
    }
    internData.data.data.map((interns, index) => {
        let internArr = []

        const { Email, Name, answers } = interns.attributes
        internArr.push({ type: String, value: Name })
        internArr.push({ type: String, value: Email })
        answers.data.map((internAns, index) => {
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