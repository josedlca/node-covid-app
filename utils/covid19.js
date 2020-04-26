const got = require('got')

const covid19 = (country, callback) => {
    const url = `https://api.covid19api.com/total/dayone/country/${encodeURIComponent(country)}`

    got(url)
        .then(response =>{
            const covid19Data = JSON.parse(response.body)
            callback(
                {
                    country:covid19Data
                }
            )
        })
        .catch(error =>{
            console.log(`this is an error of connection ${error}`)
        })
}

module.exports=covid19