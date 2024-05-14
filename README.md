# native-dropdown-widget

React Native Dropown Widget is a library which have the capability to provides a variety of options to customize the dropdown to match the design and functionality of your application.

![App gif](https://github.com/knoumann/custom-dropdown/blob/main/assets/gif/sample-3.gif)

## Screenshots

<img src="https://github.com/knoumann/custom-dropdown/blob/main/assets/images/sample-1.jpg">

<img src="https://github.com/knoumann/custom-dropdown/blob/main/assets/images/sample-2.jpg">

## Badges

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)

## Features

- Easy to use
- Single or Multiselect option for items
- Responsive for Cross platform
- Have wast option for customization
- Implemented with typescript

```js
Nothing is pleasanter than exploring a library. Give us rate If you like this library :-)
```

## Getting started

```js
npm install native-dropdown-widget --save
```

or

```js
yarn add native-dropdown-widget
```

and voilà!!

### Dropdown Props

| Props                      | Params                 | isRequire | Description                                                                |
| -------------------------- | ---------------------- | --------- | -------------------------------------------------------------------------- |
| data                       | Array                  | Yes       | Plain array containing dropdown options.                                   |
| selectedItem               | any[]                  | Yes       | Array containing selected items.                                           |
| setSelectedItem            | (items: any[]) => void | Yes       | Function to set selected items.                                            |
| style                      | Object                 | No        | Style object for the dropdown component.                                   |
| containerStyle             | Object                 | No        | Style object for the dropdown container.                                   |
| innerContainerStyle        | Object                 | No        | Style object for the inner container of the dropdown.                      |
| innerContentContainerStyle | Object                 | No        | Style object for the inner content container.                              |
| listStyle                  | Object                 | No        | Style object for the dropdown list.                                        |
| listTextStyle              | Object                 | No        | Style object for the text within the dropdown list.                        |
| placeholder                | String                 | No        | Placeholder text when no option is selected.                               |
| placeholderStyle           | Object                 | No        | Style object for the placeholder text.                                     |
| leftIcon                   | string                 | No        | Icon to be displayed on the left side.                                     |
| leftIconStyle              | object                 | No        | Style object for the left icon.                                            |
| dropDownIcon               | Component              | No        | Custom component to be used as the dropdown icon.                          |
| scrollEnabled              | Boolean                | No        | Enable/disable scrolling in the dropdown list.                             |
| cardContainerStyle         | Object                 | No        | Style object for the card container (if used).                             |
| cardStyle                  | Object                 | No        | Style object for the card component (if used).                             |
| cardTextStyle              | Object                 | No        | Style object for the text within the card (if used).                       |
| cardIcon                   | Component              | No        | Custom component to be used as the card icon (if used).                    |
| cardIconView               | Component              | No        | Custom component to wrap the card icon (if used).                          |
| isInverted                 | boolean                | No        | Boolean indicating if the table is inverted.                               |
| isOverLay                  | boolean                | No        | Boolean indicating if the table is overlayed or overlap on behind content. |
| singleSelection            | boolean                | No        | Boolean indicating single selection mode or want only one selection.       |

## Examples Array - 1

```javascript
const ExpArray = () => [
  "vvlgray",
  "vlgray",
  "lgray",
  "gray",
  "sgray",
  "vsgray",
];
```

## Call the library directly or Import by copying this below -

```bash
import DropDownComponent from "native-dropdown-widget";
```

## Usage/Examples 1 - Basic

```javascript
const [selectedItem, setSelectedItem] = useState(null);

function App() {
  return (
    <DropDownComponent
      data={ExpArray()}
      placeholder={"gray"}
      scrollEnabled={true}
      isOverLay={false}
      selectedItem={selectedItem}
      setSelectedItem={setSelectedItem}
      dropDownIcon={<></>}
    />
  );
}
```

## Usage/Examples 2 - Inverted list With Icons

#### (Note - You can use any JSX.Element)

```javascript
const [selectedItem, setSelectedItem] = useState(null);

function App() {
  return (
    <DropDownComponent
      data={ExpArray()}
      placeholder={"gray"}
      scrollEnabled={true}
      isOverLay={false}
      selectedItem={selectedItem}
      setSelectedItem={setSelectedItem}
      leftIcon={<Text>{"❄"}</Text>}
      isInverted
    />
  );
}
```

## Author

- [Nouman khan](https://github.com/knoumann)

## License

[MIT](https://choosealicense.com/licenses/mit/)
