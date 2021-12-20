import {Component, EventEmitter, Input, OnInit, Output, OnChanges, SimpleChanges, OnDestroy} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit, OnDestroy {

  total_pages: number;
  do_not_load = false;
  @Input() queryParams: any;
  @Input() dbType: string;
  @Input() current_page: number;
  @Input() next_key: number;
  @Input() page_size: number;
  @Input() url: string;
  @Input() changes: any;
  @Output() result = new EventEmitter();
  @Output() displayPage = new EventEmitter();


  constructor(
    private http: HttpClient,
    private toast: ToastrService
    ) { }

  ngOnInit() {
    this.changes.subscribe((data) => {
      this.queryParams = data;
      this.page(1);
    });
    if (! this.url ) {
      console.error('Url is required to fetch the data');
      return ;
    }

  }

  page(page: number) {
    // tslint:disable-next-line:variable-name
    let page_size = this.queryParams.find(x => x.key === 'limit').value;
    const offset = (page - 1) * page_size;
    let customURL =  '';
    this.queryParams.forEach((element, index) => {
      customURL = customURL + `${element.key}=${element.value}&`;
    });
    customURL = `${this.url}?${customURL}`;
    if (this.dbType === 'mongo'){
        if (this.next_key) {
          customURL = `${customURL}key=${this.next_key}`;
        }
    } else{
        customURL = `${customURL}offset=${offset}`;
    }
    this.http.get(customURL)
      .subscribe((response: any) => {
          this.result.emit(response);
          if (response.next_key){
            this.displayPage.emit({next_key: response.next_key});
          } else {
            this.displayPage.emit({currentPage: this.current_page, offset: offset});
          }
          this.current_page = page;
          if (response.count !== undefined) {
            this.total_pages = Math.ceil((response.count) / (page_size));
          }
          if (response.total !== undefined) {
            this.total_pages = Math.ceil((response.total) / (page_size));
          }
      }, error => {
        this.toast.error(error.message);
        console.error('error from fetching page, ${page}');
    });
  }

  ngOnDestroy() {
    // this.changes.unsubscribe();
  }
}
