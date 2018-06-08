import * as actions from './actions'
import carto from '@carto/carto.js';

const cartoClient = new carto.Client({
  apiKey: "14f13a1bee5b93e25bda36f1788f89c57cb7a6e5",
  username: "anagraph-clement"
});


export const simpleAction = (state = {}, action) => {
  switch (action.type) {
    case 'SIMPLE_ACTION':
    return {
      result: action.payload
    }
    default:
    return state
  }
}

export const client = (state = cartoClient, action) => state;

// const SET_MAP = 'SET_MAP'
export const map = (state = false, action) => {
  switch(action.type) {
    case actions.SET_MAP :
     return action.map
     
       default:
         return state;
  }
}

export const data = (state = {}, action) => {
  switch(action.type){
    case 'CHANGE_STATE' :
      return {
        ...state,
        data: action.payload
      };

      default:
       return state
  }
}

const FILTERS_INITIAL_STATE = {
  price: false,
  bbox: false,
  neighbourhoods: false,
}
export const filters = (state = FILTERS_INITIAL_STATE, action) => {
  switch (action.type) {
    case actions.SET_BBOX: {
      // console.log(action.neighbourhoods)
      const [ xmin, ymin, xmax, ymax ] = action.bbox;

      return {
        ...state,
        bbox: `ST_Intersects(the_geom_webmercator, ST_Transform(ST_MakeEnvelope(${xmin}, ${ymin}, ${xmax}, ${ymax}, 4326), 3857))`,
      };
    }
    default:
      return state;
  }
}

export const layers = (state = {}, action) => {
  switch (action.type) {
    case actions.STORE_LAYERS:
      return action.layers

    default:
      return state;
  }
}
