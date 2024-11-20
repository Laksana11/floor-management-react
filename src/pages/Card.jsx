import React from 'react'
import { useDrag } from 'react-dnd'

/**
 * Your Component
 */
export const  Card = ({ id, name }) => {
    const [{ isDragging }, dragRef] = useDrag({
        type: 'pet',
        item: { id, name },
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    })
    return (
        <div 
            className={`pet-card p-4 border rounded-lg shadow-md cursor-pointer transition-transform transform ${
                isDragging ? 'bg-yellow-200 scale-105' : 'bg-white'
            }`} 
            ref={dragRef}
        >
            {name}
            {isDragging && <span className="ml-2">😱</span>}
        </div>
    )
}