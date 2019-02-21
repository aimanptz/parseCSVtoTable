const dataUrl =  'http://frontend.usdev.ru/tarif.csv';

fetch(dataUrl)
  .then(response => response.blob())
  .then(csvBlob => parseData(csvBlob))
  .catch( alert );

function parseData(csv) {
  Papa.parse(csv, {
    dynamicTyping: true,
    complete: results => addTable(results.data)
  });
}

/* ...or we could use axios instead. Do not forget to uncomment axios script in html!
axios.post(dataUrl)
  .then(data=>parseData(data))
  .catch(err=>console.log(err));


function parseData(csv) {
  Papa.parse(csv.data, {
    dynamicTyping: true,
    complete: function(results) {
      addTable(results.data);
    }
  });
}
 */

function addTable(data) {
  const wrapper= document.createElement('div');
        wrapper.innerHTML = buildTable(data);
        document.body.insertBefore( wrapper, document.body.firstChild );
}

function buildTable(obj) {
  let tableHeaderContent = '',
      tableBodyContent = '';
  
  obj.forEach( (el, i) => {
    if (i === 0) {
      el.forEach( (el) => {
        tableHeaderContent += `<td>${el}</td>`
      });
      return;
    }
  
    if (el[0] == null) {
      return;
    }
  
    buildTableBody(el);
  });
  
  return `<table class="csv-table"><thead><tr>${tableHeaderContent}</tr></thead><tbody>${tableBodyContent}</tbody></table>`;
  
  function buildTableBody (el) {
    tableBodyContent += '<tr>';
    
    el.forEach( el => {
      tableBodyContent += `<td>${el}</td>`
    });
    
    tableBodyContent += '</tr>';
  }
}