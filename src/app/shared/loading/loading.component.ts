import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingService } from './loading.service';

@Component({
  selector: 'loading',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
    *ngIf="loading"
      class="w-screen h-screen bg-black/20 flex justify-center items-center fixed top-0 left-0 z-[9999]"
    >
      <div class="flex flex-col gap-y-[2vh]">
        <span class="loading loading-spinner w-[10vh] "></span>
        Loading...
      </div>
    </div>
  `,
})
export class Loading {
  loading: boolean = false;

  constructor(private loadingService: LoadingService) {
    this.loadingService.loading$.subscribe((ld) => {
      this.loading = ld;
    });
  }
}
