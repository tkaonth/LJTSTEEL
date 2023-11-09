
$('#find_button').click(function () {
    
    var daterange = $("#daterange").val();
    var headerTable = $("#headerTable");
    var selecteBranchText = $("#SelectBranch option:selected").text();
    headerTable.html(TableHeaderText + " " + selecteBranchText + " " + daterange);
    Swal.fire({
        title: loading,
        allowOutsideClick: false,
        showConfirmButton: false,
        willOpen: () => {
            Swal.showLoading()
        }
    });
    $.ajax({
        type: "POST",
        url: "../../api/SummaryDailyReport.php",
        data: {
            // Data to send
            daterange: daterange,
            // Add more data as needed
        },
        success: function (response) {
            
            // console.log(response);
            dataReport = JSON.parse(response);
            calculateData();
            // if (data.status === 'success') {
            //     Swal.fire({
            //         text: data.message,
            //         icon: 'success',
            //         timer: 5000, // 5 seconds
            //         showConfirmButton: true
            //     }).then(function () {

            //     });
            // }
        },
        error: function (xhr, status, error) {
            // Handle AJAX errors (if needed)
            console.log(xhr.responseText);
        }
    });
});

function calculateData() {
    total_Dailysales = 0;
    total_Deposit_money = 0;
    total_Deposit_tranfer = 0;
    total_Sales_money = 0;
    total_Sales_tranfer = 0;
    sum_total_Dailysales = 0;
    sum_total_Dailypay = 0;
    sum_total_recive_net = 0;
    sum_total_recive_money = 0;
    sum_total_recive_tranfer = 0;
    while (BodyTable.firstChild) {
        BodyTable.removeChild(BodyTable.firstChild);
    }
    for (let index = 0; index < dataReport.length; index++) {
        if (filterBranch == "All") {
            if (dataReport[index]['i_Document'] == "Sell" || dataReport[index]['i_Document'] == "Invoice") {
                total_Dailysales += dataReport[index]['Ss_Paid'] == null ? 0 : dataReport[index]['Ss_Paid'];
                total_Sales_money += dataReport[index]['Ss_Paid'] == null ? 0 : dataReport[index]['Ss_Paid'];
                if (dataReport[index]['i_Paid'] == "เงินสด") {
                    total_Sales_money += dataReport[index]['Ss_Paid'];
                } else {
                    total_Sales_tranfer += dataReport[index]['Ss_Paid'];
                }
            } else if (dataReport[index]['i_Document'] == "Deposit") {
                if (dataReport[index]['i_Paid'] == "เงินสด") {
                    total_Deposit_money += dataReport[index]['i_Total'] == null ? 0 : dataReport[index]['i_Total'];
                } else {
                    total_Deposit_tranfer += dataReport[index]['i_Total'] == null ? 0 : dataReport[index]['i_Total'];
                }
            }            
            
        } else if (filterBranch == dataReport[index]['Se_BranchID']) {
            if (dataReport[index]['i_Document'] == "Sell" || dataReport[index]['i_Document'] == "Invoice") {
                total_Dailysales += dataReport[index]['Ss_Paid'] == null ? 0 : dataReport[index]['Ss_Paid'];
                total_Sales_money += dataReport[index]['Ss_Paid'] == null ? 0 : dataReport[index]['Ss_Paid'];
                if (dataReport[index]['i_Paid'] == "เงินสด") {
                    total_Sales_money += dataReport[index]['Ss_Paid'];
                } else {
                    total_Sales_tranfer += dataReport[index]['Ss_Paid'];
                }
            } else if (dataReport[index]['i_Document'] == "Deposit") {
                if (dataReport[index]['i_Paid'] == "เงินสด") {
                    total_Deposit_money += dataReport[index]['i_Total'] == null ? 0 : dataReport[index]['i_Total'];
                } else {
                    total_Deposit_tranfer += dataReport[index]['i_Total'] == null ? 0 : dataReport[index]['i_Total'];
                }
            }
        }
    }
    sum_total_Dailysales = total_Sales_money + total_Sales_tranfer + total_Deposit_money + total_Deposit_tranfer;
    sum_total_Dailypay = "-";
    sum_total_recive_net = total_Sales_money + total_Sales_tranfer + total_Deposit_money + total_Deposit_tranfer;
    sum_total_recive_money = total_Sales_money + total_Deposit_money;
    sum_total_recive_tranfer = total_Sales_tranfer + total_Deposit_tranfer;
    tablerender();
}

function tablerender() {
  
    while (BodyTable.firstChild) {
        BodyTable.removeChild(BodyTable.firstChild);
    }
    var tr1 = document.createElement('tr');
    var tr2 = document.createElement('tr');
    var tr3 = document.createElement('tr');
    var tr4 = document.createElement('tr');
    var tr5 = document.createElement('tr');
    var tr6 = document.createElement('tr');
    var tr7 = document.createElement('tr');
    var tr8 = document.createElement('tr');
    var tr9 = document.createElement('tr');
    tr1.innerHTML = `
                    <td class="border-primary">1</td>
                    <td class="border-primary text-left">` + listname[0] + `</td>
                    <td class="border-primary">` + total_Dailysales.toLocaleString() + `</td>
                    <td class="border-primary">-</td>
                    <td class="border-primary">-</td>
                        `;
    BodyTable.appendChild(tr1);
    tr2.innerHTML = `
                    <td class="border-primary">2</td>
                    <td class="border-primary text-left">` + listname[1] + `</td>
                    <td class="border-primary">` + total_Deposit_money.toLocaleString() + `</td>
                    <td class="border-primary">` + total_Deposit_money.toLocaleString() + `</td>
                    <td class="border-primary">-</td>
                        `;
    BodyTable.appendChild(tr2);
    tr3.innerHTML = `
                    <td class="border-primary">3</td>
                    <td class="border-primary text-left">` + listname[2] + `</td>
                    <td class="border-primary">` + total_Deposit_tranfer.toLocaleString() + `</td>
                    <td class="border-primary">-</td>
                    <td class="border-primary">` + total_Deposit_tranfer.toLocaleString() + `</td>
                        `;
    BodyTable.appendChild(tr3);
    tr4.innerHTML = `
                    <td class="border-primary">4</td>
                    <td class="border-primary text-left">` + listname[3] + `</td>
                    <td class="border-primary">` + total_Sales_money.toLocaleString() + `</td>
                    <td class="border-primary">` + total_Sales_money.toLocaleString() + `</td>
                    <td class="border-primary">-</td>
                        `;
    BodyTable.appendChild(tr4);
    tr5.innerHTML = `
                    <td class="border-primary">5</td>
                    <td class="border-primary text-left">` + listname[4] + `</td>
                    <td class="border-primary">` + total_Sales_tranfer.toLocaleString() + `</td>
                    <td class="border-primary">-</td>
                    <td class="border-primary">` + total_Sales_tranfer.toLocaleString() + `</td>
                        `;
    BodyTable.appendChild(tr5);
    tr6.innerHTML = `
                    <td class="border-primary text-left" colspan="2">` + listname[5] + `</td>
                    <td class="border-primary">` + sum_total_Dailysales.toLocaleString() + `</td>
                    <td class="border-primary">-</td>
                    <td class="border-primary">-</td>
                        `;
    BodyTable.appendChild(tr6);
    tr7.innerHTML = `
                    <td class="border-primary text-left" colspan="2">` + listname[6] + `</td>
                    <td class="border-primary">` + sum_total_Dailypay + `</td>
                    <td class="border-primary">-</td>
                    <td class="border-primary">-</td>
                        `;
    BodyTable.appendChild(tr7);
    tr8.innerHTML = `
                    <td class="border-primary text-left" colspan="2">` + listname[7] + `</td>
                    <td class="border-primary">` + sum_total_recive_net.toLocaleString() + `</td>
                    <td class="border-primary">-</td>
                    <td class="border-primary">-</td>
                        `;
    BodyTable.appendChild(tr8);
    tr9.innerHTML = `
                    <td class="border-primary text-left" colspan="3">` + listname[8] + `</td>
                    <td class="border-primary">` + sum_total_recive_money.toLocaleString() + `</td>
                    <td class="border-primary">` + sum_total_recive_tranfer.toLocaleString() + `</td>
                        `;
    BodyTable.appendChild(tr9);

    Swal.close();
}

function formatDate(inputDate) {
    const dateObj = new Date(inputDate);

    const day = dateObj.getDate();
    const month = dateObj.getMonth() + 1; // Months are 0-based, so add 1
    const year = dateObj.getFullYear();

    // Pad the day and month with leading zeros if needed
    const formattedDay = (day < 10) ? `0${day}` : day;
    const formattedMonth = (month < 10) ? `0${month}` : month;

    // Create the formatted date string in "d-m-Y" format
    const formattedDate = `${formattedDay}-${formattedMonth}-${year}`;

    return formattedDate;
}

$("#SelectBranch").on("change", function () {
    // Get the selected locale from the data-locale attribute
    filterBranch = $(this).val();
    // console.log(filterBranch);
    var daterange = $("#daterange").val();
    var headerTable = $("#headerTable");
    var selecteBranchText = $("#SelectBranch option:selected").text();
    headerTable.html(TableHeaderText + " " + selecteBranchText + " " + daterange);
    calculateData();
});

function exportToExcel() {
    let table1Data = document.getElementById('ReportTable').outerHTML;
    table1Data = table1Data.replace(/<A[^>]*>|<\/A>/g, "");
    table1Data = table1Data.replace(/<input[^>]*>|<\/input>/gi, "");


    let combinedData =
        `<table>${table1Data}</table>`;

    let a = document.createElement('a');
    a.href = `data:application/vnd.ms-excel, ${encodeURIComponent(combinedData)}`;
    a.download = 'Data.xls';
    a.click();
}
$(document).ready(function () {
    $('#find_button').click();
});