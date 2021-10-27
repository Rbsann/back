const axios = require('axios');
const express = require("express");
import { Router } from 'express';
const router = Router();
const pokeFunctions = require('../utils')
const {pokeData} = pokeFunctions


router.get('/', async (req, res) => {
  const url = `https://pokeapi.co/api/v2/pokemon`
  const pokeDataList = [];
  const {page, name:queryName} = req.query
  if (queryName) {
		axios.get(`${url}`)
      .then(response => {
        const {results} = response.data
        const pokemons = results.filter(poke =>poke.name.includes(queryName))
        pokemons.forEach((poke) => {
					const {name} = poke
					axios.get(`${url}/${name}`)
						.then(response => {
							const data = pokeData(response.data)
              pokeDataList.push(data)
              if (pokeDataList.length === pokemons.length) {
                pokeDataList.sort((a,b) => a.id - b.id)
                const responseObject = {total:pokemons.length, pokemons: pokeDataList}
                res.send(JSON.stringify(responseObject))
                res.end()
              }
						})
						.catch(
							err => res.send(err)
						)
				})
      }).catch(
        err => res.send(err)
      )
  }
  else {
    const offset = 10 * (page - 1);
    axios.get(`${url}?limit=10&offset=${offset}`)
      .then(response => {
        const {count: total} = response.data
        const pokeList = response.data.results;
				pokeList.forEach((poke) => {
					const {name} = poke
					axios.get(`${url}/${name}`)
						.then(response => {
							const data = pokeData(response.data)
              pokeDataList.push(data)
              if (pokeDataList.length === pokeList.length) {
                pokeDataList.sort((a,b) => a.id - b.id)
                const responseObject = {total, pokemons: pokeDataList}
                res.send(JSON.stringify(responseObject))
                res.end()
              }
						})
						.catch(
							err => res.send(err)
						)
				})
			})
      .catch(
        err => res.send(err)
      );
  }
});

export default router;