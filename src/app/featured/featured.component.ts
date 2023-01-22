import { Component } from '@angular/core';
import { VideoDto } from './../video-dto';
import { VideoServiceService } from './../video-service.service';
@Component({
  selector: 'app-featured',
  templateUrl: './featured.component.html',
  styleUrls: ['./featured.component.css']
})
export class FeaturedComponent {
  videos!:Array<VideoDto>;

  constructor(private videoService:VideoServiceService){
    this.videoService.getAllvideos().subscribe(
      (data)=>{
        console.log(data);
        this.videos=data;
      }
    )
  }
}
