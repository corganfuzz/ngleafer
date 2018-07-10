import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';


@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
export class ChildComponent implements OnInit {

  @Input() public parentData;

  @Output() public childEvent = new EventEmitter();

    //  @Input('parentData') public name;

  constructor() { }

  ngOnInit() {
  }

  fireEvent() {
  this.childEvent.emit('this is from the child to parent')
}

}
