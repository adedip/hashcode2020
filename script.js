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
      .readFileSync("c_incunabula.txt", "utf8")
      .toString()
      .match(/^.+$/gm);
    
    let [books,libraries,deadline] = lines[0].split(' ')
    let books_scores = lines[1].split(' ')
    let book_sort = new Map()
    for(b=0; b<books_scores.length;b++){
      book_sort.set(b,books_scores[b])
    }

    book_sort[Symbol.iterator] = function* () {
      yield* [...this.entries()].sort((a, b) => b[1] - a[1]);
    }

    let sorted_book = [] 
    
    for (let [key, value] of book_sort) {
      sorted_book.push(key)
    }

    let data = []

    for(i=0; i < parseInt(libraries); i++){
      l = i*2
      let[lib_books, lib_days, book_per_day] = lines[2+l].split(' ')
      let unordered_books = lines[2+l+1].split(' ').map(x => parseInt(x))
      let intersection_books = sorted_book.filter(x => unordered_books.includes(x))
      if(intersection_books.length == 0){
        continue
      }else{
        // sorted_book = sorted_book.filter(b => !intersection_books.includes(b))

        bookshop_info = {
          id: i,
          lib_books: parseInt(lib_books), 
          lib_days: parseInt(lib_days), 
          book_per_day: parseInt(book_per_day),
          book_numbers: unordered_books,
          ordered_books: intersection_books
        }
        
        data.push(bookshop_info)
      }

      

      // lib_points(bookshop_info)
    } 
    data.sort((a,b) => {
      return a.lib_days - b.lib_days
    })
    
    let output = data.length
    
    for(d=0; d < data.length;d++){
      row = data[d]
      row_0 = row.id + " " + row.ordered_books.length
      row_1 = row.ordered_books.join(' ')
      output += `\n${row_0}\n${row_1}`
    }
    console.log(output)
}

solution();