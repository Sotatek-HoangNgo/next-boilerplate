export default function randomInRange(from: number, to: number) {
    const rand = Math.random();

    console.log('random number: ', rand, from, to);

    const res = Math.floor(from + rand * (to - from) + 0.5);
    console.log('random result: ', res);

    return res;
}
