export default (axios, baseUrl) => {
   return {
      create(params) {
         //console.log(params);
         return axios.post(`${baseUrl}orders`, params);
      }
   }
}