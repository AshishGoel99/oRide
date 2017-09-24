import { Injectable } from '@angular/core';

@Injectable()
export class DateTimeService {

    public ToLocalDate(now: Date): string {
        return now.getFullYear()
            + "-"
            + this.padL(now.getMonth() + 1, 2, '0')
            + "-"
            + this.padL(now.getDate(), 2, '0');
    }

    public ToLocalTime(now: Date): string {
        return this.padL(now.getHours(), 2, '0')
            + ":"
            + this.padL(now.getHours(), 2, '0');
    }

    public ToLocalDateTime(now: Date): string {
        return now.getFullYear()
            + "-"
            + this.padL(now.getMonth() + 1, 2, '0')
            + "-"
            + this.padL(now.getDate(), 2, '0')
            + "T"
            + this.padL(now.getHours(), 2, '0')
            + ":"
            + this.padL(now.getMinutes(), 2, '0');
    }

    public ToUtc(date: string): string {
        try {
            return new Date(date).toUTCString();
        }
        catch (err) {
            return null;
        }
    }

    private padL(val: number, len: number, char: string): string {

        let input = val.toString();

        if (input.length >= len)
            return input;

        while (input.length != len)
            input = char + input;

        return input;
    }
}