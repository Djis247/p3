class TableTemplate {
  static fillIn(id, dict, colName) {
    console.log("filling in", id, dict, colName);
    const table = document.getElementById(id);

    let process = new TemplateProcessor(table.rows[0].innerHTML);
    table.rows[0].innerHTML = process.fillIn(dict);

    let columnIndex;
    // Find matching column in table
    console.log(table.rows[0].getElementsByTagName("td"));

    for (let i = 0; i < table.rows[0].getElementsByTagName("td"); i++) {
      console.log("row", table.rows[0][i].innerHTML);
      if (table.rows[0][i].innerText == colName) {
        columnIndex = i;
      }
    }

    // Iterate through table rows and update td that match columnIndex
    for (let i = 1; i < table.rows.length; i++) {}
  }
}
//to do: search for columnid using columnName
//for loop going through the first row loop through elements
//another for loop to loop through rows but only to acces that first specific column
//use column id as part of expressions.
