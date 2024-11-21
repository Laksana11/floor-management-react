import React, { useState } from "react";
import { useDrop } from "react-dnd";
import { Card } from "../pages/Card";
import { ReactComponent as Mid } from "./../assets/Mid.svg";
import { ReactComponent as Table } from "./../assets/Table.svg";
import { ReactComponent as Plus } from "./../assets/Plus.svg";
import { ReactComponent as Minus } from "./../assets/Minus.svg";
import { v4 as uuidv4 } from "uuid";

const TABLES = [
  {
    id: 1,
    name: "Mid",
    image: <Mid />,
    minCover: 1,
    maxCover: 1,
    height: 150,
    width: 150,
    x: 0,
    y: 0,
  },
  {
    id: 2,
    name: "Table",
    image: <Table />,
    minCover: 1,
    maxCover: 1,
    height: 150,
    width: 150,
    x: 0,
    y: 0,
  },
];

let extendedTables = TABLES.map((table) => ({
  ...table,
  generatedId: uuidv4(),
  minCover: table.minCover,
  maxCover: table.maxCover,
  height: table.height,
  width: table.width,
  x: 0,
  y: 0,
}));

export const Basket = () => {
  const [basket, setBasket] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [editableItem, setEditableItem] = useState(null);

  const handleCoverChange = (type, action) => {
    setEditableItem((prevState) => {
      const updatedValue =
        action === "increase" ? prevState[type] + 1 : prevState[type] - 1;
      return {
        ...prevState,
        [type]: updatedValue < 0 ? 0 : updatedValue,
      };
    });
  };

  const [{ isOver }, dropRef] = useDrop({
    accept: "table",
    drop: (item, monitor) => {
      const offset = monitor.getClientOffset();
      const basketBounds = document
        .querySelector(".basket")
        .getBoundingClientRect();

      const x = offset.x - basketBounds.left;
      const y = offset.y - basketBounds.top;

      const droppedTableIndex = extendedTables.findIndex(
        (table) => table.id === item.id
      );

      if (droppedTableIndex !== -1) {
        const droppedTable = extendedTables[droppedTableIndex];
        const newTable = {
          ...droppedTable,
          generatedId: uuidv4(),
          x,
          y,
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
    setEditableItem({ ...table });
  };

  const onResize = (e, data, table) => {
    const updatedTable = {
      ...table,
      width: data.size.width,
      height: data.size.height,
    };
    setBasket((prevBasket) =>
      prevBasket.map((t) =>
        t.generatedId === table.generatedId ? updatedTable : t
      )
    );
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
      setBasket((prevBasket) =>
        prevBasket.map((table) =>
          table.generatedId === editableItem.generatedId
            ? { ...table, ...editableItem }
            : table
        )
      );
      setSelectedItem(editableItem);
    }
  };

  return (
    <div className="flex gap-4 p-4">
      <div className="w-1/4">
        <h2 className="text-lg font-semibold text-center">Table Options</h2>
        <p className="text-sm text-center mb-4">Drag and drop your tables</p>
        <div className="border border-gray-300 p-4 rounded-lg bg-gray-50">
          <div className="grid grid-cols-2 gap-4">
            {extendedTables.map((table) => (
              <div
                key={table.generatedId}
                className="cursor-pointer"
                onClick={() => handleClick(table)}
              >
                <Card id={table.id} name={table.name} image={table.image} />
              </div>
            ))}
          </div>
          {selectedItem && (
            <div className="mt-4 p-4 border-t border-gray-300">
              <h3 className="text-md font-semibold text-center mb-3">
                Selected Table Details
              </h3>
              <ul>
                <li>
                  <strong>Name:</strong>
                  <input
                    type="text"
                    name="name"
                    value={editableItem?.name || ""}
                    onChange={handleInputChange}
                    className="mx-5 w-32 text-center p-2 border border-gray-300 rounded"
                  />
                </li>
                <li>
                  <strong>ID:</strong> {selectedItem.generatedId}
                </li>

                <li>
                  <strong>Min Covers:</strong>
                  <div className="flex items-center gap-2">
                    <button
                      className="p-2 bg-gray-200 rounded hover:bg-gray-300"
                      onClick={() => handleCoverChange("minCover", "decrease")}
                    >
                      <Minus />
                    </button>
                    <input
                      type="number"
                      name="minCover"
                      value={editableItem?.minCover || ""}
                      onChange={handleInputChange}
                      className="w-16 text-center p-2 border border-gray-300 rounded"
                    />
                    <button
                      className="p-2 bg-gray-200 rounded hover:bg-gray-300"
                      onClick={() => handleCoverChange("minCover", "increase")}
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
                      onClick={() => handleCoverChange("maxCover", "decrease")}
                    >
                      <Minus />
                    </button>
                    <input
                      type="number"
                      name="maxCover"
                      value={editableItem?.maxCover || ""}
                      onChange={handleInputChange}
                      className="w-16 text-center p-2 border border-gray-300 rounded"
                    />
                    <button
                      className="p-2 bg-gray-200 rounded hover:bg-gray-300"
                      onClick={() => handleCoverChange("maxCover", "increase")}
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
                    value={editableItem?.height || ""}
                    onChange={handleInputChange}
                    className="w-16 text-center p-2 border border-gray-300 rounded"
                  />
                </li>

                <li>
                  <strong>Width:</strong>
                  <input
                    type="number"
                    name="width"
                    value={editableItem?.width || ""}
                    onChange={handleInputChange}
                    className="w-16 text-center p-2 border border-gray-300 rounded"
                  />
                </li>

                <li>
                  <strong>x:</strong> {editableItem?.x}
                </li>
                <li>
                  <strong>y:</strong> {editableItem?.y}
                </li>
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
          className={`relative w-full h-[600px] border-2 rounded-lg p-4 transition-transform ${
            isOver
              ? "bg-green-100 border-green-400"
              : "bg-gray-50 border-dashed"
          } basket`}
        >
          {basket.map((table) => (
            <div
              key={table.generatedId}
              className="absolute"
              style={{
                left: table.x,
                top: table.y,
                width: "150px",
                height: "150px",
              }}
              onClick={() => handleClick(table)}
            >
              <Card
                id={table.id}
                name={table.name}
                image={table.image}
                isResizable={true}
              />
            </div>
          ))}
          {isOver && (
            <div className="absolute inset-0 flex items-center justify-center text-green-700 font-semibold">
              Drop Here!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
