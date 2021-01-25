<template>
  <div class="container mt-5">
     <form @submit.prevent="login">
        <div><h6 v-if="error">{{error}}</h6></div>

         <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Email address</label>
            <input type="email" 
                  class="form-control" 
                  id="exampleInputEmail1" 
                  aria-describedby="emailHelp"
                  v-model="email"
                  required>
         </div>
         <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">Password</label>
            <input type="password" 
                   class="form-control" 
                   id="exampleInputPassword1"
                   v-model="password"
                   required>
         </div>
         <button type="submit"
                  class="btn btn-primary"
                  >Ingresar</button>
      </form>
  </div>
</template>

<script>
export default {
   name: 'Login',
   components: {},
   data() {
      return {
         email: null,
         password: null, 
         error: null
      }
   },
   methods: {
      login() {
         this.$services.authService.login({
            email: this.email,
            password: this.password
         }).then(r => {
            if (!r.data.isSuccess) {
               this.error = r.data.message;
            } else {
               this.$services.authService.prepare(r.data.access_token);
               this.$parent.step = 'catalog';
               this.$parent.userId = r.data.result.id; // recibe data desde App  
            }
         })
         
      }
   }
}
</script>

<style>

</style>