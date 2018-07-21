var shell = require('shelljs');
 
if (!shell.which('git')) {
  shell.echo('Sorry, this script requires git');
  shell.exit(1);
}else{

shell.echo('WE GOT GIT ');
  shell.exit(1);

}