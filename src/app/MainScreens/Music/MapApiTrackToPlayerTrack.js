import { BASE_URL } from "../../../Enviornment";

//This is a project Custom
export const MapApiTrackToPlayerTrack = async(track) => {

  console.log(">>>>>kkk",track[1].audioUrl)

  return await track.map(itemTrack => ({
    id: itemTrack._id,
    url: BASE_URL + '/' + itemTrack.audioUrl,
    title: itemTrack.title,
    album:itemTrack?.description,
    artist: itemTrack?.to,
    artwork: BASE_URL + '/' + itemTrack.thumbnail,
    duration: 0, // Optional, if not provided by API
  }))
}



// return data.map(item => ({
//   username: item.name.replace(/,$/, ""), // Remove trailing comma
//   id: item.id.toString()                 // Convert id to string
// }));


//   export const mapApiTrackToPlayerTrack = (track) => ({
//   id: track._id,
//   url: BASE_URL + '/' + track.audioUrl,
//   title: track.title,
//   artist: 'Unknown Artist',
//   artwork: BASE_URL + '/' + track.thumbnail,
//   duration: 0, // Optional, if not provided by API
// });