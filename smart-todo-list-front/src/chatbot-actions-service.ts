// We will create a class to handle the flow control of the chat bot.
// We will handle the flow when user wants to display a list of elements, then the chat bot will send an action "FETCH_LIST" to the server, with the list of parameters to filter the list.


export class ChatBotFlowControlService {

  catchAction(action: string, params: any) {
    switch (action) {
      case "FETCH_LIST":
        return this.fetchList(params);
      default:
        return this.defaultAction();
    }
  }
}