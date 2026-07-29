import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, BookOpen } from 'lucide-react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';

const defaultBlogs = [
  {
    id: 'custom-software-productivity',
    category: 'Software Development',
    title: 'How Custom Software Improves Business Productivity',
    summary: 'Off-the-shelf solutions slow your team down. Discover how purpose-built software eliminates friction and drives measurable productivity gains across departments.',
  },
  {
    id: 'crm-vs-erp',
    category: 'Business Technology',
    title: 'CRM vs ERP: Understanding the Difference',
    summary: 'Many businesses confuse CRM and ERP. Learn what each system does, how they differ, and which one your business actually needs right now.',
  },
  {
    id: 'business-automation-benefits',
    category: 'Business Automation',
    title: 'Benefits of Business Automation for Growing Companies',
    summary: 'Manual workflows are the silent killer of business growth. Explore how automation saves time, reduces errors, and lets your team focus on high-value work.',
  },
  {
    id: 'whatsapp-automation',
    category: 'WhatsApp Automation',
    title: 'WhatsApp Automation for Customer Engagement',
    summary: 'With 98% open rates, WhatsApp is the most powerful customer communication channel available. Learn how to automate it effectively for your business.',
  },
  {
    id: 'hrms-software-need',
    category: 'HRMS Software',
    title: 'Why Every Business Needs HRMS Software',
    summary: 'Managing employees through spreadsheets is a growth bottleneck. See how a proper HRMS transforms HR operations, payroll accuracy, and team productivity.',
  },
  {
    id: 'choosing-software-company',
    category: 'Technology Advice',
    title: 'Choosing the Right Software Development Company',
    summary: 'Not every IT vendor is right for your business. Here are the key factors to evaluate before committing to a software development partner.',
  },
];

export default function BlogPreview({ blogs = [] }) {
  const navigate = useNavigate();
  const activeBlogs = blogs.length >= 3 ? blogs.slice(0, 6) : defaultBlogs;

  return (
    <section className="container mx-auto max-w-[1280px] px-6 py-24 select-none">

      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-14 gap-6">
        <div className="text-left max-w-2xl">
          <Badge className="mb-5 bg-cyanCustom/10 border-cyanCustom/20 text-cyanCustom">
            Latest Blogs
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-headline font-bold text-zinc-100 leading-tight mb-4">
            Insights, Trends & <br />
            <span className="gradient-text">Expert Resources</span>
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            Stay updated with the latest technology trends, software development practices, automation strategies, and digital transformation insights.
          </p>
        </div>
        <button
          onClick={() => navigate('/blog')}
          className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold border border-white/15 text-zinc-200 hover:bg-white/5 hover:border-white/25 transition-all duration-200 shrink-0"
        >
          View All Articles <ArrowRight size={14} />
        </button>
      </div>

      {/* Blog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
        {activeBlogs.map((blog, idx) => (
          <Card
            key={blog.id || idx}
            onClick={() => navigate('/blog')}
            className="p-7 flex flex-col justify-between min-h-[280px] border hover:-translate-y-2 hover:border-white/20 transition-all duration-300 cursor-pointer group"
          >
            <div className="flex flex-col gap-4">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-pinkCustom bg-pinkCustom/5 border border-pinkCustom/10 px-2.5 py-1 rounded-md w-fit">
                {blog.category || 'Insight'}
              </span>
              <h4 className="text-zinc-100 text-base font-headline font-bold leading-snug group-hover:text-pinkCustom transition-colors duration-200">
                {blog.title}
              </h4>
              <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
                {blog.summary}
              </p>
            </div>
            <div className="text-xs font-bold text-pinkCustom mt-6 flex items-center gap-1.5 group-hover:gap-2.5 transition-all duration-200">
              Read Article <ArrowRight size={12} />
            </div>
          </Card>
        ))}
      </div>

    </section>
  );
}
