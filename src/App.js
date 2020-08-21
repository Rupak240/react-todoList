import React from "react";
import "./App.css";
import ListItem from "./ListItem";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

library.add(faTrash);

class App extends React.Component {
  state = {
    items: [],
    currentItem: {
      text: "",
      key: "",
    },
  };

  handleInput = (e) => {
    this.setState({ currentItem: { text: e.target.value, key: Date.now() } });
  };

  addItem = (e) => {
    e.preventDefault();
    const newItem = this.state.currentItem;
    console.log(newItem);

    if (newItem.text !== "") {
      const items = [...this.state.items, newItem];
      this.setState({
        items: items,
        currentItem: {
          text: "",
          key: "",
        },
      });
    }
  };

  deleteItem = (key) => {
    const filterItems = this.state.items.filter((item) => item.key !== key);
    this.setState({ items: filterItems });
  };

  updateList = (text, key) => {
    const items = this.state.items;
    // eslint-disable-next-line
    items.map((item) => {
      if (item.key === key) {
        item.text = text;
      }
    });
    this.setState({ items: items });
  };

  render() {
    return (
      <div className="App">
        <header>
          <form id="to-do-form" onSubmit={this.addItem}>
            <input
              type="text"
              placeholder="Enter Text"
              value={this.state.currentItem.text}
              onChange={this.handleInput}
            />
            <button type="submit">Add</button>
          </form>
        </header>
        <ListItem
          items={this.state.items}
          deleteItem={this.deleteItem}
          updateList={this.updateList}
        />
      </div>
    );
  }
}

export default App;
