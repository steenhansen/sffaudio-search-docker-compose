


# build_powershell




# say what is being built where so it can make sense



# N.B. This file must be run from podcast-neo4j directory. NOT build-powershell directory


#  /podcast-neo4j/>                  .\build-powershell/set-up-node.ps1



$podcast_neo4j_dir = (Get-Item -Path ".\").FullName
$podcast_neo4j_node_modules =  $podcast_neo4j_dir +'/node_modules/'
$exist_node_modules = Test-Path -Path $podcast_neo4j_node_modules

if( ! $exist_node_modules ){
	$build_node_modules = Start-Job -FilePath './build-powershell/build-node-modules.ps1' -ArgumentList $podcast_neo4j_dir
	Wait-Job $build_node_modules
	Receive-Job $build_node_modules
}




