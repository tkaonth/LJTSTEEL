
$('#find_button').click(function () {
    
    var searchTerm = $("#searchTerm").val();
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
        url: "../../api/TestDebugs.php",
        data: {
            // Data to send
            searchTerm: searchTerm,
            // Add more data as needed
        },
        success: function (response) {
            
            console.log(response);
            dataReport = JSON.parse(response);
            console.log(dataReport.Sell_Summary);
            QaotationData = dataReport.Qaotation;
            SellData = dataReport.Sell;
            Sell_SummaryData = dataReport.Sell_Summary;
            DepositData = dataReport.Deposit;
            DeliveryData = dataReport.Delivery;
            ProductPlanningData = dataReport.ProductPlanning;
            // console.log(Sell_SummaryData);
            tablerender(QaotationData);
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
    while (BodyTable.firstChild) {
        BodyTable.removeChild(BodyTable.firstChild);
    }
    while (BodyTable2.firstChild) {
        BodyTable2.removeChild(BodyTable2.firstChild);
    }
    while (BodyTable3.firstChild) {
        BodyTable3.removeChild(BodyTable3.firstChild);
    }
    while (BodyTable4.firstChild) {
        BodyTable4.removeChild(BodyTable4.firstChild);
    }
    while (BodyTable5.firstChild) {
        BodyTable5.removeChild(BodyTable5.firstChild);
    }
    while (BodyTable6.firstChild) {
        BodyTable6.removeChild(BodyTable6.firstChild);
    }
    var Qt_TotalPrice = 0;
    var Qt_SunTotal = 0;
    var Sell_TotalPrice = 0;
    var Sell_SunTotal = 0;
    for (let index = 0; index < QaotationData.length; index++) {
        var tr = document.createElement('tr');
        Qt_TotalPrice += QaotationData[index]['Qt_Unit_Price'];
        Qt_SunTotal += QaotationData[index]['Qt_Unit_Total'];
        tr.innerHTML = `
                        <td class="border-primary">`+ QaotationData[index]['Qt_QaotationID'] + `</td>
                        <td class="border-primary">`+ QaotationData[index]['Qt_CustomerID'] + `</td>
                        <td class="border-primary">`+ QaotationData[index]['C_Date'] + `</td>
                        <td class="border-primary">`+ QaotationData[index]['Qt_Sequence'] + `</td>
                        <td class="border-primary">`+ QaotationData[index]['Qt_ProductID'] + `</td>
                        <td class="border-primary">`+ QaotationData[index]['Qt_CoilNo'] + `</td>
                        <td class="border-primary">`+ QaotationData[index]['Qt_Description'] + `</td>
                        <td class="border-primary">`+ QaotationData[index]['Qt_Quantity'] + " " + QaotationData[index]['Qt_Unit'] + `</td>
                        <td class="border-primary">`+ QaotationData[index]['Qt_Lenght_PUnit'] + " " + QaotationData[index]['Qt_LP_Unit'] + `</td>
                        <td class="border-primary">`+ QaotationData[index]['Qt_Lenght_Total'] + " " + QaotationData[index]['Qt_LP_Unit'] + `</td>
                        <td class="border-primary">`+ QaotationData[index]['Qt_Lenght_Coil'] + " " + QaotationData[index]['Qt_LP_Unit'] + `</td>
                        <td class="border-primary">`+ QaotationData[index]['Qt_Unit_Price'] + `</td>
                        <td class="border-primary">`+ QaotationData[index]['Qt_Width'] + "*" + QaotationData[index]['Qt_Hight'] + `</td>
                        <td class="border-primary">`+ QaotationData[index]['Qt_Vat_Rate'] + `</td>
                        <td class="border-primary">`+ QaotationData[index]['Qt_Unit_Vat'] + `</td>
                        <td class="border-primary">`+ QaotationData[index]['Qt_Unit_Total'] + `</td>
                        <td class="border-primary">`+ QaotationData[index]['Qt_Payment_Medthod'] + `</td>
                        <td class="border-primary">`+ QaotationData[index]['Qt_BranchID'] + `</td>
                        `;
        BodyTable.appendChild(tr);
    }
    var trsum = document.createElement('tr');
    trsum.innerHTML = `
                        <td class="border-primary" colspan="11">รวม</td>
                        <td class="border-primary">`+ Qt_TotalPrice + `</td>
                        <td class="border-primary" colspan="3"></td>
                        <td class="border-primary">`+ Qt_SunTotal + `</td>
                        <td class="border-primary" colspan="5"></td>
                        `;
    trsum.classList.add("text-white"); 
    trsum.classList.add("bg-secondary");
    BodyTable.appendChild(trsum);

    for (let index = 0; index < Sell_SummaryData.length; index++) {
        var tr = document.createElement('tr');
        tr.innerHTML = `
                        <td class="border-primary">`+ Sell_SummaryData[index]['C_Date'] + `</td>
                        <td class="border-primary">`+ Sell_SummaryData[index]['Ss_CustomerID'] + `</td>
                        <td class="border-primary">`+ Sell_SummaryData[index]['Ss_InvoiceNO'] + `</td>
                        <td class="border-primary">`+ Sell_SummaryData[index]['Ss_Reference'] + `</td>
                        <td class="border-primary">`+ Sell_SummaryData[index]['Ss_Item_Counts'] + `</td>
                        <td class="border-primary">`+ Sell_SummaryData[index]['Ss_Vat'] + `</td>
                        <td class="border-primary">`+ Sell_SummaryData[index]['Ss_Total'] + `</td>
                        <td class="border-primary">`+ Sell_SummaryData[index]['Ss_Discount'] + `</td>
                        <td class="border-primary">`+ Sell_SummaryData[index]['Ss_Grand_Total'] + `</td>
                        <td class="border-primary">`+ Sell_SummaryData[index]['Ss_Paid'] + `</td>
                        <td class="border-primary">`+ Sell_SummaryData[index]['Ss_Remaining'] + `</td>
                        <td class="border-primary">`+ Sell_SummaryData[index]['Ss_Payment_Medthod'] + `</td>
                        `;
        BodyTable2.appendChild(tr);
    }
    for (let index = 0; index < SellData.length; index++) {
        Sell_TotalPrice += SellData[index]['Se_Price'];
        Sell_SunTotal += SellData[index]['Se_Total'];
        var tr = document.createElement('tr');
        tr.innerHTML = `
                        <td class="border-primary">`+ SellData[index]['C_Date'] + `</td>
                        <td class="border-primary">`+ SellData[index]['Se_CustomerID'] + `</td>
                        <td class="border-primary">`+ SellData[index]['Se_InvoiceNO'] + `</td>
                        <td class="border-primary">`+ SellData[index]['Se_SellNo'] + `</td>
                        <td class="border-primary">`+ SellData[index]['Se_ProductID'] + `</td>
                        <td class="border-primary">`+ SellData[index]['Se_Product'] + `</td>
                        <td class="border-primary">`+ SellData[index]['Se_Sequence'] + `</td>
                        <td class="border-primary">`+ SellData[index]['Se_CoilNO'] + `</td>
                        <td class="border-primary">`+ SellData[index]['Se_Longer'] + `</td>
                        <td class="border-primary">`+ SellData[index]['Se_Weight'] + `</td>
                        <td class="border-primary">`+ SellData[index]['Se_Quantity'] + " " + SellData[index]['Se_Unit'] + `</td>
                        <td class="border-primary">`+ SellData[index]['Se_Price'] + `</td>
                        <td class="border-primary">`+ SellData[index]['Se_Vat_Rate'] + `</td>
                        <td class="border-primary">`+ SellData[index]['Se_Vat'] + `</td>
                        <td class="border-primary">`+ SellData[index]['Se_Total'] + `</td>
                        <td class="border-primary">`+ SellData[index]['Se_Qaotation'] + `</td>
                        <td class="border-primary">`+ SellData[index]['Se_BranchID'] + `</td>
                        `;
        BodyTable3.appendChild(tr);
    }
    var trsum = document.createElement('tr');
    trsum.innerHTML = `
                        <td class="border-primary" colspan="11">รวม</td>
                        <td class="border-primary">`+ Sell_TotalPrice + `</td>
                        <td class="border-primary" colspan="2"></td>
                        <td class="border-primary">`+ Sell_SunTotal + `</td>
                        <td class="border-primary" colspan="2"></td>
                        `;
    trsum.classList.add("text-white");
    trsum.classList.add("bg-secondary");
    BodyTable3.appendChild(trsum);
    if (DepositData) {
        for (let index = 0; index < DepositData.length; index++) {
            var tr = document.createElement('tr');
            tr.innerHTML = `
                        <td class="border-primary">`+ DepositData[index]['C_Date'] + `</td>
                        <td class="border-primary">`+ DepositData[index]['Dp_DepositID'] + `</td>
                        <td class="border-primary">`+ DepositData[index]['Dp_SellNo'] + `</td>
                        <td class="border-primary">`+ DepositData[index]['Dp_Description'] + `</td>
                        <td class="border-primary">`+ DepositData[index]['Dp_Amount'] + `</td>
                        <td class="border-primary">`+ DepositData[index]['Dp_InvoiceNo'] + `</td>
                        <td class="border-primary">`+ DepositData[index]['Dp_CustomerID'] + `</td>
                        <td class="border-primary">`+ DepositData[index]['Dp_Payment_Medthod'] + `</td>
                        <td class="border-primary">`+ DepositData[index]['Dp_BranchID'] + `</td>
                        `;
            BodyTable4.appendChild(tr);
        }
    }
    for (let index = 0; index < DeliveryData.length; index++) {
        var tr = document.createElement('tr');
        tr.innerHTML = `
                        <td class="border-primary">`+ DeliveryData[index]['C_Date'] + `</td>
                        <td class="border-primary">`+ DeliveryData[index]['Di_Delivery_ID'] + `</td>
                        <td class="border-primary">`+ DeliveryData[index]['Di_Sequence'] + `</td>
                        <td class="border-primary">`+ DeliveryData[index]['Di_InvoiceID'] + `</td>
                        <td class="border-primary">`+ DeliveryData[index]['Di_ProductID'] + `</td>
                        <td class="border-primary">`+ DeliveryData[index]['Di_Products'] + `</td>
                        <td class="border-primary">`+ DeliveryData[index]['Di_Quantity'] + `</td>
                        <td class="border-primary">`+ DeliveryData[index]['Di_Unit'] + `</td>
                        <td class="border-primary">`+ DeliveryData[index]['Di_CustomerID'] + `</td>
                        <td class="border-primary">`+ DeliveryData[index]['Di_BranchID'] + `</td>
                        `;
        BodyTable5.appendChild(tr);
    }
    for (let index = 0; index < ProductPlanningData.length; index++) {
        var tr = document.createElement('tr');
        tr.innerHTML = `
                        <td class="border-primary">`+ ProductPlanningData[index]['C_Date'] + `</td>
                        <td class="border-primary">`+ ProductPlanningData[index]['Pp_ID'] + `</td>
                        <td class="border-primary">`+ ProductPlanningData[index]['Pp_CustomerID'] + `</td>
                        <td class="border-primary">`+ ProductPlanningData[index]['Pp_Reference'] + `</td>
                        <td class="border-primary">`+ ProductPlanningData[index]['Pp_ProductID'] + `</td>
                        <td class="border-primary">`+ ProductPlanningData[index]['Pp_Products'] + `</td>
                        <td class="border-primary">`+ ProductPlanningData[index]['Pp_Qty'] + `</td>
                        <td class="border-primary">`+ ProductPlanningData[index]['Pp_Unit_Qty'] + `</td>
                        <td class="border-primary">`+ ProductPlanningData[index]['Pp_Planning_By'] + `</td>
                        <td class="border-primary">`+ ProductPlanningData[index]['Pp_BranchID'] + `</td>
                        `;
        BodyTable6.appendChild(tr);
    }
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