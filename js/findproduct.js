
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
        url: "../../api/FindProduct.php",
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
            var branch_name = "";
            var tdPp_Price = "";
            if (locale == "th") {
                branch_name = dataReport[index]['Bn_Branch_TH'];
            } else if (locale == "lao") {
                branch_name = dataReport[index]['Bn_Branch_LA'];
            } else if (locale == "en") {
                branch_name = dataReport[index]['Bn_Branch_EN'];
            }
            var Pp_Price = dataReport[index]['Pp_Price'] == null ? 0 : dataReport[index]['Pp_Price'];
            var i_Last_Username = dataReport[index]['i_Last_Username'] == null ? nomovement : dataReport[index]['i_Last_Username'];
            var i_Last_Movement = dataReport[index]['i_Last_Movement'] == null ? nomovement : dataReport[index]['i_Last_Movement'];
            var tr = document.createElement('tr');
            if (Pp_Price > 0) {
                tdPp_Price = `<td class="border-primary">` + Pp_Price.toLocaleString() + `</td>`;
            } else {
                tdPp_Price = `<td class="border-primary bg-danger text-white">` + Pp_Price.toLocaleString() + `</td>`;
            }
            
            tr.innerHTML = `
                        <td class="border-primary">`+ counter + `</td>
                        <td class="border-primary">` + branch_name + `</td>
                        <td class="border-primary">` + dataReport[index]['St_ProductID'] + `</td>
                        <td class="border-primary">` + dataReport[index]['Pm_Description'] + `</td>
                        <td class="border-primary">` + dataReport[index]['St_Qty'].toLocaleString() + `</td>
                        `+ tdPp_Price +`
                        <td class="border-primary">` + dataReport[index]['St_Location'] + `</td>
                        <td class="border-primary">` + i_Last_Movement + `</td>
                        <td class="border-primary">` + i_Last_Username + `</td>
                        `;
            BodyTable.appendChild(tr);
            counter++;
        } else if (filterBranch == dataReport[index]['St_BranchID']) {
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
            var Pp_Price = dataReport[index]['Pp_Price'] == null ? 0 : dataReport[index]['Pp_Price'];
            var i_Last_Username = dataReport[index]['i_Last_Username'] == null ? nomovement : dataReport[index]['i_Last_Username'];
            var i_Last_Movement = dataReport[index]['i_Last_Movement'] == null ? nomovement : dataReport[index]['i_Last_Movement'];
            if (Pp_Price > 0) {
                tdPp_Price = `<td class="border-primary">` + Pp_Price.toLocaleString() + `</td>`;
            } else {
                tdPp_Price = `<td class="border-primary bg-danger text-white">` + Pp_Price.toLocaleString() + `</td>`;
            }

            tr.innerHTML = `
                        <td class="border-primary">`+ counter + `</td>
                        <td class="border-primary">` + branch_name + `</td>
                        <td class="border-primary">` + dataReport[index]['St_ProductID'] + `</td>
                        <td class="border-primary">` + dataReport[index]['Pm_Description'] + `</td>
                        <td class="border-primary">` + dataReport[index]['St_Qty'].toLocaleString() + `</td>
                        `+ tdPp_Price + `
                        <td class="border-primary">` + dataReport[index]['St_Location'] + `</td>
                        <td class="border-primary">` + i_Last_Movement + `</td>
                        <td class="border-primary">` + i_Last_Username + `</td>
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