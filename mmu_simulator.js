'use strict'

const readline = require('readline');
const Converter = require('./converter');
const ConversionUtils = require('./ConversionUtils');
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

      answers = await inquirer
        .prompt(questionNumFrame);

      framesStatus[answers.numFrame] = 0;
      pageTable.push(answers.numFrame);

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

  while(true) {
    const questionLogicAddress = [
      { 
        name: 'logicAddress',
        type: 'input',
        message: 'Inserisci l\'indirizzo logico o \'quit\' se vuoi interrompere:',
        validate: function( value ) {
          if (value.length) {
            if(value == 'quit' || parseInt(value))
              return true;
            else {
              return 'Prego, inserisci l\'indirizzo logico o \'quit\''
            }
          } else {
            return 'Prego, inserisci l\'indirizzo logico o \'quit\'';
          }
        }
      }
    ];

    var answers = await inquirer
      .prompt(questionLogicAddress);

    if(answers.logicAddress == 'quit')
      break; // exit from program
    
    var logicAddress = parseInt(answers.logicAddress);

    try {

      var byteArrayPhisicalAddress = converter.doConversion(logicAddress);
      var decimalPhisicAddress = ConversionUtils.calculateDecimal(byteArrayPhisicalAddress);
      console.log(`Indirizzo fisico: [${byteArrayPhisicalAddress}] --> ${decimalPhisicAddress}`);
  
    } catch (e) {
      console.log(e);
    }

  }
  
}

run();


  