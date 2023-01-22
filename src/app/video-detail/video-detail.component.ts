import { AuthServiceService } from './../auth-service.service';
import { VideoServiceService } from './../video-service.service';
import { Component, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-video-detail',
  templateUrl: './video-detail.component.html',
  styleUrls: ['./video-detail.component.css']
})
export class VideoDetailComponent implements OnInit{

  videoId:string ='';
  videoUrl!:string;
  thumnailUrl!:string;
  videoLoad:boolean=false;
  title:string='';
  description='';
  tags:Array<string>=[];
  videoStatus='';
  likeCount!:Number;
  disLikeCount!:Number;
  subscriberId!:String;
  viewCount!:Number;
  showSubscribeButton: boolean = true;
  showUnSubscribeButton: boolean = false;


  constructor(private activate : ActivatedRoute,private videoService:VideoServiceService,private authService:AuthServiceService){
    this.videoId=this.activate.snapshot.params['videoId'];
    this.videoService.getVideo(this.videoId).subscribe(
      (data)=>{
        this.videoUrl=data.url;
        this.thumnailUrl=data.thumbnailUrl;
        this.videoLoad=true;
        this.title=data.title;
        this.description=data.description;
        this.tags=data.tags;
        this.videoStatus=data.videostatus;
        this.likeCount=data.likeCount;
        this.disLikeCount=data.dislikeCount;
        this.viewCount=data.viewCount;
      }
    )
    this.subscriberId=this.authService.getCurrentUser().id;
    // console.log(this.authService.getCurrentUser());
  }
  ngOnInit(): void {

  }

  subscribeToUser() {
    this.videoService.subbscribeToUser(this.subscriberId).subscribe(
      ()=>{
        this.showSubscribeButton=false;
        this.showUnSubscribeButton=true;

      }
    );
  }
  unSubscribeToUser(){
    this.videoService.unSubbscribeToUser(this.subscriberId).subscribe(
      ()=>{
        this.showSubscribeButton=true;
        this.showUnSubscribeButton=false;
      }
    );
  }
  dislikeVideo() {
    this.videoService.dislikeVideo(this.videoId).subscribe(
      (data)=>{
        // console.log(data);
        this.disLikeCount=data.dislikeCount;
        this.likeCount=data.likeCount;
      }
    );
  }
  likeVideo() {
    this.videoService.likeVideo(this.videoId).subscribe(
      (data)=>{
        // console.log(data);
        this.likeCount=data.likeCount;
        this.disLikeCount=data.dislikeCount;
      }
    );
  }

}
