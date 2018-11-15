var Promise = require('bluebird')
var ReloadBase = rootAppRequire('sff-network/build-nodes/graph-dbs/reload-base');

module.exports = function (test_data_dir) {

    class ReloadFile extends ReloadBase {

        static readSheets() {

            var test_obj_file_dir = new Promise(function (resolve) {
                setTimeout(resolve, 0, test_data_dir);
            });


            return test_obj_file_dir;
        }


    }
    return ReloadFile;
}
