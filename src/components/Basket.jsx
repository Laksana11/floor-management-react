import React, { useState } from 'react'
import { useDrop } from 'react-dnd';
import { Card } from '../pages/Card';
import { ReactComponent as Mid } from './../assets/Mid.svg'
import { ReactComponent as Table } from './../assets/Table.svg'
import {ReactComponent as Plus } from './../assets/Plus.svg'
import {ReactComponent as Minus } from './../assets/Minus.svg'
import {ReactComponent as Copy } from './../assets/Copy.svg'
import {ReactComponent as Trash } from './../assets/trash.svg'
import {ReactComponent as Move } from './../assets/Move.svg'
import {ReactComponent as Rotate } from './../assets/Rotate.svg'
import { v4 as uuidv4 } from 'uuid';
import { Switch } from '@mui/material';


const TABLES = [
    { id: 1, name: 'Mid', image: "Mid", minCover:  1, maxCover: 1,height: 150, width:150, x: 0, y: 0, online: true},
    { id: 2, name: 'Table', image: "Table", minCover:  1, maxCover: 1,height: 150, width:150, x: 0, y: 0,  online: true},
];


let extendedTables = TABLES.map((table) => ({
    ...table,
    generatedId: uuidv4(), 
    minCover: table.minCover, 
    maxCover:table.maxCover, 
    height: table.height, 
    width: table.width, 
    transform: 'rotate(0deg)',        
    transformOrigin: 'center center',
    x: 0, 
    y: 0,
    online: true 
}));


export const Basket = () => {
    const [basket, setBasket] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);  
    const [editableItem, setEditableItem] = useState(null); 
    
    const handleCoverChange = (type, action) => {
        setEditableItem((prevState) => {
            const updatedValue = action === 'increase' ? (prevState[type] + 1) : (prevState[type] - 1);
            return {
                ...prevState,
                [type]: updatedValue < 0 ? 0 : updatedValue, 
            };
        });
    };

    const [{ isOver }, dropRef] = useDrop({
        accept: 'table',
        drop: (item, monitor) => {
            const offset = monitor.getClientOffset();
            const basketBounds = document.querySelector('.basket').getBoundingClientRect();

            const x = offset.x - basketBounds.left;
            const y = offset.y - basketBounds.top;

            const droppedTableIndex = extendedTables.findIndex((table) => table.id === item.id);

            if (droppedTableIndex !== -1) {
                const droppedTable = extendedTables[droppedTableIndex];
                const newTable = {
                    ...droppedTable,
                    generatedId: uuidv4(), 
                    x: Math.max(0, x), 
                    y: Math.max(0, y), 
                    width: 150,  
                    height: 150,
                };

                setBasket((prevBasket) => [...prevBasket, newTable]);
               

                extendedTables[droppedTableIndex] = {
                    ...droppedTable,
                    x,
                    y,
                };
            }
        },

        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
    });

    const handleClick = (table) => {
        setSelectedItem(table);
        setEditableItem({...table});  
    };
    const handleMove = (table) => {
        const onMouseMove = (event) => {
            const basketElement = document.querySelector('.basket'); // Assuming the basket is the container
            const basketBounds = basketElement.getBoundingClientRect();
    
            // Calculate the new coordinates for the table
            const newX = event.clientX - basketBounds.left - table.width / 2;
            const newY = event.clientY - basketBounds.top - table.height / 2;
    
            // Update the table's position
            const updatedTable = { ...table, x: newX, y: newY };
    
            setBasket((prevBasket) =>
                prevBasket.map((t) =>
                    t.generatedId === table.generatedId ? updatedTable : t
                )
            );
        };
    
        const onMouseUp = () => {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        };
    
        // Attach event listeners
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    };
    
    const handleCopy = (table) => {
        const newTable = {
            ...table,
            generatedId: uuidv4(), // Assign a new unique ID for the copied table
            x: table.x + 20, // Slightly offset the copied table
            y: table.y + 20,
        };
        setBasket((prevBasket) => [...prevBasket, newTable]);
    };
    const handleDelete = (table) => {
        setBasket((prevBasket) =>
            prevBasket.filter((t) => t.generatedId !== table.generatedId)
        );
        setSelectedItem(null); // Clear selection after deletion
    };
    const handleRotate = (table) => {
        const onMouseMove = (event) => {
            const basketElement = document.querySelector('.basket'); // Assuming the basket is the parent container
            const basketBounds = basketElement.getBoundingClientRect();
    
            // Calculate the center of the table in absolute screen coordinates
            const centerX = basketBounds.left + table.x + table.width / 2;
            const centerY = basketBounds.top + table.y + table.height / 2;
    
            // Calculate the angle based on cursor position relative to the center
            const angle =
                Math.atan2(event.clientY - centerY, event.clientX - centerX) *
                (180 / Math.PI);
    
            // Update the table's rotation property
            const updatedTable = { ...table, rotation: angle };
    
            setBasket((prevBasket) =>
                prevBasket.map((t) =>
                    t.generatedId === table.generatedId ? updatedTable : t
                )
            );
        };
    
        const onMouseUp = () => {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        };
    
        // Attach event listeners
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    };
    
       // const handleRotate = (table) => {
    //     const updatedTable = {
    //         ...table,
    //         rotation: (table.rotation || 0) + 90, // Increment rotation by 90 degrees
    //     };
    
    //     // Update the state to reflect the new rotation
    //     setBasket((prevBasket) =>
    //         prevBasket.map((t) =>
    //             t.generatedId === table.generatedId ? updatedTable : t
    //         )
    //     );
    // };

    const onResize = (e, data, table) => {
        const updatedTable = { ...table, width: data.size.width, height: data.size.height };
        setBasket((prevBasket) => prevBasket.map(t => t.generatedId === table.generatedId ? updatedTable : t));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditableItem((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSaveChanges = () => {
        if (editableItem) {
            const updatedTables = extendedTables.map((table) =>
                table.generatedId === editableItem.generatedId
                    ? { ...table, ...editableItem }  
                    : table
            );
            extendedTables = updatedTables;  
            setBasket((prevBasket) => prevBasket.map((table) =>
                table.generatedId === editableItem.generatedId
                    ? { ...table, ...editableItem }
                    : table
            ));
            setSelectedItem(editableItem); 
        }
    };

    return (
        <div className="flex gap-4 p-4 bg-gray-100">
            
            <div className="w-1/4">
                <div className="border border-gray-300 p-4 rounded-lg bg-gray-50">
                    <h2 className="text-lg font-semibold text-center">Table Options</h2>
                    <p className="text-sm text-center mb-4 text-gray-500">Drag and drop your tables</p>
                    <div className="grid grid-cols-2 gap-4">
                    
                        {extendedTables.map((table) => (
                            <div
                                key={table.generatedId}  
                                className="cursor-pointer"
                                onClick={() => handleClick(table)}  
                            >
                                <Card id={table.id} name={table.name} image={table.image} h={150} w={150} />
                            </div>
                        ))}
                    </div>
                    {selectedItem && (
                        <div className="mt-4 p-4 border-t border-gray-300">
                            <h3 className="text-md font-semibold text-center mb-3">Selected Table Details</h3>
                            <ul>
                                <li><strong>Name:</strong> 
                                <input
                                            type="text"
                                            name="name"
                                            value={editableItem?.name || ''}
                                            onChange={handleInputChange}
                                            className="mx-5 w-32 text-center p-2 border border-gray-300 rounded"
                                        />
                                </li>
                                <li><strong>ID:</strong> {selectedItem.generatedId}</li>
                                
                                <li>
                                    <strong>Min Covers:</strong>
                                    <div className="flex items-center gap-2">
                                        <button
                                            className="p-2 bg-gray-200 rounded hover:bg-gray-300"
                                            onClick={() => handleCoverChange('minCover', 'decrease')}
                                        >
                                            <Minus />
                                        </button>
                                        <input
                                            type="number"
                                            name="minCover"
                                            value={editableItem?.minCover || ''}
                                            onChange={handleInputChange}
                                            className="w-16 text-center p-2 border border-gray-300 rounded"
                                        />
                                        <button
                                            className="p-2 bg-gray-200 rounded hover:bg-gray-300"
                                            onClick={() => handleCoverChange('minCover', 'increase')}
                                        >
                                            <Plus />
                                        </button>
                                    </div>
                                </li>

                                <li>
                                    <strong>Max Covers:</strong>
                                    <div className="flex items-center gap-2">
                                        <button
                                            className="p-2 bg-gray-200 rounded hover:bg-gray-300"
                                            onClick={() => handleCoverChange('maxCover', 'decrease')}
                                        >
                                            <Minus />
                                        </button>
                                        <input
                                            type="number"
                                            name="maxCover"
                                            value={editableItem?.maxCover || ''}
                                            onChange={handleInputChange}
                                            className="w-16 text-center p-2 border border-gray-300 rounded"
                                        />
                                        <button
                                            className="p-2 bg-gray-200 rounded hover:bg-gray-300"
                                            onClick={() => handleCoverChange('maxCover', 'increase')}
                                        >
                                            <Plus />
                                        </button>
                                    </div>
                                </li>

                                <li>
                                    <strong>Height:</strong>
                                    <input
                                        type="number"
                                        name="height"
                                        value={editableItem?.height || ''}
                                        onChange={handleInputChange}
                                        className="w-16 text-center p-2 border border-gray-300 rounded"
                                    />
                                </li>

                                <li>
                                    <strong>Width:</strong>
                                    <input
                                        type="number"
                                        name="width"
                                        value={editableItem?.width || ''}
                                        onChange={handleInputChange}
                                        className="w-16 text-center p-2 border border-gray-300 rounded"
                                    />
                                </li>

                                <li>
                                    <strong>Online:</strong>
                                    <span className="text-gray-700">
                                        {editableItem?.online ? 'Active' : 'Inactive'}
                                    </span>
                                    <Switch
                                        checked={editableItem?.online || false}
                                        onChange={(e) =>
                                            handleInputChange({
                                            target: { name: 'online', value: e.target.checked },
                                            })
                                        }
                                        name="online"
                                        sx={{
                                            '& .MuiSwitch-switchBase.Mui-checked': {
                                            color: 'white', // Thumb color when checked
                                            },
                                            '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                                            backgroundColor: 'darkred', // Track color when checked
                                            },
                                            '& .MuiSwitch-track': {
                                            backgroundColor: 'gray', // Default track color
                                            },
                                        }}
                                    />
                                    
                                </li>

                                <li><strong>x:</strong> {editableItem?.x}</li>
                                <li><strong>y:</strong> {editableItem?.y}</li>
                            </ul>

                            <button
                                onClick={handleSaveChanges}
                                className="mt-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                            >
                                Save Changes
                            </button>
                        </div>

                    )}
                </div>
            </div>

            <div className="w-3/4">
                <div
                    ref={dropRef}
                    className={`relative w-full h-[700px] border  p-4 transition-transform inset-0 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1.5px,transparent_1.5px)] [background-size:20px_20px] ${
                        isOver ? 'bg-gray-100 border-red-400' : 'bg-gray-50 border'
                    } basket`}
                >
                    
                    {basket.map((table) => (
                        <div
                            key={table.generatedId}
                            className="absolute"
                            style={{
                                left: table.x,
                                top: table.y,
                                width: `${table.width || 150}px`,
                                height: `${table.height || 150}px`,
                            }}
                            onClick={() => handleClick(table)}
                        >
                            {/* Table Card (Rotated) */}
                            <div
                                style={{
                                    transform: `rotate(${table.rotation || 0}deg)`, // Rotate only the table
                                    transformOrigin: 'center',
                                    width: `${table.width || 150}px`,
                                    height: `${table.height || 150}px`,
                                }}
                            >
                                <Card 
                                    id={table.id} 
                                    name={table.name} 
                                    image={table.image} 
                                    h={table.height || 150} 
                                    w={table.width || 150} 
                                    isResizable={true}
                                />
                            </div>

                            {/* Action Buttons - Stay Fixed at the Top */}
                            {selectedItem?.generatedId === table.generatedId && (
                                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 flex shadow-md rounded gap-1 z-10">
                                    <button
                                        className="px-3"
                                        onClick={() => handleMove(table)}
                                    >
                                        <Move/>
                                    </button>
                                    <button
                                        className="px-3"
                                        onClick={() => handleCopy(table)}
                                    >
                                        <Copy/>
                                    </button>
                                    <button
                                        className="px-3"
                                        onClick={() => handleDelete(table)}
                                    >
                                        <Trash/>
                                    </button>
                                </div>
                            )}

                            {console.log(`height = ${table.height || 150}px`)}
                            {/* Rotate Button - Positioned at the Bottom */}
                            {selectedItem?.generatedId === table.generatedId && (
                                
                                <div className="absolute  left-1/2 transform -translate-x-1/2 mb-10"
                                
                                style={{
                                    top: `${table.height || 150}px`, 
                                    marginTop: '25px', 
                                }}
                                >
                                    <button
                                        className=" text-white px-3 py-1 rounded shadow-md"
                                        onClick={() => handleRotate(table)}
                                    >
                                        <Rotate style={{height: '20px', width: "20px"}}/>
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}


                    {isOver && (
                        <div className="absolute inset-0 flex items-center justify-center text-red-700 font-semibold">
                            Drop Here!
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
