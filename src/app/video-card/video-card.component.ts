import { SignupRequest } from './../Request/signupRequest';
import { Component, Input } from '@angular/core';
import { AuthServiceService } from '../auth-service.service';
import { VideoDto } from '../video-dto';

@Component({
  selector: 'app-video-card',
  templateUrl: './video-card.component.html',
  styleUrls: ['./video-card.component.css']
})
export class VideoCardComponent {
  @Input() video!:VideoDto;
  userId:SignupRequest;

  constructor(private authService:AuthServiceService){
    this.userId=this.authService.getCurrentUser().id;
    console.log("this is the id"+this.userId.id);
  }

}
