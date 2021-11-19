
const knex = require('knex')({
    client: 'mysql',
    connection: {
      host : '127.0.0.1',
      user : 'Elliot',
      password : 'student',
      database : 'Homework4',
      port: 3306
    }
});

const express = require('express');
const app = express();

app.get('/city/:Name', async (req,res) => {
    let cityName = req.params.Name
    const read = await knex.select('*').from('city').where("Name", cityName)  
    res.send(read)
});
/**
 * @api {get} /city/:Name CityInfo
 * @apiName GetCityInfo
 * @apiDescription Request information for a cityGet
 * @apiGroup GET
 *
 * @apiParam {String} Name unique city name.
 *
 * @apiSuccess {String} ID Unique ID of the city inside the table.
 * @apiSuccess {String} Name  Name of the city.
 * @apiSuccess {String} CountryCode  Country code of the city.
 * @apiSuccess {String} District  District of the city.
 * @apiSuccess {String} Population  Population number of the city.
 *
 * @apiParamExample {Input Example to call the GetcityInfo}
 *      Example: curl -X GET localhost:3000/city/Kabul
 * 
 * @apiSuccessExample Success-Response:
 * [
 *      {
 *       "ID": 1,
 *       "Name":"Kabul",
 *       "CountryCode":"AFG",
 *       "District":"Kabol",
 *       "Population":1780000
 *      }
 *]
 */  
  
app.post('/city/:Name/:CountryCode/:District/:Population', async (req, res) => {
    const city = {Name: req.params.Name,
         CountryCode: req.params.CountryCode, 
         District: req.params.District, 
         Population: req.params.Population }
    const insert = await knex.insert(city).into('city');
    res.send(insert);
});
/**
 * @api {post} //city/:Name/:CountryCode/:District/:Population PostCityInfo
 * @apiName PostCityInfo
 * @apiDescription tadd a city in the table
 * @apiGroup POST
 *
 * @apiParam {String} Name city name.
 * @apiParam {String} CountryCode  Country code of the city.
 * @apiParam {String} District District of the city.
 * @apiParam {String} Population Population number of the city.
 *
 * @apiSuccess {String} ID Unique ID of the city inside the table.
 * @apiSuccess {String} Name  Name of the city.
 * @apiSuccess {String} CountryCode  Country code of the city.
 * @apiSuccess {String} District  District of the city.
 * @apiSuccess {String} Population  Population number of the city.
 *
 * @apiParamExample {Input Example to call the PostCityInfo}
 *      Example: curl -X POST localhost:3000/city/Belval/LUX/Esh-sur-Alzette/10000
 * 
 * @apiSuccessExample Success-Response:
 * [
 *      {
 *       "ID": NULL,
 *       "Name":"Belval",
 *       "CountryCode":"LUX",
 *       "District":"Esh-sur-Alzette",
 *       "Population":10000
 *      }
 *]
 */  


app.put('/city/:Name/:NewName/:CountryCode/:District/:Population', async (req, res) => {
    const cityName = req.params.Name
    const NewcityName = req.params.NewName
    const CountryCode = req.params.CountryCode
    const District = req.params.District
    const Population = req.params.Population
    const update = await knex('city')
    .where('Name', cityName)
    .update({'Name': NewcityName}).update({'CountryCode':CountryCode})
    .update( {'District': District}).update({'Population': Population})
    res.send(update);
});   
/**
 * @api {put} /city/:Name/:NewName/:CountryCode/:District/:Population PutCityInfo
 * @apiName PutCityInfo
 * @apiDescription Update information for a city
 * @apiGroup PUT
 *
 * @apiParam {String} Name unique city name (this param is used to find the city in the table).
 * @apiParam {String} NewName  updated Name of the city.
 * @apiParam {String} CountryCode  updated Country code of the city.
 * @apiParam {String} District  updated District of the city.
 * @apiParam {String} Population  updated Population number of the city.
 *
 * @apiSuccess {String} ID Unique ID of the city inside the table.
 * @apiSuccess {String} Name  Name of the city.
 * @apiSuccess {String} CountryCode  Country code of the city.
 * @apiSuccess {String} District  District of the city.
 * @apiSuccess {String} Population  Population number of the city.
 *
 * @apiParamExample {Input Example to call the PutCityInfo}
 *      Example: curl -X PUT localhost:3000/city/Kabul/Kabul/FRA/Kabol/2780000
 * 
 * @apiSuccessExample Success-Response:
 * [
 *      {
 *       "ID": 1,
 *       "Name":"Kabul",
 *       "CountryCode":"FRA",
 *       "District":"Kabol",
 *       "Population":2780000
 *      }
 *]
 */  


app.delete('/city/:Name', async (req,res) => {
    let cityName = req.params.Name
    const delete_row = await knex('city').where('Name',cityName).del()
    res.send(delete_row)
});
/**
 * @api {delete} /city/:Name DeleteCity
 * @apiDescription delete a city in the tableD
 * @apiName DeleteCity
 * @apiGroup DELETE
 *
 * @apiParam {String} Name unique city name.
 *
 * @apiSuccess {Boolean} True when the city has been deleting in the table
 *
 * @apiParamExample {Input Example to call the DeleteCity}
 *      Example: curl -X DELETE localhost:3000/city/Kabul
 * 
 * @apiSuccessExample Success-Response:
 * [
 *      {true}
 * ]
 * 
 * @apiError {Boolean} False when the city cannot be deleting in the table
 * 
 * 
 * @apiErrorExample Error-Response:
 * [
 *      {false}
 * ]
 * 
 */

// PORT
const port = process.env.PORT || 3000
app.listen(port, () => console.log(`listening port ${port}...`));


