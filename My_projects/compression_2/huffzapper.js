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
    let huffmanCodeTable;
    let codedData = '';
    let codedArray = [];

    if (process.argv.length < 3) {
      console.log('Usage: node zapper.js [filename to compress] [compressed filename]');
      process.exit(1);
    }
    console.log('File compression started...');
    fileRead();

    function fileRead() {
      const fileName = process.argv[2];
      const startTimeStamp = new Date();

      fs.readFile(fileName, 'utf-8', function(err, data) {
        if (err) throw err;
        const splittedData = data.split("");
        const inputDataInArray = splittedData.map(function(x) {
          return x.codePointAt();
        });

        const endTimeStamp = new Date();
        console.log('fileRead function duration: ' + (endTimeStamp.getTime() - startTimeStamp.getTime()) + ' msec');
        probabilityTableInitializer(inputDataInArray);
      });
    }

    function probabilityTableInitializer(inputDataInArray) {
      let probabilityBasicTable = [];
      const startTimeStamp = new Date();

      inputDataInArray.forEach(e => probabilityBasicTable.push([e]));
      probabilityBasicTable.sort();
      probabilityBasicTable.forEach(e => e.push(1));

      const endTimeStamp = new Date();
      console.log('probabilityTableInitializer function duration: ' + (endTimeStamp.getTime() - startTimeStamp.getTime()) + ' msec');
      probabilityCalculator(inputDataInArray, probabilityBasicTable);
    }

    function probabilityCalculator(inputDataInArray, probabilityBasicTable) {
      let onePair = probabilityBasicTable[0];
      const probabilityTable = [];
      const startTimeStamp = new Date();

      for (let i = 0; i < probabilityBasicTable.length - 1; i++) {
        if (onePair[0] == probabilityBasicTable[i + 1][0]) {
          onePair[1] += 1;
          if ((i + 1) == (probabilityBasicTable.length - 1)) {
            probabilityTable.push(onePair);
          }
        }
        else {
          probabilityTable.push(onePair);
          onePair = probabilityBasicTable[i + 1];
          if ((i + 1) == (probabilityBasicTable.length - 1)) {
            probabilityTable.push(onePair);
          }
        }
      }
      const endTimeStamp = new Date();
      console.log('probabilityCalculator function duration: ' + (endTimeStamp.getTime() - startTimeStamp.getTime()) + ' msec');
      probabilityTableSorter(inputDataInArray, probabilityTable);
    }

    function probabilityTableSorter(inputDataInArray, probabilityTable) {
      const startTimeStamp = new Date();

      function Comparator(a, b) {
        if (a[1] < b[1]) return 1;
        if (a[1] > b[1]) return -1;
        return 0;
      }

      probabilityTable.sort(Comparator);

      const endTimeStamp = new Date();
      console.log('probabilityTableSorter function duration: ' + (endTimeStamp.getTime() - startTimeStamp.getTime()) + ' msec');
      huffmanFunction(inputDataInArray, probabilityTable);
    }

    function huffmanFunction(inputDataInArray, probabilityTable) {
      huffmanCodeTable = [];
      let oneArrayPair = [];
      let oneCombinedArrayPair = [];
      const startTimeStamp = new Date();

      function orderedPush(arr, item) {
          let k = 0;
          while (k < arr.length) {
              if (item[1] < arr[k][1]) { break; }
              k++;
          }
          arr.splice(k, 0, item);
          return arr
      }

      probabilityTable.forEach(e => huffmanCodeTable.push([String.fromCharCode(e[0]), ['']]));
      probabilityTable.forEach(e => e[0] = String.fromCharCode(e[0]));

      while (probabilityTable.length > 1) {
        oneArrayPair = probabilityTable.splice(0, 2);
        oneCombinedArrayPair = [];
        for (let i = 0; i < huffmanCodeTable.length; i++) {
          if (oneArrayPair[0][0].includes(huffmanCodeTable[i][0])) {
            huffmanCodeTable[i][1] = '0' + huffmanCodeTable[i][1];
          }
          if (oneArrayPair[1][0].includes(huffmanCodeTable[i][0])) {
            huffmanCodeTable[i][1] = '1' + huffmanCodeTable[i][1];
          }
        }

        oneCombinedArrayPair[0] = oneArrayPair[0][0] + oneArrayPair[1][0];
        oneCombinedArrayPair[1] = oneArrayPair[0][1] + oneArrayPair[1][1];

        probabilityTable = orderedPush(probabilityTable, oneCombinedArrayPair);
      }

      for (let i = 0; i < huffmanCodeTable.length; i++) {
        huffmanCodeTable[i][0] = huffmanCodeTable[i][0].codePointAt()
      }

      const endTimeStamp = new Date();
      console.log('huffmanFunction function duration: ' + (endTimeStamp.getTime() - startTimeStamp.getTime()) + ' msec');
      workSlicer(inputDataInArray);
    }

    function workSlicer(inputDataInArray) {
      let slicedInputDataInArray = [];
      const startTimeStamp = new Date();
      const dividedTable = Math.floor(inputDataInArray.length / threads);

      for (let i = 0; i < threads; i++) {
        if (i !== (threads - 1)) {
          slicedInputDataInArray[i] = inputDataInArray.splice(0, dividedTable);
        } else {
          slicedInputDataInArray[i] = inputDataInArray;
        }
      }

      const endTimeStamp = new Date();
      console.log('workSlicer function duration: ' + (endTimeStamp.getTime() - startTimeStamp.getTime()) + ' msec');
      multiThreadInvoker(slicedInputDataInArray);
    }

    function multiThreadInvoker(slicedInputDataInArray) {
      let huffmanCodeTableZero = [];
      let huffmanCodeTableOne =[];

      console.log('Compression algorithm started on ' + threads + ' CPU cores.');
      huffmanCodeTable.forEach((e, i) => { huffmanCodeTableZero[i] = e[0]; huffmanCodeTableOne[i] = e[1] } );

      // Receive messages from worker and handle them in the master process.
      cluster.on('message', function(worker, msg) {
        codedArray[worker.id - 1] = msg.tempCodedData;
      });

      // If any worker dies this process starts.
      cluster.on('exit', function(worker, msg) {

        if (Object.keys(cluster.workers).length == 0) {
          codedData = codedArray.join('');
          MultiThreadProcess.singleThreadFunction(cluster, fs, codedData, huffmanCodeTable);
        }
      });

      for (let i = 0; i < threads; i++) {
          let worker = cluster.fork();

          // Send a message from the master process to the worker.
          worker.send({ slicedInputDataInArray: slicedInputDataInArray[worker.id - 1], huffmanCodeTableZero: huffmanCodeTableZero, huffmanCodeTableOne: huffmanCodeTableOne });
      }
    }
  }

  function workerProcess(cluster) {
    process.on('message', function(msg) {
      let i = msg.slicedInputDataInArray.length;
      let tempCodedData = '';
      let oneCycleData;
      const slicedInputDataMinusOne = msg.slicedInputDataInArray.length - 1;
      const msghuffmanCodeTableZero = msg.huffmanCodeTableZero;
      const msghuffmanCodeTableOne = msg.huffmanCodeTableOne;

      const startTimeStamp = new Date();

      while(i--) {
        let j = msg.huffmanCodeTableOne.length;
        oneCycleData = msg.slicedInputDataInArray[slicedInputDataMinusOne - i];
        while(j--) {
          if (oneCycleData === msghuffmanCodeTableZero[j]) {
            tempCodedData += msghuffmanCodeTableOne[j];
            break;
          }
        }
      }

      const endTimeStamp = new Date();
      console.log('workerProcess function duration: ' + (endTimeStamp.getTime() - startTimeStamp.getTime()) + ' msec');

      // Send message to master process.
      process.send({tempCodedData: tempCodedData})
      cluster.worker.kill();
    });
  }

  function singleThreadFunction(cluster, fs, codedData, huffmanCodeTable) {
    cluster.setupMaster()
    if (cluster.isMaster) {
      fileDataConstructer();
    }

    function fileDataConstructer() {
      const startTimeStamp = new Date();
      let dataToWrite = 'ff';

      huffmanCodeTable.forEach(e => e[1] = parseInt(e[1], 2).toString(16));

      for (let i = 0; i < huffmanCodeTable.length; i++) {
        dataToWrite += huffmanCodeTable[i][0].toString(15);
        dataToWrite += 'f';
      }
      dataToWrite += 'ff';

      for (var i = 0; i < codedData.length - 4; i++) {
        if ((i % 4) == 0) {
          dataToWrite += parseInt(codedData.slice(i, i + 4), 2).toString(16);
        }
      }
      if (i == (codedData.length - 4) && (i % 4) == 0) {
        dataToWrite += parseInt(codedData.slice(i, -1), 2).toString(16);
      } else {
        dataToWrite += parseInt(codedData.slice(-(i % 4), codedData.length), 2).toString(16);
      }

      const endTimeStamp = new Date();
      console.log('fileDataConstructer function duration: ' + (endTimeStamp.getTime() - startTimeStamp.getTime()) + ' msec');
      fileWriter(dataToWrite);
    }

    function fileWriter(dataToWrite) {
      const startTimeStamp = new Date();

      fs.writeFile( process.argv[3], dataToWrite, 'hex', function(err) {
        if (err) {
          return console.error(err);
        }
      });

      const endTimeStamp = new Date();
      console.log('fileWriter function duration: ' + (endTimeStamp.getTime() - startTimeStamp.getTime()) + ' msec');
      console.log(process.argv[2] + ' file compressed successfully into ' + process.argv[3]);
    }
  }

  return {
      init: init,
      singleThreadFunction: singleThreadFunction
  }

})();


MultiThreadProcess.init();