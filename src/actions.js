export const simpleAction = () => ({
   type: 'SIMPLE_ACTION',
   payload: 'result_of_simple_action'
 })

export const SET_MAP = '@MAP/SET';
export const setMap = map => ({
  type: SET_MAP,
  map,
});

export const changeData = () => ({
  type: 'CHANGE_STATE',
  payload: '50'
})

export const SET_BBOX = '@Filters/SET_BBOX';
export const setBboxFilter = bbox => ({
  type: SET_BBOX,
  bbox,
});

export const SET_BRANDS = '@Filters/SET_BRANDS';
export const setBrands = brands => ({
  type: SET_BRANDS,
  brands,
});

export const STORE_LAYERS = '@Layers/STORE';
export const storeLayers = layers => ({
  type: STORE_LAYERS,
  layers,
});