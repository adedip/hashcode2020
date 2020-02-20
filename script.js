function lib_points(deadline, lib){
  let scanning_days = deadline - lib.lib_days
  let throughput = scanning_days * lib.book_per_day
  let score =  parseInt(lib.book_per_day) / parseInt(lib.lib_days)
}

function lib_count(data, deadline){
  let tot = 0
  for(i=0; i < data.length; i++) {
    let sum = tot + data[i]['lib_days']
    if(sum < deadline){
      tot += 1
    }else{
      return tot
    }
  }
  return tot
}

function solution() {
    var fs = require("fs");
  
    let lines = fs
      .readFileSync("f_libraries_of_the_world.txt", "utf8")
      .toString()
      .match(/^.+$/gm);
    
    let [books,libraries,deadline] = lines[0].split(' ')
    let books_scores = lines[1].split(' ')
    
    let data = []

    for(i=0; i < parseInt(libraries); i++){
      l = i*2
      let[lib_books, lib_days, book_per_day] = lines[2+l].split(' ')
      
      bookshop_info = {
        id: i,
        lib_books: parseInt(lib_books), 
        lib_days: parseInt(lib_days), 
        book_per_day: parseInt(book_per_day),
        book_numbers: lines[2+l+1].split(' ')
      }
      
      data.push(bookshop_info)

      // lib_points(bookshop_info)
    } 
    data.sort((a,b) => {
      return a.lib_days - b.lib_days
    })
    let output = lib_count(data,deadline)
    
    for(d=0; d < parseInt(output);d++){
      row = data[d]
      row_0 = row.id + " " + row.lib_books
      row_1 = row.book_numbers.join(' ')
      output += `\n${row_0}\n${row_1}`
    }
    console.log(output)
}

solution();