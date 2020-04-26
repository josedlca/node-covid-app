const fs = require('fs')
const countryCode = require('./countryCode')
const covid19 = require('./covid19')
const allMonths = require('./months')

search=(country,month)=>{
    const checkMonths = allMonths.find(item=>item.mes===month)
    if(checkMonths !== undefined){
        countryCode(country,(responseIso)=>{
            covid19(responseIso.countryCodeDataIso,(responseCovid)=>{
    
                const findMonth = allMonths.find((months)=> months.mes=== month)
    
                const justMonth = []
                for (i = 0; i <= responseCovid.country.length-1; i++) {
                    const allDate = new Date(responseCovid.country[i].Date)
                    justMonth.push(allDate.getMonth())                
                }
    
                const tokeMonthsId = [];
                let idx = justMonth.indexOf(findMonth.id);
                while (idx != -1) {
                    tokeMonthsId.push(idx);
                    idx = justMonth.indexOf(findMonth.id, idx + 1);
                }
    
                const covidConfirmed=[]
                const covidDeaths = []
                const covidRecovered=[]
                // const covidInfoById = []
                tokeMonthsId.forEach(element => {
                    covidConfirmed.push(responseCovid.country[element].Confirmed)
                    covidDeaths.push(responseCovid.country[element].Deaths),
                    covidRecovered.push(responseCovid.country[element].Recovered)
                })
    
                const searchResults = `Durante el mes de ${findMonth.mes} en ${responseCovid.country[0].Country} hubieron ${Math.max(...covidConfirmed)} casos confirmados de infectados, ${Math.max(...covidDeaths)} de muertos y ${Math.max(...covidRecovered)} recuperados`;
                saveSearch(searchResults)
            })
        })
    }else{
        countryCode(country,(responseIso)=>{
            covid19(responseIso.countryCodeDataIso,(responseCovid)=>{

                const justMonth = []
                for (i = 0; i <= responseCovid.country.length-1; i++) {
                    const allDate = new Date(responseCovid.country[i].Date)
                    justMonth.push(allDate.getMonth())       
                }
                const existMonth = []
                allMonths.forEach(element=>{
                    existMonth.push(justMonth.find((monthByMonth)=>monthByMonth===element.id))
                })
                const allMonthToRead = existMonth.filter((existMontOnly)=>existMontOnly != undefined)
                const allResultsHere = []
                secondSearch =(country,allMonthsForSearch)=>{
                    countryCode(country,(responseIso)=>{
                        covid19(responseIso.countryCodeDataIso,(responseCovid)=>{
                
                            const findMonth = allMonths.find((months)=> months.mes=== allMonthsForSearch)
                
                            const justMonth = []
                            for (i = 0; i <= responseCovid.country.length-1; i++) {
                                const allDate = new Date(responseCovid.country[i].Date)
                                justMonth.push(allDate.getMonth())                
                            }
                
                            const tokeMonthsId = [];
                            let idx = justMonth.indexOf(findMonth.id);
                            while (idx != -1) {
                                tokeMonthsId.push(idx);
                                idx = justMonth.indexOf(findMonth.id, idx + 1);
                            }
                
                            const covidConfirmed=[]
                            const covidDeaths = []
                            const covidRecovered=[]
                            // const covidInfoById = []
                            tokeMonthsId.forEach(element => {
                                covidConfirmed.push(responseCovid.country[element].Confirmed)
                                covidDeaths.push(responseCovid.country[element].Deaths),
                                covidRecovered.push(responseCovid.country[element].Recovered)
                            })
                
                            allResultsHere.push(`Durante el mes de ${findMonth.mes} en ${responseCovid.country[0].Country} hubieron ${Math.max(...covidConfirmed)} casos confirmados de infectados, ${Math.max(...covidDeaths)} de muertos y ${Math.max(...covidRecovered)} recuperados`)
                        })
                    })
                }

                allMonthToRead.forEach((element)=>{
                    secondSearch(country,element)
                })
                console.log(allResultsHere)
                // saveSearch(searchResults)
                
            })
        })
    }
}

saveSearch = (searchResults) =>{
    fs.writeFileSync('searchResults.txt', searchResults)
}


module.exports={
        countryCode:countryCode,
        search:search
}

