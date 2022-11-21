'use client';

import { useForm, type SubmitHandler } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '@/hooks/store';
import { useState } from 'react';

import {
    TextField,
    Button,
    FormControl,
    InputLabel,
    Input,
    InputAdornment,
    IconButton,
    CircularProgress,
    Snackbar,
    Alert,
} from '@mui/material';

import { ILoginForm } from '@/types/auth';
import { authActions, authAsyncActions } from '@/store/reducers/authSlice';
import { VisibilityOff, Visibility } from '@mui/icons-material';
import classNames from 'classnames';
import { useRouter } from 'next/navigation';

const defaultForm: ILoginForm = {
    password: '',
    username: '',
};

// For user not found or invalid password
const MGS_INVALID_USER = 'Invalid username or password';
const MGS_SERVER_ERROR = 'System error, try to refresh page';

const TOAST_DURATION_TIME = 5000;

export default function Login() {
    const { register, handleSubmit } = useForm<ILoginForm>({ defaultValues: defaultForm });
    const [isShowPassword, setIsShowPassword] = useState(false);
    const authStatus = useAppSelector((state) => state.auth.status);
    const error = useAppSelector((state) => state.auth.error);
    const dispatch = useAppDispatch();
    const router = useRouter();

    const togglePasswordVisibility = () => {
        setIsShowPassword((show) => !show);
    };

    const onLoginHandler: SubmitHandler<ILoginForm> = async (form) => {
        try {
            await dispatch(authAsyncActions.login(form)).unwrap();

            router.replace('/swap');
        } catch (error) {
            console.log('error: ', error);
        }
    };

    const hideMessageHandler = () => {
        dispatch(authActions.setErrorState(undefined));
    };

    return (
        <div className="text-base w-full p-10">
            <h1 className="text-2xl font-bold mb-4">Welcome</h1>
            <form onSubmit={handleSubmit(onLoginHandler)}>
                <TextField label="Username" variant="standard" className="w-full mb-4" {...register('username')} />
                <FormControl fullWidth className="w-full mb-4" variant="standard">
                    <InputLabel htmlFor="login-password-input">Password</InputLabel>
                    <Input
                        id="login-password-input"
                        type={isShowPassword ? 'text' : 'password'}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton aria-label="toggle password visibility" onClick={togglePasswordVisibility}>
                                    {isShowPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                        {...register('password')}
                    />
                </FormControl>
                {/* <TextField
                    label="Password"
                    variant="standard"
                    type="password"
                    className="w-full mb-4"
                    {...register('password')}
                /> */}
                <Button
                    variant="contained"
                    className={classNames('block ml-auto py-2 px-10 capitalize text-base', {})}
                    type="submit"
                    disabled={authStatus === 'submitting'}
                >
                    <CircularProgress
                        style={{
                            display: authStatus === 'submitting' ? 'inline-block' : 'none',
                            width: '1rem',
                            height: '1rem',
                        }}
                        className="mr-4 w-4 h-4"
                    />
                    Login
                </Button>
            </form>
            <Snackbar
                open={authStatus === 'error'}
                autoHideDuration={TOAST_DURATION_TIME}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                onClose={hideMessageHandler}
            >
                <Alert severity="error" variant="filled">
                    {error ? (error.statusCode < 500 ? MGS_INVALID_USER : MGS_SERVER_ERROR) : ''}
                </Alert>
            </Snackbar>
        </div>
    );
}
