import React, { Component } from 'react';
import { connect } from 'react-redux';
import Chart from '../components/chart';
import GoogleMap from '../components/google_map';

class WeatherList extends Component {
  renderWeather(cityData) {
    const name = cityData.city.name;
    const temps = cityData.list.map(weather => weather.main.temp);
    const pressure = cityData.list.map(weather => weather.main.pressure);
    const humidity = cityData.list.map(weather => weather.main.humidity);
    const {lon, lat} = cityData.city.coord;

    return (
      <tr key={name}>
        <td>
          <GoogleMap lat={lat} lon={lon}/>
        </td>
        <td>
          <Chart data={temps} units='°C' color="red"/>
        </td>
        <td>
          <Chart data={pressure} units='hPa' color="grey"/>
        </td>
        <td>
          <Chart data={humidity} units='%' color="blue"/>
        </td>
      </tr>
    );
  }

  render() {
    return (
      <div className='container'>
        <div className="row">
          <div className="col-md-12">
            <table className='table table-hover'>
              <thead>
              <tr>
                <th>City</th>
                <th>Temperature (°C)</th>
                <th>Pressure (hPa)</th>
                <th>Humidity (%)</th>
              </tr>
              </thead>
              <tbody>
              {this.props.weather.map(this.renderWeather)}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({weather}) {
  return {weather};
}

export default connect(mapStateToProps)(WeatherList);