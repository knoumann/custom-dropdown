import React, { useState } from "react";
import {
  Image,
  ImageStyle,
  Pressable,
  ScrollView,
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
}

interface DropDownComponentProps {
  data: Item[];
  placeholder: string;
  dropIconUri: string;
  scrollEnabled: boolean;
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
  innerContentContainerStyle?: ViewStyle;
  listStyle?: ViewStyle;
  listTextStyle?: TextStyle;
  cardContainerStyle?: ViewStyle;
  cardStyle?: ViewStyle;
  cardTextStyle?: TextStyle;
  cardIconView?: ViewStyle;
  cardIconStyle?: ImageStyle;
}

const DropDownComponent: React.FC<DropDownComponentProps> = ({
  data,
  style,
  containerStyle,
  iconStyle,
  innerContainerStyle,
  innerContentContainerStyle,
  listStyle,
  listTextStyle,
  placeholder,
  placeholderStyle,
  dropIconUri,
  dropIconResizeMode,
  dropDownIcon,
  scrollEnabled,
  cardContainerStyle,
  cardStyle,
  cardTextStyle,
  cardIcon,
  cardIconUri,
  cardIconResizeMode,
  cardIconView,
  cardIconStyle,
}) => {
  const [items, setItems] = useState<Item[]>([]);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const [rotationAngle, setRotationAngle] = useState(0);

  const handleToggleOptions = () => {
    !dropDownIcon && !dropIconUri && setRotationAngle(rotationAngle + 180); // Rotate by 90 degrees on each click
    setShowOptions(!showOptions);
  };

  const handleOptionSelect = (item: Item) => {
    setSelectedItem(item);
    if (
      !items.find((existingItem) => existingItem?.name === item?.name) ||
      !items.find((existingItem) => existingItem?.title === item?.title)
    ) {
      setItems([...items, item]);
    }
    setShowOptions(false);
  };

  const handleRemoveItem = (index: number) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    setItems(updatedItems);
  };

  return (
    <View style={[styles.container, style]}>
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

      {showOptions && (
        <ScrollView
          scrollEnabled={scrollEnabled ?? true}
          style={[styles.innerContainerStyle, innerContainerStyle]}
          contentContainerStyle={innerContentContainerStyle}
        >
          {data &&
            data?.map((item) => {
              return (
                <TouchableOpacity
                  onPress={() => handleOptionSelect(item)}
                  style={[styles.listStyle, listStyle]}
                  key={Math.random() * 2}
                >
                  <Text style={[styles.listTextStyle, listTextStyle]}>
                    {item?.name ? item?.name : item?.title}
                  </Text>
                </TouchableOpacity>
              );
            })}
        </ScrollView>
      )}

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
    </View>
  );
};

const styles = StyleSheet.create({
  container: { paddingHorizontal: 10 },
  containerStyle: {
    borderWidth: 0.5,
    padding: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 8,
    borderColor: "grey",
  },
  innerContainerStyle: {
    borderWidth: 0.5,
    zIndex: 1,
    borderRadius: 8,
    overflow: "hidden",
    marginTop: 4,
    borderColor: "grey",
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
