
$(function () {
    const element = document.querySelectorAll('.datepicker-dropdown');
    var datepickerOptions = {
        mode: "range",
        allowInput: true,
        // Configuration options
        dateFormat: "d/m/Y",
        // Add more options as needed
        locale: calender
    };
    var datepickerInputs = document.getElementsByClassName("datepicker");
    for (var i = 0; i < datepickerInputs.length; i++) {
        var input = datepickerInputs[i];

        // Create datepicker instance for each input
        flatpickr(input, datepickerOptions);
    }

    for (let i = 0; i < element.length; i++) {
        const childElements = element[i].querySelectorAll('*');
        childElements.forEach(child => {
            child.classList.forEach(className => {
                child.classList.add('datepicker');
                if (className.startsWith('dark')) {
                    child.classList.remove(className);
                }
            });
        });
    }
});
$('.datepicker').click(function () {
    const element = document.querySelectorAll('.flatpickr-range');
    for (let i = 0; i < element.length; i++) {
        const childElements = element[i].querySelectorAll('*');
        childElements.forEach(child => {
            child.classList.forEach(className => {
                if (className.startsWith('dark')) {
                    child.classList.remove(className);
                }
            });
        });
    }
});
$('.datepicker').on('input', function () {
    var startDate = this.value;
    const delimiter = ['/', ' to '];
    var part1 = startDate.split('/');
    var part2 = startDate.split(new RegExp(delimiter.join('|'), 'g'));
    var newDate = startDate;

    if (part1.length === 3) {
        var day = parseInt(part1[0]);
        var month = parseInt(part1[1]);
        var year = parseInt(part1[2]);
        var yearstring = year.toString();
        if (!yearstring.startsWith('20')) {
            if ((yearstring.startsWith('25') && year > 2500 && year.toString().length == 4) || (!yearstring.startsWith('25') && year.toString().length > 1 && year.toString().length < 4 && year >= 50)) {
                if (!yearstring.startsWith('25')) {
                    year = '25' + year;
                }
                var date = new Date(year - 543, month - 1, day);
                var newDay = date.getDate().toLocaleString('en-US', { minimumIntegerDigits: 2 });
                var newMonth = (date.getMonth() + 1).toLocaleString('en-US', { minimumIntegerDigits: 2 });
                var newYear = date.getFullYear();
                newDate = newDay + '/' + newMonth + '/' + newYear;
                this.value = newDate + ' to ';
            } else if (!yearstring.startsWith('25') && year.toString().length > 1 && year.toString().length < 4 && year < 50) {
                year = '20' + year;
                var date = new Date(year, month - 1, day);
                var newDay = date.getDate().toLocaleString('en-US', { minimumIntegerDigits: 2 });
                var newMonth = (date.getMonth() + 1).toLocaleString('en-US', { minimumIntegerDigits: 2 });
                var newYear = date.getFullYear();
                newDate = newDay + '/' + newMonth + '/' + newYear;
                this.value = newDate + ' to ';
            }
        }
        if (year.length === 4) {
            var newDay = date.getDate().toLocaleString('en-US', { minimumIntegerDigits: 2 });
            var newMonth = (date.getMonth() + 1).toLocaleString('en-US', { minimumIntegerDigits: 2 });
            var newYear = date.getFullYear();
            newDate = newDay + '/' + newMonth + '/' + newYear;
            this.value = newDate + ' to ';
        }
    } else if (part2.length === 6) {
        var day = parseInt(part2[3]);
        var month = parseInt(part2[4]);
        var year = parseInt(part2[5]);
        var yearstring = year.toString();
        if (!yearstring.startsWith('20')) {
            if ((yearstring.startsWith('25') && year > 2500 && year.toString().length == 4) || (!yearstring.startsWith('25') && year.toString().length > 1 && year.toString().length < 4 && year >= 50)) {
                if (!yearstring.startsWith('25')) {
                    year = '25' + year;
                }
                var date = new Date(year - 543, month - 1, day);
                var newDay = date.getDate().toLocaleString('en-US', { minimumIntegerDigits: 2 });
                var newMonth = (date.getMonth() + 1).toLocaleString('en-US', { minimumIntegerDigits: 2 });
                var newYear = date.getFullYear();
                newDate2 = newDay + '/' + newMonth + '/' + newYear;
                let index = newDate.indexOf(' to ');
                if (index !== -1) {
                    const result = newDate.substring(0, index + 4);
                    newDate = result;
                }
                this.value = newDate + newDate2;
            } else if (!yearstring.startsWith('25') && year.toString().length > 1 && year.toString().length < 4 && year < 50) {
                year = '20' + year;
                var date = new Date(year, month - 1, day);
                var newDay = date.getDate().toLocaleString('en-US', { minimumIntegerDigits: 2 });
                var newMonth = (date.getMonth() + 1).toLocaleString('en-US', { minimumIntegerDigits: 2 });
                var newYear = date.getFullYear();
                newDate2 = newDay + '/' + newMonth + '/' + newYear;
                let index = newDate.indexOf(' to ');
                if (index !== -1) {
                    const result = newDate.substring(0, index + 4);
                    newDate = result;
                }
                this.value = newDate + newDate2;
            }
        }
    }
});
$('.datepicker').on('keydown', function (event) {
    const form = document.getElementById("searchform");
    if (event.key === 'Enter') {
        event.preventDefault(); // Prevent form submission on Enter key
        form.submit(); // Submit the form
    }
});