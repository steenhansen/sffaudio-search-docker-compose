var mock_data_return = ` {
 "records": [
  {
   "keys": [
    "n_author",
    "n_author_wiki",
    "n_letter",
    "n_root",
    "r_author_to_letter",
    "r_author_to_wiki",
    "r_root_to_letter",
    "v_strip_author"
   ],
   "length": 8,
   "_fields": [
    {
     "identity": {
      "low": 10706,
      "high": 0
     },
     "labels": [
      "L_AUTHOR"
     ],
     "properties": {
      "author_name": "Philip K. Dick",
      "strip_author": "philip_k_dick"
     }
    },
    {
     "identity": {
      "low": 13047,
      "high": 0
     },
     "labels": [
      "L_AUTHOR_WIKI"
     ],
     "properties": {
      "strip_author": "philip_k_dick",
      "author_url": "https://en.wikipedia.org/wiki/Philip_K._Dick",
      "wiki_author": "Wikipedia"
     }
    },
    {
     "identity": {
      "low": 19525,
      "high": 0
     },
     "labels": [
      "L_LETTER"
     ],
     "properties": {
      "first_char": "d"
     }
    },
    {
     "identity": {
      "low": 19465,
      "high": 0
     },
     "labels": [
      "L_ROOT"
     ],
     "properties": {
      "root_caption": "All"
     }
    },
    {
     "identity": {
      "low": 16092,
      "high": 0
     },
     "start": {
      "low": 10706,
      "high": 0
     },
     "end": {
      "low": 19525,
      "high": 0
     },
     "type": "L_AUTHOR_TO_LETTER",
     "properties": {}
    },
    {
     "identity": {
      "low": 15600,
      "high": 0
     },
     "start": {
      "low": 10706,
      "high": 0
     },
     "end": {
      "low": 13047,
      "high": 0
     },
     "type": "L_AUTHOR_TO_WIKI",
     "properties": {}
    },
    {
     "identity": {
      "low": 18045,
      "high": 0
     },
     "start": {
      "low": 19465,
      "high": 0
     },
     "end": {
      "low": 19525,
      "high": 0
     },
     "type": "L_ROOT_TO_LETTER",
     "properties": {}
    },
    "philip_k_dick"
   ],
   "_fieldLookup": {
    "n_author": 0,
    "n_author_wiki": 1,
    "n_letter": 2,
    "n_root": 3,
    "r_author_to_letter": 4,
    "r_author_to_wiki": 5,
    "r_root_to_letter": 6,
    "v_strip_author": 7
   }
  }
 ],
 "summary": {
  "statement": {
   "text": " \n            \n                // AuthorNode.getAuthorsNodes_1 L_AUTHOR\n            WITH {strip_author} AS v_strip_author \n                        MATCH (n_root:L_ROOT)-[r_root_to_letter:L_ROOT_TO_LETTER]-(n_letter:L_LETTER)\n\t                        -[r_author_to_letter:L_AUTHOR_TO_LETTER]-(n_author:L_AUTHOR)\n\t                    WHERE n_author.strip_author=v_strip_author\n\t                        OPTIONAL MATCH (n_author:L_AUTHOR)-[r_author_to_wiki:L_AUTHOR_TO_WIKI]-\t(n_author_wiki:L_AUTHOR_WIKI)\n\t                    RETURN *  ",
   "parameters": {
    "strip_author": "philip_k_dick"
   }
  },
  "statementType": "r",
  "counters": {
   "_stats": {
    "nodesCreated": 0,
    "nodesDeleted": 0,
    "relationshipsCreated": 0,
    "relationshipsDeleted": 0,
    "propertiesSet": 0,
    "labelsAdded": 0,
    "labelsRemoved": 0,
    "indexesAdded": 0,
    "indexesRemoved": 0,
    "constraintsAdded": 0,
    "constraintsRemoved": 0
   }
  },
  "updateStatistics": {
   "_stats": {
    "nodesCreated": 0,
    "nodesDeleted": 0,
    "relationshipsCreated": 0,
    "relationshipsDeleted": 0,
    "propertiesSet": 0,
    "labelsAdded": 0,
    "labelsRemoved": 0,
    "indexesAdded": 0,
    "indexesRemoved": 0,
    "constraintsAdded": 0,
    "constraintsRemoved": 0
   }
  },
  "plan": false,
  "profile": false,
  "notifications": [],
  "server": {
   "address": "localhost:7687",
   "version": "Neo4j/3.4.4"
  },
  "resultConsumedAfter": {
   "low": 2,
   "high": 0
  },
  "resultAvailableAfter": {
   "low": 0,
   "high": 0
  }
 }
} `; 

module.exports = mock_data_return; 