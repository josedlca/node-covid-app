const yargs = require('yargs')
const search = require('./utils/search')

yargs.command({
    command: 'search',
    describe: 'Add a new result',
    builder: {
        country:{
            describe: 'busqueda',
            demandOption: true,
            type: 'string'
        },
        month:{
            describe:'mes a buscar',
            demandOption: true,
            type:'string'
        }
    },
    handler(argv){
        search.search(argv.country,argv.month)
    }
})

yargs.parse()

