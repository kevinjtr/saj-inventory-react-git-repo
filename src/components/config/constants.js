export const SEARCH_FIELD_OPTIONS = [{value:"includes",label:"Includes"}, {value:"excludes",label:"Excludes"}, {value:"equals",label:"Equals"}, {value:"notEquals",label:"Not Equals"}]
export const SEARCH_FIELD_BLANKS = [{value:"displayBlanks",label:"Display Blanks"}, {value:"hideBlanks",label:"Hide Blanks"}, {value:"onlyBlanks",label:"Only Blanks"}]
export const EQUIPMENT = 'equipment'
export const EMPLOYEE = 'employee'
export const HRA = 'hra'
export const ENG4900 = 'eng4900'
export const ANNUAL_INVENTORY = 'annualinventory'
export const REGISTER = 'register'
export const CHANGE_HISTORY = 'change-history'
export const PROBLEM = 'problem'
export const REGISTRATIONVIEWER = 'registrationviewer'
export const AVD_SEARCH = 'adv'
export const BASIC_SEARCH = 'std'
export const OPTIONS_DEFAULT = 'includes'
export const BLANKS_DEFAULT = 'displayBlanks'
export const AUTHORIZED_USERS = 'authorizedusers'
export const registrationDropDownItems = {
    "division": [
      {
        "value": 1,
        "label": "Great Lakes and Ohio River Division",
        "symbol": "LRD"
      },
      {
        "value": 2,
        "label": "North Atlantic Division",
        "symbol": "NAD"
      },
      {
        "value": 3,
        "label": "Mississippi Valley Division",
        "symbol": "MVD"
      },
      {
        "value": 4,
        "label": "Northwestern Division",
        "symbol": "NWD"
      },
      {
        "value": 5,
        "label": "Pacific Ocean Division",
        "symbol": "POD"
      },
      {
        "value": 6,
        "label": "South Atlantic Division",
        "symbol": "SAD"
      },
      {
        "value": 7,
        "label": "Southwestern Division",
        "symbol": "SWD"
      },
      {
        "value": 8,
        "label": "South Pacific Division",
        "symbol": "SPD"
      }
    ],
    "district" : {
      "LRD":[
        {"value":1, "label":"Buffalo District", "symbol":"LRB"},
        {"value":2, "label":"Chicago District", "symbol":"LRC"},
        {"value":3, "label":"Detroit District", "symbol":"LRE"},
        {"value":4, "label":"Huntington District", "symbol":"LRH"},
        {"value":5, "label":"Louisville District", "symbol":"LRL"},
        {"value":6, "label":"Nashville District", "symbol":"LRN"},
        {"value":7, "label":"Pittsburgh District", "symbol":"LRP"}
      ],
      "NAD":[
        {"value":1, "label":"Baltimore District", "symbol":"NAB"},
        {"value":2, "label":"New England District", "symbol":"NAE"},
        {"value":3, "label":"New York District", "symbol":"NAN"},
        {"value":4, "label":"Norfolk District", "symbol":"NAO"},
        {"value":5, "label":"Philadelphia District", "symbol":"NAP"}
      ],
      "NWD":[
        {"value":1, "label":"Kansas City District", "symbol":"NWK"},
        {"value":2, "label":"Omaha District", "symbol":"NWO"},
        {"value":3, "label":"Portland District", "symbol":"NWP"},
        {"value":4, "label":"Seattle District", "symbol":"NWS"},
        {"value":5, "label":"Walla Walla District", "symbol":"NWW"}
      ],
      "MVD": [
        {"value":1, "label":"Memphis District", "symbol":"MVM"},
        {"value":2, "label":"New Orleans District", "symbol":"MVN"},
        {"value":3, "label":"Rock Island District", "symbol":"MVR"},
        {"value":4, "label":"St. Louis District", "symbol":"MVS"},
        {"value":5, "label":"St. Paul District", "symbol":"MVP"},
        {"value":6, "label":"Vicksburg District", "symbol":"MVK"}
      ],
      "SAD":[
        {"value":1, "label":"Charleston District", "symbol":"SAC"},
        {"value":2, "label":"Jacksonville District", "symbol":"SAJ"},    
        {"value":3, "label":"Mobile District", "symbol":"SAM"},
        {"value":4, "label":"Savannah District", "symbol":"SAS"},
        {"value":5, "label":"Wilmington District", "symbol":"SAW"}
      ],
      "POD":[
        {"value":1, "label":"Alaska District", "symbol":"POA"},
        {"value":2, "label":"Honolulu District", "symbol":"POH"}
      ],
      "SPD": [
        {"value":1, "label":"Albuquerque District", "symbol":"SPA"},
        {"value":2, "label":"Los Angeles District", "symbol":"SPL"},
        {"value":3, "label":"Sacramento District", "symbol":"SPK"},
        {"value":4, "label":"San Francisco District", "symbol":"SPN"}
      ],
      "SWD":[
        {"value":1, "label":"Fort Worth District", "symbol":"SWF"},
        {"value":2, "label":"Galvenston District", "symbol":"SWG"},
        {"value":3, "label":"Little Rock District", "symbol":"SWL"},
        {"value":4, "label":"Tulsa District", "symbol":"SWT"}
      ]
  },
    "officeSymbol": [
      {
        "value": 14,
        "alias": "CD-C",
        "label": "CD-C"
      },
      {
        "value": 15,
        "alias": "CD-G",
        "label": "CD-G"
      },
      {
        "value": 16,
        "alias": "CD-GC",
        "label": "CD-GC"
      },
      {
        "value": 17,
        "alias": "CD-GS",
        "label": "CD-GS"
      },
      {
        "value": 18,
        "alias": "CD-GT",
        "label": "CD-GT"
      },
      {
        "value": 19,
        "alias": "CD-M",
        "label": "CD-M"
      },
      {
        "value": 20,
        "alias": "CD-N",
        "label": "CD-N"
      },
      {
        "value": 21,
        "alias": "CD-NC",
        "label": "CD-NC"
      },
      {
        "value": 22,
        "alias": "CD-NM",
        "label": "CD-NM"
      },
      {
        "value": 23,
        "alias": "CD-Q",
        "label": "CD-Q"
      },
      {
        "value": 24,
        "alias": "CD-W",
        "label": "CD-W"
      },
      {
        "value": 25,
        "alias": "CD-WC",
        "label": "CD-WC"
      },
      {
        "value": 26,
        "alias": "CD-WH",
        "label": "CD-WH"
      },
      {
        "value": 27,
        "alias": "CD-WM",
        "label": "CD-WM"
      },
      {
        "value": 28,
        "alias": "CD-WW",
        "label": "CD-WW"
      },
      {
        "value": 29,
        "alias": "DS-CD",
        "label": "DS-CD"
      },
      {
        "value": 30,
        "alias": "EN-D",
        "label": "EN-D"
      },
      {
        "value": 31,
        "alias": "EN-DG",
        "label": "EN-DG"
      },
      {
        "value": 32,
        "alias": "EN-DL",
        "label": "EN-DL"
      },
      {
        "value": 33,
        "alias": "EN-DM",
        "label": "EN-DM"
      },
      {
        "value": 34,
        "alias": "EN-G",
        "label": "EN-G"
      },
      {
        "value": 35,
        "alias": "EN-T",
        "label": "EN-T"
      },
      {
        "value": 36,
        "alias": "EN-TA",
        "label": "EN-TA"
      },
      {
        "value": 37,
        "alias": "EN-TC",
        "label": "EN-TC"
      },
      {
        "value": 38,
        "alias": "PD-D",
        "label": "PD-D"
      },
      {
        "value": 39,
        "alias": "PD-E",
        "label": "PD-E"
      },
      {
        "value": 40,
        "alias": "PD-EC",
        "label": "PD-EC"
      },
      {
        "value": 41,
        "alias": "PD-ES",
        "label": "PD-ES"
      },
      {
        "value": 42,
        "alias": "PD-PN",
        "label": "PD-PN"
      },
      {
        "value": 43,
        "alias": "PD-PW",
        "label": "PD-PW"
      },
      {
        "value": 44,
        "alias": "PM-PD",
        "label": "PM-PD"
      },
      {
        "value": 45,
        "alias": "PD-PD",
        "label": "PD-PD"
      },
      {
        "value": 46,
        "alias": "EN-DS",
        "label": "EN-DS"
      },
      {
        "value": 47,
        "alias": "EN-DW",
        "label": "EN-DW"
      },
      {
        "value": 48,
        "alias": "PD-P",
        "label": "PD-P"
      },
      {
        "value": 49,
        "alias": "EN-DC",
        "label": "EN-DC"
      },
      {
        "value": 50,
        "alias": "EN-DP",
        "label": "EN-DP"
      }
    ],
    "userType": [
      {
        "value": 2,
        "alias": "hra",
        "label": "HRA Employee"
      },
      {
        "value": 4,
        "alias": "employee",
        "label": "Regular Employee"
      }
    ]
}
export const condition = [{"id":1,"alias":"A","name":"Serviceable"},{"id":2,"alias":"F","name":"Repairable"},{"id":3,"alias":"S","name":"Unserviceable"}]
export const officesSymbol = [{"id":14,"alias":"CD-C","name":"CD-C"},{"id":15,"alias":"CD-G","name":"CD-G"},{"id":16,"alias":"CD-GC","name":"CD-GC"},{"id":17,"alias":"CD-GS","name":"CD-GS"},
{"id":18,"alias":"CD-GT","name":"CD-GT"},{"id":19,"alias":"CD-M","name":"CD-M"},{"id":20,"alias":"CD-N","name":"CD-N"},{"id":21,"alias":"CD-NC","name":"CD-NC"},{"id":22,"alias":"CD-NM","name":"CD-NM"},
{"id":23,"alias":"CD-Q","name":"CD-Q"},{"id":24,"alias":"CD-W","name":"CD-W"},{"id":25,"alias":"CD-WC","name":"CD-WC"},{"id":26,"alias":"CD-WH","name":"CD-WH"},{"id":27,"alias":"CD-WM","name":"CD-WM"},
{"id":28,"alias":"CD-WW","name":"CD-WW"},{"id":29,"alias":"DS-CD","name":"DS-CD"},{"id":30,"alias":"EN-D","name":"EN-D"},{"id":31,"alias":"EN-DG","name":"EN-DG"},{"id":32,"alias":"EN-DL","name":"EN-DL"},
{"id":33,"alias":"EN-DM","name":"EN-DM"},{"id":34,"alias":"EN-G","name":"EN-G"},{"id":35,"alias":"EN-T","name":"EN-T"},{"id":36,"alias":"EN-TA","name":"EN-TA"},{"id":37,"alias":"EN-TC","name":"EN-TC"},
{"id":38,"alias":"PD-D","name":"PD-D"},{"id":39,"alias":"PD-E","name":"PD-E"},{"id":40,"alias":"PD-EC","name":"PD-EC"},{"id":41,"alias":"PD-ES","name":"PD-ES"},{"id":42,"alias":"PD-PN","name":"PD-PN"},
{"id":43,"alias":"PD-PW","name":"PD-PW"},{"id":44,"alias":"PM-PD","name":"PM-PD"},{"id":45,"alias":"PD-PD","name":"PD-PD"},{"id":46,"alias":"EN-DS","name":"EN-DS"},{"id":47,"alias":"EN-DW","name":"EN-DW"},
{"id":48,"alias":"PD-P","name":"PD-P"},{"id":49,"alias":"EN-DC","name":"EN-DC"},{"id":50,"alias":"EN-DP","name":"EN-DP"}]

export const lockOptions = {2:'UNLOCK',1:'LOCK'}