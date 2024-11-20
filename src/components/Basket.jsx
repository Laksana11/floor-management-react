import React, { useState } from 'react'
import { useDrop } from 'react-dnd';
import { Card } from '../pages/Card';

const PETS = [
    { id: 1, name: 'dog' },
    { id: 2, name: 'cat' },
    { id: 3, name: 'fish' },
    { id: 4, name: 'hamster' },
]

export const Basket = () => {
    const [basket, setBasket] = useState([])
    const [{ isOver }, dropRef] = useDrop({
        accept: 'pet',
        drop: (item) => setBasket((basket) => 
                            !basket.includes(item) ? [...basket, item] : basket),
        collect: (monitor) => ({
            isOver: monitor.isOver()
        })
    })

    return (
        <React.Fragment>
            <div className="pets grid grid-cols-2 gap-4 p-4 border rounded-lg bg-gray-100">
                {PETS.map(pet => (
                    <Card draggable id={pet.id} name={pet.name} key={pet.id} />
                ))}
            </div>
            <div 
                className={`basket p-6 mt-4 border rounded-lg transition-transform transform ${
                    isOver ? 'bg-green-200 scale-105' : 'bg-gray-50'
                }`} 
                ref={dropRef}
            >
                {basket.map(pet => (
                    <Card id={pet.id} name={pet.name} key={pet.id} />
                ))}
                {isOver && <div className="text-center text-green-700 mt-2">Drop Here!</div>}
            </div>
        </React.Fragment>
    )
}