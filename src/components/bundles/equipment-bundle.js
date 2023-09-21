import toast from 'react-hot-toast';
import { updateEquipmentApi, destroyEquipmentApi, addEquipmentApi, getAllEquipmentsApi, equipmentSearchApi2 } from '../../publics/actions/equipment-api'
import { findIndex } from 'lodash'
import { OPTIONS_DEFAULT, BLANKS_DEFAULT } from '../config/constants'

const OPTS_RESET = {
  includes: {},
  blanks: {}
}

const OPTS_DEFAULT_SEARCH = {
  hraNum: OPTIONS_DEFAULT,
  hraName: OPTIONS_DEFAULT,
  itemType: OPTIONS_DEFAULT,
  bartagNum: OPTIONS_DEFAULT,
  employeeName: OPTIONS_DEFAULT,
}

const BLANKS_DEFAULT_SEARCH = {
  hraNum: BLANKS_DEFAULT,
  hraName: BLANKS_DEFAULT,
  itemType: BLANKS_DEFAULT,
  bartagNum: BLANKS_DEFAULT,
  employeeName: BLANKS_DEFAULT,
}

const loading_set = {
  0: true,
  1: true,
  2: true,
  3: false,
  4: true,
}

const loading_reset = {
  0: false,
  1: false,
  2: false,
  3: false,
  4: false,
}
const equipments_reset = {
    0: [],
    1: [],
    2: [],
    3: [],
    4: []
  }

const editable_reset = {
  0:false,
  1:false,
  2:false,
  3:false,
  4:false,
}

const rights_reset = {
  0:{view: false, edit:false},
  1:{view: false, edit:false},
  2:{view: false, edit:false},
  3:{view: false, edit:false},
  4:{view: false, edit:false},
}

const filteredDataRows_reset = {
  0: [],
  1: [],
  2: [],
  3: [],
  4: [],
}
// const switches_reset = {
//     0: SWITCH_RESET,
//     1: SWITCH_RESET,
//     2: SWITCH_RESET,
//     3: SWITCH_RESET,
//     4: SWITCH_RESET,
// }

export default {
  name: "equipment",
  getReducer: () => {
    const initialState = {
        initialLoad: true,
        equipments: [],
        hras: [],
        myHras: [],
        employees:[],
        editable: editable_reset,
        rights: rights_reset,
        loading: loading_reset,
        filteredDataRows: filteredDataRows_reset,
        serverDown: false,
    }

    return (state = initialState, { type, payload }) => {
        switch (type) {
            case "GET_ALL_EQUIPMENTS":
            case "UPDATE_EQUIPMENT":
            case "ADD_EQUIPMENT":
            case "FETCHING_STARTED":
            case "FETCHING_FINISHED":
            case "INITIAL_LOAD":
              return Object.assign({}, state, payload);
            default:
          }

      return state;
    }
  },
  doSearchEquipmentTab: (val, cascade, silent) => ({ dispatch, store }) => {

    let opts = {
      includes: OPTS_DEFAULT_SEARCH,
      blanks: BLANKS_DEFAULT_SEARCH,
    }    

    dispatch({
      type: "FETCHING_STARTED",
      payload: {
          loading: {...store.selectLoading(), [val.num]: true},
        }
    });  

    equipmentSearchApi2({
      'fields': {},
      'options':opts,
      'tab': val.id,
      //'init': true
    }, store.selectUserToken())
    .then((response) => response.data).then((data) => {

      try{
        dispatch({
          type: "FETCHING_FINISHED",
          payload: {
              loading: {...store.selectLoading(), [val.num]: false},
              equipments: {...store.selectEquipments(), [val.num]: data.data[val.num]},
              filteredDataRows: {...store.selectFilteredDataRows(), [val.num]: data.data[val.num]},
              //editable: Object.keys(data.editable).length > 0 ? data.editable : editable_reset,
              //rights: Object.keys(data.rights).length > 0 ? data.rights : rights_reset,
              //hras: data.hras,
              //myHras: data.my_hras,
              //employees: data.employees,
            }
        }); 
      }catch(err){
        dispatch({
          type: "FETCHING_FINISHED",
          payload: {
              loading: {...store.selectLoading(), [val.num]: false},
            }
        });  
      }

    }).catch(function (error) {
      dispatch({
        type: "FETCHING_FINISHED",
        payload: {
            loading: {...store.selectLoading(), [val.num]: false},
          }
      });  
    });

  },
  // doUpdateEquipment: (val, cascade, silent) => ({ dispatch, store }) => {

  //   const {rowData} = val
  //   dispatch({
  //     type: "FETCHING_STARTED",
  //     payload: {
  //         loading: true
  //       }
  //   });  


  //   updateEquipmentApi(rowData, store.selectUserToken())
  //     .then((response) => response.data).then((data) => {
  //       const {tabChanges, error} = data
  //       //errorFound = error

  //       if(error){
  //         toast.error('Could not complete action')
  //       }else {
  //         let equipments_copy = {...store.selectEquipments()}

  //         for(const tab_number in tabChanges){
  //           for(const eq_change of tabChanges[tab_number]){
  //             let equipments_tab_copy = [...equipments_copy[tab_number]]
  //             const idx = findIndex(equipments_tab_copy,function(eq){return eq.bar_tag_num == eq_change.bar_tag_num})

  //             if(idx != -1){
  //               equipments_tab_copy[idx] = eq_change
  //               console.log(equipments_tab_copy[idx])
  //               equipments_copy = {...equipments_copy,[tab_number]: equipments_tab_copy}
  //             }
  //           }
  //         }

  //         dispatch({
  //           type: "FETCHING_FINISHED",
  //           payload: {
  //               loading: loading_reset,
  //               equipments: equipments_copy,
  //             }
  //         });  

  //         //setEquipments()
  //         toast.success('Action was completed')
  //       }        

  //     }).catch(function (error) {
  //       console.log(error)
  //       dispatch({
  //         type: "FETCHING_FINISHED",
  //         payload: {
  //             loading: loading_reset,
  //             //equipments: equipments_copy,
  //           }
  //       });  
  //       toast.error('Could not complete action')
  //     });
  // },
  doSetEquipments: (val, cascade, silent) => ({ dispatch, store }) => {
    dispatch({
      type: "UPDATE_EQUIPMENT",
      payload: {
          equipments: val
        }
    });  
  },
  doSetFilteredDataRows: (val, cascade, silent) => ({ dispatch, store }) => {
    dispatch({
      type: "UPDATE_EQUIPMENT",
      payload: {
          filteredDataRows: val
        }
    });  
  },
  doGetAllEquipmentTabsInitialLoad: (val, cascade, silent) => ({ dispatch, store }) => {

    dispatch({
      type: "FETCHING_STARTED",
      payload: {
          loading: loading_set
        }
    });  

    equipmentSearchApi2({
      'fields': {},
      'options':OPTS_RESET,
      //'tab': equipmentTabs[tabs].id,
      'init': true
    }, store.selectUserToken())
    .then((response) => response.data).then((data) => {
      console.log(data)

      dispatch({
        type: "FETCHING_FINISHED",
        payload: {
            initialLoad: false,
            loading: loading_reset,
            equipments: data.data,
            editable: Object.keys(data.editable).length > 0 ? data.editable : editable_reset,
            rights: Object.keys(data.rights).length > 0 ? data.rights : rights_reset,
            hras: data.hras,
            myHras: data.my_hras,
            employees: data.employees,
            filteredDataRows: data.data,
          }
      });  

    }).catch(function (error) {
      dispatch({
        type: "FETCHING_FINISHED",
        payload: {
            initialLoad: false,
            loading: loading_reset,
            serverDown: true
          }
      });  
    });

  },
 selectEquipments: state => {
    return state.equipment.equipments;
  },
  selectEmployees: state => {
    return state.equipment.employees;
  },
  selectHras: state => {
    return state.equipment.hras;
  },
  selectMyHras: state => {
    return state.equipment.myHras;
  },
  selectEditable: state => {
    return state.equipment.editable;
  },
  selectRights: state => {
    return state.equipment.rights;
  },
  selectLoading: state => {
    return state.equipment.loading;
  },
  selectInitialLoad: state => {
    return state.equipment.initialLoad;
  },
  selectFilteredDataRows: state => {
    return state.equipment.filteredDataRows;
  },
  selectServerDown: state => {
    return state.equipment.serverDown;
  }
};
