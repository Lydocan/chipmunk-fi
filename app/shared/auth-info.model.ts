import { deserialize } from 'json-typescript-mapper';
//https://github.com/jf3096/json-typescript-mapper

class BaseInfo {
    deviceCode: string;
    mobile: string;
    cityName: string;
    lineCode: string;
    ip: string;
    mac: string;
    plantform: number;
    versionCode: number;
    channelCode: string;
    createTime: number;
    eventKey: string;
}

class Expand {
    resultCode: string;
    resultMsg: string;
}

export class AuthInfo {
    // @JsonProperty('BaseInfo')
    baseInfo: BaseInfo;
    // @JsonProperty('Expand')
    expand: Expand;
}

