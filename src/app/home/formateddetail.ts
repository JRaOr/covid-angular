export interface CNFormatedCases{
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
    provincestate: string
}

export interface CNDateFormatedCases{
    date: string
    confirmed: number
    deaths: number
    recovered: number
}
