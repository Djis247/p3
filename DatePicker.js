'use strict';

class DatePicker {
    constructor(id, callback) {

        //initialize DatePicker attributes
        this.monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        this.daysOfWeek = ['Su', 'M', 'Tu', 'W', 'Th', 'F', 'Sa'];
        this.id = id;
        this.callback = callback;
        this.currentDate = null;
    }

    render(date) {
        this.currentDate = new Date(date);

        const container = document.getElementById(this.id);
        container.innerHTML = '';

        const monthHeader = this.monthHeader();
        const calendar = this.calendarBody();

        //add the month header and calendar to the container
        container.appendChild(monthHeader);
        container.appendChild(calendar);

        //renders the calendar for each month/year because they will be different by number of days in month, where the first week starts, etc.
        this.calendarUpdate();
    }

    monthHeader() {
        var monthHeader = document.createElement('div');
        monthHeader.className = 'datepickerHeader';

        //label for the month and year on the calendar
        const monthYearLabel = this.monthYearLabel();

        //previous button and next button
        const previousMonthBtn = this.controlButton('<-', () => this.previousMonth());
        const nextMonthBtn = this.controlButton('->', () => this.nextMonth());

        //add month label, previous btn, and next btn to monthHeader div
        monthHeader.appendChild(monthYearLabel);
        monthHeader.appendChild(previousMonthBtn);
        monthHeader.appendChild(nextMonthBtn);

        return monthHeader;
    }

    //pass in the text(<- or ->) and the action of the button (previous or next month)
    controlButton(text, clickHandler) {
        var button = document.createElement('button');
        button.className = 'datepickerControl';
        button.textContent = text;
        button.addEventListener('click', clickHandler);
        return button;
    }

    previousMonth() {
        //sets the month to the previous (one month less) than our current month
        this.currentDate.setMonth(this.currentDate.getMonth() - 1);
        this.render(this.currentDate);
    }

    nextMonth() {
        //sets the month to the next (one month more) than our current month
        this.currentDate.setMonth(this.currentDate.getMonth() + 1);
        this.render(this.currentDate);
    }

    calendarBody() {
        var calendar = document.createElement('div');
        calendar.className = 'datepickerBody';

        var dayLabels = this.dayLabels();
        this.daysGrid = this.createDaysGrid();

        //add the label for the days of the week (m tu w th...) and calendar grid
        calendar.appendChild(dayLabels);
        calendar.appendChild(this.daysGrid);

        return calendar;
    }

    //returns the labels for days of the week ex: M Tu W Th...
    dayLabels() {
        var dayLabels = document.createElement('div');
        dayLabels.className = 'datepickerDayLabels';

        for (var day of this.daysOfWeek) {
            var label = document.createElement('div');
            label.className = 'datepickerDayLabel';
            label.textContent = day;
            dayLabels.appendChild(label);
        }

        return dayLabels;
    }

    //returns the month and year on the calendar
    monthYearLabel() {
        var label = document.createElement('div');
        label.className = 'datepickerMonthYearLabel';
        label.textContent = `${this.monthNames[this.currentDate.getMonth()]}-${this.currentDate.getFullYear()}`;
        return label;
    }

    //generates our calendar grid
    createDaysGrid() {
        const daysGrid = document.createElement('div');
        daysGrid.className = 'datepickerGrid';
        daysGrid.addEventListener('click', (event) => this.handleDayClick(event));

        return daysGrid;
    }


    createSelectedDay(dayNumber) {
        var day = document.createElement('div');
        day.className = 'datepickerDay';
        day.textContent = dayNumber;

        //this verifys the dayNumber that is passed through is actually the one that matches our currentDate object
        //then through css it will give it the 'selected' css properties
        if (this.currentDate.getDate() === dayNumber) {
            day.classList.add('selected');
        }

        return day;
    }

    calendarUpdate() {
    var daysGrid = this.daysGrid;
    daysGrid.innerHTML = '';

    //create firstDayOfMonth object for the first day of the current mont
    var firstDayOfMonth = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 1);
    //create lastDayOfMonth object for the last day of the current month
    var lastDayOfMonth = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 0);

    //tells us the total number of days in a month
    var numDaysInMonth = lastDayOfMonth.getDate();
        
    //know where the first day starts in the current month of the week
    //ex: if the first day of the month starts on Wednesday
    //Su M Tu W Th F Sa
    //      1 2  3 4  5
    var firstDayOfWeek = firstDayOfMonth.getDay();

    //number of days to show from the next month
    var numDaysFromNextMonth = 6 - (lastDayOfMonth.getDay());

    //create run on days for the previous month 
    for (let i = firstDayOfWeek; i > 0; i--) {
        var prevMonthDay = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 0 - i + 1);
        daysGrid.appendChild(this.createEmptyDay(prevMonthDay.getDate(), true));
    }

    //create days for the current month
    for (let i = 1; i <= numDaysInMonth; i++) {
        daysGrid.appendChild(this.createSelectedDay(i));
    }

    //create run on days for the next month
    for (let i = 1; i <= numDaysFromNextMonth; i++) {
        var nextMonthDay = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, i);
        daysGrid.appendChild(this.createEmptyDay(nextMonthDay.getDate(), true));
    }
}

    createEmptyDay(dayNumber, isOutsideMonth) {
        var day = document.createElement('div');
        day.className = 'datepickerDayEmpty';

        //add the grayed-out class to any day not in the current month on the calendar
        if (isOutsideMonth) {
            //add the grayed out class to the outside month
            day.classList.add('grayed-out');
            //this will make the event day in the calendar non clickable
            day.style.pointerEvents = 'none'; 
        }
        day.textContent = dayNumber;
        return day;
    }

    handleDayClick(event) {
        var day = event.target;
        if (day.classList.contains('datepickerDay')) {
            var selectedDate = { month: this.currentDate.getMonth() + 1, day: day.textContent, year: this.currentDate.getFullYear() };
            console.log("Month:",this.currentDate.getMonth() + 1," Date:", day.textContent," Year:",  this.currentDate.getFullYear())
            this.callback(this.id, selectedDate);
        }
    }
}












