let rayIndex = 1;

const limits = [
    {ray: 0, collide: 30},
    {ray: 1, collide: 30},
    {ray: 2, collide: 30},
    {ray: 3, collide: 30},
    {ray: 4, collide: 30},
    {ray: 5, collide: 30},
    {ray: 6, collide: 30},
    {ray: 7, collide: 30},
    {ray: 8, collide: 30},
    {ray: 9, collide: 30},
    {ray: 10, collide: 30},
]

for (const limit of limits) {
    console.log(limit)
}



// console.log(oppositeBright([200, 0, 0]));

function oppositeBright(rgb) {

    const av = rgb.reduce((a, b) => a + b, 0) / 3;

    return av > 125 ? 0 : 255;

}