import { createSlice } from "@reduxjs/toolkit";

export const Appslice = createSlice({
    name : 'Appslice',
    initialState : {
        userdata : '',
        id_collection: '',
    },

    reducers : {
        setuserdata : (state, action) => {
            state.userdata = action.payload
        },
        id_collection : (state, action) => {
            state.id_collection = action.payload
        },
    }
});

export const { setuserdata, id_collection } = Appslice.actions;

export default Appslice.reducer;