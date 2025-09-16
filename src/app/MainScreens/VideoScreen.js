import { Alert, Dimensions, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'


import { useState, useRef, useEffect, } from "react";

import Spinner from 'react-native-loading-spinner-overlay';
import { BASE_URL, SatyaSadhnaDownload } from '../../Enviornment.js';

import { useVideoPlayer, VideoView } from 'expo-video';
import { useEvent } from 'expo';
import { useNavigation } from '@react-navigation/native';

import MuteIcon from '../../assets/SVGS/MusicPlayer/Player/MuteIcon.js';
import UnMuteIcon from '../../assets/SVGS/MusicPlayer/Player/UnMuteIcon.js';
import PauseIcon from '../../assets/SVGS/MusicPlayer/Player/Pause.js';
import PlayIcon from '../../assets/SVGS/MusicPlayer/Player/PlayIcon.js';


import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import { Image } from 'expo-image';
import Metrics from '../../utills/ResposivesUtils/Metrics.js';
import CustomStatusBar from '../../components/UI/CustomStatusBar/CustomStatusBar.js';
import LoaderComponents from '../../components/UI/Loadings/LoaderComponents.js';
const VideoScreen = ({ route }) => {


  const navigation = useNavigation()
  const { id, selectedVideoData, totalVideoData, title = "Video" } = route.params

  const [selectedVideo, setSelectedVideo] = useState(selectedVideoData)
  const [isVideoLoaded, setIsVideoLoaded] = useState(true)
  const [spinnerBool, setSpinnerbool] = useState(false)
  const videoUrl = selectedVideo?.videoUrl;

  console.log("selectedVideo", selectedVideo)

  useEffect(() => {
    navigation.setOptions({

      title: videoUrl ? "Video" : "Post",
    });
  }, [navigation])


  //video 
  const videoRef = useRef(null);


  const player = useVideoPlayer(
    videoUrl ? `${BASE_URL}/${videoUrl}` : null,
    player => {
      player.loop = true;
      // player.play();
    }
  );

  const { isPlaying } = useEvent(player, 'playingChange', { isPlaying: player?.playing });



  //   useEffect(() => {
  //   return () => {
  //     player?.pause?.();
  //     player?.destroy?.(); // If your video player supports destroy
  //   };
  // }, []);

  if (spinnerBool) {
    return (
      <SafeAreaView>
        <Spinner
          visible={spinnerBool}
          color={"#5F2404"}
          animation={'fade'}
        />
      </SafeAreaView>
    );
  }

  const togglePlaying = () => {
    if (player.playing) {
      player.pause();
    } else {
      player.play();
    }
  };
  const toggleMute = () => {
    if (!player) return;

    player.muted = !player.muted;
  };




  const { isMuted } = useEvent(player, 'mutedChange', {
    isMuted: player.muted,
  });

  console.log("player.muted", player.muted)

  const MAX_LINES = 3
  const [expanded, setExpanded] = useState(false);

  const [downloadedFiles, setDownloadedFiles] = useState([]);
  const [downloadLoading, setDownloadLoading] = useState(false);

const downloadFile = async (audioUrl, fileName, id) => {
  try {
    const data = await AsyncStorage.getItem(SatyaSadhnaDownload);
    const downloadedFiles = data ? JSON.parse(data) : [];

    const isAlreadyDownloaded = downloadedFiles.some(file => file.id === id);
    if (isAlreadyDownloaded) {
      Alert.alert('Already downloaded', 'This file has already been downloaded.');
      return;
    }

    // Proceed to download
    console.log("Starting download...");
    await downloadAudio2(audioUrl, fileName, id);
  } catch (e) {
    console.log("Error in downloadFile:", e);
  }
};

const downloadAudio2 = async (fileUrl, fileName, id) => {
  try {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission denied', 'Cannot download without media library access.');
      return;
    }

    setDownloadLoading(true);

    const fileUri = FileSystem.documentDirectory + fileName;
    const { uri } = await FileSystem.downloadAsync(fileUrl, fileUri);

    const newDownload = {
      id,
      name: fileName,
      fileURL: uri,
      fileType: "video", // Change this if it's audio
    };

    // Retrieve current list
    const data = await AsyncStorage.getItem(SatyaSadhnaDownload);
    const downloadedFiles = data ? JSON.parse(data) : [];

    // Add new file
    const updatedFiles = [...downloadedFiles, newDownload];
    await AsyncStorage.setItem(SatyaSadhnaDownload, JSON.stringify(updatedFiles));

    Alert.alert(
      'Download complete',
      `The video file has been downloaded successfully.`,
      [
        { text: 'Go to downloads', onPress: () => {
          navigation.navigate('BottomTabScreen', { screen: 'Downloads' });

        }},
        { text: 'OK', style: 'cancel' }
      ]
    );
  } catch (error) {
    console.error("Error downloading file:", error);
  } finally {
    setDownloadLoading(false);
  }
};

  return (
    <View style={{ flex: 1 }}>
      <CustomStatusBar barStyle="dark-content" backgroundColor="white" />
      <Spinner
        visible={spinnerBool}
        color={"#5F2404"}
        animation={'fade'}
      />

      <LoaderComponents
        visible={downloadLoading}
      />

      {videoUrl ? (
        <View style={[styles.video, { paddingBottom: 10 }]}>
          <VideoView
            style={styles.video}
            player={player}
            allowsFullscreen
          // allowsPictureInPicture
          />
        </View>
      ) : <View style={[styles.video, { paddingBottom: 10, justifyContent: "center", alignItems: "center" }]}>
        <Text>smdvs</Text>
        <Image source={{ uri: `${BASE_URL}/${selectedVideo?.thumbnail}` }} style={[styles.video]} />
      </View>}


      {/* <ScrollView style={{ flex: 1 }}> */}
      <View>

        <View style={{ marginHorizontal: 17 }}>
          {selectedVideo ? <Text style={[{
            fontFamily: 'Gabarito-VariableFont', color: '#030370', fontSize: Metrics.rfv(16), textAlign: 'center', marginTop: 10
          }]} numberOfLines={2} >{selectedVideo.title}</Text> : <Text>"....."</Text>}
        </View>


        {videoUrl ? (<View style={{
          width: '70%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 10,
          alignSelf: 'center'
        }}>
          <TouchableOpacity style={[styles.button, {}]} onPress={() => { toggleMute("sdhsv") }}>
            {player?.muted ? <MuteIcon /> : <UnMuteIcon />}
          </TouchableOpacity>

          <TouchableOpacity style={[styles.button, {
            borderRadius: Metrics.rfv(25),
            width: Metrics.rfv(50),
            height: Metrics.rfv(50),
          }]} onPress={() => { togglePlaying() }}>
            {isPlaying ? <PauseIcon /> : <PlayIcon />}
          </TouchableOpacity>

          <TouchableOpacity style={[styles.button, {}]} onPress={() => {
            downloadFile(`${BASE_URL}/${selectedVideo.videoUrl}`, `${selectedVideo?.title}dd` + '.mp4', `${selectedVideo?._id}`)
          }}>
            <Feather name="arrow-down" size={20} color="white" />
          </TouchableOpacity>
        </View>) : (
          <View >
            <Text style={{ textAlign: 'center', fontFamily: 'Gabarito-VariableFont', color: '#030370', fontSize: Metrics.rfv(14), marginTop: 10, fontWeight: 'bold' }}>Image only</Text>
          </View>
        )}



        {/* <View style={{ marginHorizontal: 17, height: 300, marginTop: 10 }}> */}
        <ScrollView style={{ marginHorizontal: 17, height: 300, marginTop: 10 }}>
          <Text style={[{
            fontFamily: 'Gabarito-VariableFont', color: '#030370', fontSize: Metrics.rfv(14), marginTop: 10, fontWeight: 'bold'
          }]}>Description</Text>

          {selectedVideo ? <Text style={[{
            fontFamily: 'Gabarito-VariableFont', color: '#030370', fontSize: Metrics.rfv(12), marginTop: 5
          }]}
            numberOfLines={expanded ? undefined : MAX_LINES}
          // numberOfLines={3}
          >{selectedVideo.description}</Text> : <Text>"....."</Text>}

          {selectedVideo?.description?.length > 100 && ( // Show "Read more" only for long text
            <TouchableOpacity onPress={() => setExpanded(!expanded)}>
              <Text style={{
                color: '#007BFF',
                marginTop: 5,
                fontSize: Metrics.rfv(11),
                fontWeight: 'bold'
              }}>
                {expanded ? 'Read less' : 'Read more'}
              </Text>
            </TouchableOpacity>
          )}
        </ScrollView>

      </View>
    </View>
  )
}

export default VideoScreen

const styles = StyleSheet.create({

  video: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width * (9 / 16), // 16:9 aspect ratio
  },

  paragraphy_U10: {
    fontSize: 12,
    fontWeight: '500'
  },

  paragraphy_U11: {
    fontSize: 16,
    fontWeight: '500'
  },
  button: {
    backgroundColor: '#030370',
    borderRadius: Metrics.rfv(20),
    width: Metrics.rfv(40),
    height: Metrics.rfv(40),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center'
  }
})