import CategoryClient from './CategoryClient';

export async function generateMetadata({ params }) {
  const { category } = await params;
  
  if (category?.toLowerCase() === 'bags') {
    return {
      title: "School Bags, Travel Bags & Backpacks in Tiruvannamalai | Al Fahath",
      description: "Shop school bags, college backpacks, laptop bags, travel bags, trolley luggage, duffle bags, and more at Al Fahath Bags & Footwear in Tiruvannamalai."
    };
  }
  
  if (category?.toLowerCase() === 'footwear') {
    return {
      title: "Footwear Shop in Tiruvannamalai | Shoes, Sandals & Slippers | Al Fahath",
      description: "Explore comfortable shoes, sandals, slippers, sports shoes, and casual footwear for men, women, and kids at Al Fahath Bags & Footwear, Tiruvannamalai."
    };
  }
  
  return {
    title: `${category ? category.charAt(0).toUpperCase() + category.slice(1) : 'Collection'} | Al Fahath Bags & Footwears`,
    description: "Experience luxury with Al Fahath Bags & Footwears."
  };
}

export default async function Page({ params }) {
  return <CategoryClient params={params} />;
}
