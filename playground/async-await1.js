/*
 * @Author: Dheeraj Chaudhary 
 * @Date: 2018-02-23 14:55:08 
 * @Last Modified by: Dheeraj.Chaudhary@contractor.hallmark.com
 * @Last Modified time: 2018-02-24 13:46:31
 */

const axios = require('axios');

//Functions Definition

const getExchangeRate = async(from, to) => {
    try {
        const response = await axios.get(`https://api.fixer.io/latest?base=${from}`)
        const rate = response.data.rates[to];
        if (rate) {
            return rate;
        } else {
            throw new Error(`Unable to get exchange rates for ${to}`);
        }
    } catch (error) {
        throw new Error(`Unable to get exchange rates for ${from}`);
    }
};

const getCountries = async(currencyCode) => {
    try {
        const response = await axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`)
        return response.data.map((country) => country.name);
    } catch (error) {
        throw new Error('Unable to get contries');
    }
};

const convertCurrency = async(from, to, amount) => {
    const countries = await getCountries(to);
    const exchangeRates = await getExchangeRate(from, to);

    const exchangedAmount = amount * exchangeRates;
    return `${amount} ${from} is worth ${exchangedAmount} ${to}`;
};

convertCurrency('CAD', 'USD', 100).then((result) => {
    console.log(result);
}).catch((error) => {
    console.log(error.message);
});

//CALLING all the function

getExchangeRate('USD', 'CAD').then((rate) => {
    console.log(rate);
}).catch((error) => {
    console.log(error.message);
});

getCountries('CAD').then((countries) => {
    console.log(countries);
}).catch((error) => {
    console.log(error.message);
});