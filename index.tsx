import React, { useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  ImageStyle,
  LayoutChangeEvent,
  Pressable,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

interface Item {
  name?: string;
  title?: string;
  value?: string;
}

interface DropDownComponentProps {
  data: Item[];
  placeholder: string;
  dropIconUri: string;
  dropDownIcon?: React.ReactNode;
  cardIcon?: React.ReactNode;
  cardIconUri?: string;
  cardIconResizeMode?:
    | "cover"
    | "contain"
    | "stretch"
    | "repeat"
    | "center"
    | undefined;
  dropIconResizeMode?:
    | "cover"
    | "contain"
    | "stretch"
    | "repeat"
    | "center"
    | undefined;
  style?: ViewStyle;
  containerStyle?: ViewStyle;
  placeholderStyle?: TextStyle;
  iconStyle?: ImageStyle;
  innerContainerStyle?: ViewStyle;
  listStyle?: ViewStyle;
  listTextStyle?: TextStyle;
  cardContainerStyle?: ViewStyle;
  cardStyle?: ViewStyle;
  cardTextStyle?: TextStyle;
  cardIconView?: ViewStyle;
  cardIconStyle?: ImageStyle;
  isInverted?: boolean;
  isOverLay?: boolean;
  singleSelection?: boolean;
  selectedItem: any[];
  setSelectedItem: (items: any[]) => void;
}

const DropDownComponent: React.FC<DropDownComponentProps> = ({
  data,
  style,
  containerStyle,
  iconStyle,
  innerContainerStyle,
  listStyle,
  listTextStyle,
  placeholder,
  placeholderStyle,
  dropIconUri,
  dropIconResizeMode,
  dropDownIcon,
  cardContainerStyle,
  cardStyle,
  cardTextStyle,
  cardIcon,
  cardIconUri,
  cardIconResizeMode,
  cardIconView,
  cardIconStyle,
  isInverted,
  isOverLay = true,
  singleSelection,
  selectedItem,
  setSelectedItem,
}) => {
  const [items, setItems] = useState<Item[]>([]);
  const [showOptions2, setShowOptions2] = useState<boolean>(false);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [showOptions, setShowOptions] = useState<boolean>(false);

  const handleToggleOptions = () => {
    setRotationAngle(rotationAngle + 180); // Rotate by 90 degrees on each click
    setShowOptions(!showOptions);
  };

  const handleOptionSelect = (item: Item | any) => {
    if (singleSelection) {
      setItems(item);
      setSelectedItem(item);
    } else {
      setSelectedItem(item);
      if (
        !items.find((existingItem) => existingItem?.name === item?.name) ||
        !items.find((existingItem) => existingItem?.title === item?.title)
      ) {
        setItems([...items, item]);
      }
    }
    setShowOptions(false);
    setShowOptions2(false);
  };

  const handleRemoveItem = (index: number) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    setItems(updatedItems);
  };

  const onLayout = (e: LayoutChangeEvent) => {
    const { y } = e.nativeEvent.layout || {};
    const windowHeight = Dimensions.get("window").height;
    const halfWindowHeight = windowHeight / 2;
    const oneThirdWindowHeight = halfWindowHeight / 2;

    if (y > halfWindowHeight) {
      setShowOptions2(true);
    }
    if (y < halfWindowHeight && y < oneThirdWindowHeight) {
      setShowOptions2(false);
    }
  };

  const renderListFn = (isOverLay?: boolean | undefined) => {
    return (
      <View
        style={[
          styles.innerContainerStyle,
          innerContainerStyle,
          isOverLay && styles.overlay,
        ]}
      >
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => handleOptionSelect(item)}
              style={[styles.listStyle, listStyle]}
              key={Math.random() * 2}
            >
              <Text style={[styles.listTextStyle, listTextStyle]}>
                {item?.name ? item?.name : item?.title}
              </Text>
            </TouchableOpacity>
          )}
          inverted={isInverted}
        />
      </View>
    );
  };

  return (
    <View style={[styles.container, style]} onLayout={onLayout}>
      {showOptions && showOptions2 && renderListFn((isOverLay = false))}
      <>
        <Pressable
          onPress={handleToggleOptions}
          style={[styles.containerStyle, containerStyle]}
        >
          <Text style={[styles.placeholderStyle, placeholderStyle]}>
            {selectedItem
              ? selectedItem.name ?? selectedItem.title
              : placeholder ?? "placeholder text here.."}
          </Text>

          {dropDownIcon ?? (
            <Image
              source={
                dropIconUri
                  ? { uri: dropIconUri }
                  : require("./assets/images/icon-down.png")
              }
              resizeMode={dropIconResizeMode ?? "contain"}
              style={[
                styles.iconStyle,
                iconStyle,
                { transform: [{ rotate: `${rotationAngle}deg` }] },
              ]}
            />
          )}
        </Pressable>
      </>

      {showOptions && !showOptions2 && renderListFn(isOverLay)}

      {singleSelection ? (
        <></>
      ) : (
        <View style={[styles.cardContainerStyle, cardContainerStyle]}>
          {items?.map((item, index) => {
            return (
              <View key={index} style={[styles.cardStyle, cardStyle]}>
                <Text style={[styles.cardTextStyle, cardTextStyle]}>
                  {item?.name ? item?.name : item?.title}
                </Text>
                <TouchableOpacity
                  onPress={() => handleRemoveItem(index)}
                  style={[styles.cardIconView, cardIconView]}
                >
                  {cardIcon ?? (
                    <Image
                      source={
                        cardIconUri
                          ? { uri: cardIconUri }
                          : require("./assets/images/icon-cross.png")
                      }
                      resizeMode={cardIconResizeMode ?? "contain"}
                      style={[styles.cardIconStyle, cardIconStyle]}
                    />
                  )}
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingBottom: 10,
    position: "relative",
    zIndex: 1,
  },
  containerStyle: {
    borderWidth: 0.5,
    padding: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 8,
    borderColor: "grey",
    paddingHorizontal: 10,
  },
  innerContainerStyle: {
    borderWidth: 0.5,
    zIndex: 1,
    borderRadius: 8,
    overflow: "hidden",
    marginVertical: 4,
    borderColor: "grey",
    backgroundColor: "white",
    maxHeight: 250,
  },
  overlay: {
    top: "100%",
    position: "absolute",
    left: 0,
    right: 0,
    marginHorizontal: 10,
  },
  listStyle: {
    paddingHorizontal: 8,
    paddingVertical: 5,
  },
  cardStyle: {
    backgroundColor: "#e5d3ed",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 5,
    paddingHorizontal: 8,
    paddingVertical: 3,
    margin: 5,
  },
  cardContainerStyle: { flexDirection: "row", flexWrap: "wrap", paddingTop: 2 },
  cardIconView: { marginLeft: 5 },
  iconStyle: { height: 12, width: 12 },
  cardIconStyle: { height: 12, width: 12 },
  cardTextStyle: { color: "#000", fontFamily: "Courier New" },
  listTextStyle: { fontFamily: "Courier New" },
  placeholderStyle: { color: "grey" },
});

export default DropDownComponent;
