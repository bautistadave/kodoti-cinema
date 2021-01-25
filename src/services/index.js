import axios from 'axios'
import authService from './AuthService.js'
import cinemaService from './CinemaService.js'
import movieService from './MovieService.js'
import orderService from './OrderService.js'

axios.defaults.headers.common.Accept = 'application/json'

export default {
   authService: new authService(axios, window.baseUrl),
   cinemaService: new cinemaService(axios, window.baseUrl),
   movieService: new movieService(axios, window.baseUrl),
   orderService: new orderService(axios, window.baseUrl),
}