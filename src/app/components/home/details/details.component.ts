import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AuthStateService, ChatRoomsStateService } from "../../../core";
import { ChatUserDto } from "../../../models";

@Component({
  selector: 'details-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './details.component.html'
})
export class Details {
  otherProfile: ChatUserDto | undefined;

  constructor(private chatRoomsStateService: ChatRoomsStateService) {
    this.chatRoomsStateService.getOtherMember().subscribe(member => {
      this.otherProfile = member;
    })
  }
}