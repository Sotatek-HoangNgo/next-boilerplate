import { authService } from '@/services/auth.service';
import { ILoginForm, ISignInResponse } from '@/types/auth';
import { createAsyncThunk, createSlice, PayloadAction, CaseReducer } from '@reduxjs/toolkit';

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
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return rejectWithValue((error as any).response.data);
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (result as any).data;
});

const _setErrorState: CaseReducer<IAuthSlice, PayloadAction<undefined | Error>> = (state, action) => {
    const error = action.payload;

    if (!error) {
        (state.status = 'init'), (state.error = undefined);
        return;
    }

    state.status = 'error';
    state.error = error;
};

const authSlice = createSlice({
    initialState,
    name: 'auth',
    reducers: {
        setErrorState: _setErrorState,
    },
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
