const readline = require('readline');
const Converter = require('./converter');
const CustomError = require('./Errors');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

/*
rl.question('What do you think of Node.js? ', (answer) => {
  // TODO: Log the answer in a database
  console.log(`Thank you for your valuable feedback: ${answer}`);

  rl.close();
});
*/

var inquirer = require('inquirer');

var framesStatus = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];
var pageTable = [];

async function init() {
  const questionNumPages = [
    { 
      name: 'numPagine',
      type: 'number',
      message: 'Inserisci il numero di pagine del processo P:',
      validate: function( value ) {
        if( isNaN(value)) {
          return 'Per favore inserisci il numero di pagine del processo.'
        }
        if (value > 0 && value < 16) {
          return true;
        } else {
          return 'Per favore inserisci il numero di pagine del processo P compreso tra 1 e 16';
        }
      }
    }
  ];

  var answers = await inquirer
    .prompt(questionNumPages);

    const numPagine = answers.numPagine;

    for (let currentPage = 0; currentPage < numPagine; currentPage++) {

      const questionNumFrame = [
        { 
          name: 'numFrame',
          type: 'number',
          message: `Inserisci il numero di frame della pagina ${currentPage}:`,
          validate: function( value ) {
            if( isNaN(value)) {
              return `Inserisci il numero di frame della pagina ${currentPage}.`
            }
            if (value >= 0 && value < 16) {
              if (framesStatus[value] == 1)
                return true;
              else 
                return `Il frame ${value} già utilizzato`;
            } else {
              return `Per favore inserisci il numero di frame della pagina ${currentPage} del processo P compreso tra 0 e 15.`;
            }
          }
        }
      ];

      answer = await inquirer
        .prompt(questionNumFrame);

      framesStatus[answer.numFrame] = 0;
      pageTable.push(answer.numFrame);

    }

    
  
}

function introduzione() {
  console.log('Simulatore MMU - memoria di 64K con pagine di 4K');
  console.log('Converte indirizzi logici nel corrispettivo indirizzo fisico');
}


async function run() {
  introduzione();

  await init();

  // console.log(framesStatus);
  console.log(`Page table del processo P: [${pageTable}]`);

  const converter = new Converter(pageTable);
  try {
    converter.doConversion(777777);

  } catch (e) {
    console.log(e);
  }

}

run();


  