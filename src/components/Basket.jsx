import React, { useState } from "react";
import { useDrop } from "react-dnd";
import { Card } from "../pages/Card";
import { ReactComponent as Plus } from "./../assets/Plus.svg";
import { ReactComponent as Minus } from "./../assets/Minus.svg";
import { ReactComponent as Copy } from "./../assets/Copy.svg";
import { ReactComponent as Trash } from "./../assets/trash.svg";
import { ReactComponent as Move } from "./../assets/Move.svg";
import { ReactComponent as Rotate } from "./../assets/Rotate.svg";
import { v4 as uuidv4 } from "uuid";
import { useForm, Controller } from "react-hook-form";

import { Switch } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  tableAdded,
  tableUpdated,
  tableRemoved,
  TABLES,
  tableSize,
  selectAllTables,
  getTableStats,
} from "./../redux/tables/tablesSlice";

let extendedTables = TABLES.map((table) => ({
  ...table,
  id: table.id,
  generatedId: uuidv4(),
  minCover: table.minCover,
  maxCover: table.maxCover,
  height: table.height,
  width: table.width,
  transform: 0,
  transformOrigin: "center",
  x: 0,
  y: 0,
  online: true,
}));

export const Basket = () => {
  const [basket, setBasket] = useState([...extendedTables]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [editableItem, setEditableItem] = useState(null);
  const dispatch = useDispatch();

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      minCover: 0,
      maxCover: 0,
      online: true,
    },
  });

  const [{ isOver }, dropRef] = useDrop({
    accept: "table",
    drop: (item, monitor) => {
      const offset = monitor.getClientOffset();
      const basketBounds = document
        .querySelector(".basket")
        .getBoundingClientRect();

      const droppedTableIndex = TABLES.findIndex(
        (table) => table.id === item.id
      );

      const x = offset.x - basketBounds.left - tableSize / 2;
      const y = offset.y - basketBounds.top - tableSize / 2;

      if (droppedTableIndex !== -1) {
        const droppedTable = extendedTables[droppedTableIndex];
        droppedTable.x = x;
        droppedTable.y = y;
        const generatedId = new uuidv4();
        const newTable = {
          ...droppedTable,
          generatedId: uuidv4(),
          x,
          y,
        };

        dispatch(tableAdded({ ...newTable }));
      }
    },

    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  const handleClick = (table) => {
    setSelectedItem(table);
    reset({
      name: table.name,
      minCover: table.minCover,
      maxCover: table.maxCover,
      online: table.online,
    });
  };

  const onSubmit = (data) => {
    if (selectedItem) {
      const updatedTable = { ...selectedItem, ...data };
      dispatch(tableUpdated(updatedTable));
      setSelectedItem(null);
    }
  };
  const allTables = useSelector(selectAllTables);

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

  const handleMove = (table) => {
    const updatedTable = { ...table };
    let newX = table.x;
    let newY = table.y;

    const onMouseMove = (event) => {
      const basketElement = document.querySelector(".basket");
      const basketBounds = basketElement.getBoundingClientRect();

      newX = event.clientX - basketBounds.left - table.width / 2;
      newY = event.clientY - basketBounds.top - table.height / 2;

      updatedTable.x = newX;
      updatedTable.y = newY;

      const tableElement = document.querySelector(
        `[data-id="${table.generatedId}xy"]`
      );
      if (tableElement) {
        tableElement.style.x = newX;
        tableElement.style.y = newY;
      }
    };

    const onMouseUp = () => {
      dispatch(
        tableUpdated({
          generatedId: updatedTable.generatedId,
          ...updatedTable,
        })
      );
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  const handleCopy = (table) => {
    const newTable = {
      ...table,
      generatedId: uuidv4(),
      x: table.x + 20,
      y: table.y + 20,
    };
    dispatch(tableAdded({ ...newTable }));
  };

  const handleDelete = (table) => {
    dispatch(tableRemoved({ generatedId: table.generatedId }));
    setSelectedItem(null);
  };

  const handleRotate = (table) => {
    let updatedTable = { ...table };
    let angle = 0;
    const onMouseMove = (event) => {
      const basketElement = document.querySelector(".basket");
      const basketBounds = basketElement.getBoundingClientRect();

      const centerX =
        basketBounds.left + updatedTable.x + updatedTable.width / 2;
      const centerY =
        basketBounds.top + updatedTable.y + updatedTable.height / 2;

      angle =
        Math.atan2(event.clientY - centerY, event.clientX - centerX) *
        (180 / Math.PI);

      updatedTable.transform = angle;

      const tableElement = document.querySelector(
        `[data-id="${table.generatedId}"]`
      );
      if (tableElement) {
        tableElement.style.transform = `rotate(${angle}deg)`;
      }
    };

    const onMouseUp = () => {
      dispatch(
        tableUpdated({
          generatedId: updatedTable.generatedId,
          ...updatedTable,
        })
      );

      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
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
      dispatch(
        tableUpdated({
          generatedId: editableItem.generatedId,
          ...editableItem,
        })
      );

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
    <div className="flex gap-4 p-4 bg-gray-100">
      <div className="w-1/4">
        <div className="border border-gray-300 p-4 rounded-lg bg-gray-50">
          <h2 className="text-lg font-semibold text-center">Table Options</h2>
          <p className="text-sm text-center mb-4 text-gray-500">
            Drag and drop your tables
          </p>
          <div className="grid grid-cols-2 gap-4">
            {TABLES?.map((table) => (
              <div
                key={table.generatedId}
                className="cursor-pointer"
                onClick={() => handleClick(table)}
              >
                <Card
                  id={table.generatedId}
                  name={table.name}
                  image={table.image}
                  h={150}
                  w={150}
                />
              </div>
            ))}
          </div>

          {selectedItem && (
            <form
              className="mt-4 p-4 border-t border-gray-300"
              onSubmit={handleSubmit(onSubmit)}
            >
              <h3 className="text-md font-semibold text-center mb-3">
                Selected Table Details
              </h3>

              <div className="mb-4 flex items-center gap-4">
                <label className="text-sm font-medium w-1/3">Name</label>
                <Controller
                  name="name"
                  control={control}
                  rules={{ required: "Name is required" }}
                  render={({ field }) => (
                    <input
                      {...field}
                      className="w-full p-2 border rounded flex-1"
                    />
                  )}
                />
                {errors.name && (
                  <span className="text-red-500 text-sm">
                    {errors.name.message}
                  </span>
                )}
              </div>

              <div className="mb-4 flex items-center gap-4">
                <label className="text-sm font-medium w-1/3">Min Covers</label>
                <div className="flex items-center gap-2 flex-1">
                  <button
                    type="button"
                    onClick={() =>
                      setValue("minCover", Math.max(watch("minCover") - 1, 0))
                    }
                    className="p-2 bg-gray-200 rounded"
                  >
                    <Minus />
                  </button>
                  <Controller
                    name="minCover"
                    control={control}
                    rules={{
                      required: "Min covers are required",
                      min: { value: 0, message: "Cannot be negative" },
                    }}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="number"
                        className="w-16 text-center border rounded"
                      />
                    )}
                  />
                  <button
                    type="button"
                    onClick={() => setValue("minCover", watch("minCover") + 1)}
                    className="p-2 bg-gray-200 rounded"
                  >
                    <Plus />
                  </button>
                </div>
                {errors.minCover && (
                  <span className="text-red-500 text-sm">
                    {errors.minCover.message}
                  </span>
                )}
              </div>

              <div className="mb-4 flex items-center gap-4">
                <label className="text-sm font-medium w-1/3">Max Covers</label>
                <div className="flex items-center gap-2 flex-1">
                  <button
                    type="button"
                    onClick={() =>
                      setValue("maxCover", Math.max(watch("maxCover") - 1, 0))
                    }
                    className="p-2 bg-gray-200 rounded"
                  >
                    <Minus />
                  </button>
                  <Controller
                    name="maxCover"
                    control={control}
                    rules={{
                      required: "Max covers are required",
                      min: { value: 0, message: "Cannot be negative" },
                    }}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="number"
                        className="w-16 text-center border rounded"
                      />
                    )}
                  />
                  <button
                    type="button"
                    onClick={() => setValue("maxCover", watch("maxCover") + 1)}
                    className="p-2 bg-gray-200 rounded"
                  >
                    <Plus />
                  </button>
                </div>
                {errors.maxCover && (
                  <span className="text-red-500 text-sm">
                    {errors.maxCover.message}
                  </span>
                )}
              </div>

              <div className="mb-4 flex items-center gap-4">
                <label className="text-sm font-medium w-1/3">Online</label>
                <Controller
                  name="online"
                  control={control}
                  render={({ field }) => (
                    <Switch
                      {...field}
                      checked={field.value}
                      onChange={(e) => field.onChange(e.target.checked)}
                      sx={{
                        "& .Mui-checked": {
                          color: "darkred", // Thumb color
                        },
                        "& .Mui-checked + .MuiSwitch-track": {
                          backgroundColor: "#b02522", // Track color
                        },
                      }}
                    />
                  )}
                />
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  className="px-4 py-2 bg-red-800 text-white rounded"
                >
                  Save Changes
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      <div className="w-3/4">
        <div
          ref={dropRef}
          className={`relative w-full !h-[700px] border  p-4 transition-transform inset-0 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1.5px,transparent_1.5px)] [background-size:20px_20px] ${
            isOver ? "bg-gray-100 border-red-400" : "bg-gray-50 border"
          } basket`}
        >
          {allTables.map((table) => (
            <div
              key={table.generatedId}
              className="absolute"
              data-id={`${table.generatedId}xy`}
              style={{
                left: table.x,
                top: table.y,
                width: `${table.width || 150}px`,
                height: `${table.height || 150}px`,
              }}
              onClick={() => handleClick(table)}
            >
              <div
                data-id={table.generatedId}
                style={{
                  transform: `rotate(${table.transform || 0}deg)`,
                  transformOrigin: "center",
                  width: `${table.width || 150}px`,
                  height: `${table.height || 150}px`,
                }}
              >
                <Card
                  id={table.generatedId}
                  name={table.name}
                  image={table.image}
                  h={table.height || 150}
                  w={table.width || 150}
                  isResizable={true}
                />
              </div>

              {selectedItem?.generatedId === table.generatedId && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 flex shadow-md rounded gap-1 z-10">
                  <button className="px-3" onClick={() => handleMove(table)}>
                    <Move />
                  </button>
                  <button className="px-3" onClick={() => handleCopy(table)}>
                    <Copy />
                  </button>
                  <button className="px-3" onClick={() => handleDelete(table)}>
                    <Trash />
                  </button>
                </div>
              )}

              {selectedItem?.generatedId === table.generatedId && (
                <div
                  className="absolute  left-1/2 transform -translate-x-1/2 mb-10"
                  style={{
                    top: `${table.height || 150}px`,
                    marginTop: "25px",
                  }}
                >
                  <button
                    className=" text-white px-3 py-1 rounded shadow-md"
                    onClick={() => handleRotate(table)}
                  >
                    <Rotate style={{ height: "20px", width: "20px" }} />
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
