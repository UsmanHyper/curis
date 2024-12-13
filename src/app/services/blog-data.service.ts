import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BlogDataService {

  blogData: any

  constructor() {
    this.blogData = [
      {
        author_name: "Shayan Beg", blog_date: "05 Dec 2024", blog_title: "Revolutionizing U.S. Healthcare: Why Comprehensive Direct Primary Care is the Future",
        description: "Explore how Direct Primary Care (DPC) is transforming U.S. healthcare by offering affordable, patient-centered care and addressing systemic inefficiencies through a comprehensive approach.",
        tags: ["Direct Primary Care", "Healthcare Innovation", "Patient-Centered Care"], image: '../../../assets/images/blog/blog1.webp', slug: "revolutionizing-us-healthcare-comprehensive-direct-primary-care-future"
      },
      {
        author_name: "John Doe", blog_date: "05 Dec 2024", blog_title: "Why Accessible Healthcare is Essential for Health Equity and Well-being: An Opinion",
        description: "Accessible healthcare ensures that every individual, regardless of their background, can lead a healthy and fulfilling life. Explore how addressing barriers and promoting health equity can create stronger, healthier communities.",
        tags: ["Accessible Healthcare", "Health Equity", "Healthcare Reform"], image: '../../../assets/images/blog/blog2.webp', slug: "accessible-healthcare-health-equity-wellbeing-opinion"
      },

    ]
  }

  getBlogs() {
    return this.blogData
  }
}
