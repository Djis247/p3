class TableTemplate {
  static fillIn(id, dict, colName) {
    const table = document.getElementById(id);

    let process = new TemplateProcessor(table.rows[0].innerHTML);
    table.rows[0].innerHTML = process.fillIn(dict);

    let columnIndex;

    function replaceInCol(columnIndex) {
      // Iterate through table rows and update td that match columnIndex
      for (let i = 1; i < table.rows.length; i++) {
        const tableData = table.rows[i].getElementsByTagName("td")[columnIndex];

        if (!tableData || !tableData.innerHTML) return;

        let process = new TemplateProcessor(tableData.innerHTML);
        table.rows[i].getElementsByTagName("td")[columnIndex].innerHTML =
          process.fillIn(dict);
      }
    }

    if (!colName) {
      for (let i = 0; i < table.rows.length; i++) {
        replaceInCol(i);
      }
    } else {
      // Find matching column in table
      for (
        let i = 0;
        i < table.rows[0].getElementsByTagName("td").length;
        i++
      ) {
        if (table.rows[0].getElementsByTagName("td")[i].innerHTML == colName) {
          columnIndex = i;
        }
      }
      replaceInCol(columnIndex);
    }

    table.style.visibility = "visible";
  }
}
