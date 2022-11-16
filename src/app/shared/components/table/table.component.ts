import {Component, EventEmitter, Input, OnInit, Output, TemplateRef} from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @Input() dataTable: any;
  @Input() columns: any;
  @Output() action =  new EventEmitter<any>();
  @Input() actionTemplate: TemplateRef<any>;
  @Input() rowTemplate: TemplateRef<any>;
  actions = [
    {
      id: 'edit',
      icon: '',
    },
    {
      id: 'delete',
      icon: ''
    }
  ];
  displayActions: any;
  constructor() {
  }

  ngOnInit(): void {
    this.getActionTable();
  }

  getActionTable(){
    this.displayActions = this.columns?.find((col: any) => col.field === 'actions')?.actions?.map((act: any) => {
        return this.actions.find((a) => a.id === act);
      });
  }

  emitAction(id: any, item: any) {
    const data = {
      type: id,
      data: item
    }
    this.action.emit(data)
  }
  calcColumnWidth(column: any): any {
    const totalFlex = this.columns?.reduce((total: any, col: any) => (col.flex ?? 1) + total, 0);
    // return (column.flex ?? 1) * 100 / totalFlex + '%'
    return (column.flex ?? 1) / totalFlex + '%';
  }
}
