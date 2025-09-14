import { FlatList, StyleSheet, View, Dimensions, Image,Animated } from "react-native";
import React, { useEffect, useRef, useState } from "react";

const { width } = Dimensions.get("window");
const images = [
  {
    id: "1",
    title: "Slide 1",
    img: "https://media.istockphoto.com/id/1415551661/photo/receiving-a-delivery-from-the-mailman-stock-photo.webp?a=1&b=1&s=612x612&w=0&k=20&c=ytYhiEqktioryio5T657t2ncDN8bkjZRqvxfaURDcig=",
  },
  {
    id: "2",
    title: "Slide 2",
    img: "https://media.istockphoto.com/id/1369503096/photo/unsatisfied-customer-returning-order-to-delivery-boy-at-home-concept-of-hassel-free-product.webp?a=1&b=1&s=612x612&w=0&k=20&c=9Gxg0IzOR4Bf4__7iAXRKfFtguiMtzz8WMOfnxZgLxM=",
  },
  {
    id: "3",
    title: "Slide 3",
    img: "https://media.istockphoto.com/id/2204300725/photo/portrait-of-delivery-person-wearing-uniform-stock-photo.webp?a=1&b=1&s=612x612&w=0&k=20&c=i_-JLb-6RxQWdwFIldNkhXPS8hB4-0Z_XbO6eFjfFAQ=",
  },
];

const Curousel = ({ styleImg, styleContainer }) => {
    const scrollX=useRef(new Animated.Value(0)).current
    const flatListRef = useRef(null)
    const [currentInd,setCurrentInd] = useState(0);

    useEffect(()=>{
        const interval = setInterval(()=>{
            let nextInd = (currentInd+1) % images.length;
            setCurrentInd(nextInd);

            flatListRef.current?.scrollToIndex({
                index:nextInd,
                animated:true
            })
        },3000);
        return ()=>clearInterval(interval);
    },[currentInd])
  return (
    <View style={[styles.container, styleContainer]}>
      <Animated.FlatList
        data={images}
        ref={flatListRef}
        keyExtractor={(item, ind) => ind.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={true}
        snapToAlignment="center"
        decelerationRate="fast"
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        renderItem={({ item }) => (
          <View style={styles.imgContainer}>
            <Image
              source={{ uri: item.img }}
              style={[styles.image, styleImg]}
            />
          </View>
        )}
      />

      <View style={styles.dotsContainer}>
        {images.map((_, index) => {
          const inputRange = [
            (index - 1) * width,
            index * width,
            (index + 1) * width,
          ];

          const dotWidth = scrollX.interpolate({
            inputRange,
            outputRange: [8, 16, 8], // middle dot bigger
            extrapolate: "clamp",
          });

          const dotOpacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.3, 1, 0.3], // fade effect
            extrapolate: "clamp",
          });

          return (
            <Animated.View
              key={index}
              style={[
                styles.dot,
                { width: dotWidth, opacity: dotOpacity },
              ]}
            />
          );
        })}
      </View>
    </View>
  );
};

export default Curousel;

const styles = StyleSheet.create({
  container: {
  },
  image: {
    width: width - 40,
    borderRadius: 5,
    height: 200,
    resizeMode: "cover",
  },
  imgContainer: {
    width: width - 40,
  },
  dotsContainer: {
    flexDirection: "row",
    position: "absolute",
    bottom: -15,
  },
  dot: {
    height: 8,
    borderRadius: 4,
    backgroundColor: "#333",
    marginHorizontal: 4,
  },
});

