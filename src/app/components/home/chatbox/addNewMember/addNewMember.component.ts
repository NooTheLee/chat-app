import { CommonModule } from '@angular/common';
import { Component, signal, OnInit, effect } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { finalize } from 'rxjs';
//
import { UserService } from '@/core';
import { useDebounce } from '@/shared';
import { ChatUserDto } from '@/models';

@Component({
  selector: 'add-new-member',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './addNewMember.component.html',
})
export class AddNewMember implements OnInit {
  // local
  search = signal('');
  textDebounce = useDebounce(() => this.search(), 500);
  loading: boolean = false;
  usersSearched: ChatUserDto[] = [];
  usersSelected: ChatUserDto[] = [];
  rawUsersSearched: ChatUserDto[] = [];

  constructor(private userService: UserService) {
    // Create an effect to automatically call onSearch when textDebounce changes
    effect(() => {
      const searchText = this.textDebounce();
      if (searchText) {
        this.onSearch();
      } else {
        this.usersSearched = [];
      }
    });
  }

  ngOnInit(): void {
    // Initialize component
  }

  onChangeInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.search.set(input.value || '');
  }

  onSubmit = (): void => {
    if (
      !this.textDebounce() ||
      this.textDebounce().trim() === '' ||
      this.loading
    ) {
      return;
    }
  };

  onSearch = (): void => {
    this.loading = true;
    this.userService
      .search(this.textDebounce())
      .pipe(
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe((response) => {
        this.usersSearched = response;
        this.rawUsersSearched = response;
      });
  };

  onDeleteUserSelected = (userId: string): void => {
    const newSelected = this.usersSelected.filter((u) => u.id !== userId) ?? [];
    this.usersSelected = newSelected;
    this.refreshUserSearched();
  };

  onSelectUser = (user: ChatUserDto): void => {
    this.usersSelected = [...this.usersSelected, user];
    this.refreshUserSearched();
  };

  onDeleteText = (): void => {
    this.search.set('');
    this.loading = false;
    this.rawUsersSearched = [];
    this.refreshUserSearched();
  };

  refreshUserSearched = () => {
    this.usersSearched = this.rawUsersSearched.filter(
      (u) => !this.usersSelected.some((us) => us.id === u.id)
    ) || [];
  };
}
