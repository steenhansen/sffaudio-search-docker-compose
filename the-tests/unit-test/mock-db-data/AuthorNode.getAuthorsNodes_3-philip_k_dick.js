var mock_data_return = ` {
 "records": [
  {
   "keys": [
    "n_author",
    "n_post",
    "r_author_to_post",
    "v_strip_author"
   ],
   "length": 4,
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
      "low": 19458,
      "high": 0
     },
     "labels": [
      "L_POST"
     ],
     "properties": {
      "post_slug": "jonathan-lethem-and-kim-stanley-robinson-discuss-philip-k-dick",
      "post_title": "aJonathan Lethem and Kim Stanley Robinson discuss Philip K. Dick",
      "sorted_label": "December 21, 2016",
      "strip_author": "philip_k_dick"
     }
    },
    {
     "identity": {
      "low": 17968,
      "high": 0
     },
     "start": {
      "low": 10706,
      "high": 0
     },
     "end": {
      "low": 19458,
      "high": 0
     },
     "type": "L_AUTHOR_TO_POST",
     "properties": {}
    },
    "philip_k_dick"
   ],
   "_fieldLookup": {
    "n_author": 0,
    "n_post": 1,
    "r_author_to_post": 2,
    "v_strip_author": 3
   }
  },
  {
   "keys": [
    "n_author",
    "n_post",
    "r_author_to_post",
    "v_strip_author"
   ],
   "length": 4,
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
      "low": 19459,
      "high": 0
     },
     "labels": [
      "L_POST"
     ],
     "properties": {
      "post_slug": "jonathan-lethem-and-kim-stanley-robinson-discuss-philip-k-dick0",
      "post_title": "bJonathan Lethem and Kim Stanley Robinson discuss Philip K. Dick0",
      "sorted_label": "December 22, 2016",
      "strip_author": "philip_k_dick"
     }
    },
    {
     "identity": {
      "low": 17969,
      "high": 0
     },
     "start": {
      "low": 10706,
      "high": 0
     },
     "end": {
      "low": 19459,
      "high": 0
     },
     "type": "L_AUTHOR_TO_POST",
     "properties": {}
    },
    "philip_k_dick"
   ],
   "_fieldLookup": {
    "n_author": 0,
    "n_post": 1,
    "r_author_to_post": 2,
    "v_strip_author": 3
   }
  }
 ],
 "summary": {
  "statement": {
   "text": " \n            \n                 // AuthorNode.getAuthorsNodes_3 L_POST\n                        WITH {strip_author} AS v_strip_author\n                        MATCH (n_author:L_AUTHOR)-[r_author_to_post:L_AUTHOR_TO_POST]-\t(n_post:L_POST)\n\t                    WHERE n_post.strip_author=v_strip_author\n\t                    RETURN *   ",
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
   "low": 0,
   "high": 0
  },
  "resultAvailableAfter": {
   "low": 1,
   "high": 0
  }
 }
} `; 

module.exports = mock_data_return; 