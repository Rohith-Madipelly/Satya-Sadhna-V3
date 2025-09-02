import { View, Text, Alert, FlatList, RefreshControl, TouchableOpacity } from 'react-native';
import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { useSelector } from 'react-redux';


import DownloadIcon from '../../../assets/SVGS/MusicPlayer/DownloadIcon';
import Play_Circle from '../../../assets/SVGS/MusicPlayer/Play_Circle';
import MusicIcon from '../../../assets/SVGS/MusicPlayer/MusicIcon';
import PauseIcon2 from '../../../assets/SVGS/MusicPlayer/Player/PauseIcon2';

import Metrics from '../../../utills/ResposivesUtils/Metrics'


import { GET_TRACK_BY_CATEGORY } from '../../../network/API_Calls';
import NoTrackAvailable from '../../../assets/SVGS/UIScrees/NoTrackAvailable';
import CustomStatusBar from '../../../components/UI/CustomStatusBar/CustomStatusBar';
import SkeletonLoader2 from '../../../components/UI/Loadings/SkeletonLoader';
import { useAudio } from '../../../contextAPI/AudioContext';
import { BASE_URL } from '../../../Enviornment';
import FloatingPlayer from './FloatingPlayer';
import { useToast } from 'react-native-toast-notifications';
import TrackPlayer from 'react-native-track-player';

const TracksListByCategory = ({ navigation, route }) => {

    const Category = route?.params?.Category || "Default Category";
    const [loadingList, setLoadingList] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [trackListData, setTrackListData] = useState([]);
    const [categoryUrl, setCategoryUrl] = useState("");
    let tokenn = useSelector((state) => state.login.token);
    const [apiReqKey, setApiReqKey] = useState("")
    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: Category,
        });
    }, [navigation, Category]);

    const getAllCategory = async (categoryX) => {
        try {
            setTrackListData([]);
            setLoadingList(true)

            const res = await GET_TRACK_BY_CATEGORY(tokenn, categoryX)
            if (res?.data) {
                const categoryKey = Category?.trim();
                if (categoryKey === "For Children's") {
                    console.log("sjhdvjhcs", res.data.allChildrenTracks)
                    setTrackListData(res.data.allChildrenTracks || []);
                } else if (categoryKey === "For New Sadhak") {
                    setTrackListData(res.data.allNewSadhakTracks || []);
                } else {
                    setTrackListData(res.data.allOldSadhakTracks || []);
                }
            }
        } catch (error) {
            if (error.response) {
                if (error.response.status === 401) {
                    Alert.alert("No Quotes are available right now...!");
                } else if (error.response.status === 403) {
                    console.log("Forbidden:", error.response.data.message);
                } else if (error.response.status === 404) {
                    console.log("Not Found:", error.response.data.message);
                    ServerTokenError_Logout(undefined, undefined);
                } else if (error.response.status >= 500) {
                    ServerError(undefined, `${error.message}`);
                }
            } else if (error.code === 'ECONNABORTED') {
                Alert.alert("Request Timed Out", "Please try again later.");
            } else if (error.request) {
                if (error.request.status === 0) {
                    Alert.alert("No Network Found", "Please check your internet connection.");
                }
            }
        } finally {
            setLoadingList(false);
            setRefreshing(false);
        }
    };

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        getAllCategory(apiReqKey);
    }, [apiReqKey]);

    const { loadQueue, getQueueList, playTrack, currentTrack, playTrackById, togglePlayPause, playbackState } = useAudio();

    const categoryKey = Category?.trim();
    useEffect(() => {
        const categoryKey = Category?.trim();
        if (categoryKey == "For Children's") {
            setApiReqKey('childrentracks')
            getAllCategory('childrentracks');
        } else if (categoryKey == "For New Sadhak") {
            setApiReqKey('newsadhaktracks')
            getAllCategory('newsadhaktracks');
        } else if (categoryKey == "For Old Sadhak") {
            setApiReqKey('oldsadhaktracks');
            getAllCategory('oldsadhaktracks');

        } else {
            console.log("ERROR IN categoryKey")
        }

    }, [categoryKey]);


    useEffect(() => {
        if (!trackListData || trackListData.length <= 0) {
            setTimeout(() => {
                setLoadingList(false);
            }, 2000);
        } else {
            setLoadingList(false);
        }
    }, [trackListData]);

    if (!route?.params) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>No Category Provided</Text>
            </View>
        );
    }

    // useEffect(() => {
    //     const state = TrackPlayer.getState();
    //     console.log('🎧 Initial state:', state);
    //     if(state=="none" || state?._k==null){
    //         console.log("Helloo")
    //     loadQueue(trackListData)
    //     }
    // }, [])

    

    //old Code

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: Category,
        });
    }, [navigation, Category]);


    const ClickActionXXXX = (item, download) => {
          const state = TrackPlayer.getState();
        if (item.type === "Audio") {
            if (item._id === currentTrack?.id && playbackState?.state) {
                // If the track is already playing, toggle play/pause
                togglePlayPause();
            } else {
                playTrackById(item._id)
            }
            // Navigate to AudioScreen for details/download
            navigation.navigate('AudioScreen', { id: item._id, download });
        }
    };


    const ClickAction = async (item, download) => {
  const state = TrackPlayer.getState();

  console.log(state,"/////")
        if (item.type === "Audio") {
            const queue = await getQueueList();

            const queueIds = queue.map(track => track.id);
            const allIds = trackListData.map(track => track._id);

            const queueIsComplete =
                queue.length === trackListData.length &&
                allIds.every(id => queueIds.includes(id));

            if (!queueIsComplete) {
                // Queue is not loaded or incomplete — load all tracks
                await loadQueue(trackListData);
            }

            // Play this specific track
            if (item._id === currentTrack?.id && playbackState?.state === "playing") {
                togglePlayPause(); // Pause if already playing
            } else {
                await playTrackById(item._id); // Play clicked track
            }

            // Navigate to detail/download screen
            navigation.navigate('AudioScreen', { id: item._id, download });
        }
    };


    const toast = useToast()

    return (
        <View style={{ flex: 1, backgroundColor: 'white', justifyContent: 'flex-start' }}>
            <CustomStatusBar barStyle="dark-content" backgroundColor="white" />
            {loadingList ? (
                <View style={{ marginTop: 20, paddingHorizontal: 17 }}>
                    <SkeletonLoader2 style={{ width: '100%', height: Metrics.rfv(30), borderRadius: 5 }} />
                    <SkeletonLoader2 style={{ width: '100%', height: Metrics.rfv(30), borderRadius: 5, marginTop: 10 }} />
                </View>
            ) : null}
            <FlatList
                style={{ flex: 1, paddingHorizontal: 17, marginTop: 10 }}
                data={trackListData}
                keyExtractor={(item) => item._id?.toString() || item.id?.toString() || Math.random().toString()}
                renderItem={({ item, index }) => (
                    <View
                        key={index}
                        style={{
                            width: '100%',
                            height: 'auto',
                            justifyContent: 'flex-start',
                            flexDirection: 'row',
                            marginVertical: 5,
                            borderBottomColor: '#DADADA',
                            borderBottomWidth: 1,
                            marginBottom: 10,
                            paddingBottom: 10,
                        }}
                    >
                        <View style={{ width: '10%', marginVertical: 4 }}>
                            <MusicIcon />
                        </View>
                        <View style={{ alignItems: 'flex-start', gap: 2, width: '70%' }}>
                            <Text
                                numberOfLines={2}
                                style={{
                                    fontFamily: 'Gabarito-VariableFont',
                                    color: '#030370',
                                    fontSize: Metrics.rfv(16),
                                }}
                            >
                                {item.title || item.id}
                            </Text>
                            <Text>{item.type}</Text>
                        </View>
                        <View style={{ justifyContent: 'flex-end', gap: 2, flexDirection: 'row', alignItems: 'center', width: '20%' }}>
                            <TouchableOpacity
                                style={{ padding: 10, paddingLeft: 30 }}
                                onPress={() => ClickAction(item, false)}
                            >
                                {item._id === currentTrack?.id && playbackState?.state == "playing" ? <PauseIcon2 /> : <Play_Circle />}
                            </TouchableOpacity>
                            <TouchableOpacity style={{ padding: 1 }} onPress={() => {
                                toast.show("not yet done")
                                // ClickAction(item, true)
                            }}>
                                <DownloadIcon />
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                ListEmptyComponent={
                    !loadingList && (
                        <View style={{ flex: 1, height: Metrics.height, justifyContent: 'center', alignItems: 'center' }}>
                            <NoTrackAvailable />
                            <Text style={{ fontFamily: 'Gabarito-VariableFont', color: 'rgba(3, 3, 112, 1)', fontSize: Metrics.rfv(18), marginTop: 18 }}>
                                No Tracks Available
                            </Text>
                        </View>
                    )
                }
                ListFooterComponent={(
                    <View style={{ height: 200 }}>
                    </View>
                )}
            />
            <FloatingPlayer style={{ bottom: Metrics.rfv(20) }} />
        </View>
    );
};

export default TracksListByCategory;