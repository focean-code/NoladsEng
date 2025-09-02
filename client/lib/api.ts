// Re-export the Supabase API client as the main API
export { api } from "./supabase-api";

// Export types for convenience
export type {
  ApiResponse,
  User,
  CreateUser,
  Service,
  CreateService,
  Product,
  CreateProduct,
  Quote,
  CreateQuote,
  QuoteWithDetails,
  ContactMessage,
  CreateContactMessage,
  Image,
  CreateImage,
  Testimonial,
  CreateTestimonial,
  QuoteStatistics,
  ContactStatistics,
  StorageStatistics,
  TestimonialStatistics,
  AuthResponse,
  LoginCredentials,
  CompanyInfo,
  CompanyContacts,
  CompanyStats,
  CompanyRegistration,
  BlogPost,
  CreateBlogPost,
} from "@shared/api";
