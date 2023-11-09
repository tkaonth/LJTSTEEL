
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
        url: "../../api/GetReceipt.php",
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
    var branch_name = "";
    var sumPaid = 0;
    var sumDiscount = 0;
    var sumTotalprice = 0;
    var sumMoney = 0;
    var sumBank = 0;
    var sumRemaining = 0;
    while (BodyTable.firstChild) {
        BodyTable.removeChild(BodyTable.firstChild);
    }

    for (let index = 0; index < dataReport.length; index++) {
        var billstatus = '';
        var billtype = '';
        var money = 0;
        var tranfer_bank = 0;
        if (locale == "th") {
            branch_name = dataReport[index]['Bn_Branch_TH'];
        } else if (locale == "lao") {
            branch_name = dataReport[index]['Bn_Branch_LA'];
        } else if (locale == "en") {
            branch_name = dataReport[index]['Bn_Branch_EN'];
        }
        if (dataReport[index]['Ss_Remaining'] > 0) {
            billstatus = behindhand_paymentText;
        } else if (dataReport[index]['Ss_Remaining'] == 0) {
            billstatus = paidedText;
        } else if (deposit == 0 && paid == 0) {
            billstatus = unpaidText;
        }
        if (dataReport[index]['Ss_Payment_Medthod'] == 'เงินสด') {
            money = dataReport[index]['Se_Total'];
        } else {
            tranfer_bank = dataReport[index]['Se_Total'];
        }
        if (dataReport[index]['Se_Product'] == "เงินมัดจำ") {
            billtype = bill_deposit;
        } else {
            billtype = bill_sale;
        }
        
        if (filterBranch == "All") {
            sumPaid += dataReport[index]['Se_Total'];
            sumDiscount += dataReport[index]['Ss_Discount'];
            sumTotalprice += dataReport[index]['Ss_Grand_Total'];
            sumMoney += money;
            sumBank += tranfer_bank;
            sumRemaining += dataReport[index]['Ss_Remaining'];
            var tr = document.createElement('tr');
            tr.innerHTML = `
                        <td class="border-primary">`+ counter + `</td>
                        <td class="border-primary">` + branch_name + `</td>
                        <td class="border-primary">` + formatDate(dataReport[index]['C_Date']) + `</td>
                        <td class="border-primary">` + dataReport[index]['Se_SellNo'] + `</td>
                        <td class="border-primary">` + dataReport[index]['Cs_Customer'] + `</td>
                        <td class="border-primary">`+ billtype +`</td>
                        <td class="border-primary">` + dataReport[index]['Se_Total'].toLocaleString() + `</td>
                        <td class="border-primary">` + dataReport[index]['Ss_Discount'].toLocaleString() + `</td>
                        <td class="border-primary">` + dataReport[index]['Ss_Grand_Total'].toLocaleString() + `</td>
                        <td class="border-primary">` + money.toLocaleString() + `</td>
                        <td class="border-primary">` + tranfer_bank.toLocaleString() + `</td>
                        <td class="border-primary">` + dataReport[index]['Ss_Remaining'].toLocaleString() + `</td>
                        <td class="border-primary">`+ billstatus +`</td>
                        `;
            BodyTable.appendChild(tr);
            counter++;
        } else if (filterBranch == dataReport[index]['Se_BranchID']) {
            sumPaid += dataReport[index]['Se_Total'];
            sumDiscount += dataReport[index]['Ss_Discount'];
            sumTotalprice += dataReport[index]['Ss_Grand_Total'];
            sumMoney += money;
            sumBank += tranfer_bank;
            sumRemaining += dataReport[index]['Ss_Remaining'];
            var tr = document.createElement('tr');
            tr.innerHTML = `
                        <td class="border-primary">`+ counter + `</td>
                        <td class="border-primary">` + branch_name + `</td>
                        <td class="border-primary">` + formatDate(dataReport[index]['C_Date']) + `</td>
                        <td class="border-primary">` + dataReport[index]['Se_SellNo'] + `</td>
                        <td class="border-primary">` + dataReport[index]['Cs_Customer'] + `</td>
                        <td class="border-primary">`+ billtype + `</td>
                        <td class="border-primary">` + dataReport[index]['Se_Total'].toLocaleString() + `</td>
                        <td class="border-primary">` + dataReport[index]['Ss_Discount'].toLocaleString() + `</td>
                        <td class="border-primary">` + dataReport[index]['Ss_Grand_Total'].toLocaleString() + `</td>
                        <td class="border-primary">` + money.toLocaleString() + `</td>
                        <td class="border-primary">` + tranfer_bank.toLocaleString() + `</td>
                        <td class="border-primary">` + dataReport[index]['Ss_Remaining'].toLocaleString() + `</td>
                        <td class="border-primary">`+ billstatus + `</td>
                        `;
            BodyTable.appendChild(tr);
            counter++;
        }
    } 
    var trsum = document.createElement('tr');
    trsum.innerHTML = `
                        <td class="border-primary" colspan="5"></td>
                        <td class="border-primary">` + sumText + `</td>
                        <td class="border-primary">` + sumPaid.toLocaleString() + `</td>
                        <td class="border-primary">` + sumDiscount.toLocaleString() + `</td>
                        <td class="border-primary">` + sumTotalprice.toLocaleString() + `</td>
                        <td class="border-primary">` + sumMoney.toLocaleString() + `</td>
                        <td class="border-primary">` + sumBank.toLocaleString() + `</td>
                        <td class="border-primary">` + sumRemaining.toLocaleString() + `</td>
                        <td class="border-primary"></td>
                        `;
    BodyTable.appendChild(trsum);
        
    // }
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

$('#searchTerm').on('keydown', function (event) {
    const form = document.getElementById("searchform");
    if (event.key === 'Enter') {
        event.preventDefault(); // Prevent form submission on Enter key
        $('#find_button').click(); // Submit the form
    }
});
$(document).ready(function () {
    $('#find_button').click();
});