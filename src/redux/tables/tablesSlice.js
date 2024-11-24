import { createSlice } from "@reduxjs/toolkit";
export const tableSize = 150;

export const TABLES = [
    { id: 1, generatedId: 1,name: 'Mid', image: "Mid", minCover:  1, maxCover: 1,height: tableSize, width:tableSize, x: 0, y: 0, online: true},
    { id: 2, generatedId: 2 ,name: 'Table', image: "Table", minCover:  1, maxCover: 1,height: tableSize, width:tableSize, x: 0, y: 0,  online: true},
];



const initialState =[];


const tablesSlice = createSlice({
    name:"tables",
    initialState,
    reducers:{
        resetTables: (state)=>{
            return [];
        },
        tableAdded:{
            reducer(state, action){
            state.push(action.payload)
        },
            prepare({generatedId, x, y, ...droppedTable}){
                return{
                    payload:{
                        generatedId, x, y, ...droppedTable
                    }
                }
            }
        },
        tableRemoved(state, action) {
            const { generatedId } = action.payload;
            return state.filter(table => table.generatedId !== generatedId);
        },
        tableUpdated:{
            reducer(state, action) {
                const { generatedId, ...editableItem } = action.payload; 
                const updatedTable = state.find(table => table.generatedId == generatedId);
                if (updatedTable) {
                    Object.assign(updatedTable, editableItem);
                }
            },
            prepare({generatedId, ...editableItem}){
                return{
                    payload:{
                        generatedId, ...editableItem
                    }
                }
            }
        },
        
    }
})

export const selectAllTables = (state)=> state.tables;
export const {tableAdded, tableRemoved, tableUpdated, resetTables} =tablesSlice.actions;
export default tablesSlice.reducer;
