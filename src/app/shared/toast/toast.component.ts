import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService } from './toast.service';
import { ToastData } from '../../store/app.state';

@Component({
    selector: 'toast',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div *ngIf="!!toast?.toastType && !!toast?.content" class="toast toast-top toast-end">
            <div class="alert" [ngClass]="'alert-' + toast?.toastType">
                <span>{{toast?.content}}</span>
            </div>
        </div>
    `,
    styles: [`
        .toast > .alert.alert-warning {
            background-color: #fbbf24;
        }
        .toast > .alert.alert-error {
            background-color: #f87171;
        }
        .toast > .alert.alert-success {
            background-color: #34d399;
        }
        .toast > .alert.alert-infor {
            background-color: #60a5fa;
        }
    `]
})
export class Toast {
    toast: ToastData | null = null;

    constructor(private toastService: ToastService) {
        this.toastService.toast$.subscribe(data => {
            this.toast = data;
        })
    }
}