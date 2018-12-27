exports.GetEnvironmentVar = function(varname, defaultvalue) {
    var result = process.env[varname];
    if(result!=undefined)
        return result;
    else
        return defaultvalue;
}