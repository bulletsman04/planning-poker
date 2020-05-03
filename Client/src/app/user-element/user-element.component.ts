import { Component, OnInit, Input } from '@angular/core';
import { User } from '../models/user';

@Component({
  selector: 'app-user-element',
  templateUrl: './user-element.component.html',
  styleUrls: ['./user-element.component.less']
})
export class UserElementComponent implements OnInit {
  @Input() user: User;
  @Input() showVotes: boolean;
  @Input() isMe: boolean;

  public vote: string;
  constructor() {

   }

  ngOnInit(): void {
    this.vote = this.getVoteAsString();
  }

  private getVoteAsString(): string {
    let vote;

    if (!this.user.voted){
      vote = '';
      return vote;
    }

    const userVoteValueMapped = this.user.voteValue !== null ? this.user.voteValue : '?';

    if (this.showVotes) {
      vote = userVoteValueMapped;
      return vote;
    }

    vote = this.isMe ? userVoteValueMapped : '&#10003;';

    return vote;
  }

}
