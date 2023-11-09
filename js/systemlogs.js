
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
        url: "./api/GetSystemLogs.php",
        data: {
            // Data to send
            
            searchTerm: searchTerm,
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
    while (BodyTable.firstChild) {
        BodyTable.removeChild(BodyTable.firstChild);
    }
    for (let index = 0; index < dataReport.length; index++) {
        if (filterBranch == "All") {
            var tr = document.createElement('tr');
            tr.innerHTML = `
                        <td class="border-primary">`+ counter + `</td>
                        <td class="border-primary">` + dataReport[index]['Al_Datetime'] + `</td>
                        <td class="border-primary">` + dataReport[index]['i_String_Log'] + `</td>
                        <td class="border-primary">` + dataReport[index]['Al_Device'] + `</td>
                        <td class="border-primary">` + dataReport[index]['Al_IPAddress'] + `</td>
                        <td class="border-primary">` + dataReport[index]['Al_Application'] + `</td>
                        <td class="border-primary">` + dataReport[index]['Al_Log_By'] + `</td>
                        <td class="border-primary">` + dataReport[index]['Us_UserName'] + `</td>
                        <td class="border-primary">` + dataReport[index]['Al_Remark'] + `</td>
                        `;
            BodyTable.appendChild(tr);
            counter++;
        } else if (filterBranch == dataReport[index]['St_BranchID']) {
            var tr = document.createElement('tr');
            tr.innerHTML = `
                        <td class="border-primary">`+ counter + `</td>
                        <td class="border-primary">` + dataReport[index]['Al_Datetime'] + `</td>
                        <td class="border-primary">` + dataReport[index]['i_String_Log'] + `</td>
                        <td class="border-primary">` + dataReport[index]['Al_Device'] + `</td>
                        <td class="border-primary">` + dataReport[index]['Al_IPAddress'] + `</td>
                        <td class="border-primary">` + dataReport[index]['Al_Application'] + `</td>
                        <td class="border-primary">` + dataReport[index]['Al_Log_By'] + `</td>
                        <td class="border-primary">` + dataReport[index]['Us_UserName'] + `</td>
                        <td class="border-primary">` + dataReport[index]['Al_Remark'] + `</td>
                        `;
            BodyTable.appendChild(tr);
            counter++;
        }
        
        
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
