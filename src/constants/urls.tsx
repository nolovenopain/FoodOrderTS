
// ACCOUNT
const LOGIN = 'api/user/mobile/login'
const PROFILE = 'api/user/mobile/profile'
const UPDATE_PROFILE = 'api/user/mobile/update-profile'
const LOGOUT = 'api/user/mobile/logout'
const CHANGE_PASSWORD = 'api/user/mobile/changepassword'

// HOME
const LIST_HOME_WARNING = 'api/MNotification/getlistwarning_scHomeformobile?user_id='
const CHECKPOINT = 'api/Map/checkpoint_inProvinceMobile'

// PROJECT
const LIST_PROJECT = 'api/Project/getall'

// LOCATION
const LIST_SITE = 'api/Site/getall'
const LIST_PROVINCE = 'api/Province/getall'
const ALL_PROVINCE_BY_SITE = 'api/Province/getallprovincebysite'

// MEASURE
const LIST_MEASURE_ELEMENT = 'api/MeasureElement/getall'
const LIST_MEASURE_ELEMENT_FILTER = 'api/MeasureElement/getalldatafilter'

// STATION
const LIST_STATION = 'api/Station/getfilterpagingformobile'
const DATA_FILTER = 'api/config/getfilterStation'
const MONITORING_DATA = 'api/MonitoringData/getmonitoringdatamobile'

// MONITORING
const DATA_MINING_REPORT = 'api/MonitoringData/getdataminingmobilereport'

// EXPLOIT
const LIST_STATION_BY_MULTIOPTION = 'api/MonitoringData/getliststationbymultioption'
const EXPLOIT_DATA = 'api/MonitoringData/getmonitoringmobilereport'

// SENSOR
const LIST_SENSOR = 'api/Sensor/getfilterpaging'

// WARNING
const LIST_WARNING_THRESHOLD = 'api/MNotification/getlistnotiformobile'
const LIST_STATION_BY_PROVINCE = 'api/Station/getStaionByProvince'
const WARNING_THRESHOLD_DETAILS = 'api/MNotification/getnotidetailformobile?Notification_ID='
const LIST_CALAMITY = 'api/WarningDisaster/getlistnoti_disasterformobile'
const LIST_DISTRICT_BY_PROVINCE = 'api/District/getalldistrictbyprovince'
const LIST_NOTI_TYPE = 'api/WarningDisasterType/getall'
const CALAMITY_DETAILS = 'api/WarningDisaster/getnotidetail_disasterformobile?id='
const SEND_WARNING = 'api/WarningDisaster/createoredit?type=0'
const UPDATE_STATE_NOTI = 'api/MNotification/updatestatewarning?'

// WEATHER
const LIST_WEATHER = 'api/WeatherForecast/GetByAllProvince'

// LOGGER
const LOGGER_DETAILS = 'api/DataLoggerType/GetByID'

// VTYPE
const VTYPE_LIST = 'api/ValueType/getbystation'
const VTYPE_LIST_BY_ELEMENT = 'api/ValueType/getfilterpaging'

export default {  
    LOGIN,
    LOGOUT,
    UPDATE_PROFILE,
    PROFILE,
    CHANGE_PASSWORD,
    LIST_HOME_WARNING,
    LIST_PROJECT,
    LIST_SITE,
    LIST_MEASURE_ELEMENT,
    LIST_PROVINCE,
    LIST_STATION,
    LIST_WARNING_THRESHOLD,
    LIST_MEASURE_ELEMENT_FILTER,
    LIST_SENSOR,
    LIST_WEATHER,
    LOGGER_DETAILS,
    VTYPE_LIST,
    VTYPE_LIST_BY_ELEMENT,
    DATA_FILTER,
    LIST_STATION_BY_PROVINCE,
    WARNING_THRESHOLD_DETAILS,
    LIST_CALAMITY,
    LIST_DISTRICT_BY_PROVINCE,
    LIST_NOTI_TYPE,
    CALAMITY_DETAILS,
    SEND_WARNING,
    CHECKPOINT,
    MONITORING_DATA,
    DATA_MINING_REPORT,
    EXPLOIT_DATA,
    LIST_STATION_BY_MULTIOPTION,
    ALL_PROVINCE_BY_SITE,
    UPDATE_STATE_NOTI
}