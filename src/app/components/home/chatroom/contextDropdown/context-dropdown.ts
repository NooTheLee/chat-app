import { CommonModule } from '@angular/common'
import { Component, Input } from '@angular/core';

@Component({
    selector: 'context-dropdown',
    standalone: true,
    imports: [CommonModule],
    templateUrl: 'context-dropdown.html'
})
export class ContextDropdown {
    @Input() id: string = '';
}