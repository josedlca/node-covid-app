const got = require('got')

const countryCode= (address, callback) => {
    const url = `https://restcountries.eu/rest/v2/name/${encodeURIComponent(address)}`

    got(url)
        .then(response =>{
            const countryCodeData = JSON.parse(response.body)
            callback(
                {
                    countryCodeDataIso : countryCodeData[0].alpha2Code
                }
            )
        })
        .catch(error =>{
            console.log(`this is an error of connection ${error}`)
        })
}

module.exports=countryCode