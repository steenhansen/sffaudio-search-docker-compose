

param (
[string]$systemTeamcityBuildCheckoutDir 
)

echo 'AAAAAAAAAAAAAAAAAA'
echo $systemTeamcityBuildCheckoutDir 

$sourceRoot = "D:\github\podcast_neo4j_conf\podcast-neo4j\node_modules"
$destinationRoot = $systemTeamcityBuildCheckoutDir + "\node_modules"
echo $sourceRoot 
echo $destinationRoot 

echo 'BBBBBBBBBBBBBBBBBBBBB'


mkdir $destinationRoot

Copy-Item -Path $sourceRoot -Recurse -Destination $destinationRoot -Container


echo 'CCCCCCCCCCC'
