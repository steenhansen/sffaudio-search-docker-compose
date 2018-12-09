
var memjs = require('memjs');

module.exports = function (cache_name) {     //'sff_mem_cache'


    var mc = memjs.Client.create(process.env.MEMCACHIER_SERVERS, {
        failover: true,  // default: false
        timeout: 1,      // default: 0.5 (seconds)
        keepAlive: true  // default: false
    })


    function mcSet(the_cache) {
        return new Promise(function (fulfilled, rejected) {
            mc.set(cache_name, the_cache, {expires: 0}, function (err, val) {
                if ((val == null) || (err != null)) {
                    rejected(new Error('bad set cache value'))
                }
                else {
                    clog('saved cached data')
                    fulfilled(val);
                }
            })
        })
    }

    function mcGet(cache_file) {
        return new Promise(function (fulfilled, rejected) {
            mc.get(cache_name, function (err, val) {
                if ((val == null) || (err != null)) {
                    rejected(new Error('empty or missing cache value', cache_file))
                }
                else {
                    var utf8_str = val.toString('utf8');
                    var object_data = JSON.parse(utf8_str);
                    var the_data = object_data[cache_file];
                    fulfilled(the_data);
                }
            })
        })
    }

    return {mcSet, mcGet};
}
