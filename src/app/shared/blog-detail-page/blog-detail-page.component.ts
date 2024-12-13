import { Component, OnInit } from '@angular/core';
import { CommonModule, ViewportScroller } from '@angular/common';
import { LinksComponent } from '../links/links.component';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { BlogDetailedDataService } from 'src/app/services/blog-detailed-data.service';

@Component({
  selector: 'app-blog-detail-page',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, FooterComponent, LinksComponent],
  templateUrl: './blog-detail-page.component.html',
  styleUrls: ['./blog-detail-page.component.scss']
})
export class BlogDetailPageComponent implements OnInit {

  dataSource: any;


  constructor(private router: Router, private BlogDetailedDataService: BlogDetailedDataService, private viewportScroller: ViewportScroller, private route: ActivatedRoute) {


  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const paramData = params.get('slug');
      this.getBlogDetail(paramData)
    });
  }

  getBlogDetail(slug: any): void {
    this.dataSource = this.BlogDetailedDataService.getBlogBySlug(slug)

    console.log("BlogDetail", this.dataSource);
  }

}
