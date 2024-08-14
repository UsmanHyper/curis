import { Directive, HostListener } from '@angular/core';

@Directive({
    selector: '[appRestrictedTime]'
})
export class RestrictedTimeDirective {

    constructor() { }

    @HostListener('input', ['$event.target'])
    onInput(target: HTMLInputElement) {
        const timeParts = target.value.split(':');
        let hours = parseInt(timeParts[0]);
        const minutes = parseInt(timeParts[1]);

        // Round minutes to the nearest 15-minute interval
        const roundedMinutes = Math.round(minutes / 15) * 15;

        // Adjust hours if minutes overflow
        if (roundedMinutes === 60) {
            hours = (hours + 1) % 24;
        }

        // Update input value
        target.value = `${this.padZero(hours)}:${this.padZero(roundedMinutes)}`;
    }

    padZero(num: number): string {
        return num < 10 ? `0${num}` : `${num}`;
    }
}
