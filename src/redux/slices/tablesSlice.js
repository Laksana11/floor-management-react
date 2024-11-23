import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { ReactComponent as Mid } from './../../assets/Mid.svg'
import { ReactComponent as Table } from './../../assets/Table.svg'

const initialTables = [
    { id: 1, name: 'Mid', image: '<Mid />', minCover: 1, maxCover: 1, height: 150, width: 150, x: 0, y: 0 },
    { id: 2, name: 'Table', image: '<Table />', minCover: 1, maxCover: 1, height: 150, width: 150, x: 0, y: 0 },
];

const tablesSlice = createSlice({
    name: 'tables',
    initialState: initialTables.map((table) => ({
        ...table,
        generatedId: uuidv4(), // Add generated ID
    })),
    reducers: {
        addTable: (state, action) => {
            // Add a new table dynamically
            const newTable = {
                ...action.payload,
                generatedId: uuidv4(),
            };
            state.push(newTable);
        },
        updateTable: (state, action) => {
            // Update an existing table
            const { id, updates } = action.payload;
            const tableIndex = state.findIndex((table) => table.id === id);
            if (tableIndex >= 0) {
                state[tableIndex] = { ...state[tableIndex], ...updates };
            }
        },
        removeTable: (state, action) => {
            // Remove a table by ID
            return state.filter((table) => table.id !== action.payload);
        },
    },
});

export const { addTable, updateTable, removeTable } = tablesSlice.actions;
export default tablesSlice.reducer;
