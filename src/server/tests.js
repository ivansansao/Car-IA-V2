import { exec } from 'child_process';

getGpuTemperature(cb)

function getGpuTemperature(cb) {
    const gpuTempeturyCommand = 'nvidia-smi --query-gpu=temperature.gpu --format=csv,noheader'
    exec(gpuTempeturyCommand, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
        cb(stdout)
        return
    })


}

function cb(temp) {
    console.log("Enviando a tempo... ", temp)
}