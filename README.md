# native-dropdown-widget

React Native Dropown Widget is a library which have the capability to provides a variety of options to customize the dropdown to match the design and functionality of your application.

[<img src="https://github.com/knoumann/custom-dropdown/blob/main/assets/images/sample-1.jpg">]

[<img src="https://github.com/knoumann/custom-dropdown/blob/main/assets/images/sample-2.jpg">]

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
| style                      | Object                 | No        | Style object for the dropdown component.                                   |
| containerStyle             | Object                 | No        | Style object for the dropdown container.                                   |
| iconStyle                  | Object                 | No        | Style object for the dropdown icon.                                        |
| innerContainerStyle        | Object                 | No        | Style object for the inner container of the dropdown.                      |
| innerContentContainerStyle | Object                 | No        | Style object for the inner content container.                              |
| listStyle                  | Object                 | No        | Style object for the dropdown list.                                        |
| listTextStyle              | Object                 | No        | Style object for the text within the dropdown list.                        |
| placeholder                | String                 | No        | Placeholder text when no option is selected.                               |
| placeholderStyle           | Object                 | No        | Style object for the placeholder text.                                     |
| dropIconUri                | String                 | No        | URI for the dropdown icon.                                                 |
| dropIconResizeMode         | String                 | No        | Resize mode for the dropdown icon.                                         |
| dropDownIcon               | Component              | No        | Custom component to be used as the dropdown icon.                          |
| scrollEnabled              | Boolean                | No        | Enable/disable scrolling in the dropdown list.                             |
| cardContainerStyle         | Object                 | No        | Style object for the card container (if used).                             |
| cardStyle                  | Object                 | No        | Style object for the card component (if used).                             |
| cardTextStyle              | Object                 | No        | Style object for the text within the card (if used).                       |
| cardIcon                   | Component              | No        | Custom component to be used as the card icon (if used).                    |
| cardIconUri                | String                 | No        | URI for the card icon (if used).                                           |
| cardIconResizeMode         | String                 | No        | Resize mode for the card icon (if used).                                   |
| cardIconView               | Component              | No        | Custom component to wrap the card icon (if used).                          |
| cardIconStyle              | Object                 | No        | Style object for the card icon (if used).                                  |
| isInverted                 | boolean                | No        | Boolean indicating if the table is inverted.                               |
| isOverLay                  | boolean                | No        | Boolean indicating if the table is overlayed or overlap on behind content. |
| singleSelection            | boolean                | No        | Boolean indicating single selection mode or want only one selection.       |
| selectedItem               | any[]                  | Yes       | Array containing selected items.                                           |
| setSelectedItem            | (items: any[]) => void | Yes       | Function to set selected items.                                            |

## Examples Array - 1

```javascript
const ExpArray = () => [
  { title: "vvlgray", value: 1 },
  { title: "vlgray", value: 2 },
  { title: "lgray", value: 3 },
  { title: "gray", value: 4 },
  { title: "sgray", value: 5 },
  { title: "vsgray", value: 6 },
];
```

## Examples Array - 1

```javascript
[
  { name: "vvlgray", value: 1 },
  { name: "vlgray", value: 2 },
  { name: "lgray", value: 3 },
  { name: "gray", value: 4 },
  { name: "sgray", value: 5 },
  { name: "vsgray", value: 6 },
];
```

## Note

Make sure the structure of array are as mentioned in the example.

- keys name should be consist of 'title' or 'name'
- have the secondary keys as 'value'

## Usage/Examples

```javascript
import DropDownComponent from "native-dropdown-widget";

const [selectedItem, setSelectedItem] = useState(null);

function App() {
  return (
    <DropDownComponent
      data={ExpArray()}
      placeholder={"grey"}
      scrollEnabled={true}
      isOverLay={false}
      selectedItem={selectedItem}
      setSelectedItem={setSelectedItem}
      dropDownIcon={
        <Image
          source={{ uri: "https://reactnative.dev/img/tiny_logo.png" }}
          resizeMode="contain"
          style={{ height: 10, width: 10 }}
        />
      }
    />
  );
}
```
