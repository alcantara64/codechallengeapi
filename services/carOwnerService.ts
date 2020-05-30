import { Filter } from './../modelDefinition/CarOwner';

import CarOwnerModel from '../models/CarOwnerModel'



export const getfilteredParams = async () => {
    try{
 const filteredDocuments =  await CarOwnerModel.aggregate([
        {"$group": { _id:0,
          colors: {$addToSet: '$car_color'},
          countries: {$addToSet: '$country'},
          modelYear: {$addToSet: '$car_model_year'},
        }
     }
    ])
    return {
        countries : filteredDocuments[0].countries, 
        fromDate :Math.max(...filteredDocuments[0].modelYear),
        endDate : Math.min(...filteredDocuments[0].modelYear),
        colors :  filteredDocuments[0].colors,
    }
}catch(e){
    console.error('An error occured', e.message)
}

 
}

export const getItemByFilter =  async (filters:Filter) => {
    try{
const {color, fromYear, endYear, country} = filters;

const results = await CarOwnerModel.find(
    {$or:[
        {car_color:color},{car_model_year:fromYear},{car_model_year:endYear}, {country:country }
]})
return results
    }catch(e){
        console.error('An error occured', e.message);
        return []
    }
}