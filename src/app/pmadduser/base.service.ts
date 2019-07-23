import { Response } from '@angular/http';
import { Observable } from 'rxjs';
import { ServiceError } from './serviceerror';
export class BaseService {
    constructor() { }
    protected extractData(res: Response) {
        const body = res.json()['users'];
        if (body.status === '') {
            console.log(body.status);

            return body.data;
        } else if (body.status === 'fail') {
            console.log(body.status);

            throw new ServiceError(body.message, body.data, 'fail');
        } else if (body.status === 'error') {
            console.log(body.status);

            throw new ServiceError(body.message, body.data);
        } else {
            console.log(body.status);
            throw new ServiceError('Invalid JSend Response Status [' + body.status + ']');
            
        }
    }
    public baseurl(): string {
        return 'http://localhost:8099/projectmanagement';
    }

    protected handleError(error: any) {
        if (error instanceof ServiceError) {
            return Observable.throw(error);
        } else {
            const errMsg = (error.message) ? error.message : error.status ? `${error.status} - ${error.statusText}` : 'Server error';
            return Observable.throw(new ServiceError(errMsg));
        }
    }
}