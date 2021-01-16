
var ReloadBase = rootAppRequire('common-node/build-nodes/graph-dbs/reload-base');

module.exports = function (test_data_dir) {

    class ReloadFile extends ReloadBase {

        static readSheets() {
            let test_obj_file_dir = Promise.resolve(test_data_dir);
            return test_obj_file_dir;
        }

    }
    return ReloadFile;
}
