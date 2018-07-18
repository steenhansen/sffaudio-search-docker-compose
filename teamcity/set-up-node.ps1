echo 'set-up-node.ps1 start'

$teamcity_dir = (Get-Item -Path ".\").FullName
$podcast_neo4j_dir = (Get-Item -Path ".\").parent.FullName
$config_dir = (Get-Item -Path ".\").parent.parent.FullName
	echo 'teamcity_dir ::::::::::::::::::' + $teamcity_dir
	echo 'config_dir ================= ' + $config_dir

$node_modules_config = $config_dir + '/node-modules-config/'
$exist_node_modules_config = Test-Path -Path $node_modules_config

	$podcast_neo4j_node_modules =  $podcast_neo4j_dir +'/node_modules/'

if( $exist_node_modules_config ){
	echo 'set-up-node.ps1 exists'
	$config_node_modules_wild = $node_modules_config + '*'
	mkdir $podcast_neo4j_node_modules
    Copy-Item -Path $config_node_modules_wild -Recurse -Destination $podcast_neo4j_node_modules -Container
} else {
	echo 'set-up-node.ps1 NOT exists'
	$build_node_modules = Start-Job -FilePath './build-node-modules.ps1' -ArgumentList $podcast_neo4j_dir
	Wait-Job $build_node_modules
	Receive-Job $build_node_modules

	$node_modules_wild = $podcast_neo4j_node_modules +'*'
    mkdir $node_modules_config
	Copy-Item -Path $node_modules_wild -Recurse -Destination $node_modules_config -Container
}
echo 'set-up-node.ps1 done'

