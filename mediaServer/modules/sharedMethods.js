'use strict'

var shared_methods = {

    sizeOfLargestId: function (first_id){
       var first_number = 0 + first_id
          if (first_number>9999){
            var episode_digits = 5
        }else if (first_number>999){
            var episode_digits = 4
        } else{
           var episode_digits = 3
        }
        return episode_digits
    },

    leadingZerosDigits: function (episode_digits, int_id) {
        var digits_from_end = -1 * episode_digits
        var id_digits = String("00000" + int_id).slice(digits_from_end)
        return id_digits
    },

    //  https://javascriptweblog.wordpress.com/2011/08/08/fixing-the-javascript-typeof-operator/
     toType : function(obj) {
        return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
    }

}

module.exports = shared_methods
