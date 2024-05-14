import React, { useState, ReactNode } from "react";
import {
  Dimensions,
  FlatList,
  LayoutChangeEvent,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

interface DropDownComponentProps {
  data: string[];
  placeholder: string;
  dropDownIcon?: ReactNode;
  leftIcon?: ReactNode;
  cardIcon?: ReactNode;
  style?: ViewStyle;
  leftIconStyle?: ViewStyle;
  containerStyle?: ViewStyle;
  placeholderStyle?: TextStyle;
  innerContainerStyle?: ViewStyle;
  listStyle?: ViewStyle;
  listTextStyle?: TextStyle;
  cardContainerStyle?: ViewStyle;
  cardStyle?: ViewStyle;
  cardTextStyle?: TextStyle;
  cardIconView?: ViewStyle;
  isInverted?: boolean;
  isOverLay?: boolean;
  singleSelection?: boolean;
  selectedItem: string | null;
  setSelectedItem: (item: string | null) => void;
}
const isIOS = Platform.OS === "ios";

const DropDownComponent: React.FC<DropDownComponentProps> = ({
  data,
  selectedItem,
  setSelectedItem,
  style,
  containerStyle,
  innerContainerStyle,
  listStyle,
  listTextStyle,
  placeholder,
  placeholderStyle,
  dropDownIcon,
  leftIcon,
  leftIconStyle,
  cardContainerStyle,
  cardStyle,
  cardTextStyle,
  cardIcon,
  cardIconView,
  isInverted,
  isOverLay = true,
  singleSelection,
}) => {
  const [items, setItems] = useState<string[]>([]);
  const [showOptions2, setShowOptions2] = useState<boolean>(false);
  const [rotationAngle, setRotationAngle] = useState(90);
  const [showOptions, setShowOptions] = useState<boolean>(false);

  const handleToggleOptions = () => {
    setRotationAngle(rotationAngle + 180); // Rotate by 90 degrees on each click
    setShowOptions(!showOptions);
  };

  const handleOptionSelect = (item: string) => {
    if (singleSelection) {
      setItems([item]);
      setSelectedItem(item);
    } else {
      setSelectedItem(item);
      if (!items.find((existingItem) => existingItem === item)) {
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

  const renderListFn = (isOverLays?: boolean) => {
    return (
      <View
        style={[
          styles.innerContainerStyle,
          innerContainerStyle,
          isOverLays && styles.overlay,
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
              <Text style={[styles.listTextStyle, listTextStyle]}>{item}</Text>
            </TouchableOpacity>
          )}
          inverted={isInverted}
        />
      </View>
    );
  };

  return (
    <View style={[styles.container, style]} onLayout={onLayout}>
      {showOptions && showOptions2 && renderListFn(false)}
      <>
        <Pressable
          onPress={handleToggleOptions}
          style={[styles.containerStyle, containerStyle]}
        >
          {leftIcon ? (
            <View style={styles.leftIconView}>
              <View style={[styles.leftIconStyle, leftIconStyle]}>
                {leftIcon}
              </View>
              <Text
                style={[
                  styles.placeholderStyle,
                  placeholderStyle,
                  { marginLeft: 8 },
                ]}
              >
                {selectedItem
                  ? selectedItem
                  : placeholder ?? "placeholder text here.."}
              </Text>
            </View>
          ) : (
            <Text style={[styles.placeholderStyle, placeholderStyle]}>
              {selectedItem
                ? selectedItem
                : placeholder ?? "placeholder text here.."}
            </Text>
          )}

          {dropDownIcon ?? (
            <Text
              style={[
                { transform: [{ rotate: `${rotationAngle}deg` }] },
                styles.dropIconStyle,
              ]}
            >
              {"❯"}
            </Text>
          )}
        </Pressable>
      </>

      {showOptions && !showOptions2 && renderListFn(isOverLay)}

      {!singleSelection && (
        <View style={[styles.cardContainerStyle, cardContainerStyle]}>
          {items?.map((item, index) => (
            <View key={index} style={[styles.cardStyle, cardStyle]}>
              <Text style={[styles.cardTextStyle, cardTextStyle]}>{item}</Text>
              <TouchableOpacity
                onPress={() => handleRemoveItem(index)}
                style={[styles.cardIconView, cardIconView]}
              >
                {cardIcon ?? <Text style={styles.crossIconStyle}>{"✕"}</Text>}
              </TouchableOpacity>
            </View>
          ))}
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
    backgroundColor: "#f5f0f0",
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
  crossIconStyle: { fontSize: 8, fontWeight: "bold" },
  dropIconStyle: { fontSize: 13, color: "grey" },
  cardIconStyle: { height: 12, width: 12 },
  cardTextStyle: {
    color: "#000",
    fontFamily: isIOS ? "Courier New" : "monospace",
    textTransform: "capitalize",
  },
  listTextStyle: {
    fontFamily: isIOS ? "Courier New" : "monospace",
    textTransform: "capitalize",
  },
  leftIconView: {
    justifyContent: "space-around",
    flexDirection: "row",
  },
  leftIconStyle: { justifyContent: "center" },
  placeholderStyle: { color: "grey", textTransform: "capitalize" },
});

export default DropDownComponent;
