import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherService } from './weather.service';

@Component({
  selector: 'app-root',
  standalone: true, // Add this line
  imports: [CommonModule], // Import other modules if needed
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  weatherData: any = null;
  loading = false;
  error = '';

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          this.getWeatherData(latitude, longitude);
        },
        (error) => {
          this.error = 'Unable to retrieve location';
        }
      );
    } else {
      this.error = 'Geolocation is not supported by this browser.';
    }
  }

  getWeatherData(lat: number, lon: number) {
    this.loading = true;
    this.weatherService.getWeather(lat, lon).subscribe(
      (data) => {
        this.weatherData = data;
        this.loading = false;
      },
      (err) => {
        this.error = 'Failed to fetch weather data';
        this.loading = false;
      }
    );
  }
}
