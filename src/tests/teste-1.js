console.log(oppositeBright([200, 0, 0]));

function oppositeBright(rgb) {

    const av = rgb.reduce((a, b) => a + b, 0) / 3;

    return av > 125 ? 0 : 255;

}