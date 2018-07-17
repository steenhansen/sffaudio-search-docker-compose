

param (
[string]$systemTeamcityBuildCheckoutDir 
)

echo 'AAAAAAAAAAAAAAAAAA'
echo $systemTeamcityBuildCheckoutDir 

$sourceRoot = ".\node_modules"
$destinationRoot = $systemTeamcityBuildCheckoutDir + "\node_modules"
echo $sourceRoot 
echo $destinationRoot 

echo 'BBBBBBBBBBBBBBBBBBBBB'


##Copy-Item -Path $sourceRoot -Filter "*.txt" -Recurse -Destination $destinationRoot -Container