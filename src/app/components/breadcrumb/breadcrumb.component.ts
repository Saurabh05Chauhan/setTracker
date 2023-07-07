import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { Breadcrumb } from '../../model/breadcrumb.model';
import { BreadcrumbService } from '../../Services/breadcrumb.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
})
export class BreadcrumbComponent {
  breadcrumbs$: Observable<Breadcrumb[]>;

  constructor(private readonly breadcrumbService: BreadcrumbService,private router:Router) {
    this.breadcrumbs$ = this.breadcrumbService.breadcrumbs$;
  }

  route(url:string){
    if(url=='Exercise'){
      this.router.navigate(['/exercises'])
    }

    if(url=='Home'){
      this.router.navigate([''])
    }

  }
}
