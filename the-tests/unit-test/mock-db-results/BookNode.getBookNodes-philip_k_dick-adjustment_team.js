var mock_data_return = ` [
 {
  "id": 18414,
  "group": "L_PDF",
  "label": "123:",
  "sorted_label": "98",
  "goto_url": "http://www.sffaudio.com/podcasts/AdjustmentTeamByPhilipK.Dick.pdf",
  "x": 300,
  "y": 500,
  "font": {
   "color": "white"
  }
 },
 {
  "id": 10706,
  "label": "Philip K. Dick",
  "group": "L_AUTHOR",
  "sorted_label": "Dick Philip K.",
  "goto_url": "/author/philip_k_dick",
  "unique_data": {
   "strip_author": "philip_k_dick"
  },
  "x": 500,
  "y": 500,
  "size": 30,
  "font": {
   "size": 32,
   "color": "white"
  }
 },
 {
  "id": 10010,
  "label": "Adjustment Team",
  "group": "L_BOOK",
  "sorted_label": "adjustment_team",
  "goto_url": "",
  "size": 100,
  "font": {
   "size": 16,
   "color": "red"
  }
 },
 {
  "id": 13444,
  "group": "L_BOOK_WIKI",
  "label": "http://en.wikipedia.org/wiki/Adjustment_Team",
  "sorted_label": "sorted_label",
  "goto_url": "http://en.wikipedia.org/wiki/Adjustment_Team",
  "x": 300,
  "y": 500,
  "font": {}
 },
 {
  "id": 19525,
  "label": "d",
  "group": "L_LETTER",
  "sorted_label": "d",
  "goto_url": "/author/letter/d/",
  "x": 400,
  "y": 500,
  "size": 20,
  "font": {
   "size": 20,
   "color": "white"
  }
 },
 {
  "id": 19465,
  "label": "All",
  "group": "L_ROOT",
  "sorted_label": "ALL",
  "goto_url": "",
  "x": 300,
  "y": 500,
  "size": 10,
  "font": {
   "size": 10,
   "color": "white"
  }
 },
 {
  "from": 10706,
  "to": 10010
 },
 {
  "from": 10010,
  "to": 18414
 },
 {
  "from": 10010,
  "to": 13444
 },
 {
  "from": 10706,
  "to": 19525
 },
 {
  "from": 19465,
  "to": 19525
 }
] `; 

module.exports = mock_data_return; 