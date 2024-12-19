import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BlogDataService {

  blogData: any

  constructor() {
    this.blogData = [
      {
        author_name: "Shayan Beg", blog_date: "05 Sept 2024", blog_title: "Revolutionizing U.S. Healthcare: Why Comprehensive Direct Primary Care is the Future",
        description: "Explore how Direct Primary Care (DPC) is transforming U.S. healthcare by offering affordable, patient-centered care and addressing systemic inefficiencies through a comprehensive approach.",
        tags: ["Direct Primary Care", "Healthcare Innovation", "Patient-Centered Care"], image: '../../../assets/images/blog/blog1.webp', slug: "revolutionizing-us-healthcare-comprehensive-direct-primary-care-future"
      },
      {
        author_name: "John Doe", blog_date: "15 Sept 2024", blog_title: "Why Accessible Healthcare is Essential for Health Equity and Well-being: An Opinion",
        description: "Accessible healthcare ensures that every individual, regardless of their background, can lead a healthy and fulfilling life. Explore how addressing barriers and promoting health equity can create stronger, healthier communities.",
        tags: ["Accessible Healthcare", "Health Equity", "Healthcare Reform"], image: '../../../assets/images/blog/blog2.webp', slug: "accessible-healthcare-health-equity-wellbeing-opinion"
      },

      {
        author_name: "Shayan Beg",
        blog_date: "20 Sept 2024",
        blog_title: "Why Transparency in Healthcare Payments Builds Patient Trust",
        description: "In healthcare, trust is the cornerstone of every patient-provider relationship. This blog explores why financial transparency is crucial in healthcare and how it fosters a deeper sense of trust between patients and providers.",
        tags: ["Healthcare Payments", "Transparency", "Patient Trust"],
        image: "../../../assets/images/blog/Blog-3.webp",
        slug: "why-transparency-healthcare-payments-builds-patient-trust"
      },
      {
        author_name: "Your Author Name",
        blog_date: "1 Oct 2024",
        blog_title: "Revolutionizing Healthcare Payments with Escrow Accounts",
        description: "Managing payments for long-term medical treatments can be challenging. This blog explores how escrow accounts offer security, transparency, and trust in healthcare payments.",
        tags: ["Healthcare Payments", "Escrow Accounts", "Patient-Centered Solutions"],
        image: "../../../assets/images/blog/Blog-4.webp",
        slug: "revolutionizing-healthcare-payments-escrow-accounts"
      },
      {
        author_name: "Shayan Beg",
        blog_date: "14 Oct 2024",
        blog_title: "Debunking Healthcare Payment Myths: Understanding the Realities",
        description: "Healthcare payments are often shrouded in misconceptions. This blog debunks the top five myths about healthcare payments and provides the facts to help you navigate the system more confidently.",
        tags: ["Healthcare Payments", "Financial Tips", "Medical Bills"],
        image: "../../../assets/images/blog/Blog-5.webp",
        slug: "debunking-healthcare-payment-myths-understanding-realities"
      },
      {
        author_name: "Shayan Beg",
        blog_date: "23 Oct 2024",
        blog_title: "The Importance of Financial Literacy in Healthcare",
        description: "Navigating healthcare bills can feel overwhelming. This blog emphasizes the critical role of financial literacy in helping patients manage healthcare expenses effectively.",
        tags: ["Healthcare Financial Literacy", "Medical Bills", "Financial Management"],
        image: "../../../assets/images/blog/Blog-6.webp",
        slug: "importance-of-financial-literacy-in-healthcare"
      },
      {
        author_name: "Shayan Beg",
        blog_date: "6 Nov 2024",
        blog_title: "Managing Healthcare Costs with High-Deductible Health Plans (HDHPs)",
        tags: ["Healthcare Costs", "HDHP", "Financial Assistance", "CurisNow"],
        image: "../../../assets/images/blog/Blog-7.webp",
        slug: "managing-healthcare-costs-with-high-deductible-health-plans"
      },
      {
        author_name: "Shayan Beg",
        blog_date: "18 Nov 2024",
        blog_title: "The Importance of Financial Literacy in Healthcare",
        description: "",
        tags: ["Healthcare Financial Literacy", "Medical Bills", "Financial Management"],
        image: "../../../assets/images/blog/Blog-8.webp",
        slug: "importance-of-financial-literacy-in-healthcare"
      },
      {
        author_name: "Shayan Beg",
        blog_date: "25 Nov 2024",
        blog_title: "Making Preventive Care Accessible for Everyone with CurisNow",
        description: "Preventive care is the foundation of a healthier life, and CurisNow makes it accessible and affordable for everyone—even without insurance. By providing transparent pricing, flexible payments, and access to a variety of specialties, CurisNow empowers patients to prioritize their health and well-being.",
        tags: ["Preventive Care", "Healthcare Access", "CurisNow"],
        image: "../../../assets/images/blog/Blog-9.webp",
        slug: "preventive-care-access-with-curisnow"
      },
      {
        author_name: "Shayan Beg",
        blog_date: "1 Dec 2024",
        blog_title: "2025 Trends in Healthcare Payments: What Providers and Patients Should Expect",
        description: "The healthcare sector is rapidly embracing digital payment solutions, offering faster and more convenient transactions for both providers and patients.",
        tags: ["Healthcare Payments", "Digital Payment Solutions", "Healthcare Trends"],
        image: "../../../assets/images/blog/Blog-10.webp",
        slug: "2025-trends-in-healthcare-payments"
      }
      ,
      {
        author_name: "Shayan Beg",
        blog_date: "7 Dec 2024",
        blog_title: "Pay-for-Care Service Models: Understanding How They Work and Why They Matter",
        description: "The traditional healthcare payment system has often left patients and providers frustrated with unclear pricing, administrative hurdles, and delayed reimbursements. Pay-for-Care Service Models are emerging as a simplified and transparent alternative, offering patients better access to quality care while reducing the financial and administrative strain on providers. In this blog, we’ll break down what Pay-for-Care models are, their benefits, and how they are revolutionizing the way healthcare is delivered and paid for.",
        tags: ["Healthcare Payments", "Pay-for-Care Models", "Healthcare Trends"],
        image: "../../../assets/images/blog/Blog-11.webp",
        slug: "pay-for-care-service-models"
      },
      {
        author_name: "Shayan Beg",
        blog_date: "12 Dec 2024",
        blog_title: "How Pay-for-Service Providers Can Attract More Patients: Strategies That Work",
        description: "The pay-for-service healthcare model is transforming how patients access care, offering flexibility, transparency, and affordability. For providers, attracting patients to pay upfront or out-of-pocket requires innovative strategies like transparent pricing, promotions, and bundled services to stand out in a competitive market.",
        tags: ["Pay-for-Service Providers", "Healthcare Marketing", "Patient Attraction", "Healthcare Trends"],
        image: "../../../assets/images/blog/Blog-12.webp",
        slug: "how-pay-for-service-providers-can-attract-more-patients"
      },
      {
        author_name: "Shayan Beg",
        blog_date: "18 Dec 2024",
        blog_title: "Americans’ Challenges with Healthcare Costs: A Closer Look and How to Navigate Them",
        description: "The rising cost of healthcare remains a burden for millions of Americans, causing delays in treatments, skipped prescriptions, and financial strain. For many, medical bills are not just numbers on paper—they're tough decisions between receiving care and paying for basic needs like food, rent, or childcare.",
        tags: ["Healthcare Costs", "Medical Debt", "Healthcare Solutions"],
        image: "../../../assets/images/blog/Blog-13.webp",
        slug: "americans-challenges-with-healthcare-costs"
      }





    ]
  }

  getBlogs() {
    return this.blogData
  }
}
