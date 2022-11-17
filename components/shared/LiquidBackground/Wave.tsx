interface IComponentProps {
    className?: string;
}

export default function WaveShape({ className }: IComponentProps) {
    return (
        <svg id="wave" viewBox="0 0 1440 490" version="1.1" xmlns="http://www.w3.org/2000/svg" className={className}>
            <defs>
                <linearGradient id="sw-gradient-0" x1="0" x2="0" y1="1" y2="0">
                    <stop stopColor="rgba(243, 106, 62, 1)" offset="0%"></stop>
                    <stop stopColor="rgba(255, 179, 11, 1)" offset="100%"></stop>
                </linearGradient>
            </defs>
            <path
                fill="url(#sw-gradient-0)"
                d="M0,245L30,204.2C60,163,120,82,180,81.7C240,82,300,163,360,179.7C420,196,480,147,540,155.2C600,163,660,229,720,245C780,261,840,229,900,220.5C960,212,1020,229,1080,245C1140,261,1200,278,1260,294C1320,310,1380,327,1440,326.7C1500,327,1560,310,1620,253.2C1680,196,1740,98,1800,106.2C1860,114,1920,229,1980,294C2040,359,2100,376,2160,343C2220,310,2280,229,2340,163.3C2400,98,2460,49,2520,40.8C2580,33,2640,65,2700,130.7C2760,196,2820,294,2880,302.2C2940,310,3000,229,3060,228.7C3120,229,3180,310,3240,351.2C3300,392,3360,392,3420,367.5C3480,343,3540,294,3600,285.8C3660,278,3720,310,3780,294C3840,278,3900,212,3960,204.2C4020,196,4080,245,4140,294C4200,343,4260,392,4290,416.5L4320,441L4320,490L4290,490C4260,490,4200,490,4140,490C4080,490,4020,490,3960,490C3900,490,3840,490,3780,490C3720,490,3660,490,3600,490C3540,490,3480,490,3420,490C3360,490,3300,490,3240,490C3180,490,3120,490,3060,490C3000,490,2940,490,2880,490C2820,490,2760,490,2700,490C2640,490,2580,490,2520,490C2460,490,2400,490,2340,490C2280,490,2220,490,2160,490C2100,490,2040,490,1980,490C1920,490,1860,490,1800,490C1740,490,1680,490,1620,490C1560,490,1500,490,1440,490C1380,490,1320,490,1260,490C1200,490,1140,490,1080,490C1020,490,960,490,900,490C840,490,780,490,720,490C660,490,600,490,540,490C480,490,420,490,360,490C300,490,240,490,180,490C120,490,60,490,30,490L0,490Z"
            ></path>
            <defs>
                <linearGradient id="sw-gradient-1" x1="0" x2="0" y1="1" y2="0">
                    <stop stopColor="rgba(243, 106, 62, 1)" offset="0%"></stop>
                    <stop stopColor="rgba(255, 179, 11, 1)" offset="100%"></stop>
                </linearGradient>
            </defs>
            <path
                style={{
                    opacity: '0.9',
                }}
                fill="url(#sw-gradient-1)"
                d="M0,392L30,400.2C60,408,120,425,180,416.5C240,408,300,376,360,351.2C420,327,480,310,540,253.2C600,196,660,98,720,106.2C780,114,840,229,900,302.2C960,376,1020,408,1080,359.3C1140,310,1200,180,1260,122.5C1320,65,1380,82,1440,89.8C1500,98,1560,98,1620,155.2C1680,212,1740,327,1800,318.5C1860,310,1920,180,1980,130.7C2040,82,2100,114,2160,106.2C2220,98,2280,49,2340,40.8C2400,33,2460,65,2520,114.3C2580,163,2640,229,2700,269.5C2760,310,2820,327,2880,343C2940,359,3000,376,3060,326.7C3120,278,3180,163,3240,98C3300,33,3360,16,3420,57.2C3480,98,3540,196,3600,196C3660,196,3720,98,3780,57.2C3840,16,3900,33,3960,106.2C4020,180,4080,310,4140,359.3C4200,408,4260,376,4290,359.3L4320,343L4320,490L4290,490C4260,490,4200,490,4140,490C4080,490,4020,490,3960,490C3900,490,3840,490,3780,490C3720,490,3660,490,3600,490C3540,490,3480,490,3420,490C3360,490,3300,490,3240,490C3180,490,3120,490,3060,490C3000,490,2940,490,2880,490C2820,490,2760,490,2700,490C2640,490,2580,490,2520,490C2460,490,2400,490,2340,490C2280,490,2220,490,2160,490C2100,490,2040,490,1980,490C1920,490,1860,490,1800,490C1740,490,1680,490,1620,490C1560,490,1500,490,1440,490C1380,490,1320,490,1260,490C1200,490,1140,490,1080,490C1020,490,960,490,900,490C840,490,780,490,720,490C660,490,600,490,540,490C480,490,420,490,360,490C300,490,240,490,180,490C120,490,60,490,30,490L0,490Z"
            ></path>
        </svg>
    );
}