import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ContactForm as contactForm } from '../interfaces/contact-form';
@Injectable({
  providedIn: 'root',
})
export class ContactService {
  api='http://mahmoud.runasp.net/api';
  constructor(
    private http:HttpClient
  ) {}

  contact(data:contactForm):Observable<any>{
    return this.http.post<any>(`${this.api}/contact`, data);
  }
}
