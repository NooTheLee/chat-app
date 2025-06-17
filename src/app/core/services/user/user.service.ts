import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
//
import { BaseService } from "../base/base.service";
import { ToastService } from "@/shared";
import { ChatUserDto } from "@/models";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class UserService extends BaseService {
    constructor(http: HttpClient, router: Router, toast: ToastService) {
        super(http, router, toast)
    }

    search = (query: string) : Observable<ChatUserDto> => {
        return this.get<ChatUserDto>(`/User/search?q=${query}`);
    }
}