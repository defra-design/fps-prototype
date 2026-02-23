
 document.addEventListener("DOMContentLoaded", () => {
  const table = document.getElementById("dataTable");
const tbody = table.querySelector("tbody");

/* column configuration */
const columns = [
  { key: "id", type: "id" },
  { key: "name", type: "text" },
  { key: "age", type: "number" },
  { key: "city", type: "text" }
];

/* utility */
function getMaxId() {
  let max = 0;
  [...tbody.rows].forEach(r => {
    max = Math.max(max, parseInt(r.cells[0].innerText) || 0);
  });
  return max;
}

/* add row (read mode) */
function addRow({ id, name, age, city }) {
  const tr = tbody.insertRow();
  tr.innerHTML = `
    <td>${id}</td>
    <td>${name}</td>
    <td>${age}</td>
    <td>${city}</td>
    <td>
      <button class="edit-btn">Edit</button>
      <button class="save-btn" style="display:none">Save</button>
      <button class="cancel-btn" style="display:none">Cancel</button>
    </td>
  `;
}

/* edit / save / cancel */
table.addEventListener("click", e => {
  const tr = e.target.closest("tr");
  if (!tr) return;

  if (e.target.classList.contains("edit-btn")) enterEdit(tr);
  if (e.target.classList.contains("save-btn")) saveEdit(tr);
  if (e.target.classList.contains("cancel-btn")) cancelEdit(tr);
});

function enterEdit(tr) {
  columns.forEach((col, i) => {
    if (col.type === "id") return;
    const td = tr.cells[i];
    td.dataset.old = td.innerText;
    td.innerHTML =
      col.type === "number"
        ? `<input type="number" value="${td.innerText}">`
        : `<input type="text" value="${td.innerText}">`;
  });
  toggleButtons(tr, true);
}

function saveEdit(tr) {
  columns.forEach((col, i) => {
    if (col.type === "id") return;
    const td = tr.cells[i];
    td.innerText = td.querySelector("input").value;
  });
  toggleButtons(tr, false);
}

function cancelEdit(tr) {
  columns.forEach((col, i) => {
    if (col.type === "id") return;
    const td = tr.cells[i];
    td.innerText = td.dataset.old;
  });
  toggleButtons(tr, false);
}

function toggleButtons(tr, editing) {
  tr.querySelector(".edit-btn").style.display = editing ? "none" : "inline";
  tr.querySelector(".save-btn").style.display = editing ? "inline" : "none";
  tr.querySelector(".cancel-btn").style.display = editing ? "inline" : "none";
}

/* Excel paste handling */
table.addEventListener("paste", e => {
  e.preventDefault();
  e.stopPropagation();

  const text = e.clipboardData.getData("text/plain").trim();
  if (!text) return;

  let nextId = getMaxId() + 1;
  const rows = text.split("\n");

  rows.forEach(line => {
    const cols = line.replace(/\r/g, "").split("\t");
    const hasExcelId = !isNaN(parseInt(cols[0]));

    addRow({
      id: nextId++,
      name: cols[hasExcelId ? 1 : 0] || "",
      age: cols[hasExcelId ? 2 : 1] || "",
      city: cols[hasExcelId ? 3 : 2] || ""
    });
  });
});

/* initial data */
addRow({ id: 1, name: "Rahul", age: 30, city: "Pune" });
addRow({ id: 2, name: "Anita", age: 28, city: "Mumbai" });



        let activeCell = null;

      
        dataTable.addEventListener("click", (e) => {
            if (e.target.tagName !== "TD") return;

            clearSelection();
            activeCell = e.target;
            activeCell.classList.add("selected");

            // 🔥 Force caret inside TD
            activeCell.focus();
        });


        function clearSelection() {
            document
                .querySelectorAll("td.selected")
                .forEach(td => td.classList.remove("selected"));
        }


       

        function getLastId(table) {
            let lastRow = table.rows[table.rows.length - 1];
            let lastId = lastRow?.cells[0]?.innerText || "0";
            return parseInt(lastId, 10) || 0;
        }

            function getMaxId(table) {
                let maxId = 0;

                // start from 1 → skip header row
                for (let i = 1; i < table.rows.length; i++) {
                    const cellText = table.rows[i].cells[0]?.innerText?.trim();
                    const id = parseInt(cellText, 10);

                    if (!isNaN(id) && id > maxId) {
                        maxId = id;
                    }
                }
                return maxId;
            }


      

        function excelHasId(excelCols) {
            return excelCols.length &&
                !isNaN(parseInt(excelCols[0], 10));
        }


 

dataTable.addEventListener("paste", handlePaste);

function handlePaste(e) {
  e.preventDefault();     // 🔥 stop browser paste
  e.stopPropagation();    // 🔥 stop bubbling

  const cell = e.target.closest("td");
  if (!cell) return;

  const pasteText = e.clipboardData.getData("text/plain").trim();
  if (!pasteText) return;

  const rows = pasteText.split("\n");
  const colCount = table.rows[0].cells.length;

  let nextId = getMaxId(table) + 1;

  rows.forEach(rowText => {
    const excelCols = rowText.replace(/\r/g, "").split("\t");
    const hasExcelId = !isNaN(parseInt(excelCols[0], 10));

    const tr = table.insertRow();

    for (let c = 0; c < colCount; c++) {
      const td = tr.insertCell();

      if (c === 0) {
        td.innerText = nextId++;
        td.contentEditable = "false";
      } else {
        const excelIndex = hasExcelId ? c : c - 1;
        td.innerText = excelCols[excelIndex] ?? "";
        td.contentEditable = "true";
      }
    }
  });
}

dataTable.querySelectorAll("td").forEach(td => {
  td.addEventListener("paste", e => e.preventDefault());
});
});