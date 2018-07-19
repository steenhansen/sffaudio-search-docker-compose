echo 'set-up-node.ps1 start'



# say what is being built where so it can make sense



# N.B. This file must be run from podcast-neo4j directory. NOT teamcity directory


#  /podcast-neo4j/ .\teamcity/setup-up-node.ps1






# run in teamcity then below === teamcity
# testing runs in podcast-neo4j === podcast-neo4j

#$teamcity_dir = (Get-Item -Path ".\").FullName
#$podcast_neo4j_dir = (Get-Item -Path ".\").parent.FullName
#$config_dir = (Get-Item -Path ".\").parent.parent.FullName

$teamcity_dir = (Get-Item -Path ".\").FullName + '/teamcity'
$podcast_neo4j_dir = (Get-Item -Path ".\").FullName
$config_dir = (Get-Item -Path ".\").parent.FullName
$config_dir_parent = (Get-Item -Path ".\").parent.parent.FullName


	echo 'teamcity_dir ::::::::::::::::::' + $teamcity_dir
	echo 'podcast_neo4j_dir ++++++++++++++++++ ' + $podcast_neo4j_dir
	echo 'config_dir ================= ' + $config_dir

#$node_modules_config = $config_dir + '/node-modules-config/'
$node_modules_config = $config_dir_parent + '/podcast-neo4j-node-modules/'

$exist_node_modules_config = Test-Path -Path $node_modules_config

	$podcast_neo4j_node_modules =  $podcast_neo4j_dir +'/node_modules/'


$exist_node_modules = Test-Path -Path $podcast_neo4j_node_modules

echo 'exist_node_modules_config hhhhhhh ' + $exist_node_modules_config
echo 'node_modules_config jjjjj ' + $node_modules_config
echo 'podcast_neo4j_node_modules kkkkkk ' + $podcast_neo4j_node_modules

if( ! $exist_node_modules ){
#	echo 'set-up-node.ps1 exists'
#	$config_node_modules_wild = $node_modules_config + '*'
#	mkdir $podcast_neo4j_node_modules
#    Copy-Item -Path $config_node_modules_wild -Recurse -Destination $podcast_neo4j_node_modules -Container
#} else {
	echo 'set-up-node.ps1 NOT exists'
	$build_node_modules = Start-Job -FilePath './teamcity/build-node-modules.ps1' -ArgumentList $podcast_neo4j_dir
	Wait-Job $build_node_modules
	Receive-Job $build_node_modules

	#$node_modules_wild = $podcast_neo4j_node_modules +'*'

   # mkdir $node_modules_config
	#Copy-Item -Path $node_modules_wild -Recurse -Destination $node_modules_config -Container
	#echo '$node_modules_wild == ' + $node_modules_wild
	#echo '$node_modules_config == ' + $node_modules_config
}




echo 'set-up-node.ps1 done'

