export default (axios, baseUrl) => {
   return {
      getAll() {
         //console.log(params);
         return axios.get(`${baseUrl}cinemas`);
      }
   }
}