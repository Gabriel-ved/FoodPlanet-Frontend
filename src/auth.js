async function isAuthen() {
   return await window.localStorage.getItem('@FoodPlanet:token') !== null ? true : false;
}
   
export default isAuthen;
