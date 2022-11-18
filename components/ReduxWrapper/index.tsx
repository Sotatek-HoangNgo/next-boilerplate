'use client';

import store from '@/store';
import { ReactNode } from 'react';
import { Provider } from 'react-redux';

interface IComponentProps {
    children: ReactNode;
}

export default function ReduxWrapper({ children }: IComponentProps) {
    return <Provider store={store}>{children}</Provider>;
}
