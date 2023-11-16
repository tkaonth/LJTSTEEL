
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
        url: "../../api/GetProduction_Planning.php",
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
        var diff_Pp_Psc_Date = 0;
        var bg_Schedule_Date = "white";
        if (record[0]['Pp_Status'] == 0) {
            BgStatusColor = "red";
            diff_Pp_Psc_Date = CompareDate(record[0]['C_Schedule_Date']);
            // console.log(diff_Pp_Psc_Date + " " + record[0]['C_Schedule_Date']);
            if (diff_Pp_Psc_Date > 0){
                bg_Schedule_Date = "red";
            } else if (diff_Pp_Psc_Date == 0) {
                bg_Schedule_Date = "yellow";
            }
        } else if (record[0]['Pp_Status'] == 1) {
            BgStatusColor = "yellow";
            diff_Pp_Psc_Date = CompareDate(record[0]['C_Schedule_Date']);
            // console.log(diff_Pp_Psc_Date + " " + record[0]['C_Schedule_Date']);
            if (diff_Pp_Psc_Date > 0){
                bg_Schedule_Date = "red";
            } else if (diff_Pp_Psc_Date == 0) {
                bg_Schedule_Date = "yellow";
            }
        } else if (record[0]['Pp_Status'] == 2) {
            BgStatusColor = "orange";
            diff_Pp_Psc_Date = CompareDate(record[0]['C_Schedule_Date']);
            // console.log(diff_Pp_Psc_Date + " " + record[0]['C_Schedule_Date']);
            if (diff_Pp_Psc_Date > 0){
                bg_Schedule_Date = "red";
            } else if (diff_Pp_Psc_Date == 0) {
                bg_Schedule_Date = "yellow";
            }
        } if (record[0]['Pp_Status'] == 3) {
            BgStatusColor = "#97ff4d";
        }
        if (filterBranch == "All") {
            for (let index = 0; index < record.length; index++) {
                var tr = document.createElement('tr');
                if (index == 0) {
                    tr.innerHTML = `
                        <td class="border-primary align-middle" rowspan="`+ record.length + `">` + branch_name + `</td>
                        <td class="border-primary align-middle" style="background-color: `+ BgStatusColor + `;" rowspan="` + record.length + `">` + record[index]['Pp_ID'] + `</td>
                        <td class="border-primary align-middle" rowspan="`+ record.length + `">` + record[index]['C_Date'] + `</td>
                        <td class="border-primary align-middle" style="background-color: `+ bg_Schedule_Date + `;" rowspan="`+ record.length + `">` + record[index]['C_Schedule_Date'] + `</td>
                        `;
                }
                tr.innerHTML += `
                        <td class="border-primary">` + record[index]['Pp_ProductID'] + `</td>
                        <td class="border-primary">` + record[index]['Pp_Products'] + `</td>
                        <td class="border-primary">` + record[index]['Pp_Qty'] + " " + record[index]['Pp_Unit_Qty'] + `</td>
                        <td class="border-primary">` + record[index]['Qt_Lenght_PUnit'] + `</td>
                        <td class="border-primary">` + record[index]['Cs_Customer'] + `</td>
                        <td class="border-primary">` + record[index]['Se_Qaotation'] + `</td>
                        <td class="border-primary">` + record[index]['Pp_CoilNO'] + `</td>
                        <td class="border-primary">` + record[index]['Pm_Width'] + " " + record[index]['Pm_Width_Unit'] + `</td>
                        `;
                BodyTable.appendChild(tr);
                sumtotal_bill += record[index]['Qt_Unit_Total'];
            }
            var tr = document.createElement('tr');
            tr.innerHTML += `
                        <td class="border-primary bg-secondary text-white" colspan="14">--------</td>
                        
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
                        <td class="border-primary">` + record[index]['Pp_ProductID'] + `</td>
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

function CompareDate(C_Schedule_Date) {

    // Get the current date
    var currentDate = new Date();

    var currentDate = new Date();  // Current date

    // Convert C_Schedule_Date to a Date object
    var parts = C_Schedule_Date.split('-');
    var scheduleDate = new Date(parts[2], parts[1] - 1, parts[0]); // year, month (0-indexed), day

    // Calculate the difference in time
    var timeDiff = scheduleDate.getTime() - currentDate.getTime();

    // Calculate the difference in days
    var diffDays = Math.abs(Math.floor(timeDiff / (1000 * 3600 * 24))) -1 ;

    return diffDays;

}

$(document).ready(function () {
    $('#find_button').click();
});