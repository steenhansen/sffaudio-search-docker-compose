var mock_data_return = ` {
 "records": [
  {
   "keys": [
    "n_author",
    "n_book",
    "n_book_wiki",
    "n_letter",
    "n_pdf",
    "n_podcast",
    "n_root",
    "n_rsd",
    "r_author_to_book",
    "r_author_to_letter",
    "r_book_to_pdf",
    "r_book_to_podcast",
    "r_book_to_rsd",
    "r_book_wiki_to_book",
    "r_root_to_letter",
    "v_strip_author",
    "v_under_title"
   ],
   "length": 17,
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
      "low": 10010,
      "high": 0
     },
     "labels": [
      "L_BOOK"
     ],
     "properties": {
      "under_title": "adjustment_team",
      "book_title": "Adjustment Team",
      "sorted_label": "adjustment_team",
      "strip_1_author": "philip_k_dick",
      "strip_2_author": ""
     }
    },
    {
     "identity": {
      "low": 13444,
      "high": 0
     },
     "labels": [
      "L_BOOK_WIKI"
     ],
     "properties": {
      "book_url": "http://en.wikipedia.org/wiki/Adjustment_Team",
      "under_title": "adjustment_team",
      "wiki_book": "Wikipedia"
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
      "low": 18414,
      "high": 0
     },
     "labels": [
      "L_PDF"
     ],
     "properties": {
      "pdf_title": "Orbit, No. 4, September-October 1954",
      "pdf_url": "http://www.sffaudio.com/podcasts/AdjustmentTeamByPhilipK.Dick.pdf",
      "under_title": "adjustment_team",
      "strip_1_author": "philip_k_dick",
      "strip_2_author": ""
     }
    },
    null,
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
    null,
    {
     "identity": {
      "low": 3747,
      "high": 0
     },
     "start": {
      "low": 10706,
      "high": 0
     },
     "end": {
      "low": 10010,
      "high": 0
     },
     "type": "L_AUTHOR_TO_BOOK",
     "properties": {}
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
      "low": 13674,
      "high": 0
     },
     "start": {
      "low": 10010,
      "high": 0
     },
     "end": {
      "low": 18414,
      "high": 0
     },
     "type": "L_BOOK_TO_PDF",
     "properties": {}
    },
    null,
    null,
    {
     "identity": {
      "low": 15497,
      "high": 0
     },
     "start": {
      "low": 10010,
      "high": 0
     },
     "end": {
      "low": 13444,
      "high": 0
     },
     "type": "L_BOOK_WIKI_TO_BOOK",
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
    "philip_k_dick",
    "adjustment_team"
   ],
   "_fieldLookup": {
    "n_author": 0,
    "n_book": 1,
    "n_book_wiki": 2,
    "n_letter": 3,
    "n_pdf": 4,
    "n_podcast": 5,
    "n_root": 6,
    "n_rsd": 7,
    "r_author_to_book": 8,
    "r_author_to_letter": 9,
    "r_book_to_pdf": 10,
    "r_book_to_podcast": 11,
    "r_book_to_rsd": 12,
    "r_book_wiki_to_book": 13,
    "r_root_to_letter": 14,
    "v_strip_author": 15,
    "v_under_title": 16
   }
  }
 ],
 "summary": {
  "statement": {
   "text": " \n                // BookNode.getBookNodes\n                    WITH {strip_author} AS v_strip_author,  {under_title} AS v_under_title\n                        MATCH (n_root:L_ROOT)-[r_root_to_letter:L_ROOT_TO_LETTER]-(n_letter:L_LETTER)\n\t                        -[r_author_to_letter:L_AUTHOR_TO_LETTER]-(n_author:L_AUTHOR)\n\t                        -[r_author_to_book:L_AUTHOR_TO_BOOK]-(n_book:L_BOOK)\n\t                    WHERE n_book.under_title = v_under_title  AND n_author.strip_author = v_strip_author\n\t                    OPTIONAL MATCH (n_book:L_BOOK)-[r_book_to_podcast:L_BOOK_TO_PODCAST]-(n_podcast:L_PODCAST)\n                        OPTIONAL MATCH  (n_book:L_BOOK)-[r_book_to_pdf:L_BOOK_TO_PDF]-(n_pdf:L_PDF)\n                        OPTIONAL MATCH (n_book:L_BOOK)-[r_book_wiki_to_book:L_BOOK_WIKI_TO_BOOK]-(n_book_wiki:L_BOOK_WIKI)\n                        OPTIONAL MATCH (n_book:L_BOOK)-[r_book_to_rsd:L_BOOK_TO_RSD]-(n_rsd:L_RSD)\n\t                    RETURN * ",
   "parameters": {
    "strip_author": "philip_k_dick",
    "under_title": "adjustment_team"
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