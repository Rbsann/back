const axios = require(`axios`);

const pokeData = (poke) => {
	const {id, name} = poke
  const types = poke.types.map(type => type.type.name)
  return {
    id,
    name,
    types,
    image: poke.sprites.front_default
  };
}


module.exports =  {
  pokeData,
}