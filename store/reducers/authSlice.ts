import { authService } from '@/services/auth.service';
import { ILoginForm, ISignInResponse } from '@/types/auth';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IAuthSlice {
    isLoggedIn: boolean;
    status: 'init' | 'submitting' | 'success' | 'error';
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    error?: any;
}

const initialState: IAuthSlice = {
    isLoggedIn: false,
    status: 'init',
    error: undefined,
};

const login = createAsyncThunk('auth/login', async (form: ILoginForm, { rejectWithValue }) => {
    const [result, error] = await authService.signIn(form);
    if (error) {
        return rejectWithValue(error);
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (result as any).data;
});

const authSlice = createSlice({
    initialState,
    name: 'auth',
    reducers: {},
    extraReducers(builder) {
        builder.addCase(login.pending, (state) => {
            state.error = undefined;
            state.status = 'submitting';
            state.isLoggedIn = false;
        });

        builder.addCase(login.rejected, (state, action) => {
            state.status = 'error';
            state.error = action.payload;
        });

        builder.addCase(login.fulfilled, (state) => {
            state.isLoggedIn = true;
            state.status = 'success';
        });
    },
});

export default authSlice.reducer;
export const authActions = authSlice.actions;
export const authAsyncActions = { login };
