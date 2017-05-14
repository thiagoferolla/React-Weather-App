import React, { Component } from 'react';
import {connect} from 'react-redux';
import Chart from '../components/chart.js';
import GoogleMap from '../components/google_map'

class WeatherList extends Component {
    renderWeather(cityData){
        const name = cityData.city.name
        const temps = cityData.list.map(weather => weather.main.temp-273);
        const press = cityData.list.map(weather => weather.main.pressure);
        const hum = cityData.list.map(weather => weather.main.humidity);
        const long = cityData.city.coord.lon; 
        const lat = cityData.city.coord.lat;

        return (
            <tr key={name}>
                <td><GoogleMap lat={lat} lon={long} /></td>
                <td><Chart data={temps} color='orange' unit='ºC' /></td>
                <td><Chart data={press} color='green' unit='hPa' /></td>
                <td><Chart data={hum} color='black' unit='%' /></td>
            </tr>
        )
    }

    render(){
        return (
            <table className='table table-hover'>
                <thead>
                    <tr>
                        <th>City</th>
                        <th>Temperature (ºC)</th>
                        <th>Pressure (hPa)</th>
                        <th>Humidity (%)</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.weather.map(this.renderWeather)}
                </tbody>
            </table>
        )
    }
}

function mapStateToProps(state){
    return {weather: state.weather}
}

export default connect(mapStateToProps)(WeatherList)