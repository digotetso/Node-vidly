//process is event emitter --> below we listen or subcribe to 'uncaughtException' event
process.on('uncaughtException', (ex) => {
    winston.error(ex.message, ex)
    process.exit(1)
})

//process is a event emitter --> below we listen or subcribe to 'uncaughtException' event
process.on('unhandledRejection', (ex) => {
    winston.error(ex.message, ex)
    process.exit(1)
})