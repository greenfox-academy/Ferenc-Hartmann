'use strict'

const MultiThreadProcess = (function() {

  function init() {
    const cluster = require('cluster');
    const fs = require('fs');

    if (cluster.isMaster) {
      masterProcess(cluster, fs);
    } else if (cluster.isWorker) {
      workerProcess(cluster);
    }
  }

  function masterProcess(cluster, fs) {
    const threads = require('os').cpus().length;
    let dataToWrite;
    let slicedInputData = [];
    let codedArray = [];
    let codedData = '';
    let inputData;
    let fullTable = [];

    if (process.argv.length < 3) {
      console.log('Usage: node zipper.js [filename to compress] [compressed filename]');
      process.exit(1);
    }
    console.log('File compression started...');
    fileRead();

    function fileRead() {
      let startTimeStamp;
      let endTimeStamp;
      startTimeStamp = new Date();
      let fileName = process.argv[2];

      fs.readFile(fileName, 'utf8', function(err, data) {
        if (err) throw err;
        inputData = data;

        endTimeStamp = new Date();
        console.log('fileRead function duration: ' + (endTimeStamp.getTime() - startTimeStamp.getTime()) + ' msec');
        characterCalc(inputData);
      });
    }

    function characterCalc(inputData) {
      let startTimeStamp;
      let endTimeStamp;
      let keyTable = [];
      let oneKey = [];
      startTimeStamp = new Date();

      for (let i = 0; i < inputData.length; i++) {
        oneKey = [inputData[i], 1];
        keyTable.push(oneKey);
      }

      keyTable.sort();
      let oneKey2 = keyTable[0];
      for (let j = 0; j < keyTable.length - 1; j++) {
        if (oneKey2[0] == keyTable[j + 1][0]) {
          oneKey2[1] += 1;
          if ((j + 1) == (keyTable.length - 1)) {
            fullTable.push(oneKey2);
          }
        }
        else {
          fullTable.push(oneKey2);
          oneKey2 = keyTable[j + 1];
          if ((j + 1) == (keyTable.length - 1)) {
            fullTable.push(oneKey2);
          }
        }
      }
      function Comparator(a, b) {
        if (a[1] < b[1]) return 1;
        if (a[1] > b[1]) return -1;
        return 0;
      }

      fullTable.sort(Comparator);

      for (let i = 0; i < fullTable.length; i++) {
        fullTable[i][0] = fullTable[i][0].codePointAt();
      }

      endTimeStamp = new Date();
      console.log('characterCalc function duration: ' + (endTimeStamp.getTime() - startTimeStamp.getTime()) + ' msec');

      codeTableBuilder(inputData);
    }

    function codeTableBuilder(inputData) {
      let startTimeStamp;
      let endTimeStamp;
      let binaryCode = 0;
      let replaceNumber;
      startTimeStamp = new Date();

      for (let i = 0; i < fullTable.length; i++) {
        let counter = 0;
        while (binaryCode.toString(2).indexOf('00') > 0) {
          replaceNumber = binaryCode.toString(2).replace('00', '01');
          binaryCode = parseInt(replaceNumber, 2);
          counter++;
        }

        if (counter == 0) {
          binaryCode++;
          while (binaryCode.toString(2).indexOf('00') > 0) {
            replaceNumber = binaryCode.toString(2).replace('00', '01');
            binaryCode = parseInt(replaceNumber, 2);
          }
        }
        fullTable[i][1] = binaryCode.toString(2) + '00';
      }
      endTimeStamp = new Date();
      console.log('codeTableBuilder function duration: ' + (endTimeStamp.getTime() - startTimeStamp.getTime()) + ' msec');
      binaryCoder(inputData);

    }

    function binaryCoder(inputData) {
      let codeSequence = '';
      let workerData = [];
      let fullTableMinusOne = fullTable.length - 1;
      let threads = require('os').cpus().length;
      let fullTableZero = [];
      let fullTableOne = [];
      let fullTableLength = fullTable.length;
      let inputDataLength = inputData.length;
      console.log('Compression algorithm started on ' + threads + ' CPU cores.');

      for (let i = 0; i < fullTableLength; i++) {
        fullTableZero[i] = fullTable[i][0];
        fullTableOne[i] = fullTable[i][1];
      }

      function workSlicer() {
        let dividedTable = Math.floor(inputDataLength / threads);

        for (let i = 0; i < threads; i++) {
          if (i !== (threads - 1)) {
            slicedInputData[i] = inputData.slice((i * dividedTable), ((i + 1) * dividedTable));
          } else {
            slicedInputData[i] = inputData.slice((i * dividedTable));
          }
        }
      };
      workSlicer()
      // Receive messages from worker and handle them in the master process.
      cluster.on('message', function(worker, msg) {
        codedArray[worker.id - 1] = msg.tempCodedData;
      });

      // If any worker dies this process starts.
      cluster.on('exit', function(worker, msg) {

        if (Object.keys(cluster.workers).length == 0) {
          codedData = codedArray.join('');
          MultiThreadProcess.singleThreadFunction(cluster, fs, codedData, fullTable);
        }
      });

      for (let i = 0; i < threads; i++) {
          let worker = cluster.fork();

          // Send a message from the master process to the worker.
          worker.send({fullTableOne: fullTableOne, fullTableZero: fullTableZero, slicedInputData: slicedInputData[worker.id - 1]});
      }
    }

  }

  function workerProcess(cluster) {
    process.on('message', function(msg) {
      let startTimeStamp;
      let endTimeStamp;
      let i = msg.slicedInputData.length;
      let tempCodedData = '';
      let oneCycleData;
      let slicedInputDataMinusOne = msg.slicedInputData.length - 1;
      let msgfullTableZero = msg.fullTableZero;
      let msgfullTableOne = msg.fullTableOne;

      for (let k = 0; k < msg.fullTableZero.length; k++) {
        msg.fullTableZero[k] =  String.fromCharCode(msg.fullTableZero[k]);
      }

      startTimeStamp = new Date();

      while(i--) {
        let j = msgfullTableOne.length;
        oneCycleData = msg.slicedInputData[slicedInputDataMinusOne - i];
        while(j--) {
          if (oneCycleData === msgfullTableZero[j]) {
            tempCodedData += msgfullTableOne[j];
            break;
          }
        }
      }

      endTimeStamp = new Date();
      console.log('binaryCoder function duration: ' + (endTimeStamp.getTime() - startTimeStamp.getTime()) + ' msec');

      // Send message to master process.
      process.send({tempCodedData: tempCodedData})
      cluster.worker.kill();
    });

  }

  function singleThreadFunction(cluster, fs, codedData, fullTable) {
    cluster.setupMaster()
    if (cluster.isMaster) {
      function fileWrite(codedData) {
        let startTimeStamp;
        let endTimeStamp;
        let codeSequence = '';
        let codedDataUtf = '';
        let dataInArray = [];
        let compressedFileName = process.argv[3];
        startTimeStamp = new Date();

        for (let i = 0; i < fullTable.length; i++) {
          codeSequence += String.fromCharCode(fullTable[i][0]);
        }
console.log(codedData)
      let i = 0;
      for (i = 0; i < codedData.length - 8; i++) {
        if ((i % 8) == 0) {
          dataInArray.push(codedData.slice(i, i + 8));
        }
      }
      if (i == (codedData.length - 8) && (i % 8) == 0) {
        dataInArray.push(codedData.slice(i, -1));
      } else {
        dataInArray.push(codedData.slice(-(i % 8), codedData.length));
      }

      for (i = 0; i < dataInArray.length; i++) {
console.log(Number(dataInArray[i]))

        codedDataUtf += String.fromCharCode(parseInt(Number(dataInArray[i]), 2));
      }
console.log(dataInArray)

// console.log(fullTable)
// console.log(codeSequence)
// console.log(codedData)

        let dataToWrite = codeSequence + '00' + codedDataUtf;
        // for (i = 0; i < dataToWrite.length - 8; i++) {
        //   if ((i % 8) == 0) {
        //     dataInArray.push(dataToWrite.slice(i, i + 8));
        //   }
        // }
        // dataInArray.push(dataToWrite.slice(-(i % 8), dataToWrite.length));
console.log(dataToWrite);
        let dataInTypedArray = Uint8Array.from(dataInArray);
        fs.writeFile(compressedFileName, Buffer.from(dataInTypedArray.buffer), 'utf-8', function(err) {
          if (err) {
            return console.error(err);
          }
          endTimeStamp = new Date();
          console.log('fileWrite function duration: ' + (endTimeStamp.getTime() - startTimeStamp.getTime()) + ' msec');
          console.log(process.argv[2] + ' file compressed successfully into ' + process.argv[3]);
        });
      }
      fileWrite(codedData);
    }
  }

  return {
      init: init,
      singleThreadFunction: singleThreadFunction
  }

})();


MultiThreadProcess.init();
