





MultipleMonikers = rootAppRequire('common-node/multiple-monikers');

var multiple_monikers = new MultipleMonikers();


var test_arr=[
'H.P. Lovecraft',
'H.P.Lovecraft',
'The Brothers Grimm',
'Kurt Vonnegut Jr.',
'Anthony K. Van Riper',
'ascribed to Guy de Maupassant',
'edited by Chris Coski',
"'Laura Lee Hope aka 'Lilian C. Garis",
'Harriet Frank Jr.',
"Gene Cross aka 'Arthur Jean Cox",
'L. Sprague de Camp',
'E.SInnet',

'C.M. Eddy, Jr. and H.P. Lovecraft',
'James F. Morton, Jr.',
'C.M. Eddy, Jr. and H.P. Lovecraft',
'Nathan Haskell Dole, editor',
'H. Nearing, Jr.',
'Carl Rasmus, M.D. ',
'James B.M. Clarke, Jr.',
'Frederik Pohl, C.M. Kornbluth, and Robert A.W. Lowndes', 
'H.P. Lovecraft and R.H. Barlow',
'James Causey and Bill Blackbeard',
'Charles Dickens, Andew Halliday, Charles Collins, Hesba Stretton, and Amelia B. Edwards',
'Nathan Haskell Dole, editor',
'The Brothers Grimm',
'Kurt Vonnegut Jr.',
                         'Anthony K. Van Riper',
'ascribed to Guy de Maupassant',
'edited by Chris Coski',
"'Laura Lee Hope aka 'Lilian C. Garis",
'Harriet Frank Jr.',
"Gene Cross aka 'Arthur Jean Cox",
'L. Sprague de Camp',
'Ursula K. Le Guin',
'E.SInnet'
];
// var test_arr=[
// 'James F. Morton, Jr.',
// 'C.M. Eddy, Jr. and H.P. Lovecraft'];
//for( a_test of test_arr){
   // console.log('a test', a_test)
   var test_str = test_arr.join(',');
       console.log(typeof test_str)
   console.log('test_str', test_str)
    var author_name = multiple_monikers.parseNames(test_str)
    console.log('dd', author_name)
//}
