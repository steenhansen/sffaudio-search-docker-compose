

const INIT_NEO4J_PASSWORD= process.env.INIT_NEO4J_PASSWORD;  
const INSIDE_BOLT_PORT = process.env.INSIDE_BOLT_PORT;      
const NEO4J_USERNAME= process.env.NEO4J_USERNAME; 
const INSIDE_NEO4J_URI = 'bolt://neo4j-db';         
const BOLT_URI = INSIDE_NEO4J_URI + ':' + INSIDE_BOLT_PORT;
const NO_INTERNAL_ENCRYPTION = {encrypted: false};


const neo4j_v1 = require('neo4j-driver').v1;

console.log('uuuuuuuuuuuuuuuuuuuuuuuuuuuuu NEO4J_USERNAME', NEO4J_USERNAME)
console.log('ppppppppppppppppppppppppppppp INIT_NEO4J_PASSWORD', INIT_NEO4J_PASSWORD)
console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaa NEO4J_AUTH', process.env.NEO4J_AUTH)

const neo4j_auth = neo4j_v1.auth.basic(NEO4J_USERNAME, INIT_NEO4J_PASSWORD);

const neo4j_driver = neo4j_v1.driver(BOLT_URI, neo4j_auth, NO_INTERNAL_ENCRYPTION);
const neo4j_session = neo4j_driver.session();

console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')

module.exports = neo4j_session;
