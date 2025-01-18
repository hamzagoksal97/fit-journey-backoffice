import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Endpoints } from "../../utils/Endpoints";
import { client } from "../../helpers/api/apiCall";

const initialState = {
    loading: false
};

export const getTenants = createAsyncThunk(
    "getTenants",
    async (_, thunkAPI) => {
        const response = await client.get(Endpoints.TENANT, {
            token: thunkAPI.getState().auth.token
        });
        return response.data;
    });

export const addTenant = createAsyncThunk(
    "addTenant",
    async (body, thunkAPI) => {
        const response = await client.post(Endpoints.TENANT, body, {
            token: thunkAPI.getState().auth.token
        });
        return response.data;
    });


export const updateTenant = createAsyncThunk(
    "updateTenant",
    async (body, thunkAPI) => {
        const response = await client.put(Endpoints.TENANT, body, {
            token: thunkAPI.getState().auth.token
        });
        return response.data;
    });


export const deleteTenant = createAsyncThunk(
    "deleteTenant",
    async (id, thunkAPI) => {
        const response = await client.delete(Endpoints.TENANT + "/" + id, null, {
            token: thunkAPI.getState().auth.token
        });
        return response.data;
    });

export const getTenantById = createAsyncThunk(
    "getTenantById",
    async (id, thunkAPI) => {
        const response = await client.get(Endpoints.TENANT + "/" + id, {
            token: thunkAPI.getState().auth.token
        });
        return response.data;
    });




const tenantSlice = createSlice({
    name: "tenant",
    initialState,
    reducers: {

    },
    extraReducers(builder) {
        builder.addCase(getTenants.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(getTenants.fulfilled, (state, action) => {
            state.loading = false;
        });
        builder.addCase(getTenants.rejected, (state, action) => {
            state.loading = false;
        });
        builder.addCase(addTenant.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(addTenant.fulfilled, (state, action) => {
            state.loading = false;
        });
        builder.addCase(addTenant.rejected, (state, action) => {
            state.loading = false;
        });
        builder.addCase(getTenantById.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(getTenantById.fulfilled, (state, action) => {
            state.loading = false;
        });
        builder.addCase(getTenantById.rejected, (state, action) => {
            state.loading = false;
        });
        builder.addCase(deleteTenant.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(deleteTenant.fulfilled, (state, action) => {
            state.loading = false;
        });
        builder.addCase(deleteTenant.rejected, (state, action) => {
            state.loading = false;
        });
        builder.addCase(updateTenant.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(updateTenant.fulfilled, (state, action) => {
            state.loading = false;
        });
        builder.addCase(updateTenant.rejected, (state, action) => {
            state.loading = false;
        });
    },
});

export default tenantSlice.reducer;
