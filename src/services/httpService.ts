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
    private token: string;

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

        return new Observable(observer => {
            this.beforeRequest().then(() => {

                super.get(this.getFullUrl(url), this.requestOptions(options))
                    .do((res: Response) => {
                        this.onSuccess(res);
                    }, (error: any) => {
                        this.onError(error);
                    })
                    .catch((err, caught) => {
                        this.onCatch(err, caught);
                        return Observable.of(null);
                    })
                    .finally(() => {
                        this.onFinally();
                    })
                    .subscribe((data: Response) => {
                        observer.next(data);
                        observer.complete();
                    },
                    error => {
                        observer.error(error);
                    });
            });
        });

        // this.beforeRequest();

        // return super.get(this.getFullUrl(url), this.requestOptions(options))
        //     .do((res: Response) => {
        //         this.onSuccess(res);
        //     }, (error: any) => {
        //         this.onError(error);
        //     })
        //     .catch((err, caught) => {
        //         this.onCatch(err, caught);
        //         return Observable.of(null);
        //     })
        //     .finally(() => {
        //         this.onFinally();
        //     });
    }

    /**
     * Performs a request with `get` http method.
     * @param url
     * @param options
     * @returns {Observable<>}
     */
    post(url: string, data?: any, options?: RequestOptionsArgs): Observable<any> {

        return new Observable(observer => {
            this.beforeRequest().then(() => {

                super.post(this.getFullUrl(url), data, this.requestOptions(options))
                    .do((res: Response) => {
                        this.onSuccess(res);
                    }, (error: any) => {
                        this.onError(error);
                    })
                    .catch((err, caught) => {
                        this.onCatch(err, caught);
                        return Observable.of(null);
                    })
                    .finally(() => {
                        this.onFinally();
                    })
                    .subscribe((data: Response) => {
                        observer.next(data);
                        observer.complete();
                    },
                    error => {
                        observer.error(error);
                    });
            });
        });

        // this.beforeRequest();

        // return super.post(this.getFullUrl(url), data, this.requestOptions(options))
        //     .do((res: Response) => {
        //         this.onSuccess(res);
        //     }, (error: any) => {
        //         this.onError(error);
        //     })
        //     .catch((err, caught) => {
        //         this.onCatch(err, caught);
        //         return Observable.of(null);
        //     })
        //     .finally(() => {
        //         this.onFinally();
        //     });
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

        if (options.headers == null) {
            options.headers = new Headers({
                'Authorization': `bearer ${this.token}`,
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
    private async beforeRequest(): Promise<void> {
        this.notifyService.showLoading();

        if (this.token == null || this.token == '') {
            let env = this;
            await this.storage.get(environment.dataKey).then((data: UserData) => {
                if (data != null)
                    env.token = data.apiToken;
            });
        }
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