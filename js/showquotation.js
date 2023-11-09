
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
        url: "../../api/GetQuotation.php",
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
    var dataArray = [];
    
    while (BodyTable.firstChild) {
        BodyTable.removeChild(BodyTable.firstChild);
    }
    // Loop through the grouped data
    for (const key in dataReport) {
        var tr = document.createElement('tr');
        if (dataReport.hasOwnProperty(key)) {
            dataArray.push(dataReport[key]); // The array of data for this key
        }
    }
    dataArray.forEach(record => {
        var sumtotal_bill = 0;
        if (locale == "th") {
            branch_name = record[0]['Bn_Branch_TH'];
        } else if (locale == "lao") {
            branch_name = record[0]['Bn_Branch_LA'];
        } else if (locale == "en") {
            branch_name = record[0]['Bn_Branch_EN'];
        }
        var BgStatusColor = "white";
        if (record[0]['Qt_Status'] == 0) {
            BgStatusColor = "red";
        } else if (record[0]['Qt_Status'] == 1) {
            BgStatusColor = "yellow";
        } else if (record[0]['Qt_Status'] == 2) {
            BgStatusColor = "orange";
        } if (record[0]['Qt_Status'] == 3) {
            BgStatusColor = "#97ff4d";
        }
        if (filterBranch == "All") {
            for (let index = 0; index < record.length; index++) {
                var tr = document.createElement('tr');
                if (index == 0) {
                    tr.innerHTML = `
                        <td class="border-primary align-middle" rowspan="`+ record.length + `">` + branch_name + `</td>
                        <td class="border-primary align-middle" style="background-color: `+ BgStatusColor +`;" rowspan="`+ record.length + `">` + record[index]['Qt_QaotationID'] + `</td>
                        <td class="border-primary align-middle" rowspan="`+ record.length + `">` + record[index]['C_Date'] + `</td>
                        `;
                }
                tr.innerHTML += `
                        <td class="border-primary">` + record[index]['Qt_Description'] + `</td>
                        <td class="border-primary">` + record[index]['Qt_Width'] + "*" + record[index]['Qt_Hight'] + `</td>
                        <td class="border-primary">` + record[index]['Qt_Lenght_PUnit'] + " " + record[index]['Qt_LP_Unit'] + `</td>
                        <td class="border-primary">` + record[index]['Qt_Quantity'] + `</td>
                        <td class="border-primary">` + record[index]['Qt_Unit'] + `</td>
                        <td class="border-primary">` + record[index]['Qt_Lenght_Total'] + `</td>
                        <td class="border-primary">` + record[index]['Qt_Lenght_Coil'] + `</td>
                        <td class="border-primary">` + record[index]['Qt_Unit_Price'].toLocaleString() + `</td>
                        <td class="border-primary">` + record[index]['Qt_Vat_Rate'] + `</td>
                        <td class="border-primary">` + record[index]['Qt_Unit_Vat'] + `</td>
                        <td class="border-primary">` + record[index]['Qt_Unit_Total'].toLocaleString() + `</td>
                        `;
                BodyTable.appendChild(tr);
                sumtotal_bill += record[index]['Qt_Unit_Total'];
            }
            var tr = document.createElement('tr');
            tr.innerHTML += `
                        <td class="border-primary bg-secondary text-white" colspan="13">` + sumText + `</td>
                        <td class="border-primary bg-secondary text-white">` + sumtotal_bill.toLocaleString() + `</td>
                        `;
            BodyTable.appendChild(tr);
        } else if (record[0]['Bn_ID'] == filterBranch) {
            for (let index = 0; index < record.length; index++) {
                var tr = document.createElement('tr');
                if (index == 0) {
                    tr.innerHTML = `
                        <td class="border-primary align-middle" rowspan="`+ record.length + `">` + branch_name + `</td>
                        <td class="border-primary align-middle" style="background-color: `+ BgStatusColor + `;" rowspan="` + record.length + `">` + record[index]['Qt_QaotationID'] + `</td>
                        <td class="border-primary align-middle" rowspan="`+ record.length + `">` + record[index]['C_Date'] + `</td>
                        `;
                }
                tr.innerHTML += `
                        <td class="border-primary">` + record[index]['Qt_Description'] + `</td>
                        <td class="border-primary">` + record[index]['Qt_Width'] + "*" + record[index]['Qt_Hight'] + `</td>
                        <td class="border-primary">` + record[index]['Qt_Lenght_PUnit'] + " " + record[index]['Qt_LP_Unit'] + `</td>
                        <td class="border-primary">` + record[index]['Qt_Quantity'] + `</td>
                        <td class="border-primary">` + record[index]['Qt_Unit'] + `</td>
                        <td class="border-primary">` + record[index]['Qt_Lenght_Total'] + `</td>
                        <td class="border-primary">` + record[index]['Qt_Lenght_Coil'] + `</td>
                        <td class="border-primary">` + record[index]['Qt_Unit_Price'].toLocaleString() + `</td>
                        <td class="border-primary">` + record[index]['Qt_Vat_Rate'] + `</td>
                        <td class="border-primary">` + record[index]['Qt_Unit_Vat'] + `</td>
                        <td class="border-primary">` + record[index]['Qt_Unit_Total'].toLocaleString() + `</td>
                        `;
                BodyTable.appendChild(tr);
                sumtotal_bill += record[index]['Qt_Unit_Total'];
            }
            var tr = document.createElement('tr');
            tr.innerHTML += `
                        <td class="border-primary bg-secondary text-white" colspan="13">` + sumText + `</td>
                        <td class="border-primary bg-secondary text-white">` + sumtotal_bill.toLocaleString() + `</td>
                        `;
            BodyTable.appendChild(tr);
        }
        
    });       
        
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