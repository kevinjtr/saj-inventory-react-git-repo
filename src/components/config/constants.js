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
export const UPDATES_MAINTENANCE_MESSAGES = 'updates_maintenance_messages'
export const EXCESS_EQUIPMENT = 'excessequipment'
export const DARK_MODE_BACKGROUND_COLOR = '#121212'

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
      },
      {
        "value": 51,
        "alias": "CELA",
        "label": "CELA"
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
    ],
    "officeLocation":[
        {"id":1,"name":"BCWPA Resident Office","section":"Construction","address":"3000 SW 148th Avenue Suite 251","city":"Miramar","state":"FL","zipcode":33027,"division":6,"district":25}
        ,{"id":2,"name":"EAA Embankment Office","section":"Construction","address":"13849 Wellington Trace","city":"Wellington","state":"FL","zipcode":33414,"division":6,"district":25}
        ,{"id":3,"name":"EAA Pump Station Office","section":"Construction","address":"13849 Wellington Trace","city":"Wellington","state":"FL","zipcode":33414,"division":6,"district":25}
        ,{"id":4,"name":"C-43 Project Office","section":"Construction","address":"3383 Congen Rd","city":"LaBelle","state":"FL","zipcode":33935,"division":6,"district":25}
        ,{"id":5,"name":"EAA Structures Office","section":"Construction","address":"13849 Wellington Trace","city":"Wellington","state":"FL","zipcode":33414,"division":6,"district":25}
        ,{"id":6,"name":"HHD Central Resident Office","section":"Construction","address":"13849 Wellington Trace","city":"Wellington","state":"FL","zipcode":33414,"division":6,"district":25}
        ,{"id":7,"name":"HHD North Resident Office","section":"Construction","address":"13849 Wellington Trace","city":"Wellington","state":"FL","zipcode":33414,"division":6,"district":25}
        ,{"id":8,"name":"HHD South Resident Office","section":"Construction","address":"13849 Wellington Trace","city":"Wellington","state":"FL","zipcode":33414,"division":6,"district":25}
        ,{"id":9,"name":"Miami Coastal Resident Office","section":"Construction","address":"3000 SW 148th Avenue Suite 251","city":"Miramar","state":"FL","zipcode":33027,"division":6,"district":25}
        ,{"id":10,"name":"Miami Restoration Resident Office","section":"Construction","address":"3000 SW 148th Avenue Suite 251","city":"Miramar","state":"FL","zipcode":33027,"division":6,"district":25}
        ,{"id":11,"name":"La Plata Project Office (S)","section":"Construction","address":"383 FD Roosevelt Avenue Suite 202","city":"San Juan","state":"PR","zipcode":918,"division":6,"district":25}
        ,{"id":12,"name":"North PR Resident Office","section":"Construction","address":"383 FD Roosevelt Avenue Suite 202","city":"San Juan","state":"PR","zipcode":918,"division":6,"district":25}
        ,{"id":13,"name":"North PR Resident Office (S)","section":"Construction","address":"383 FD Roosevelt Avenue Suite 202","city":"San Juan","state":"PR","zipcode":918,"division":6,"district":25}
        ,{"id":14,"name":"Rio Puerto Nuevo Resident Office (S)","section":"Construction","address":"383 FD Roosevelt Avenue Suite 202","city":"San Juan","state":"PR","zipcode":918,"division":6,"district":25}
        ,{"id":15,"name":"Sebring Project Office","section":"Construction","address":"939 Mall Ring Road ","city":"Sebring","state":"FL","zipcode":33870,"division":6,"district":25}
        ,{"id":16,"name":"C-24 STA Project Office","section":"Construction","address":"13849 Wellington Trace","city":"Wellington","state":"FL","zipcode":33414,"division":6,"district":25}
        ,{"id":17,"name":"Support for Others Resident Office","section":"Construction","address":"383 FD Roosevelt Ave Suite 202","city":"San Juan","state":"PR","zipcode":91800,"division":6,"district":25}
        ,{"id":18,"name":"Jacksonville District Office","section":"HQ","address":"701 San Marco Boulevard","city":"Jacksonville","state":"FL","zipcode":32207,"division":6,"district":25}
        ,{"id":19,"name":"Tampa Resident Office","section":"Construction","address":"10117 Princess Palm Ave Suite 120","city":"Tampa","state":"FL","zipcode":33619,"division":6,"district":25}
        ,{"id":20,"name":"North Florida Area Office","section":"Construction","address":"6735 Southpoint Drive South Suite 140","city":"Jacksonville","state":"FL","zipcode":32216,"division":6,"district":25}
        ,{"id":21,"name":"Jacksonville Resident Office","section":"Construction","address":"6736 Southpoint Drive South Suite 140","city":"Jacksonville","state":"FL","zipcode":32216,"division":6,"district":25}
        ,{"id":22,"name":"Miami Area Office","section":"Construction","address":"3000 SW 148th Avenue Suite 251 ","city":"Miramar","state":"FL","zipcode":33027,"division":6,"district":25}
        ,{"id":23,"name":"West Palm Beach Area Office","section":"Construction","address":"4400 PGA Boulevard Suite 203 ","city":"Palm Beach Gardens","state":"FL","zipcode":33410,"division":6,"district":25}
        ,{"id":24,"name":"IRL-S  Resident Office","section":"Construction","address":"4401 PGA Boulevard Suite 203","city":"Palm Beach Gardens","state":"FL","zipcode":33410,"division":6,"district":25}
        ,{"id":25,"name":"Herbert Hoover Dike Area Office","section":"Construction","address":"13849 Wellington Trace ","city":"Wellington","state":"FL","zipcode":33414,"division":6,"district":25}
        ,{"id":26,"name":"Antilles Area Office","section":"Construction","address":"383 Franklin Delano Roosevelt Avenue Suite 202 ","city":"San Juan","state":"PR","zipcode":918,"division":6,"district":25}
        ,{"id":27,"name":"West Palm Beach Coastal Resident Office","section":"Construction","address":"4400 PGA Boulevard Suite 203","city":"Palm Beach Gardens","state":"FL","zipcode":33410,"division":6,"district":25}
        ,{"id":28,"name":"EAA Area Office","section":"Construction","address":"13849 Wellington Trace ","city":"Wellington","state":"FL","zipcode":33414,"division":6,"district":25}
        ,{"id":29,"name":"IIS\/Melbourne Resident Office","section":"Construction","address":"1020 Eau Gallie Boulevard Suite A","city":"Melbourne","state":"FL","zipcode":32935,"division":6,"district":25}
        ,{"id":30,"name":"Pensacola Permits Section","section":"Regulatory","address":"41 North Jefferson Street Suite 301 ","city":"Pensacola","state":"FL","zipcode":32502,"division":6,"district":25}
        ,{"id":31,"name":"Panama City Permits Section","section":"Regulatory","address":"415 Richard Jackson Boulevard Suite 411","city":"Panama City Beach","state":"FL","zipcode":32407,"division":6,"district":25}
        ,{"id":32,"name":"Gainesville Regulatory Office","section":"Regulatory","address":"2833 NW 41st Street Unit 130","city":"Gainsville","state":"FL","zipcode":32606,"division":6,"district":25}
        ,{"id":33,"name":"Tampa Permits Section","section":"Regulatory","address":"10117 Princess Palm Avenue Suite 120","city":"Tampa","state":"FL","zipcode":33610,"division":6,"district":25}
        ,{"id":34,"name":"Fort Myers Permits Section","section":"Regulatory","address":"1520 Royal Palm Square Boulevard Suite 310","city":"Fort Myers","state":"FL","zipcode":33919,"division":6,"district":25}
        ,{"id":35,"name":"Antilles Permits Section","section":"Regulatory","address":"383 Franklin Delano Roosevelt Avenue Suite 202 ","city":"San Juan","state":"PR","zipcode":918,"division":6,"district":25}
        ,{"id":36,"name":"Miami Permits Section","section":"Regulatory","address":"9900 SW 107th Avenue Suite 203","city":"Miami","state":"FL","zipcode":33176,"division":6,"district":25}
        ,{"id":37,"name":"Palm Beach Gardens Permits Section","section":"Regulatory","address":"4400 PGA Boulevard Suite 500 ","city":"Palm Beach Gardens","state":"FL","zipcode":33410,"division":6,"district":25}
        ,{"id":38,"name":"Cocoa Permits Section","section":"Regulatory","address":"400 High Point Drive Suite 600","city":"Cocoa","state":"FL","zipcode":32926,"division":6,"district":25}
        ,{"id":39,"name":"Jacksonville Hyrdographic Survey Field Office and Warehouse","section":"Operations","address":"3077 Talleyrand Avenue","city":"Jacksonville","state":"FL","zipcode":32206,"division":6,"district":25}
        ,{"id":40,"name":"St. Petersburg Hydrographic Survey Field Office","section":"Operations","address":"1303 Beach Drive SE ","city":"St. Petersburg","state":"FL","zipcode":33701,"division":6,"district":25}
        ,{"id":41,"name":"St. Lucie Lock","section":"Operations","address":"2200 SW Canal Street","city":"Stuart","state":"FL","zipcode":34997,"division":6,"district":25}
        ,{"id":42,"name":"Canaveral Lock","section":"Operations","address":"1000 Mullet Drive","city":"Canaveral","state":"FL","zipcode":32920,"division":6,"district":25}
        ,{"id":43,"name":"W.P. Franklin Lock","section":"Operations","address":"1661 South Franklin Lock Road","city":"Alva","state":"FL","zipcode":33920,"division":6,"district":25}
        ,{"id":44,"name":"APCU Palatka","section":"Operations","address":"602 N Palm Avenue","city":"Palatka","state":"FL","zipcode":32177,"division":6,"district":25}
        ,{"id":45,"name":"Julian Keen (Moore Haven) Lock & Dam","section":"Operations","address":"204 Lock Road","city":"Moore Haven","state":"FL","zipcode":33471,"division":6,"district":25}
        ,{"id":46,"name":"Ortona Lock & Dam","section":"Operations","address":"1217 Lock Lane Road","city":"Moore Haven","state":"FL","zipcode":33471,"division":6,"district":25}
        ,{"id":47,"name":"Port Mayaca Lock & Dam","section":"Operations","address":"18100 SW Conners Highway","city":"Canal Point","state":"FL","zipcode":33438,"division":6,"district":25}
        ,{"id":48,"name":"South Florida Operations Office","section":"Operations","address":"525 Ridgelawn Road","city":"Clewiston","state":"FL","zipcode":33440,"division":6,"district":25}
        ,{"id":49,"name":"Palatka Area Office","section":"Operations","address":"602 Palm Avenue ","city":"Palatka","state":"FL","zipcode":32177,"division":6,"district":25}
    ],
    "districts":[
      {"id":1,"name":"Buffalo District","symbol":"LRB"}
      ,{"id":2,"name":"Chicago District","symbol":"LRC"}
      ,{"id":3,"name":"Detroit District","symbol":"LRE"}
      ,{"id":4,"name":"Huntington District","symbol":"LRH"}
      ,{"id":5,"name":"Louisville District","symbol":"LRL"}
      ,{"id":6,"name":"Nashville District","symbol":"LRN"}
      ,{"id":7,"name":"Pittsburgh District","symbol":"LRP"}
      ,{"id":8,"name":"Baltimore District","symbol":"NAB"}
      ,{"id":9,"name":"New England District","symbol":"NAE"}
      ,{"id":10,"name":"New York District","symbol":"NAN"}
      ,{"id":11,"name":"Norfolk District","symbol":"NAO"}
      ,{"id":12,"name":"Philadelphia District","symbol":"NAP"}
      ,{"id":13,"name":"Kansas City District","symbol":"NWK"}
      ,{"id":14,"name":"Omaha District","symbol":"NWO"}
      ,{"id":15,"name":"Portland District","symbol":"NWP"}
      ,{"id":16,"name":"Seattle District","symbol":"NWS"}
      ,{"id":17,"name":"Walla Walla District","symbol":"NWW"}
      ,{"id":18,"name":"Memphis District","symbol":"MVM"}
      ,{"id":19,"name":"New Orleans District","symbol":"MVN"}
      ,{"id":20,"name":"Rock Island District","symbol":"MVR"}
      ,{"id":21,"name":"St. Louis District","symbol":"MVS"}
      ,{"id":22,"name":"St. Paul District","symbol":"MVP"}
      ,{"id":23,"name":"Vicksburg District","symbol":"MVK"}
      ,{"id":24,"name":"Charleston District","symbol":"SAC"}
      ,{"id":25,"name":"Jacksonville District","symbol":"SAJ"}
      ,{"id":26,"name":"Mobile District","symbol":"SAM"}
      ,{"id":27,"name":"Savannah District","symbol":"SAS"}
      ,{"id":28,"name":"Wilmington District","symbol":"SAW"}
      ,{"id":29,"name":"Alaska District","symbol":"POA"}
      ,{"id":30,"name":"Honolulu District","symbol":"POH"}
      ,{"id":31,"name":"Albuquerque District","symbol":"SPA"}
      ,{"id":32,"name":"Los Angeles District","symbol":"SPL"}
      ,{"id":33,"name":"Sacramento District","symbol":"SPK"}
      ,{"id":34,"name":"San Francisco District","symbol":"SPN"}
      ,{"id":35,"name":"Fort Worth District","symbol":"SWF"}
      ,{"id":36,"name":"Galvenston District","symbol":"SWG"}
      ,{"id":37,"name":"Little Rock District","symbol":"SWL"}
      ,{"id":38,"name":"Tulsa District","symbol":"SWT"}
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