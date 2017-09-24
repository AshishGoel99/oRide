import { Injectable } from '@angular/core';
import {
    Http,
    ConnectionBackend,
    RequestOptions,
    RequestOptionsArgs,
    Response,
    Headers
} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { Storage } from '@ionic/storage';
import { NotifyService } from "./notifyService";
import { environment } from "../environment";
import { UserData } from '../models/userData';


@Injectable()
export class HttpService extends Http {

    constructor(
        backend: ConnectionBackend,
        defaultOptions: RequestOptions,
        private notifyService: NotifyService,
        private storage: Storage
    ) {
        super(backend, defaultOptions);
    }

    /**
     * Performs a request with `get` http method.
     * @param url
     * @param options
     * @returns {Observable<>}
     */
    get(url: string, options?: RequestOptionsArgs): Observable<any> {
        this.beforeRequest();
        return super.get(this.getFullUrl(url), this.requestOptions(options))
            .catch(this.onCatch)
            .do((res: Response) => {
                this.onSuccess(res);
            }, (error: any) => {
                this.onError(error);
            })
            .finally(() => {
                this.onFinally();
            });
    }

    /**
     * Performs a request with `get` http method.
     * @param url
     * @param options
     * @returns {Observable<>}
     */
    post(url: string, data?: any, options?: RequestOptionsArgs): Observable<any> {
        this.beforeRequest();
        return super.post(this.getFullUrl(url), data, this.requestOptions(options))
            .catch(this.onCatch)
            .do((res: Response) => {
                this.onSuccess(res);
            }, (error: any) => {
                this.onError(error);
            })
            .finally(() => {
                this.onFinally();
            });
    }

    // Implement POST, PUT, DELETE HERE

    /**
     * Request options.
     * @param options
     * @returns {RequestOptionsArgs}
     */
    private requestOptions(options?: RequestOptionsArgs): RequestOptionsArgs {
        if (options == null) {
            options = new RequestOptions();
        }

        let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJnaXZlbl9uYW1lIjoiQXNoaXNoIiwiZW1haWwiOiJhc2hpc2guZ29lbDk5QHlhaG9vLmNvbSIsIm5hbWVpZCI6ImM2NGE3MmFhLTczMDEtNGM5ZC04MzdkLTdkNDE1OGVjNmNjNiIsImV4cCI6MTUwNjM0ODc5MCwiaXNzIjoib1JpZGUiLCJhdWQiOiJwYXNzZW5nZXJzIn0.8m4BcsNUYSQB9l8cv5xGGDl9Kn1p9dcK-_jznOUDii0";//null;
        this.storage.get(environment.dataKey).then((data: UserData) => {
            if (data != null)
                token = data.apiToken;
        });

        if (options.headers == null) {
            options.headers = new Headers({
                'Authorization': `bearer ${token}`,
                'Content-Type': 'application/json'
            });
        }
        return options;
    }

    /**
     * Build API url.
     * @param url
     * @returns {string}
     */
    private getFullUrl(url: string): string {
        return environment.apiEndpoint + url;
    }

    /**
     * Before any Request.
     */
    private beforeRequest(): void {
        this.notifyService.showLoading();
    }

    /**
     * After any request.
     */
    private afterRequest(): void {
        this.notifyService.hideLoading();
    }

    /**
     * Error handler.
     * @param error
     * @param caught
     * @returns {ErrorObservable}
     */
    private onCatch(error: any, caught: Observable<any>): Observable<any> {
        this.notifyService.popError(error);
        return Observable.throw(error);
    }

    /**
     * onSuccess
     * @param res
     */
    private onSuccess(res: Response): void {
        console.log(res);
    }

    /**
     * onError
     * @param error
     */
    private onError(error: any): void {
        this.notifyService.popError(error);
    }

    /**
     * onFinally
     */
    private onFinally(): void {
        this.afterRequest();
    }
}