import { CommentDto } from './comment/commentDto';
import { uploadVideoResponse } from './upload-video/uploadVideoResponse';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { VideoDto } from './video-dto';
import { AuthServiceService } from './auth-service.service';
import { FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class VideoServiceService {

  constructor(private httpclient:HttpClient,private authService:AuthServiceService) {
    this.userId=this.authService.getCurrentUser().id;
  }

  userId:String='';

  uploadVideo(fileEntry: File) :Observable<uploadVideoResponse> {

    const formData = new FormData();
      formData.append('file', fileEntry, fileEntry.name);
    return this.httpclient.post<uploadVideoResponse>("http://localhost:8080/api/video/upload",formData);

  }


  uploadThumnail(fileEntry: File,videoId :string) :Observable<uploadVideoResponse> {
    const formData = new FormData()
      formData.append('file', fileEntry, fileEntry.name);
      formData.append('videoId', videoId);
    return this.httpclient.post<uploadVideoResponse>("http://localhost:8080/api/video/uploadThumnail",formData);
  }
  getVideo(videoId:string):Observable<VideoDto>{

    return this.httpclient.get<VideoDto>("http://localhost:8080/api/video/"+this.userId+"/"+videoId);
  }

  saveVideo(savedVideo: VideoDto):Observable<VideoDto> {

   return this.httpclient.put<VideoDto>("http://localhost:8080/api/video/",savedVideo)


  }
  getAllvideos():Observable<any>{
    return this.httpclient.get<Array<VideoDto>>("http://localhost:8080/api/video/allVideos");
  }
  likeVideo(videoId: string):Observable<any> {
    return this.httpclient.post<any>("http://localhost:8080/api/video/"+this.userId+"/"+videoId+"/like",null);
  }
  subbscribeToUser(subscriberId:String):Observable<boolean> {
    return this.httpclient.post<boolean>("http://localhost:8080/api/user/subscribe/"+this.userId+"/"+subscriberId,null);
  }
  dislikeVideo(videoId: string) {
    return this.httpclient.post<any>("http://localhost:8080/api/video/"+this.userId+"/"+videoId+"/dislike",null);
  }

  unSubbscribeToUser(unSubscriberId: String):Observable<boolean> {
    return this.httpclient.post<boolean>("http://localhost:8080/api/user/unsubscribe/"+this.userId+"/"+unSubscriberId,null);
  }

  postComment(comment:CommentDto,videoId:String):Observable<any>{
    return this.httpclient.post<any>("http://localhost:8080/api/video/"+videoId+"/comment",comment);
  }

  getComments(videoId:String) {
    return this.httpclient.get<Array<CommentDto>>("http://localhost:8080/api/video/"+videoId+"/comments");
  }



}
