import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthServiceService } from './../auth-service.service';
import { CommentDto } from './commentDto';
import { VideoServiceService } from './../video-service.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
videoId!:String;
comments: Array<CommentDto>=[];
commentsForm:FormGroup;
comment:FormControl=new FormControl('');
commentdto!:CommentDto;
userId="";
constructor(private activate : ActivatedRoute,private videoService:VideoServiceService,private authService:AuthServiceService,private snackbar: MatSnackBar){
  this.videoId=this.activate.snapshot.params['videoId'];
  this.commentsForm = new FormGroup({
      comment:this.comment
  }
  )
  console.log(this.videoId);
  this.getmethods();
  this.userId=this.authService.getCurrentUser().id;
}
  ngOnInit(): void {
    this.getmethods();
  }
  getmethods(){
    this.videoService.getComments(this.videoId).subscribe(
      (data)=>{
        this.comments=data;

      }
    );
  }

postComment() {
  this.commentdto={
    "commentText" : this.commentsForm.get('comment')?.value,
    "authorId":this.userId
  }
  this.videoService.postComment(this.commentdto,this.videoId).subscribe(
    (data)=>{
      this.snackbar.open(
        "comment uploaded succesfully","OK"
      )
      this.commentsForm.get('comment')?.reset();
      this.getmethods();
    }
  );
}



}
