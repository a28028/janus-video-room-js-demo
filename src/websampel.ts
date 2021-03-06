import * as janusvideo from "janus-video-room-js"

declare global {
  interface Window { janusvideo: any; }
}
window.janusvideo = janusvideo;
var server = "wss://janus.conf.meetecho.com/ws";
//server  = "ws://webrtc.10d.ir:8188";
let sampelRoom = new janusvideo.Janus.JanusRoom(server, { keepalive: 'true' });
/**
 * on joined room success
 */
sampelRoom.eventRoomjoined.on((info: any) => {
  console.debug("Roomjoined");
  console.debug(info);
})
sampelRoom.eventNeedVideoLocal.on((elementinfo: any) => {
  elementinfo.element = document.getElementById('localvideo');
})
sampelRoom.eventNeedVideoRemote.on((event: any) => {
  if (!document.getElementById(event.feedInfo.id)) {
    const video = document.createElement('video');
    video.id = event.feedInfo.id;
    video.autoplay = true;
    if (document.getElementById(`h${event.feedInfo.id}`)) { document.getElementById(`h${event.feedInfo.id}`).remove() }
    document.getElementById('remotvideocontainer').innerHTML += (`<h2 id="h${event.feedInfo.id}"> ${event.feedInfo.id} display : ${event.feedInfo.display} </h2>`)
    document.getElementById('remotvideocontainer').appendChild(video);
    event.element = video;
  }
  else {
    event.element = document.getElementById(event.feedInfo.id);
  }
  let spanID = "no_video_" + event.feedInfo.id.toString();
  let elementSpan = document.getElementById(spanID);
  if (elementSpan) { elementSpan.remove() }
})
/**
 *  On Leaving feed from room
 */
sampelRoom.eventOnLeaving.on((feedID: number) => {
  let elementVideo = document.getElementById(feedID.toString());
  let spanID = "no_video_" + feedID.toString();
  let elementSpan = document.getElementById(spanID);
  let h2 = document.getElementById(`h${feedID}`);
  if (elementVideo) { elementVideo.remove(); }
  if (elementSpan) { elementSpan.remove() }
  if (h2) { h2.remove() }
})
/**
 * on Unpublished  video and  audio 
 */
sampelRoom.eventOnUnpublished.on((feedID: number) => {
  let elementVideo = document.getElementById(feedID.toString());
  let spanID = "no_video_" + feedID.toString();
  //let elementSpan = document.getElementById(spanID);
  if (elementVideo) {
    let elementSpan = document.createElement('span');
    elementSpan.id = spanID;
    elementSpan.innerHTML = "no video  publish";
    elementVideo.parentNode.replaceChild(elementSpan, elementVideo);
    //document.getElementById(feedID.toString()).remove();
  }
})
/*
sampelRoom.joinRoom(1234, 'fullname2').then((data: any) => {
  console.log('joinRoom 1234');
})
*/
//room id : 5175
//password: 35239205 
sampelRoom.joinRoom(3278, 'fullname2',
  {
    "ptype": "publisher"

  }
).then((data: any) => {
  console.log('joinRoom 1234');
}).catch((e) => {
  alert(e.message);
}

);






