'use client';

// Hooks
import { useForm, type SubmitHandler, type SubmitErrorHandler } from 'react-hook-form';
import { useAppDispatch } from '@/hooks/store';
import { useState } from 'react';

import { TextField, Button, FormControl, InputLabel, Input, InputAdornment, IconButton } from '@mui/material';

import { ILoginForm } from '@/types/auth';
import { authAsyncActions } from '@/store/reducers/authSlice';
import { VisibilityOff, Visibility } from '@mui/icons-material';

const defaultForm: ILoginForm = {
    password: '',
    username: '',
};

export default function Login() {
    const { register, handleSubmit, formState } = useForm<ILoginForm>({ defaultValues: defaultForm });
    const [isShowPassword, setIsShowPassword] = useState(false);
    const dispatch = useAppDispatch();

    const togglePasswordVisibility = () => {
        setIsShowPassword((show) => !show);
    };

    const onLoginHandler: SubmitHandler<ILoginForm> = async (form) => {
        await dispatch(authAsyncActions.login(form)).unwrap();
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
                <Button variant="contained" className="block ml-auto py-2 px-10 capitalize" type="submit">
                    Login
                </Button>
            </form>
        </div>
    );
}
