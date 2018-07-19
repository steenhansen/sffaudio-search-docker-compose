### N.B. we can wait on this job to finish, before copying
### Start-Job -FilePath './build-node-modules.ps1' -ArgumentList 'abs_path_location_variable'

Param(
	[string] $podcast_neo4j_dir
)

Set-Location -Path $podcast_neo4j_dir -PassThru
npm install 

echo 'npm installed at ' + $podcast_neo4j_dir