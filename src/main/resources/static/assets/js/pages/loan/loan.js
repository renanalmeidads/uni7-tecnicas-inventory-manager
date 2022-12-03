async function loadLoans() {
    let htmlLoanTable;
    await fetch(loanTableHtml)
        .then((response) => response.text())
        .then((html) => {
            htmlLoanTable = html;
        });

    await fetch(loanGetAll)
        .then((response) => response.json())
        .then((data) => {
            if(data) {

                let divTableLoans = document.getElementById('div-table-loans');
                let parser = new DOMParser();
                const docLoansTable = parser.parseFromString(htmlLoanTable, "text/html");
                let tbody = docLoansTable.getElementById("table-loans-body");

                for(const [key, value] of Object.entries(data))
                {
                    let newRow = tbody.insertRow();

                    newRow.id = value.id;

                    newRow.innerHTML =
                        "<td class=\"align-middle text-center text-sm\">" +
                            "<h6 class=\"mb-0 text-sm\">" + "</h6>" + value.status +
                        "</td>"+
                        "<td class=\"align-middle text-center text-sm\">" +
                            "<h6 class=\"mb-0 text-sm\">" + "</h6>" + value.id +
                        "</td>"+
                        "<td class=\"align-middle text-center text-sm\">" +
                            "<p class=\"text-xs font-weight-bold mb-0\">" + value.equipment.id + "</p>" +
                        "</td>"+
                        "<td class=\"align-middle text-center text-sm\">" +
                            "<p class=\"text-xs text-secondary mb-0\">" + value.equipment.name + "</p>" +
                        "</td>"+
                        "<td class=\"align-middle text-center text-sm\">" +
                            "<p class=\"text-xs text-secondary mb-0\">" + value.equipment.model + "</p>" +
                        "</td>"+
                        "<td class=\"align-middle text-center text-sm\">" +
                            "<p class=\"text-xs font-weight-bold mb-0\">" + value.creationDate + "</p>" +
                        "</td>"+
                        "<td class=\"align-middle text-center text-sm\">" +
                            "<p class=\"text-xs font-weight-bold mb-0\">" + value.dueDate + "</p>" +
                        "</td>"+
                        "<td class=\"align-middle\">" +
                        "<a onclick=\"returnLoan(this)\" class=\"text-secondary font-weight-bold text-xs\" data-toggle=\"tooltip\" data-original-title=\"RETURN\">Return</a>" +
                        "</td>";

                }

                divTableLoans.appendChild(docLoansTable.body);
            }
        });
}

async function returnLoan(returnButton) {
    let loanId = returnButton.closest('tr').getAttribute('id');

    let loan = new Loan(loanId, null, null);

    await putData(loanEndpoint, loan, () => {
        window.location.href = loanIndexHtml;
    })
}

window.addEventListener("load", loadLoans);