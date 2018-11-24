


MultipleMonikers = rootAppRequire('sff-network/multiple-monikers');

var multiple_monikers = new MultipleMonikers();


var test_arr=[
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
'Charles Dickens, Andew Halliday, Charles Collins, Hesba Stretton, and Amelia B. Edwards'];



var test_arr=[
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


for( a_test of test_arr){
   // console.log('a test', a_test)
    multiple_monikers.parseNames(a_test)

}
