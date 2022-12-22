export const getAlbumInfo = (albums) => {
    return albums.map((item) => {
        return {
            id: item.id.attributes['im:id'],
            image: item['im:image'][2].label,
            artistFull: item['im:artist'].label,
            artist:
                item['im:artist'].label.length > 40
                    ? `${item['im:artist'].label.substring(0, 40)}...`
                    : item['im:artist'].label,
            titleFull: item['im:name'].label,
            title:
                item['im:name'].label.length > 50
                    ? `${item['im:name'].label.substring(0, 50)}...`
                    : item['im:name'].label,
            link: item.link.attributes.href,
            price: item['im:price'].label,
            releaseDate: item['im:releaseDate'].attributes ? item['im:releaseDate'].attributes.label : '',
            selected: false,
        }
    })
}
