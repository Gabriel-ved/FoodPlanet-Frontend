async function isAuthen() {
   return await localStorage.getItem('@FoodPlanet:token') !== null ? true : false;
}
   // TODO: arrumar redirect
export default isAuthen;
