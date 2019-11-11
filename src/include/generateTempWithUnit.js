export const generateTempWithUnit = (weatherObj, tempUnit) => {
    if (JSON.stringify(weatherObj) !== '{}') {
        if (tempUnit === false) {
            return weatherObj.Temperature.Metric.Value + "°"
        } else {
            return weatherObj.Temperature.Imperial.Value + "°"
        }
    }
    return null
}
