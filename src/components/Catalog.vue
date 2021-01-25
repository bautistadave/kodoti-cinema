<template>
  <div class="container mt-5">
     <div class="row mb-3">
        <select class="form-select" v-model="cinemaId">
            <option disabled :value="null">Elige Cine</option>
            <option 
                  v-for="cinema in cinemas" 
                  :key="cinema.id"
                  :value="cinema.id"
                  >{{cinema.name}}
            </option>
         </select>
     </div>
     <div class="row mb-3">
        <div class="col-8">
            <select class="form-select" v-model="order.quantity">
               <option disabled :value="null">Elige cantidad de entradas</option>
               <option :value="1">1 entrada</option>
               <option :value="2">2 entrada</option>
               <option :value="3">3 entrada</option>
               <option :value="4">4 entrada</option>
               <option :value="5">5 entrada</option>
            </select>
         </div>
         <div class="col-4">TOTAL {{ total | currency }}</div>
     </div>

     <div class="row mb-3">
         <div class="card" style="width: 15rem;"
            v-for="movie in catalog" :key="movie.id">
            <img :src="movie.image" class="card-img-top" alt="image">
            <div class="card-body">
               <p class="card-text">{{movie.name}}</p>
               <p class="card-text">{{movie.description}}</p>
               <!-- <p class="card-text">{{movie.name}}</p> -->
               <select class="form-select" v-model="order.scheduleId">
                  <option selected  :value="null" >Horarios</option>
                  <option v-for="item in getSchedule(movie.id)" 
                          :key="item.id"
                          :value="item.id"
                          >{{ item.time }}
                  </option>
               </select>
            </div>
         </div>
     </div>

     <div class="row mb-3">
        <button class="btn btn-success"
                :disabled='!isReady' 
                @click="save"
               >Generar compra
         </button>
      </div> 
  </div>
</template>

<script>
export default {
   name: 'catalog',
   props: {
      userId: {
         type: Number,
         required: true
      }   
   },
   components: {},
   data() {
      return {
         cinemas: [],
         movies: [],
         cinemaId: null,
         order: {
            scheduleId: null,
            quantity: null
         }
      }
   },
   methods: {
      getSchedule(movieId) {
         let schedules = this.cinemas.find(x => x.id == this.cinemaId).schedules;
         // Horarios de cinema  
         return schedules.filter(x => x.movieId === movieId);
         // filtro donde la pelicula es la seleccionada
         
      },
      save() {
         let self = this;
         let order = {
            quantity: self.order.quantity,
            scheduleId: self.order.scheduleId,
            userId: self.userId
         }
         console.log(order);
         this.$services.orderService.create(order).then(() => {
            this.$parent.step = 'compleated';
         });
      }
   },
   computed: {
      catalog() {
         if (this.cinemaId === null) return []

         let cinema = this.cinemas.find(x => x.id == this.cinemaId); 
         // id del cine seleccionado 
         let ids = cinema.schedules.map(x => x.movieId);
         // array de id de las pelis encontradas
         return this.movies.filter(x => ids.includes(x.id));
         // si el valor se encuentra en el array incluyelo
      },
      total() {
         if (this.order.quantity === null) return 0; 
         return this.cinemas.find(x => x.id == this.cinemaId).price * this.order.quantity;
      },
      isReady() {
         return this.order.scheduleId != null && this.order.quantity != null;
         // cantidad y horario no nulos se activa 
      }
   },
   mounted() {
      this.$services.cinemaService.getAll().then(r => {
         this.cinemas = r.data
      })

      this.$services.movieService.getAll().then(r => {
         this.movies = r.data
      })
   },
}
</script>

<style>

</style>