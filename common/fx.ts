export const fx = [
    {
        code: "US",
        currencyFormatter: new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD"
        }).format,
        rate: 0.65
    },
    {
        code: "AU",
        currencyFormatter: new Intl.NumberFormat("en-AU", {
            style: "currency",
            currency: "AUD"
        }).format,
        rate: 1
    },
    {
        code: "JP",
        currencyFormatter: new Intl.NumberFormat("ja-JP", {
            style: "currency",
            currency: "JPY"
        }).format,
        rate: 300
    }
]