async function loadEquipments() {
    let htmlEquipmentTable;
    await fetch(equipmentTableHtml)
        .then((response) => response.text())
        .then((html) => {
            htmlEquipmentTable = html;
        });

    await fetch(equipmentGetAll)
        .then((response) => response.json())
        .then((data) => {
            if(data) {

                let divTableEquipments = document.getElementById('div-table-equipments');
                let parser = new DOMParser();
                const docEquipmentsTable = parser.parseFromString(htmlEquipmentTable, "text/html");
                let tbody = docEquipmentsTable.getElementById("table-equipments-body");

                for(const [key, value] of Object.entries(data))
                {
                    tbody.insertRow().innerHTML =
                        "<td class=\"align-middle text-center text-sm\">" +
                            "<h6 class=\"mb-0 text-sm\">" + "</h6>" + value.id + "</td>"+
                        "<td class=\"align-middle text-center text-sm\">" +
                            "<p class=\"text-xs font-weight-bold mb-0\">" + value.name + "</p>" +
                        "</td>"+
                        "<td class=\"align-middle text-center text-sm\">" +
                            "<p class=\"text-xs text-secondary mb-0\">" + value.model + "</p>" +
                        "</td>"+
                        "<td class=\"align-middle text-center text-sm\">" +
                            "<p class=\"text-xs font-weight-bold mb-0\">" + value.manufacturer.name + "</p>" +
                        "</td>"+
                        "<td class=\"align-middle text-center text-sm\">" +
                            "<p class=\"text-xs font-weight-bold mb-0\">" + value.year + "</p>" +
                        "</td>"+
                        "<td class=\"align-middle text-center text-sm\">" +
                            "<span class=\"text-secondary text-xs font-weight-bold\">" + value.creationDate + "</span>" +
                        "</td>"+
                        "<td class=\"align-middle text-center text-sm\">" +
                            "<span class=\"text-secondary text-xs font-weight-bold\">" + value.updateDate + "</span>" +
                        "</td>"+
                        "<td class=\"align-middle text-center text-sm\">" +
                            "<span className=\"badge badge-sm bg-gradient-success\">" + value.available +" </span>" +
                        "</td>";
                }

                divTableEquipments.appendChild(docEquipmentsTable.body);
            }
        });
}

window.addEventListener("load", loadEquipments);