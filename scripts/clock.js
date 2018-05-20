const cron = require('cron');
const spawn = require('child_process').spawn;

const schedule = process.env.SCHEDULE || '0 * * * *';
console.log(`Starting scheduler with ${schedule}`);

const job = new cron.CronJob({
    cronTime: schedule,
    onTick: () => {
        console.log('Capturing');
        const job = spawn('npm', ['start'], { stdio: 'inherit' });

        job.on('exit', (code) => {
            console.log('Capturing exited with code ' + code.toString());
        });
    },
    start: true,
});
