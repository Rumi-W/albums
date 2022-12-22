export const filterByKey = (items, key) => {
    const regexKey = new RegExp(key, 'i')
    return items.filter((item) => item.artist.match(regexKey) || item.title.match(regexKey))
}

export const toggleSelection = (albums, selectedId) =>
    albums.map((item) => {
        if (item.id === selectedId) {
            item.selected = !item.selected
        }
        return item
    })
