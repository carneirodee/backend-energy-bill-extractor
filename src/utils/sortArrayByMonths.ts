

export const  sortByMonth= (arr: any[]) => {
    var months = ["JAN", "FEV", "MAR", "ABR", "MAI", "JUN",
                "JUL", "AGO", "SET", "OUT", "NOV", "DEZ"];
    arr.sort(function(a, b){
        console.log("Valores a", a)
        console.log("Valores b", b)

        return months.indexOf(a.month)
             - months.indexOf(b.month);
    });
  }