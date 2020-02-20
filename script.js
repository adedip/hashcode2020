function solution() {
    var fs = require("fs");
  
    let lines = fs
      .readFileSync("a_example.txt", "utf8")
      .toString()
      .match(/^.+$/gm);
    
    let [books,libraries,days] = lines[0].split(' ')
    let books_scores = lines[1].split(' ')
    
    let data = new Map()

    for(i=0; i < parseInt(libraries); i++){
      l = i*2
      console.log("id: "+i+ " l: "+l)
      let[lib_books, lib_days, lib_ship] = lines[2+l].split(' ')
      data.set(i, {
        lib_schedule: {
          lib_books: lib_books, 
          lib_days: lib_days, 
          lib_ship: lib_ship
        },
        book_n: lines[2+l+1]
      })
    } 
    
    debugger
}

solution();