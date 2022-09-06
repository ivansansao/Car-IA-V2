Clone or download this repository and run the src/index.html file in your browser.
Press 'c' to change lanes, F12 will show some info!

This project uses Google TensorFlow for the car's neural network.

The genetic algorithm selects the first one, clones it to generate the next generation in addition to keeping its superior and adding a new random one.

Track 3 with information about the cars
![Alt text](src/assets/p3-infocar.png?raw=true "track print")

Track 3 runway heatmap
![Alt text](src/assets/p3-thermalmap.png?raw=true "track print")

Command keys:

b - Stop rendering cars to improve training performance
c - Change lane
e - Enables/disables elitism
f - Activates the vehicle eliminator at the mouse tip
g - Shows the background
h - Show/hide car details
i - Shows information about the car
j - Shows the heat map of the track
k - Reset if the current race has a record
l - Shows the limits of the track
p - Pause
m - Deletes all vehicles
n - Show flag
o - Activates collision between cars
q - Start using saved weights or not
r - Shows a list of track slots
s - Show sensors
t - Stop the 'timer'
w - Toggle slot display
x - Shows crashed vehicles
y - Enables/disables engine sound
z - lights