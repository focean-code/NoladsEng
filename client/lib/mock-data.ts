import { Service, Product, CompanyStats } from '@shared/api';

// Mock services data
export const mockServices: Service[] = [
  {
    id: 1,
    name: 'Electrical Design & Engineering',
    description: 'Complete electrical system design and engineering services for industrial applications',
    short_description: 'Professional electrical design services',
    category: 'Design',
    price_range: '$5,000 - $50,000',
    image_url: '/placeholder.svg',
    features: JSON.stringify(['Power System Design', 'Load Calculations', 'Safety Analysis']),
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 2,
    name: 'Power System Installation',
    description: 'Installation of power distribution systems, transformers, and electrical infrastructure',
    short_description: 'Power system installation services',
    category: 'Installation',
    price_range: '$10,000 - $100,000',
    image_url: '/placeholder.svg',
    features: JSON.stringify(['Transformer Installation', 'Panel Setup', 'Wiring']),
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 3,
    name: 'Industrial Automation',
    description: 'Automation solutions for manufacturing and industrial processes',
    short_description: 'Industrial automation services',
    category: 'Automation',
    price_range: '$15,000 - $200,000',
    image_url: '/placeholder.svg',
    features: JSON.stringify(['PLC Programming', 'SCADA Systems', 'HMI Development']),
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 4,
    name: 'Electrical Maintenance',
    description: 'Preventive and corrective maintenance for electrical systems',
    short_description: 'Electrical maintenance services',
    category: 'Maintenance',
    price_range: '$2,000 - $20,000',
    image_url: '/placeholder.svg',
    features: JSON.stringify(['Regular Inspections', 'Emergency Repairs', 'Upgrades']),
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

// Mock products data
export const mockProducts: Product[] = [
  {
    id: 1,
    name: 'Industrial Circuit Breakers',
    description: 'High-quality circuit breakers for industrial applications',
    category: 'Safety Equipment',
    price: 1500.00,
    image_url: '/placeholder.svg',
    images: JSON.stringify(['/placeholder.svg']),
    specifications: JSON.stringify({
      'Voltage Rating': '600V',
      'Current Rating': '100A-1600A',
      'Breaking Capacity': '65kA'
    }),
    stock_quantity: 50,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 2,
    name: 'Power Transformers',
    description: 'Step-up and step-down transformers for various applications',
    category: 'Transformers',
    price: 25000.00,
    image_url: '/placeholder.svg',
    images: JSON.stringify(['/placeholder.svg']),
    specifications: JSON.stringify({
      'Power Rating': '100kVA-2500kVA',
      'Voltage': '11kV/415V',
      'Efficiency': '98%+'
    }),
    stock_quantity: 10,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 3,
    name: 'Control Panels',
    description: 'Custom-built electrical control panels',
    category: 'Control Systems',
    price: 5000.00,
    image_url: '/placeholder.svg',
    images: JSON.stringify(['/placeholder.svg']),
    specifications: JSON.stringify({
      'Enclosure': 'IP65',
      'Material': 'Stainless Steel',
      'Components': 'Schneider Electric'
    }),
    stock_quantity: 25,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 4,
    name: 'Cable Management Systems',
    description: 'Professional cable management and routing solutions',
    category: 'Accessories',
    price: 200.00,
    image_url: '/placeholder.svg',
    images: JSON.stringify(['/placeholder.svg']),
    specifications: JSON.stringify({
      'Material': 'Galvanized Steel',
      'Load Capacity': '50kg/m',
      'Sizes': '100mm-600mm'
    }),
    stock_quantity: 100,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 5,
    name: 'Electrical Meters',
    description: 'Digital and analog electrical measurement instruments',
    category: 'Instruments',
    price: 800.00,
    image_url: '/placeholder.svg',
    images: JSON.stringify(['/placeholder.svg']),
    specifications: JSON.stringify({
      'Accuracy': 'Class 0.5',
      'Display': 'LCD/LED',
      'Communication': 'Modbus RTU'
    }),
    stock_quantity: 75,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 6,
    name: 'Motor Control Centers',
    description: 'Integrated motor control and protection systems',
    category: 'Control Systems',
    price: 15000.00,
    image_url: '/placeholder.svg',
    images: JSON.stringify(['/placeholder.svg']),
    specifications: JSON.stringify({
      'Motor Range': '0.5HP-500HP',
      'Protection': 'Thermal Overload',
      'Control': 'DOL/Star-Delta'
    }),
    stock_quantity: 15,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 7,
    name: 'UPS Systems',
    description: 'Uninterruptible power supply systems for critical loads',
    category: 'Power Protection',
    price: 8000.00,
    image_url: '/placeholder.svg',
    images: JSON.stringify(['/placeholder.svg']),
    specifications: JSON.stringify({
      'Capacity': '1kVA-100kVA',
      'Backup Time': '5-60 minutes',
      'Efficiency': '95%+'
    }),
    stock_quantity: 30,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 8,
    name: 'Lighting Control Systems',
    description: 'Smart lighting control and automation systems',
    category: 'Automation',
    price: 3000.00,
    image_url: '/placeholder.svg',
    images: JSON.stringify(['/placeholder.svg']),
    specifications: JSON.stringify({
      'Protocol': 'DALI/DMX',
      'Zones': 'Up to 64',
      'Control': 'Wireless/Wired'
    }),
    stock_quantity: 40,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

// Mock company stats
export const mockCompanyStats: CompanyStats = {
  established: 1998,
  incorporated: 2003,
  citiesCovered: "10+",
  workforce: "500+",
  clientBase: "100+",
  completedProjects: "1000+"
};
