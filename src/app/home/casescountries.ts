export interface CNCases{
    countryregion: string
    lastupdate: string
    location: {
        lat: number
        lng: number
    }
    countrycode:{
        iso2: string
        iso3: string
    }
    confirmed: number
    deaths: number
    recovered: number
    image: string
}

// {"countryregion":"Zimbabwe",
// "lastupdate":"2021-10-13T17:42:00.005Z",
// "location":{"lat":-19.015438,"lng":29.154857},
// "countrycode":{"iso2":"ZW","iso3":"ZWE"},
// "confirmed":132016,"deaths":4645,"recovered":0}