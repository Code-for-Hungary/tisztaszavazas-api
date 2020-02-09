//import PythonShell from 'python-shell';
import { PythonShell } from 'python-shell';
import scrape from './scrape';

var options = {
  mode: 'json',
  pythonPath: 'python3',
  pythonOptions: ['-u'],
  scriptPath: './pythonScripts/',
};

export default html => (
  new Promise((resolve, reject) => {
    let pyShell = new PythonShell('getUtca.py', options)

    let kozteruletek = [];

    pyShell.send({ html })

    pyShell.on('message', message => {
      kozteruletek.push(message)
    })

    pyShell.end((err,code,signal) => {
      if (err) reject(err);
      console.log('The exit code was: ' + code);
      console.log('The exit signal was: ' + signal);
      console.log('finished');
      resolve(kozteruletek)
    });
  })
)

/* export default () => PythonShell.run('getUtca.py', options, function (err, results) {
  if (err) 
    throw err;
  // Results is an array consisting of messages collected during execution
  console.log(results);
}); */