import LiquidBackground from '@/components/shared/LiquidBackground';
import Card from '@/components/shared/mui/Card';
import { ReactNode } from 'react';

interface IComponentProps {
    children: ReactNode;
}

export default function AuthLayout({ children }: IComponentProps) {
    return (
        <section className="h-screen flex">
            <div className="m-auto">
                <main>
                    <LiquidBackground>
                        <Card
                            variant="outlined"
                            sx={{
                                width: '700px',
                            }}
                        >
                            {children}
                        </Card>
                    </LiquidBackground>
                </main>
            </div>
        </section>
    );
}
