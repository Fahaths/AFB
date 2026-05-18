import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Clock, Trash2, Loader2, User } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import toast from 'react-hot-toast';

export default function EnquiryManager() {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const fetchEnquiries = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('enquiries')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast.error('Failed to load enquiries');
      console.error(error);
    } else {
      setEnquiries(data || []);
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this enquiry?')) return;
    
    const { error } = await supabase
      .from('enquiries')
      .delete()
      .eq('id', id);

    if (error) {
      toast.error('Failed to delete enquiry');
    } else {
      toast.success('Enquiry deleted');
      setEnquiries(enquiries.filter(e => e.id !== id));
    }
  };

  return (
    <div className="space-y-8">
      <header className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <span className="h-[2px] w-8 bg-[#C89B3C]"></span>
          <span className="text-[#C89B3C] text-[10px] font-black uppercase tracking-[0.4em]">Inbox</span>
        </div>
        <h2 className="text-5xl font-serif italic text-white">Inbox <span className="not-italic font-black text-3xl ml-2 uppercase text-[#C89B3C]">Mails</span></h2>
      </header>

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="animate-spin text-[#C89B3C]" size={40} />
        </div>
      ) : enquiries.length === 0 ? (
        <div className="py-20 text-center border border-dashed border-white/5 rounded-[32px] bg-[#0B2545]/50">
          <Mail className="mx-auto text-white/20 mb-4" size={48} />
          <p className="text-white/30 font-serif italic text-xl">Inbox is completely empty</p>
          <p className="text-[#8B97A8] text-[10px] font-black uppercase tracking-widest mt-2">No messages received yet</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {enquiries.map((enq, idx) => (
            <motion.div
              key={enq.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="bg-[#0B2545] p-8 rounded-[32px] border border-white/5 shadow-2xl relative group flex flex-col h-full"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-[#C89B3C]">
                    <User size={20} />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-lg mb-1">{enq.name}</h4>
                    <div className="flex items-center gap-1.5 text-[#8B97A8] text-[9px] font-black uppercase tracking-widest">
                      <Clock size={10} />
                      {new Date(enq.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(enq.id)}
                  className="p-3 bg-white/5 rounded-xl text-white/20 hover:text-red-400 hover:bg-red-400/10 transition-all opacity-0 group-hover:opacity-100"
                >
                  <Trash2 size={16} />
                </button>
              </div>

              <div className="flex-1 bg-white/5 rounded-2xl p-5 mb-6">
                <p className="text-[#C8CDD4] text-sm leading-relaxed whitespace-pre-wrap">{enq.message}</p>
              </div>
              
              <div className="mt-auto">
                 <a 
                    href={`mailto:?subject=Re: Enquiry at AFB Luxe&body=Hi ${enq.name},%0D%0A%0D%0A`}
                    className="w-full py-4 rounded-xl bg-[#C89B3C]/10 text-[#C89B3C] font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-2 hover:bg-[#C89B3C] hover:text-[#071B34] transition-all"
                 >
                    <Mail size={14} /> Reply Manually
                 </a>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
