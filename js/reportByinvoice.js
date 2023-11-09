
$('#find_button').click(function () {
    
    var daterange = $("#daterange").val();
    var headerTable = $("#headerTable");
    headerTable.html(TableHeaderText + " " + daterange);
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
        url: "../../api/ReportByInvoice.php",
        data: {
            // Data to send
            daterange: daterange,
            // Add more data as needed
        },
        success: function (response) {
            
            // console.log(response);
            dataReport = JSON.parse(response);
            tablerender();
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

function tablerender() {
    var counter = 1;
    sum_deposit = 0;
    sum_paid = 0;
    sum_money = 0;
    sum_remaining = 0;
    sum_tranferBank = 0;
    sum_total = 0;
    sum_discount = 0;
    while (BodyTable.firstChild) {
        BodyTable.removeChild(BodyTable.firstChild);
    }
    for (let index = 0; index < dataReport.length; index++) {
        if (filterBranch == "All") {
            var tr = document.createElement('tr');
            var branch_name = "";
            var deposit = 0;
            var paid = 0;
            var money = 0;
            var tranferBank = 0;
            var total = 0;
            if (locale == "th") {
                branch_name = dataReport[index]['Bn_Branch_TH'];
            } else if (locale == "lao") {
                branch_name = dataReport[index]['Bn_Branch_LA'];
            } else if (locale == "en") {
                branch_name = dataReport[index]['Bn_Branch_EN'];
            }
            if ((dataReport[index]['Dp_Amount'] == null || dataReport[index]['Dp_Amount'] == 0) && dataReport[index]['Ss_Paid'] > 0) {
                deposit = "-";
                paid = dataReport[index]['Ss_Paid'];
                sum_paid += paid;
                if (dataReport[index]['Ss_Payment_Medthod'] == "เงินสด") {
                    money = dataReport[index]['Ss_Paid'];
                    sum_money += dataReport[index]['Ss_Paid'];
                    tranferBank = "-";
                } else {
                    tranferBank = dataReport[index]['Ss_Paid'];
                    money = "-";
                    sum_tranferBank += dataReport[index]['Ss_Paid'];
                }
            } else if (dataReport[index]['Dp_Amount'] > 0) {
                deposit = dataReport[index]['Dp_Amount'];
                paid = "-";
                sum_deposit += deposit;
                if (dataReport[index]['Ss_Payment_Medthod'] == "เงินสด") {
                    money = dataReport[index]['Dp_Amount'];
                    sum_money += dataReport[index]['Dp_Amount'];
                    tranferBank = "-";
                } else {
                    tranferBank = dataReport[index]['Dp_Amount'];
                    money = "-";
                    sum_tranferBank += dataReport[index]['Dp_Amount'];
                }
            }
            sum_remaining += dataReport[index]['Ss_Remaining'];
            sum_total += dataReport[index]['Ss_Total'];
            sum_discount += dataReport[index]['Ss_Discount'];
            var tr = document.createElement('tr');
            tr.innerHTML = `
                        <td class="border-primary">`+ counter + `</td>
                        <td class="border-primary">` + formatDate(dataReport[index]['Se_Date']) + `</td>
                        <td class="border-primary">` + dataReport[index]['Se_SellNo'] + `</td>
                        <td class="border-primary">` + branch_name + `</td>
                        <td class="border-primary">` + dataReport[index]['Se_CustomerID'] + `</td>
                        <td class="border-primary">` + dataReport[index]['Cs_Customer'] + `</td>
                        <td class="border-primary">` + dataReport[index]['Ss_Total'].toLocaleString() + `</td>
                        <td class="border-primary">` + deposit.toLocaleString() + `</td>
                        <td class="border-primary">` + dataReport[index]['Ss_Discount'].toLocaleString() + `</td>
                        <td class="border-primary">` + paid.toLocaleString() + `</td>
                        <td class="border-primary">` + money.toLocaleString() + `</td>
                        <td class="border-primary">` + tranferBank.toLocaleString() + `</td>
                        <td class="border-primary">` + dataReport[index]['Ss_Remaining'].toLocaleString() + `</td>
                        <td class="border-primary">staus</td>
                        `;
            BodyTable.appendChild(tr);
            counter++;
        } else if (filterBranch == dataReport[index]['Se_BranchID']) {
            // console.log(dataReport[index]['Bn_ID']);
            var tr = document.createElement('tr');
            var branch_name = "";
            var deposit = 0;
            var paid = 0;
            var money = 0;
            var tranferBank = 0;
            var total = 0;
            if (locale == "th") {
                branch_name = dataReport[index]['Bn_Branch_TH'];
            } else if (locale == "lao") {
                branch_name = dataReport[index]['Bn_Branch_LA'];
            } else if (locale == "en") {
                branch_name = dataReport[index]['Bn_Branch_EN'];
            }
            if (dataReport[index]['i_Document'] == "Sell" || dataReport[index]['i_Document'] == "Invoice") {
                paid = dataReport[index]['Ss_Paid'] == null ? 0 : dataReport[index]['Ss_Paid'];
                sum_paid += paid;
                if (dataReport[index]['i_Paid'] == "เงินสด") {
                    money = paid;
                } else {
                    tranferBank = paid;
                }
            } else if (dataReport[index]['i_Document'] == "Deposit") {
                deposit = dataReport[index]['i_Total'] == null ? 0 : dataReport[index]['i_Total'];
                sum_deposit += deposit;
                if (dataReport[index]['i_Paid'] == "เงินสด") {
                    money = deposit;
                } else {
                    tranferBank = deposit;
                }
            }
            if (Ss_Remaining > 0) {
                billstatus = behindhand_paymentText;
            } else if (Ss_Remaining == 0) {
                billstatus = paidedText;
            } else if (deposit == 0 && paid == 0) {
                billstatus = unpaidText;
            }
            sum_remaining += dataReport[index]['Ss_Remaining'];
            sum_total += dataReport[index]['Ss_Total'];
            sum_discount += dataReport[index]['Ss_Discount'];

            var tr = document.createElement('tr');
            tr.innerHTML = `
                        <td class="border-primary">`+ counter + `</td>
                        <td class="border-primary">` + formatDate(dataReport[index]['Se_Date']) + `</td>
                        <td class="border-primary">` + dataReport[index]['Se_SellNo'] + `</td>
                        <td class="border-primary">` + branch_name + `</td>
                        <td class="border-primary">` + dataReport[index]['Se_CustomerID'] + `</td>
                        <td class="border-primary">` + dataReport[index]['Cs_Customer'] + `</td>
                        <td class="border-primary">` + dataReport[index]['Ss_Total'].toLocaleString() + `</td>
                        <td class="border-primary">` + deposit.toLocaleString() + `</td>
                        <td class="border-primary">` + dataReport[index]['Ss_Discount'].toLocaleString() + `</td>
                        <td class="border-primary">` + paid.toLocaleString() + `</td>
                        <td class="border-primary">` + money.toLocaleString() + `</td>
                        <td class="border-primary">` + tranferBank.toLocaleString() + `</td>
                        <td class="border-primary">` + dataReport[index]['Ss_Remaining'].toLocaleString() + `</td>
                        <td class="border-primary">staus</td>
                        `;
            BodyTable.appendChild(tr);
            counter++;
        }
        
        
    }
    var trsum = document.createElement('tr');
    trsum.innerHTML = `
                        <td class="border-primary" colspan="5"></td>
                        <td class="border-primary">` + sumText + `</td>
                        <td class="border-primary">` + sum_total.toLocaleString() + `</td>
                        <td class="border-primary">` + sum_deposit.toLocaleString() + `</td>
                        <td class="border-primary">` + sum_discount.toLocaleString() + `</td>
                        <td class="border-primary">` + sum_paid.toLocaleString() + `</td>
                        <td class="border-primary">` + sum_money.toLocaleString() + `</td>
                        <td class="border-primary">` + sum_tranferBank.toLocaleString() + `</td>
                        <td class="border-primary">` + sum_remaining.toLocaleString() + `</td>
                        <td class="border-primary"></td>
                        `;
    BodyTable.appendChild(trsum);
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
    tablerender();
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