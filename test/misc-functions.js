


function arrayEqual(a1,a2){
	return a1.length==a2.length && a1.every((v,i)=> v === a2[i])
}

function objectEqual(obj1,obj2){
	return  JSON.stringify(obj1) === JSON.stringify(obj2) ;
}


module.exports = {arrayEqual:arrayEqual, objectEqual:objectEqual };
