/**
    oyoflags.js 1.0
    tested with jQuery 3.4.0
    http://www.oyosoftware.nl

    © 2024 oYoSoftware
    MIT License

    oyoflags is a plugin to get the flags and country names in different languages
*/

/**
    Make a country list object for working with country names in different languages
    and using the flags of the countries.
    @param {string} language The language for which the object is made.
    @return {object} The flags object.
*/
function oyoCountryList(language = "en") {

    var countries = [];
    var countryCodes = [];

    url = "langs/" + language + ".json";
    $.ajax({
        url: url,
        dataType: "json",
        async: false,
        success: function (data) {
            Object.entries(data.countries).forEach(function (entry) {
                var countryCode = entry[0];
                var country = entry[1];
                countries[countryCode] = country;
                if (!Array.isArray(country)) {
                    setCountryCode(country, countryCode);
                } else {
                    country.forEach(function (country) {
                        setCountryCode(country, countryCode);
                    });
                }
            });
        }
    });

    /**
        Set country code for the specified country.
        @param {string} country The country for which the country code is set.
        @param {string} countryCode The country code which is set.
    */
    function setCountryCode(country, countryCode) {
        if (Object.keys(countryCodes).includes(country)) {
            if (!Array.isArray(countryCodes[country])) {
                countryCodes[country] = [countryCodes[country]];
            }
            countryCodes[country].push(countryCode);
        } else {
            countryCodes[country] = countryCode;
        }
    }

    var countryList = this;

    /**
        Get country for the specified country code.
        @param {string} countryCode The country code for which the country is retrieved.
        @param {int} index The index of the country if several names are found.
    */
    countryList.getCountry = function (countryCode, index = 0) {
        countryCode = countryCode.toUpperCase();
        var country = countries[countryCode];
        if (Array.isArray(country)) {
            if (index > country.length - 1) {
                index = 0;
            }
            country = country[index];
        }
        if (country === undefined) {
            country = "Unknown";
        }
        return country;
    };

    /**
        Get country code for the specified country.
        @param {string} country The country for which the country code is retrieved.
        @param {int} index The index of the country code if several codes are found.
        @return {string} The country code.
    */
    countryList.getCountryCode = function (country, index = 0) {
        var countryCode = countryCodes[country];
        if (Array.isArray(countryCode)) {
            if (index > countryCode.length - 1) {
                index = 0;
            }
            countryCode = countryCode[index];
        }
        if (countryCode === undefined) {
            countryCode = "XX";
        }
        return countryCode;
    };

    /**
        Get country flag element for the specified country code.
        @param {string} countryCode The country code for which the country flag is retrieved.
        @param {number} width The width of the flag element.
        @return {string} The flag element.
    */
    countryList.getCountryFlag = function (countryCode, width = "100px") {
        var flag = document.createElement("img");
        var src = "flags/" + countryCode.toLowerCase() + ".svg";
        $(flag).attr("src", src);
        $(flag).attr("width", width);
        return flag;
    };

    /**
        Translate a country to another language using another country list.
        @param {string} country The country which has to be translated.
        @param {string} transCountryList The other country list to which the country has to be translated.
        @param {string} index The index of the country if several names are found.
    */
    countryList.translateCountry = function (country, transCountryList, index = 0) {
        var countryCode = countryList.getCountryCode(country);
        var country = transCountryList.getCountry(countryCode, index);
        return country;
    };

    /**
        Get the full countries list.
        @return {array} All the countries.
    */
    countryList.getCountries = function() {
        return countries;
    };

    /**
        Get the full country codes list.
        @return {array} All the country codes.
    */
    countryList.getCountryCodes = function() {
        return countryCodes;
    };

}