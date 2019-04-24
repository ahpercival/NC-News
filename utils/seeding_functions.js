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


module.exports = { formatDate } 