import { Injectable, OnInit } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

@Injectable()


export class HttpService implements OnInit {

    private headers: Headers;
    private options: RequestOptions;

    constructor() { }

    ngOnInit(): void {
        this.headers = new Headers(
            {
                'Content-Type': 'application/json'
            });
        this.options = new RequestOptions({ headers: this.headers });
    }
}