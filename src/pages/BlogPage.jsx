import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Search, Calendar, Clock, ArrowLeft, FileText, AlertTriangle } from 'lucide-react';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import GradientText from '@/components/ui/GradientText';
import Button from '@/components/ui/Button';

export default function BlogPage({ blogs = [] }) {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activePost, setActivePost] = useState(null);

  // Sync active post based on slug parameter
  useEffect(() => {
    if (slug) {
      const found = blogs.find(b => b.id === slug);
      if (found) {
        setActivePost(found);
      } else {
        setActivePost(null);
      }
    } else {
      setActivePost(null);
    }
  }, [slug, blogs]);

  const categories = ['All', 'AI & Chatbots', 'SEO & Marketing', 'Web & App Dev'];

  const filteredPosts = blogs.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.summary.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container mx-auto max-w-[1280px] px-6 py-20 relative z-[5] select-none text-left">
      
      {/* Blog Detail Reader Mode */}
      {slug ? (
        activePost ? (
          <div className="fade-in-up max-w-[800px] mx-auto">
            <Button 
              onClick={() => navigate('/blog')}
              variant="secondary"
              className="mb-10 gap-2 px-5 py-2.5 rounded-lg text-sm"
            >
              <ArrowLeft size={16} /> Back to Repository
            </Button>

            <Badge className="mb-4">{activePost.category}</Badge>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-headline font-bold text-zinc-100 mb-5 leading-tight">
              {activePost.title}
            </h1>

            <div className="flex gap-5 text-xs font-mono text-zinc-500 mb-10 border-b border-white/8 pb-5">
              <span className="flex items-center gap-1.5"><Calendar size={14} /> {activePost.date}</span>
              <span className="flex items-center gap-1.5"><Clock size={14} /> {activePost.readTime || '5 min read'}</span>
            </div>

            <div 
              className="blog-content text-zinc-300 text-sm sm:text-base leading-relaxed flex flex-col gap-6"
              dangerouslySetInnerHTML={{ 
                __html: activePost.content
                  .replace(/## (.*)/g, '<h2 style="font-size:24px; margin-top:32px; margin-bottom:16px; color:var(--text-primary); font-weight:700; font-family:var(--font-headline);">$1</h2>')
                  .replace(/### (.*)/g, '<h3 style="font-size:18px; margin-top:24px; margin-bottom:12px; color:var(--text-primary); font-weight:700; font-family:var(--font-headline);">$1</h3>')
                  .replace(/#### (.*)/g, '<h4 style="font-size:15px; margin-top:18px; margin-bottom:8px; color:var(--text-primary); font-family:var(--font-mono);">$1</h4>')
                  .replace(/\* (.*)/g, '<li style="margin-left:20px; margin-bottom:8px; list-style-type:disc;">$1</li>')
                  .replace(/\d\. (.*)/g, '<li style="margin-left:20px; margin-bottom:8px; list-style-type: decimal;">$1</li>')
                  .replace(/> "(.*)"/g, '<blockquote style="border-left: 3px solid var(--accent-cyan); padding-left: 20px; font-style: italic; color: var(--text-primary); margin: 24px 0;">"$1"</blockquote>')
                  .replace(/`([^`]+)`/g, '<code style="font-family:var(--font-mono); background:var(--bg-tertiary); padding:2px 6px; border-radius:4px; font-size:14px; border:1px solid var(--border-color);">$1</code>')
                  .replace(/\n/g, '<br/>')
              }}
            />
          </div>
        ) : (
          <div className="max-w-[500px] mx-auto p-12 text-center shadow-[0_20px_40px_rgba(0,0,0,0.3)]">
            <AlertTriangle size={48} className="text-red-400 mx-auto mb-6" />
            <h2 className="text-zinc-100 text-xl font-bold font-headline mb-3">Post Not Found</h2>
            <p className="text-zinc-500 font-mono text-[13px] mb-8">
              ERROR_POST_NOT_FOUND: /blog/{slug}
            </p>
            <Button onClick={() => navigate('/blog')} variant="primary">Return to Repository</Button>
          </div>
        )
      ) : (
        <>
          {/* Header */}
          <div className="text-center mb-16">
            <Badge className="mb-4">Developer Logs</Badge>
            <h1 className="text-4xl sm:text-5xl font-headline font-bold text-zinc-100 mb-4">
              Knowledge <GradientText>Repository</GradientText>
            </h1>
            <p className="text-zinc-400 max-w-xl mx-auto text-base leading-relaxed">
              Technical documentation, search engine analytics, and digital product design insights.
            </p>
          </div>

          {/* Search and Filters panel */}
          <Card className="p-6 flex flex-col gap-5 mb-12 border">
            <div className="relative w-full flex items-center">
              <Search 
                size={18} 
                className="text-zinc-500 absolute left-4" 
              />
              <input 
                type="text" 
                placeholder="Search database nodes..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-zinc-950/40 border border-white/8 rounded-xl py-4 pl-12 pr-5 text-zinc-100 text-sm font-mono placeholder-zinc-600 outline-none focus:border-cyanCustom/40 transition-colors"
              />
            </div>

            <div className="flex gap-2 flex-wrap items-center text-zinc-400 text-xs sm:text-sm">
              <span className="flex items-center gap-1.5 mr-2 font-mono"><Clock size={14} /> Filters:</span>
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold border transition-all duration-200 cursor-pointer ${
                    selectedCategory === cat 
                      ? 'bg-cyanCustom/10 text-cyanCustom border-cyanCustom/30 shadow-[0_0_10px_rgba(0,210,255,0.15)]' 
                      : 'bg-white/[0.01] text-zinc-400 border-white/8 hover:border-zinc-500 hover:text-zinc-100'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </Card>

          {/* Posts Grid */}
          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredPosts.map(post => (
                <Card
                  key={post.id}
                  onClick={() => navigate(`/blog/${post.id}`)}
                  className="p-8 cursor-pointer flex flex-col gap-4 border hover:border-purpleCustom/40 hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="flex justify-between items-center">
                    <span className="tech-badge">{post.category}</span>
                    <span className="text-xs text-zinc-500 font-mono">{post.readTime}</span>
                  </div>

                  <h3 className="text-zinc-100 text-xl font-bold font-headline leading-tight">
                    {post.title}
                  </h3>

                  <p className="text-zinc-400 text-sm leading-relaxed flex-grow">
                    {post.summary}
                  </p>

                  <div className="flex items-center gap-1.5 text-xs font-semibold text-cyanCustom border-t border-white/8 pt-4 mt-2">
                    <FileText size={14} /> Open Document Node
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="p-16 text-center border">
              <p className="text-zinc-500 font-mono text-sm uppercase tracking-wider">NO_MATCHING_DATABASE_RECORDS</p>
            </Card>
          )}
        </>
      )}
    </div>
  );
}
