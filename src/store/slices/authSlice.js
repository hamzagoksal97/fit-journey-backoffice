import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token: '',
    isLogged: false,
    loading: false,
    claims: []
};






const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setToken(state, action) {
            if (action.payload)
                state.isLogged = true;
            else
                state.isLogged = false

            state.token = action.payload
        },
        setClaims(state, action) {
            state.claims = action.payload
        }
    },
    extraReducers(builder) {

    },
});

export const { setToken, setClaims } = authSlice.actions;
export default authSlice.reducer;
