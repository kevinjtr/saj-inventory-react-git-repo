import api from '../../axios/Api';

export default {
  name: "equipment",
  getReducer: () => {

    const initialState = {
        equipments: [],
    }

    return (state = initialState, { type, payload }) => {
        switch (type) {
            case "GET_EQUIPMENT":
            case "GET_EQUIPMENT_BY_ID":
              return Object.assign({}, state, payload);
            default:
          }

      return state;
    }
  },
  getAllEquipments: (val, cascade, silent) => ({ dispatch, store }) => {
    console.log('equipmentDataCALL')
    this.equipmentData = api.get('equipment', this.state).then((response) => response.data).then((data) => {
        dispatch({
            type: "GET_EQUIPMENT",
            payload: {
                equipments: data.status != 400 ? data.values : data,
              }
          });  
    });
 },
 getEquipmentByID: (val, cascade, silent) => ({ dispatch, store }) => {
    console.log('equipmentDataCALL')
    this.equipmentData = api.get(`equipment/${val}`).then((response) => response.data).then((data) => {
        dispatch({
            type: "GET_EQUIPMENT_BY_ID",
            payload: {
                equipments: data.status != 400 ? data.values : data,
              }
          });  
    });  
 },
 selectEquipments: state => {
    return state.equipment.equipments;
  }
  
};
