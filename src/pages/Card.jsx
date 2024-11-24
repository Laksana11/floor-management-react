import React, {useState} from 'react'
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css'; 
import { useDrag } from 'react-dnd';
import ImageComponent from './../components/draggable/ImageComponent'

export const Card = ({ id, name, image, key, h, w, isResizable=false }) => {
    const [size, setSize] = useState({ width: w, height: h });
    
    const [{ isDragging }, dragRef] = useDrag({
        type: 'table',
        item: { id, name, image, key },
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    });

    return isResizable ? (
        <ResizableBox
            width={size.width}
            height={size.height}
            minConstraints={[150, 150]}  
            maxConstraints={[300, 300]}  
            axis="both" 
            resizeHandles={['se']} 
            onResizeStop={(e, data) => {
                const { width, height } = data.size;
                setSize({ width, height });
            }}
        >
            <div
                className={`p-2 w-full h-full  rounded-lg  cursor-pointer transition-transform transform flex justify-center items-center ${
                    isDragging ? 'bg-red-200 scale-105' : 'bg-white'
                }`}
                ref={dragRef}
                key={key}
                style={{
                    display: 'inline-block', 
                    textAlign: 'center', 
                }}
            >
                <div 
                className=" flex justify-center items-center">
                    <ImageComponent image={image} height={size.height} width={size.width}/></div>
            </div>
        </ResizableBox>
    ): (
        <div
            className={`p-2  rounded-lg  cursor-pointer transition-transform transform flex justify-center items-center ${
                isDragging ? 'bg-red-200 scale-105' : 'bg-white'
            }`}
            ref={dragRef}
            key={key}
            style={{
                display: 'inline-block',
                textAlign: 'center',
            }}
        >
            <div className="flex justify-center items-center">
                <ImageComponent image={image} height={150} width={150} />
            </div>
        </div>
    );
};
