import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, BookOpen } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import SectionHeading from '../ui/SectionHeading';

export default function BlogPreview({ blogs = [] }) {
  const navigate = useNavigate();

  // Blueprint fallback blogs
  const defaultBlogs = [
    {
      id: "costly-cheap-website",
      category: "Web Development",
      title: "Why Your ₹50,000 Website Is Costing You ₹5 Lakhs a Year",
      summary: "That cheap website you got from a freelancer? It's slowly killing your business. Here's why...",
      createdAt: new Date().toISOString()
    },
    {
      id: "seo-agency-redflags",
      category: "SEO",
      title: "5 Red Flags Your SEO Agency Doesn't Know What They're Doing",
      summary: "If your SEO guy keeps showing you \"keyword rankings\" but no actual leads, run...",
      createdAt: new Date().toISOString()
    },
    {
      id: "rebuilding-kvantum-website",
      category: "Business",
      title: "We Rebuilt Our Own Website — Here's What We Learned",
      summary: "It's always embarrassing when the cobbler's children have no shoes. So we fixed ours...",
      createdAt: new Date().toISOString()
    }
  ];

  // If we have actual blogs in the database, show top 3. Otherwise show defaults.
  const activeBlogs = blogs.length >= 3 ? blogs.slice(0, 3) : defaultBlogs;

  return (
    <section className="container mx-auto max-w-[1280px] px-6 py-20 select-none">
      <SectionHeading
        badge="From Our Desk"
        title="Things We've Been Thinking About"
        subtitle="Insights and opinions on tech, design, marketing, and the web."
      />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 text-left">
        {activeBlogs.map((blog) => (
          <Card 
            key={blog.id} 
            onClick={() => navigate(`/blog`)}
            className="p-8 flex flex-col justify-between min-h-[340px] border hover:-translate-y-1.5 transition-all duration-300 cursor-pointer"
          >
            <div className="flex flex-col gap-4">
              {/* Tag Badge */}
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-pinkCustom bg-pinkCustom/5 border border-pinkCustom/10 px-2.5 py-1 rounded-md w-fit">
                {blog.category || "Insight"}
              </span>
              
              <h4 className="text-zinc-100 text-lg font-headline font-bold leading-snug hover:text-pinkCustom transition-colors">
                {blog.title}
              </h4>
              
              <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
                {blog.summary}
              </p>
            </div>

            <div className="text-xs font-bold text-pinkCustom mt-8 flex items-center gap-1.5">
              Read More <ArrowRight size={12} />
            </div>
          </Card>
        ))}
      </div>

      <div className="text-center mt-12">
        <Button
          onClick={() => navigate('/blog')}
          variant="secondary"
          className="px-6 py-3 text-sm rounded-lg"
        >
          View All Posts <BookOpen size={14} className="ml-1.5" />
        </Button>
      </div>
    </section>
  );
}
