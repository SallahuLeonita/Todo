import { Controller, History, Url } from "cx/ui";
import { Toast } from "cx/widgets";

export default class extends Controller {
  init() {
    super.init();
    var items = this.store.get("$page.todos");
    // Reset the list to default data if it's empty
    if (!items || !items.length) {
      items = [
        {
          id: 1,
          text: "Get Cx boilerplate app",
          done: true
        },
        {
          id: 2,
          text: "Learn Cx"
        },
        {
          id: 3,
          text: "Chose a CSS class prefix"
        },
        {
          id: 4,
          text: "Tweak the layout if needed"
        },
        {
          id: 5,
          text: "Create an application"
        }
      ];
      this.store.set("$page.todos", items);
    }
    var input = document.getElementById("myInput");
  }

  onAdd() {
    var items = this.store.get("$page.todos");

    //get the text entered by user
    var item = this.store.get("$page.text");

    //Add on a array the todos that already exists
    var arrayText = [];
    for (let i = 0; i < items.length; i++) {
      arrayText.push(items[i].text);
    }

    //create a function that will show a toast message
    function createToast(messageToShow, placement, modToShow = null) {
        let toast = Toast.create({
          message: messageToShow,
          placement: placement,
          timeout: 2000,
          mod: modToShow
        });
        toast.open();
    }

    //Check if there is already a todo with the same text, if yes then show a toast message...
    var doesExists = false;
    for (let x of arrayText) {
      if (item.toLowerCase().trim() == x.toLowerCase().trim()) {
        doesExists = true;
        createToast("Todo already exists", "top", "error");
      }
    }

    //if the todo entered by user does not exists then add on the list and show a toast message
    if (doesExists === false) {
      var id = items.reduce((acc, item) => Math.max(acc, item.id), 0) + 1;
      items = items.concat({
        id: id,
        text: this.store.get("$page.text") || `Untitled (${id})`,
        done: false
        
      });

      this.store.set("$page.todos", items);
      this.store.set("$page.text", null);

    //show a tost message that new todo has been added
     createToast("Added new Todo", "top", "success");
    }
  }

  onRemove(e, { store }) {
    e.preventDefault();
    var id = store.get("$record.id");
    var items = this.store.get("$page.todos");
    this.store.set("$page.todos", items.filter(item => item.id !== id));
  }

  //Click add button when Enter key is pressed
  onEnter() {
   // var input = document.getElementById("addToDo");
    if (event.keyCode == 13) {
      event.preventDefault();
      document.getElementById("myBtn").click();
    } 
  }
}
