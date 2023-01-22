import { VideoDto } from './../video-dto';
import { VideoServiceService } from './../video-service.service';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { Component, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-save-video-details',
  templateUrl: './save-video-details.component.html',
  styleUrls: ['./save-video-details.component.css']
})

export class SaveVideoDetailsComponent {

  saveVideoDetailsForm:FormGroup;
  title:FormControl= new FormControl('');
  description:FormControl= new FormControl('');
  videoStatus:FormControl= new FormControl('');

  selectfile!:File;
  selectFileName='';
  videoId='';
  thumnailUrl='';
  likeCount!:Number;
  disLikeCount!:Number;
  viewCount!:Number;
  selected:boolean=false;
  @Output() videoUrl='';

  constructor( private activate : ActivatedRoute , private videoService:VideoServiceService,private snackBar: MatSnackBar){

    this.videoId=this.activate.snapshot.params['videoId'];
    // console.log(this.videoId);
    this.videoService.getVideo(this.videoId).subscribe(
      (data)=>{
        this.videoUrl=data.url;
        this.thumnailUrl=data.thumbnailUrl;
        this.likeCount=data.likeCount;
        this.disLikeCount=data.dislikeCount;
        this.viewCount=data.viewCount;
      }
    )
    this.saveVideoDetailsForm = new FormGroup(
      {
        title:this.title,
        description:this.description,
        videoStatus:this.videoStatus,

      }
    )
  }


  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  tags: string[] = [];

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.tags.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(value: string): void {
    const index = this.tags.indexOf(value);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  selectFile(event:Event){
    //@ts-ignore
    this.selectfile=event.target.files[0];
    this.selectFileName=this.selectfile.name;
    this.selected=true;
    console.log(this.selectfile);
  }
  Onupload(){
    this.videoService.uploadThumnail(this.selectfile,this.videoId).subscribe(
      (res)=>{
        this.snackBar.open(
          "succesfully added Thumnail", "Ok"
        );
        console.log("succesfullt added thumnail");
      }
    );
  }

  saveVideo(){
    const savedVideo : VideoDto ={
      "id":this.videoId,
      "description":this.saveVideoDetailsForm.get('description')?.value,
      "title":this.saveVideoDetailsForm.get('title')?.value,
      "tags":this.tags,
      "url":this.videoUrl,
      "videostatus":this.saveVideoDetailsForm.get('videostatus')?.value,
      "thumbnailUrl":this.thumnailUrl,
      "likeCount":this.likeCount,
      "dislikeCount":this.disLikeCount,
      "viewCount":this.viewCount
    }

    this.videoService.saveVideo(savedVideo).subscribe(
      (res)=>{
        this.snackBar.open(
          "succesfully added Video detail", "Ok"
        );
      }
    );

  }

}
