import { memo } from 'react'
import { Draggable } from 'react-beautiful-dnd'

import { AlbumListItem } from '../Album'

const ITEM_HEIGHT = 120

const AlbumList = memo(({ items, showAlbumInfo, selectedItem }) => {
    return items.map((item, index) => (
        <Draggable draggableId={item.id} index={index} key={item.id}>
            {(provided) => (
                <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                    <AlbumListItem
                        item={item}
                        selected={(selectedItem && selectedItem.id === item.id) || false}
                        maxImgHeight={ITEM_HEIGHT}
                        showAlbumInfo={showAlbumInfo}
                    />
                </div>
            )}
        </Draggable>
    ))
})

export default AlbumList
