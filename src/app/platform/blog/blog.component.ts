import { Component, OnInit } from '@angular/core';
import { CommonModule, ViewportScroller } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { FooterComponent } from 'src/app/shared/footer/footer.component';
import { HeaderComponent } from 'src/app/shared/header/header.component';
import { BlogDataService } from 'src/app/services/blog-data.service';
import { PaginationComponent } from "../../shared/pagination/pagination.component";

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, FooterComponent, FormsModule, PaginationComponent],
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})


export class BlogComponent implements OnInit {

  blogInfo: any;
  pagedItems: any;
  totalPages: any = 10;
  itemsPerPage: any = 6;
  currentPage: number = 1;
  totalItems: number = 0;
  recentData: any;
  constructor(private router: Router, private BlogDataService: BlogDataService, private viewportScroller: ViewportScroller,) {


  }

  ngOnInit(): void {

    this.blogInfo = this.BlogDataService.getBlogs();
    
    setTimeout(() => {
      this.calculatePages();
      this.setPage(this.currentPage);
    }, 2000);
  }


  onPageChange(page: number): void {
    this.currentPage = page;
    this.setPage(page)
    // Update paged items or fetch new data based on the page
  }

  calculatePages(): void {
    if (this.blogInfo?.length > 0) {
      this.totalPages = Math.ceil(this.blogInfo.length / this.itemsPerPage);
    }
  }

  setPage(page: number): void {
    this.currentPage = page;
    const startIndex = (page - 1) * this.itemsPerPage;
    const endIndex = Math.min(startIndex + this.itemsPerPage, this.blogInfo?.length);
    this.pagedItems = this.blogInfo?.slice(startIndex, endIndex);
    this.viewportScroller.scrollToPosition([0, 0]);
    console.log("this", this.pagedItems)


  }



}
