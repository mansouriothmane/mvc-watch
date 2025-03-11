export class Time {
  hours: number;
  minutes: number;
  seconds: number;
  gmtOffset: number;
  hour12: boolean;
  ampm: string;

  constructor(gmtOffset?: number, hour12: boolean = false) {
    const date =
      gmtOffset != undefined ? this.getDateWithOffset(gmtOffset) : new Date();
    this.hours = date.getHours();
    this.minutes = date.getMinutes();
    this.seconds = date.getSeconds();
    this.gmtOffset = gmtOffset ?? -date.getTimezoneOffset() / 60;
    this.hour12 = hour12;
    this.ampm = this.hours >= 12 ? "PM" : "AM";
  }

  getHours() {
    if (this.hour12) {
      return this.hours % 12 || 12;
    } else {
      return this.hours;
    }
  }

  getMinutes() {
    return this.minutes;
  }

  getSeconds() {
    return this.seconds;
  }

  toggleFormat() {
    this.hour12 = !this.hour12;
  }

  incrementHours() {
    if (this.hours != 23) {
      this.hours++;
    } else {
      this.hours = 0;
    }
  }

  incrementMinutes() {
    if (this.minutes != 59) {
      this.minutes++;
    } else {
      this.minutes = 0;
      this.incrementHours();
    }
  }

  incrementSeconds() {
    if (this.seconds != 59) {
      this.seconds++;
    } else {
      this.seconds = 0;
      this.incrementMinutes();
    }
  }

  private getDateWithOffset(gmtOffset: number): Date {
    const now = new Date();
    const utc = now.getTime() + now.getTimezoneOffset() * 60000; // Convert to UTC
    return new Date(utc + gmtOffset * 3600000); // Apply GMT offset
  }
}
