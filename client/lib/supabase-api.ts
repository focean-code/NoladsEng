import { supabase } from './supabase'
import { mockServices, mockProducts, mockCompanyStats } from './mock-data'
import type {
  ApiResponse,
  User, CreateUser,
  Service, CreateService,
  Product, CreateProduct,
  Quote, CreateQuote, QuoteWithDetails,
  ContactMessage, CreateContactMessage,
  Testimonial, CreateTestimonial,
  BlogPost, CreateBlogPost,
  QuoteStatistics,
  ContactStatistics,
  TestimonialStatistics,
  CompanyInfo,
  CompanyStats,
  CompanyContacts,
  CompanyRegistration
} from '@shared/api'

// Helper function to format Supabase responses as ApiResponse
function formatResponse<T>(data: T | null, error: any = null): ApiResponse<T> {
  if (error) {
    return {
      success: false,
      error: error.message || 'An error occurred',
      details: error
    }
  }
  
  return {
    success: true,
    data: data as T
  }
}

class SupabaseApiClient {
  // Services
  services = {
    getAll: async (params?: {
      page?: number;
      limit?: number;
      search?: string;
      category?: string;
      active?: boolean
    }): Promise<ApiResponse<Service[]>> => {
      try {
        let query = supabase.from('services').select('*')

        if (params?.active !== undefined) {
          query = query.eq('is_active', params.active)
        }

        if (params?.category) {
          query = query.eq('category', params.category)
        }

        if (params?.search) {
          query = query.or(`name.ilike.%${params.search}%,description.ilike.%${params.search}%`)
        }

        if (params?.limit) {
          const offset = ((params?.page || 1) - 1) * params.limit
          query = query.range(offset, offset + params.limit - 1)
        }

        const { data, error } = await query.order('created_at', { ascending: false })

        // If table doesn't exist, fall back to mock data
        if (error && error.code === 'PGRST116') {
          console.warn('Services table not found, using mock data. Please run the database schema.')
          let filteredServices = mockServices

          if (params?.active !== undefined) {
            filteredServices = filteredServices.filter(s => s.is_active === params.active)
          }

          if (params?.category) {
            filteredServices = filteredServices.filter(s => s.category === params.category)
          }

          if (params?.search) {
            const searchTerm = params.search.toLowerCase()
            filteredServices = filteredServices.filter(s =>
              s.name.toLowerCase().includes(searchTerm) ||
              s.description?.toLowerCase().includes(searchTerm)
            )
          }

          if (params?.limit) {
            const offset = ((params?.page || 1) - 1) * params.limit
            filteredServices = filteredServices.slice(offset, offset + params.limit)
          }

          return formatResponse(filteredServices)
        }

        return formatResponse(data, error)
      } catch (error) {
        return formatResponse(null, error)
      }
    },

    getFeatured: async (limit?: number): Promise<ApiResponse<Service[]>> => {
      try {
        let query = supabase
          .from('services')
          .select('*')
          .eq('is_active', true)
          .order('created_at', { ascending: false })

        if (limit) {
          query = query.limit(limit)
        }

        const { data, error } = await query

        // If table doesn't exist, fall back to mock data
        if (error && error.code === 'PGRST116') {
          console.warn('Services table not found, using mock data. Please run the database schema.')
          let services = mockServices.filter(s => s.is_active)
          if (limit) {
            services = services.slice(0, limit)
          }
          return formatResponse(services)
        }

        return formatResponse(data, error)
      } catch (error) {
        return formatResponse(null, error)
      }
    },

    getById: async (id: number): Promise<ApiResponse<Service>> => {
      try {
        const { data, error } = await supabase
          .from('services')
          .select('*')
          .eq('id', id)
          .single()
        
        return formatResponse(data, error)
      } catch (error) {
        return formatResponse(null, error)
      }
    },

    create: async (serviceData: CreateService): Promise<ApiResponse<Service>> => {
      try {
        const { data, error } = await supabase
          .from('services')
          .insert([serviceData])
          .select()
          .single()
        
        return formatResponse(data, error)
      } catch (error) {
        return formatResponse(null, error)
      }
    },

    update: async (id: number, serviceData: Partial<CreateService>): Promise<ApiResponse<Service>> => {
      try {
        const { data, error } = await supabase
          .from('services')
          .update(serviceData)
          .eq('id', id)
          .select()
          .single()
        
        return formatResponse(data, error)
      } catch (error) {
        return formatResponse(null, error)
      }
    },

    delete: async (id: number): Promise<ApiResponse<{ message: string }>> => {
      try {
        const { error } = await supabase
          .from('services')
          .delete()
          .eq('id', id)
        
        if (error) {
          return formatResponse(null, error)
        }
        
        return formatResponse({ message: 'Service deleted successfully' })
      } catch (error) {
        return formatResponse(null, error)
      }
    }
  }

  // Products
  products = {
    getAll: async (params?: { 
      page?: number; 
      limit?: number; 
      search?: string; 
      category?: string; 
      active?: boolean 
    }): Promise<ApiResponse<Product[]>> => {
      try {
        let query = supabase.from('products').select('*')
        
        if (params?.active !== undefined) {
          query = query.eq('is_active', params.active)
        }
        
        if (params?.category) {
          query = query.eq('category', params.category)
        }
        
        if (params?.search) {
          query = query.or(`name.ilike.%${params.search}%,description.ilike.%${params.search}%`)
        }
        
        if (params?.limit) {
          const offset = ((params?.page || 1) - 1) * params.limit
          query = query.range(offset, offset + params.limit - 1)
        }
        
        const { data, error } = await query.order('created_at', { ascending: false })
        return formatResponse(data, error)
      } catch (error) {
        return formatResponse(null, error)
      }
    },

    getFeatured: async (limit?: number): Promise<ApiResponse<Product[]>> => {
      try {
        let query = supabase
          .from('products')
          .select('*')
          .eq('is_active', true)
          .order('created_at', { ascending: false })
        
        if (limit) {
          query = query.limit(limit)
        }
        
        const { data, error } = await query
        return formatResponse(data, error)
      } catch (error) {
        return formatResponse(null, error)
      }
    },

    getById: async (id: number): Promise<ApiResponse<Product>> => {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('id', id)
          .single()
        
        return formatResponse(data, error)
      } catch (error) {
        return formatResponse(null, error)
      }
    },

    create: async (productData: CreateProduct): Promise<ApiResponse<Product>> => {
      try {
        const { data, error } = await supabase
          .from('products')
          .insert([productData])
          .select()
          .single()
        
        return formatResponse(data, error)
      } catch (error) {
        return formatResponse(null, error)
      }
    },

    update: async (id: number, productData: Partial<CreateProduct>): Promise<ApiResponse<Product>> => {
      try {
        const { data, error } = await supabase
          .from('products')
          .update(productData)
          .eq('id', id)
          .select()
          .single()
        
        return formatResponse(data, error)
      } catch (error) {
        return formatResponse(null, error)
      }
    },

    delete: async (id: number): Promise<ApiResponse<{ message: string }>> => {
      try {
        const { error } = await supabase
          .from('products')
          .delete()
          .eq('id', id)
        
        if (error) {
          return formatResponse(null, error)
        }
        
        return formatResponse({ message: 'Product deleted successfully' })
      } catch (error) {
        return formatResponse(null, error)
      }
    }
  }

  // Company info (mock data for now - can be moved to database later)
  company = {
    getInfo: async (): Promise<ApiResponse<CompanyInfo>> => {
      try {
        const companyInfo: CompanyInfo = {
          name: "Nolads Engineering",
          tagline: "A Pinnacle Of Engineering Excellence",
          website: "https://noladsengineering.com",
          vision: "To be the leading provider of innovative electrical engineering solutions across Africa",
          mission: "Delivering world-class engineering services that power industrial growth and innovation",
          stats: {
            established: 1998,
            incorporated: 2003,
            citiesCovered: "10+",
            workforce: "500+",
            clientBase: "100+",
            completedProjects: "1000+"
          },
          certifications: [
            "ISO 9001:2015",
            "ISO 14001:2015", 
            "OHSAS 18001:2007",
            "IEEE Certified"
          ]
        }
        
        return formatResponse(companyInfo)
      } catch (error) {
        return formatResponse(null, error)
      }
    },

    getStats: async (): Promise<ApiResponse<CompanyStats>> => {
      try {
        const stats: CompanyStats = {
          established: 1998,
          incorporated: 2003,
          citiesCovered: "10+",
          workforce: "500+",
          clientBase: "100+",
          completedProjects: "1000+"
        }
        
        return formatResponse(stats)
      } catch (error) {
        return formatResponse(null, error)
      }
    },

    getContact: async (): Promise<ApiResponse<CompanyContacts>> => {
      try {
        const contacts: CompanyContacts = {
          offices: {
            main: {
              office: "Main Office - Nairobi",
              address: "Enterprise Road, Industrial Area",
              poBox: "P.O. Box 12345-00100",
              phone: ["+254 20 123 4567"],
              email: "info@noladsengineering.com"
            },
            nairobi: {
              office: "Nairobi Branch",
              phone: ["+254 20 123 4567"],
              email: "nairobi@noladsengineering.com"
            },
            genparts: {
              office: "Genparts Division",
              phone: ["+254 20 123 4568"],
              email: "genparts@noladsengineering.com"
            },
            western: {
              office: "Western Region",
              phone: ["+254 20 123 4569"],
              email: "western@noladsengineering.com"
            }
          },
          keyPersonnel: {
            general: {
              name: "General Manager",
              phone: ["+254 20 123 4567"]
            },
            financial: {
              name: "Financial Controller",
              phone: ["+254 20 123 4567"]
            },
            technical: {
              name: "Technical Director",
              phone: ["+254 20 123 4567"]
            }
          }
        }
        
        return formatResponse(contacts)
      } catch (error) {
        return formatResponse(null, error)
      }
    },

    getRegistration: async (): Promise<ApiResponse<CompanyRegistration>> => {
      try {
        const registration: CompanyRegistration = {
          incorporationCertificate: "C.123456",
          vatRegistration: "VAT123456789",
          pinCertificate: "P123456789X",
          taxCompliance: "TC-2024-001",
          etrSerial: "ETR-001-2024"
        }
        
        return formatResponse(registration)
      } catch (error) {
        return formatResponse(null, error)
      }
    }
  }

  // Authentication
  auth = {
    login: async (email: string, password: string) => {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password
        })
        
        if (error) {
          return formatResponse(null, error)
        }
        
        return formatResponse({
          user: data.user,
          session: data.session
        })
      } catch (error) {
        return formatResponse(null, error)
      }
    },

    logout: async () => {
      try {
        const { error } = await supabase.auth.signOut()
        
        if (error) {
          return formatResponse(null, error)
        }
        
        return formatResponse({ message: 'Logged out successfully' })
      } catch (error) {
        return formatResponse(null, error)
      }
    },

    getCurrentUser: async () => {
      try {
        const { data: { user }, error } = await supabase.auth.getUser()
        
        if (error) {
          return formatResponse(null, error)
        }
        
        return formatResponse(user)
      } catch (error) {
        return formatResponse(null, error)
      }
    },

    signup: async (email: string, password: string, metadata?: any) => {
      try {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: metadata
          }
        })
        
        if (error) {
          return formatResponse(null, error)
        }
        
        return formatResponse({
          user: data.user,
          session: data.session
        })
      } catch (error) {
        return formatResponse(null, error)
      }
    }
  }

  // Contact messages
  contact = {
    create: async (messageData: CreateContactMessage): Promise<ApiResponse<ContactMessage>> => {
      try {
        const { data, error } = await supabase
          .from('contact_messages')
          .insert([messageData])
          .select()
          .single()
        
        return formatResponse(data, error)
      } catch (error) {
        return formatResponse(null, error)
      }
    },

    getAll: async (params?: { 
      page?: number; 
      limit?: number; 
      search?: string; 
      status?: string 
    }): Promise<ApiResponse<ContactMessage[]>> => {
      try {
        let query = supabase.from('contact_messages').select('*')
        
        if (params?.status) {
          query = query.eq('status', params.status)
        }
        
        if (params?.search) {
          query = query.or(`name.ilike.%${params.search}%,email.ilike.%${params.search}%,subject.ilike.%${params.search}%`)
        }
        
        if (params?.limit) {
          const offset = ((params?.page || 1) - 1) * params.limit
          query = query.range(offset, offset + params.limit - 1)
        }
        
        const { data, error } = await query.order('created_at', { ascending: false })
        return formatResponse(data, error)
      } catch (error) {
        return formatResponse(null, error)
      }
    }
  }

  // Testimonials
  testimonials = {
    getAll: async (params?: { 
      page?: number; 
      limit?: number; 
      activeOnly?: boolean 
    }): Promise<ApiResponse<Testimonial[]>> => {
      try {
        let query = supabase.from('testimonials').select('*')
        
        if (params?.activeOnly !== undefined) {
          query = query.eq('is_active', params.activeOnly)
        }
        
        if (params?.limit) {
          const offset = ((params?.page || 1) - 1) * params.limit
          query = query.range(offset, offset + params.limit - 1)
        }
        
        const { data, error } = await query.order('created_at', { ascending: false })
        return formatResponse(data, error)
      } catch (error) {
        return formatResponse(null, error)
      }
    },

    getFeatured: async (limit?: number): Promise<ApiResponse<Testimonial[]>> => {
      try {
        let query = supabase
          .from('testimonials')
          .select('*')
          .eq('is_active', true)
          .eq('is_featured', true)
          .order('created_at', { ascending: false })
        
        if (limit) {
          query = query.limit(limit)
        }
        
        const { data, error } = await query
        return formatResponse(data, error)
      } catch (error) {
        return formatResponse(null, error)
      }
    }
  }

  // Quotes
  quotes = {
    create: async (quoteData: CreateQuote): Promise<ApiResponse<Quote>> => {
      try {
        const { data, error } = await supabase
          .from('quotes')
          .insert([quoteData])
          .select()
          .single()
        
        return formatResponse(data, error)
      } catch (error) {
        return formatResponse(null, error)
      }
    },

    getAll: async (params?: { 
      page?: number; 
      limit?: number; 
      status?: string; 
      userId?: number 
    }): Promise<ApiResponse<Quote[]>> => {
      try {
        let query = supabase.from('quotes').select('*')
        
        if (params?.status) {
          query = query.eq('status', params.status)
        }
        
        if (params?.userId) {
          query = query.eq('user_id', params.userId)
        }
        
        if (params?.limit) {
          const offset = ((params?.page || 1) - 1) * params.limit
          query = query.range(offset, offset + params.limit - 1)
        }
        
        const { data, error } = await query.order('created_at', { ascending: false })
        return formatResponse(data, error)
      } catch (error) {
        return formatResponse(null, error)
      }
    }
  }

  // Blog
  blog = {
    getAll: async (params?: { 
      page?: number; 
      limit?: number; 
      category?: string; 
      status?: string 
    }): Promise<ApiResponse<BlogPost[]>> => {
      try {
        let query = supabase.from('blog_posts').select('*')
        
        if (params?.category) {
          query = query.eq('category', params.category)
        }
        
        if (params?.status) {
          query = query.eq('status', params.status)
        }
        
        if (params?.limit) {
          const offset = ((params?.page || 1) - 1) * params.limit
          query = query.range(offset, offset + params.limit - 1)
        }
        
        const { data, error } = await query.order('created_at', { ascending: false })
        return formatResponse(data, error)
      } catch (error) {
        return formatResponse(null, error)
      }
    },

    getBySlug: async (slug: string): Promise<ApiResponse<BlogPost>> => {
      try {
        const { data, error } = await supabase
          .from('blog_posts')
          .select('*')
          .eq('slug', slug)
          .eq('status', 'published')
          .single()
        
        return formatResponse(data, error)
      } catch (error) {
        return formatResponse(null, error)
      }
    }
  }
}

export const api = new SupabaseApiClient()
