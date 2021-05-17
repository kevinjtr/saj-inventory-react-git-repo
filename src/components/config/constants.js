export const SEARCH_FIELD_OPTIONS = [{value:"includes",label:"Includes"}, {value:"excludes",label:"Excludes"}, {value:"equals",label:"Equals"}, {value:"notEquals",label:"Not Equals"}]
export const SEARCH_FIELD_BLANKS = [{value:"includeBlanks",label:"Include Blanks"}, {value:"excludeBlanks",label:"Exclude Blanks"}, {value:"onlyBlanks",label:"Only Blanks"}]
export const EQUIPMENT = 'equipment'
export const ENG4900 = 'eng4900'
export const AVD_SEARCH = 'adv'
export const BASIC_SEARCH = 'std'
export const OPTIONS_DEFAULT = 'includes'
export const BLANKS_DEFAULT = 'includeBlanks'
export const ALERT = {
	SUCCESS: {success:{active:true,text:'Action was completed.'},error:{active:false,text:''}},
	FAIL: {success:{active:false,text:''},error:{active:true,text:'Could not complete action.'}},
	RESET: {success:{active:false,text:''},error:{active:false,text:''}},
}