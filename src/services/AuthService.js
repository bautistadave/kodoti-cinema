export default (axios, baseUrl) => {
   return {
      login(params) {
         console.log(params);
         return axios.post(`${baseUrl}auth/login`, params);
      },
      prepare(token) {
         axios.defaults.headers.common.authorization = token;
      }
   }
}