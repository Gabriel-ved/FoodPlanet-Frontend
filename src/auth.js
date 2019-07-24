const isAuthen = ()=>{
    const token = window.localStorage.getItem('@FoodPlanet:token')
    if(token !== null)
      return true

    return false
}

export default isAuthen;
