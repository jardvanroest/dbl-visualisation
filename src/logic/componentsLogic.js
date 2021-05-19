import { mapGetters } from "vuex";


export function tooltipInformationParser(pointerObject) {
  let sender = mapGetters.pointerObject["fromId"];
  //let idReceiver = data[pointer["dataIndex"]]["toId"];
  //return {
  //  sender: data[idSender]["Email"],
  //  receiver: data[idReceiver]["Email"],
  //};
}
