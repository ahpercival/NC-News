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

const dataFormatter = (rawData, referenceObject) => {
    if (rawData.length === 0) return []

    const result = rawData.map(data => {
        data.article_id = referenceObject[data.belongs_to]
        delete data.belongs_to
        return data
    })
    return result
}

const renameKeys = (arr, keyToChange, newKey) => {
    let result = []
    if (arr.length === 0) return result;
    const eachArr = arr.forEach(obj => {

        let ents = Object.entries(obj)

        const updatedKey = ents.reduce((accumulator, pairs) => {
            if (pairs[0] === keyToChange) {
                accumulator[newKey] = pairs[1]
            } else {
                accumulator[pairs[0]] = pairs[1]
            }
            return accumulator
        }, {})

        result.push(updatedKey)
    })

    return result
};

module.exports = { formatDate, createRef, dataFormatter, renameKeys }