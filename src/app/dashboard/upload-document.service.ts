import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UploadDocumentService {
  baseUrl: string = environment.baseurl;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  constructor(private http: HttpClient) { }
  uploadFile(file: any) {
    // console.log(file);

    return this.http.post<any>(this.baseUrl + '/document/', file)
      .pipe(map((document: any) => {
        return document;
      }),
        catchError(this.handleError)
      );
  }



  getRequesterDocument() {
    debugger;
    return this.http.get<any>(this.baseUrl + '/document/user-document').pipe(map((document: any) => {
      alert("documents fetched");
      return document;
    }),
      catchError(this.handleError)
    );
  }

  getReviwerDocument() {
    debugger;
    return this.http.get<any>(this.baseUrl + '/document/').pipe(map((document: any) => {
      alert("documents fetched");
      return document;
    }),
      catchError(this.handleError)
    );
  }

  updateFile(file: any) {
    debugger;
    return this.http.put<any>(this.baseUrl + '/document/:id', file)
      .pipe(map((document: any) => {
        alert("document updated successfully");

        return document;
      }),
        catchError(this.handleError)
      );
  }

  deleteFile(_id: any) {
    // debugger;
    return this.http.delete<any>(this.baseUrl + '/document/' + _id, this.httpOptions).pipe(
    catchError(this.handleError)
    )
}

  handleError(error: HttpHeaderResponse) {
    return throwError(error);
  }
}
