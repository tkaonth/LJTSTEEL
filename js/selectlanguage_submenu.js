$("#Selectlanguage").on("change", function () {
    // Get the selected locale from the data-locale attribute
    var selectedLocale = $(this).val();

    // Send an AJAX request to update the session value
    console.log(selectedLocale);
    $.ajax({
        type: "POST",
        url: "../../api/set_locale.php", // Replace with the actual server-side script
        data: { locale: selectedLocale },
        success: function (response) {
            // Handle the response from the server if needed
            console.log(response);
            location.reload();
        },
        error: function (xhr, status, error) {
            // Handle errors if the AJAX request fails
            console.error(xhr, status, error);
        }
    });
});