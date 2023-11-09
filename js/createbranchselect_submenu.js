
$(function () {
    $.ajax({
        type: "GET",
        url: "../../api/getAllBranch.php",
        success: function (response) {

            // console.log(response);
            var data = JSON.parse(response);
            createBranchOption(data);
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

function createBranchOption(data) {
    for (var i = 0; i < data.length; i++) {
        var optionText = "";
        if (locale == "th") {
            optionText = data[i].Bn_Branch_TH;
        } else if (locale == "lao") {
            optionText = data[i].Bn_Branch_TH;
        } else if (locale == "en") {
            optionText = data[i].Bn_Branch_TH;
        }
        const optionElement = document.createElement('option');
        optionElement.value = data[i].Bn_ID;
        optionElement.text = optionText;
        SelectBranch.add(optionElement);
    }
}