const formatDate = (array) => {
    if (array.length === 0) return []

    const newArr = []

    array.forEach(obj => {
        const newObj = { ...obj }
        newArr.push(newObj)
    })

    return newArr.map(article => {
        article.created_at = new Date(article.created_at)
        return article
    })

}

const createRef = (arrayOfData, desiredKey, desiredValue) => {
    if (arrayOfData.length === 0) return {}

    const referenceObject = arrayOfData.reduce((accumulator, inputObjects) => {
        if (desiredKey === undefined && desiredValue === undefined) {
            const values = Object.values(inputObjects)
            accumulator[values[0]] = values[1]
            return accumulator
        } else {
            accumulator[inputObjects[desiredKey]] = inputObjects[desiredValue]
            return accumulator
        }

    }, {})

    return referenceObject
};


module.exports = { formatDate, createRef }