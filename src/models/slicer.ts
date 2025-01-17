export class Slicer implements ISlicer {
  constructor(init?: Partial<ISlicer>) {
    this.title = "";
    this.active = false;
    this.collapse = true;
    //this.type = "input";
    this.data = "";

    if (init) Object.assign(this, init);
  }
  title: string;
  active: boolean;
  collapse: boolean;
  //type: SlicerType;
  data: string | ISlicerData[];
}

export class SlicerData implements ISlicerData {
  constructor(init?: Partial<ISlicerData>) {
    this.text = "";
    this.value = "";
    this.selected = false;

    if (init) Object.assign(this, init);
  }
  text: string;
  value: string;
  selected: boolean;
}