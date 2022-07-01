import axios from "axios";
export var instance = axios.create({
    withCredentials: true
});
export function createConfig() {
    var config = { headers: {} };
    config.headers['Accept'] = 'application/json';
    config.headers['Content-Type'] = 'application/json';
    return config;
}
export function removeTags(str) {
    if ((str === null) || (str === ''))
        return false;
    else
        str = str.toString();
    // Regular expression to identify HTML tags in 
    // the input string. Replacing the identified 
    // HTML tag with a null string.
    str.replace(/(\r\n|\n|\r)/gm, "");
    return str.replace(/(<([^>]+)>)/ig, '');
}
