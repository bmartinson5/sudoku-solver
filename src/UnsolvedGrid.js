export default class UnsolvedGrid {
  constructor(rows){
    this.rows = [];
    rows.forEach(function(row){
      this.rows.push(row.slice())
    }, this)
    this.openIdx = [];
    this.openNumbers = [];
    this.findOpenIdx();
    this.findOpenNumbers();
  }

  findOpenIdx(){
    this.rows.forEach((row, idY) => {
      row.forEach((box, idX) => {
        if(box === 0){
          this.openIdx.push([idY, idX]);
        }
      });
    })
  }

  findOpenNumbers(){
    const numberCounts = new Map([[0,0], [1,0], [2,0], [3,0], [4,0], [5,0], [6,0], [7,0], [8,0], [9,0]]);
    this.rows.forEach((row, idY) => {
      row.forEach((box, idX) => {
        numberCounts.set(box, numberCounts.get(box) + 1);
      });
    });
    numberCounts.forEach((count, number) => {
      for (let i = 0; i < 9 - count; i++) {
        if(number > 0)
          this.openNumbers.push(number);
      }
    })
  }

  scrambleOpenNumbers() {
    const openNumbersCount = this.openNumbers.length;
    this.openNumbers.forEach(function(openNumber, idx){
      const randIdx = Math.floor(Math.random() * openNumbersCount);
      this.openNumbers[idx] = this.openNumbers[randIdx];
      this.openNumbers[randIdx] = openNumber;
    }, this)
    return this.openNumbers;
  }

  fillInRandom(){
    this.scrambleOpenNumbers();
    let isPossibleSolution = true;
    this.openIdx.forEach(function(idxPair, idx){
      if(!this.rows[idxPair[0]].includes(this.openNumbers[idx]) && !this.checkColForNum(idxPair[1], this.openNumbers[idx])){
        this.rows[idxPair[0]][idxPair[1]] = this.openNumbers[idx];
      }
      else {
        isPossibleSolution = false
        return
      }
    }, this)
    return isPossibleSolution;
  }

  checkColForNum(colNum, theNum){
    let found = false
    this.rows.forEach(function(row){
      if(row[colNum] === (theNum)){
        found = true
        return
      }
    })
    return found
  }



};

// export function UnsolvedGrid(rows){
//     this.rows = rows;
//     this.openIdx = [];
//     this.openNumbers = [];
//     this.findOpenIdx();
//     this.findOpenNumbers();
// }
//
//   UnsolvedGrid.prototype.findOpenIdx = function(){
//     this.rows.forEach((row, idY) => {
//       row.forEach((box, idX) => {
//         if(box === 0){
//           this.openIdx.push([idY, idX]);
//         }
//       })
//     });
//   };
//
//   UnsolvedGrid.prototype.findOpenNumbers = function(){
//     const numberCounts = new Map([[0,0], [1,0], [2,0], [3,0], [4,0], [5,0], [6,0], [7,0], [8,0], [9,0]]);
//     this.rows.forEach((row, idY) => {
//       row.forEach((box, idX) => {
//         numberCounts.set(box, numberCounts.get(box) + 1);
//       });
//     });
//     console.log(numberCounts);
//     numberCounts.forEach((count, number) => {
//       if (number > 0) {
//         for (let i = 0; i < 9 - count; i++) {
//           this.openNumbers.push(number);
//         }
//       }
//     })
//   };
