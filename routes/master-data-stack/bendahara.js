import MasterData from "../../components/screen/master-data/MasterData";
import EventKas from "../../components/screen/master-data/kas/EventKas";
import FormEventKas from "../../components/screen/master-data/kas/FormEventKas";
import DataUsman from "../../components/screen/master-data/data-usman/DataUsman";
import DetailUsman from "../../components/screen/master-data/data-usman/DetailUsman";

const bendahara = [
  { name: "MasterDataList", component: MasterData },
  { name: "EventKas", component: EventKas },
  { name: "FormEventKas", component: FormEventKas },
  { name: "DataUsman", component: DataUsman },
  { name: "DetailUsman", component: DetailUsman },
];

export default bendahara;
